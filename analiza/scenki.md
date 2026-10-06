# Usłysz Mnie: pytania w aplikacji

Eksport z `index.html` (tablica `SCENARIOS_DB`), commit `4b16da2`, 2026-10-06.
Te same dane do arkusza: [`scenki.csv`](scenki.csv) (Excel, separator „;”), do dalszej obróbki: [`scenki.json`](scenki.json).

## Spis treści

1. [Jak wygląda pytanie w aplikacji](#jak-wygląda-pytanie-w-aplikacji)
2. [Liczby](#liczby)
3. Scenki
   - [Poziom 1: emocja czytelna, łatwa do nazwania (81)](#poziom-1)
   - [Poziom 2: kusi, żeby doradzać i naprawiać (32)](#poziom-2)
   - [Poziom 3: nastolatek zły NA rodzica (74)](#poziom-3)
4. [Inne pytania i przykłady w aplikacji](#inne-pytania-i-przykłady-w-aplikacji)
5. [Uwagi z ekstrakcji](#uwagi-z-ekstrakcji)

## Jak wygląda pytanie w aplikacji

Każda scenka ma ten sam układ ekranu:

1. Nagłówek: poziom (🟢 / 🟡 / 🔴).
2. Kontekst sytuacji (pole `ctx`).
3. Wypowiedź nastolatka w cudzysłowie (pole `says`).
4. Pytanie **„Co odpowiadasz?”** i pole na odpowiedź pisaną własnymi słowami.

Odpowiedź ocenia model AI w skali od 1 do 10 według metody Faber i Mazlish (nazywanie uczuć, echo). Model dostaje tylko poziom, kontekst, wypowiedź nastolatka i odpowiedź rodzica.

Pola `emo` (emocja docelowa) i `dist` (trzy dystraktory) są zapisane w bazie przy każdej scence, ale aplikacja ich nigdzie nie wyświetla i nie przekazuje do oceny. W eksporcie są podane, bo mówią, jaką emocję autor scenki miał na myśli.

Pole `sex` (płeć nastolatka: `m` albo `f`) ustala formy „Nastolatek/Nastolatka”, „zrozumiany/zrozumiana”, „jego/jej” na ekranach i trafia do oceny AI.

Podział na sekcje w tym eksporcie pochodzi z komentarzy w kodzie bazy; aplikacja go nie wyświetla (dawna etykieta kategorii, losowana niezależnie od treści, jest usunięta).

Scenka Dnia to jedna z tych samych 187 scenek, wybierana na podstawie daty spośród wszystkich poziomów naraz.

## Liczby

| Poziom | Nazwa w menu | Scenek | Chłopcy | Dziewczyny | Wiek |
|---|---|--:|--:|--:|---|
| 🟢 1 | Podstawy | 81 | 42 | 39 | 13-18 |
| 🟡 2 | Trudniej się powstrzymać | 32 | 23 | 9 | 14-17 |
| 🔴 3 | Kiedy to o Ciebie chodzi | 74 | 52 | 22 | 13-18 |
| **razem** | | **187** | **117** | **70** | 13-18 |

Rozkład wieku: 13 lat (18) · 14 lat (36) · 15 lat (58) · 16 lat (46) · 17 lat (27) · 18 lat (2)

### Emocje docelowe (`emo`)

| Emocja | Poz. 1 | Poz. 2 | Poz. 3 | Razem |
|---|--:|--:|--:|--:|
| złość | 2 |  | 32 | 34 |
| przytłoczenie | 12 | 6 | 4 | 22 |
| niesprawiedliwość | 6 | 2 | 11 | 19 |
| wstyd | 10 | 5 | 4 | 19 |
| bezsilność | 9 | 5 | 2 | 16 |
| strach | 10 | 3 | 2 | 15 |
| bunt |  | 5 | 8 | 13 |
| frustracja | 5 | 3 | 2 | 10 |
| odrzucenie | 9 |  |  | 9 |
| upokorzenie | 4 |  | 3 | 7 |
| żal | 3 |  | 3 | 6 |
| smutek | 2 |  | 3 | 5 |
| samotność | 2 | 2 |  | 4 |
| rozczarowanie | 3 |  |  | 3 |
| zazdrość | 3 |  |  | 3 |
| niepewność | 1 | 1 |  | 2 |

<a id="poziom-1"></a>

## Poziom 1: emocja czytelna, łatwa do nazwania (81)

### Szkoła i presja (18)

**1.** `id 1` · chłopak, 14 l.  
*14-latek rzuca plecak na podłogę w przedpokoju. W e-dzienniku świeci nowa uwaga.*  
„Znowu mam uwagę. Nieważne co robię, i tak jestem winny.”  
→ emocja: **niesprawiedliwość** · dystraktory: złość, smutek, bunt

**2.** `id 2` · chłopak, 14 l.  
*14-latek siedzi obok rodzica z zeszytem od matmy. Patrzy w jedną stronę.*  
„Nie ogarniam tego. Jak jutro dostanę pałę, to ja serio pęknę.”  
→ emocja: **przytłoczenie** · dystraktory: strach, bezsilność, frustracja

**3.** `id 3` · chłopak, 14 l.  
*14-latek stoi rano w kurtce, ale nie rusza się do wyjścia.*  
„Nie idę dziś do szkoły. Nie mam siły wchodzić tam znowu.”  
→ emocja: **przytłoczenie** · dystraktory: strach, smutek, bezsilność

**4.** `id 4` · chłopak, 14 l.  
*Niedziela wieczór, jutro szkoła. 14-latek kręci się po pokoju i łapie za brzuch.*  
„Jutro nie dam rady. Jak o tym myślę, to aż mi się robi niedobrze.”  
→ emocja: **strach** · dystraktory: przytłoczenie, bezsilność, smutek

**5.** `id 8` · chłopak, 14 l.  
*14-latek siedzi nad obiadem po klasówce. Łyżka krąży w zupie, apetytu brak.*  
„Starałem się, a i tak wszystko spieprzyłem. Chyba naprawdę jestem do niczego.”  
→ emocja: **bezsilność** · dystraktory: smutek, rozczarowanie, wstyd

**6.** `id 9` · chłopak, 15 l.  
*15-latek wraca z treningu. Patrzy w okno samochodu, milczy.*  
„Trener mnie zjechał przy wszystkich. Chciałem po prostu zniknąć.”  
→ emocja: **upokorzenie** · dystraktory: wstyd, złość, bezsilność

**7.** `id 86` · chłopak, 14 l.  
*14-latek po kolejnej wpadce i krytyce. Mówi coś jak wyrok.*  
„Jestem głupi…”  
→ emocja: **bezsilność** · dystraktory: smutek, wstyd, rozczarowanie

**8.** `id 101` · chłopak, 14 l.  
*14-latek po oddaniu ważnego projektu, nad którym siedział dwa weekendy.*  
„Dostałem tróję. Gość napisał, że 'mało kreatywne'. Bez kitu, po co ja się w ogóle starałem?”  
→ emocja: **rozczarowanie** · dystraktory: bezsilność, złość, niesprawiedliwość

**9.** `id 102` · dziewczyna, 16 l.  
*16-latka otwiera Librusa i widzi kolejną jedynkę z matematyki.*  
„Znowu to samo. Ta baba tłumaczy to tak, że nikt nic nie czai. Równie dobrze mogę nie chodzić. Zero różnicy.”  
→ emocja: **bezsilność** · dystraktory: złość, frustracja, niesprawiedliwość

**10.** `id 103` · chłopak, 13 l.  
*13-latek przygotowuje się do odpowiedzi ustnej, nerwowo przekładając kartki.*  
„Jak mnie wywoła do tablicy, to chyba tam zemdleję. Wszystko mi się miesza, kompletnie nic nie pamiętam.”  
→ emocja: **strach** · dystraktory: przytłoczenie, niepewność, bezsilność

**11.** `id 104` · chłopak, 15 l.  
*15-latek wraca z próbnego egzaminu, rzuca plecakiem.*  
„W arkuszu były rzeczy, których w ogóle nie przerabialiśmy. Pół klasy oddało puste kartki. To jest jakiś żart.”  
→ emocja: **niesprawiedliwość** · dystraktory: złość, frustracja, bezsilność

**12.** `id 105` · dziewczyna, 17 l.  
*17-latka patrzy na listę lektur na ten semestr.*  
„Pięć grubych ksiąg w dwa miesiące? Przecież ja nie mam kiedy spać, a jeszcze korki i treningi. Oni myślą, że ja jestem robotem?”  
→ emocja: **przytłoczenie** · dystraktory: bezsilność, złość, frustracja

**13.** `id 106` · dziewczyna, 14 l.  
*14-latka po prezentacji przed klasą, podczas której pomyliła slajdy.*  
„Wszyscy zaczęli się śmiać, a ja stałam tam jak kołek. Chcę po prostu zniknąć z tej szkoły.”  
→ emocja: **upokorzenie** · dystraktory: wstyd, strach, samotność

**14.** `id 107` · chłopak, 16 l.  
*16-latek dowiaduje się, że nie przeszedł do drugiego etapu olimpiady o jeden punkt.*  
„Jeden punkt. Przez jedno głupie pytanie wszystko poszło w piach. Tyle miesięcy nauki na nic.”  
→ emocja: **rozczarowanie** · dystraktory: żal, bezsilność, frustracja

**15.** `id 108` · dziewczyna, 13 l.  
*13-latka po kłótni z nauczycielką, która oskarżyła ją o ściąganie.*  
„Wcale nie ściągałam! Patrzyłam w okno, a ona mi zabrała kartkę przy wszystkich. To było tak niesprawiedliwe!”  
→ emocja: **niesprawiedliwość** · dystraktory: złość, upokorzenie, bezsilność

**16.** `id 109` · chłopak, 17 l.  
*17-latek patrzy na kalendarz — do zakończenia roku zostały trzy dni.*  
„Nie dam rady tego ogarnąć. Za dużo tego.”  
→ emocja: **przytłoczenie** · dystraktory: bezsilność, strach, desperacja

**17.** `id 110` · chłopak, 15 l.  
*15-latek wraca do domu z jedynką ze sprawdzianu z chemii, na który uczył się trzy wieczory z rzędu. Rzuca plecakiem o ziemię.*  
„Mam to gdzieś, serio. Po co ja się w ogóle staram, skoro ta baba i tak mnie uwali? To jest jakiś żart, nigdy więcej nie otworzę tego podręcznika.”  
→ emocja: **bezsilność** · dystraktory: złość, rozczarowanie, niesprawiedliwość

**18.** `id 112` · chłopak, 15 l.  
*15-latek został wyrzucony z lekcji przez nauczycielkę, która uznała, że to on rzucał papierkami, choć chłopak siedział cicho.*  
„Wzięła mnie na cel i tyle. Inni robili syf, a ona wskazała palcem na mnie, bo tak jej było wygodniej. Aż mnie rozsadza od środka, jak to niesprawiedliwe!”  
→ emocja: **niesprawiedliwość** · dystraktory: złość, upokorzenie, bezsilność

### Emocje, lęk, smutek (7)

**19.** `id 22` · chłopak, 14 l.  
*14-latek późnym wieczorem przegląda terminy egzaminów i prób.*  
„Nie mogę oddychać, jak o tym myślę. Wszystko mi się miesza w głowie.”  
→ emocja: **przytłoczenie** · dystraktory: strach, bezsilność, desperacja

**20.** `id 23` · dziewczyna, 15 l.  
*15-latka wraca ze szkoły. Jutro prezentacja, nerwowo skubie rękaw.*  
„Jak się ośmieszę, to ja tam więcej nie pójdę. Serio.”  
→ emocja: **strach** · dystraktory: wstyd, niepewność, przytłoczenie

**21.** `id 30` · chłopak, 15 l.  
*15-latek wraca w środku tygodnia i od razu zamyka się w pokoju.*  
„Daj mi chwilę. W szkole cały dzień muszę być ogarnięty, a ja już nie mam baterii.”  
→ emocja: **przytłoczenie** · dystraktory: smutek, bezsilność, samotność

**22.** `id 64` · chłopak, 16 l.  
*16-latek rozmawia z rodzicem o motywacji. W pewnym momencie zaczyna mówić ciszej.*  
„Nie chodzi o lenistwo. Ja po prostu nie widzę sensu w tym, co robię.”  
→ emocja: **bezsilność** · dystraktory: smutek, przytłoczenie, desperacja

**23.** `id 89` · chłopak, 17 l.  
*17-latek milknie, kiedy rodzic naciska na temat studiów. Potem mówi cicho.*  
„Przeraża mnie to wszystko: studia, praca, decyzje. Ja nie wiem czy sobie z tym wszystkim poradzę.”  
→ emocja: **strach** · dystraktory: niepewność, przytłoczenie, bezsilność

**24.** `id 95` · dziewczyna, 15 l.  
*Rodzic próbuje pocieszyć 15-latkę. Reaguje, jakby to był atak.*  
„Nie mów mi, że przesadzam. Ja naprawdę cierpię.”  
→ emocja: **smutek** · dystraktory: bezsilność, złość, samotność

**25.** `id 46` · dziewczyna, 15 l.  
*Rodzic przed chwilą zażartował z tego, o czym marzy 15-latka. Czerwienieje ze złości.*  
„To moje marzenie. Jak się śmiejesz, to czuję się totalnie zniszczona.”  
→ emocja: **upokorzenie** · dystraktory: smutek, złość, bezsilność

### Rówieśnicy i odrzucenie (14)

**26.** `id 24` · dziewczyna, 13 l.  
*13-latka w poniedziałek rano trzyma się za brzuch i nie chce wstać.*  
„Znowu będę tam sama. Znowu będą patrzeć.”  
→ emocja: **samotność** · dystraktory: strach, smutek, odrzucenie

**27.** `id 114` · dziewczyna, 14 l.  
*14-latka przegląda relacje na Instagramie i widzi, że cała jej paczka jest razem na pizzy — bez niej.*  
„No jasne, świetnie się bawią. Nagle o mnie zapomnieli, jakbym w ogóle nie istniała.”  
→ emocja: **odrzucenie** · dystraktory: samotność, smutek, zazdrość

**28.** `id 115` · dziewczyna, 14 l.  
*14-latka siedzi w ciemnym pokoju z telefonem. Zobaczyła na TikToku relację, jak cała jej paczka bawi się w kinie bez niej.*  
„Patrz, znowu relacja u Julki. Wszyscy tam są, nawet ten nudziarz z trzeciej ławki. Mnie nikt nawet nie zapytał, czy chcę iść. Widocznie jestem dla nich tylko tłem, jak ich nie ma kto rozśmieszać.”  
→ emocja: **odrzucenie** · dystraktory: samotność, smutek, bezsilność

**29.** `id 116` · chłopak, 15 l.  
*15-latek wysłał wiadomość do przyjaciela trzy godziny temu, widzi, że została odczytana, ale nie ma odpowiedzi.*  
„Zlewa mnie totalnie. Widzę, że gra w LoL-a, ale odpisać to już nie łaska. Mam tego dość.”  
→ emocja: **odrzucenie** · dystraktory: złość, samotność, bezsilność

**30.** `id 117` · chłopak, 14 l.  
*14-latek zauważa, że dziewczyna, z którą pisał codziennie przez miesiąc, nagle przestała mu odpisywać i go zghostowała, choć publikuje nowe zdjęcia.*  
„Pisała do mnie non stop, a teraz nagle cisza. Widzę, że jest aktywna, ale mnie zlewa totalnie. Co ja niby zrobiłem źle? Wszystko mi się teraz sypie.”  
→ emocja: **odrzucenie** · dystraktory: bezsilność, smutek, niepewność

**31.** `id 118` · chłopak, 13 l.  
*13-latek słyszy, jak koledzy śmieją się z jego nowej fryzury.*  
„Wiedziałem, że to był błąd. Teraz będą o tym gadać przez miesiąc. Najlepiej by było, gdybym w ogóle nie wychodził z pokoju.”  
→ emocja: **wstyd** · dystraktory: strach, samotność, smutek

**32.** `id 119` · chłopak, 17 l.  
*17-latek dowiaduje się, że jego najlepszy przyjaciel wysłał screeny ich prywatnej, bardzo osobistej rozmowy do innych osób z klasy.*  
„Myślałem, że to mój brat, czaisz? A on mnie tak po prostu wystawił dla kilku lajków. Komu ja mam teraz w ogóle ufać? To koniec, z nikim już nie gadam.”  
→ emocja: **odrzucenie** · dystraktory: żal, złość, samotność

**33.** `id 120` · dziewczyna, 17 l.  
*17-latka przygotowuje się do imprezy, ale nagle rezygnuje.*  
„Ech, i tak będę tam stać w kącie. One wszystkie mają o czym gadać, a ja zawsze czuję się tam jak piąte koło u wozu.”  
→ emocja: **samotność** · dystraktory: niepewność, smutek, wstyd

**34.** `id 121` · chłopak, 14 l.  
*14-latek dowiaduje się, że nowy kolega w klasie stał się bardzo popularny.*  
„Nagle wszyscy latają za nim, jakby był jakimś Bogiem. Nawet Bartek już nie ma dla mnie czasu, bo ciągle siedzi u niego.”  
→ emocja: **zazdrość** · dystraktory: samotność, odrzucenie, smutek

**35.** `id 122` · dziewczyna, 16 l.  
*16-latka po otrzymaniu screena, na którym koleżanki ją obgadują.*  
„Patrz, co o mnie piszą. 'Że niby jestem sztywna'. A ja im tyle razy pomagałam w lekcjach. To jest obrzydliwe.”  
→ emocja: **odrzucenie** · dystraktory: złość, żal, upokorzenie

**36.** `id 123` · chłopak, 15 l.  
*15-latek nie został zaproszony na osiemnastkę kuzyna, na której bardzo mu zależało.*  
„Wszyscy moi znajomi tam będą, a ja mam siedzieć z wami? To będzie największy przypał świata, jak mnie tam zabraknie.”  
→ emocja: **odrzucenie** · dystraktory: wstyd, samotność, złość

**37.** `id 124` · dziewczyna, 13 l.  
*13-latka po powrocie ze szkoły, gdzie grupa dziewczyn ją ignorowała.*  
„Jak przechodziłam obok nich, to nagle wszystkie milkły i zaczynały się śmiać. Nienawidzę tej klasy.”  
→ emocja: **odrzucenie** · dystraktory: samotność, smutek, upokorzenie

**38.** `id 125` · dziewczyna, 17 l.  
*17-latka dowiaduje się, że jej chłopak wyjechał na weekend ze znajomymi, o czym zapomniał jej wspomnieć.*  
„Dowiedziałam się o tym z Instagrama, czaisz? Pisaliśmy rano i ani słowa o wyjeździe. Teraz nie odbiera, bo pewnie świetnie się bawi. Po prostu super, tak właśnie wygląda 'zaufanie' w tym związku.”  
→ emocja: **żal** · dystraktory: złość, odrzucenie, niepewność

**39.** `id 75` · dziewczyna, 16 l.  
*16-latka wraca ze szkoły i od razu rzuca się na łóżko.*  
„Powiedziałam mu, że go kocham, a on ma dziewczynę i mnie olewa. Czuję się jak śmieć.”  
→ emocja: **odrzucenie** · dystraktory: smutek, wstyd, bezsilność

### Wygląd i ciało (16)

**40.** `id 15` · chłopak, 15 l.  
*15-latek wraca po zdjęciach klasowych. Przygaszony.*  
„Nienawidzę jak mnie oceniają. Czuję się jak jakiś eksponat.”  
→ emocja: **wstyd** · dystraktory: złość, bezsilność, samotność

**41.** `id 25` · chłopak, 15 l.  
*15-latek podaje rodzicowi telefon. Na grupie klasowej docinki o wyglądzie.*  
„To mnie naprawdę boli. Udaję, że haha, ale w środku mam dość.”  
→ emocja: **smutek** · dystraktory: wstyd, bezsilność, samotność

**42.** `id 79` · chłopak, 15 l.  
*15-latek stoi przed lustrem w łazience. Długo dotyka skóry twarzy.*  
„Wszyscy mają idealne twarze. Ja wyglądam jak katastrofa.”  
→ emocja: **wstyd** · dystraktory: smutek, bezsilność, samotność

**43.** `id 84` · dziewczyna, 14 l.  
*Rozmowa przy kolacji schodzi na szkołę i wygląd. 14-latka mówi cicho.*  
„Mam kompleksy, ludzie się ze mnie wyśmiewają. A ja nie wiem, co robię źle.”  
→ emocja: **wstyd** · dystraktory: bezsilność, smutek, samotność

**44.** `id 85` · dziewczyna, 15 l.  
*15-latka staje na wadze po wakacjach. Płacze.*  
„Przytyłam i nienawidzę swojego ciała. Czuję się bezradna.”  
→ emocja: **bezsilność** · dystraktory: smutek, wstyd, desperacja

**45.** `id 126` · chłopak, 16 l.  
*16-latek szykuje się na osiemnastkę kolegi, ale po długim staniu przed lustrem nagle zdejmuje wyjściowe ubranie i kładzie się na łóżku.*  
„Nigdzie nie idę. Wyglądam jak totalny gnom, te włosy to porażka, a cera... szkoda gadać. Będą się tylko ze mnie nabijać po kątach.”  
→ emocja: **wstyd** · dystraktory: strach, bezsilność, smutek

**46.** `id 127` · chłopak, 16 l.  
*16-latek przygotował się na pierwsze spotkanie z dziewczyną, ale po długim czasie przed lustrem nagle zdejmuje nową bluzę.*  
„Nie no, po prostu masakra. Zobacz na to czoło, przecież to wygląda jak pole minowe, a te włosy żyją własnym życiem. Nigdzie nie idę, niech ona sobie myśli co chce, ja zostaję w łóżku pod kołdrą.”  
→ emocja: **wstyd** · dystraktory: strach, bezsilność, smutek

**47.** `id 128` · dziewczyna, 14 l.  
*14-latka mierzy sukienkę na bal ósmoklasisty.*  
„Wyglądam w tym grubo. Ta sukienka podkreśla wszystko, czego nienawidzę. Wszystkie dziewczyny będą wyglądać jak modelki, a ja jak worek.”  
→ emocja: **wstyd** · dystraktory: smutek, bezsilność, strach

**48.** `id 129` · chłopak, 15 l.  
*15-latek porównuje swój wzrost z kolegami z klasy.*  
„Wszyscy już wystrzelili w górę, a ja dalej stoję w miejscu. Wyglądam przy nich jak dzieciak z podstawówki.”  
→ emocja: **wstyd** · dystraktory: smutek, zazdrość, bezsilność

**49.** `id 130` · dziewczyna, 17 l.  
*17-latka wraca od fryzjera, patrzy w lustro z przerażeniem.*  
„Zobacz, co ona mi zrobiła! Za krótko, beznadziejny kolor, wszystko nie tak!”  
→ emocja: **złość** · dystraktory: smutek, bezsilność, rozczarowanie

**50.** `id 131` · chłopak, 13 l.  
*13-latek nosi aparat ortodontyczny od tygodnia.*  
„Przez ten aparat śmiesznie mówię i wyglądam fatalnie. Jeszcze dwa lata? Przecież to jest wieczność!”  
→ emocja: **frustracja** · dystraktory: wstyd, bezsilność, smutek

**51.** `id 132` · dziewczyna, 16 l.  
*16-latka widzi swoje zdjęcie zrobione z ukrycia przez kogoś z klasy.*  
„Jak ja tu wyszłam? Mam jakąś dziwną minę i wyglądam tragicznie. Zaraz pewnie wrzucą to na grupę.”  
→ emocja: **strach** · dystraktory: wstyd, upokorzenie, bezsilność

**52.** `id 133` · chłopak, 15 l.  
*15-latek próbuje dobrać ubrania na wyjście do kina.*  
„Wszystko na mnie wisi albo jest za ciasne. Nie mam nic normalnego, w czym nie wstydziłbym się pokazać.”  
→ emocja: **frustracja** · dystraktory: wstyd, bezsilność, smutek

**53.** `id 134` · dziewczyna, 14 l.  
*14-latka porównuje się do modelek z TikToka.*  
„One mają idealną cerę i figury, a ja... szkoda gadać. Czemu ja nie mogę tak wyglądać?”  
→ emocja: **zazdrość** · dystraktory: smutek, bezsilność, wstyd

**54.** `id 135` · chłopak, 17 l.  
*17-latek ma założyć garnitur na uroczystość rodzinną.*  
„Czuję się w tym jak przebrany. Wszyscy będą się na mnie gapić, to jest tak bardzo nie moje.”  
→ emocja: **niepewność** · dystraktory: wstyd, bezsilność, frustracja

**55.** `id 136` · dziewczyna, 15 l.  
*15-latka narzeka na swoje okulary.*  
„Znowu mi parują, jak wchodzę do autobusu. Wyglądam wtedy jak totalna ofiara losu.”  
→ emocja: **wstyd** · dystraktory: frustracja, bezsilność, smutek

### Media społecznościowe (9)

**56.** `id 26` · dziewczyna, 13 l.  
*13-latka zauważa, że pod jej filmikiem pojawił się hejt. Rzuca telefon na łóżko.*  
„Już nic nie wrzucę. Nie chcę kolejnej fali wyśmiewania.”  
→ emocja: **strach** · dystraktory: smutek, bezsilność, upokorzenie

**57.** `id 137` · dziewczyna, 14 l.  
*14-latka usunęła zdjęcie po tym, jak nikt go nie polubił przez piętnaście minut.*  
„Wiedziałam, że jest beznadziejne. Teraz pewnie wszyscy myślą, że jestem desperatką.”  
→ emocja: **wstyd** · dystraktory: odrzucenie, niepewność, smutek

**58.** `id 138` · chłopak, 15 l.  
*15-latek czyta kłótnię na grupie klasowej na Messengerze.*  
„Wszyscy tam na siebie jadą, a ja nie wiem, co napisać. Boję się, że jak coś powiem, to zaraz wszyscy obrócą się przeciwko mnie.”  
→ emocja: **strach** · dystraktory: niepewność, samotność, bezsilność

**59.** `id 139` · dziewczyna, 16 l.  
*16-latka widzi, że jej były chłopak dodał zdjęcie z nową dziewczyną.*  
„Patrz na to. Miesiąc po zerwaniu i już ma nową. Jakby te dwa lata ze mną w ogóle się nie liczyły.”  
→ emocja: **żal** · dystraktory: złość, odrzucenie, smutek

**60.** `id 140` · chłopak, 13 l.  
*13-latek dowiaduje się, że jego telefon jest zepsuty.*  
„Jestem odcięty od świata! Nie wiem, o czym oni teraz gadają, nie mam dostępu do niczego. To jest koniec mojego życia towarzyskiego.”  
→ emocja: **strach** · dystraktory: samotność, przytłoczenie, bezsilność

**61.** `id 141` · dziewczyna, 15 l.  
*15-latka czyta hejt pod swoim filmikiem.*  
„Napisali, że mam 'krzywy nos' i 'piskliwy głos'. Setki ludzi to widziało. Nie chcę już nigdy nic wrzucać do sieci.”  
→ emocja: **upokorzenie** · dystraktory: smutek, bezsilność, strach

**62.** `id 142` · dziewczyna, 14 l.  
*14-latka patrzy na relacje influencerów.*  
„Oni mają takie super życie, podróżują, mają kasę. A ja siedzę w tym nudnym domu i nic się u mnie nie dzieje.”  
→ emocja: **zazdrość** · dystraktory: smutek, bezsilność, tęsknota

**63.** `id 143` · dziewczyna, 15 l.  
*15-latka dowiaduje się, że koleżanka wrzuciła jej niekorzystne zdjęcie bez pytania.*  
„Wyglądam tam jak potwór! Prosiłam ją, żeby tego nie robiła, a ona to zostawiła. Jak ona mogła mi to zrobić?”  
→ emocja: **złość** · dystraktory: upokorzenie, żal, bezsilność

**64.** `id 144` · chłopak, 13 l.  
*13-latek odkrywa, że w grze został oszukany przez innego gracza.*  
„Oddałem mu wszystkie moje itemy, a on mnie zablokował. Ufałem mu, graliśmy razem od miesięcy!”  
→ emocja: **żal** · dystraktory: złość, odrzucenie, bezsilność

### Przytłoczenie i zmęczenie (4)

**65.** `id 145` · dziewczyna, 15 l.  
*15-latka siedzi o dwudziestej trzeciej nad stosem notatek, bo jutro ma dwa sprawdziany i prezentację, a rano musi jeszcze poćwiczyć do zawodów.*  
„Nie ogarniam tego, po prostu nie ogarniam. Zaraz mi mózg wyparuje, a jeszcze tyle zostało. Nie dam rady, to jest za dużo na jednego człowieka!”  
→ emocja: **przytłoczenie** · dystraktory: bezsilność, strach, desperacja

**66.** `id 146` · dziewczyna, 14 l.  
*14-latka narzeka na poranne wstawanie.*  
„Znowu ta ciemność za oknem. Mam wrażenie, że całe moje życie to tylko szkoła, spanie i szkoła. Nie mam na nic siły.”  
→ emocja: **przytłoczenie** · dystraktory: smutek, bezsilność, samotność

**67.** `id 147` · dziewczyna, 17 l.  
*17-latka uczy się do egzaminów późno w nocy.*  
„Kawa już na mnie nie działa, oczy mi się same zamykają, a ja mam jeszcze 20 stron do przeczytania. To jest nie do zrobienia.”  
→ emocja: **przytłoczenie** · dystraktory: bezsilność, desperacja, frustracja

**68.** `id 148` · dziewczyna, 13 l.  
*13-latka odrabia lekcje z matematyki.*  
„To jest czarna magia. Siedzę nad tym zadaniem od godziny i dalej nie wiem, od czego zacząć. Zaraz ten zeszyt poleci w kąt!”  
→ emocja: **frustracja** · dystraktory: bezsilność, złość, przytłoczenie

### Pasje i czas wolny (5)

**69.** `id 149` · chłopak, 15 l.  
*15-latek przegrywa ważny mecz w grze online przez błąd serwera.*  
„Nie wierzę! Cały ranking poszedł w dół przez jeden lag. Tyle godzin grindu zmarnowane w sekundę!”  
→ emocja: **frustracja** · dystraktory: złość, bezsilność, rozczarowanie

**70.** `id 150` · chłopak, 16 l.  
*16-latek dowiaduje się, że trener nie wystawił go w pierwszym składzie.*  
„Zasuwałem na każdym treningu, a on wziął tego typa, co połowę czasu przesiedział na ławce. To jest totalna zamuła.”  
→ emocja: **niesprawiedliwość** · dystraktory: złość, rozczarowanie, bezsilność

**71.** `id 151` · dziewczyna, 13 l.  
*13-latka dowiaduje się, że kółko plastyczne zostało odwołane.*  
„To była jedyna rzecz, na którą chciało mi się iść w tym tygodniu. Teraz będę musiała siedzieć w domu i się nudzić.”  
→ emocja: **rozczarowanie** · dystraktory: smutek, samotność, frustracja

**72.** `id 152` · dziewczyna, 15 l.  
*15-latka narzeka na stary sprzęt do fotografii.*  
„Tym starym rzęchem nic nie wyjdzie. Inni mają profesjonalny sprzęt i ich zdjęcia wyglądają super, a moje to żenada.”  
→ emocja: **frustracja** · dystraktory: zazdrość, bezsilność, smutek

**73.** `id 153` · chłopak, 15 l.  
*15-latek dowiaduje się, że nie został wybrany do szkolnej reprezentacji sportowej, mimo intensywnych treningów.*  
„Trenowałem całe wakacje, a oni wzięli tego gościa, co połowę zajęć olał. To jest po prostu kpina, więcej tam nie pójdę!”  
→ emocja: **niesprawiedliwość** · dystraktory: złość, rozczarowanie, bezsilność

### Przyszłość (8)

**74.** `id 154` · dziewczyna, 18 l.  
*18-latka wraca po rozmowie z doradcą zawodowym.*  
„Nie mam pojęcia, co chcę robić w przyszłości. Czuję, że niedługo muszę podjąć decyzję, a kompletnie nie wiem czego chcę.”  
→ emocja: **przytłoczenie** · dystraktory: strach, niepewność, bezsilność

**75.** `id 155` · dziewczyna, 15 l.  
*15-latka patrzy na progi punktowe do wymarzonego liceum.*  
„Nie ma szans. Z moimi wynikami to mogę co najwyżej pomarzyć. Wszystkie moje plany właśnie legły w gruzach.”  
→ emocja: **bezsilność** · dystraktory: smutek, rozczarowanie, strach

**76.** `id 156` · chłopak, 17 l.  
*17-latek mówi o dorosłości.*  
„Wszyscy oczekują, że nagle będę wiedział, jak płacić rachunki i co robić w życiu. A ja się czuję, jakbym utknął w miejscu.”  
→ emocja: **przytłoczenie** · dystraktory: strach, niepewność, bezsilność

**77.** `id 157` · dziewczyna, 14 l.  
*14-latka zastanawia się nad wyborem profilu klasy.*  
„Jak wybiorę mat-fiz, to nie będę miała czasu na nic innego. Jak wybiorę humanistyczny, to pewnie nie znajdę pracy. To jest bez sensu.”  
→ emocja: **przytłoczenie** · dystraktory: strach, bezsilność, niepewność

**78.** `id 158` · dziewczyna, 15 l.  
*15-latka słucha opowieści rodzica o sukcesach dziecka znajomych.*  
„No jasne, on jest genialny, a ja jestem zwykłą szarą myszą. Zawsze będę gorsza od innych, nieważne co zrobię.”  
→ emocja: **bezsilność** · dystraktory: smutek, zazdrość, wstyd

**79.** `id 159` · chłopak, 17 l.  
*17-latek mówi o maturze.*  
„Ten egzamin ma zdecydować o całym moim życiu? Przecież to jest chore. Czuję się, jakby ktoś przystawił mi pistolet do głowy.”  
→ emocja: **strach** · dystraktory: przytłoczenie, bezsilność, złość

**80.** `id 160` · dziewczyna, 16 l.  
*16-latka myśli o wyjeździe na studia do innego miasta.*  
„Chciałabym wyjechać, ale boję się, że sobie nie poradzę. Tutaj mam wszystko, a tam będę zupełnie sama.”  
→ emocja: **strach** · dystraktory: niepewność, tęsknota, samotność

**81.** `id 161` · chłopak, 14 l.  
*14-latek dowiaduje się, że nie dostał się na wymarzony kurs.*  
„To była moja jedyna droga do celu. Teraz już nic mi nie zostało, mogę się poddać.”  
→ emocja: **bezsilność** · dystraktory: rozczarowanie, smutek, desperacja

<a id="poziom-2"></a>

## Poziom 2: kusi, żeby doradzać i naprawiać (32)

W kodzie ten poziom nie ma podsekcji.

**82.** `id 5` · chłopak, 14 l.  
*Rodzic właśnie odłożył słuchawkę po telefonie od wychowawcy o spóźnieniach. 14-latek wchodzi do kuchni.*  
„On się na mnie uwziął. Cokolwiek zrobię, i tak mu nie pasuje.”  
→ emocja: **niesprawiedliwość** · dystraktory: złość, bezsilność, frustracja

**83.** `id 6` · chłopak, 15 l.  
*Przyszła wiadomość od nauczyciela o niewykonanym zadaniu. 15-latek wzrusza ramionami.*  
„Nie będę tego robić. I tak nikt nie widzi, ile ja się męczę.”  
→ emocja: **bezsilność** · dystraktory: smutek, złość, samotność

**84.** `id 7` · chłopak, 15 l.  
*Wieczór. Na grupie klasowej do projektu nikt nie odpisuje, a termin jutro. 15-latek siedzi z telefonem.*  
„Zrobili mnie liderem, a teraz mnie olali. Jak nie wyjdzie, to zgadnij, kto oberwie.”  
→ emocja: **przytłoczenie** · dystraktory: złość, strach, bezsilność

**85.** `id 10` · chłopak, 14 l.  
*Rodzic zatrzymuje auto pod szkołą i wysiada razem z 14-latkiem.*  
„Zostań w aucie. Nie odprowadzaj mnie.”  
→ emocja: **wstyd** · dystraktory: bunt, strach, niepewność

**86.** `id 11` · chłopak, 15 l.  
*W sklepie rodzic i 15-latek spotykają jego klasę. Rodzic zaczyna rozmowę z kolegami.*  
„Nie mów tak przy moich znajomych.”  
→ emocja: **wstyd** · dystraktory: złość, upokorzenie, bunt

**87.** `id 14` · chłopak, 16 l.  
*16-latek chce wyjść w czymś nietypowym. Rodzic komentuje.*  
„To jest mój styl. Nie każ mi wyglądać jak ty.”  
→ emocja: **bunt** · dystraktory: złość, wstyd, frustracja

**88.** `id 27` · dziewczyna, 15 l.  
*15-latka wraca ze szkoły z plamą na bluzie. Widać, że ktoś jej coś zrobił.*  
„Nie pytaj, bo i tak nic z tym nie zrobisz. Sama sobie poradzę.”  
→ emocja: **bezsilność** · dystraktory: wstyd, samotność, złość

**89.** `id 29` · chłopak, 15 l.  
*Rodzic prosi 15-latka, żeby zjadł z rodziną. Bierze talerz i idzie do pokoju.*  
„Chcę zjeść sam. Po prostu nie mam dziś siły na rozmowy.”  
→ emocja: **przytłoczenie** · dystraktory: samotność, smutek, bezsilność

**90.** `id 42` · chłopak, 16 l.  
*16-latek wraca po imprezie. Coś jest inaczej niż zwykle. Widać wstyd.*  
„Nie patrz na mnie tak. Ja… ja po prostu chciałem być jak inni.”  
→ emocja: **wstyd** · dystraktory: strach, żal, bezsilność

**91.** `id 59` · chłopak, 15 l.  
*Rodzic proponuje wspólny film w piątek. 15-latek kręci głową.*  
„Wolałbym wyjść. Nie jestem już małym dzieckiem.”  
→ emocja: **bunt** · dystraktory: frustracja, samotność, złość

**92.** `id 60` · chłopak, 15 l.  
*Sobota rano. Rodzic budzi 15-latka do sprzątania.*  
„Serio mam sprzątać w sobotę? Ja cały tydzień jadę na oparach.”  
→ emocja: **przytłoczenie** · dystraktory: złość, frustracja, bezsilność

**93.** `id 63` · chłopak, 16 l.  
*Rodzic mówi: musisz się uczyć. 16-latek macha ręką.*  
„Ja się umiem nauczyć, tylko mi się nie chce ciągle żyć pod presją.”  
→ emocja: **przytłoczenie** · dystraktory: bunt, bezsilność, frustracja

**94.** `id 65` · chłopak, 15 l.  
*Kolacja. Rodzic pyta 15-latka o znajomych. Odpowiada chłodno.*  
„Nie mam ochoty o tym gadać. To i tak nic nie zmieni.”  
→ emocja: **samotność** · dystraktory: smutek, bezsilność, bunt

**95.** `id 70` · chłopak, 16 l.  
*Rozmowa o imprezach. Rodzic mówi, że ma obawy. 16-latek reaguje.*  
„Uważasz, że jak wyjdę, to od razu zrobię coś głupiego.”  
→ emocja: **niesprawiedliwość** · dystraktory: złość, smutek, bunt

**96.** `id 71` · chłopak, 16 l.  
*16-latek mówi o relacji. Rodzic od razu zaczyna dopytywać o szczegóły.*  
„Nie chcę przesłuchania. Chcę tylko, żebyś była po mojej stronie.”  
→ emocja: **samotność** · dystraktory: smutek, złość, bezsilność

**97.** `id 74` · dziewczyna, 17 l.  
*17-latka siada naprzeciwko. Widać, że zbiera się na odwagę.*  
„Chcę ci powiedzieć, że spotykam się z kimś starszym, ale boję się twojej reakcji.”  
→ emocja: **strach** · dystraktory: niepewność, tęsknota, samotność

**98.** `id 76` · chłopak, 16 l.  
*16-latek chce iść sam do lekarza. Rodzic proponuje, że pójdzie razem.*  
„Nie chcę, żebyś ze mną szła. To jest dla mnie krępujące.”  
→ emocja: **wstyd** · dystraktory: bunt, niepewność, strach

**99.** `id 78` · dziewczyna, 14 l.  
*14-latka chce się malować. Rodzic mówi, że za wcześnie.*  
„Ja chcę się malować jak inne dziewczyny. Czuję się przez ciebie głupio i dziecinnie.”  
→ emocja: **bunt** · dystraktory: wstyd, złość, bezsilność

**100.** `id 83` · chłopak, 16 l.  
*Wieczór. 16-latek siada obok i mówi cicho, jakby z ulgą.*  
„Od jakiegoś czasu prawie nic nie jem i nie piję. I nie umiem tego odkręcić.”  
→ emocja: **bezsilność** · dystraktory: strach, smutek, desperacja

**101.** `id 87` · chłopak, 17 l.  
*Do matury zostały dwa tygodnie. Rodzic pyta: uczysz się? 17-latek odpowiada.*  
„Ale wynik matury nie będzie mnie definiował.”  
→ emocja: **bunt** · dystraktory: niepewność, strach, bezsilność

**102.** `id 88` · dziewczyna, 17 l.  
*17-latka tuż przed próbną maturą.*  
„Boli mnie głowa i ściska w żołądku.”  
→ emocja: **strach** · dystraktory: przytłoczenie, bezsilność, smutek

**103.** `id 91` · chłopak, 17 l.  
*Rodzina planuje 18 urodziny 17-latka. Ktoś już rezerwuje salę.*  
„Nie wiem, czy chcę imprezę. Wolałbym w domu, bez wielkiej akcji.”  
→ emocja: **niepewność** · dystraktory: strach, samotność, bunt

**104.** `id 162` · chłopak, 15 l.  
*15-latek słucha rodzica, który dopytuje o poprawę ocen zaraz po wejściu do domu.*  
„Daj spokój, ledwo wszedłem do domu. Cały dzień tylko testy i pytania, a ty od progu znowu to samo!”  
→ emocja: **przytłoczenie** · dystraktory: złość, frustracja, bezsilność

**105.** `id 163` · dziewczyna, 14 l.  
*14-latka rysuje w pokoju. Rodzic woła ją na obiad.*  
„Właśnie teraz miałam najlepszy pomysł na cieniowanie! Zanim wrócę, to wszystko mi ucieknie z głowy!”  
→ emocja: **frustracja** · dystraktory: złość, bezsilność, smutek

**106.** `id 164` · chłopak, 16 l.  
*16-latek mówi o uzależnieniu od TikToka, kiedy rodzic zwraca mu uwagę na czas przed ekranem.*  
„Tylko tam mogę się wyłączyć i o niczym nie myśleć. Bez tego telefonu to bym chyba oszalał z nudów.”  
→ emocja: **bezsilność** · dystraktory: samotność, przytłoczenie, smutek

**107.** `id 165` · chłopak, 15 l.  
*15-latek wraca po siedmiu lekcjach i dodatkowym angielskim.*  
„Nie ruszę palcem. Nawet nie proś mnie o rozładowanie zmywarki, bo po prostu padnę na podłogę.”  
→ emocja: **przytłoczenie** · dystraktory: bezsilność, złość, frustracja

**108.** `id 166` · chłopak, 16 l.  
*16-latek mówi o sprzątaniu pokoju.*  
„Po co mam to sprzątać, skoro jutro i tak będzie tak samo? To jest syzyfowa praca, daj mi spokój.”  
→ emocja: **bezsilność** · dystraktory: frustracja, przytłoczenie, smutek

**109.** `id 167` · dziewczyna, 14 l.  
*14-latka narzeka na robienie zakupów.*  
„Znowu długa lista. Będę tam stać w kolejkach godzinę. Mój jedyny wolny czas w tygodniu właśnie przepadł.”  
→ emocja: **frustracja** · dystraktory: złość, bezsilność, smutek

**110.** `id 168` · dziewczyna, 15 l.  
*15-latka narzeka na gotowanie.*  
„Nie cierpię gotować. Wszystko mi się przypala i kuchnia wygląda jak po wojnie. Dlaczego nie możemy po prostu zamówić pizzy?”  
→ emocja: **frustracja** · dystraktory: bezsilność, złość, przytłoczenie

**111.** `id 169` · chłopak, 16 l.  
*16-latek mówi o pomyśle na gap year po szkole.*  
„Chciałbym po prostu odpocząć rok po szkole, ale wy pewnie uznacie, że jestem leniem i nic nie robię.”  
→ emocja: **strach** · dystraktory: niepewność, bunt, samotność

**112.** `id 170` · dziewczyna, 16 l.  
*16-latka porównuje swoje kieszonkowe z rówieśnikami.*  
„Inni dostają dwa razy tyle i mogą sobie na coś odłożyć. Ja ledwo mam na bilet i herbatę. Czuję się jak biedak przy moich znajomych.”  
→ emocja: **wstyd** · dystraktory: bezsilność, niesprawiedliwość, zazdrość

**113.** `id 171` · dziewczyna, 17 l.  
*17-latka mówi o tym, że nie chce spędzać czasu z rodzicem.*  
„Wolisz, żebym siedziała z tobą na kanapie, zamiast być z ludźmi w moim wieku? To jest nudne!”  
→ emocja: **bunt** · dystraktory: frustracja, złość, samotność

<a id="poziom-3"></a>

## Poziom 3: nastolatek zły NA rodzica (74)

### Stare scenki (przepisane) (29)

**114.** `id 12` · dziewczyna, 15 l.  
*Rodzic siedzi z gośćmi w salonie i właśnie zażartował o 15-latce.*  
„Weź przestań!”  
→ emocja: **upokorzenie** · dystraktory: złość, wstyd, bezsilność

**115.** `id 13` · chłopak, 14 l.  
*14-latek stoi na przystanku. Rodzic woła za nim zbyt głośno.*  
„Nie rób siary!”  
→ emocja: **wstyd** · dystraktory: złość, upokorzenie, bunt

**116.** `id 18` · chłopak, 17 l.  
*Kolejna dyskusja o godzinie powrotu. 17-latek rzuca plecak i siada na łóżku.*  
„Mam 17 lat i mam potrzebę wracać później. Czemu ty tego nie widzisz?”  
→ emocja: **bunt** · dystraktory: złość, niesprawiedliwość, bezsilność

**117.** `id 21` · chłopak, 16 l.  
*Rodzic wraca z wywiadówki i chce pogadać o ocenach. 16-latek odsuwa talerz.*  
„Nie chcę o tym teraz gadać. I nie rób ze mnie projektu do naprawy.”  
→ emocja: **bunt** · dystraktory: złość, upokorzenie, bezsilność

**118.** `id 31` · chłopak, 13 l.  
*Rodzic i 13-latek właśnie pokłócili się o drobiazg. Odwraca się do ściany.*  
„Nie lubię cię.”  
→ emocja: **złość** · dystraktory: smutek, bezsilność, samotność

**119.** `id 32` · chłopak, 15 l.  
*Chwila ciszy po kłótni. 15-latek mówi już ciszej, ale twardo.*  
„Widzisz mnie tylko wtedy, kiedy coś robię źle.”  
→ emocja: **smutek** · dystraktory: bezsilność, samotność, żal

**120.** `id 33` · chłopak, 14 l.  
*Rodzic otwiera drzwi do pokoju 14-latka bez pukania.*  
„Nie wchodź tutaj bez pytania. To jest moja przestrzeń.”  
→ emocja: **złość** · dystraktory: bunt, strach, bezsilność

**121.** `id 34` · dziewczyna, 16 l.  
*Rodzic pyta 16-latkę, czemu ostatnio się oddala.*  
„Bo jak pytasz o wszystko, to mam ochotę tylko uciec. Serio.”  
→ emocja: **przytłoczenie** · dystraktory: bunt, złość, strach

**122.** `id 35` · chłopak, 15 l.  
*15-latek odrabia lekcje. Rodzic zaczyna doradzać.*  
„Przestań mi stać nad głową. Jak mnie ciśniesz, to mam jeszcze większy mętlik.”  
→ emocja: **przytłoczenie** · dystraktory: złość, bunt, bezsilność

**123.** `id 36` · chłopak, 16 l.  
*Rodzic mówi: porozmawiajmy. 16-latek włącza głośniej muzykę.*  
„Nie teraz. Jak będę gotowy, to sam powiem.”  
→ emocja: **bunt** · dystraktory: przytłoczenie, złość, bezsilność

**124.** `id 37` · chłopak, 15 l.  
*Rodzic wiesza w kuchni kartkę z nowymi zasadami. 15-latek czyta i prycha.*  
„Zasady, zasady… A kto pyta, czego ja potrzebuję?”  
→ emocja: **niesprawiedliwość** · dystraktory: złość, bunt, samotność

**125.** `id 38` · chłopak, 15 l.  
*Rodzic przypomina o obowiązkach. 15-latek stoi w progu z telefonem.*  
„Ja nie jestem robotem. Potrzebuję czasem po prostu nic nie robić.”  
→ emocja: **przytłoczenie** · dystraktory: bunt, bezsilność, złość

**126.** `id 50` · chłopak, 16 l.  
*16-latek właśnie znalazł w telefonie rodzica screena ze swojej rozmowy.*  
„Nie miałaś prawa. Czuję się jak w klatce.”  
→ emocja: **złość** · dystraktory: żal, strach, bezsilność

**127.** `id 51` · chłopak, 15 l.  
*Rodzic wrzucił w sieci zdjęcie 15-latka z dzieciństwa. Wpada w panikę.*  
„Usuń to zdjęcie. Ja nie chcę, żeby to było w internecie.”  
→ emocja: **złość** · dystraktory: strach, upokorzenie, bezsilność

**128.** `id 52` · chłopak, 16 l.  
*Właśnie skończyła się ostra kłótnia między rodzicem a 16-latkiem. Drzwi trzaskają.*  
„Nienawidzę cię.”  
→ emocja: **złość** · dystraktory: smutek, bezsilność, desperacja

**129.** `id 53` · chłopak, 16 l.  
*Godzinę po kłótni 16-latek wraca spokojniejszy, ale głos mu się łamie.*  
„Mogłabyś chociaż raz posłuchać, zamiast tylko rządzić?”  
→ emocja: **bezsilność** · dystraktory: smutek, żal, samotność

**130.** `id 54` · chłopak, 14 l.  
*Rodzic prosi 14-latka o wyniesienie śmieci. Eksploduje.*  
„Zaraz! Czemu zawsze ja? Mam was wszystkich dosyć.”  
→ emocja: **złość** · dystraktory: przytłoczenie, niesprawiedliwość, bezsilność

**131.** `id 55` · chłopak, 15 l.  
*Rodzic komentuje bałagan w pokoju 15-latka. Ten mówi ostro.*  
„To mój pokój. Jak ci się nie podoba, to nie wchodź.”  
→ emocja: **bunt** · dystraktory: złość, niesprawiedliwość, frustracja

**132.** `id 56` · chłopak, 16 l.  
*16-latek nie ma ochoty sprzątać swojego pokoju.*  
„Jak będę dorosły, to zatrudnię kogoś do sprzątania w moim domu.”  
→ emocja: **bunt** · dystraktory: złość, frustracja, bezsilność

**133.** `id 57` · chłopak, 16 l.  
*16-latek właśnie odkrył na swoim telefonie aplikację do śledzenia lokalizacji.*  
„Po co to znów robisz?”  
→ emocja: **złość** · dystraktory: żal, strach, bunt

**134.** `id 61` · dziewczyna, 16 l.  
*Rodzic prosi 16-latkę o pomoc w kuchni. Nawet nie podnosi wzroku.*  
„Nie. Jestem zmęczona. I nie udawaj, że tego nie słyszysz.”  
→ emocja: **przytłoczenie** · dystraktory: złość, bunt, bezsilność

**135.** `id 62` · chłopak, 15 l.  
*Kolejna rozmowa o pomaganiu w domu. 15-latek wchodzi w obronę.*  
„Przestań gadać, że nic nie robię. Ja też mam swoje rzeczy i swoją głowę.”  
→ emocja: **niesprawiedliwość** · dystraktory: złość, bunt, bezsilność

**136.** `id 67` · chłopak, 15 l.  
*Rodzic próbuje postawić granicę. 15-latek krzyczy.*  
„Zostaw mnie! Jak wejdziesz jeszcze raz, to zamknę drzwi na klucz.”  
→ emocja: **złość** · dystraktory: strach, bunt, bezsilność

**137.** `id 68` · dziewczyna, 16 l.  
*Po spięciu o komputer 16-latka idzie w groźbę emocjonalną.*  
„Jak tak dalej będziesz robić, to przestanę z tobą rozmawiać. I będziesz sama.”  
→ emocja: **złość** · dystraktory: smutek, bezsilność, samotność

**138.** `id 69` · chłopak, 15 l.  
*15-latek krzyczy z pokoju podczas grania. Rodzic prosi o ciszę.*  
„Przestań wchodzić co pięć minut! Ja jestem w trakcie.”  
→ emocja: **złość** · dystraktory: frustracja, bunt, przytłoczenie

**139.** `id 73` · dziewczyna, 16 l.  
*Rodzic komentuje, że widział 16-latkę całującą się pod domem. Spina się.*  
„To nie twoja sprawa. Przestań mnie obserwować jak policja.”  
→ emocja: **złość** · dystraktory: bunt, wstyd, strach

**140.** `id 77` · dziewczyna, 13 l.  
*13-latka ma pretensje, że rodzic powiedział o jej okresie tacie i ciociom.*  
„Czemu powiedziałaś tacie i ciociom? To było moje i prywatne.”  
→ emocja: **żal** · dystraktory: złość, upokorzenie, wstyd

**141.** `id 90` · chłopak, 18 l.  
*Rozmowa o wyprowadzce. 18-latek broni swojej autonomii.*  
„Przecież mam 18 lat. Czemu moje życie ma być dalej waszą sprawą?”  
→ emocja: **bunt** · dystraktory: złość, frustracja, bezsilność

**142.** `id 93` · chłopak, 15 l.  
*Wczoraj rodzic obiecał, że nie będzie krzyczeć. Wieczór, kuchnia. 15-latek mówi.*  
„Ja już ci nie wierzę. Za każdym razem jest tak samo.”  
→ emocja: **żal** · dystraktory: bezsilność, smutek, samotność

### Nowe scenki poziom 3 (45)

**143.** `id 172` · chłopak, 16 l.  
*16-latek odkrywa, że rodzic bez konsultacji oddał jego stare, ale wciąż używane gry komputerowe kuzynowi.*  
„To były moje rzeczy! Dlaczego zawsze decydujesz za mnie i bez pytania grzebiesz w moich szafkach?!”  
→ emocja: **złość** · dystraktory: niesprawiedliwość, żal, bunt

**144.** `id 173` · chłopak, 14 l.  
*14-latek prosi o zgodę na powrót z imprezy o północy, a rodzic stanowczo upiera się przy godzinie dwudziestej drugiej.*  
„Wszyscy mogą zostać do końca, tylko ja muszę uciekać jak jakiś maluch. Robisz mi obciach przed całą klasą, nigdy mi nie ufasz!”  
→ emocja: **niesprawiedliwość** · dystraktory: złość, wstyd, bunt

**145.** `id 174` · dziewczyna, 16 l.  
*16-latka słyszy, jak rodzic wychwala młodsze rodzeństwo za drobną pomoc w domu, ignorując jej wcześniejsze porządki.*  
„Jasne, on jest waszą idealną gwiazdą. Ja mogę posprzątać cały dom i nikt nawet nie zauważy, bo dla was liczy się tylko on!”  
→ emocja: **niesprawiedliwość** · dystraktory: żal, złość, samotność

**146.** `id 175` · chłopak, 13 l.  
*13-latek dowiaduje się, że z powodu pilnego wyjazdu rodzinnego nie będzie mógł wziąć udziału w turnieju online z kolegami.*  
„Nie no, świetnie! Teraz pomyślą, że stchórzyłem i wywalą mnie z klanu. Zawsze musicie mi wszystko psuć w ostatniej chwili!”  
→ emocja: **złość** · dystraktory: bezsilność, strach, żal

**147.** `id 176` · dziewczyna, 13 l.  
*13-latka przyłapuje rodzica na tym, że próbował podejrzeć powiadomienia na jej telefonie, gdy zostawiła go na chwilę w kuchni.*  
„No nie wierzę! Serio musisz mnie tak śledzić?”  
→ emocja: **złość** · dystraktory: żal, strach, bunt

**148.** `id 177` · chłopak, 16 l.  
*16-latek przegrywa ważny mecz w grze rankingowej, bo rodzic kazał mu natychmiast wyłączyć komputer, nie pozwalając dokończyć rundy.*  
„No i po randze! Przez ciebie przegraliśmy, bo musiałaś mi teraz truć o tych głupich śmieciach. Zero wyczucia, po prostu niszczysz mi wszystko, co dla mnie ważne!”  
→ emocja: **złość** · dystraktory: bezsilność, żal, frustracja

**149.** `id 178` · dziewczyna, 17 l.  
*17-latka słyszy przy obiedzie kolejne pytanie o to, czy na pewno złoży papiery na medycynę, bo 'artysta to nie zawód'.*  
„Rzygać mi się chce tym waszym prestiżem. Nikogo nie obchodzi, co ja czuję, tylko co powiecie znajomym. Mam dość tej wiecznej presji, dajcie mi w końcu żyć!”  
→ emocja: **złość** · dystraktory: bunt, bezsilność, smutek

**150.** `id 179` · chłopak, 13 l.  
*13-latek wraca ze szkoły i odkrywa, że rodzic poukładał mu notatki i papiery na biurku, szukając ważnego dokumentu.*  
„Znowu tu byłaś?! Wszystko tu leżało tak jak trzeba! Czy ty naprawdę musisz wszędzie łazić? To jest mój pokój, a nie jakieś muzeum do zwiedzania dla ciebie!”  
→ emocja: **złość** · dystraktory: niesprawiedliwość, bunt, bezsilność

**151.** `id 181` · dziewczyna, 16 l.  
*16-latka o tym, że rodzic pyta ją, z kim pisze na telefonie.*  
„To jest moja prywatna sprawa. Czy ja ci zaglądam w telefon? Daj mi w końcu trochę oddechu!”  
→ emocja: **złość** · dystraktory: bunt, strach, bezsilność

**152.** `id 182` · chłopak, 15 l.  
*15-latek, gdy rodzic wchodzi do pokoju bez pukania.*  
„Wyjdź! Serio, czy tak trudno jest zapukać? Czuję się tutaj jak w jakimś monitorowanym więzieniu.”  
→ emocja: **złość** · dystraktory: bunt, upokorzenie, bezsilność

**153.** `id 183` · dziewczyna, 17 l.  
*17-latka dowiaduje się, że rodzice rozmawiali o jej ocenach z ciocią.*  
„Po co rozpowiadacie o moich sprawach całej rodzinie? To jest moje życie, a nie temat do plotek przy kawie!”  
→ emocja: **złość** · dystraktory: żal, upokorzenie, bunt

**154.** `id 184` · chłopak, 14 l.  
*14-latek po zainstalowaniu przez rodziców aplikacji do kontroli czasu przed ekranem.*  
„Blokujecie mi telefon o 21? Przecież to jest jedyny czas, kiedy mogę pogadać z ludźmi. Czuję się ubezwłasnowolniony.”  
→ emocja: **złość** · dystraktory: bunt, bezsilność, samotność

**155.** `id 185` · dziewczyna, 16 l.  
*16-latka, gdy mama próbuje dołączyć do jej znajomych na Facebooku.*  
„Proszę, nie rób mi tego. To jest moja przestrzeń, nie chcę tam mieć rodziców pod każdym postem.”  
→ emocja: **strach** · dystraktory: wstyd, bunt, złość

**156.** `id 186` · chłopak, 15 l.  
*15-latek o czytaniu jego pamiętnika lub notatek przez rodzica.*  
„Znalazłem to pod łóżkiem, leżało inaczej. Czytałaś to, prawda? Jak mogłaś mi to zrobić?!”  
→ emocja: **żal** · dystraktory: złość, upokorzenie, bezsilność

**157.** `id 187` · dziewczyna, 13 l.  
*13-latka o tym, że rodzice każą jej zostawiać telefon w salonie na noc.*  
„Nikt tak nie robi! Wszyscy mają telefony przy sobie, a wy traktujecie mnie, jakbym miała pięć lat.”  
→ emocja: **niesprawiedliwość** · dystraktory: złość, bunt, wstyd

**158.** `id 188` · chłopak, 17 l.  
*17-latek mówi o planach na weekend, które rodzice chcą znać godzina po godzinie.*  
„Nie wiem dokładnie, co będziemy robić! Po prostu wychodzę. Przecież nie ucieknę z kraju.”  
→ emocja: **bunt** · dystraktory: złość, frustracja, przytłoczenie

**159.** `id 189` · dziewczyna, 16 l.  
*16-latka o tym, że rodzic wszedł do łazienki, gdy ona się kąpała.*  
„Nie ma tu żadnego zamka? Nie mogę mieć nawet chwili dla siebie w tym domu?”  
→ emocja: **złość** · dystraktory: wstyd, bunt, bezsilność

**160.** `id 190` · dziewczyna, 17 l.  
*17-latka, której rodzice nie chcą puścić na koncert ulubionego zespołu.*  
„Oni przyjeżdżają raz na kilka lat! To jest moja jedyna szansa, żeby ich zobaczyć. Wszystko mi ucieka!”  
→ emocja: **złość** · dystraktory: smutek, bezsilność, tęsknota

**161.** `id 191` · chłopak, 15 l.  
*15-latek próbuje nagrać filmik na YouTube, ale rodzice ciągle wchodzą mu do pokoju.*  
„To jest nie do zrobienia. Nigdy nie uda mi się nagrać nic sensownego, jak ciągle ktoś tu łazi i coś chce!”  
→ emocja: **frustracja** · dystraktory: złość, bezsilność, bunt

**162.** `id 192` · chłopak, 16 l.  
*16-latek o nowym hobby, które rodzice wyśmiewają.*  
„Dla was wszystko, co robię, jest dziwne. Nawet nie spróbowaliście zrozumieć, o co w tym chodzi, od razu jest 'głupie'.”  
→ emocja: **smutek** · dystraktory: złość, bezsilność, samotność

**163.** `id 193` · chłopak, 17 l.  
*17-latek mówi o tym, że rodzice zmuszają go do nauki gry na instrumencie, którego nie lubi.*  
„Mam dosyć tego pianina. Każda godzina przy nim to dla mnie tortura. Dlaczego nie mogę robić tego, co ja chcę?”  
→ emocja: **bezsilność** · dystraktory: złość, bunt, smutek

**164.** `id 194` · chłopak, 14 l.  
*14-latek o swojej kolekcji kart i figurek, którą rodzic nazwał śmieciami.*  
„To nie są śmieci! Zbierałem to latami! Zupełnie tego nie szanujesz.”  
→ emocja: **złość** · dystraktory: żal, smutek, bezsilność

**165.** `id 195` · chłopak, 16 l.  
*16-latek o presji rodziców na konkretny kierunek studiów.*  
„To wasze marzenia, nie moje. Chcecie, żebym był lekarzem, ale ja mdleję na widok krwi. Nikt mnie nie słucha!”  
→ emocja: **złość** · dystraktory: bunt, bezsilność, smutek

**166.** `id 197` · dziewczyna, 14 l.  
*14-latka o tym, że młodszy brat może więcej.*  
„On znowu nie musiał sprzątać po kolacji, bo 'jest mały'. Ja w jego wieku już wszystko robiłam sama. To jest totalnie nie fair!”  
→ emocja: **niesprawiedliwość** · dystraktory: złość, żal, bezsilność

**167.** `id 198` · chłopak, 16 l.  
*16-latek proszony o pomoc z zakupami, gdy właśnie planował wyjście.*  
„Dlaczego zawsze przypominasz sobie o zakupach, kiedy ja mam swoje plany? Nigdy nie szanujesz mojego czasu!”  
→ emocja: **złość** · dystraktory: niesprawiedliwość, bunt, frustracja

**168.** `id 199` · dziewczyna, 13 l.  
*13-latka, której rodzice nie pozwalają kupić konkretnego ciucha.*  
„Wszystkie dziewczyny to noszą! Tylko ja mam wyglądać inaczej, bo wam się to nie podoba. Chcecie, żeby wszyscy się ze mnie śmiali?”  
→ emocja: **niesprawiedliwość** · dystraktory: złość, wstyd, strach

**169.** `id 200` · chłopak, 15 l.  
*15-latek o tym, że rodzice sprawdzają jego oceny codziennie.*  
„Mam 15 lat, a wy pilnujecie mnie jak w podstawówce. Czy wy mi w ogóle w czymkolwiek ufacie?”  
→ emocja: **niesprawiedliwość** · dystraktory: złość, bunt, bezsilność

**170.** `id 201` · dziewczyna, 17 l.  
*17-latka, która nie może pojechać pod namiot ze znajomymi.*  
„Znam ich od lat! Nic mi się nie stanie, ale wy zawsze widzicie najgorsze scenariusze. Mam dość tego pilnowania na każdym kroku.”  
→ emocja: **złość** · dystraktory: bunt, niesprawiedliwość, bezsilność

**171.** `id 202` · chłopak, 14 l.  
*14-latek o tym, że rodzic przerwał mu wypowiedź przy gościach.*  
„Zrobiłeś ze mnie głupka przy wszystkich, jakbym nie miał nic mądrego do gadania.”  
→ emocja: **upokorzenie** · dystraktory: złość, żal, bezsilność

**172.** `id 203` · chłopak, 15 l.  
*15-latek o tym, że rodzice wybrali mu zajęcia dodatkowe bez pytania.*  
„Nie zapytaliście mnie, czy ja w ogóle chcę tam chodzić. Po prostu mnie tam zapisaliście, jakbym był przedmiotem.”  
→ emocja: **niesprawiedliwość** · dystraktory: złość, bunt, bezsilność

**173.** `id 204` · chłopak, 17 l.  
*17-latek o zakazie prowadzenia samochodu rodziców mimo zdanego prawa jazdy.*  
„Właśnie zrobiłem prawko! Skąd mam nabrać wprawy, jak wy mi nigdy nie dajecie kluczyków? Zawsze jestem 'za młody'.”  
→ emocja: **niesprawiedliwość** · dystraktory: złość, frustracja, bunt

**174.** `id 205` · chłopak, 17 l.  
*17-latek o tym, że rodzice skomentowali jego post w mediach społecznościowych.*  
„Po co to zrobiliście? Przecież to jest siara! Teraz moi znajomi będą to wyciągać przez pół roku.”  
→ emocja: **upokorzenie** · dystraktory: złość, wstyd, bunt

**175.** `id 206` · chłopak, 15 l.  
*15-latek o tym, że rodzic każe mu wyjść z psem w deszczu.*  
„Zawsze ja! Dlaczego to ja muszę iść, kiedy leje, a wy sobie siedzicie przed telewizorem? To jest niesprawiedliwe!”  
→ emocja: **niesprawiedliwość** · dystraktory: złość, bunt, frustracja

**176.** `id 207` · chłopak, 16 l.  
*16-latek, któremu rodzic każe wynieść śmieci, choć właśnie usiadł.*  
„Właśnie usiadłem, żeby odpocząć. Czy naprawdę te śmieci nie mogą poczekać do jutra? Musisz mi truć teraz?”  
→ emocja: **złość** · dystraktory: frustracja, bunt, bezsilność

**177.** `id 208` · chłopak, 17 l.  
*17-latek o pomaganiu w ogrodzie w weekend.*  
„Cały weekend mamy kopać te grządki? Przecież ja miałem się spotkać z ekipą. Znowu mi psujecie plany.”  
→ emocja: **złość** · dystraktory: niesprawiedliwość, bunt, frustracja

**178.** `id 209` · chłopak, 16 l.  
*16-latek o tym, że rodzic próbuje go przytulić przy znajomych.*  
„Przestań! Robisz mi totalny obciach. Nie jestem już małym dzieckiem!”  
→ emocja: **wstyd** · dystraktory: złość, upokorzenie, bunt

**179.** `id 210` · dziewczyna, 15 l.  
*15-latka o tym, że rodzic chce iść z nią na zakupy odzieżowe.*  
„Sama sobie wybiorę ubrania. Twój gust to lata dziewięćdziesiąte, nie chcę wyglądać jak ty.”  
→ emocja: **bunt** · dystraktory: złość, wstyd, frustracja

**180.** `id 211` · chłopak, 14 l.  
*14-latek o tym, że rodzic ciągle pyta, jak było w szkole.*  
„Normalnie. Jak zawsze. Możesz przestać mnie tak przesłuchiwać co dwa dni?”  
→ emocja: **frustracja** · dystraktory: złość, bunt, przytłoczenie

**181.** `id 212` · dziewczyna, 17 l.  
*17-latka o tym, że rodzice chcą poznać jej nowego chłopaka.*  
„Nie przyprowadzę go tutaj, żebyście go oceniali od progu. To moja sprawa, z kim się spotykam.”  
→ emocja: **strach** · dystraktory: bunt, złość, wstyd

**182.** `id 213` · chłopak, 16 l.  
*16-latek o tym, że rodzic daje mu rady, o które nie prosił.*  
„Wiem, co mam robić! Nie musisz mi powtarzać wszystkiego po dziesięć razy, jakbym był głupi.”  
→ emocja: **złość** · dystraktory: frustracja, bunt, upokorzenie

**183.** `id 214` · dziewczyna, 15 l.  
*15-latka o tym, że rodzice krytykują jej muzykę.*  
„Słucham tego, co chcę słuchać. Jak wam się nie podoba, to wyjdźcie z mojego pokoju, ale nie mówcie, że to 'hałas'.”  
→ emocja: **złość** · dystraktory: bunt, smutek, niesprawiedliwość

**184.** `id 215` · chłopak, 14 l.  
*14-latek o tym, że rodzice śmieją się z jego problemów sercowych.*  
„Dla was to jest zabawne, ale dla mnie to jest teraz najważniejsze. Nic nie rozumiecie!”  
→ emocja: **smutek** · dystraktory: złość, samotność, żal

**185.** `id 216` · chłopak, 16 l.  
*16-latek o tym, że rodzic mówi do niego pieszczotliwym imieniem z dzieciństwa.*  
„Nie mów tak do mnie! Nienawidzę tego imienia, czuję się wtedy jak jakiś niemowlak.”  
→ emocja: **wstyd** · dystraktory: złość, bunt, smutek

**186.** `id 217` · dziewczyna, 15 l.  
*15-latka o tym, że rodzic próbuje być 'fajny' przy jej kolegach.*  
„To było takie cringe'owe. Proszę, po prostu zachowuj się normalnie, a nie udawaj nastolatka.”  
→ emocja: **wstyd** · dystraktory: złość, upokorzenie, frustracja

**187.** `id 218` · chłopak, 15 l.  
*15-latek, który bardzo liczył na wyjazd na obóz sportowy, dowiaduje się, że z powodu awarii samochodu rodzice muszą przesunąć wydatki.*  
„Obiecaliście mi to pół roku temu! Wszyscy moi kumple już mają opłacone miejsca, a ja teraz mam im powiedzieć, że co? Że znowu coś się zepsuło? Zawsze mi wszystko psujecie w ostatniej chwili!”  
→ emocja: **złość** · dystraktory: żal, niesprawiedliwość, bezsilność

## Inne pytania i przykłady w aplikacji

### Scenka próbna (onboarding, przy pierwszym uruchomieniu)

🟢 Poziom 1. Ta sama treść co scenka `id 8`.

*14-latek siedzi nad obiadem po klasówce. Łyżka krąży w zupie, apetytu brak.*  
„Starałem się, a i tak wszystko spieprzyłem. Chyba naprawdę jestem do niczego.”  
Pytanie: **„Co odpowiadasz?”**

Gdy ocena AI się nie powiedzie, aplikacja pokazuje stałą odpowiedź zastępczą: wynik 7, „Poczuł, że próbujesz go zrozumieć.”, pytanie refleksyjne „Co poczułeś, kiedy czytałeś jego słowa?”.

### Slajd 3 wprowadzenia

Dziecko mówi: „Nie dam rady…”  
✗ ŹLE: „Nie przesadzaj, to nie takie trudne.”  
✓ DOBRZE: „Widzę, że jest ci ciężko.”

### Pomoc „Jak reagować?” (przycisk ?)

| Dziecko mówi | ✓ Spróbuj tak | ✗ Nie tak |
|---|---|---|
| „Starałem się, a i tak wszystko spieprzyłem.” | „Tyle pracy — i jakby to nic nie znaczyło.” | „Następnym razem się lepiej przygotuj.” |
| (gdy jest zły na rodzica) „Nienawidzę cię”, „Zostaw mnie”, „Nie miałaś prawa” | „Czujesz, że zepsułem coś między nami.” | „Nie pozwalam tak do mnie mówić.” |

Typowe pułapki wymienione w pomocy: „Nie przesadzaj” (bagatelizowanie), „Pogadaj z wychowawcą” (naprawianie), „Jak się pouczysz, to będzie lepiej” (doradzanie), „Ja w twoim wieku…” (porównywanie).

### Quiz „Czy umiesz słuchać nastolatka?” (`quiz.html`, przycisk „Zrób znajomemu wyzwanie”)

Jedyne pytanie zamknięte w aplikacji. Zawsze to samo, bez losowania.

*15-latek wraca ze szkoły. Rzuca plecak, zamyka się w pokoju. Po chwili wychodzi.*  
Twój syn mówi: „Nikt mnie nie lubi. Siedzę na przerwie sam jak palec, a oni udają, że mnie nie widzą.”  
Pytanie: **„Co mu powiesz?”**

| | Odpowiedź | Wynik | Komentarz po wyborze |
|---|---|---|---|
| A | Może spróbuj się do nich uśmiechnąć? Ludzie lgną do pozytywnych osób. | ⚡ Pułapka: Rada | Syn mówi „nikt mnie nie lubi”, a słyszy „zrób coś z sobą”. Rada w bólu brzmi jak krytyka — jakby problem był w nim. |
| B | Siedzisz tam sam... i oni zachowują się, jakbyś był niewidzialny. | ✨ Brawo! | Powtórzyłeś jego doświadczenie własnymi słowami — bez ratowania, bez rady. Poczuł, że ktoś naprawdę go widzi. |
| C | Nie przejmuj się, w liceum poznasz nowych ludzi i wszystko się zmieni. | ⚡ Pułapka: Pocieszanie | „Nie przejmuj się” to odcięcie od uczucia. Syn słyszy: twój ból nie jest ważny, poczekaj parę lat. |

Po złej odpowiedzi dodatkowo: „Większość rodziców też wybiera tę opcję. To naturalny odruch.”

### Pytania i podpowiedzi w interfejsie

- Pod każdą scenką: „Co odpowiadasz?”
- Ekran „Moja sytuacja”: „Co powiedział Twój nastolatek? Co się działo?” (z opisu rodzica AI tworzy nową scenkę).
- Ekran oczekiwania na ocenę (napisy zmieniają się co 1,8 s): „Odpowiedź przyjęta...”, „Jak to usłyszy?”, „Czy poczuje się zrozumiany/zrozumiana?”, „Jak mu/jej to zabrzmi?”.
- Po trzech słabych odpowiedziach z rzędu (wynik poniżej 6) nad scenką pojawia się jedna losowa podpowiedź:
  - „Spróbuj powiedzieć to, co widzisz — nie to, co chcesz naprawić.”
  - „Nie musisz mieć rozwiązania. Wystarczy, że usłyszysz.”
  - „Nazwij to, co czuje — nawet jednym zdaniem.”
  - „Pomyśl: co by chciał usłyszeć, żeby poczuć, że go rozumiesz?” (przy dziewczynie: „co by chciała usłyszeć, żeby poczuć, że ją rozumiesz?”)
  - „Spróbuj być lustrem, nie ratownikiem.”
  - „Zamiast rady — powiedz, co widzisz w jego oczach.” (przy dziewczynie: „w jej oczach”)
- Gdy ta sama pułapka wystąpiła co najmniej 3 razy: „Często pojawia się pułapka „…”. To normalne. Spróbuj skupić się na nazywaniu uczuć.”
- Tekst udostępniania wyniku: „Co odpowiadasz nastolatkowi? 😏”.

### Treści tworzone przez AI (nie da się ich wyeksportować)

- Pytanie refleksyjne po każdej ocenie (`reflection_question`, „jedno pytanie o przeżycie RODZICA w tej konkretnej sytuacji”).
- Reakcja nastolatka, „Co działa”, „Na co uważać”, podpowiedzi „Nazwij uczucie” i „Echo”.
- Scenki z trybu „Moja sytuacja”.

## Uwagi z ekstrakcji

Fakty zauważone przy wyciąganiu i przeglądzie danych, bez oceny merytorycznej scenek.

1. **Liczba scenek: 187** (po scaleniu duplikatów 110 + 111 i 112 + 113). Numery `id` sięgają 218, 31 numerów jest pominiętych (16, 17, 19, 20, 28, 39, 40, 41, 43, 44, 45, 47, 48, 49, 58, 66, 72, 80, 81, 82, 92, 94, 96, 97, 98, 99, 100, 111, 113, 180, 196); duplikatów `id` nie ma.
2. **Nierówne poziomy:** poziom 1: 81, poziom 2: 32, poziom 3: 74.
3. **Podobne scenki, nie scalone.** Ta sama sytuacja opisana innymi słowami:

   - `114` (poz. 1) i `115` (poz. 1): 14-latka widzi w relacji, że paczka bawi się bez niej
   - `126` (poz. 1) i `127` (poz. 1): 16-latek przed lustrem rezygnuje z wyjścia, bo źle wygląda
   - `150` (poz. 1) i `153` (poz. 1): chłopaka nie wzięli do składu mimo treningów, a wzięli kogoś, kto się obijał
   - `33` (poz. 3) i `182` (poz. 3): rodzic wchodzi do pokoju chłopaka bez pukania
   - `54` (poz. 3) i `207` (poz. 3): rodzic każe chłopakowi wynieść śmieci
   - `26` (poz. 1) i `141` (poz. 1): hejt pod filmikiem dziewczyny, „już nic nie wrzucę”
   - `145` (poz. 1) i `147` (poz. 1): dziewczyna uczy się w nocy i nie daje rady
   - `31` (poz. 3) i `52` (poz. 3): chłopak po kłótni: „Nie lubię cię” / „Nienawidzę cię”

   Ten sam temat, inna sytuacja albo płeć:

   - `175` (poz. 3) i `218` (poz. 3): plany chłopaka przepadają przez sprawy rodzinne; to samo zdanie „Zawsze (musicie) mi wszystko psuć w ostatniej chwili!”
   - `174` (poz. 3) i `197` (poz. 3): dziewczyna, młodszy brat i sprzątanie
   - `178` (poz. 3) i `195` (poz. 3): rodzice pchają na medycynę
   - `69` (poz. 3) i `191` (poz. 3): rodzice ciągle wchodzą do pokoju, gdy chłopak coś robi
   - `14` (poz. 2) i `210` (poz. 3): własny styl ubierania, „nie chcę wyglądać jak ty”
   - `11` (poz. 2) i `217` (poz. 3): rodzic zagaduje znajomych nastolatka
4. **Rodzaj rodzica.** W 10 scenkach rodzicem jest matka (50, 53, 68, 71, 76, 77, 177, 179, 185, 186; np. „Nie miałaś prawa”, „Mogłabyś chociaż raz posłuchać”), w 1 ojciec (202: „Zrobiłeś ze mnie głupka”), w pozostałych rodzaj rodzica nie wynika z tekstu. Interfejs zwraca się do rodzica w rodzaju męskim: „Powtórzyłeś jego doświadczenie” (quiz), „żebyś je usłyszał i był z nim” (wprowadzenie), „Co poczułeś, kiedy czytałeś jego słowa?”, „żebyś nie zgubił serii”, „będziesz mógł odpowiedzieć”.
5. **Słownik emocji:** w polach `emo` i `dist` występuje 18 różnych słów, z czego 6 nie ma na „Mapie emocji” (panel 🧭 w aplikacji): bunt, desperacja, niesprawiedliwość, przytłoczenie, zazdrość, żal.
6. **Podpowiedź po trzech słabych odpowiedziach** jest losowana przy każdym odświeżeniu ekranu, więc zmienia się przy każdym wpisanym znaku odpowiedzi.
7. **Wyzwanie dla znajomego** zawsze wysyła ten sam quiz. W kodzie jest gotowy prompt do generowania quizu A/B/C z dowolnej scenki (`SYS_CHALLENGE`), ale nigdzie nie jest używany.
