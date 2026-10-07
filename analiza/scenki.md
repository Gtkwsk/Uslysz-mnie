# Usłysz Mnie: pytania w aplikacji

Eksport z `index.html` (tablica `SCENARIOS_DB`), commit `7bfc952`, 2026-10-07.
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
| 🟢 1 | Podstawy | 80 | 44 | 36 | 13-18 |
| 🟡 2 | Trudniej się powstrzymać | 45 | 25 | 20 | 13-18 |
| 🔴 3 | Kiedy to o Ciebie chodzi | 75 | 43 | 32 | 13-18 |
| **razem** | | **200** | **112** | **88** | 13-18 |

Rozkład wieku: 13 lat (20) · 14 lat (41) · 15 lat (55) · 16 lat (45) · 17 lat (29) · 18 lat (10)

### Emocje docelowe (`emo`)

| Emocja | Poz. 1 | Poz. 2 | Poz. 3 | Razem |
|---|--:|--:|--:|--:|
| żal | 8 | 5 | 9 | 22 |
| wstyd | 7 | 6 | 7 | 20 |
| frustracja | 6 | 4 | 6 | 16 |
| rozczarowanie | 7 | 5 | 4 | 16 |
| złość | 3 |  | 13 | 16 |
| bezsilność | 5 | 4 | 5 | 14 |
| upokorzenie | 4 | 2 | 8 | 14 |
| niesprawiedliwość | 5 | 1 | 7 | 13 |
| przytłoczenie | 7 | 3 | 2 | 12 |
| smutek | 7 | 2 | 3 | 12 |
| niepewność | 6 | 5 |  | 11 |
| strach | 5 | 5 |  | 10 |
| bunt |  |  | 7 | 7 |
| odrzucenie | 4 | 1 | 2 | 7 |
| zazdrość | 5 |  | 1 | 6 |
| samotność | 1 | 2 | 1 | 4 |

<a id="poziom-1"></a>

## Poziom 1: emocja czytelna, łatwa do nazwania (80)

### Szkoła, oceny, nauczyciele, egzaminy (20)

**1.** `id 1` · chłopak, 15 l.  
*15-latek spędził cały weekend nad fizyką. W środę wraca ze szkoły i rzuca sprawdzian na blat w kuchni.*  
„Dwója. Cały weekend nauki w plecy.”  
→ emocja: **rozczarowanie** · dystraktory: frustracja, bezsilność, wstyd

**2.** `id 2` · dziewczyna, 14 l.  
*14-latka wraca ze szkoły ze spuszczoną głową i od progu idzie do swojego pokoju. Po chwili wychodzi po herbatę.*  
„Matematyczka wzięła mnie do tablicy z czegoś, czego jeszcze nie przerabialiśmy. Stałam tam jak słup, a oni rechotali.”  
→ emocja: **wstyd** · dystraktory: upokorzenie, złość, smutek

**3.** `id 3` · chłopak, 16 l.  
*Wtorek wieczór. 16-latek siedzi przy biurku nad trzema otwartymi podręcznikami i laptopem z nieskończoną prezentacją.*  
„Matma jutro, chemia w czwartek, polski w piątek i jeszcze ten projekt. Nie wiem nawet, od czego zacząć.”  
→ emocja: **przytłoczenie** · dystraktory: bezsilność, strach, frustracja

**4.** `id 4` · dziewczyna, 17 l.  
*17-latka wraca z angielskiego, na którym prezentowała projekt przygotowywany przez dwa tygodnie. Pokazuje tacie ocenę w Librusie.*  
„Trzy, bo za cicho mówiłam. Kolega czytał wszystko z kartki i ma piątkę.”  
→ emocja: **niesprawiedliwość** · dystraktory: złość, żal, rozczarowanie

**5.** `id 5` · chłopak, 14 l.  
*Tydzień przed egzaminem ósmoklasisty. 14-latek o 23 wciąż siedzi nad arkuszem z matematyki, trzeci wieczór z rzędu.*  
„Za tydzień egzamin, a ja dalej nie ogarniam procentów. Co, jak pójdzie mi tak, że nigdzie się nie dostanę?”  
→ emocja: **strach** · dystraktory: przytłoczenie, niepewność, bezsilność

**6.** `id 6` · dziewczyna, 13 l.  
*13-latka wraca ze szkoły i zanim zdejmie plecak, pokazuje w telefonie nową uwagę w Librusie.*  
„Za rozmawianie na lekcji. To koleżanka gadała, ja ją tylko uciszałam. A babka nawet nie spojrzała, kto mówi.”  
→ emocja: **niesprawiedliwość** · dystraktory: złość, żal, upokorzenie

**7.** `id 7` · chłopak, 17 l.  
*17-latek dostał wyniki szkolnej diagnozy z matematyki, pisanej rok przed maturą. Siedzi na łóżku z telefonem, nie włączył światła.*  
„Trzydzieści procent. Za rok prawdziwa matura. Jak teraz nie umiem, to za rok nagle będę umiał?”  
→ emocja: **strach** · dystraktory: rozczarowanie, przytłoczenie, niepewność

**8.** `id 8` · dziewczyna, 15 l.  
*Pierwszy miesiąc w liceum. 15-latka wraca z pierwszego sprawdzianu z matematyki i rzuca plecak na podłogę.*  
„Trzy. W podstawówce byłam najlepsza z klasy, a tu każdy jest lepszy ode mnie. Nie wiem, co ja tu robię.”  
→ emocja: **niepewność** · dystraktory: rozczarowanie, wstyd, smutek

**9.** `id 9` · chłopak, 16 l.  
*16-latek wraca z wf-u i rzuca worek ze strojem w kąt przedpokoju.*  
„Wuefista nazwał mnie ciężarówką. Przy całej klasie. Do końca dnia wszyscy tak na mnie wołali.”  
→ emocja: **upokorzenie** · dystraktory: wstyd, złość, smutek

**10.** `id 10` · dziewczyna, 14 l.  
*14-latka od miesiąca chodzi na korepetycje z matematyki. Wraca ze sprawdzianu i siada w kuchni w kurtce.*  
„Znowu dwa. Miesiąc korków, uczyłam się, rozumiałam. A na sprawdzianie wszystko wyparowało.”  
→ emocja: **bezsilność** · dystraktory: frustracja, rozczarowanie, smutek

**11.** `id 11` · chłopak, 13 l.  
*13-latek wraca ze szkoły i staje w drzwiach kuchni, nie wchodzi dalej.*  
„Mam uwagę w Librusie. Pierwszą. Zapomniałem zadania i historyczka od razu wpisała, zanim zdążyłem cokolwiek powiedzieć.”  
→ emocja: **wstyd** · dystraktory: strach, smutek, żal

**12.** `id 12` · dziewczyna, 15 l.  
*Koniec roku szkolnego. 15-latka wraca z zakończenia i kładzie świadectwo na stole bez słowa.*  
„4,7, do paska zabrakło pięciu setnych. Jedna ocena wyżej i bym miała.”  
→ emocja: **żal** · dystraktory: rozczarowanie, frustracja, niesprawiedliwość

**13.** `id 13` · chłopak, 15 l.  
*15-latek sprawdza w telefonie wyniki etapu rejonowego konkursu z historii. Odkłada telefon ekranem do dołu.*  
„Dwa punkty. Dwa i byłbym w wojewódzkim. Pół roku czytania i odpadam na jednym pytaniu.”  
→ emocja: **frustracja** · dystraktory: rozczarowanie, żal, złość

**14.** `id 14` · dziewczyna, 16 l.  
*16-latka dostała z powrotem rozprawkę z polskiego. Kładzie ją przed mamą i pokazuje palcem czerwony dopisek.*  
„«Bez własnych przemyśleń». Pisałam to trzy wieczory, wszystko z własnej głowy. Trzy wieczory.”  
→ emocja: **żal** · dystraktory: niesprawiedliwość, złość, rozczarowanie

**15.** `id 15` · chłopak, 14 l.  
*14-latek miał rozpisany plan nauki na cały tydzień. Wraca ze szkoły i wyrzuca kartkę z planem do kosza.*  
„Matematyczka zapowiedziała na jutro kartkówkę z całego działu. Na jutro! A ja miałem to rozpisane na czwartek.”  
→ emocja: **frustracja** · dystraktory: złość, bezsilność, przytłoczenie

**16.** `id 16` · dziewczyna, 18 l.  
*Miesiąc przed maturą. 18-latka siedzi na podłodze w pokoju wśród rozłożonych notatek z czterech lat.*  
„Powtarzam wszystko od pierwszej klasy i nic mi nie zostaje w głowie. Im więcej czytam, tym mniej umiem.”  
→ emocja: **przytłoczenie** · dystraktory: strach, bezsilność, niepewność

**17.** `id 17` · chłopak, 16 l.  
*16-latek wraca z chemii i trzaska drzwiami od pokoju. Po chwili wychodzi do kuchni.*  
„Cała klasa ma jedynki. Cała. A chemik na to, że sami sobie winni, bo trzeba było słuchać.”  
→ emocja: **złość** · dystraktory: niesprawiedliwość, bezsilność, frustracja

**18.** `id 18` · chłopak, 15 l.  
*15-latek wraca ze szkoły i jeszcze w kurtce podchodzi do mamy.*  
„Wychowawczyni kazała ci przekazać, że masz jutro przyjść na rozmowę. Nie powiedziała po co. Pytałem dwa razy.”  
→ emocja: **niepewność** · dystraktory: strach, wstyd, złość

**19.** `id 19` · chłopak, 14 l.  
*14-latek wraca ze szkoły w środku lutego. Siada przy stole i długo miesza herbatę.*  
„Polonistka odchodzi. Od marca będzie ktoś nowy. Ona jedna nas lubiła.”  
→ emocja: **smutek** · dystraktory: żal, rozczarowanie, niepewność

**20.** `id 20` · dziewczyna, 15 l.  
*15-latka dwa tygodnie ćwiczyła wiersz na konkurs recytatorski. Wraca z przesłuchania w szkole i rzuca kartkę z tekstem na stół.*  
„Babka wybrała inną. Tamta nauczyła się wczoraj, a ja od dwóch tygodni mówiłam ten wiersz do lustra.”  
→ emocja: **rozczarowanie** · dystraktory: niesprawiedliwość, żal, zazdrość

### Rówieśnicy, przyjaźń, pierwsze związki, odrzucenie (16)

**21.** `id 21` · dziewczyna, 14 l.  
*14-latka siedzi na kanapie z telefonem. Nagle odkłada go na bok i patrzy w okno.*  
„Dziewczyny z klasy mają grupę beze mnie. Nazwali ją «bez Oli». Ktoś przez pomyłkę wysłał mi screena.”  
→ emocja: **odrzucenie** · dystraktory: upokorzenie, żal, wstyd

**22.** `id 22` · chłopak, 15 l.  
*Sobota wieczór. 15-latek przegląda relacje na Instagramie, potem rzuca telefon na łóżko.*  
„Pół klasy jest teraz na urodzinach u kumpla. Zaprosił wszystkich z ekipy oprócz mnie. Nawet nie udawał, że zapomniał.”  
→ emocja: **odrzucenie** · dystraktory: smutek, żal, samotność

**23.** `id 23` · dziewczyna, 16 l.  
*16-latka od godziny leży na łóżku z telefonem na brzuchu. Wchodzi do kuchni z opuchniętymi oczami.*  
„Zerwał. Przez wiadomość. Po trzech miesiącach.”  
→ emocja: **smutek** · dystraktory: odrzucenie, żal, upokorzenie

**24.** `id 24` · chłopak, 14 l.  
*14-latek wraca ze szkoły w pierwszym tygodniu po wakacjach. Zjada obiad w milczeniu i w końcu się odzywa.*  
„Kuba, z którym siedziałem od czwartej klasy, siedzi teraz z tym nowym. Od pierwszego dnia. Byli razem na obozie i mają swoje żarty, których nie łapię.”  
→ emocja: **zazdrość** · dystraktory: odrzucenie, smutek, samotność

**25.** `id 25` · dziewczyna, 15 l.  
*Piątek wieczór. 15-latka siedzi w domu i przegląda relacje dwóch przyjaciółek z podstawówki, każda jest teraz w innej szkole.*  
„Każda ma już swoją nową ekipę. Piszemy coraz rzadziej. A ja w swojej klasie nie mam nikogo, z kim bym chciała pisać.”  
→ emocja: **samotność** · dystraktory: smutek, zazdrość, odrzucenie

**26.** `id 26` · chłopak, 16 l.  
*16-latek od miesiąca pisał wieczorami z dziewczyną poznaną na obozie. Dziś odłożył telefon w połowie rozmowy.*  
„Pisała to samo do mojego kumpla. Te same wiadomości, słowo w słowo. Myślałem, że to coś.”  
→ emocja: **rozczarowanie** · dystraktory: żal, upokorzenie, złość

**27.** `id 27` · dziewczyna, 13 l.  
*13-latka wraca ze szkoły i zamyka się w pokoju. Po godzinie wychodzi i staje w drzwiach kuchni.*  
„Powiedziałam przyjaciółce jedną rzecz w tajemnicy. Jedną. I dziś wiedziała o tym cała klasa.”  
→ emocja: **żal** · dystraktory: złość, upokorzenie, wstyd

**28.** `id 28` · chłopak, 15 l.  
*15-latek przegląda telefon na kanapie. Pokazuje tacie zdjęcie ze stadionu.*  
„Kumple mówili, że nie ma już biletów. A tu są we trzech na meczu. Nawet się z tym nie kryli.”  
→ emocja: **żal** · dystraktory: odrzucenie, złość, smutek

**29.** `id 29` · chłopak, 15 l.  
*15-latek piąty raz przegląda szafę. Jutro ma pierwsze spotkanie sam na sam z dziewczyną z równoległej klasy.*  
„Nie wiem, o czym będę z nią gadał przez dwie godziny. Co, jak siądziemy i będzie cisza?”  
→ emocja: **niepewność** · dystraktory: strach, wstyd, przytłoczenie

**30.** `id 30` · chłopak, 14 l.  
*14-latek wraca ze szkoły i zamiast jak zwykle włączyć komputer, kładzie się na łóżku w butach.*  
„Powiedziałem jej, że mi się podoba. A ona: «Nie, sorry». I poszła.”  
→ emocja: **odrzucenie** · dystraktory: wstyd, smutek, upokorzenie

**31.** `id 31` · dziewczyna, 16 l.  
*16-latka pisze do przyjaciółki, patrzy na telefon i odkłada go. Trzeci raz tego wieczoru.*  
„Od kiedy ma chłopaka, na wszystko odpisuje «potem». Przyjaźnimy się od zerówki. Teraz jestem opcją na wtedy, kiedy on nie ma czasu.”  
→ emocja: **zazdrość** · dystraktory: samotność, żal, odrzucenie

**32.** `id 32` · chłopak, 13 l.  
*13-latek wraca od kolegi z naprzeciwka wcześniej niż zwykle. Siada na schodach w przedpokoju i nie zdejmuje kurtki.*  
„Przeprowadzają się w lipcu. Do Gdańska. Znamy się od przedszkola.”  
→ emocja: **smutek** · dystraktory: żal, samotność, bezsilność

**33.** `id 33` · dziewczyna, 17 l.  
*Wieczór po siedemnastych urodzinach, na które nie przyszedł jej chłopak. 17-latka sprząta ze stołu nietknięty kawałek tortu.*  
„Nie przyszedł. Napisał o dziesiątej wieczorem, że zapomniał. Zapomniał o moich urodzinach.”  
→ emocja: **żal** · dystraktory: rozczarowanie, złość, smutek

**34.** `id 34` · chłopak, 16 l.  
*16-latek od czwartej po południu czeka na kolegę, z którym ma jutro oddać wspólny projekt. O ósmej wieczorem zamyka laptopa z hukiem.*  
„Miał być o czwartej. Nie odbiera. Projekt jest na nas obu, a ja mam go zrobić sam?”  
→ emocja: **złość** · dystraktory: żal, bezsilność, rozczarowanie

**35.** `id 35` · dziewczyna, 14 l.  
*14-latka wraca ze szkoły i siada przy stole. Nie wyjmuje telefonu.*  
„Słyszałam w łazience, jak dziewczyny z mojej ekipy mówiły, że mnie tolerują. Tolerują. Myślałam, że jesteśmy koleżankami.”  
→ emocja: **upokorzenie** · dystraktory: odrzucenie, żal, wstyd

**36.** `id 36` · chłopak, 15 l.  
*15-latek wraca z treningu i nie odzywa się przez cały obiad. W końcu odkłada widelec.*  
„Wszyscy mówią, że to ja wygadałem rodzicom o sobotniej imprezie. A ja nawet nie wiedziałem, że była.”  
→ emocja: **niesprawiedliwość** · dystraktory: złość, żal, samotność

### Wygląd i ciało (12)

**37.** `id 37` · dziewczyna, 14 l.  
*Wieczór przed zdjęciem klasowym. 14-latka od pół godziny stoi przed lustrem w łazience.*  
„Jutro zdjęcie, a ja mam całe czoło w krostach. Będzie w albumie klasowym na zawsze.”  
→ emocja: **wstyd** · dystraktory: bezsilność, złość, smutek

**38.** `id 38` · chłopak, 15 l.  
*15-latek wraca z pierwszej lekcji wf-u w nowym roku szkolnym. Przy obiedzie nagle się odzywa.*  
„Przez wakacje wszyscy urośli. Wszyscy oprócz mnie. Na zbiórce stoję ostatni w szeregu, nawet dziewczyny są wyższe.”  
→ emocja: **niepewność** · dystraktory: wstyd, smutek, zazdrość

**39.** `id 39` · dziewczyna, 16 l.  
*16-latka wraca z zajęć na basenie i od razu idzie pod prysznic. Wychodzi po bardzo długim czasie.*  
„Słyszałam, co chłopaki mówili o moich udach. Myśleli, że jestem pod wodą. Nie byłam.”  
→ emocja: **upokorzenie** · dystraktory: wstyd, złość, smutek

**40.** `id 40` · chłopak, 16 l.  
*16-latek od dwóch miesięcy codziennie ćwiczy w pokoju. Staje w kuchni w samej koszulce i rozkłada ręce.*  
„Dwa miesiące. Codziennie. I wyglądam dokładnie tak samo jak w czerwcu.”  
→ emocja: **rozczarowanie** · dystraktory: frustracja, bezsilność, wstyd

**41.** `id 41` · dziewczyna, 15 l.  
*Niedzielny obiad u dziadków. 15-latka wychodzi od stołu w połowie deseru i czeka w samochodzie.*  
„Wujek musiał przy wszystkich rzucić, że mi biodra urosły. I wszyscy się śmiali, jakby to był żart.”  
→ emocja: **złość** · dystraktory: upokorzenie, wstyd, bezsilność

**42.** `id 42` · chłopak, 14 l.  
*14-latek wraca z polskiego, na którym czytał na głos fragment lektury. W domu mówi prawie szeptem.*  
„Głos mi się załamał w środku zdania. Cała klasa w śmiech, nawet psorka się uśmiechnęła.”  
→ emocja: **wstyd** · dystraktory: upokorzenie, złość, smutek

**43.** `id 43` · dziewczyna, 17 l.  
*17-latka wraca od fryzjera w czapce, choć jest ciepło. Zdejmuje ją dopiero w swoim pokoju.*  
„Miało być do ramion. Jest do ucha.”  
→ emocja: **bezsilność** · dystraktory: złość, wstyd, rozczarowanie

**44.** `id 44` · chłopak, 17 l.  
*17-latek wraca z imprezy urodzinowej wcześniej, niż zapowiadał. Siada w kuchni i je kanapkę w milczeniu.*  
„Kumpel wchodzi i wszystkie dziewczyny patrzą na niego. Ja stoję obok i jestem powietrzem. On nawet nic nie robi.”  
→ emocja: **zazdrość** · dystraktory: niepewność, wstyd, smutek

**45.** `id 45` · dziewczyna, 13 l.  
*13-latka wraca ze szkoły z bluzą zawiązaną w pasie. Od razu idzie do łazienki.*  
„Dostałam okres na matmie. Na spodniach było widać. Koleżanka powiedziała to na głos, zanim zdążyłam wstać.”  
→ emocja: **wstyd** · dystraktory: upokorzenie, złość, strach

**46.** `id 46` · chłopak, 15 l.  
*Niedziela wieczór. 15-latek pakuje torbę na basen, wyjmuje strój, wkłada z powrotem, znów wyjmuje.*  
„Jutro pierwszy raz basen z klasą. Wszyscy mnie zobaczą bez koszulki. Wszyscy.”  
→ emocja: **strach** · dystraktory: wstyd, niepewność, przytłoczenie

**47.** `id 47` · dziewczyna, 15 l.  
*Sobota, 18:40. 15-latka ma wyjść o 19 na urodziny koleżanki, na łóżku leży sześć przymierzonych i zdjętych rzeczy.*  
„Nie mam w czym iść. W tym wyglądam jak worek, w tym jak dziecko, a w tym jak nie ja.”  
→ emocja: **frustracja** · dystraktory: wstyd, niepewność, złość

**48.** `id 48` · chłopak, 13 l.  
*13-latek wrócił wczoraj od ortodonty z aparatem na zębach. Dziś przy kolacji mówi z ręką przy ustach.*  
„W klasie nazwali mnie «metalowa szczęka». Dwa lata z tym chodzić. Nie będę się uśmiechał przez dwa lata.”  
→ emocja: **smutek** · dystraktory: wstyd, bezsilność, złość

### Internet, telefon, gry, media społecznościowe (10)

**49.** `id 49` · dziewczyna, 14 l.  
*14-latka siedzi przed komputerem i trzeci raz wpisuje hasło. Odsuwa klawiaturę.*  
„Konto przejęte. Trzy lata grania, wszystkie skiny. Support odpisał, że nic nie mogą zrobić.”  
→ emocja: **bezsilność** · dystraktory: złość, żal, rozczarowanie

**50.** `id 50` · dziewczyna, 15 l.  
*15-latka wraca ze szkoły i zamyka się w pokoju. Wychodzi dopiero wieczorem, bez telefonu w ręce.*  
„Ktoś przerobił moje zdjęcie i wrzucił na klasową grupę. Wszyscy to widzieli. Ja ostatnia.”  
→ emocja: **upokorzenie** · dystraktory: wstyd, złość, bezsilność

**51.** `id 51` · chłopak, 16 l.  
*16-latek przez tydzień montował film o swoim rowerze. Dwa dni po publikacji sprawdza statystyki i zamyka aplikację.*  
„Czterdzieści wyświetleń. Tydzień montażu. Filmik kumpla, jak je kebaba, ma dziesięć tysięcy.”  
→ emocja: **rozczarowanie** · dystraktory: frustracja, zazdrość, wstyd

**52.** `id 52` · chłopak, 14 l.  
*Ferie zimowe. 14-latek siedzi w domu, przegląda relacje znajomych na telefonie i odkłada go z westchnieniem.*  
„Wszyscy są na nartach. Każda relacja to góry i śnieg. A ja mam relację z kanapy.”  
→ emocja: **zazdrość** · dystraktory: samotność, smutek, żal

**53.** `id 53` · chłopak, 15 l.  
*15-latek wpada do kuchni z telefonem w ręce i co chwilę odświeża ekran.*  
„Ktoś pisze z mojego konta do wszystkich znajomych. Jakieś linki. Nie mogę się zalogować i nie wiem, co jeszcze tam wysyła.”  
→ emocja: **strach** · dystraktory: bezsilność, wstyd, złość

**54.** `id 54` · chłopak, 17 l.  
*17-latek siedzi na kanapie i przewija telefon, nie otwierając żadnej wiadomości. Potem wyłącza go całkiem.*  
„Dwieście nieprzeczytanych. Grupa klasowa, grupa od projektu, drużyna, ekipa. Każdy czegoś chce i każdy na już.”  
→ emocja: **przytłoczenie** · dystraktory: bezsilność, frustracja, złość

**55.** `id 55` · chłopak, 13 l.  
*Wieczór. 13-latek siedzi przy komputerze ze słuchawkami na szyi, gra jest włączona, ale on nie gra.*  
„Chłopaki grają we czterech. Czekałem godzinę, aż ktoś mnie zaprosi. Widzę, że są online.”  
→ emocja: **odrzucenie** · dystraktory: samotność, smutek, żal

**56.** `id 56` · dziewczyna, 16 l.  
*16-latka co kilka minut sprawdza, czy przyjaciółka jej odpisała, potem kładzie telefon ekranem do dołu na stole.*  
„Jest online. Od trzech dni jest online i nie odpisuje. A wczoraj wrzuciła zdjęcie z innymi.”  
→ emocja: **żal** · dystraktory: odrzucenie, samotność, niepewność

**57.** `id 57` · chłopak, 17 l.  
*17-latek wraca ze szkoły z kapturem na głowie i zdejmuje go dopiero w pokoju.*  
„Ktoś wykopał mój filmik z piątej klasy. Ten, jak śpiewam. Puścili go na rzutniku na przerwie.”  
→ emocja: **wstyd** · dystraktory: upokorzenie, złość, bezsilność

**58.** `id 58` · dziewczyna, 15 l.  
*15-latka prowadzi konto z własnymi rysunkami. Pokazuje mamie telefon z cudzym profilem.*  
„To mój rysunek. Ta dziewczyna usunęła mój podpis, wrzuciła go jako swój i ma trzy razy więcej lajków niż ja.”  
→ emocja: **niesprawiedliwość** · dystraktory: złość, żal, bezsilność

### Przytłoczenie i zmęczenie (8)

**59.** `id 59` · chłopak, 16 l.  
*23:10. 16-latek wraca z korepetycji po treningu i dopiero teraz wyjmuje zeszyty z plecaka.*  
„Szkoła do czwartej, trening, korki. I teraz mam zrobić dwie prace na jutro. Kiedy niby mam spać?”  
→ emocja: **przytłoczenie** · dystraktory: bezsilność, frustracja, złość

**60.** `id 60` · dziewczyna, 15 l.  
*Druga w nocy. 15-latka budzi się z twarzą na otwartym zeszycie i schodzi do kuchni po wodę, tata jeszcze nie śpi.*  
„Zasnęłam nad historią. Nie skończyłam. A o siódmej pobudka i jeszcze dwie rzeczy, których nie ruszyłam.”  
→ emocja: **bezsilność** · dystraktory: przytłoczenie, strach, frustracja

**61.** `id 61` · chłopak, 14 l.  
*Niedziela, 21:00. 14-latek siedzi na łóżku z plecakiem obok, nie wypakował go od piątku.*  
„Jutro znowu. Weekend minął, zanim się zaczął.”  
→ emocja: **smutek** · dystraktory: przytłoczenie, bezsilność, żal

**62.** `id 62` · dziewczyna, 17 l.  
*Rok przed maturą. 17-latka wraca z sobotniej pracy w kawiarni i siada na podłodze w przedpokoju.*  
„Rok do matury, trzy korki w tygodniu, praca w soboty. Mam głowę jak balon, zaraz pęknie.”  
→ emocja: **przytłoczenie** · dystraktory: bezsilność, strach, frustracja

**63.** `id 63` · chłopak, 15 l.  
*Trzeci dzień grypy. 15-latek leży w łóżku i przegląda w telefonie wiadomości z klasowej grupy.*  
„Trzy dni w łóżku i już dwa sprawdziany do nadrobienia. Dziś doszła jeszcze kartkówka. Nie wiem, kiedy ja to wszystko napiszę.”  
→ emocja: **bezsilność** · dystraktory: przytłoczenie, strach, frustracja

**64.** `id 64` · chłopak, 14 l.  
*14-latek od tygodnia trzyma się planu nauki przyklejonego nad biurkiem. Jest 23, on dalej siedzi nad zeszytem.*  
„Zrobiłem plan. Trzymam się go co do minuty. I dalej siedzę o jedenastej, bo każdy nauczyciel zadaje tak, jakbyśmy mieli tylko jego przedmiot.”  
→ emocja: **frustracja** · dystraktory: bezsilność, przytłoczenie, złość

**65.** `id 65` · chłopak, 15 l.  
*Środa, 6:45. 15-latek siedzi na brzegu łóżka ubrany do połowy i patrzy w ścianę.*  
„Budzę się i od razu liczę, ile mam dziś rzeczy. Dochodzę do siedmiu i nie chce mi się wstawać.”  
→ emocja: **przytłoczenie** · dystraktory: bezsilność, smutek, strach

**66.** `id 66` · dziewczyna, 13 l.  
*13-latka wraca z angielskiego o 19, trzecie zajęcia tego dnia. Rzuca torbę i siada na podłodze w przedpokoju.*  
„Dziewczyny po szkole siedzą pod blokiem do wieczora. Ja mam balet, angielski, pianino. Nigdy nie mam po prostu nic.”  
→ emocja: **żal** · dystraktory: przytłoczenie, zazdrość, bunt

### Pasje, sport, porażki i przegrane (8)

**67.** `id 67` · chłopak, 15 l.  
*15-latek wraca z finału ligi szkolnej. Wchodzi w stroju, nie przebrał się po meczu.*  
„Przegraliśmy przez jeden karny. Mój, w ostatniej minucie. Nie trafiłem.”  
→ emocja: **rozczarowanie** · dystraktory: wstyd, żal, bezsilność

**68.** `id 68` · dziewczyna, 16 l.  
*16-latka wraca z zawodów tanecznych z torbą na ramieniu. Stawia ją w przedpokoju i nie rozpakowuje.*  
„Czwarte. Rok treningów po pięć razy w tygodniu. Pierwsze trzy dostały puchary, ja dostałam «brawa dla wszystkich».”  
→ emocja: **żal** · dystraktory: rozczarowanie, smutek, frustracja

**69.** `id 69` · chłopak, 13 l.  
*13-latek wraca z treningu piłki. Wchodzi i od razu rzuca buty w kąt.*  
„Trener nie wziął mnie na turniej. Wziął nowego, który trenuje od września. Ja jestem w klubie trzy lata.”  
→ emocja: **niesprawiedliwość** · dystraktory: odrzucenie, zazdrość, żal

**70.** `id 70` · dziewczyna, 14 l.  
*14-latka wraca z akrobatyki z obtartymi dłońmi. Siada przy stole i ogląda je.*  
„Od miesiąca ćwiczę przerzut. Cała grupa już umie, tylko ja nie. Trenerka mówi «jeszcze raz» i ja znowu leżę na macie.”  
→ emocja: **frustracja** · dystraktory: bezsilność, złość, wstyd

**71.** `id 71` · chłopak, 17 l.  
*17-latek wraca o kulach z kontroli u ortopedy. Siada na kanapie i włącza transmisję meczu swojej drużyny.*  
„Koniec sezonu dla mnie. Oni grają, a ja oglądam ich na telefonie z kanapy. Pierwszy sezon w seniorach.”  
→ emocja: **smutek** · dystraktory: żal, zazdrość, bezsilność

**72.** `id 72` · dziewczyna, 14 l.  
*14-latka wraca z międzyszkolnego konkursu piosenki. Siada w samochodzie i zakłada kaptur.*  
„Zapomniałam drugiej zwrotki. Stałam na scenie, a podkład leciał dalej. Pół szkoły to widziało.”  
→ emocja: **wstyd** · dystraktory: upokorzenie, rozczarowanie, smutek

**73.** `id 73` · chłopak, 16 l.  
*16-latek wraca z treningu siatkówki. Zjada obiad w milczeniu i odsuwa talerz.*  
„Kolega z drużyny dostał powołanie do kadry wojewódzkiej. Gramy razem w pierwszym składzie od trzech lat, a trener nawet na mnie nie spojrzał.”  
→ emocja: **zazdrość** · dystraktory: niesprawiedliwość, rozczarowanie, żal

**74.** `id 74` · dziewczyna, 17 l.  
*17-latka wraca z ostatniej próby zespołu. Wnosi gitarę do pokoju i stawia ją w kącie zamiast na stojaku.*  
„Rozpadamy się. Oni w maju piszą maturę i jadą na studia. Trzy lata grania i koniec, tak po prostu.”  
→ emocja: **smutek** · dystraktory: żal, samotność, rozczarowanie

### Przyszłość i decyzje (profil, matura, studia, dorosłość) (6)

**75.** `id 75` · chłopak, 14 l.  
*Marzec, ósma klasa. 14-latek wraca ze spotkania z doradcą zawodowym i kładzie na stole ulotki liceów.*  
„Wszyscy w klasie wiedzą, gdzie idą. Mat-fiz, biol-chem, technikum. Ja patrzę na te ulotki i żadna nie mówi «to ja».”  
→ emocja: **niepewność** · dystraktory: przytłoczenie, strach, wstyd

**76.** `id 76` · dziewczyna, 17 l.  
*17-latka wraca z targów edukacyjnych. Przy kolacji obraca w rękach folder jednego kierunku.*  
„Wszyscy mówią, że po historii sztuki nie ma pracy. Chcę tylko tego. A co, jeśli mają rację?”  
→ emocja: **niepewność** · dystraktory: strach, przytłoczenie, bezsilność

**77.** `id 77` · chłopak, 18 l.  
*Dzień po osiemnastych urodzinach. 18-latek siedzi w kuchni nad listą rzeczy do załatwienia, którą sam sobie rozpisał.*  
„Wszyscy wczoraj: «no, teraz jesteś dorosły». Dowód, konto, prawko, matura. Jakby o północy ktoś wcisnął przycisk.”  
→ emocja: **przytłoczenie** · dystraktory: strach, niepewność, samotność

**78.** `id 78` · dziewczyna, 15 l.  
*Wrzesień, pierwsza klasa liceum. 15-latka wraca z zebrania, na którym ogłoszono listę grup rozszerzeń.*  
„Wybrałam tę szkołę dla rozszerzonego angielskiego. A teraz «grupa nie powstanie, za mało chętnych». Idę na biologię, której nie chciałam.”  
→ emocja: **rozczarowanie** · dystraktory: złość, bezsilność, żal

**79.** `id 79` · chłopak, 16 l.  
*Niedzielny obiad u dziadków. 16-latek wraca do domu i od razu zamyka się w pokoju, wychodzi dopiero wieczorem.*  
„Każdy przy stole pytał, kim chcę być. Każdy. Mam szesnaście lat, skąd mam to wiedzieć?”  
→ emocja: **frustracja** · dystraktory: przytłoczenie, niepewność, złość

**80.** `id 80` · dziewczyna, 18 l.  
*18-latka dostała wynik rekrutacji na wymarzone studia w innym mieście. Siedzi na łóżku i nikomu jeszcze nie napisała.*  
„Dostałam się. I nagle to jest za trzy miesiące, pięć godzin pociągiem, sama w obcym mieście. Jeszcze dwa dni temu tylko tego chciałam.”  
→ emocja: **strach** · dystraktory: niepewność, samotność, przytłoczenie

<a id="poziom-2"></a>

## Poziom 2: kusi, żeby doradzać i naprawiać (45)

### Szkoła: oceny, poprawy, konflikt z nauczycielem, odkładanie trudnej rozmowy (10)

**81.** `id 81` · chłopak, 15 l.  
*15-latek wraca ze szkoły i kładzie sprawdzian z matematyki na stole, oceną do góry.*  
„Jedynka. Wiem, co powiesz. Że trzeba było się uczyć wcześniej, a nie w nocy przed sprawdzianem.”  
→ emocja: **rozczarowanie** · dystraktory: wstyd, frustracja, bezsilność

**82.** `id 82` · dziewczyna, 16 l.  
*16-latka wraca z lekcji biologii. Rzuca plecak i staje w drzwiach kuchni z założonymi rękami.*  
„Nie idę więcej na biologię. Biolożka powiedziała przy całej klasie, że z moimi wynikami to najwyżej na kasę. Nie będę tam siedzieć i tego słuchać.”  
→ emocja: **upokorzenie** · dystraktory: złość, bunt, bezsilność

**83.** `id 83` · chłopak, 14 l.  
*14-latek od trzech dni nosi w plecaku kartkę z prośbą o poprawę sprawdzianu. Jutro mija termin zgłoszeń.*  
„Jutro ostatni dzień. Trzy razy stałem pod pokojem nauczycielskim i trzy razy zawróciłem. I wiem, że powiesz, że wystarczy wejść.”  
→ emocja: **strach** · dystraktory: niepewność, wstyd, bezsilność

**84.** `id 84` · dziewczyna, 17 l.  
*17-latka od miesiąca mówi, że pójdzie do wychowawcy w sprawie zmiany rozszerzenia. Dziś znów wraca bez tej rozmowy.*  
„Znowu nie poszłam. Jak zmienię, będę pół roku za wszystkimi. Jak nie zmienię, to kolejne dwa lata chemii, której nie cierpię.”  
→ emocja: **niepewność** · dystraktory: strach, przytłoczenie, bezsilność

**85.** `id 85` · chłopak, 15 l.  
*15-latek sprawdza Librus i odkłada telefon. Potem bierze go z powrotem i patrzy jeszcze raz.*  
„Poprawa była dziś, myślałem, że w piątek. Nauczycielka nie robi drugich terminów. Nie potrzebuję rady, mam przerąbane i tyle.”  
→ emocja: **bezsilność** · dystraktory: wstyd, strach, złość

**86.** `id 86` · dziewczyna, 14 l.  
*Maj. 14-latka wraca z egzaminu ósmoklasisty z matematyki i siada na schodach przed domem, zanim wejdzie.*  
„Nie zrobiłam połowy zadań. Nie mów, że na pewno poszło lepiej, niż myślę. Siedziałam i patrzyłam w kartkę.”  
→ emocja: **strach** · dystraktory: rozczarowanie, niepewność, przytłoczenie

**87.** `id 87` · chłopak, 17 l.  
*17-latek w drugiej klasie liceum dostał kolejną dwójkę z fizyki rozszerzonej. Przy kolacji sam zaczyna temat.*  
„Wybrałem mat-fiz, bo wszyscy mówili, że z tego są studia. Siedzę w tym drugi rok i każda lekcja to męka. I nie, nie będę zmieniać klasy.”  
→ emocja: **żal** · dystraktory: frustracja, bezsilność, rozczarowanie

**88.** `id 88` · dziewczyna, 15 l.  
*15-latka pokazuje mamie test z historii: trzy odpowiedzi zaznaczone jako błędne, obok otwarty podręcznik z tymi samymi zdaniami.*  
„Zaznaczyła mi trzy błędy, a w książce jest tak, jak napisałam. I nie, nie idź do niej. Potem cała klasa będzie na mnie patrzeć.”  
→ emocja: **niesprawiedliwość** · dystraktory: bezsilność, złość, żal

**89.** `id 89` · chłopak, 13 l.  
*13-latek wraca ze szkoły i siada na łóżku z plecakiem na kolanach. Odzywa się dopiero, kiedy tata zagląda do pokoju.*  
„Oddałem pustą kartkówkę, a umiałem to. Siedziałem i nie mogłem nic napisać. Wiem, że to głupie.”  
→ emocja: **wstyd** · dystraktory: bezsilność, strach, frustracja

**90.** `id 90` · chłopak, 16 l.  
*16-latek wraca ze sprawdzianu z geografii i przegląda w telefonie oceny klasy na grupowym czacie.*  
„Pół klasy miało ściągi i mają piątki. Ja się uczyłem i mam trzy. Może na następnym też będę ściągać, skoro tak to działa.”  
→ emocja: **frustracja** · dystraktory: niesprawiedliwość, złość, bunt

### Relacje: kłótnie przyjacielskie, zawód sercowy, zawiedzenie kogoś (10)

**91.** `id 91` · dziewczyna, 15 l.  
*Czwarty dzień po kłótni z przyjaciółką. 15-latka przy kolacji sprawdza telefon i odkłada go.*  
„Dalej nic nie napisała. Cztery dni. I nie, nie napiszę pierwsza, bo to ona mi nagadała.”  
→ emocja: **żal** · dystraktory: złość, samotność, bunt

**92.** `id 92` · chłopak, 16 l.  
*16-latek wraca o 21 ze spotkania z dziewczyną. Siada w kuchni i nie włącza światła.*  
„Zerwała ze mną. Pół roku. I nie mów, że będą inne, bo nie chcę innych.”  
→ emocja: **smutek** · dystraktory: odrzucenie, żal, bezsilność

**93.** `id 93` · dziewczyna, 14 l.  
*Niedziela rano. 14-latka siedzi przy stole i od dziesięciu minut pisze i kasuje wiadomość w telefonie.*  
„Nie poszłam na urodziny przyjaciółki, bo wybrałam inne, i ona o tym wie. Wiem, że powinnam napisać. Wiem.”  
→ emocja: **wstyd** · dystraktory: żal, strach, bezsilność

**94.** `id 94` · chłopak, 15 l.  
*15-latek wraca ze szkoły i wyłącza powiadomienia w telefonie. Przy obiedzie sam zaczyna.*  
„Mój najlepszy kumpel obgadał mnie przed całą ekipą, a wszyscy mówią, żebym z nim pogadał. O czym? Mówił to za moimi plecami, nie w twarz.”  
→ emocja: **rozczarowanie** · dystraktory: żal, złość, odrzucenie

**95.** `id 95` · dziewczyna, 17 l.  
*17-latka wraca sama z wyjścia, na które miała iść z chłopakiem i z koleżankami. Wróciła wcześniej, niż planowała.*  
„On nie chce chodzić z moimi znajomymi, one nie chcą go widzieć. Co weekend muszę wybierać. I nie mów, żebym go po prostu rzuciła.”  
→ emocja: **bezsilność** · dystraktory: przytłoczenie, smutek, niepewność

**96.** `id 96` · chłopak, 14 l.  
*Dwa dni przed piętnastymi urodzinami. 14-latek przegląda na czacie odpowiedzi na zaproszenia i odkłada telefon.*  
„Zaprosiłem dziesięciu, przyjdzie trzech. Reszta «ma plany». I nie mów, żebym przełożył, oni nie mają planów, oni mają mnie gdzieś.”  
→ emocja: **odrzucenie** · dystraktory: samotność, smutek, żal

**97.** `id 97` · dziewczyna, 16 l.  
*16-latka od dwóch dni nie dostaje żadnych wiadomości na grupie z koleżankami, na której planowały wspólny wyjazd. Zamyka aplikację i odkłada telefon.*  
„Powiedziałam, co myślę o tym wyjeździe, i teraz cała grupa milczy. Mam je gdzieś. Serio, mam je gdzieś.”  
→ emocja: **żal** · dystraktory: odrzucenie, samotność, bunt

**98.** `id 98` · chłopak, 17 l.  
*17-latek obiecał kumplowi pomóc w sobotę przy przeprowadzce i obudził się o 14. W niedzielę wieczorem patrzy w telefon.*  
„Nie odpisuje od wczoraj. Napisałem dwa razy, trzeci raz nie napiszę. Co, jeśli on ma mnie już dość?”  
→ emocja: **strach** · dystraktory: wstyd, żal, bezsilność

**99.** `id 99` · dziewczyna, 13 l.  
*13-latka wraca ze szkoły i siada przy stole z telefonem w dłoni. Nie odblokowuje go.*  
„Chłopak, który mi się podoba, powiedział mojej koleżance, że jestem spoko, ale «jako kumpela». I nie mów, że mam trzynaście lat i jeszcze będzie milion innych.”  
→ emocja: **smutek** · dystraktory: odrzucenie, wstyd, żal

**100.** `id 100` · chłopak, 16 l.  
*Sobota, 19:00. Cała klasa idzie dziś na koncert. 16-latek stoi w kurtce w przedpokoju, po chwili zdejmuje ją i wiesza.*  
„Nie idę. Nie mam z kim. I nie dzwoń do rodziców kolegów, nie jestem w przedszkolu.”  
→ emocja: **samotność** · dystraktory: wstyd, odrzucenie, smutek

### Dom: obowiązki, zmęczenie, odmowa (8)

**101.** `id 101` · chłopak, 15 l.  
*15-latek wraca z treningu o 20 i widzi zlew pełen naczyń po obiedzie, które miał zmyć.*  
„Wiem, że to pięć minut. Ale dziś naprawdę nie mam tych pięciu minut, mam jeszcze fizykę i chcę po prostu usiąść.”  
→ emocja: **frustracja** · dystraktory: przytłoczenie, bezsilność, złość

**102.** `id 102` · chłopak, 16 l.  
*Sobota wieczór, rodzina szykuje się na niedzielny obiad u babci. 16-latek siedzi nad podręcznikami i nie podnosi głowy.*  
„Nie jadę. Mam dwa sprawdziany w poniedziałek i ani jednego nie ruszyłem. Wiem, że babcia czeka, nie musisz mówić.”  
→ emocja: **przytłoczenie** · dystraktory: bezsilność, wstyd, żal

**103.** `id 103` · chłopak, 13 l.  
*Mama wraca z pracy. 13-latek stoi w korytarzu przed łazienką, z pralki dobiega stukanie, a drzwiczki nie chcą się otworzyć.*  
„Chciałem zrobić pranie, zanim wrócisz. Wcisnąłem wszystko naraz i teraz coś stuka. Nie wiem, co nacisnąłem.”  
→ emocja: **strach** · dystraktory: wstyd, bezsilność, rozczarowanie

**104.** `id 104` · dziewczyna, 14 l.  
*14-latka pierwszy raz zrobiła obiad dla całej rodziny. Na stole stoi przypalona zapiekanka, każdy zjadł tylko trochę.*  
„Robiłam to dwie godziny. Nikt nie zjadł nawet połowy. I nie mów, że było dobre, bo nie było.”  
→ emocja: **rozczarowanie** · dystraktory: wstyd, żal, frustracja

**105.** `id 105` · chłopak, 15 l.  
*Sobota, 21:00. 15-latek po całym dniu pomagania wujkowi przy remoncie leży na łóżku w ubraniu, obok sterta rzeczy do odłożenia.*  
„Nie posprzątam dziś pokoju. Nie dlatego, że nie chcę. Nie dam rady wstać.”  
→ emocja: **przytłoczenie** · dystraktory: bezsilność, frustracja, złość

**106.** `id 106` · dziewczyna, 15 l.  
*15-latka została po południu z chorym pięcioletnim bratem. Kiedy tata wraca, ona siedzi na podłodze w pokoju brata, mały już śpi.*  
„Płakał godzinę, że chce mamę. Robiłam wszystko. Nie nadaję się do tego i nie mów, że się nadaję.”  
→ emocja: **bezsilność** · dystraktory: wstyd, smutek, rozczarowanie

**107.** `id 107` · chłopak, 16 l.  
*16-latek dzwoni domofonem, choć zwykle otwiera sobie sam. Wchodzi i od razu idzie do swojego pokoju, po chwili wraca.*  
„Zgubiłem klucze, drugi raz w tym miesiącu. Wiem. Nie musisz nic mówić, sam wiem.”  
→ emocja: **wstyd** · dystraktory: bezsilność, złość, strach

**108.** `id 108` · dziewczyna, 17 l.  
*17-latka patrzy na kalendarz w telefonie i siada na kanapie z telefonem w obu dłoniach.*  
„Babcia miała wczoraj urodziny. Zapomniałam. Chcę zadzwonić, ale co jej powiem, «sorry, zapomniałam»?”  
→ emocja: **niepewność** · dystraktory: wstyd, strach, żal

### Decyzje: rzucanie zajęć, wybór szkoły/studiów, praca wakacyjna, nowe środowisko (9)

**109.** `id 109` · dziewczyna, 16 l.  
*16-latka wraca z lekcji pianina i zamiast odłożyć nuty na półkę, wkłada je do szuflady na samo dno.*  
„Chcę skończyć ze szkołą muzyczną. Osiem lat, wiem, co powiesz. Ale ja już tego nie lubię, siadam do tego jak do kary.”  
→ emocja: **przytłoczenie** · dystraktory: żal, frustracja, bunt

**110.** `id 110` · chłopak, 15 l.  
*15-latek sprawdził listy przyjętych do liceów. Przegląda stronę szkoły, do której się dostał, i zamyka laptopa.*  
„Nie dostałem się do dwójki. Idę do czwórki. Nie mów, że to też dobra szkoła, bo wszyscy, których znam, idą do dwójki.”  
→ emocja: **rozczarowanie** · dystraktory: żal, niepewność, wstyd

**111.** `id 111` · dziewczyna, 17 l.  
*17-latka ogląda w telefonie zdjęcia akademików w Krakowie, które sama wyszukała. Odkłada telefon i patrzy na zdjęcie klasy na ścianie.*  
„Wszystkie dziewczyny z klasy zostają tutaj. Ja jedna chcę jechać. I nie mów, że będzie super i poznam nowych ludzi, bo nie o to chodzi.”  
→ emocja: **strach** · dystraktory: niepewność, samotność, smutek

**112.** `id 112` · chłopak, 16 l.  
*16-latek wraca z pierwszego dnia wakacyjnej pracy w myjni samochodowej. Rzuca kamizelkę na krzesło.*  
„Szef darł się na mnie przy klientach, bo źle zwinąłem wąż. Jutro tam nie idę. I nie mów, że nie można się poddawać po jednym dniu.”  
→ emocja: **upokorzenie** · dystraktory: wstyd, bezsilność, złość

**113.** `id 113` · dziewczyna, 14 l.  
*Maj, ósma klasa. 14-latka wypełnia na laptopie wniosek rekrutacyjny i co chwilę zmienia kolejność szkół.*  
„Wszystkie dziewczyny idą do jednej szkoły. Ja chcę do plastyka, sama. I wiem, że znajomi to nie wszystko, nie musisz tego mówić.”  
→ emocja: **niepewność** · dystraktory: strach, samotność, przytłoczenie

**114.** `id 114` · chłopak, 17 l.  
*17-latek wraca z treningu i wyjmuje z torby buty piłkarskie. Zamiast do szafki wkłada je do kartonu.*  
„Kończę z piłką. Dziesięć lat, wiem. Ale widzę, kto gra w pierwszym składzie, i to nigdy nie będę ja.”  
→ emocja: **żal** · dystraktory: rozczarowanie, smutek, bezsilność

**115.** `id 115` · dziewczyna, 15 l.  
*Październik, pierwsza klasa liceum. 15-latka wraca ze szkoły i siada do obiadu z telefonem, na którym nie ma żadnych nowych wiadomości.*  
„Dalej jem na przerwie sama. Dwa miesiące. I nie, nie zapiszę się na kółko teatralne, żeby «kogoś poznać».”  
→ emocja: **samotność** · dystraktory: odrzucenie, wstyd, niepewność

**116.** `id 116` · chłopak, 18 l.  
*Czerwiec, po maturze. 18-latek od pół godziny siedzi przed laptopem z otwartą stroną rekrutacji i niczego nie kliknął.*  
„Wszyscy złożyli papiery. Ja mam pięć kierunków w zakładkach i żaden nie jest mój. Nie wymieniaj mi kolejnych.”  
→ emocja: **niepewność** · dystraktory: przytłoczenie, strach, bezsilność

**117.** `id 117` · dziewczyna, 16 l.  
*16-latka po roku w liceum wraca ze szkoły i otwiera na laptopie stronę innej szkoły w mieście.*  
„Chcę zmienić szkołę. Wiem, co powiesz: wszędzie jest tak samo. Rok próbowałam, nie pasuję tam i nie zacznę pasować.”  
→ emocja: **bezsilność** · dystraktory: samotność, smutek, frustracja

### Pieniądze i rzeczy: strata, zły zakup, kieszonkowe (4)

**118.** `id 118` · chłopak, 14 l.  
*14-latek odpakował słuchawki zamówione za oszczędności z trzech miesięcy. Siedzi z nimi na łóżku, w telefonie otwarta strona sklepu.*  
„Nie działają. Strona zniknęła. Trzy miesiące odkładania i nie mów, że to było do przewidzenia.”  
→ emocja: **wstyd** · dystraktory: złość, bezsilność, rozczarowanie

**119.** `id 119` · chłopak, 16 l.  
*16-latek wraca z miasta i wysypuje całą zawartość plecaka na podłogę w przedpokoju.*  
„Nie ma portfela, a w nim całe kieszonkowe na miesiąc i legitymacja. Tak, wiem, nie nosi się portfela w tylnej kieszeni. Wiem.”  
→ emocja: **frustracja** · dystraktory: wstyd, złość, bezsilność

**120.** `id 120` · chłopak, 16 l.  
*16-latek przez lipiec pracował na zmywaku w restauracji. Pod koniec sierpnia sprawdza stan konta i pokazuje ekran tacie.*  
„Zostało czterdzieści złotych z całego lipca. Nawet nie wiem, na co to poszło. I nie chcę wykładu o oszczędzaniu.”  
→ emocja: **rozczarowanie** · dystraktory: wstyd, złość, bezsilność

**121.** `id 121` · dziewczyna, 13 l.  
*13-latka siedzi przy komputerze i przegląda swoje konto w grze. Zamyka je i odsuwa się od biurka.*  
„Wydałam całe kieszonkowe na ten skin, bo wszystkie miały. Dziś nikogo to już nie obchodzi. Tak, wiem, co o tym myślisz.”  
→ emocja: **żal** · dystraktory: wstyd, rozczarowanie, zazdrość

### Drobna autonomia i wstyd przy rodzicu (lekarz, zakupy, wspólne wyjścia) (4)

**122.** `id 122` · chłopak, 15 l.  
*Poczekalnia u lekarza. 15-latek siedzi obok mamy, pielęgniarka właśnie wywołała jego nazwisko.*  
„Nie wchodź ze mną. Mam piętnaście lat, umiem powiedzieć, co mnie boli. Poczekaj tutaj.”  
→ emocja: **wstyd** · dystraktory: złość, frustracja, bunt

**123.** `id 123` · dziewczyna, 14 l.  
*Centrum handlowe, sobota. 14-latka wychodzi z przymierzalni i odwiesza rzeczy, które wybrała mama.*  
„Chcę sama wybrać. Nie w tym sklepie i nie z kimś obok, kto mówi «ładne» do wszystkiego.”  
→ emocja: **frustracja** · dystraktory: wstyd, bunt, niepewność

**124.** `id 124` · chłopak, 15 l.  
*15-latek siedzi w samochodzie pod domem kolegi, u którego są urodziny. Tata wyłącza silnik, żeby wejść i przywitać się z jego rodzicami.*  
„Nie wchodź, serio. Wszyscy będą patrzeć, kto mnie przyprowadził. Przywitasz się, jak będziesz odbierać.”  
→ emocja: **wstyd** · dystraktory: frustracja, złość, niepewność

**125.** `id 125` · dziewczyna, 17 l.  
*17-latka od dwóch miesięcy spotyka się z chłopakiem, o którym w domu wspomina mimochodem. Mama zaproponowała, żeby zaprosić go na obiad.*  
„Jeszcze nie. Nie wiem, czy to jest na tyle poważne, żeby robić obiady. Jak go przyprowadzę, to już będzie oficjalnie.”  
→ emocja: **niepewność** · dystraktory: wstyd, strach, frustracja

<a id="poziom-3"></a>

## Poziom 3: nastolatek zły NA rodzica (75)

### Prywatność i kontrola (telefon, pokój, lokalizacja, czytanie rzeczy, śledzenie w sieci) (18)

**126.** `id 126` · dziewczyna, 15 l.  
*15-latka wchodzi do kuchni i widzi, że mama trzyma jej telefon, zostawiony na ładowaniu.*  
„Czytałaś moje wiadomości. Co ja takiego zrobiłam, że musisz mnie sprawdzać jak przestępcę?”  
→ emocja: **niesprawiedliwość** · dystraktory: złość, upokorzenie, żal

**127.** `id 127` · chłopak, 16 l.  
*16-latek znajduje w ustawieniach telefonu udostępnianie lokalizacji, którego sam nie włączał. Wchodzi do salonu z telefonem w ręce.*  
„Śledzicie mnie. Włączyliście mi to bez słowa. Mam nosić telefon jak obrożę?”  
→ emocja: **złość** · dystraktory: bunt, upokorzenie, niesprawiedliwość

**128.** `id 128` · dziewczyna, 14 l.  
*14-latka przebiera się w swoim pokoju, kiedy tata wchodzi bez pukania. Ona zasłania się bluzą.*  
„Wyjdź! Nie umiesz zapukać?”  
→ emocja: **wstyd** · dystraktory: złość, upokorzenie, bezsilność

**129.** `id 129` · chłopak, 15 l.  
*Przy kolacji tata wspomina o poradnikach o trądziku, które 15-latek oglądał wczoraj wieczorem. On odkłada widelec.*  
„Sprawdzałeś moją historię. To moje. Nie musisz wiedzieć wszystkiego, co oglądam.”  
→ emocja: **wstyd** · dystraktory: złość, upokorzenie, bunt

**130.** `id 130` · dziewczyna, 17 l.  
*17-latka wraca z nocowania u koleżanki. Mama koleżanki wspomniała przy śniadaniu, że wieczorem był telefon z pytaniem, czy ona na pewno tam jest.*  
„Dzwoniłaś do jej mamy, żeby sprawdzić, czy tam jestem. Powiedziałam ci, gdzie jestem, i to nie wystarczyło.”  
→ emocja: **żal** · dystraktory: złość, upokorzenie, niesprawiedliwość

**131.** `id 131` · chłopak, 14 l.  
*Ojciec zażądał kodu do telefonu. 14-latek trzyma telefon w obu rękach i nie podaje.*  
„To już nie mój telefon. Twój, z moimi rzeczami.”  
→ emocja: **bezsilność** · dystraktory: złość, bunt, upokorzenie

**132.** `id 132` · dziewczyna, 16 l.  
*16-latka znajduje swój pamiętnik na innej półce niż zwykle. Zakładka jest w innym miejscu.*  
„Przeczytałaś. Tam było wszystko, czego ci nie mówię. Teraz już wiem, dlaczego ci nie mówię.”  
→ emocja: **żal** · dystraktory: złość, upokorzenie, bezsilność

**133.** `id 133` · chłopak, 15 l.  
*15-latek wraca ze szkoły i widzi, że mama posprzątała mu biurko. Kosz w kuchni jest pełen jego kartek.*  
„Wyrzuciłaś moje rzeczy. To nie były śmieci, to były notatki do mojego komiksu. Pół roku rysowania.”  
→ emocja: **złość** · dystraktory: żal, bezsilność, niesprawiedliwość

**134.** `id 134` · chłopak, 13 l.  
*20:00. 13-latek przychodzi do salonu z telefonem, który właśnie zablokował się przez nowe ustawienia kontroli rodzicielskiej.*  
„Ósma. O ósmej mi się wyłącza, jak pięciolatkowi. Wszyscy w klasie mogą do dziesiątej.”  
→ emocja: **bunt** · dystraktory: złość, niesprawiedliwość, bezsilność

**135.** `id 135` · chłopak, 16 l.  
*16-latek siedzi z mamą przy kolacji. Telefon wibruje trzeci raz i mama za każdym razem pyta, kto pisze.*  
„Każde powiadomienie: kto to, kto to, kto to. Kumpel, kumpel, kumpel. Mam ci podać listę?”  
→ emocja: **frustracja** · dystraktory: złość, bunt, przytłoczenie

**136.** `id 136` · dziewczyna, 14 l.  
*14-latka rozmawia w pokoju z koleżanką przez głośnik. Koleżanka pyta, kto tam szura pod drzwiami. 14-latka otwiera i widzi mamę tuż za progiem.*  
„Stałaś pod drzwiami. Ona to słyszała. Jutro cała klasa będzie wiedzieć, że moja mama podsłuchuje.”  
→ emocja: **upokorzenie** · dystraktory: złość, wstyd, bezsilność

**137.** `id 137` · chłopak, 15 l.  
*Nowa zasada w domu: drzwi do pokoju mają być otwarte, kiedy 15-latek siedzi przy komputerze. On stoi w progu z ręką na klamce.*  
„Nawet drzwi nie mogę zamknąć? Co niby mam tam robić? To mój pokój, nie wasza poczekalnia.”  
→ emocja: **bunt** · dystraktory: złość, niesprawiedliwość, upokorzenie

**138.** `id 138` · dziewczyna, 18 l.  
*18-latka wraca z miasta i widzi na telefonie taty mapę ze swoją lokalizacją. Tata nie zdążył zamknąć aplikacji.*  
„Mam osiemnaście lat. Osiemnaście. Dalej patrzysz na kropkę na mapie, zamiast po prostu zapytać.”  
→ emocja: **żal** · dystraktory: złość, upokorzenie, bunt

**139.** `id 139` · chłopak, 14 l.  
*14-latek wraca ze szkoły i widzi, że rzeczy w jego plecaku są poukładane inaczej, niż je zostawił.*  
„Przeszukałaś mój plecak. Co chciałaś tam znaleźć?”  
→ emocja: **upokorzenie** · dystraktory: złość, niesprawiedliwość, żal

**140.** `id 140` · dziewczyna, 16 l.  
*Przy kolacji mama pyta o chłopaka, o którym 16-latka pisała tylko w prywatnej rozmowie z przyjaciółką. Ona odkłada sztućce.*  
„Skąd o nim wiesz? Nikomu nie mówiłam. Skąd?”  
→ emocja: **złość** · dystraktory: strach, upokorzenie, bezsilność

**141.** `id 141` · chłopak, 13 l.  
*13-latek wyłącza grę, kiedy tata podchodzi i pyta, ile dziś grał. Tata ma w telefonie aplikację, która liczy czas spędzony w grach.*  
„Masz to w telefonie, co do minuty. Czterdzieści minut. To po co pytasz, ile grałem, skoro wiesz?”  
→ emocja: **frustracja** · dystraktory: złość, upokorzenie, bunt

**142.** `id 142` · dziewczyna, 18 l.  
*Mama poprosiła o hasło do telefonu „na wszelki wypadek”. 18-latka kładzie telefon na stole ekranem do dołu.*  
„Na wypadek czego? Nie dam. Jak dam, to ten telefon już nigdy nie będzie mój.”  
→ emocja: **bunt** · dystraktory: złość, niesprawiedliwość, frustracja

**143.** `id 143` · chłopak, 16 l.  
*16-latek dowiaduje się, że tata wszedł na jego konto na Discordzie i napisał z niego do Bartka, żeby nie grali tak długo w nocy. Wchodzi do kuchni z telefonem.*  
„Napisałeś do Bartka. Z mojego Discorda. Wiesz, jak mnie teraz nazywają?”  
→ emocja: **upokorzenie** · dystraktory: złość, wstyd, bezsilność

### Autonomia: wyjścia, godziny powrotu, wygląd, muzyka, własny styl (14)

**144.** `id 144` · chłopak, 16 l.  
*16-latek dostał odmowę na koncert, na który idzie cała jego klasa. Stoi w drzwiach kuchni z biletem w ręce.*  
„Wszyscy idą, wszyscy. Rodzice każdego się zgodzili, tylko wy nie. Co jest ze mną nie tak?”  
→ emocja: **niesprawiedliwość** · dystraktory: złość, żal, bunt

**145.** `id 145` · chłopak, 15 l.  
*Piątek, 20:50. 15-latek wraca z boiska dokładnie o godzinie wyznaczonej przez tatę, koledzy zostali.*  
„Dziewiąta. Oni siedzą do jedenastej, a ja wstaję i mówię «muszę». Jak z przedszkola.”  
→ emocja: **wstyd** · dystraktory: bunt, złość, niesprawiedliwość

**146.** `id 146` · chłopak, 14 l.  
*Dzień przed zjazdem rodzinnym. Mama kazała mu ściąć włosy przed wspólnym zdjęciem, 14-latek stoi w łazience i nie dzwoni do fryzjera.*  
„Nie zetnę. To moje włosy, nie wasza dekoracja.”  
→ emocja: **złość** · dystraktory: bunt, upokorzenie, bezsilność

**147.** `id 147` · dziewczyna, 17 l.  
*17-latka wychodzi z łazienki umalowana na wyjście. Tata komentuje, że wygląda „jak do klubu”.*  
„«Jak do klubu». Pół godziny to robiłam, idę do kina z koleżankami. Mam zmyć i pójść jak szara mysz, tak chcesz?”  
→ emocja: **upokorzenie** · dystraktory: złość, wstyd, żal

**148.** `id 148` · chłopak, 15 l.  
*15-latek puścił w samochodzie swoją playlistę. Tata po minucie przełącza na radio i mówi, że to nie muzyka.*  
„Minuta. Nawet nie posłuchałeś jednego kawałka do końca. «To nie muzyka», a twoja to niby muzyka?”  
→ emocja: **rozczarowanie** · dystraktory: złość, żal, odrzucenie

**149.** `id 149` · dziewczyna, 16 l.  
*16-latka dostała trzeci rok z rzędu odmowę wyjazdu ze znajomymi nad jezioro. Siedzi na łóżku z otwartą listą rzeczy do spakowania.*  
„Rok temu «za rok». Dwa lata temu «za rok». Kiedy w końcu będzie ten rok?”  
→ emocja: **bezsilność** · dystraktory: złość, niesprawiedliwość, bunt

**150.** `id 150` · chłopak, 17 l.  
*Sylwester. 17-latek szykuje się na imprezę u kolegi, mama właśnie powiedziała, że ma wrócić o 22.*  
„O dziesiątej w sylwestra? To ja w ogóle nie idę. Po co, żeby wyjść przed północą jak dzieciak?”  
→ emocja: **złość** · dystraktory: bunt, niesprawiedliwość, upokorzenie

**151.** `id 151` · dziewczyna, 14 l.  
*14-latka wraca od koleżanki z pasemkiem niebieskiej farby we włosach, mimo wcześniejszego zakazu.*  
„Tak, zrobiłam. To moje włosy. Zmyje się za miesiąc, a ty robisz z tego aferę.”  
→ emocja: **bunt** · dystraktory: złość, niesprawiedliwość, wstyd

**152.** `id 152` · chłopak, 16 l.  
*16-latek wychodzi z pokoju w nowej, szerokiej bluzie. Mama patrzy na niego i wzdycha.*  
„Nigdy ci się nie podoba nic, co jest moje. Ani ciuchy, ani muzyka, ani kumple. Nic.”  
→ emocja: **odrzucenie** · dystraktory: złość, żal, upokorzenie

**153.** `id 153` · dziewczyna, 13 l.  
*13-latka nie dostała zgody na nocowanie u koleżanki, na które idą wszystkie dziewczyny z klasy, bo mama nie zna rodziców tej koleżanki. Siedzi na schodach z telefonem.*  
„Wszystkie będą. Ja będę w domu, jak zawsze. Nawet nie spróbowałaś ich poznać.”  
→ emocja: **żal** · dystraktory: złość, niesprawiedliwość, samotność

**154.** `id 154` · chłopak, 18 l.  
*18-latek wychodzi na osiemnastkę kolegi. Tata w przedpokoju przypomina, że ma być w domu o pierwszej.*  
„O pierwszej, na osiemnastce? Wrócę, jak się skończy. Nie będę pierwszy wychodził, bo tata kazał.”  
→ emocja: **bunt** · dystraktory: złość, niesprawiedliwość, frustracja

**155.** `id 155` · dziewczyna, 16 l.  
*16-latka wraca od fryzjera z włosami ściętymi na krótko. Mama na jej widok pyta, co ona sobie zrobiła.*  
„Co sobie zrobiłam? Ścięłam włosy, moje. I nie, nie wyglądam jak chłopak, wyglądam jak ja.”  
→ emocja: **złość** · dystraktory: upokorzenie, bunt, żal

**156.** `id 156` · chłopak, 15 l.  
*15-latek dostał zgodę na mecz w sąsiednim mieście tylko pod warunkiem, że pojedzie z nim mama. Koledzy jadą sami pociągiem.*  
„Wszyscy jadą sami, ja z mamą jak na wycieczce z podstawówki. Mam im powiedzieć, że mama się boi, czy że ja się boję?”  
→ emocja: **wstyd** · dystraktory: upokorzenie, złość, niesprawiedliwość

**157.** `id 157` · dziewczyna, 16 l.  
*16-latka dostała propozycję pracy w weekendy w kawiarni koleżanki. Tata odmówił zgody, bo „najpierw szkoła”.*  
„Mam średnią cztery osiem. Co jeszcze mam zrobić, żebyś mi uwierzył, że ogarniam? Weekend to mój czas.”  
→ emocja: **frustracja** · dystraktory: bezsilność, złość, niesprawiedliwość

### Obowiązki i „zawsze ja” (10)

**158.** `id 158` · chłopak, 15 l.  
*15-latek zakłada buty do wyjścia, kiedy mama woła go do wyniesienia śmieci.*  
„Znowu ja. Rano ja, wczoraj ja. Jakby w tym domu tylko ja miał ręce.”  
→ emocja: **niesprawiedliwość** · dystraktory: złość, żal, bunt

**159.** `id 159` · dziewczyna, 14 l.  
*14-latka czwarty dzień z rzędu odbiera brata z przedszkola i zostaje z nim do wieczora. Mama wraca o 19.*  
„Nie jestem jego mamą. Odbieram, karmię, bawię się z nim. Kiedy ja mam czas dla siebie?”  
→ emocja: **przytłoczenie** · dystraktory: niesprawiedliwość, złość, żal

**160.** `id 160` · chłopak, 16 l.  
*Osiemdziesiąta piąta minuta meczu Ligi Mistrzów. Mama woła do zmywania, 16-latek wstaje z pilotem w ręce.*  
„Teraz? Pięć minut do końca i akurat teraz? Zawsze w najgorszym momencie, zawsze.”  
→ emocja: **złość** · dystraktory: frustracja, niesprawiedliwość, bunt

**161.** `id 161` · chłopak, 17 l.  
*17-latek wraca o 20 z korepetycji. Tata od progu mówi o nieposprzątanym pokoju.*  
„Wyszedłem o siódmej rano, wracam o ósmej wieczorem. Kiedy ja mam niby sprzątać? W nocy?”  
→ emocja: **bezsilność** · dystraktory: przytłoczenie, złość, żal

**162.** `id 162` · chłopak, 13 l.  
*13-latek wraca ze spaceru z psem w deszczu. Jego siedemnastoletni brat siedzi w pokoju przy grze.*  
„Pies jest «nasz», a wychodzę z nim tylko ja. On ma siedemnaście lat i w tym tygodniu nawet smyczy nie dotknął.”  
→ emocja: **niesprawiedliwość** · dystraktory: złość, żal, frustracja

**163.** `id 163` · dziewczyna, 15 l.  
*15-latka umyła podłogę w kuchni. Po chwili widzi, jak mama bierze mop i myje ją jeszcze raz.*  
„To po co ja to robiłam? Jak i tak zrobisz po mnie, to następnym razem zrób od razu.”  
→ emocja: **frustracja** · dystraktory: upokorzenie, złość, bezsilność

**164.** `id 164` · chłopak, 18 l.  
*Piątek wieczór. Ojciec ogłasza, że w sobotę cała rodzina sprząta garaż, a 18-latek ma od tygodnia umówiony wyjazd.*  
„Nie. Mam plany od tygodnia. Nie można tak po prostu ogłosić, że moja sobota jest wasza.”  
→ emocja: **bunt** · dystraktory: złość, niesprawiedliwość, frustracja

**165.** `id 165` · dziewczyna, 15 l.  
*Tata prosi o zrobienie kolacji dla rodziny. 15-latka patrzy w stronę pokoju, w którym jej szesnastoletni brat gra na konsoli.*  
„Czemu ja? Bo jestem dziewczyną? On ma dwie ręce, a nikt go nie prosi o kolację.”  
→ emocja: **złość** · dystraktory: niesprawiedliwość, bunt, upokorzenie

**166.** `id 166` · chłopak, 14 l.  
*14-latek słucha, jak tata po raz kolejny opowiada, że sam w jego wieku pomagał od świtu w gospodarstwie. Przewraca oczami.*  
„«Ja w twoim wieku». Wiem, słyszałem to sto razy. Tylko że ja nie jestem tobą.”  
→ emocja: **frustracja** · dystraktory: złość, bunt, upokorzenie

**167.** `id 167` · dziewczyna, 13 l.  
*13-latka wraca o 18 z zajęć, zdejmuje buty i siada na kanapie. Po minucie mama woła ją do pomocy w kuchni.*  
„Minutę. Usiadłam minutę temu. Nigdy nie mogę po prostu usiąść, zawsze coś jest do zrobienia.”  
→ emocja: **przytłoczenie** · dystraktory: żal, złość, bezsilność

### Wstyd przez rodzica przy ludziach (żarty, zdrobnienia, wtrącanie się, czułości publicznie) (10)

**168.** `id 168` · dziewczyna, 15 l.  
*Niedzielny obiad z ciocią i kuzynkami. Mama opowiada przy stole, że 15-latka „ma kogoś na oku”. Córka wstaje od stołu.*  
„Powiedziałam ci to w tajemnicy. W tajemnicy! A ty przy wszystkich, jakby to był żart z telewizji.”  
→ emocja: **upokorzenie** · dystraktory: złość, wstyd, żal

**169.** `id 169` · chłopak, 16 l.  
*16-latek stoi z kolegami pod szkołą. Mama podjeżdża i przez otwarte okno woła go domowym zdrobnieniem.*  
„Nie przy ludziach. Nigdy.”  
→ emocja: **wstyd** · dystraktory: upokorzenie, złość, żal

**170.** `id 170` · chłopak, 14 l.  
*14-latek wychodzi ze szkoły z kolegami. Tata czekający przy bramie głośno każe mu zapiąć kurtkę.*  
„«Zapnij kurtkę». Na cały chodnik. Oni będą mi to powtarzać do końca roku.”  
→ emocja: **upokorzenie** · dystraktory: wstyd, złość, bezsilność

**171.** `id 171` · chłopak, 15 l.  
*15-latek stoi po meczu z drużyną, kiedy mama podchodzi i całuje go w czubek głowy. W samochodzie on patrzy w okno.*  
„Przy całej drużynie. W głowę. Jak przedszkolaka.”  
→ emocja: **złość** · dystraktory: wstyd, upokorzenie, żal

**172.** `id 172` · dziewczyna, 17 l.  
*Spotkanie ze znajomymi rodziców. 17-latka słyszy z kuchni, jak tata mówi, że ona jeszcze nie wie, co chce robić w życiu, i po wyjściu gości staje w drzwiach.*  
„Mówisz o mnie przy ludziach jak o problemie. «Jeszcze nie wie». Jakbym była zepsuta.”  
→ emocja: **żal** · dystraktory: upokorzenie, złość, wstyd

**173.** `id 173` · chłopak, 14 l.  
*Po treningu mama podchodzi do trenera i przy całej drużynie pyta, czy 14-latek się stara. W drodze do domu on długo milczy.*  
„Zapytałaś trenera, czy się staram. Przy wszystkich. Teraz jestem ten, którego mama sprawdza.”  
→ emocja: **wstyd** · dystraktory: upokorzenie, złość, bezsilność

**174.** `id 174` · dziewczyna, 15 l.  
*15-latka odprowadza koleżankę do drzwi. Tata na pożegnanie żartuje z jej nowej fryzury, a koleżanka wychodzi bez słowa.*  
„Zażartowałeś z jej włosów. Przy niej. Ona już tu nie wróci i nawet nie wiesz, co zrobiłeś.”  
→ emocja: **złość** · dystraktory: wstyd, żal, bezsilność

**175.** `id 175` · chłopak, 13 l.  
*13-latek siedzi z tyłu w samochodzie. Mama przyszła po niego na urodziny kolegi pół godziny przed końcem i przez ten czas rozmawiała w kuchni z rodzicami kolegi.*  
„Opowiedziałaś im o mojej alergii i o tym, że śpię przy lampce. Wszyscy to słyszeli. Wszyscy.”  
→ emocja: **wstyd** · dystraktory: upokorzenie, złość, żal

**176.** `id 176` · dziewczyna, 15 l.  
*15-latka wrzuciła zdjęcie z koleżankami. Pierwszy komentarz pod spodem jest od mamy, z serduszkami i „moja piękna córeczka”.*  
„Usuń to. Teraz. Wszyscy to widzą, a ja nie mogę zablokować własnej mamy.”  
→ emocja: **upokorzenie** · dystraktory: wstyd, złość, bezsilność

**177.** `id 177` · chłopak, 15 l.  
*Dzień po wywiadówce. 15-latek wraca ze szkoły i zamiast do pokoju idzie prosto do mamy.*  
„Zapytałaś przy wszystkich rodzicach, czemu nie mam kolegów. Mama kumpla mu powiedziała, a on całej klasie.”  
→ emocja: **upokorzenie** · dystraktory: złość, wstyd, bezsilność

### Presja na wyniki i przyszłość („to nie zawód”, codzienne sprawdzanie ocen) (7)

**178.** `id 178` · chłopak, 16 l.  
*16-latek wraca ze szkoły. Tata wita go w drzwiach pytaniem o trójkę z angielskiego, którą pół godziny temu wpisano w Librusie.*  
„Zanim wejdę do domu, ty już wiesz. Nie muszę nic mówić, nigdy. Librus mówi za mnie.”  
→ emocja: **bezsilność** · dystraktory: złość, przytłoczenie, bunt

**179.** `id 179` · dziewczyna, 17 l.  
*17-latka pokazuje tacie stronę kierunku grafika na uczelni. Tata mówi, że to nie jest zawód.*  
„Nie zawód. Jasne. Rysuję od ósmego roku życia, a ty widzisz w tym hobby na emeryturę.”  
→ emocja: **żal** · dystraktory: złość, odrzucenie, rozczarowanie

**180.** `id 180` · chłopak, 15 l.  
*15-latek przynosi sprawdzian z chemii z piątką. Mama pyta, czy ktoś dostał szóstkę.*  
„Piątka. A ty pytasz o szóstkę. Nigdy dość.”  
→ emocja: **rozczarowanie** · dystraktory: żal, bezsilność, złość

**181.** `id 181` · dziewczyna, 14 l.  
*Dzień wyników egzaminu ósmoklasisty. 14-latka wraca od koleżanki, mama jeszcze w drzwiach pyta: „Ile?”*  
„«Ile». Nie «jak było». Tylko «ile».”  
→ emocja: **smutek** · dystraktory: żal, złość, rozczarowanie

**182.** `id 182` · chłopak, 17 l.  
*17-latek odczytuje z kalendarza na lodówce, że od wtorku ma korepetycje z matematyki, o których nikt z nim nie rozmawiał.*  
„Zapisałaś mnie bez pytania. Jak psa do weterynarza.”  
→ emocja: **złość** · dystraktory: bunt, bezsilność, niesprawiedliwość

**183.** `id 183` · dziewczyna, 16 l.  
*Sobota. 16-latka stoi ubrana do wyjścia, mama właśnie powiedziała, że córka zostaje w domu, bo w poniedziałek ma sprawdzian.*  
„Umiem to. Mogę ci wyrecytować całość, a ty i tak «zostajesz». Co jeszcze mam zrobić?”  
→ emocja: **niesprawiedliwość** · dystraktory: złość, bezsilność, frustracja

**184.** `id 184` · chłopak, 18 l.  
*18-latek po maturze mówi przy obiedzie, że złożył papiery na kulturoznawstwo. Ojciec odkłada widelec i zaczyna o medycynie.*  
„To moje życie. Nie twoja druga szansa na medycynę. Złożyłem i nie cofnę.”  
→ emocja: **bunt** · dystraktory: złość, bezsilność, żal

### Porównywanie i faworyzowanie rodzeństwa (6)

**185.** `id 185` · dziewczyna, 15 l.  
*15-latka pokazuje mamie dyplom z konkursu szkolnego. Mama mówi, że starsza siostra w tym wieku była już w finale wojewódzkim.*  
„Zawsze ona. Przychodzę z czymś swoim i słyszę o niej. Jakby mnie nie było.”  
→ emocja: **żal** · dystraktory: niesprawiedliwość, zazdrość, złość

**186.** `id 186` · chłopak, 14 l.  
*Przy kolacji tata chwali młodszego brata za czwórkę z dyktanda. 14-latek odsuwa talerz, w plecaku ma sprawdzian z piątką.*  
„On dostaje brawa za czwórkę. Ja przyniosłem piątkę i cisza. Nikt nawet nie zapytał.”  
→ emocja: **zazdrość** · dystraktory: niesprawiedliwość, żal, smutek

**187.** `id 187` · dziewczyna, 16 l.  
*Goście w salonie. Mama opowiada o sukcesach starszej siostry i przechodzi do innego tematu, 16-latka wychodzi z pokoju.*  
„O niej dziesięć minut. O mnie zero, nawet nie «a to młodsza». Jakbym stała za szybą.”  
→ emocja: **odrzucenie** · dystraktory: zazdrość, żal, smutek

**188.** `id 188` · chłopak, 17 l.  
*17-latek dostał odmowę weekendowego wyjazdu, na który jego starszy brat w tym samym wieku dostał zgodę.*  
„On mógł w moim wieku. Bo «on był odpowiedzialny». A ja co, jestem gorszy?”  
→ emocja: **niesprawiedliwość** · dystraktory: złość, zazdrość, żal

**189.** `id 189` · chłopak, 13 l.  
*13-latek prosi o smartfon zamiast starego telefonu z klawiszami. Tata mówi, że jeszcze za wcześnie, choć jego siostra dostała swój w wieku dwunastu lat.*  
„Ona dostała smartfon na dwunaste urodziny. Ja mam trzynaście i «jeszcze za wcześnie». Jakie są zasady, bo ja ich nie znam?”  
→ emocja: **złość** · dystraktory: niesprawiedliwość, zazdrość, bunt

**190.** `id 190` · chłopak, 15 l.  
*Wizyta u cioci. 15-latek słucha, jak mama wypytuje kuzyna o olimpiadę z matematyki, a potem pyta syna, czy on też by nie spróbował.*  
„Nie jestem nim. Nigdy nie będę. Możesz przestać patrzeć na mnie jak na gorszą wersję?”  
→ emocja: **smutek** · dystraktory: upokorzenie, zazdrość, żal

### Złamane obietnice i nadszarpnięte zaufanie (6)

**191.** `id 191` · chłopak, 14 l.  
*14-latek wraca z meczu, na który tata obiecał przyjść. Miejsce obok innych rodziców było puste.*  
„Obiecałeś. Strzeliłem gola i patrzyłem na trybuny.”  
→ emocja: **rozczarowanie** · dystraktory: żal, smutek, złość

**192.** `id 192` · dziewczyna, 16 l.  
*16-latka opowiedziała mamie o kłótni z przyjaciółką pod warunkiem, że zostanie to między nimi. Dziś babcia zapytała ją o to przez telefon.*  
„Obiecałaś. «Zostanie między nami». Babcia wie, komu jeszcze powiedziałaś?”  
→ emocja: **żal** · dystraktory: złość, upokorzenie, bezsilność

**193.** `id 193` · chłopak, 17 l.  
*17-latek trzeci raz pyta o obiecany kurs prawa jazdy, który miał zacząć trzy miesiące przed osiemnastką. Tata znów mówi: „może później”.*  
„Trzeci raz «może później». Mówiłeś «na pewno». Wszyscy w klasie już jeżdżą, a ja dalej czekam na «później».”  
→ emocja: **frustracja** · dystraktory: rozczarowanie, złość, bezsilność

**194.** `id 194` · dziewczyna, 14 l.  
*Sobota rano. Tata odwołuje przez pracę wspólny wyjazd do kina i na pizzę, trzeci raz w tym miesiącu. 14-latka zdejmuje kurtkę.*  
„Trzeci raz. Już nawet nie jestem zdziwiona.”  
→ emocja: **smutek** · dystraktory: żal, rozczarowanie, tęsknota

**195.** `id 195` · chłopak, 15 l.  
*15-latek przynosi świadectwo ze średnią, za którą mama obiecała podwyżkę kieszonkowego. Mama mówi, że teraz nie jest dobry moment.*  
„Umowa była jasna: cztery pięć, mam cztery sześć. Ja się wywiązałem, a ty nagle «nie ten moment».”  
→ emocja: **niesprawiedliwość** · dystraktory: złość, rozczarowanie, żal

**196.** `id 196` · dziewczyna, 17 l.  
*17-latka wraca z wernisażu szkolnej wystawy, na której wisiały jej prace. Mama obiecała przyjść i dotarła po zakończeniu.*  
„Każdy miał kogoś. Każdy. Stałam przy swoich obrazach jak sprzedawczyni w pustym sklepie.”  
→ emocja: **samotność** · dystraktory: żal, rozczarowanie, smutek

### Najtrudniejsze zdania wprost po kłótni (4)

**197.** `id 197` · chłopak, 15 l.  
*Kłótnia o godzinę powrotu trwała dziesięć minut. 15-latek trzaska drzwiami od pokoju, po chwili je otwiera.*  
„Nienawidzę cię.”  
→ emocja: **złość** · dystraktory: żal, bezsilność, bunt

**198.** `id 198` · dziewczyna, 16 l.  
*16-latka dowiedziała się, że matka jednak zadzwoniła do szkoły w sprawie, którą obiecała zostawić jej do załatwienia samej.*  
„Już ci nie wierzę.”  
→ emocja: **rozczarowanie** · dystraktory: żal, złość, smutek

**199.** `id 199` · chłopak, 18 l.  
*Ojciec w kłótni o oceny nazwał syna leniem. 18-latek stoi w drzwiach swojego pokoju.*  
„Nie lubię cię. Nie jako ojca. Jako człowieka.”  
→ emocja: **żal** · dystraktory: złość, upokorzenie, odrzucenie

**200.** `id 200` · dziewczyna, 14 l.  
*Po kłótni o telefon mama wchodzi do pokoju, żeby dokończyć rozmowę. 14-latka siedzi na łóżku odwrócona do ściany.*  
„Wyjdź. Nie chcę cię widzieć.”  
→ emocja: **bezsilność** · dystraktory: złość, żal, smutek

## Inne pytania i przykłady w aplikacji

### Scenka próbna (onboarding, przy pierwszym uruchomieniu)

🟢 Poziom 1. Scenka stała, spoza bazy (pochodzi z poprzedniej wersji bazy); ta sama wypowiedź jest przykładem w pomocy „Jak reagować?” i w przykładach kalibrujących prompt oceny AI.

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

*15-latek wraca ze szkoły. Rzuca plecak, zamyka się w pokoju. Po chwili wychodzi i mówi:*  
„Nikt mnie nie lubi. Siedzę na przerwie sam jak palec, a oni udają, że mnie nie widzą.”  
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

1. **Źródło: pula v2** (200 scenek) z sesji „Scenki v2”, gałąź `scenki-v2`, commit `6f0767e`, wklejona do aplikacji w miejsce poprzedniej bazy. Poprzednia baza 200 scenek zostaje w historii gita (commit `fb6a255`). Numery `id` 1-200, bez luk i duplikatów.
2. **Poziomy:** poziom 1: 80, poziom 2: 45, poziom 3: 75; 21 sfer opisanych komentarzami w kodzie bazy.
3. **Zapamiętane losowania:** numery 1-200 wskazują teraz inne scenki niż w poprzedniej bazie, więc aplikacja (stała `DB_VER=2`) jednorazowo zeruje u powracających użytkowników listę już wylosowanych scenek. Statystyki, poziom, odznaki i seria zostają.
4. **Rodzic w scenkach:** mama pojawia się w 43 scenkach, tata w 33; w pozostałych rodzic nie jest nazwany. Interfejs nadal zwraca się do użytkownika w rodzaju męskim („Co poczułeś”, „żebyś nie zgubił serii”).
5. **Słownik emocji:** w polach `emo` i `dist` występuje 17 różnych słów, z czego 5 nie ma na „Mapie emocji” (panel 🧭 w aplikacji): bunt, niesprawiedliwość, przytłoczenie, zazdrość, żal.
6. **Wyzwanie dla znajomego** zawsze wysyła ten sam quiz (bez losowania).
