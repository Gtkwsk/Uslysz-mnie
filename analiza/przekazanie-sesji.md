# Usłysz Mnie: przekazanie sesji (stan na 2026-10-08)

Dokument dla sesji „Usłysz mnie 2”, która kontynuuje pracę z poprzedniej sesji „Usłysz mnie”. Opisuje projekt, decyzje użytkownika, stan wdrożenia, narzędzia testowe, pułapki techniczne i otwarte tematy. Kod jest źródłem prawdy; ten plik ma oszczędzić odkrywania go od zera.

## 1. Projekt i użytkownik

- „Usłysz Mnie” to aplikacja (PWA) do treningu empatycznego reagowania dla rodziców nastolatków, oparta na metodzie Adele Faber i Elaine Mazlish (nazywanie uczuć, echo, brak rad i pocieszania).
- Autor i użytkownik sesji: Robert Gutkowski, psychoterapeuta (nurt psychodynamiczny). Aplikacja ma uczyć rodzica precyzyjnie i nie odciągać uwagi: forma ma nie przeszkadzać w tym, czego rodzic się uczy.
- Strona: https://uslyszmnie.netlify.app (Netlify, wdrożenie automatyczne po wypchnięciu na `main`, trwa około 30 s).
- Repozytorium: `Gtkwsk/Uslysz-mnie` (publiczne). Kontakt do polityki prywatności: gtkwsk@gmail.com.
- Użytkownik na razie przygotowuje aplikację, a wdrażać (publikować w Google Play) będzie później.

## 2. Zasady pracy z użytkownikiem

Odpowiedzi w języku polskim, w stylu ustawionym w preferencjach użytkownika (obowiązuje w tej sesji także po przejściu):
- bez długich myślników (—),
- bez zwracania się do użytkownika (ani „ty”, ani „pan”), bez trybu rozkazującego wobec niego (formy bezosobowe: „Należy sprawdzić”),
- bez powitań, podziękowań, fraz walidujących, pożegnań i zaproszeń do dalszej rozmowy,
- bez symulowania emocji; pierwsza osoba tylko funkcjonalnie,
- pytania rzadko i krótko; nie przejmować prowadzenia rozmowy,
- nie upierać się przy swoich wnioskach, zachować otwarty umysł; opisywać niejasności zamiast je zgadywać.

Zasady dotyczące repozytorium:
- **Do `main` wolno scalać wyłącznie na wyraźne polecenie użytkownika** („Scal z main”). Zgoda na jedno scalenie nie obejmuje następnych.
- Nie tworzyć pull requestów, jeśli użytkownik o to nie prosi.
- Praca na gałęzi przydzielonej sesji; wypychanie: `git push -u origin <gałąź>`; scalenie to przewinięcie: `git push origin <gałąź>:main` (najpierw `git fetch origin main` i sprawdzenie, że `main` jest przodkiem gałęzi).
- Commity w języku polskim, opisowe; na końcu stopka z atrybucją podana przez środowisko sesji.
- Po scaleniu sprawdzić wdrożenie: odpytywać `https://uslyszmnie.netlify.app/?t=$(date +%s)` do pojawienia się unikalnego tekstu z nowej wersji (zwykle 30 s), potem krótka kontrola adresów i funkcji.
- Prawdziwe zapytania do `/.netlify/functions/api` kosztują i zużywają dzienny limit; wykonywać je tylko jako pojedynczy test po wdrożeniu, gdy to konieczne.

## 3. Struktura repozytorium

```
public/                  jedyny katalog publikowany przez Netlify (netlify.toml: publish = "public")
  index.html             cała aplikacja (React 18 UMD z cdnjs, JSX w <script type="text/plain" id="app-src">)
  quiz.html              quiz „Czy umiesz słuchać nastolatka?” (adres /quiz przez _redirects)
  prywatnosc.html        polityka prywatności (link w stopce aplikacji i quizu)
  404.html               strona „Nie ma takiej strony”
  sw.js                  service worker (CACHE_NAME 'uslyszmnie-v7'), push, offline
  manifest.json          manifest PWA (id "/", ikony PNG, zrzuty ekranu)
  icons/, screenshots/   ikony (192, 512, maskable, apple-touch, favicon, plakietka) i zrzuty do okna instalacji
netlify/functions/       api.mjs, push.mjs, push-daily.mjs, limits-cleanup.mjs
netlify/lib/             prompts.mjs, limits.mjs, push.mjs
netlify.toml, package.json, package-lock.json   zależności: @netlify/blobs ^10.7.13, web-push ^3.6.7
analiza/                 materiały robocze, NIE publikowane na stronie (repozytorium jest publiczne)
narzedzia/               skrypty testowe i pomocnicze (opis w punkcie 6)
```

## 4. Architektura

**Aplikacja (`public/index.html`)**
- Kod JSX kompiluje się raz w przeglądarce (Babel standalone 7.23.9 z cdnjs), a wynik trafia do `localStorage` pod kluczem `uslysz_mnie_build_<odcisk>_<długość>`. Każda zmiana kodu zmienia odcisk, więc nowa wersja kompiluje się sama; stare wpisy są usuwane.
- Baza scenek: tablica `SCENARIOS_DB`, 200 scenek `{id,lv,sex,ctx,says,emo,dist}`; poziom 1 (80): emocja czytelna, poziom 2 (45): kusi rada i naprawianie, poziom 3 (75): nastolatek zły na rodzica. `DB_VER=2` (zmiana numeru zeruje u użytkowników listę wylosowanych `usedIds`). Pola `emo` i `dist` nie są nigdzie wyświetlane ani wysyłane do AI. Scenka próbna (`DEMO_SCENE`, id 0) leży poza bazą.
- Płeć nastolatka: `sex` ("m"/"f") steruje formami („Nastolatek/Nastolatka”, „zrozumiany/zrozumiana”) i trafia do oceny; dla scenek własnych AI zwraca `sex`.
- Funkcje: Scenka Dnia (wybór deterministyczny wg daty, jeden strzał dziennie), seria dni, odznaki, historia, „Moja sytuacja” (AI tworzy scenkę z opisu rodzica), wyzwanie dla znajomego (stały quiz), pomoc „Jak reagować?”, panel emocji, onboarding.
- Klucze `localStorage`: `uslysz_mnie_v4` (postęp), `_hist`, `_dotd`, `_badges`, `_onb`, `_notif`, `_install`, `_push`.
- Propozycja instalacji (`InstallBanner`): okienko po 1,2 s na ekranie startowym, raz na uruchomienie; Android: przycisk (zdarzenie `beforeinstallprompt`), iPhone: instrukcja „Udostępnij → Do ekranu początkowego” (Safari i Chrome iOS, nie przeglądarki Facebooka/Instagrama); ukryte w trybie `standalone`, na komputerze i na 3 dni po „Nie teraz”.

**Ocena odpowiedzi przez AI (`netlify/functions/api.mjs`)**
- Telefon wysyła tylko dane: `{type:"feedback", level, girl, situation, teen_says, response}` albo `{type:"custom", description}`. Model (`gpt-5.6-terra`), instrukcje (`netlify/lib/prompts.mjs`: `SYS_FEEDBACK`, `SYS_CUSTOM`), `reasoning_effort` ("medium") i limit odpowiedzi (1024 tokeny) ustala serwer. Inne zapytania dostają 400.
- Klucz OpenAI: zmienna środowiskowa Netlify `OPEN_API_KEY`. Automatyczne doładowanie salda w OpenAI jest wyłączone (saldo to górna granica wydatków). Osobny klucz tylko dla aplikacji jest opcjonalny i niewykonany.
- Limity dzienne w Netlify Blobs (magazyn `limity`): 100 ocen na adres IP (zapis jako skrót) i 2000 dla całej aplikacji; dzień liczony czasem polskim. Zmienne `LIMIT_IP`, `LIMIT_DAY` nadpisują wartości. `limits-cleanup.mjs` (@daily) usuwa stare liczniki. Po przekroczeniu serwer zwraca 429 z `scope` ("ip" lub "all"), a aplikacja pokazuje komunikat bez ponawiania.
- Aplikacja ponawia zapytanie najwyżej raz (łącznie 2 próby) i tylko po błędzie sieci, 502/503/504 lub nieczytelnej odpowiedzi.

**Przypomnienia (push)**
- `push.mjs`: GET zwraca klucz publiczny VAPID, POST zapisuje subskrypcję (walidacja hosta: FCM, Mozilla, Apple, Windows) z opcją powiadomienia próbnego (`confirm`). Klucze VAPID powstają same przy pierwszym użyciu (magazyn `przypomnienia`, zapis warunkowy).
- Klucz subskrypcji: `sub/<strefa>/<skrót adresu>`, wskaźnik `idx/<skrót>`; strefa czasowa w kluczu pozwala `push-daily.mjs` (@hourly) czytać tylko te strefy, w których właśnie jest 20:00. Wysyłka paczkami po 20 (funkcje okresowe mają 30 s).
- Klient odświeża subskrypcję najwyżej raz dziennie (lub od razu po zmianie strefy). Na iPhonie powiadomienia działają tylko w aplikacji dodanej do ekranu początkowego (iOS 16.4+).

**Service worker (`sw.js`)**: strona najpierw z sieci (nowe wersje docierają od razu), biblioteki i czcionki z pamięci odświeżane w tle, praca offline, obsługa `push` i `notificationclick`. Przy zmianie zawartości powłoki podbić `CACHE_NAME`.

## 5. Dane i konwencje językowe scenek

- Aktualny eksport: `analiza/scenki.md` (czytelny), `.csv` (średnik, Excel), `.json`. Odświeżać po każdej zmianie scenek: `node narzedzia/extract.js public/index.html analiza <skrót_commita> <data>` i zatwierdzać osobnym commitem.
- Edycja scenek: wiersze `{id:N,lv:..,sex:"..",ctx:"..",says:"..",emo:"..",dist:[..]}` w `public/index.html`; zmieniać dokładnymi podmianami z kontrolą, że fragment występuje raz.
- Opis (`ctx`) w 3. osobie, czas teraźniejszy; wypowiedź (`says`) w 1. osobie, potoczna, bez przekleństw. Aplikacja sama opakowuje wypowiedź w „…”.
- Cytat w cytacie: «…» w wypowiedziach, „…” w opisach, nigdy '…'. Liczby (oceny) słownie w wypowiedziach („cztery siedem”).
- Scenka ma być zrozumiała po jednym przeczytaniu (kto, co, do czego odnosi się wypowiedź), płynna i bez zdań, które odciągają uwagę od ćwiczenia. Ostatnie przeglądy wskazały wzorce, które należy ograniczać w nowych scenkach: formuła „I nie mów, że…” na poziomie 2 (zostaje w 4 scenkach), echo jednym słowem na końcu („Wszyscy.”, „Każdy.”), „trzeci raz” jako miara krzywdy, porównania do przedszkola, przecinek zamiast kropki w opisach, negacja jako gest („nie wyjmuje telefonu”).
- Użytkownik decydował o kilku wypowiedziach osobiście (np. 177: «powiedziała mu», imię Tomka raz; 82: «Nauczycielka powiedziała»); nie cofać tych zmian.
- Plik `analiza/scenki-z-zycia.md` (10 scenek z internetu) użytkownik wyraźnie odrzucił („Nie bierz ich”): nie wprowadzać do aplikacji.
- `analiza/instrukcja-nowe-scenki.md` to pełna instrukcja do pisania nowej puli scenek od zera (użyta wcześniej przez sesję „Scenki v2”, gałąź `scenki-v2`).

## 6. Narzędzia testowe (`narzedzia/`)

Wymagania: Node 22, `npm ci` w katalogu repozytorium, Playwright zainstalowany globalnie (`/opt/node22/lib/node_modules/playwright`, przeglądarka w `/opt/pw-browsers`), `openssl`. Każdy skrypt ma w drugim wierszu opis użycia. Pierwszy argument to katalog repozytorium (dla `uitest.js` katalog z aplikacją).

| Skrypt | Co sprawdza |
|---|---|
| `pwatest.js` | 25 testów PWA: instalowalność (CDP), manifest, jednorazowa kompilacja Babela i pamięć kodu, start offline, okienko instalacji (Android, iPhone, komputer, przeglądarki wbudowane, tryb standalone), subskrypcja push. Z trzecim argumentem zapisuje zrzuty i **nadpisuje** `public/screenshots/*.png`; bez niego nic nie zapisuje. |
| `uitest.js`, `uitest2.js` | płeć nastolatka na ekranach, w podpowiedziach i w poleceniu do AI; migracja `DB_VER`; „Moja sytuacja”; Scenka Dnia; onboarding (atrapa funkcji `api` z prawdziwym `buildMessages`). |
| `limittest.js` | komunikaty o limicie, ponawianie zapytań, brak ponawiania przy limicie i błędnych danych. |
| `api-test.mjs` | funkcja `api`: walidacja, model i instrukcje z serwera, limity, północ, sprzątanie, błędy OpenAI (magazyn w pamięci, OpenAI zastąpione atrapą). |
| `push-test.mjs` | funkcje przypomnień: klucze VAPID, strefy czasowe i zmiana czasu, zmiana strefy w podróży, prawdziwy web-push na lokalny serwer HTTPS (certyfikat tymczasowy przez openssl). |
| `extract.js` | eksport bazy scenek do `scenki.md/.csv/.json`. |
| `icons.js` | renderowanie ikon z emoji 👂 (Noto Color Emoji). |
| `shot.js` | zrzuty stron prywatności, quizu i 404 w szerokości telefonu. |

Typowy komplet po zmianie aplikacji: `uitest.js`, `uitest2.js`, `limittest.js`, `pwatest.js` (porty np. 8765, 8767, 8771, 8791), po zmianie funkcji dodatkowo `api-test.mjs` i `push-test.mjs`.

## 7. Co zrobiono (skrót)

1. Eksport i przegląd pytań, ujednolicenie płci i rodzaju, usunięcie etykiety kategorii nad scenką, przegląd naturalności; pula 200 scenek ułożona od zera przez sesję „Scenki v2” (commit `6f0767e`) zastąpiła starą bazę; potem przeglądy stylu, jasności i płynności z poprawkami użytkownika (61 scenek w ostatniej serii).
2. Aplikacja na ekran telefonu: ikony PNG, pełny manifest, propozycja instalacji, szybszy start (pamięć skompilowanego kodu), service worker, przypomnienia o 20:00 z serwera.
3. Zabezpieczenie funkcji `api` (instrukcje i model po stronie serwera, limity dzienne, ograniczone ponawianie).
4. Polityka prywatności, publikacja tylko katalogu `public/`, strona 404, ujednolicenie cudzysłowów.
5. Wszystko powyższe jest na `main` (stan: commit `bd61859`) i na stronie.

## 8. Otwarte tematy

**Publikacja w Google Play (konto prywatne; użytkownik wdroży później)**
- Konto prywatne założone po 13 listopada 2023 wymaga testu zamkniętego: co najmniej 12 testerów zapisanych nieprzerwanie przez 14 dni, potem wniosek o dostęp do publikacji (rozpatrywany zwykle do 7 dni). Konto firmowe jest z tego zwolnione, ale wymaga numeru D-U-N-S; użytkownik wybrał konto prywatne i nie ma jeszcze testerów (pomysł: zaproszenie w aplikacji dla użytkowników Androida do otwartej grupy Google).
- Droga techniczna: Trusted Web Activity (Bubblewrap lub PWABuilder) otwierające stronę na pełnym ekranie, plik `assetlinks.json` na stronie (odcisk klucza podpisu Google po pierwszym przesłaniu), nowa paczka potrzebna tylko przy zmianie nazwy lub ikony i raz w roku przy podniesieniu wymaganej wersji Androida. Identyfikator pakietu jest trwały i nie można go zmienić.
- Zmiany w aplikacji do rozważenia: przycisk zgłaszania odpowiedzi wygenerowanej przez AI (wymóg Google dla treści AI); okienko instalacji w TWA i tak się nie pokaże (tryb standalone), ale warto sprawdzić; powiadomienia w TWA (Android 13+ pyta o zgodę).
- Materiały do sklepu: opis krótki (do 80 znaków) i pełny, grafika funkcji 1024×500, ikona 512 (jest), zrzuty ekranu z proporcjami najwyżej 2:1 (obecne w `public/screenshots/` mają 780×1688, czyli za wysokie dla sklepu), polityka prywatności (jest), formularz bezpieczeństwa danych, klasyfikacja wiekowa, grupa docelowa dorośli, kategoria Rodzicielstwo.
- **Bezpłatna czy płatna:** Google pisze, że po udostępnieniu aplikacji jako bezpłatnej nie można zmienić jej na płatną; trzeba wtedy utworzyć nową aplikację z nowym identyfikatorem pakietu (to osobna pozycja w sklepie, bez instalacji i ocen, a na koncie prywatnym najpewniej ponowny test zamknięty). Płatną można zmienić na bezpłatną, ale nie z powrotem. W formularzu tworzenia aplikacji wybiera się „bezpłatna/płatna”; nie ustalono, czy nigdy nieopublikowana aplikacja jest już zablokowana (sprawdzić w Play Console, strona „Ceny aplikacji”). Nowa wersja (aktualizacja) tej samej aplikacji nie zmienia typu. Zarabiać można później w bezpłatnej aplikacji przez abonament lub zakup w aplikacji (profil płatności w Play Console, produkty w Monetyzacji); za treści cyfrowe w aplikacji ze sklepu Google wymaga Google Play Billing, a w TWA opisano to przez Digital Goods API (wymaga przebudowania paczki i weryfikacji zakupów na serwerze; dokumentacja częściowo sprzed kilku lat). Prowizje zmieniły się od 30 czerwca 2026 w EOG (według strony Google subskrypcje 10% plus 5% za rozliczenie przez Google Play; tabela nieczytelna, potwierdzić w konsoli). Skutki podatkowe sprzedaży do ustalenia przez użytkownika z księgowym.
- Koszty AI rosną z użyciem; limity 100/2000 chronią budżet, a ewentualny model „bezpłatnie z limitem, abonament bez limitu” wymagałby rozpoznawania płacących po stronie serwera (aplikacja nie ma kont).

**Inne**
- Test na prawdziwym telefonie (instalacja, trzy scenki, zgoda na przypomnienia, powiadomienie próbne, przypomnienie o 20:00) jest po stronie użytkownika; wyniku nie zgłosił.
- Osobny klucz OpenAI dla aplikacji (opcjonalnie), okresowe zaglądanie w saldo OpenAI.
- Nic z powyższego nie jest rozpoczęte; wszystkie decyzje należą do użytkownika.

## 9. Pułapki techniczne

- Nagłówki `crossorigin="anonymous"` na skryptach z cdnjs są potrzebne, żeby service worker mógł je poprawnie trzymać w pamięci.
- Headless Chromium zgłasza `Notification.permission === "denied"` mimo przyznanej zgody; aplikacja sprawdza zgodę przez `navigator.permissions` (`notifGranted()`).
- `page.route` Playwrighta nie przechwytuje `localhost`; testy używają własnego serwera HTTP z atrapami `/.netlify/functions/*`.
- `web-push` wysyła tylko przez HTTPS, więc test szyfrowania używa lokalnego serwera z certyfikatem tymczasowym.
- `@netlify/blobs` w wersji 11 wymaga Node 22.12 lub nowszego; zależność przypięta do `^10.7.13`.
- Funkcje okresowe Netlify mają 30 s na całą pracę (stąd paczki po 20 subskrypcji); pakiety CJS importować w ESM jako domyślne.
- W wyrażeniach regularnych JavaScript `\b` nie działa po polskich literach (stąd lookahead w `isGirl`).
- Dźwiękowa i wizualna spójność: ikony i `apple-touch-icon` powstają z emoji 👂 (`narzedzia/icons.js`); zmiana ikony wymaga podbicia `CACHE_NAME` i, dla sklepu, nowej paczki.
- Narzędzia GitHub MCP bywają rozłączane; `git` przez powłokę działa niezależnie.
