// Ekstrakcja bazy scenek (SCENARIOS_DB) z index.html aplikacji "Usłysz Mnie".
// Użycie: node extract.js <index.html> <katalog_wyjściowy> <commit> <data>
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const [, , srcPath, outDir, commit, date] = process.argv;
const lines = fs.readFileSync(srcPath, "utf8").split("\n");

const start = lines.findIndex(l => l.startsWith("const SCENARIOS_DB = ["));
const end = lines.findIndex((l, i) => i > start && l.startsWith("];"));
if (start < 0 || end < 0) throw new Error("Nie znaleziono SCENARIOS_DB");

// Kontrola: cała tablica wyliczona naraz musi dać to samo co parsowanie linia po linii
const whole = vm.runInNewContext("(" + lines.slice(start, end + 1).join("\n").replace(/^const SCENARIOS_DB = /, "").replace(/;\s*$/, "") + ")");

const LEVELS = {
  1: { emoji: "🟢", name: "emocja czytelna, łatwa do nazwania", ui: "Podstawy" },
  2: { emoji: "🟡", name: "kusi, żeby doradzać i naprawiać", ui: "Trudniej się powstrzymać" },
  3: { emoji: "🔴", name: "nastolatek zły NA rodzica", ui: "Kiedy to o Ciebie chodzi" },
};
const EMOTION_MAP = {
  "Złość": ["wściekłość", "irytacja", "frustracja"],
  "Lęk": ["strach", "niepewność", "panika"],
  "Smutek": ["rozczarowanie", "przygnębienie", "tęsknota"],
  "Wstyd": ["upokorzenie", "zażenowanie", "obciach"],
  "Poczucie odrzucenia": ["samotność", "poczucie bycia niewidzialnym", "poczucie bycia niezrozumianym"],
  "Bezsilność": ["bezradność", "beznadzieja", "zniechęcenie"],
};

let level = null, section = "";
const scenes = [];
for (let i = start + 1; i < end; i++) {
  const l = lines[i].trim();
  const lv = l.match(/^\/\/ POZIOM (\d)/);
  if (lv) { level = +lv[1]; section = ""; continue; }
  const sec = l.match(/^\/\/ --- (.+?) ---$/);
  if (sec) { section = sec[1]; continue; }
  if (!l.startsWith("{id:")) continue;
  const o = vm.runInNewContext("(" + l.replace(/,\s*$/, "") + ")");
  if (o.lv !== level) throw new Error(`id ${o.id}: lv=${o.lv} w sekcji poziomu ${level}`);
  if (o.sex !== "m" && o.sex !== "f") throw new Error("Brak pola sex: id " + o.id);
  const g = o.sex === "f" ? "dziewczyna" : "chłopak";
  scenes.push({
    nr: scenes.length + 1,
    id: o.id,
    poziom: o.lv,
    sekcja: section || "(bez podziału)",
    linia_w_index_html: i + 1,
    wiek: +o.ctx.match(/(\d+)-lat/)[1],
    plec: g,
    kontekst: o.ctx,
    wypowiedz: o.says,
    emocja: o.emo,
    dystraktory: o.dist,
  });
}
if (scenes.length !== whole.length) throw new Error(`Rozbieżność: ${scenes.length} vs ${whole.length}`);
scenes.forEach((s, k) => {
  const w = whole[k];
  if (w.id !== s.id || w.ctx !== s.kontekst || w.says !== s.wypowiedz || w.emo !== s.emocja || JSON.stringify(w.dist) !== JSON.stringify(s.dystraktory))
    throw new Error("Rozbieżność przy id " + s.id);
});

fs.mkdirSync(outDir, { recursive: true });

// ── JSON ──
fs.writeFileSync(path.join(outDir, "scenki.json"), JSON.stringify({
  zrodlo: "index.html, tablica SCENARIOS_DB", commit, data_eksportu: date, liczba: scenes.length,
  poziomy: LEVELS, mapa_emocji_w_aplikacji: EMOTION_MAP, scenki: scenes,
}, null, 2) + "\n");

// ── CSV (separator ";" + BOM: polski Excel otwiera dwuklikiem) ──
const q = v => `"${String(v ?? "").replace(/"/g, '""')}"`;
const head = ["nr", "id", "poziom", "sekcja", "wiek", "płeć", "kontekst", "wypowiedź nastolatka", "emocja docelowa", "dystraktor 1", "dystraktor 2", "dystraktor 3", "linia w index.html"];
const rows = scenes.map(s => [s.nr, s.id, s.poziom, s.sekcja, s.wiek, s.plec, s.kontekst, s.wypowiedz, s.emocja, ...s.dystraktory, s.linia_w_index_html]);
fs.writeFileSync(path.join(outDir, "scenki.csv"), "﻿" + [head, ...rows].map(r => r.map(q).join(";")).join("\r\n") + "\r\n");

// ── Statystyki ──
const count = (arr, f) => arr.reduce((m, x) => (m[f(x)] = (m[f(x)] || 0) + 1, m), {});
const byLv = lv => scenes.filter(s => s.poziom === lv);
const ages = arr => { const a = arr.map(s => s.wiek); return `${Math.min(...a)}-${Math.max(...a)}`; };
const emoAll = count(scenes, s => s.emocja);
const emoSorted = Object.keys(emoAll).sort((a, b) => emoAll[b] - emoAll[a] || a.localeCompare(b, "pl"));
// "odrzucenie" liczone jako obecne dzięki grupie "Poczucie odrzucenia"
const mapWords = new Set([...Object.entries(EMOTION_MAP).flatMap(([k, v]) => [k.toLowerCase(), ...v]), "odrzucenie"]);
const allEmoWords = [...new Set(scenes.flatMap(s => [s.emocja, ...s.dystraktory]))].sort((a, b) => a.localeCompare(b, "pl"));
const notOnMap = allEmoWords.filter(w => !mapWords.has(w));
const maxId = Math.max(...scenes.map(s => s.id));
const missing = []; for (let i = 1; i <= maxId; i++) if (!scenes.some(s => s.id === i)) missing.push(i);

// ── Markdown ──
const md = [];
const p = (...x) => md.push(...x);
p(`# Usłysz Mnie: pytania w aplikacji`, ``,
  `Eksport z \`index.html\` (tablica \`SCENARIOS_DB\`), commit \`${commit.slice(0, 7)}\`, ${date}.`,
  `Te same dane do arkusza: [\`scenki.csv\`](scenki.csv) (Excel, separator „;”), do dalszej obróbki: [\`scenki.json\`](scenki.json).`, ``,
  `## Spis treści`, ``,
  `1. [Jak wygląda pytanie w aplikacji](#jak-wygląda-pytanie-w-aplikacji)`,
  `2. [Liczby](#liczby)`,
  `3. Scenki`,
  ...[1, 2, 3].map(lv => `   - [Poziom ${lv}: ${LEVELS[lv].name} (${byLv(lv).length})](#poziom-${lv})`),
  `4. [Inne pytania i przykłady w aplikacji](#inne-pytania-i-przykłady-w-aplikacji)`,
  `5. [Uwagi z ekstrakcji](#uwagi-z-ekstrakcji)`, ``);

p(`## Jak wygląda pytanie w aplikacji`, ``,
  `Każda scenka ma ten sam układ ekranu:`, ``,
  `1. Nagłówek: poziom (🟢 / 🟡 / 🔴).`,
  `2. Kontekst sytuacji (pole \`ctx\`).`,
  `3. Wypowiedź nastolatka w cudzysłowie (pole \`says\`).`,
  `4. Pytanie **„Co odpowiadasz?”** i pole na odpowiedź pisaną własnymi słowami.`, ``,
  `Odpowiedź ocenia model AI w skali od 1 do 10 według metody Faber i Mazlish (nazywanie uczuć, echo). Model dostaje tylko poziom, kontekst, wypowiedź nastolatka i odpowiedź rodzica.`, ``,
  `Pola \`emo\` (emocja docelowa) i \`dist\` (trzy dystraktory) są zapisane w bazie przy każdej scence, ale aplikacja ich nigdzie nie wyświetla i nie przekazuje do oceny. W eksporcie są podane, bo mówią, jaką emocję autor scenki miał na myśli.`, ``,
  `Pole \`sex\` (płeć nastolatka: \`m\` albo \`f\`) ustala formy „Nastolatek/Nastolatka”, „zrozumiany/zrozumiana”, „jego/jej” na ekranach i trafia do oceny AI.`, ``,
  `Podział na sekcje w tym eksporcie pochodzi z komentarzy w kodzie bazy; aplikacja go nie wyświetla (dawna etykieta kategorii, losowana niezależnie od treści, jest usunięta).`, ``,
  `Scenka Dnia to jedna z tych samych ${scenes.length} scenek, wybierana na podstawie daty spośród wszystkich poziomów naraz.`, ``);

p(`## Liczby`, ``,
  `| Poziom | Nazwa w menu | Scenek | Chłopcy | Dziewczyny | Wiek |`,
  `|---|---|--:|--:|--:|---|`,
  ...[1, 2, 3].map(lv => { const a = byLv(lv); const g = count(a, s => s.plec); return `| ${LEVELS[lv].emoji} ${lv} | ${LEVELS[lv].ui} | ${a.length} | ${g["chłopak"] || 0} | ${g["dziewczyna"] || 0} | ${ages(a)} |`; }),
  (() => { const g = count(scenes, s => s.plec); return `| **razem** | | **${scenes.length}** | **${g["chłopak"]}** | **${g["dziewczyna"]}** | ${ages(scenes)} |`; })(), ``,
  `Rozkład wieku: ` + Object.entries(count(scenes, s => s.wiek)).map(([a, n]) => `${a} lat (${n})`).join(" · "), ``,
  `### Emocje docelowe (\`emo\`)`, ``,
  `| Emocja | Poz. 1 | Poz. 2 | Poz. 3 | Razem |`,
  `|---|--:|--:|--:|--:|`,
  ...emoSorted.map(e => `| ${e} | ${[1, 2, 3].map(lv => byLv(lv).filter(s => s.emocja === e).length || "").join(" | ")} | ${emoAll[e]} |`), ``);

for (const lv of [1, 2, 3]) {
  const a = byLv(lv);
  p(`<a id="poziom-${lv}"></a>`, ``, `## Poziom ${lv}: ${LEVELS[lv].name} (${a.length})`, ``);
  const secs = [...new Set(a.map(s => s.sekcja))];
  for (const sec of secs) {
    const b = a.filter(s => s.sekcja === sec);
    if (secs.length > 1 || sec !== "(bez podziału)") p(`### ${sec} (${b.length})`, ``);
    for (const s of b) {
      p(`**${s.nr}.** \`id ${s.id}\` · ${s.plec}, ${s.wiek} l.  `,
        `*${s.kontekst}*  `,
        `„${s.wypowiedz}”  `,
        `→ emocja: **${s.emocja}** · dystraktory: ${s.dystraktory.join(", ")}`, ``);
    }
  }
}

p(`## Inne pytania i przykłady w aplikacji`, ``,
  `### Scenka próbna (onboarding, przy pierwszym uruchomieniu)`, ``,
  `🟢 Poziom 1. Scenka stała, spoza bazy (pochodzi z poprzedniej wersji bazy); ta sama wypowiedź jest przykładem w pomocy „Jak reagować?” i w przykładach kalibrujących prompt oceny AI.`, ``,
  `*14-latek siedzi nad obiadem po klasówce. Łyżka krąży w zupie, apetytu brak.*  `,
  `„Starałem się, a i tak wszystko spieprzyłem. Chyba naprawdę jestem do niczego.”  `,
  `Pytanie: **„Co odpowiadasz?”**`, ``,
  `Gdy ocena AI się nie powiedzie, aplikacja pokazuje stałą odpowiedź zastępczą: wynik 7, „Poczuł, że próbujesz go zrozumieć.”, pytanie refleksyjne „Co poczułeś, kiedy czytałeś jego słowa?”.`, ``,
  `### Slajd 3 wprowadzenia`, ``,
  `Dziecko mówi: „Nie dam rady…”  `,
  `✗ ŹLE: „Nie przesadzaj, to nie takie trudne.”  `,
  `✓ DOBRZE: „Widzę, że jest ci ciężko.”`, ``,
  `### Pomoc „Jak reagować?” (przycisk ?)`, ``,
  `| Dziecko mówi | ✓ Spróbuj tak | ✗ Nie tak |`,
  `|---|---|---|`,
  `| „Starałem się, a i tak wszystko spieprzyłem.” | „Tyle pracy — i jakby to nic nie znaczyło.” | „Następnym razem się lepiej przygotuj.” |`,
  `| (gdy jest zły na rodzica) „Nienawidzę cię”, „Zostaw mnie”, „Nie miałaś prawa” | „Czujesz, że zepsułem coś między nami.” | „Nie pozwalam tak do mnie mówić.” |`, ``,
  `Typowe pułapki wymienione w pomocy: „Nie przesadzaj” (bagatelizowanie), „Pogadaj z wychowawcą” (naprawianie), „Jak się pouczysz, to będzie lepiej” (doradzanie), „Ja w twoim wieku…” (porównywanie).`, ``,
  `### Quiz „Czy umiesz słuchać nastolatka?” (\`quiz.html\`, przycisk „Zrób znajomemu wyzwanie”)`, ``,
  `Jedyne pytanie zamknięte w aplikacji. Zawsze to samo, bez losowania.`, ``,
  `*15-latek wraca ze szkoły. Rzuca plecak, zamyka się w pokoju. Po chwili wychodzi i mówi:*  `,
  `„Nikt mnie nie lubi. Siedzę na przerwie sam jak palec, a oni udają, że mnie nie widzą.”  `,
  `Pytanie: **„Co mu powiesz?”**`, ``,
  `| | Odpowiedź | Wynik | Komentarz po wyborze |`,
  `|---|---|---|---|`,
  `| A | Może spróbuj się do nich uśmiechnąć? Ludzie lgną do pozytywnych osób. | ⚡ Pułapka: Rada | Syn mówi „nikt mnie nie lubi”, a słyszy „zrób coś z sobą”. Rada w bólu brzmi jak krytyka — jakby problem był w nim. |`,
  `| B | Siedzisz tam sam... i oni zachowują się, jakbyś był niewidzialny. | ✨ Brawo! | Powtórzyłeś jego doświadczenie własnymi słowami — bez ratowania, bez rady. Poczuł, że ktoś naprawdę go widzi. |`,
  `| C | Nie przejmuj się, w liceum poznasz nowych ludzi i wszystko się zmieni. | ⚡ Pułapka: Pocieszanie | „Nie przejmuj się” to odcięcie od uczucia. Syn słyszy: twój ból nie jest ważny, poczekaj parę lat. |`, ``,
  `Po złej odpowiedzi dodatkowo: „Większość rodziców też wybiera tę opcję. To naturalny odruch.”`, ``,
  `### Pytania i podpowiedzi w interfejsie`, ``,
  `- Pod każdą scenką: „Co odpowiadasz?”`,
  `- Ekran „Moja sytuacja”: „Co powiedział Twój nastolatek? Co się działo?” (z opisu rodzica AI tworzy nową scenkę).`,
  `- Ekran oczekiwania na ocenę (napisy zmieniają się co 1,8 s): „Odpowiedź przyjęta...”, „Jak to usłyszy?”, „Czy poczuje się zrozumiany/zrozumiana?”, „Jak mu/jej to zabrzmi?”.`,
  `- Po trzech słabych odpowiedziach z rzędu (wynik poniżej 6) nad scenką pojawia się jedna losowa podpowiedź:`,
  `  - „Spróbuj powiedzieć to, co widzisz — nie to, co chcesz naprawić.”`,
  `  - „Nie musisz mieć rozwiązania. Wystarczy, że usłyszysz.”`,
  `  - „Nazwij to, co czuje — nawet jednym zdaniem.”`,
  `  - „Pomyśl: co by chciał usłyszeć, żeby poczuć, że go rozumiesz?” (przy dziewczynie: „co by chciała usłyszeć, żeby poczuć, że ją rozumiesz?”)`,
  `  - „Spróbuj być lustrem, nie ratownikiem.”`,
  `  - „Zamiast rady — powiedz, co widzisz w jego oczach.” (przy dziewczynie: „w jej oczach”)`,
  `- Gdy ta sama pułapka wystąpiła co najmniej 3 razy: „Często pojawia się pułapka „…”. To normalne. Spróbuj skupić się na nazywaniu uczuć.”`,
  `- Tekst udostępniania wyniku: „Co odpowiadasz nastolatkowi? 😏”.`, ``,
  `### Treści tworzone przez AI (nie da się ich wyeksportować)`, ``,
  `- Pytanie refleksyjne po każdej ocenie (\`reflection_question\`, „jedno pytanie o przeżycie RODZICA w tej konkretnej sytuacji”).`,
  `- Reakcja nastolatka, „Co działa”, „Na co uważać”, podpowiedzi „Nazwij uczucie” i „Echo”.`,
  `- Scenki z trybu „Moja sytuacja”.`, ``);

const rx = (re, o) => re.test(o.kontekst + " " + o.wypowiedz);
const withMom = scenes.filter(o => rx(/\b(mama|mamy|mamie|mamę|mamą|matka|matki|matce)\b/i, o)).length;
const withDad = scenes.filter(o => rx(/\b(tata|taty|tacie|tatę|tatą|ojciec|ojca|ojcu)\b/i, o)).length;
const sections = [...new Set(scenes.map(s => `${s.poziom}|${s.sekcja}`))].length;
p(`## Uwagi z ekstrakcji`, ``,
  `1. **Źródło: pula v2** (${scenes.length} scenek) z sesji „Scenki v2”, gałąź \`scenki-v2\`, commit \`6f0767e\`, wklejona do aplikacji w miejsce poprzedniej bazy. Poprzednia baza 200 scenek zostaje w historii gita (commit \`fb6a255\`). Numery \`id\` ${Math.min(...scenes.map(s => s.id))}-${maxId}, bez luk i duplikatów.`,
  `2. **Poziomy:** ${[1, 2, 3].map(lv => `poziom ${lv}: ${byLv(lv).length}`).join(", ")}; ${sections} sfer opisanych komentarzami w kodzie bazy.`,
  `3. **Zapamiętane losowania:** numery 1-200 wskazują teraz inne scenki niż w poprzedniej bazie, więc aplikacja (stała \`DB_VER=2\`) jednorazowo zeruje u powracających użytkowników listę już wylosowanych scenek. Statystyki, poziom, odznaki i seria zostają.`,
  `4. **Rodzic w scenkach:** mama pojawia się w ${withMom} scenkach, tata w ${withDad}; w pozostałych rodzic nie jest nazwany. Interfejs nadal zwraca się do użytkownika w rodzaju męskim („Co poczułeś”, „żebyś nie zgubił serii”).`,
  `5. **Słownik emocji:** w polach \`emo\` i \`dist\` występuje ${allEmoWords.length} różnych słów, z czego ${notOnMap.length} nie ma na „Mapie emocji” (panel 🧭 w aplikacji): ${notOnMap.join(", ")}.`,
  `6. **Wyzwanie dla znajomego** zawsze wysyła ten sam quiz (bez losowania).`, ``);

fs.writeFileSync(path.join(outDir, "scenki.md"), md.join("\n"));

console.log(JSON.stringify({
  liczba: scenes.length, plec: count(scenes, s => s.plec), poziomy: count(scenes, s => s.poziom),
  emocje: emoAll, slowa: allEmoWords.length, spoza_mapy: notOnMap,
}, null, 1));
