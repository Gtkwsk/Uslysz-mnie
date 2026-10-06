# Usłysz Mnie: pytania w aplikacji

Eksport z `index.html` (tablica `SCENARIOS_DB`), commit `1045778`, 2026-10-06.
Te same dane do arkusza: [`scenki.csv`](scenki.csv) (Excel, separator „;”), do dalszej obróbki: [`scenki.json`](scenki.json).

## Spis treści

1. [Jak wygląda pytanie w aplikacji](#jak-wygląda-pytanie-w-aplikacji)
2. [Liczby](#liczby)
3. Scenki
   - [Poziom 1: emocja czytelna, łatwa do nazwania (80)](#poziom-1)
   - [Poziom 2: kusi, żeby doradzać i naprawiać (45)](#poziom-2)
   - [Poziom 3: nastolatek zły NA rodzica (75)](#poziom-3)
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

Scenka Dnia to jedna z tych samych 200 scenek, wybierana na podstawie daty spośród wszystkich poziomów naraz.

## Liczby

| Poziom | Nazwa w menu | Scenek | Chłopcy | Dziewczyny | Wiek |
|---|---|--:|--:|--:|---|
| 🟢 1 | Podstawy | 80 | 42 | 38 | 13-18 |
| 🟡 2 | Trudniej się powstrzymać | 45 | 28 | 17 | 13-18 |
| 🔴 3 | Kiedy to o Ciebie chodzi | 75 | 51 | 24 | 13-18 |
| **razem** | | **200** | **121** | **79** | 13-18 |

Rozkład wieku: 13 lat (21) · 14 lat (39) · 15 lat (61) · 16 lat (46) · 17 lat (30) · 18 lat (3)

### Emocje docelowe (`emo`)

| Emocja | Poz. 1 | Poz. 2 | Poz. 3 | Razem |
|---|--:|--:|--:|--:|
| złość | 2 | 1 | 31 | 34 |
| przytłoczenie | 12 | 6 | 4 | 22 |
| wstyd | 9 | 8 | 4 | 21 |
| niesprawiedliwość | 5 | 3 | 11 | 19 |
| strach | 11 | 5 | 2 | 18 |
| bezsilność | 10 | 5 | 2 | 17 |
| bunt |  | 6 | 7 | 13 |
| frustracja | 5 | 3 | 2 | 10 |
| żal | 3 | 2 | 4 | 9 |
| odrzucenie | 8 |  |  | 8 |
| smutek | 3 | 1 | 4 | 8 |
| upokorzenie | 3 |  | 4 | 7 |
| samotność | 2 | 3 |  | 5 |
| rozczarowanie | 3 | 1 |  | 4 |
| zazdrość | 3 |  |  | 3 |
| niepewność | 1 | 1 |  | 2 |

<a id="poziom-1"></a>

## Poziom 1: emocja czytelna, łatwa do nazwania (80)

### Szkoła i presja (19)

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
„Pięć grubych cegieł w dwa miesiące? Przecież ja nie mam kiedy spać, a jeszcze korki i treningi. Oni myślą, że ja jestem robotem?”  
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
„Wcale nie ściągałam! Patrzyłam w okno, a ona mi zabrała kartkę przy wszystkich. I nawet nie chciała mnie wysłuchać.”  
→ emocja: **niesprawiedliwość** · dystraktory: złość, upokorzenie, bezsilność

**16.** `id 109` · chłopak, 17 l.  
*17-latek patrzy na kalendarz. Do wystawienia ocen został tydzień, a on ma trzy zaległe sprawdziany.*  
„Nie dam rady tego ogarnąć. Za dużo tego.”  
→ emocja: **przytłoczenie** · dystraktory: bezsilność, strach, desperacja

**17.** `id 110` · chłopak, 15 l.  
*15-latek wraca do domu z jedynką ze sprawdzianu z chemii, na który uczył się trzy wieczory z rzędu. Rzuca plecakiem o ziemię.*  
„Mam to gdzieś, serio. Po co ja się w ogóle staram, skoro ta baba i tak mnie uwali? To jest jakiś żart, nigdy więcej nie otworzę tego podręcznika.”  
→ emocja: **bezsilność** · dystraktory: złość, rozczarowanie, niesprawiedliwość

**18.** `id 112` · chłopak, 15 l.  
*15-latek został wyrzucony z lekcji przez nauczycielkę, która uznała, że to on rzucał papierkami, choć chłopak siedział cicho.*  
„Wzięła mnie na cel i tyle. Inni robili syf, a ona wskazała palcem na mnie, bo tak jej było wygodniej. Aż mnie trzęsie.”  
→ emocja: **niesprawiedliwość** · dystraktory: złość, upokorzenie, bezsilność

**19.** `id 222` · chłopak, 15 l.  
*Wieczór przed ogłoszeniem wyników egzaminu ósmoklasisty. 15-latek krąży po kuchni.*  
„A jak mi nie starczy punktów? Wszyscy się dostaną, tylko nie ja.”  
→ emocja: **strach** · dystraktory: niepewność, przytłoczenie, bezsilność

### Emocje, lęk, smutek (6)

**20.** `id 22` · chłopak, 14 l.  
*14-latek późnym wieczorem przegląda terminy sprawdzianów i egzaminów.*  
„Nie mogę oddychać, jak o tym myślę. Wszystko mi się miesza w głowie.”  
→ emocja: **przytłoczenie** · dystraktory: strach, bezsilność, desperacja

**21.** `id 23` · dziewczyna, 15 l.  
*15-latka wraca ze szkoły. Jutro prezentacja, nerwowo skubie rękaw.*  
„Jak się ośmieszę, to ja tam więcej nie pójdę. Serio.”  
→ emocja: **strach** · dystraktory: wstyd, niepewność, przytłoczenie

**22.** `id 30` · chłopak, 15 l.  
*15-latek wraca w środku tygodnia i od razu zamyka się w pokoju.*  
„Daj mi chwilę. W szkole cały dzień muszę być ogarnięty, a ja już nie mam baterii.”  
→ emocja: **przytłoczenie** · dystraktory: smutek, bezsilność, samotność

**23.** `id 64` · chłopak, 16 l.  
*16-latek rozmawia z rodzicem o motywacji. W pewnym momencie zaczyna mówić ciszej.*  
„Nie chodzi o lenistwo. Ja po prostu nie widzę sensu w tym, co robię.”  
→ emocja: **bezsilność** · dystraktory: smutek, przytłoczenie, desperacja

**24.** `id 89` · chłopak, 17 l.  
*17-latek milknie, kiedy rodzic naciska na temat studiów. Potem mówi cicho.*  
„Przeraża mnie to wszystko: studia, praca, decyzje. Ja nie wiem czy sobie z tym wszystkim poradzę.”  
→ emocja: **strach** · dystraktory: niepewność, przytłoczenie, bezsilność

**25.** `id 219` · chłopak, 13 l.  
*Rano okazało się, że chomik 13-latka nie żyje. Chłopak siedzi przy pustej klatce.*  
„Przecież jeszcze wczoraj dawałem mu jeść. I nie ruszajcie klatki, niech stoi.”  
→ emocja: **smutek** · dystraktory: żal, bezsilność, tęsknota

### Rówieśnicy i odrzucenie (14)

**26.** `id 24` · dziewczyna, 13 l.  
*13-latka w poniedziałek rano trzyma się za brzuch i nie chce wstać.*  
„Znowu będę tam sama. Znowu będą patrzeć.”  
→ emocja: **samotność** · dystraktory: strach, smutek, odrzucenie

**27.** `id 114` · dziewczyna, 14 l.  
*14-latka przegląda relacje na Instagramie i widzi, że cała jej paczka jest razem na pizzy — bez niej.*  
„No jasne, świetnie się bawią. Nagle o mnie zapomnieli, jakbym w ogóle nie istniała.”  
→ emocja: **odrzucenie** · dystraktory: samotność, smutek, zazdrość

**28.** `id 116` · chłopak, 15 l.  
*15-latek wysłał wiadomość do przyjaciela trzy godziny temu, widzi, że została odczytana, ale nie ma odpowiedzi.*  
„Zlewa mnie totalnie. Widzę, że gra w LoL-a, ale odpisać to już nie łaska. Mam tego dość.”  
→ emocja: **odrzucenie** · dystraktory: złość, samotność, bezsilność

**29.** `id 117` · chłopak, 14 l.  
*14-latek zauważa, że dziewczyna, z którą pisał codziennie przez miesiąc, nagle przestała odpowiadać, choć wrzuca nowe zdjęcia.*  
„Pisała do mnie non stop, a teraz nagle cisza. Widzę, że jest aktywna, ale mnie zlewa totalnie. Co ja niby zrobiłem źle? Wszystko mi się teraz sypie.”  
→ emocja: **odrzucenie** · dystraktory: bezsilność, smutek, niepewność

**30.** `id 118` · chłopak, 13 l.  
*13-latek słyszy, jak koledzy śmieją się z jego nowej fryzury.*  
„Wiedziałem, że to był błąd. Teraz będą o tym gadać przez miesiąc. Najlepiej by było, gdybym w ogóle nie wychodził z pokoju.”  
→ emocja: **wstyd** · dystraktory: strach, samotność, smutek

**31.** `id 119` · chłopak, 17 l.  
*17-latek dowiaduje się, że jego najlepszy przyjaciel wysłał screeny ich prywatnej, bardzo osobistej rozmowy do innych osób z klasy.*  
„Myślałem, że to mój brat, czaisz? A on mnie tak po prostu wystawił dla kilku lajków. Komu ja mam teraz w ogóle ufać? To koniec, z nikim już nie gadam.”  
→ emocja: **odrzucenie** · dystraktory: żal, złość, samotność

**32.** `id 120` · dziewczyna, 17 l.  
*17-latka przygotowuje się do imprezy, ale nagle rezygnuje.*  
„Ech, i tak będę tam stać w kącie. One wszystkie mają o czym gadać, a ja zawsze czuję się tam jak piąte koło u wozu.”  
→ emocja: **samotność** · dystraktory: niepewność, smutek, wstyd

**33.** `id 121` · chłopak, 14 l.  
*14-latek dowiaduje się, że nowy kolega w klasie stał się bardzo popularny.*  
„Nagle wszyscy latają za nim, jakby był jakimś Bogiem. Nawet Bartek już nie ma dla mnie czasu, bo ciągle siedzi u niego.”  
→ emocja: **zazdrość** · dystraktory: samotność, odrzucenie, smutek

**34.** `id 122` · dziewczyna, 16 l.  
*16-latka po otrzymaniu screena, na którym koleżanki ją obgadują.*  
„Patrz, co o mnie piszą. 'Że niby jestem sztywna'. A ja im tyle razy pomagałam z lekcjami. To jest obrzydliwe.”  
→ emocja: **odrzucenie** · dystraktory: złość, żal, upokorzenie

**35.** `id 123` · chłopak, 15 l.  
*15-latek dowiaduje się, że cała jego paczka idzie na osiemnastkę, na którą jego nie zaproszono.*  
„Wszyscy tam będą, tylko nie ja. To będzie największy przypał świata.”  
→ emocja: **odrzucenie** · dystraktory: wstyd, samotność, złość

**36.** `id 124` · dziewczyna, 13 l.  
*13-latka po powrocie ze szkoły, gdzie grupa dziewczyn ją ignorowała.*  
„Jak przechodziłam obok nich, to nagle wszystkie milkły i zaczynały się śmiać. Nienawidzę tej klasy.”  
→ emocja: **odrzucenie** · dystraktory: samotność, smutek, upokorzenie

**37.** `id 125` · dziewczyna, 17 l.  
*17-latka dowiaduje się, że jej chłopak wyjechał na weekend ze znajomymi, o czym zapomniał jej wspomnieć.*  
„Dowiedziałam się o tym z Instagrama, czaisz? Pisaliśmy rano i ani słowa o wyjeździe. Teraz nie odbiera, bo pewnie świetnie się bawi. Po prostu super, tak właśnie wygląda 'zaufanie' w tym związku.”  
→ emocja: **żal** · dystraktory: złość, odrzucenie, niepewność

**38.** `id 75` · dziewczyna, 16 l.  
*16-latka wraca ze szkoły i od razu rzuca się na łóżko.*  
„Powiedziałam mu, co czuję, a on tylko: 'sorry, mam dziewczynę'. Czuję się jak śmieć.”  
→ emocja: **odrzucenie** · dystraktory: smutek, wstyd, bezsilność

**39.** `id 221` · dziewczyna, 14 l.  
*Najlepsza przyjaciółka 14-latki powiedziała jej dziś, że po wakacjach przeprowadza się do innego miasta.*  
„Z kim ja teraz będę siedzieć? Tylko z nią dało się pogadać o wszystkim.”  
→ emocja: **smutek** · dystraktory: samotność, tęsknota, bezsilność

### Wygląd i ciało (15)

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
„Przytyłam i nienawidzę swojego ciała.”  
→ emocja: **bezsilność** · dystraktory: smutek, wstyd, desperacja

**45.** `id 126` · chłopak, 16 l.  
*16-latek szykuje się na osiemnastkę kolegi, ale po długim staniu przed lustrem nagle zdejmuje wyjściowe ubranie i kładzie się na łóżku.*  
„Nigdzie nie idę. Wyglądam jak totalny gnom, te włosy to porażka, a cera... szkoda gadać. Będą się tylko ze mnie nabijać.”  
→ emocja: **wstyd** · dystraktory: strach, bezsilność, smutek

**46.** `id 128` · dziewczyna, 14 l.  
*14-latka mierzy sukienkę na bal ósmoklasisty.*  
„Wyglądam w tym grubo. Ta sukienka podkreśla wszystko, czego nienawidzę. Wszystkie dziewczyny będą wyglądać jak modelki, a ja jak worek.”  
→ emocja: **wstyd** · dystraktory: smutek, bezsilność, strach

**47.** `id 129` · chłopak, 15 l.  
*15-latek ogląda zdjęcie klasowe, na którym stoi w pierwszym rzędzie, najniższy.*  
„Wszyscy już wystrzelili w górę, a ja dalej stoję w miejscu. Wyglądam przy nich jak dzieciak z podstawówki.”  
→ emocja: **wstyd** · dystraktory: smutek, zazdrość, bezsilność

**48.** `id 130` · dziewczyna, 17 l.  
*17-latka wraca od fryzjera, patrzy w lustro z przerażeniem.*  
„Zobacz, co ona mi zrobiła! Za krótko, beznadziejny kolor, wszystko nie tak!”  
→ emocja: **złość** · dystraktory: smutek, bezsilność, rozczarowanie

**49.** `id 131` · chłopak, 13 l.  
*13-latek nosi aparat ortodontyczny od tygodnia.*  
„Przez ten aparat śmiesznie mówię i wyglądam fatalnie. Jeszcze dwa lata? Przecież to jest wieczność!”  
→ emocja: **frustracja** · dystraktory: wstyd, bezsilność, smutek

**50.** `id 132` · dziewczyna, 16 l.  
*16-latka widzi swoje zdjęcie zrobione z ukrycia przez kogoś z klasy.*  
„Jak ja tu wyszłam? Mam jakąś dziwną minę i wyglądam tragicznie. Zaraz pewnie wrzucą to na grupę.”  
→ emocja: **strach** · dystraktory: wstyd, upokorzenie, bezsilność

**51.** `id 133` · chłopak, 15 l.  
*15-latek próbuje dobrać ubrania na wyjście do kina.*  
„Wszystko na mnie wisi albo jest za ciasne. Nie mam nic normalnego, w czym nie wstydziłbym się pokazać.”  
→ emocja: **frustracja** · dystraktory: wstyd, bezsilność, smutek

**52.** `id 134` · dziewczyna, 14 l.  
*14-latka scrolluje TikToka, co chwilę zerkając w lustro.*  
„One mają idealną cerę i figury, a ja... szkoda gadać. Czemu ja nie mogę tak wyglądać?”  
→ emocja: **zazdrość** · dystraktory: smutek, bezsilność, wstyd

**53.** `id 135` · chłopak, 17 l.  
*17-latek ma założyć garnitur na uroczystość rodzinną.*  
„Czuję się w tym jak przebrany. Wszyscy będą się na mnie gapić, to jest tak bardzo nie moje.”  
→ emocja: **niepewność** · dystraktory: wstyd, bezsilność, frustracja

**54.** `id 136` · dziewczyna, 15 l.  
*15-latka wraca do domu i rzuca okulary na stół.*  
„Znowu mi parują, jak wchodzę do autobusu. Wyglądam wtedy jak totalna ofiara losu.”  
→ emocja: **wstyd** · dystraktory: frustracja, bezsilność, smutek

### Media społecznościowe (9)

**55.** `id 26` · dziewczyna, 13 l.  
*13-latka zauważa, że pod jej filmikiem pojawił się hejt. Rzuca telefon na łóżko.*  
„Już nic nie wrzucę. Nie chcę kolejnej fali wyśmiewania.”  
→ emocja: **strach** · dystraktory: smutek, bezsilność, upokorzenie

**56.** `id 137` · dziewczyna, 14 l.  
*14-latka usunęła zdjęcie po tym, jak nikt go nie polubił przez piętnaście minut.*  
„Wiedziałam, że jest beznadziejne. Teraz pewnie wszyscy myślą, że jestem desperatką.”  
→ emocja: **wstyd** · dystraktory: odrzucenie, niepewność, smutek

**57.** `id 138` · chłopak, 15 l.  
*15-latek czyta kłótnię na grupie klasowej na Messengerze.*  
„Wszyscy tam na siebie jadą, a ja nie wiem, co napisać. Boję się, że jak coś powiem, to zaraz wszyscy obrócą się przeciwko mnie.”  
→ emocja: **strach** · dystraktory: niepewność, samotność, bezsilność

**58.** `id 139` · dziewczyna, 16 l.  
*16-latka widzi, że jej były chłopak dodał zdjęcie z nową dziewczyną.*  
„Patrz na to. Miesiąc po zerwaniu i już ma nową. Jakby te dwa lata ze mną w ogóle się nie liczyły.”  
→ emocja: **żal** · dystraktory: złość, odrzucenie, smutek

**59.** `id 140` · chłopak, 13 l.  
*Telefon 13-latka właśnie padł i nie chce się włączyć.*  
„Jestem odcięty od świata! Nie wiem, o czym oni teraz gadają, nie mam dostępu do niczego. To jest koniec mojego życia towarzyskiego.”  
→ emocja: **strach** · dystraktory: samotność, przytłoczenie, bezsilność

**60.** `id 141` · dziewczyna, 15 l.  
*15-latka czyta hejt pod swoim filmikiem.*  
„Napisali, że mam 'krzywy nos' i 'piskliwy głos'. Setki ludzi to widziało. Nie chcę już nigdy nic wrzucać do sieci.”  
→ emocja: **upokorzenie** · dystraktory: smutek, bezsilność, strach

**61.** `id 142` · dziewczyna, 14 l.  
*14-latka patrzy na relacje influencerów.*  
„Oni mają takie super życie, podróżują, mają kasę. A ja siedzę w tym nudnym domu i nic się u mnie nie dzieje.”  
→ emocja: **zazdrość** · dystraktory: smutek, bezsilność, tęsknota

**62.** `id 143` · dziewczyna, 15 l.  
*15-latka dowiaduje się, że koleżanka wrzuciła jej niekorzystne zdjęcie bez pytania.*  
„Wyglądam tam jak potwór! Prosiłam ją, żeby tego nie robiła, a ona to zostawiła. Jak ona mogła mi to zrobić?”  
→ emocja: **złość** · dystraktory: upokorzenie, żal, bezsilność

**63.** `id 144` · chłopak, 13 l.  
*13-latek odkrywa, że w grze został oszukany przez innego gracza.*  
„Oddałem mu wszystkie moje itemy, a on mnie zablokował. Ufałem mu, graliśmy razem od miesięcy!”  
→ emocja: **żal** · dystraktory: złość, odrzucenie, bezsilność

### Przytłoczenie i zmęczenie (4)

**64.** `id 145` · dziewczyna, 15 l.  
*15-latka siedzi o dwudziestej trzeciej nad stosem notatek, bo jutro ma dwa sprawdziany i prezentację, a rano musi jeszcze poćwiczyć do zawodów.*  
„Nie ogarniam tego, po prostu nie ogarniam. Zaraz mi mózg wyparuje, a jeszcze tyle zostało. Nie dam rady, to jest za dużo na jednego człowieka!”  
→ emocja: **przytłoczenie** · dystraktory: bezsilność, strach, desperacja

**65.** `id 146` · dziewczyna, 14 l.  
*Poniedziałek, 6:45. Rodzic budzi 14-latkę trzeci raz.*  
„Znowu ta ciemność za oknem. Mam wrażenie, że całe moje życie to tylko szkoła, spanie i szkoła. Nie mam na nic siły.”  
→ emocja: **przytłoczenie** · dystraktory: smutek, bezsilność, samotność

**66.** `id 147` · dziewczyna, 17 l.  
*17-latka uczy się do egzaminów późno w nocy.*  
„Kawa już na mnie nie działa, oczy mi się same zamykają, a ja mam jeszcze 20 stron do przeczytania. To jest nie do zrobienia.”  
→ emocja: **przytłoczenie** · dystraktory: bezsilność, desperacja, frustracja

**67.** `id 148` · dziewczyna, 13 l.  
*13-latka odrabia matematykę przy kuchennym stole. Nagle odpycha zeszyt.*  
„To jest czarna magia. Siedzę nad tym zadaniem od godziny i dalej nie wiem, od czego zacząć. Zaraz ten zeszyt poleci w kąt!”  
→ emocja: **frustracja** · dystraktory: bezsilność, złość, przytłoczenie

### Pasje i czas wolny (5)

**68.** `id 149` · chłopak, 15 l.  
*15-latek przegrywa ważny mecz w grze online przez błąd serwera.*  
„Nie wierzę! Cały ranking poszedł w dół przez jeden lag. Tyle godzin grindu zmarnowane w sekundę!”  
→ emocja: **frustracja** · dystraktory: złość, bezsilność, rozczarowanie

**69.** `id 150` · chłopak, 16 l.  
*16-latek dowiaduje się, że trener nie wystawił go w pierwszym składzie.*  
„Zasuwałem na każdym treningu, a on wziął tego typa, co połowę czasu przesiedział na ławce. To jest jakaś ściema.”  
→ emocja: **niesprawiedliwość** · dystraktory: złość, rozczarowanie, bezsilność

**70.** `id 151` · dziewczyna, 13 l.  
*13-latka dowiaduje się, że kółko plastyczne zostało odwołane.*  
„To była jedyna rzecz, na którą chciało mi się iść w tym tygodniu. Teraz będę musiała siedzieć w domu i się nudzić.”  
→ emocja: **rozczarowanie** · dystraktory: smutek, samotność, frustracja

**71.** `id 152` · dziewczyna, 15 l.  
*15-latka wraca z fotografowania i przegląda zdjęcia.*  
„Tym starym złomem nic nie wyjdzie. Inni mają profesjonalny sprzęt i ich zdjęcia wyglądają super, a moje to żenada.”  
→ emocja: **frustracja** · dystraktory: zazdrość, bezsilność, smutek

**72.** `id 220` · dziewczyna, 15 l.  
*15-latka wraca od lekarza z nogą w ortezie. Za dwa tygodnie zawody, do których trenowała cały rok.*  
„Cały rok przygotowań i co? Mam teraz siedzieć na trybunach i patrzeć, jak inne startują.”  
→ emocja: **bezsilność** · dystraktory: rozczarowanie, żal, złość

### Przyszłość (8)

**73.** `id 154` · dziewczyna, 18 l.  
*18-latka wraca po rozmowie z doradcą zawodowym.*  
„Nie mam pojęcia, co chcę robić w przyszłości. Czuję, że niedługo muszę podjąć decyzję, a kompletnie nie wiem czego chcę.”  
→ emocja: **przytłoczenie** · dystraktory: strach, niepewność, bezsilność

**74.** `id 155` · dziewczyna, 15 l.  
*15-latka patrzy na progi punktowe do wymarzonego liceum.*  
„Nie ma szans. Z moimi wynikami to mogę co najwyżej pomarzyć. Wszystko mi się właśnie posypało.”  
→ emocja: **bezsilność** · dystraktory: smutek, rozczarowanie, strach

**75.** `id 156` · chłopak, 17 l.  
*Przy kolacji wypływa temat, co po maturze. 17-latek odsuwa talerz.*  
„Wszyscy oczekują, że nagle będę wiedział, jak płacić rachunki i co robić w życiu. A ja się czuję, jakbym utknął w miejscu.”  
→ emocja: **przytłoczenie** · dystraktory: strach, niepewność, bezsilność

**76.** `id 157` · dziewczyna, 14 l.  
*14-latka zastanawia się nad wyborem profilu klasy.*  
„Jak wybiorę mat-fiz, to nie będę miała czasu na nic innego. Jak wybiorę humanistyczny, to pewnie nie znajdę pracy. To jest bez sensu.”  
→ emocja: **przytłoczenie** · dystraktory: strach, bezsilność, niepewność

**77.** `id 158` · dziewczyna, 15 l.  
*15-latka słucha opowieści rodzica o sukcesach dziecka znajomych.*  
„No jasne, on jest genialny, a ja jestem nikim. Zawsze będę gorsza od innych, nieważne co zrobię.”  
→ emocja: **bezsilność** · dystraktory: smutek, zazdrość, wstyd

**78.** `id 159` · chłopak, 17 l.  
*Rozmowa przy kolacji schodzi na maturę. 17-latek podnosi głos.*  
„Ten egzamin ma zdecydować o całym moim życiu? Przecież to jest chore. Czuję się, jakby ktoś przystawił mi pistolet do głowy.”  
→ emocja: **strach** · dystraktory: przytłoczenie, bezsilność, złość

**79.** `id 160` · dziewczyna, 16 l.  
*16-latka myśli o wyjeździe na studia do innego miasta.*  
„Chciałabym wyjechać, ale boję się, że sobie nie poradzę. Tutaj mam wszystko, a tam będę zupełnie sama.”  
→ emocja: **strach** · dystraktory: niepewność, tęsknota, samotność

**80.** `id 161` · chłopak, 14 l.  
*14-latek dowiaduje się, że nie dostał się na wymarzony kurs.*  
„To była moja jedyna szansa. Teraz już nie mam po co próbować.”  
→ emocja: **bezsilność** · dystraktory: rozczarowanie, smutek, desperacja

<a id="poziom-2"></a>

## Poziom 2: kusi, żeby doradzać i naprawiać (45)

W kodzie ten poziom nie ma podsekcji.

**81.** `id 5` · chłopak, 14 l.  
*Rodzic właśnie odłożył słuchawkę po telefonie od wychowawcy o spóźnieniach. 14-latek wchodzi do kuchni.*  
„On się na mnie uwziął. Cokolwiek zrobię, i tak mu nie pasuje.”  
→ emocja: **niesprawiedliwość** · dystraktory: złość, bezsilność, frustracja

**82.** `id 6` · chłopak, 15 l.  
*Przyszła wiadomość od nauczyciela o niewykonanym zadaniu. 15-latek wzrusza ramionami.*  
„Nie będę tego robić. I tak nikt nie widzi, ile ja się męczę.”  
→ emocja: **bezsilność** · dystraktory: smutek, złość, samotność

**83.** `id 7` · chłopak, 15 l.  
*Wieczór. Na grupie klasowej do projektu nikt nie odpisuje, a termin jutro. 15-latek siedzi z telefonem.*  
„Zrobili mnie liderem, a teraz mnie olali. Jak nie wyjdzie, to zgadnij, kto oberwie.”  
→ emocja: **przytłoczenie** · dystraktory: złość, strach, bezsilność

**84.** `id 10` · chłopak, 14 l.  
*Rodzic zatrzymuje auto pod szkołą i wysiada razem z 14-latkiem.*  
„Zostań w aucie. Nie odprowadzaj mnie.”  
→ emocja: **wstyd** · dystraktory: bunt, strach, niepewność

**85.** `id 11` · chłopak, 15 l.  
*W sklepie rodzic i 15-latek spotykają jego klasę. Rodzic zaczyna rozmowę z kolegami.*  
„Nie mów tak przy moich znajomych.”  
→ emocja: **wstyd** · dystraktory: złość, upokorzenie, bunt

**86.** `id 14` · chłopak, 16 l.  
*16-latek chce wyjść w czymś nietypowym. Rodzic komentuje.*  
„To jest mój styl. Nie każ mi wyglądać jak ty.”  
→ emocja: **bunt** · dystraktory: złość, wstyd, frustracja

**87.** `id 27` · dziewczyna, 15 l.  
*15-latka wraca ze szkoły z plamą na bluzie. Widać, że ktoś jej coś zrobił.*  
„Nie pytaj, bo i tak nic z tym nie zrobisz. Sama sobie poradzę.”  
→ emocja: **bezsilność** · dystraktory: wstyd, samotność, złość

**88.** `id 29` · chłopak, 15 l.  
*Rodzic prosi 15-latka, żeby zjadł z rodziną. Bierze talerz i idzie do pokoju.*  
„Chcę zjeść sam. Po prostu nie mam dziś siły na rozmowy.”  
→ emocja: **przytłoczenie** · dystraktory: samotność, smutek, bezsilność

**89.** `id 42` · chłopak, 16 l.  
*16-latek wraca z imprezy później, niż obiecał. Unika wzroku.*  
„Nie patrz na mnie tak. Ja… ja po prostu chciałem być jak inni.”  
→ emocja: **wstyd** · dystraktory: strach, żal, bezsilność

**90.** `id 59` · chłopak, 15 l.  
*Rodzic proponuje wspólny film w piątek. 15-latek kręci głową.*  
„Wolałbym wyjść. Nie jestem już małym dzieckiem.”  
→ emocja: **bunt** · dystraktory: frustracja, samotność, złość

**91.** `id 60` · chłopak, 15 l.  
*Sobota rano. Rodzic budzi 15-latka do sprzątania.*  
„Serio mam sprzątać w sobotę? Ja cały tydzień jadę na oparach.”  
→ emocja: **przytłoczenie** · dystraktory: złość, frustracja, bezsilność

**92.** `id 63` · chłopak, 16 l.  
*Rodzic mówi: musisz się uczyć. 16-latek macha ręką.*  
„Ja się umiem nauczyć, tylko nie chcę ciągle żyć pod presją.”  
→ emocja: **przytłoczenie** · dystraktory: bunt, bezsilność, frustracja

**93.** `id 65` · chłopak, 15 l.  
*Kolacja. Rodzic pyta 15-latka o znajomych. Odpowiada chłodno.*  
„Nie mam ochoty o tym gadać. To i tak nic nie zmieni.”  
→ emocja: **samotność** · dystraktory: smutek, bezsilność, bunt

**94.** `id 70` · chłopak, 16 l.  
*Rozmowa o imprezach. Rodzic mówi, że ma obawy. 16-latek reaguje.*  
„Uważasz, że jak wyjdę, to od razu zrobię coś głupiego.”  
→ emocja: **niesprawiedliwość** · dystraktory: złość, smutek, bunt

**95.** `id 71` · chłopak, 16 l.  
*16-latek pierwszy raz wspomina, że z kimś się spotyka. Rodzic od razu dopytuje o szczegóły.*  
„Nie chcę przesłuchania. Chcę tylko, żebyś była po mojej stronie.”  
→ emocja: **samotność** · dystraktory: smutek, złość, bezsilność

**96.** `id 74` · dziewczyna, 17 l.  
*17-latka siada naprzeciwko. Widać, że zbiera się na odwagę.*  
„Chcę ci powiedzieć, że spotykam się z kimś starszym, ale boję się twojej reakcji.”  
→ emocja: **strach** · dystraktory: niepewność, tęsknota, samotność

**97.** `id 76` · chłopak, 16 l.  
*16-latek chce iść sam do lekarza. Rodzic proponuje, że pójdzie razem.*  
„Nie chcę, żebyś ze mną szła. To krępujące.”  
→ emocja: **wstyd** · dystraktory: bunt, niepewność, strach

**98.** `id 78` · dziewczyna, 14 l.  
*14-latka chce się malować. Rodzic mówi, że za wcześnie.*  
„Ja chcę się malować jak inne dziewczyny. Czuję się przez ciebie głupio i dziecinnie.”  
→ emocja: **bunt** · dystraktory: wstyd, złość, bezsilność

**99.** `id 87` · chłopak, 17 l.  
*Do matury zostały dwa tygodnie. Rodzic pyta: uczysz się? 17-latek odpowiada.*  
„Ale wynik matury nie będzie mnie definiował.”  
→ emocja: **bunt** · dystraktory: niepewność, strach, bezsilność

**100.** `id 88` · dziewczyna, 17 l.  
*Rano przed próbną maturą 17-latka siedzi nad nietkniętym śniadaniem.*  
„Boli mnie głowa i ściska w żołądku.”  
→ emocja: **strach** · dystraktory: przytłoczenie, bezsilność, smutek

**101.** `id 91` · chłopak, 17 l.  
*Rodzina planuje 18 urodziny 17-latka. Ktoś już rezerwuje salę.*  
„Nie wiem, czy chcę imprezę. Wolałbym w domu, bez wielkiej akcji.”  
→ emocja: **niepewność** · dystraktory: strach, samotność, bunt

**102.** `id 162` · chłopak, 15 l.  
*15-latek słucha rodzica, który dopytuje o poprawę ocen zaraz po wejściu do domu.*  
„Daj spokój, ledwo wszedłem do domu. Cały dzień tylko testy i pytania, a ty od progu znowu to samo!”  
→ emocja: **przytłoczenie** · dystraktory: złość, frustracja, bezsilność

**103.** `id 163` · dziewczyna, 14 l.  
*14-latka rysuje w pokoju. Rodzic woła ją na obiad.*  
„Właśnie teraz miałam najlepszy pomysł na cieniowanie! Zanim wrócę, to wszystko mi ucieknie z głowy!”  
→ emocja: **frustracja** · dystraktory: złość, bezsilność, smutek

**104.** `id 164` · chłopak, 16 l.  
*Rodzic zwraca 16-latkowi uwagę na czas spędzany na TikToku.*  
„Tylko tam mogę się wyłączyć i o niczym nie myśleć. Bez tego bym chyba zwariował.”  
→ emocja: **bezsilność** · dystraktory: samotność, przytłoczenie, smutek

**105.** `id 165` · chłopak, 15 l.  
*15-latek wraca po siedmiu lekcjach i dodatkowym angielskim.*  
„Nie ruszę palcem. Nawet nie proś mnie o rozładowanie zmywarki, bo po prostu padnę na podłogę.”  
→ emocja: **przytłoczenie** · dystraktory: bezsilność, złość, frustracja

**106.** `id 166` · chłopak, 16 l.  
*Rodzic trzeci dzień z rzędu przypomina 16-latkowi o sprzątaniu pokoju.*  
„Po co mam to sprzątać, skoro jutro i tak będzie tak samo? Bez sensu. Daj mi spokój.”  
→ emocja: **bezsilność** · dystraktory: frustracja, przytłoczenie, smutek

**107.** `id 167` · dziewczyna, 14 l.  
*Rodzic podaje 14-latce sobotnią listę zakupów.*  
„Znowu długa lista. Będę tam stać w kolejkach godzinę. Mój jedyny wolny czas w tygodniu właśnie przepadł.”  
→ emocja: **frustracja** · dystraktory: złość, bezsilność, smutek

**108.** `id 168` · dziewczyna, 15 l.  
*Wypada kolej 15-latki na zrobienie obiadu.*  
„Nie cierpię gotować. Wszystko mi się przypala i kuchnia wygląda jak po wojnie. Dlaczego nie możemy po prostu zamówić pizzy?”  
→ emocja: **frustracja** · dystraktory: bezsilność, złość, przytłoczenie

**109.** `id 169` · chłopak, 16 l.  
*16-latek przy kolacji ostrożnie zaczyna temat roku przerwy po maturze.*  
„Chciałbym po prostu odpocząć rok po szkole, ale wy pewnie uznacie, że jestem leniem i nic nie robię.”  
→ emocja: **strach** · dystraktory: niepewność, bunt, samotność

**110.** `id 170` · dziewczyna, 16 l.  
*16-latka wraca ze spotkania ze znajomymi i od progu zaczyna o kieszonkowym.*  
„Inni dostają dwa razy tyle i mogą sobie na coś odłożyć. Ja ledwo mam na bilet i herbatę. Czuję się jak biedak przy moich znajomych.”  
→ emocja: **wstyd** · dystraktory: bezsilność, niesprawiedliwość, zazdrość

**111.** `id 171` · dziewczyna, 17 l.  
*Piątkowy wieczór. Rodzic proponuje 17-latce wspólny serial.*  
„Mam siedzieć z tobą na kanapie, zamiast wyjść do znajomych? Przecież to jest nudne!”  
→ emocja: **bunt** · dystraktory: frustracja, złość, samotność

**112.** `id 223` · dziewczyna, 16 l.  
*16-latka od dwóch dni nie odzywa się do najlepszej przyjaciółki. Siedzi z telefonem w ręce.*  
„Nie napiszę pierwsza. Tym razem to ona przegięła.”  
→ emocja: **złość** · dystraktory: żal, bunt, smutek

**113.** `id 224` · chłopak, 18 l.  
*18-latek wraca z egzaminu na prawo jazdy i rzuca kurtkę na krzesło.*  
„Oblałem. Na rondzie. Wszyscy zdają za pierwszym razem, tylko nie ja.”  
→ emocja: **wstyd** · dystraktory: rozczarowanie, złość, bezsilność

**114.** `id 225` · dziewczyna, 17 l.  
*17-latka cały dzień odświeża pocztę. Wieczorem przychodzi odpowiedź z kawiarni w sprawie pracy wakacyjnej.*  
„'Wybraliśmy innego kandydata'. Nawet na zmywak mnie nie chcą.”  
→ emocja: **rozczarowanie** · dystraktory: wstyd, bezsilność, smutek

**115.** `id 226` · dziewczyna, 15 l.  
*15-latka miała iść z przyjaciółką do kina. Godzinę przed seansem dostaje wiadomość, że tamta idzie z kimś innym.*  
„Bilety już kupiłam. Serio, godzinę przed seansem mi to pisze.”  
→ emocja: **żal** · dystraktory: złość, odrzucenie, rozczarowanie

**116.** `id 227` · chłopak, 16 l.  
*16-latek od tygodnia odkłada rozmowę z nauczycielem o poprawie oceny. Jutro mija termin.*  
„Wiem, że wystarczy podejść i zapytać. Ale jak to sobie wyobrażę, to mi się nogi uginają.”  
→ emocja: **strach** · dystraktory: niepewność, wstyd, przytłoczenie

**117.** `id 228` · dziewczyna, 14 l.  
*14-latka wraca z próby zespołu tanecznego. Solówkę, o którą walczyła, dostała inna dziewczyna.*  
„Ćwiczyłam to przejście codziennie w pokoju. I tak wybrała Maję, bo Maja jest jej ulubienicą.”  
→ emocja: **niesprawiedliwość** · dystraktory: zazdrość, rozczarowanie, żal

**118.** `id 229` · dziewczyna, 17 l.  
*17-latka wraca z kolejnych korepetycji z matematyki.*  
„Płacicie za te korki, a ja dalej nic nie umiem. Może po prostu jestem za głupia na rozszerzenie.”  
→ emocja: **bezsilność** · dystraktory: wstyd, przytłoczenie, rozczarowanie

**119.** `id 230` · chłopak, 16 l.  
*16-latek wraca ze spotkania z dziewczyną i w kurtce siada przy kuchennym stole.*  
„Zerwała ze mną. Powiedziała, że to nie przez nikogo, po prostu już nie chce.”  
→ emocja: **smutek** · dystraktory: żal, odrzucenie, bezsilność

**120.** `id 231` · dziewczyna, 13 l.  
*13-latka po czterech latach gry na skrzypcach odstawia futerał pod ścianę.*  
„Nie chcę już chodzić na skrzypce. I wiem, że zaraz powiesz, że szkoda tylu lat.”  
→ emocja: **bunt** · dystraktory: niepewność, strach, przytłoczenie

**121.** `id 232` · chłopak, 14 l.  
*14-latek wydał całe urodzinowe pieniądze na skina do gry. Kolega właśnie mu napisał, że przepłacił dwa razy.*  
„Wydałem wszystko w pięć minut. Teraz patrzę na to i sam nie wiem, po co mi to było.”  
→ emocja: **żal** · dystraktory: wstyd, rozczarowanie, frustracja

**122.** `id 233` · dziewczyna, 13 l.  
*Za trzy dni 13-latka pierwszy raz jedzie na obóz, na którym nikogo nie zna. Przy pakowaniu robi się cicha.*  
„A co, jeśli nikogo tam nie polubię i cały obóz przesiedzę sama?”  
→ emocja: **strach** · dystraktory: niepewność, samotność, przytłoczenie

**123.** `id 234` · chłopak, 15 l.  
*Miesiąc po zmianie szkoły 15-latek wciąż wraca do domu od razu po lekcjach.*  
„Oni wszyscy mają swoje paczki z podstawówki. Ja na przerwach patrzę w telefon, żeby nie wyglądać jak ten dziwny.”  
→ emocja: **samotność** · dystraktory: wstyd, smutek, odrzucenie

**124.** `id 235` · dziewczyna, 17 l.  
*17-latka wraca ze szkoły, gdzie pół klasy gadało o studniówce.*  
„Wszyscy już mają pary. Jak nikogo nie znajdę, to chyba w ogóle nie idę.”  
→ emocja: **wstyd** · dystraktory: strach, samotność, niepewność

**125.** `id 236` · chłopak, 15 l.  
*15-latek dzień po terminie zorientował się, że zapomniał o urodzinach najlepszego kolegi.*  
„On o moich pamiętał, a ja mu nawet nie napisałem. Jak ja mu teraz spojrzę w oczy?”  
→ emocja: **wstyd** · dystraktory: żal, strach, smutek

<a id="poziom-3"></a>

## Poziom 3: nastolatek zły NA rodzica (75)

### Stare scenki (przepisane) (30)

**126.** `id 12` · dziewczyna, 15 l.  
*Rodzic siedzi z gośćmi w salonie i właśnie zażartował o 15-latce.*  
„Weź przestań!”  
→ emocja: **upokorzenie** · dystraktory: złość, wstyd, bezsilność

**127.** `id 13` · chłopak, 14 l.  
*14-latek stoi na przystanku. Rodzic woła za nim zbyt głośno.*  
„Nie rób siary!”  
→ emocja: **wstyd** · dystraktory: złość, upokorzenie, bunt

**128.** `id 18` · chłopak, 17 l.  
*Kolejna dyskusja o godzinie powrotu. 17-latek rzuca plecak i siada na łóżku.*  
„Mam 17 lat i chcę wracać później. Czemu ty tego nie widzisz?”  
→ emocja: **bunt** · dystraktory: złość, niesprawiedliwość, bezsilność

**129.** `id 21` · chłopak, 16 l.  
*Rodzic wraca z wywiadówki i chce pogadać o ocenach. 16-latek odsuwa talerz.*  
„Nie chcę o tym teraz gadać. I nie rób ze mnie projektu do naprawy.”  
→ emocja: **bunt** · dystraktory: złość, upokorzenie, bezsilność

**130.** `id 31` · chłopak, 13 l.  
*Rodzic i 13-latek właśnie pokłócili się o drobiazg. Odwraca się do ściany.*  
„Nie lubię cię.”  
→ emocja: **złość** · dystraktory: smutek, bezsilność, samotność

**131.** `id 32` · chłopak, 15 l.  
*Chwila ciszy po kłótni. 15-latek mówi już ciszej, ale twardo.*  
„Widzisz mnie tylko wtedy, kiedy coś robię źle.”  
→ emocja: **smutek** · dystraktory: bezsilność, samotność, żal

**132.** `id 33` · chłopak, 14 l.  
*Rodzic otwiera drzwi do pokoju 14-latka bez pukania.*  
„Nie wchodź tutaj bez pytania. To jest moja przestrzeń.”  
→ emocja: **złość** · dystraktory: bunt, strach, bezsilność

**133.** `id 34` · dziewczyna, 16 l.  
*Rodzic pyta 16-latkę, czemu ostatnio się oddala.*  
„Bo jak pytasz o wszystko, to mam ochotę tylko uciec. Serio.”  
→ emocja: **przytłoczenie** · dystraktory: bunt, złość, strach

**134.** `id 35` · chłopak, 15 l.  
*15-latek odrabia lekcje. Rodzic zaczyna doradzać.*  
„Przestań mi stać nad głową. Jak mnie ciśniesz, to mam jeszcze większy mętlik.”  
→ emocja: **przytłoczenie** · dystraktory: złość, bunt, bezsilność

**135.** `id 36` · chłopak, 16 l.  
*Rodzic mówi: porozmawiajmy. 16-latek włącza głośniej muzykę.*  
„Nie teraz. Jak będę gotowy, to sam powiem.”  
→ emocja: **bunt** · dystraktory: przytłoczenie, złość, bezsilność

**136.** `id 37` · chłopak, 15 l.  
*Rodzic wiesza w kuchni kartkę z nowymi zasadami. 15-latek czyta i prycha.*  
„Zasady, zasady… A kto pyta, czego ja potrzebuję?”  
→ emocja: **niesprawiedliwość** · dystraktory: złość, bunt, samotność

**137.** `id 38` · chłopak, 15 l.  
*Rodzic przypomina o obowiązkach. 15-latek stoi w progu z telefonem.*  
„Ja nie jestem robotem. Potrzebuję czasem po prostu nic nie robić.”  
→ emocja: **przytłoczenie** · dystraktory: bunt, bezsilność, złość

**138.** `id 50` · chłopak, 16 l.  
*16-latek właśnie znalazł w telefonie rodzica screena ze swojej rozmowy.*  
„Nie miałaś prawa. Czuję się jak w klatce.”  
→ emocja: **złość** · dystraktory: żal, strach, bezsilność

**139.** `id 51` · chłopak, 15 l.  
*Rodzic wrzucił w sieci zdjęcie 15-latka z dzieciństwa. Wpada w panikę.*  
„Usuń to zdjęcie. Ja nie chcę, żeby to było w internecie.”  
→ emocja: **złość** · dystraktory: strach, upokorzenie, bezsilność

**140.** `id 52` · chłopak, 16 l.  
*Właśnie skończyła się ostra kłótnia między rodzicem a 16-latkiem. Drzwi trzaskają.*  
„Nienawidzę cię.”  
→ emocja: **złość** · dystraktory: smutek, bezsilność, desperacja

**141.** `id 53` · chłopak, 16 l.  
*Godzinę po kłótni 16-latek wraca spokojniejszy, ale głos mu się łamie.*  
„Mogłabyś chociaż raz posłuchać, zamiast tylko rządzić?”  
→ emocja: **bezsilność** · dystraktory: smutek, żal, samotność

**142.** `id 54` · chłopak, 14 l.  
*Rodzic prosi 14-latka o wyniesienie śmieci. Eksploduje.*  
„Zaraz! Czemu zawsze ja? Mam was wszystkich dosyć.”  
→ emocja: **złość** · dystraktory: przytłoczenie, niesprawiedliwość, bezsilność

**143.** `id 55` · chłopak, 15 l.  
*Rodzic komentuje bałagan w pokoju 15-latka. Ten mówi ostro.*  
„To mój pokój. Jak ci się nie podoba, to nie wchodź.”  
→ emocja: **bunt** · dystraktory: złość, niesprawiedliwość, frustracja

**144.** `id 57` · chłopak, 16 l.  
*16-latek właśnie odkrył na swoim telefonie aplikację do śledzenia lokalizacji.*  
„Śledzisz mnie? Serio? Po co ci to?”  
→ emocja: **złość** · dystraktory: żal, strach, bunt

**145.** `id 61` · dziewczyna, 16 l.  
*Rodzic prosi 16-latkę o pomoc w kuchni. Nawet nie podnosi wzroku.*  
„Nie. Jestem zmęczona. I nie udawaj, że tego nie słyszysz.”  
→ emocja: **przytłoczenie** · dystraktory: złość, bunt, bezsilność

**146.** `id 62` · chłopak, 15 l.  
*Kolejna rozmowa o pomaganiu w domu. 15-latek wchodzi w obronę.*  
„Przestań gadać, że nic nie robię. Ja też mam swoje rzeczy i swoją głowę.”  
→ emocja: **niesprawiedliwość** · dystraktory: złość, bunt, bezsilność

**147.** `id 67` · chłopak, 15 l.  
*Rodzic próbuje postawić granicę. 15-latek krzyczy.*  
„Zostaw mnie! Jak wejdziesz jeszcze raz, to zamknę drzwi na klucz.”  
→ emocja: **złość** · dystraktory: strach, bunt, bezsilność

**148.** `id 68` · dziewczyna, 16 l.  
*Po spięciu o komputer 16-latka rzuca ostro.*  
„Jak tak dalej będziesz robić, to przestanę z tobą rozmawiać. I będziesz sama.”  
→ emocja: **złość** · dystraktory: smutek, bezsilność, samotność

**149.** `id 69` · chłopak, 15 l.  
*15-latek krzyczy z pokoju podczas grania. Rodzic prosi o ciszę.*  
„Przestań wchodzić co pięć minut! Ja jestem w trakcie.”  
→ emocja: **złość** · dystraktory: frustracja, bunt, przytłoczenie

**150.** `id 73` · dziewczyna, 16 l.  
*Rodzic komentuje, że widział 16-latkę całującą się pod domem. Spina się.*  
„To nie twoja sprawa. Co ty, policja jesteś? Przestań mnie śledzić.”  
→ emocja: **złość** · dystraktory: bunt, wstyd, strach

**151.** `id 77` · dziewczyna, 13 l.  
*13-latka ma pretensje, że rodzic powiedział o jej okresie tacie i ciociom.*  
„Czemu powiedziałaś tacie i ciociom? To było moje i prywatne.”  
→ emocja: **żal** · dystraktory: złość, upokorzenie, wstyd

**152.** `id 90` · chłopak, 18 l.  
*Rozmowa o wyprowadzce. 18-latek broni swojej autonomii.*  
„Przecież mam 18 lat. Czemu moje życie ma być dalej waszą sprawą?”  
→ emocja: **bunt** · dystraktory: złość, frustracja, bezsilność

**153.** `id 93` · chłopak, 15 l.  
*Wczoraj rodzic obiecał, że nie będzie krzyczeć. Wieczór, kuchnia. 15-latek mówi.*  
„Ja już ci nie wierzę. Za każdym razem jest tak samo.”  
→ emocja: **żal** · dystraktory: bezsilność, smutek, samotność

**154.** `id 95` · dziewczyna, 15 l.  
*Rodzic próbuje pocieszyć 15-latkę po kłótni z przyjaciółką. Ona odwraca się gwałtownie.*  
„Nie mów mi, że przesadzam. Ja naprawdę cierpię.”  
→ emocja: **smutek** · dystraktory: bezsilność, złość, samotność

**155.** `id 46` · dziewczyna, 15 l.  
*Rodzic przy wszystkich zażartował z marzenia 15-latki. Ona czerwienieje.*  
„To moje marzenie! Jak się z niego śmiejesz, to jakbyś śmiał się ze mnie.”  
→ emocja: **upokorzenie** · dystraktory: smutek, złość, bezsilność

### Nowe scenki poziom 3 (45)

**156.** `id 172` · chłopak, 16 l.  
*16-latek odkrywa, że rodzic bez pytania oddał jego stare, ale wciąż używane gry komputerowe kuzynowi.*  
„To były moje rzeczy! Dlaczego zawsze decydujesz za mnie i bez pytania grzebiesz w moich szafkach?!”  
→ emocja: **złość** · dystraktory: niesprawiedliwość, żal, bunt

**157.** `id 173` · chłopak, 14 l.  
*14-latek prosi o zgodę na powrót z imprezy o północy, a rodzic nie ustępuje: powrót najpóźniej o 22.*  
„Wszyscy mogą zostać do końca, tylko ja muszę uciekać jak jakiś maluch. Robisz mi obciach przed całą klasą, nigdy mi nie ufasz!”  
→ emocja: **niesprawiedliwość** · dystraktory: złość, wstyd, bunt

**158.** `id 174` · dziewczyna, 16 l.  
*16-latka słyszy, jak rodzic wychwala młodsze rodzeństwo za drobną pomoc w domu, ignorując jej wcześniejsze porządki.*  
„Jasne, on jest waszym złotym dzieckiem. Ja mogę posprzątać cały dom i nikt nawet nie zauważy, bo dla was liczy się tylko on!”  
→ emocja: **niesprawiedliwość** · dystraktory: żal, złość, samotność

**159.** `id 175` · chłopak, 13 l.  
*13-latek dowiaduje się, że z powodu pilnego wyjazdu rodzinnego nie będzie mógł wziąć udziału w turnieju online z kolegami.*  
„Nie no, świetnie! Teraz pomyślą, że stchórzyłem i wywalą mnie z klanu. Zawsze musicie mi wszystko psuć w ostatniej chwili!”  
→ emocja: **złość** · dystraktory: bezsilność, strach, żal

**160.** `id 176` · dziewczyna, 13 l.  
*13-latka przyłapuje rodzica na tym, że próbował podejrzeć powiadomienia na jej telefonie, gdy zostawiła go na chwilę w kuchni.*  
„No nie wierzę! Serio musisz mnie tak śledzić?”  
→ emocja: **złość** · dystraktory: żal, strach, bunt

**161.** `id 177` · chłopak, 16 l.  
*16-latek przegrywa ważny mecz w grze rankingowej, bo w połowie rundy rodzic kazał mu natychmiast wynieść śmieci.*  
„No i po randze! Przez ciebie przegraliśmy, bo musiałaś mi teraz truć o tych głupich śmieciach. Zero wyczucia, po prostu niszczysz mi wszystko, co dla mnie ważne!”  
→ emocja: **złość** · dystraktory: bezsilność, żal, frustracja

**162.** `id 178` · dziewczyna, 17 l.  
*17-latka słyszy przy obiedzie kolejne pytanie o to, czy na pewno złoży papiery na medycynę, bo 'artysta to nie zawód'.*  
„Rzygać mi się chce tym waszym prestiżem. Nikogo nie obchodzi, co ja czuję, tylko co powiecie znajomym. Mam dość tej wiecznej presji, dajcie mi w końcu żyć!”  
→ emocja: **złość** · dystraktory: bunt, bezsilność, smutek

**163.** `id 179` · chłopak, 13 l.  
*13-latek wraca ze szkoły i odkrywa, że rodzic poukładał mu notatki i papiery na biurku, szukając ważnego dokumentu.*  
„Znowu tu byłaś?! Wszystko tu leżało tak jak trzeba! Czy ty naprawdę musisz wszędzie łazić? To jest mój pokój!”  
→ emocja: **złość** · dystraktory: niesprawiedliwość, bunt, bezsilność

**164.** `id 181` · dziewczyna, 16 l.  
*Rodzic zerka 16-latce przez ramię i pyta, z kim tak pisze.*  
„To jest moja prywatna sprawa. Czy ja ci zaglądam w telefon? Daj mi w końcu trochę oddechu!”  
→ emocja: **złość** · dystraktory: bunt, strach, bezsilność

**165.** `id 183` · dziewczyna, 17 l.  
*17-latka dowiaduje się, że rodzice rozmawiali o jej ocenach z ciocią.*  
„Po co rozpowiadacie o moich sprawach całej rodzinie? To jest moje życie, a nie temat do plotek przy kawie!”  
→ emocja: **złość** · dystraktory: żal, upokorzenie, bunt

**166.** `id 184` · chłopak, 14 l.  
*14-latek po zainstalowaniu przez rodziców aplikacji do kontroli czasu przed ekranem.*  
„Blokujecie mi telefon o 21? Przecież to jest jedyny czas, kiedy mogę pogadać z ludźmi. Traktujecie mnie jak małe dziecko.”  
→ emocja: **złość** · dystraktory: bunt, bezsilność, samotność

**167.** `id 185` · dziewczyna, 16 l.  
*16-latka odkrywa, że mama zaczęła ją obserwować na Instagramie i lajkuje jej zdjęcia.*  
„Proszę, nie rób mi tego. To jest moja przestrzeń, nie chcę tam mieć rodziców pod każdym postem.”  
→ emocja: **strach** · dystraktory: wstyd, bunt, złość

**168.** `id 186` · chłopak, 15 l.  
*Wieczór. 15-latek wypada z pokoju z notesem w ręce.*  
„Znalazłem to pod łóżkiem, leżało inaczej. Czytałaś to, prawda? Jak mogłaś mi to zrobić?!”  
→ emocja: **żal** · dystraktory: złość, upokorzenie, bezsilność

**169.** `id 187` · dziewczyna, 13 l.  
*Pora spać. Rodzic czeka, aż 13-latka odłoży telefon w salonie.*  
„Nikt tak nie robi! Wszyscy mają telefony przy sobie, a wy traktujecie mnie, jakbym miała pięć lat.”  
→ emocja: **niesprawiedliwość** · dystraktory: złość, bunt, wstyd

**170.** `id 188` · chłopak, 17 l.  
*Przed wyjściem na cały weekend 17-latek słyszy prośbę o dokładny plan, godzina po godzinie.*  
„Nie wiem dokładnie, co będziemy robić! Po prostu wychodzę. Przecież nie ucieknę z kraju.”  
→ emocja: **bunt** · dystraktory: złość, frustracja, przytłoczenie

**171.** `id 189` · dziewczyna, 16 l.  
*Rodzic wszedł bez pukania, gdy 16-latka się przebierała.*  
„Nie mogę mieć nawet chwili dla siebie w tym domu?”  
→ emocja: **złość** · dystraktory: wstyd, bunt, bezsilność

**172.** `id 190` · dziewczyna, 17 l.  
*17-latka, której rodzice nie chcą puścić na koncert ulubionego zespołu.*  
„Oni przyjeżdżają raz na kilka lat! To jest moja jedyna szansa, żeby ich zobaczyć. Wszystko mi ucieka!”  
→ emocja: **złość** · dystraktory: smutek, bezsilność, tęsknota

**173.** `id 191` · chłopak, 15 l.  
*15-latek próbuje nagrać filmik na YouTube, ale rodzice ciągle wchodzą mu do pokoju.*  
„To jest nie do zrobienia. Nigdy nie uda mi się nagrać nic sensownego, jak ciągle ktoś tu łazi i coś chce!”  
→ emocja: **frustracja** · dystraktory: złość, bezsilność, bunt

**174.** `id 192` · chłopak, 16 l.  
*16-latek pierwszy raz pokazuje rodzicom swoje nowe hobby. Słyszy śmiech.*  
„Dla was wszystko, co robię, jest dziwne. Nawet nie spróbowaliście zrozumieć, o co w tym chodzi, od razu jest 'głupie'.”  
→ emocja: **smutek** · dystraktory: złość, bezsilność, samotność

**175.** `id 193` · chłopak, 17 l.  
*Rodzic przypomina 17-latkowi o codziennej godzinie ćwiczeń na pianinie.*  
„Mam dosyć tego pianina. Każda godzina przy nim to dla mnie tortura. Dlaczego nie mogę robić tego, co ja chcę?”  
→ emocja: **bezsilność** · dystraktory: złość, bunt, smutek

**176.** `id 194` · chłopak, 14 l.  
*14-latek o swojej kolekcji kart i figurek, którą rodzic nazwał śmieciami.*  
„To nie są śmieci! Zbierałem to latami! Zupełnie tego nie szanujesz.”  
→ emocja: **złość** · dystraktory: żal, smutek, bezsilność

**177.** `id 195` · chłopak, 16 l.  
*16-latek o presji rodziców na konkretny kierunek studiów.*  
„To wasze marzenia, nie moje. Chcecie, żebym był lekarzem, ale ja mdleję na widok krwi. Nikt mnie nie słucha!”  
→ emocja: **złość** · dystraktory: bunt, bezsilność, smutek

**178.** `id 197` · dziewczyna, 14 l.  
*Po kolacji 14-latka sprząta ze stołu. Młodszy brat idzie grać.*  
„On znowu nie musiał sprzątać po kolacji, bo 'jest mały'. Ja w jego wieku już wszystko robiłam sama. To jest totalnie nie fair!”  
→ emocja: **niesprawiedliwość** · dystraktory: złość, żal, bezsilność

**179.** `id 198` · chłopak, 16 l.  
*16-latek proszony o pomoc z zakupami, gdy właśnie planował wyjście.*  
„Dlaczego zawsze przypominasz sobie o zakupach, kiedy ja mam swoje plany? Nigdy nie szanujesz mojego czasu!”  
→ emocja: **złość** · dystraktory: niesprawiedliwość, bunt, frustracja

**180.** `id 199` · dziewczyna, 13 l.  
*13-latka, której rodzice nie pozwalają kupić konkretnego ciucha.*  
„Wszystkie dziewczyny to noszą! Tylko ja mam wyglądać inaczej, bo wam się to nie podoba. Chcecie, żeby wszyscy się ze mnie śmiali?”  
→ emocja: **niesprawiedliwość** · dystraktory: złość, wstyd, strach

**181.** `id 200` · chłopak, 15 l.  
*Rodzic przy 15-latku po raz trzeci w tym tygodniu otwiera Librusa.*  
„Mam 15 lat, a wy pilnujecie mnie jak w podstawówce. Czy wy mi w ogóle w czymkolwiek ufacie?”  
→ emocja: **niesprawiedliwość** · dystraktory: złość, bunt, bezsilność

**182.** `id 201` · dziewczyna, 17 l.  
*17-latka, która nie może pojechać pod namiot ze znajomymi.*  
„Znam ich od lat! Nic mi się nie stanie, ale wy zawsze widzicie najgorsze scenariusze. Mam dość tego pilnowania na każdym kroku.”  
→ emocja: **złość** · dystraktory: bunt, niesprawiedliwość, bezsilność

**183.** `id 202` · chłopak, 14 l.  
*Goście jeszcze siedzą w salonie. 14-latek łapie rodzica w kuchni.*  
„Zrobiłeś ze mnie głupka przy wszystkich, jakbym nie miał nic mądrego do gadania.”  
→ emocja: **upokorzenie** · dystraktory: złość, żal, bezsilność

**184.** `id 203` · chłopak, 15 l.  
*Przy obiedzie 15-latek dowiaduje się, że został zapisany na korepetycje z fizyki.*  
„Nie zapytaliście mnie, czy ja w ogóle chcę tam chodzić. Po prostu mnie tam zapisaliście, jakby moje zdanie w ogóle się nie liczyło.”  
→ emocja: **niesprawiedliwość** · dystraktory: złość, bunt, bezsilność

**185.** `id 204` · chłopak, 17 l.  
*17-latek o zakazie prowadzenia samochodu rodziców mimo zdanego prawa jazdy.*  
„Właśnie zrobiłem prawko! Skąd mam nabrać wprawy, jak wy mi nigdy nie dajecie kluczyków? Zawsze jestem 'za młody'.”  
→ emocja: **niesprawiedliwość** · dystraktory: złość, frustracja, bunt

**186.** `id 205` · chłopak, 17 l.  
*Kolega podsyła 17-latkowi screena: pod jego postem komentarz od rodzica.*  
„Po co to zrobiliście? Przecież to jest siara! Teraz moi znajomi będą to wyciągać przez pół roku.”  
→ emocja: **upokorzenie** · dystraktory: złość, wstyd, bunt

**187.** `id 206` · chłopak, 15 l.  
*Za oknem leje. Rodzic woła 15-latka: pies czeka na spacer.*  
„Zawsze ja! Dlaczego to ja muszę iść, kiedy leje, a wy sobie siedzicie przed telewizorem?”  
→ emocja: **niesprawiedliwość** · dystraktory: złość, bunt, frustracja

**188.** `id 207` · chłopak, 16 l.  
*16-latek, któremu rodzic każe wynieść śmieci, choć właśnie usiadł.*  
„Właśnie usiadłem, żeby odpocząć. Czy naprawdę te śmieci nie mogą poczekać do jutra? Musisz mi truć teraz?”  
→ emocja: **złość** · dystraktory: frustracja, bunt, bezsilność

**189.** `id 208` · chłopak, 17 l.  
*17-latek o pomaganiu w ogrodzie w weekend.*  
„Cały weekend mamy kopać te grządki? Przecież ja miałem się spotkać z ekipą. Znowu mi psujecie plany.”  
→ emocja: **złość** · dystraktory: niesprawiedliwość, bunt, frustracja

**190.** `id 209` · chłopak, 16 l.  
*Pod szkołą, na oczach kolegów, rodzic przytula 16-latka na pożegnanie.*  
„Przestań! Robisz mi totalny obciach. Nie jestem już małym dzieckiem!”  
→ emocja: **wstyd** · dystraktory: złość, upokorzenie, bunt

**191.** `id 210` · dziewczyna, 15 l.  
*Rodzic ubiera się, żeby iść z 15-latką na zakupy po ubrania.*  
„Sama sobie wybiorę ubrania. Twój gust to lata dziewięćdziesiąte, nie chcę wyglądać jak ty.”  
→ emocja: **bunt** · dystraktory: złość, wstyd, frustracja

**192.** `id 211` · chłopak, 14 l.  
*14-latek ledwo zdjął buty, a już słyszy pytanie, jak było w szkole.*  
„Normalnie. Jak zawsze. Możesz przestać mnie codziennie przesłuchiwać?”  
→ emocja: **frustracja** · dystraktory: złość, bunt, przytłoczenie

**193.** `id 212` · dziewczyna, 17 l.  
*Rodzice proponują 17-latce, żeby wreszcie przyprowadziła nowego chłopaka.*  
„Nie przyprowadzę go tutaj, żebyście go oceniali od progu. To moja sprawa, z kim się spotykam.”  
→ emocja: **strach** · dystraktory: bunt, złość, wstyd

**194.** `id 213` · chłopak, 16 l.  
*16-latek opowiada o problemie w szkole. Rodzic od razu wchodzi z gotowym planem.*  
„Wiem, co mam robić! Nie musisz mi powtarzać wszystkiego po dziesięć razy, jakbym był głupi.”  
→ emocja: **złość** · dystraktory: frustracja, bunt, upokorzenie

**195.** `id 214` · dziewczyna, 15 l.  
*Z pokoju 15-latki głośno gra muzyka. Rodzic krzywi się od progu.*  
„Słucham tego, co chcę słuchać. Jak wam się nie podoba, to wyjdźcie z mojego pokoju, ale nie mówcie, że to 'hałas'.”  
→ emocja: **złość** · dystraktory: bunt, smutek, niesprawiedliwość

**196.** `id 215` · chłopak, 14 l.  
*Rodzice żartują przy kolacji z tego, że 14-latek przeżywa rozstanie z pierwszą dziewczyną.*  
„Dla was to jest zabawne, ale dla mnie to jest teraz najważniejsze. Nic nie rozumiecie!”  
→ emocja: **smutek** · dystraktory: złość, samotność, żal

**197.** `id 216` · chłopak, 16 l.  
*Przy gościach rodzic woła 16-latka zdrobniałym imieniem z dzieciństwa.*  
„Nie mów tak do mnie! Nienawidzę tego imienia, czuję się wtedy jak jakiś niemowlak.”  
→ emocja: **wstyd** · dystraktory: złość, bunt, smutek

**198.** `id 217` · dziewczyna, 15 l.  
*Rodzic rzuca młodzieżowymi słówkami przy koleżankach 15-latki.*  
„To było takie cringe'owe. Proszę, po prostu zachowuj się normalnie, a nie udawaj nastolatka.”  
→ emocja: **wstyd** · dystraktory: złość, upokorzenie, frustracja

**199.** `id 218` · chłopak, 15 l.  
*15-latek, który bardzo liczył na wyjazd na obóz sportowy, dowiaduje się, że z powodu awarii samochodu rodzice muszą przesunąć wydatki.*  
„Obiecaliście mi to pół roku temu! Wszyscy moi kumple już mają opłacone miejsca, a ja teraz mam im powiedzieć, że co? Że znowu coś się zepsuło? Zawsze mi wszystko psujecie w ostatniej chwili!”  
→ emocja: **złość** · dystraktory: żal, niesprawiedliwość, bezsilność

**200.** `id 237` · chłopak, 14 l.  
*14-latek strzelił pierwszą bramkę w sezonie. Rodzic obiecał przyjść na mecz i nie dotarł.*  
„Obiecałeś, że będziesz. Wszyscy mieli kogoś na trybunach, tylko ja nie.”  
→ emocja: **żal** · dystraktory: smutek, złość, samotność

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

Stan po przeglądzie naturalności (szczegóły: przeglad-scenek.md) i uzupełnieniu bazy do 200 scenek.

1. **Liczba scenek: 200.** Scalono duplikaty (110+111, 112+113), usunięto 56, 83 i bliźniaki 115, 127, 153, 182, dopisano nowe id 219-237. Numery `id` sięgają 237, 37 numerów jest pominiętych; duplikatów `id` nie ma.
2. **Poziomy:** poziom 1: 80, poziom 2: 45, poziom 3: 75. Scenki 46 i 95 (emocja skierowana na rodzica) przeniesione na poziom 3.
3. **Podobne scenki zostawione celowo** (ten sam temat, inne ujęcie):
   - `54` (poz. 3) i `207` (poz. 3): rodzic każe chłopakowi wynieść śmieci (wybuch vs zmęczenie)
   - `26` (poz. 1) i `141` (poz. 1): hejt w sieci na dziewczynę (strach przed wrzuceniem vs upokorzenie po fali)
   - `145` (poz. 1) i `147` (poz. 1): dziewczyna uczy się w nocy i nie daje rady (sesja egzaminów vs spiętrzenie jednego dnia)
   - `31` (poz. 3) i `52` (poz. 3): chłopak po kłótni: „Nie lubię cię” (13 lat) / „Nienawidzę cię” (16 lat)
   - `175` (poz. 3) i `218` (poz. 3): plany chłopaka przepadają przez sprawy rodzinne
   - `174` (poz. 3) i `197` (poz. 3): dziewczyna, młodszy brat i niesprawiedliwy podział obowiązków
   - `178` (poz. 3) i `195` (poz. 3): rodzice pchają na wymarzony przez siebie kierunek
   - `69` (poz. 3) i `191` (poz. 3): rodzice wchodzą do pokoju, gdy chłopak jest w trakcie
   - `14` (poz. 2) i `210` (poz. 3): własny styl ubierania
   - `11` (poz. 2) i `217` (poz. 3): rodzic przy znajomych nastolatka
   - `59` (poz. 2) i `171` (poz. 2): wspólny wieczór z rodzicem vs wyjście (spokojnie vs z ostrzem)
4. **Rodzaj rodzica.** W 10 scenkach rodzicem jest matka (50, 53, 68, 71, 76, 77, 177, 179, 185, 186), w 2 ojciec (202, 237), w pozostałych rodzaj rodzica nie wynika z tekstu. Interfejs zwraca się do rodzica w rodzaju męskim („Co poczułeś”, „żebyś nie zgubił serii”); do decyzji przy ewentualnej personalizacji.
5. **Słownik emocji:** w polach `emo` i `dist` występuje 18 różnych słów, z czego 6 nie ma na „Mapie emocji” (panel 🧭 w aplikacji): bunt, desperacja, niesprawiedliwość, przytłoczenie, zazdrość, żal.
6. **Podpowiedź po trzech słabych odpowiedziach** jest teraz stała dla scenki (wcześniej losowała się od nowa przy każdym wpisanym znaku).
7. **Wyzwanie dla znajomego** zawsze wysyła ten sam quiz. W kodzie jest gotowy prompt do generowania quizu A/B/C z dowolnej scenki (`SYS_CHALLENGE`), ale nigdzie nie jest używany.
