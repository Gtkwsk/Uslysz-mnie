// ══════════════════════════════════════════════════════════════
// Usłysz Mnie: Service Worker
// Strona: najpierw sieć, więc nowa wersja dociera od razu; z pamięci tylko bez internetu.
// Biblioteki, czcionki i ikony: z pamięci, odświeżane w tle.
// Przypomnienia: powiadomienia push wysyłane z serwera (funkcja push-daily).
// ══════════════════════════════════════════════════════════════

const CACHE_NAME = 'uslyszmnie-v7';

const SHELL = [
  '/',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/apple-touch-icon.png',
  '/icons/badge-96.png',
];

// Zasoby z innych serwerów, które wolno trzymać w pamięci (biblioteki i czcionki)
const CACHEABLE_HOSTS = ['cdnjs.cloudflare.com', 'fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => Promise.all(SHELL.map((url) => cache.add(url).catch(() => {}))))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function networkFirst(request) {
  return fetch(request)
    .then((response) => {
      if (response.ok) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
      }
      return response;
    })
    .catch(() => caches.match(request).then((hit) => hit || caches.match('/')));
}

function cacheFirstRefresh(request) {
  return caches.match(request).then((hit) => {
    const fresh = fetch(request)
      .then((response) => {
        if (response.ok || response.type === 'opaque') {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      })
      .catch(() => hit);
    return hit || fresh;
  });
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin === self.location.origin) {
    if (url.pathname.startsWith('/.netlify/')) return; // funkcje serwera zawsze z sieci
    if (request.mode === 'navigate' || url.pathname === '/' || url.pathname.endsWith('.html')) {
      event.respondWith(networkFirst(request));
      return;
    }
    event.respondWith(cacheFirstRefresh(request));
    return;
  }
  if (CACHEABLE_HOSTS.includes(url.hostname)) {
    event.respondWith(cacheFirstRefresh(request));
  }
});

// ── PRZYPOMNIENIA (push z serwera) ──

self.addEventListener('push', (event) => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; } catch (e) { data = { body: event.data && event.data.text() }; }
  const title = data.title || '👂 Usłysz Mnie';
  event.waitUntil(
    self.registration.showNotification(title, {
      body: data.body || 'Dzisiejsza Scenka Dnia czeka.',
      icon: '/icons/icon-192.png',
      badge: '/icons/badge-96.png',
      tag: 'uslyszmnie-daily',
      renotify: true,
      data: { url: data.url || '/' },
    })
  );
});

// Kliknięcie w powiadomienie: otwórz aplikację albo przełącz na otwarte okno
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const target = (event.notification.data && event.notification.data.url) || '/';
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      for (const client of clients) {
        if ('focus' in client) return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow(target);
    })
  );
});
