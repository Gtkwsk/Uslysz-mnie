# Usłysz Mnie: przekazanie sesji (stan na 2026-10-08, uzupełnienie 2026-10-19)

Dokument dla sesji, która przejmuje pracę po sesji „Usłysz mnie” (session_01TSppmoGZHV7epTZ2eSgsg9, 6–19 października 2026). Punkty 1–9 powstały 2026-10-08 dla sesji „Usłysz mnie 2”; ta sesja została potem zarchiwizowana bez wykonania żadnej pracy, a praca przechodzi do nowej sesji na innym koncie Claude. Punkty 10–16 uzupełniają dokument o wszystko, co wcześniej było tylko w rozmowie. Opisuje projekt, decyzje użytkownika, stan wdrożenia, narzędzia testowe, pułapki techniczne i otwarte tematy. Kod jest źródłem prawdy; ten plik ma oszczędzić odkrywania go od zera.

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
- Test „Sprawdź się” (od 2026-11-01, komponent `TestFlow`): kafelek przed Poziomem 1, 10 stałych scenek (`TEST_IDS`: 10, 22, 76, 67, 83, 115, 112, 126, 185, 191, wybrane z bazy jako najlepsze: jasne po jednym czytaniu, emocja pokazana, nie nazwana, każda kusi inną pułapką, bez wzorców do ograniczania z punktu 5). Każda odpowiedź jest oceniana w tle zwykłym zapytaniem `feedback`, ocen nie widać do końca. Po ostatniej scence zapytanie `test_summary` (instrukcja `SYS_TEST`, limit 3000 tokenów) opisuje styl odpowiadania, mocne strony, 2–3 rzeczy do poćwiczenia i ciepłe zakończenie. Wynik liczbowy to suma ocen (0–100), liczona w aplikacji. Test w toku: `uslysz_mnie_test`, ostatni wynik: `uslysz_mnie_test_wynik`. Test liczy się do serii dni, ale nie do statystyk, poziomu, odznak ani historii treningu. Jeden test to 11 zapytań do AI.
- Propozycja instalacji (`InstallBanner`): okienko po 1,2 s na ekranie startowym, raz na uruchomienie; Android: przycisk (zdarzenie `beforeinstallprompt`), iPhone: instrukcja „Udostępnij → Do ekranu początkowego” (Safari i Chrome iOS, nie przeglądarki Facebooka/Instagrama); ukryte w trybie `standalone`, na komputerze i na 3 dni po „Nie teraz”.

**Ocena odpowiedzi przez AI (`netlify/functions/api.mjs`)**
- Telefon wysyła tylko dane: `{type:"feedback", level, girl, situation, teen_says, response}` albo `{type:"custom", description}`. Model (`gpt-5.6-terra`), instrukcje (`netlify/lib/prompts.mjs`: `SYS_FEEDBACK`, `SYS_CUSTOM`), `reasoning_effort` ("medium") i limit odpowiedzi (1024 tokeny) ustala serwer. Inne zapytania dostają 400.
- Klucz OpenAI: zmienna środowiskowa Netlify `OPEN_API_KEY`. Automatyczne doładowanie salda w OpenAI jest wyłączone (saldo to górna granica wydatków). Osobny klucz tylko dla aplikacji jest opcjonalny i niewykonany.
- Limity dzienne w Netlify Blobs (magazyn `limity`): 1000 ocen na adres IP (zapis jako skrót; do 2026-11-01 było 100) i 2000 dla całej aplikacji; dzień liczony czasem polskim. Zmienne `LIMIT_IP`, `LIMIT_DAY` nadpisują wartości. `limits-cleanup.mjs` (@daily) usuwa stare liczniki. Po przekroczeniu serwer zwraca 429 z `scope` ("ip" lub "all"), a aplikacja pokazuje komunikat bez ponawiania.
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
| `seria-test.js` | seria dni (otwarcie aplikacji jej nie zwiększa), numer scenki w nagłówku (ten sam od losowania do oceny i udoskonalenia), przycisk 🧭 nie zasłania końca ekranu w trzech rozmiarach telefonu. |
| `poprawka-test.js` | liczenie poprawek („Spróbuj ponownie”, „Udoskonal odpowiedź”): scenka liczy się raz, z najlepszym wynikiem, w statystykach, poziomie, pułapkach, historii i podsumowaniu. |
| `sprawdz-test.js` | test „Sprawdź się”: kafelek przed Poziomem 1, brak ocen po drodze, oceny w tle, przerwa i powrót, błąd analizy i ponowienie, wynik, styl, polecany poziom, brak wpływu na statystyki treningu. |

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
- Koszty AI rosną z użyciem; limity 1000/2000 chronią budżet, a ewentualny model „bezpłatnie z limitem, abonament bez limitu” wymagałby rozpoznawania płacących po stronie serwera (aplikacja nie ma kont).

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

---

# Uzupełnienie z 2026-10-19

## 10. Stan na 2026-10-19 i co działo się po 2026-10-08

- **Kod i strona bez zmian od 2026-10-07.** `main` = `bd61859`, i to ta wersja działa na uslyszmnie.netlify.app.
- **Gałęzie:**
  - `ccr-adfc012f-vt8hps` = `main` plus commity z tym dokumentem, `narzedzia/` i `analiza/zrzuty/`. Nie ma na niej zmian w `public/` ani w `netlify/`.
  - `scenki-v2` (`6f0767e`): pula v2 jest już w aplikacji. Gałęzi nie scalać; zostaje jako zapis.
- **Historia przekazania:**
  - 2026-10-08: commit `4b34b94` (dokument i narzędzia) i sesja „Usłysz mnie 2” (session_015LSp6MxQhPdeYPoS2BGvS1).
  - 2026-10-19 autor polecił: „Usuń przekazanie i nową sesję. Zrobimy co innego.” Gałąź została cofnięta do `bd61859` (wypchnięcie z `--force-with-lease`), a „Usłysz mnie 2” zarchiwizowana. Nie wykonała żadnej pracy w repozytorium.
  - Tego samego dnia autor polecił zamknąć sesję przed przejściem pracy na inne konto Claude. Dokument i narzędzia przywrócono wtedy z `4b34b94` i uzupełniono o punkty 10–16.
  - Co miało oznaczać „Zrobimy co innego”, nie zostało powiedziane.
- **Sprzątanie konta (2026-10-19):** usunięte dwa jednorazowe zaplanowane zadania tej sesji (kontrole sesji „Scenki v2” z 2026-10-06, oba już wykonane i wyłączone). Subskrypcji zdarzeń z pull requestów nie było. Na koncie zostało zaplanowane zadanie „Głosy: przekazanie do sesji Karty terapeutyczne 3”, które dotyczy innego projektu i nie było ruszane.
- **Sesje pomocnicze tego projektu** (na nowym koncie ich identyfikatory nie będą dostępne):
  - session_01GtbBntRQZM56p1onBTseKp „Scenki v2”: przerwana i zarchiwizowana. Dostała nieistniejące ID modelu `claude-fable-5-1-max`, po cichu przeszła na Fable 5 i zużyła ok. 8 USD.
  - session_016VXeHYDEgUmweCDr9eMjVk „Scenki v2 (Fable 5.1)”: napisała pulę v2 w ok. 37 minut. Później poprawiała ją na prośbę autora (mama/tata zamiast „rodzic”, nazwy nauczycielek, 12 poprawek realiów, scenka 41).
  - session_015LSp6MxQhPdeYPoS2BGvS1 „Usłysz mnie 2”: zarchiwizowana.
- **Lekcja:** wysiłku rozumowania („max”) nie podaje się w nazwie modelu. Przy tworzeniu sesji przez API trzeba podać czyste ID modelu i sprawdzić w logu, czy nie było `model_fallback`.

**Historia `main` (najważniejsze commity):**

| Commit | Data | Zakres |
|---|---|---|
| `dc54991` | 2026-10-06 | Usunięcie losowej etykiety kategorii, przegląd naturalności |
| `1045778` | 2026-10-06 | Przegląd starej bazy, wynik 200 scenek |
| `94dd3a0` | 2026-10-06 | Wymiana na pulę v2 |
| `0ddcfeb` | 2026-10-06 | Scenka 41 z puli v2 |
| `cff0e8c` | 2026-10-06 | PWA: ikony, okienko instalacji, szybszy start, przypomnienia push |
| `8d9071f` | 2026-10-07 | Zabezpieczenie `api`: instrukcje na serwerze, limity |
| `ed76314` | 2026-10-07 | Limit 100 ocen dziennie na adres IP |
| `01c1930`, `e01e7a5`, `94bb8a7` | 2026-10-07 | Polityka prywatności, publikacja tylko `public/`, cudzysłowy, quiz, adres e-mail |
| `c6ce03a` … `50b524e` | 2026-10-07 | Poprawki scenek: 1, 12, cytaty, 30, 81, jasność (20 i 39 scenek), 82, 136, styl (61 scenek) |
| `114b3fa`, `bd61859` | 2026-10-07 | Scenka 177 i eksport |

## 11. Ustawienia poza repozytorium

Wartości kluczy i haseł nie są nigdzie zapisane w repozytorium i nie należy ich tu wpisywać.

**Netlify (strona uslyszmnie.netlify.app)**
- Wdrażanie automatyczne z `main`. `netlify.toml`: `publish = "public"`, funkcje w `netlify/functions`.
- **Zmienne środowiskowe używane przez kod:**
  - `OPEN_API_KEY` (wymagana): klucz OpenAI, ustawiony przez autora.
  - `LIMIT_IP` i `LIMIT_DAY` (opcjonalne, nadpisują 1000 i 2000). Według rozmowy nie były ustawiane, więc działają wartości domyślne. Panelu nie sprawdzano.
  - Innych zmiennych kod nie czyta.
  - Zmiana zmiennej działa dopiero po ponownym wdrożeniu (Deploys → Trigger deploy).
- **Klucze VAPID** do przypomnień nie są zmiennymi. Funkcja `push` tworzy je sama przy pierwszym użyciu i zapisuje w Netlify Blobs (magazyn `przypomnienia`, klucz `vapid`). Usunięcie tego wpisu unieważni wszystkie subskrypcje.
- **Netlify Blobs:** magazyny `przypomnienia` (`vapid`, `sub/<strefa>/<skrót>`, `idx/<skrót>`) i `limity` (`all/<dzień>`, `ip/<dzień>/<skrót>`).
- **Funkcje okresowe:** `push-daily` (@hourly) i `limits-cleanup` (@daily). W panelu (zakładka Functions) powinny mieć oznaczenie „Scheduled”, a log `push-daily` co godzinę podaje liczbę wysłanych przypomnień. Autor nie potwierdził, że to widzi.

**OpenAI (platform.openai.com, konto autora)**
- **Automatyczne doładowanie jest wyłączone.** 2026-10-07 autor zgłosił, że widzi przycisk „Enable auto reload”, czyli funkcja nie jest włączona. Saldo jest więc górną granicą wydatków.
  - Wysokości salda nie podano.
  - OpenAI nie powiadamia o wyczerpaniu salda. Aplikacja pokazuje wtedy „Nie udało się uzyskać oceny”, więc saldo trzeba okresowo sprawdzać (platform.openai.com/settings/organization/billing/overview).
  - Autor nie widział w menu sekcji „Organization”. Właściwa strona otworzyła się pod adresem bezpośrednim.
- **Miesięczny budżet projektu** (Settings → Projects → Limits) nie był ustawiany ani sprawdzany.
- **Osobny klucz dla aplikacji:** opcjonalny, niewykonany. Nie ustalono, czy obecny klucz służy tylko tej aplikacji (lista kluczy: platform.openai.com/api-keys). Kolejność wymiany:
  1. utworzyć nowy klucz;
  2. podmienić `OPEN_API_KEY` w Netlify i uruchomić Trigger deploy;
  3. sprawdzić jedną scenką, że ocena działa;
  4. dopiero potem unieważnić stary klucz (Revoke).
- **Model `gpt-5.6-terra`**, `reasoning_effort` "medium", najwyżej 1024 tokeny odpowiedzi.
  - Cennika nie sprawdzano.
  - Szacunek: wejście ok. 2000–2500 tokenów (sama instrukcja oceny ma ok. 5600 znaków), czyli od kilku do kilkunastu groszy za ocenę. To rząd wielkości, nie wycena.
  - Niewdrożone pomysły na oszczędności: pamięć podręczna promptów OpenAI dla stałej instrukcji, próba niższego `reasoning_effort` przy porównaniu trafności ocen.
- **Jedna prawdziwa ocena** po wdrożeniu `8d9071f` (2026-10-07): 10/10, odpowiedź po ok. 5 s.

**GitHub:** repozytorium publiczne. W ustawieniach nic nie zmieniano. W historii repozytorium nie było śladu klucza OpenAI (sprawdzone 2026-10-07).

**Google Play:** w tej sesji nic w Play Console nie robiono. Nie wiadomo, czy konto dewelopera już istnieje. Szczegóły w punktach 8 i 14.

## 12. Decyzje autora (uzupełnienie punktu 5)

- Etykieta kategorii nad scenką (losowana, niezależna od treści) usunięta. Odrzucona alternatywa: stałe kategorie przypisane scenkom.
- Scenka „prawie nic nie jem i nie piję” usunięta. To zgłoszenie problemu zdrowotnego: samo echo nie wystarcza i trening utrwalałby niepełną reakcję.
- Cała stara baza zastąpiona pulą v2, pisaną od zera bez znajomości starych scenek, według `analiza/instrukcja-nowe-scenki.md`.
- 10 „scenek z życia” odrzucone („Nie bierz ich”).
- Aplikacja na telefon: wybrany wariant „dopracowana PWA z propozycją instalacji po uruchomieniu” (jest). App Store odłożony (99 USD rocznie, potrzebny Mac, ryzyko odrzucenia opakowanej strony).
- Limity: proponowane 40 na adres IP, autor zmienił na 100 dziennie, a 2026-11-01 (po dodaniu testu „Sprawdź się”, 11 zapytań na test) na 1000, żeby test wystarczył dla 50 osób naraz w jednej sieci (warsztaty: 50 × 11 = 550 zapytań z jednego IP). 2000 dziennie łącznie bez zmian.
- Polityka prywatności: administrator Robert Gutkowski, kontakt gtkwsk@gmail.com, adres publicznie na stronie. Data w polityce: 7 października 2026.
- Quiz: nad wypowiedzią nie ma podpisu „Twój syn mówi”. Opis kończy się „Po chwili wychodzi i mówi:”, tak samo w tekście wyzwania dla znajomego.
- **Cytaty:** «…» w wypowiedziach, „…” w opisach, mowa zależna tam, gdzie brzmi naturalniej. Zasada autora: „Forma ma nie przeszkadzać, żeby rodzic skupił się na tym, czego się uczy.”
- **Poszczególne scenki** (nie cofać):
  - 1 „Dwója.” (nie „Mierna.”);
  - 12 „Cztery siedem. Do paska zabrakło pięciu setnych.”;
  - 2 „to się załamię”;
  - 105 „nie dam rady przeczytać w trzy miesiące”;
  - 109 Librus i poprawy przed wystawieniem ocen;
  - 82 „Nauczycielka powiedziała”;
  - 136 mama odbiera telefon córki (dwie wcześniejsze wersje z podsłuchiwaniem pod drzwiami autor uznał za nielogiczne);
  - 177 „Mama Tomka to usłyszała i powiedziała mu, a on całej klasie.”
  - 115 „Dalej jestem na przerwie sama.” (nie „jem”; 2026-11-01);
  - 185 „Jakbym była nieważna.” (nie „Jakby mnie nie było.”; 2026-11-01).
- Przegląd stylu robiono na Sonnecie (autor przełączył model, oczekując większej uważności na brzmienie), resztę na Opusie.
- Google Play: konto prywatne, publikacja później. Bezpłatna czy płatna: nierozstrzygnięte (punkt 8).
- Kontynuacja pracy na innym koncie Claude.

## 13. Odrzucone pomysły i drogi

- Scenki z internetu (`analiza/scenki-z-zycia.md`, id 201–210).
- Stałe kategorie scenek, scalanie podobnych scenek starej bazy (bezprzedmiotowe po wymianie na v2).
- Ukrywanie lub „zakodowanie” klucza albo adresu w kodzie strony: nic nie daje, bo ochrona musi być po stronie serwera (wykonana w `8d9071f`).
- Dodawanie na siłę wtrąceń typu „no”, „w sumie” dla „nastolatkowego” brzmienia. Uznane za gorsze niż ich brak. Literackie linijki 77 i 184 zostają.
- App Store na tym etapie. Konto firmowe Google Play (D-U-N-S): autor wybrał prywatne.
- Kupowani testerzy i grupy wymiany testerów: odradzane, bo bierni testerzy zwiększają ryzyko odmowy. Testerzy spośród pacjentów: odradzane, bo miesza to role terapeuty i proszącego o przysługę.
- Reklamy w aplikacji: nie planowane, obniżałyby zaufanie.

## 14. Wątki otwarte (nierozstrzygnięte przez autora, nic nie rozpoczęto)

1. **Pola `emo` i `dist`** nie są używane. AI ocenia według własnego odczytania emocji, więc zamysł autora scenki nie uczestniczy w ocenie. Możliwości:
   - przekazać `emo` do AI jako wskazówkę (z dopiskiem, że inne trafne nazwania też są dobre);
   - dodać pytanie „Co czuje?” z czterema odpowiedziami (`emo` + `dist`);
   - pokazać emocję autora po ocenie;
   - zostawić bez zmian.
2. **Mapa emocji** (panel 🧭, `EMOTION_GROUPS` w `public/index.html`) nie zawiera pięciu emocji docelowych z bazy: bunt, niesprawiedliwość, przytłoczenie, zazdrość, żal (sprawdzone w kodzie 2026-10-19).
3. **Rodzaj rodzica.** Interfejs zwraca się do użytkownika w rodzaju męskim („Co poczułeś”, „spróbowałeś”), a scenki nazywają wprost mamę lub tatę (w puli v2 ok. 41 i 33). Mama ćwiczy więc czasem za tatę i odwrotnie. Możliwości: formy neutralne, wybór płci rodzica na starcie, bez zmian.
4. **Scenka próbna** (`DEMO_SCENE`: „Starałem się, a i tak wszystko spieprzyłem. Chyba naprawdę jestem do niczego.”) pochodzi ze starej bazy. To samo zdanie jest w pomocy „Jak reagować?” i jako wzorzec w `netlify/lib/prompts.mjs`. Wymiana ma sens tylko we wszystkich trzech miejscach naraz.
5. **Pozostałe uwagi do treści scenek:**
   - ok. 75 z 200 opisów zawiera „wraca” lub „wrócił”;
   - 138 opisów zaczyna się od „NN-latek/latka”;
   - poziom 3 często kończy się pytaniem retorycznym;
   - scenka 45 (plama z okresu na lekcji) jest najodważniejsza obyczajowo, 103 (zablokowana pralka) ma najsłabszy ładunek emocjonalny.

   Nie wymagają działania bez decyzji autora.
6. **Google Play** (szczegóły w punkcie 8):
   - nie wybrano nazwy pakietu (propozycja `app.uslyszmnie`; nazwa jest nieodwracalna);
   - nie zebrano testerów;
   - nie przygotowano paczki TWA, `assetlinks.json`, przycisku zgłaszania odpowiedzi AI, ukrycia okienka instalacji w TWA i odesłania do Play w Chrome, zrzutów 2:1, grafiki 1024×500 ani opisów;
   - pomysł na testerów bez wykonania: zaproszenie w aplikacji dla użytkowników Androida do otwartej grupy Google; dobre źródła to warsztaty, koledzy terapeuci, obecni użytkownicy;
   - szacowany czas na koncie prywatnym: ok. 3 tygodni (weryfikacja konta, 14 dni testu, do 7 dni rozpatrzenia).
7. **Polityka prywatności** nie była przejrzana przez osobę znającą RODO (zalecane przed Google Play). Przy każdej zmianie przetwarzania danych (Play, płatności) trzeba zaktualizować tekst i datę.
8. **Kto płaci za AI:**
   - autor (aplikacja jako wizytówka gabinetu i warsztatów);
   - freemium z abonamentem przez Google Play Billing;
   - instytucje (szkoły, poradnie, fundacje, granty);
   - połączenie tych dróg.

   Brak kont w aplikacji utrudnia rozpoznawanie płacących.
9. **Zasięg:**
   - sam sklep da raczej kilka do kilkudziesięciu instalacji miesięcznie;
   - główne źródła: polecenia autora, warsztaty, szkoły, poradnie, grupy rodziców, wbudowane wyzwanie i quiz, media;
   - o powodzeniu przesądzi, czy użytkownik wraca po tygodniu.

## 15. Testy

- **Na telefonie:** autor nie zgłosił wyniku. Nie jest potwierdzone, że na prawdziwym urządzeniu działają:
  - instalacja;
  - powiadomienie próbne („Przypomnienia włączone. Do zobaczenia wieczorem przy Scence Dnia.”);
  - przypomnienie o 20:00.

  Procedura: zainstalować, zrobić trzy scenki, zgodzić się na przypomnienia. Na iPhonie działa to tylko z ekranu początkowego, od iOS 16.4.
- **Automatyczne:** ostatni pełny przebieg 2026-10-08 na `bd61859` z narzędziami z `narzedzia/`:
  - `pwatest.js`: 25/25;
  - `api-test.mjs`: 12/12;
  - `push-test.mjs`: 15/15;
  - `limittest.js`: 5/5;
  - `uitest.js` i `uitest2.js`: zgodne formy płci na ekranach, w podpowiedziach i w poleceniu do AI, stała podpowiedź przy pisaniu.

  Kod od tego czasu się nie zmienił; 2026-10-19 testów nie powtarzano.
- **Po każdym scaleniu sprawdzano na stronie:** nowy tekst w HTML, `/quiz`, `/prywatnosc.html`, `manifest.json`, ikony, `sw.js`, odpowiedź funkcji `push` (GET klucza) i `api` (odrzucenie błędnego zapytania kodem 400), 404 pod `/analiza/scenki.md` i `/netlify/lib/prompts.mjs`.

## 16. Materiały spoza repozytorium

- **Przeniesione 2026-10-19:** `analiza/zrzuty/`, czyli zrzuty z 2026-10-07 w szerokości telefonu:
  - `okienko-android.png`, `okienko-iphone.png`: okienko instalacji;
  - `prywatnosc.png`, `quiz.png`, `404.png`.

  Mogą posłużyć jako punkt odniesienia przy materiałach do sklepu, ale nie spełniają wymogu proporcji 2:1.
- **Nie przeniesione, bo są już w historii git albo nie mają wartości:**
  - jednorazowe skrypty podmian w scenkach (ich wynik jest w commitach z punktu 10);
  - kopia strony sprzed wymiany bazy (historia `main`);
  - robocze wersje puli v2 (gałąź `scenki-v2`);
  - logi testów (wyniki w punkcie 15);
  - tymczasowy certyfikat i klucz testu push (powstają na nowo przy każdym uruchomieniu `push-test.mjs`; kluczy nie wolno zatwierdzać).
- **Zapis rozmowy** nie przechodzi. Jej treść merytoryczna jest w punktach 1–16 tego dokumentu.
