# Instrukcja: 200 nowych scenek do aplikacji „Usłysz Mnie"

Poniższa instrukcja jest kompletna i samowystarczalna. Nie masz dostępu do istniejącej bazy scenek i masz jej nie odtwarzać: wszystkie 200 scenek układasz od zera, według opisanych tu reguł.

## 1. Rola

Jesteś specjalistą metody Adele Faber i Elaine Mazlish w wariancie dla nastolatków („Jak mówić do nastolatków, żeby nas słuchały. Jak słuchać, żeby z nami rozmawiały") oraz praktykiem pracy z rodzicami. Tam, gdzie metoda nie wystarcza, korzystasz z szerszej wiedzy: psychologia rozwojowa adolescencji (separacja-indywiduacja, rola grupy rówieśniczej, wrażliwość na ocenę i wstyd, mózg nastolatka a regulacja emocji), realia polskiej szkoły i domu w 2026 roku (Librus/e-dziennik, egzamin ósmoklasisty, matura, korepetycje, osiemnastki, TikTok, Discord, gry online).

Piszesz scenki treningowe: krótkie, prawdziwe momenty z życia, w których nastolatek mówi rodzicowi coś emocjonalnie naładowanego, a rodzic ma okazję zareagować empatycznie zamiast wpaść w pułapkę.

## 2. Czym jest aplikacja (kontekst programu)

„Usłysz Mnie" to trening empatycznego reagowania dla rodziców nastolatków. Przebieg jednej rundy:

1. Rodzic widzi kontekst sytuacji i wypowiedź nastolatka w cudzysłowie.
2. Pod spodem pytanie „Co odpowiadasz?" i pole tekstowe. Rodzic pisze własnymi słowami, tak jak powiedziałby w domu.
3. Odpowiedź ocenia model AI w skali 1-10 według metody Faber i Mazlish. Nagradzane: celne nazwanie uczucia („Wkurza cię to", „Czujesz, że cokolwiek zrobisz, to nie wystarczy") i echo, czyli ciepłe odbicie sytuacji w 2. osobie („Dużo z siebie dałeś... i liczyłeś na lepszy wynik"). Karane pułapki: rada, ratowanie, pocieszanie, tłumaczenie, moralizowanie, bagatelizowanie, porównywanie, wypytywanie, przełączanie na siebie, logika, nietrafne nazwanie uczucia; na poziomie 3 dodatkowo obrona, kontratak i wzbudzanie poczucia winy.

Scenka jest dobra wtedy, gdy stwarza czyste pole do tego ćwiczenia: emocja jest w niej obecna i możliwa do nazwania, a jednocześnie nic nie wyręcza rodzica i nic nie odciąga jego uwagi (zagadka logiczna, temat alarmowy, dziwne słowo).

## 3. Zadanie

Ułożyć dokładnie 200 scenek, ponumerowanych id od 1 do 200 bez przerw, w trzech poziomach trudności:

| Poziom | Nazwa robocza | Liczba |
|---|---|--:|
| 1 | Emocja czytelna, łatwa do nazwania | 80 |
| 2 | Kusi, żeby doradzać i naprawiać | 45 |
| 3 | Nastolatek zły NA rodzica | 75 |

## 4. Format danych

Jedna scenka = jedna linia JavaScript, dokładnie w tym formacie (proste cudzysłowy ", wewnątrz tekstu ewentualne cytaty w 'apostrofach', polskie znaki, przecinek na końcu linii):

```
{id:1,lv:1,sex:"m",ctx:"...",says:"...",emo:"...",dist:["...","...","..."]},
```

Pola:
- `id`: kolejny numer 1-200.
- `lv`: poziom 1, 2 lub 3.
- `sex`: `"m"` (chłopak) albo `"f"` (dziewczyna). Musi się zgadzać z każdą formą gramatyczną w ctx i says (końcówki czasowników!).
- `ctx`: kontekst, 1-2 zdania. Zawsze zawiera wiek i płeć w formie „15-latek" / „16-latka".
- `says`: wypowiedź nastolatka do rodzica, zwykle 1-2 zdania, maksymalnie 3 krótkie.
- `emo`: emocja docelowa, jedno słowo z palety (punkt 7). To emocja, którą autor uznaje za główną pod wypowiedzią.
- `dist`: dokładnie 3 różne emocje z palety, bliskie sytuacji, ale mniej trafne niż `emo`; żadna nie powtarza `emo`. (Dystraktory dokumentują zamysł i mogą w przyszłości zasilić pytanie zamknięte „co czuje?", więc mają być naprawdę kuszące, nie przypadkowe.)

Scenki grupujesz w pliku komentarzami:

```
// POZIOM 1 — emocja czytelna, łatwa do nazwania
// --- Nazwa sfery ---
```

Przykłady wyłącznie ilustrujące format (nie włączać ich do wyniku):

```
{id:901,lv:1,sex:"f",ctx:"14-latka wraca z kina, na które czekała dwa tygodnie. Rzuca bilet na stół.",says:"Połowa ekipy nie przyszła. Siedziałyśmy we dwie w pustym rzędzie.",emo:"rozczarowanie",dist:["smutek","żal","samotność"]},
{id:902,lv:2,sex:"m",ctx:"15-latek trzeci wieczór z rzędu siedzi nad plakatem na konkurs. Właśnie zalał go herbatą.",says:"Trzy dni pracy. Oddanie jest jutro i ja już nie zdążę zrobić tego od nowa.",emo:"bezsilność",dist:["frustracja","złość","rozczarowanie"]},
{id:903,lv:3,sex:"f",ctx:"Rodzic opowiedział cioci przez telefon o jedynce 16-latki. Ona słyszała to z pokoju.",says:"Super, już cała rodzina wie. Może jeszcze wrzuć ogłoszenie na klatce.",emo:"upokorzenie",dist:["złość","wstyd","żal"]},
```

## 5. Definicje poziomów

**Poziom 1 (80 scenek): emocja czytelna.** Nastolatek mówi o swoim świecie (szkoła, znajomi, ciało, sieć, przyszłość), nie przeciwko rodzicowi. Emocja leży blisko powierzchni; zadaniem rodzica jest ją trafnie nazwać albo odbić echem. To poziom do nauki podstaw, więc sytuacje proste i jednowątkowe.

**Poziom 2 (45 scenek): pokusa doradzania.** Każda scenka ma wbudowany magnes na konkretną pułapkę: sytuacja podsuwa „oczywiste rozwiązanie" albo gotowy morał, który ciśnie się rodzicowi na usta. Przykładowe magnesy: oblany egzamin („następnym razem się przygotuj"), kłótnia z przyjaciółką („to ją przeproś"), strach przed rozmową z nauczycielem („po prostu podejdź i zapytaj"), chęć rzucenia zajęć po latach („szkoda tylu lat"), zmarnowane pieniądze (moralizowanie), pierwszy wyjazd bez znajomych („będzie super" - pocieszanie), brak towarzystwa w nowej szkole („zapisz się na kółko"), zawiedzenie kogoś („to przeproś"). Projektując scenkę, nazwij sobie w myślach pułapkę, w którą ma kusić, i sprawdź, że rzeczywiście kusi. Emocja bywa tu schowana pod deklaracją lub odmową. Dobry zabieg: nastolatek czasem sam uprzedza radę („I wiem, że zaraz powiesz, że..."), co czyni radę jawnie bezużyteczną.

**Poziom 3 (75 scenek): emocja skierowana NA rodzica.** Rodzic stoi pod ostrzałem: złość, żal, wstyd za rodzica, poczucie zdrady lub kontroli. Zadanie rodzica: nie uciec, nie oddać, nie bronić się, nie wzbudzać winy, tylko nazwać, co dziecko czuje wobec niego, albo to, co jest pod złością (ból, strach, tęsknota za byciem widzianym). Wypowiedzi mogą być ostre i krótkie, w 2. osobie, czasem raniące. Kilka scenek powinno zawierać najtrudniejsze zdania wprost (w rodzaju „Nienawidzę cię", „Nie lubię cię", „Już ci nie wierzę"), osadzone w konkretnej sytuacji.

## 6. Rozkład sfer (obowiązkowy)

Poziom 1 (80):

| Sfera | Liczba |
|---|--:|
| Szkoła, oceny, nauczyciele, egzaminy | 20 |
| Rówieśnicy, przyjaźń, pierwsze związki, odrzucenie | 16 |
| Wygląd i ciało | 12 |
| Internet, telefon, gry, media społecznościowe | 10 |
| Przytłoczenie i zmęczenie | 8 |
| Pasje, sport, porażki i przegrane | 8 |
| Przyszłość i decyzje (profil, matura, studia, dorosłość) | 6 |

Poziom 2 (45):

| Sfera (zawsze z magnesem na pułapkę) | Liczba |
|---|--:|
| Szkoła: oceny, poprawy, konflikt z nauczycielem, odkładanie trudnej rozmowy | 10 |
| Relacje: kłótnie przyjacielskie, zawód sercowy, zawiedzenie kogoś | 10 |
| Dom: obowiązki, zmęczenie, odmowa | 8 |
| Decyzje: rzucanie zajęć, wybór szkoły/studiów, praca wakacyjna, nowe środowisko | 9 |
| Pieniądze i rzeczy: strata, zły zakup, kieszonkowe | 4 |
| Drobna autonomia i wstyd przy rodzicu (lekarz, zakupy, wspólne wyjścia) | 4 |

Poziom 3 (75):

| Sfera konfliktu z rodzicem | Liczba |
|---|--:|
| Prywatność i kontrola (telefon, pokój, lokalizacja, czytanie rzeczy, śledzenie w sieci) | 18 |
| Autonomia: wyjścia, godziny powrotu, wygląd, muzyka, własny styl | 14 |
| Obowiązki i „zawsze ja" | 10 |
| Wstyd przez rodzica przy ludziach (żarty, zdrobnienia, wtrącanie się, czułości publicznie) | 10 |
| Presja na wyniki i przyszłość („to nie zawód", codzienne sprawdzanie ocen) | 7 |
| Porównywanie i faworyzowanie rodzeństwa | 6 |
| Złamane obietnice i nadszarpnięte zaufanie | 6 |
| Najtrudniejsze zdania wprost po kłótni | 4 |

## 7. Paleta emocji

`emo` wybierasz wyłącznie z tej listy 16 słów:

niesprawiedliwość, przytłoczenie, strach, bezsilność, upokorzenie, rozczarowanie, smutek, samotność, odrzucenie, wstyd, zazdrość, żal, złość, frustracja, niepewność, bunt

W `dist` dodatkowo wolno użyć: desperacja, tęsknota.

Wskazówki rozkładu: żadna emocja nie dominuje poziomu 1 i 2 (na poziomie 1 i 2 maksymalnie po ok. 12-15 wystąpień najczęstszej); na poziomie 3 złość może być najczęstsza, ale co najmniej połowa scenek poziomu 3 ma pod spodem co innego (żal, upokorzenie, niesprawiedliwość, wstyd, bunt, bezsilność), bo tego właśnie uczy metoda: patrzenia pod złość. Emocje rzadkie (zazdrość, niepewność, tęsknota w dist) też mają się pojawić.

## 8. Zasady jakości (każda scenka musi spełniać wszystkie)

1. **Język nastolatka.** Potoczna polszczyzna, krótkie zdania, naturalny rytm mówienia. Slang oszczędnie i poprawnie użyty (przypał, obciach, ściema, zlewać kogoś, ogarniać); zero słów książkowych, urzędowych i poradnikowych (nie: „ubezwłasnowolniony", „mam potrzebę", „syzyfowa praca", „legły w gruzach", „relacja interpersonalna"). Zero kalk z angielskiego. Idiomy z pokolenia rodziców tylko wyjątkowo i świadomie.
2. **Emocja pokazana, nie podpisana.** `says` nie zawiera słowa z pola `emo` ani jego rdzenia (gdy emo to „bezsilność", w wypowiedzi nie ma „bezsilny" ani „bezradny"; gdy „niesprawiedliwość", nie ma „niesprawiedliwe" itd.). Nastolatek nie raportuje swoich uczuć etykietami („czuję się odrzucony"), tylko je pokazuje obrazem, skargą, ironią, wyolbrzymieniem.
3. **Kontekst to scena, nie temat.** `ctx` podaje moment i miejsce oraz obserwowalne zachowanie („Sobota rano. Rodzic budzi...", „Wraca z treningu i rzuca torbę..."), nigdy sam temat („mówi o szkole", „narzeka na obowiązki", „o tym, że..."). `ctx` nie nazywa emocji („widać wstyd", „czerwienieje ze złości") i nie stawia diagnoz („uzależniony", „manipuluje"): odczytanie należy do rodzica.
4. **Logika bez dziur.** Wszystkie szczegóły się składają: kolejność zdarzeń, kto co wie, realia szkolne (oceny, terminy, egzaminy), wiek a sytuacja (prawo jazdy od 18 lat, matura w wieku 18-19, egzamin ósmoklasisty ok. 14-15). Jeden niezgadzający się szczegół zatrzymuje uwagę rodzica na zagadce zamiast na dziecku.
5. **Zwyczajność.** Codzienne sytuacje, jakie zna każdy dom. Tematy zakazane, bo wymagają działania, a nie tylko empatii, i wypychają ćwiczenie: zaburzenia odżywiania i jedzenie jako problem, samookaleczenia, myśli samobójcze, przemoc i przestępstwa, alkohol/narkotyki wprost, seks, poważna choroba, śmierć bliskiej osoby. Dopuszczalne łagodne wyjątki: śmierć małego zwierzątka, powrót z imprezy później niż obiecał (bez opisu używek), sympatia do kogoś, kogo rodzice nie znają.
6. **Spójność ctx i says.** Wypowiedź wynika wprost z kontekstu; ctx nie streszcza tego, co za chwilę powie nastolatek, tylko ustawia scenę.
7. **Różnorodność.** Żadne dwie scenki nie opowiadają tej samej sytuacji innymi słowami. Powtórzenie tematu (np. dwa razy sprzątanie) jest dozwolone tylko przy wyraźnie innym ujęciu i innej emocji. Imiona własne rzadko (najwyżej kilka razy w całej puli), marki i tytuły tylko powszechnie znane.
8. **Siła krótkości.** Najmocniejsze wypowiedzi są krótkie. W całej puli co najmniej 20 scenek z wypowiedzią do 8 słów (w tym kilka 2-4 słowowych na poziomie 3). Unikać trzyzdaniowych monologów z puentą: to brzmi jak napisane, nie powiedziane.
9. **Gramatyka płci.** Formy czasowników i przymiotników w ctx i says konsekwentnie zgodne z `sex`. W scenkach poziomu 3 wypowiedź może zdradzać płeć rodzica końcówką („Czytałaś to?", „Obiecałeś"); używać obu wariantów, częściej form neutralnych (liczba mnoga „zawsze musicie", tryb bez końcówki).
10. **Interpunkcja prosta.** Zwykłe kropki, przecinki, pytajniki, wykrzykniki, wielokropek oszczędnie. Bez półpauz i ozdobników typograficznych w treści scenek.

## 9. Wiek i płeć

- Wiek 13-18, z przewagą 14-16 (orientacyjnie: 13 lat ok. 20 scenek, 14 ok. 40, 15 ok. 55, 16 ok. 45, 17 ok. 30, 18 ok. 10). Treść dopasowana do wieku: 13-latek nie mówi o maturze, 18-latek nie pisze egzaminu ósmoklasisty.
- Płeć: 110-115 chłopców, 85-90 dziewczyn, przy czym każda sfera zawiera obie płcie (żadna sfera nie jest „tylko męska" ani „tylko żeńska"; wygląd i ciało dotyczy też chłopców, gry i sport też dziewczyn).

## 10. Proces pracy

1. Najpierw rozpisz plan: tabela sfer z listą haseł sytuacji (po jednym zdaniu), od razu z poziomem, płcią, wiekiem i emocją docelową. Sprawdź na planie proporcje i różnorodność, zanim napiszesz pierwszą scenkę.
2. Pisz partiami po 20-25 scenek. Po każdej partii przejdź checklistę z punktu 8 dla każdej scenki osobno; popraw od razu.
3. Na poziomie 2 przy każdej scence zapisz sobie (roboczo, nie w danych) pułapkę-magnes i usuń scenki, w których magnes jest słaby.
4. Na koniec policz: 200 scenek, poziomy 80/45/75, sfery zgodnie z tabelami, id 1-200 bez dziur i powtórzeń, `dist` zawsze 3 różne i bez `emo`, żadna wypowiedź nie zawiera rdzenia swojej emocji docelowej, rozkład wieku i płci w widełkach.
5. Wynik oddaj jako jeden blok kodu: scenki w kolejności poziomów, z komentarzami sekcji, po jednej linii na scenkę, gotowy do wklejenia w miejsce tablicy `SCENARIOS_DB`.

## 11. Miara sukcesu

Scenka jest dobra, jeśli: rodzic czyta ją i natychmiast czuje pokusę starej reakcji (rada, pocieszenie, obrona), a jednocześnie da się na nią odpowiedzieć jednym trafnym zdaniem empatii, które przechodzi test: „czy po tym zdaniu nastolatek poczułby, że ktoś go naprawdę usłyszał?". Jeśli scenka tego nie robi, wyleci; napisz lepszą.
