// ══════════════════════════════════════════════════════════════
// Usłysz Mnie — Service Worker
// Codzienne powiadomienia o 20:00 + cache offline
// ══════════════════════════════════════════════════════════════

const CACHE_NAME = 'uslyszmnie-v5';

// Install — cache kluczowych zasobów
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(['/']);
    }).catch(() => {})
  );
  self.skipWaiting();
});

// Activate — wyczyść stare cache
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      );
    })
  );
  self.clients.claim();
  // Ustaw timer powiadomień
  scheduleNotification();
});

// Fetch — serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request).then((response) => {
        // Cache nowe zasoby
        if (response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clone);
          });
        }
        return response;
      }).catch(() => cached);
    })
  );
});

// ── POWIADOMIENIA ──

const NOTIF_MESSAGES = [
  { title: "👂 Scenka Dnia czeka", body: "Jedna scenka, dwie minuty. Twoje dziecko poczuje różnicę." },
  { title: "👂 Usłysz Mnie", body: "Masz chwilę? Dzisiejsza scenka jest gotowa." },
  { title: "🔥 Nie zgub serii!", body: "Twoja codzienna scenka czeka. Wskakuj!" },
  { title: "👂 Dwie minuty empatii", body: "Wystarczą, żeby jutro zareagować inaczej." },
  { title: "💛 Pora na trening", body: "Jedno ćwiczenie dziennie zmienia nawyki." },
  { title: "👂 Twój nastolatek czeka", body: "Na kogoś, kto usłyszy. Ćwicz z nami." },
  { title: "🎯 Scenka Dnia", body: "Nowa sytuacja, nowa szansa. Jak odpowiesz?" },
];

function getRandomMessage() {
  const day = new Date().getDay();
  return NOTIF_MESSAGES[day % NOTIF_MESSAGES.length];
}

function scheduleNotification() {
  // Oblicz czas do 20:00 dzisiaj lub jutro
  const now = new Date();
  let target = new Date(now);
  target.setHours(20, 0, 0, 0);
  
  if (now >= target) {
    // Już po 20:00 — zaplanuj na jutro
    target.setDate(target.getDate() + 1);
  }
  
  const delay = target - now;
  
  setTimeout(() => {
    showDailyNotification();
    // Zaplanuj następne (co 24h)
    setInterval(showDailyNotification, 24 * 60 * 60 * 1000);
  }, delay);
}

function showDailyNotification() {
  // Sprawdź czy mamy uprawnienia
  if (self.Notification && Notification.permission === 'granted') {
    // Sprawdź czy użytkownik nie ukończył już dzisiaj scenki
    // (nie mamy dostępu do localStorage z SW, więc wysyłamy zawsze — lepiej za dużo niż za mało)
    const msg = getRandomMessage();
    self.registration.showNotification(msg.title, {
      body: msg.body,
      icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">👂</text></svg>',
      badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">👂</text></svg>',
      tag: 'uslyszmnie-daily', // Zapobiega duplikatom
      renotify: true,
      requireInteraction: false,
    });
  }
}

// Kliknięcie w powiadomienie — otwórz apkę
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then((clients) => {
      // Jeśli apka jest otwarta — aktywuj okno
      for (const client of clients) {
        if (client.url.includes('/') && 'focus' in client) {
          return client.focus();
        }
      }
      // Jeśli nie — otwórz nowe okno
      if (self.clients.openWindow) {
        return self.clients.openWindow('/');
      }
    })
  );
});
