/* =====================================================================
   Dev Learning — vues dynamiques (Dataview)

   Dans une note :
     ```dataviewjs
     await dv.view("10 — Templates/Scripts/learning", { view: "dashboard" })
     ```
   Vues : dashboard · niveaux · reference · parcours · module · concept · maitrise · revisions · acquis
   Niveaux : chaque notion a « niveau: 0 à 5 ». Seules les notions jusqu'au niveau actuel
   (« niveau_actuel » dans Focus) comptent dans la progression ; le reste est dans « reference ».
   Prérequis : plugin Dataview + « Enable JavaScript Queries ».
   ===================================================================== */

const CFG = {
  dashboard: "00 — Dashboard",
  focus: "00 — Dashboard/Focus",
  modules: "01 — Parcours/Modules",
  courses: "02 — Cours",
  concepts: "03 — Concepts",
  commands: "04 — Commandes",
  errors: "06 — Erreurs et solutions",
  exercises: "07 — Exercices et projets",
  archives: "99 — Archives/Anciens exercices",
};
const LEVELS = [
  "Les bases du poste",
  "Réseau et API",
  "Docker",
  "CI et travail en équipe",
  "Serveur et déploiement",
  "Se perfectionner",
  "Le front, à la demande",
];

const STATUS = {
  "a-decouvrir": { label: "À découvrir", tone: "grey",   score: 0 },
  "en-cours":    { label: "En cours",    tone: "orange", score: 1 },
  "compris":     { label: "Compris",     tone: "blue",   score: 2 },
  "maitrise":    { label: "Maîtrisé",    tone: "green",  score: 3 },
};
const EX_STATUS = {
  "a-faire":  { label: "À faire",  tone: "grey" },
  "en-cours": { label: "En cours", tone: "orange" },
  "reussi":   { label: "Réussi",   tone: "green" },
};
const METHOD = ["Comprendre", "Explorer", "Pratiquer", "Relier", "Réviser"];

const APP = dv.app;
const M = window.moment;
const opts = input || {};
const cur = dv.current();
const today = M().startOf("day");
const root = dv.container.createDiv({ cls: "dw-root" });

/* ---------- utilitaires ---------- */
const noExt = (p) => String(p).replace(/\.md$/, "");
const base = (p) => noExt(p).split("/").pop();
const wiki = (path, label) => `[[${noExt(path)}|${label ?? base(path)}]]`;
const arr = (v) => (!v ? [] : Array.isArray(v) ? v : v.array ? v.array() : [v]);
const resolve = (p) => APP.metadataCache.getFirstLinkpathDest(noExt(p), "")?.path ?? p;
const linkPaths = (v) => arr(v).filter((x) => x && typeof x === "object" && x.path).map((x) => resolve(x.path));
const toM = (d) => (d ? M(d.toISO ? d.toISO() : String(d)) : null);
const st = (s) => STATUS[s] || STATUS["a-decouvrir"];
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

function md(parent, text, cls, tag = "div") {
  const el = dv.el(tag, text, cls ? { cls } : {});
  parent.appendChild(el);
  return el;
}
function panel(parent, title, tone) {
  const p = parent.createDiv({ cls: "dw-panel" + (tone ? " is-" + tone : "") });
  p.createDiv({ cls: "dw-panel-title", text: title });
  return p;
}
const empty = (parent, text) => parent.createDiv({ cls: "dw-empty", text: text || "Rien pour l'instant" });
function bullets(parent, lines, emptyText) {
  if (!lines.length) return empty(parent, emptyText);
  md(parent, lines.map((l) => "- " + l).join("\n"), "dw-list");
}
const badge = (parent, text, tone) => parent.createSpan({ cls: "dw-badge" + (tone ? " is-" + tone : ""), text });
function bar(parent, pct) {
  const b = parent.createDiv({ cls: "dw-progress" });
  b.createDiv({ cls: "dw-progress-fill", attr: { style: `width:${Math.max(0, Math.min(100, pct))}%` } });
}
function stat(parent, value, label, tone) {
  const s = parent.createDiv({ cls: "dw-stat is-" + tone });
  s.createDiv({ cls: "dw-stat-value", text: String(value) });
  s.createDiv({ cls: "dw-stat-label", text: label });
}
const sbadge = (s) => `<span class="dw-badge is-${st(s).tone}">${st(s).label}</span>`;
const exbadge = (s) => `<span class="dw-badge is-${(EX_STATUS[s] || EX_STATUS["a-faire"]).tone}">${(EX_STATUS[s] || EX_STATUS["a-faire"]).label}</span>`;

/* ---------- données ---------- */
const allConcepts = () => dv.pages(`"${CFG.concepts}"`).where((p) => p.type === "concept").array();
// Niveau actuel, lu dans Focus (« niveau_actuel »)
const currentLevel = () => Number(pageOf(CFG.focus)?.niveau_actuel ?? 0);
const lvl = (p) => Number(p.niveau ?? 0);
const inLevel = (p) => lvl(p) <= currentLevel();
// Les vues de progression ne voient que les notions jusqu'au niveau actuel
const concepts = () => allConcepts().filter(inLevel);
const modules = () => dv.pages(`"${CFG.modules}"`).where((p) => p.type === "module").sort((p) => p.order).array();
const exercises = () => dv.pages(`"${CFG.exercises}"`).where((p) => p.type === "exercise" || p.type === "project").array();
function pageOf(path) { return dv.page(path); }

// Étapes du fil rouge (type « exercise » dans « 07 ») qui citent la notion dans leur propriété « concepts »
const exercisesOf = (page) => exercises().filter((e) => e.type === "exercise" && linkPaths(e.concepts).includes(page.file.path));
// Anciens exercices archivés : ceux réussis restent des preuves
const oldProofs = (page) => dv.pages(`"${CFG.archives}"`).where((e) => e.status === "reussi" && linkPaths(e.concepts).includes(page.file.path)).array();
// Mon schéma : la fiche intègre un dessin Excalidraw (fichier *.excalidraw ou *.excalidraw.md)
const hasSchema = (page) => arr(page.file.outlinks).some((l) => /\.excalidraw(\.md)?$/.test(resolve(l.path)));
// Les trois cases d'une notion : je les coche dans ses propriétés (le schéma est aussi détecté tout seul)
function cases(page) {
  const m = mastery(page);
  return {
    schema: page.schema === true || hasSchema(page),
    visuel: page.exercice_visuel === true,
    filRouge: page.fil_rouge === true || m.done > 0,
  };
}
const allCases = (page) => { const c = cases(page); return c.schema && c.visuel && c.filRouge; };
// Statut affiché : « maitrise » seulement si je l'ai mis moi-même ; « compris » dès que les trois cases sont cochées
function eff(page) {
  if (page.status === "maitrise") return "maitrise";
  if (allCases(page)) return "compris";
  const c = cases(page);
  if (page.status === "a-decouvrir" && !c.schema && !c.visuel && !c.filRouge) return "a-decouvrir";
  return "en-cours";
}
const caseLine = (page) => { const c = cases(page); const k = (b) => (b ? "☑" : "☐");
  return `${k(c.schema)} schéma · ${k(c.visuel)} exercices visuels · ${k(c.filRouge)} fil rouge`; };
function mastery(page) {
  // Preuve « appliquer » : les étapes du fil rouge qui utilisent la notion
  const ex = exercisesOf(page);
  return { done: ex.filter((e) => e.status === "reussi").length, total: ex.length, ex };
}
function progress(list) {
  if (!list.length) return 0;
  return Math.round((100 * list.reduce((s, p) => s + st(eff(p)).score, 0)) / (3 * list.length));
}
const conceptsOfModule = (mod) => concepts().filter((c) => linkPaths(c.module).includes(mod.file.path));
function readiness(page) {
  const pre = linkPaths(page.prerequisites).map(pageOf).filter(Boolean);
  const missing = pre.filter((p) => st(eff(p)).score < 2);
  return { pre, missing, ready: missing.length === 0 };
}
const linking = (path, list) => list.filter((p) => arr(p.file.outlinks).some((l) => resolve(l.path) === path));

/* ---------- blocs réutilisés ---------- */
function conceptLine(c, showPre = true) {
  const r = readiness(c);
  const warn = showPre && !r.ready && eff(c) !== "maitrise" ? ` · prérequis : ${r.missing.map((p) => wiki(p.file.path)).join(", ")}` : "";
  return `${wiki(c.file.path)} ${sbadge(eff(c))}${warn}`;
}
function moduleRow(parent, mod) {
  const list = conceptsOfModule(mod);
  const pct = progress(list);
  const row = parent.createDiv({ cls: "dw-row" });
  const top = row.createDiv({ cls: "dw-row-top" });
  md(top, wiki(mod.file.path, `${String(mod.order).padStart(2, "0")} · ${mod.title || base(mod.file.path)}`), "dw-row-name", "span");
  top.createSpan({ cls: "dw-row-pct", text: list.length ? `${pct} %` : "—" });
  bar(row, pct);
  const done = list.filter((c) => st(eff(c)).score >= 2).length;
  const pre = linkPaths(mod.prerequisites).map(pageOf).filter(Boolean);
  const preTxt = pre.length ? " · après " + pre.map((p) => wiki(p.file.path, String(p.order).padStart(2, "0"))).join(", ") : "";
  md(row, `${done}/${list.length} notions comprises${preTxt}`, "dw-row-meta");
}
function methodStrip(parent, page) {
  // Les trois cases de la notion : dessin, exercices visuels, fil rouge
  const c = cases(page);
  const strip = parent.createDiv({ cls: "dl-steps" });
  [["Schéma", c.schema], ["Exercices visuels", c.visuel], ["Fil rouge", c.filRouge]].forEach(([s, ok], i) => {
    strip.createSpan({ cls: "dl-step" + (ok ? " is-done" : ""), text: `${i + 1} ${s}` });
  });
}

// Place d'une notion dans le fil rouge : la première étape qui l'utilise (pour avancer dans l'ordre)
function stepOrder(c) {
  const names = exercisesOf(c).filter((e) => e.niveau !== undefined && e.niveau !== null).map((e) => base(e.file.path)).sort();
  return names.length ? names[0] : "zzz";
}
// Étapes du fil rouge qui valident un niveau (propriété « niveau » des étapes)
const levelSteps = (n) => exercises().filter((e) => e.type === "exercise" && e.niveau !== undefined && e.niveau !== null && Number(e.niveau) === n)
  .sort((a, b) => base(a.file.path).localeCompare(base(b.file.path)));
function levelState(n) {
  const list = allConcepts().filter((c) => lvl(c) === n);
  const understood = list.filter((c) => eff(c) === "compris" || eff(c) === "maitrise").length;
  const steps = levelSteps(n);
  const done = steps.filter((e) => e.status === "reussi").length;
  const ok = list.length > 0 && understood === list.length && steps.length > 0 && done === steps.length;
  const total = list.length + steps.length;
  return { list, understood, steps, done, ok, pct: total ? Math.round((100 * (understood + done)) / total) : 0 };
}
function levelRow(parent, n) {
  const s = levelState(n);
  const row = parent.createDiv({ cls: "dw-row" });
  const top = row.createDiv({ cls: "dw-row-top" });
  top.createSpan({ cls: "dw-row-name", text: `Niveau ${n} · ${LEVELS[n]}` });
  top.createSpan({ cls: "dw-row-pct", text: s.ok ? "validé" : n === currentLevel() ? "en cours" : n < currentLevel() ? "à finir" : "à venir" });
  top.querySelector(".dw-row-pct").textContent += ` · ${s.pct} %`;
  bar(row, s.pct);
  md(row, `${s.understood}/${s.list.length} notions comprises (3 cases cochées) · ${s.done}/${s.steps.length} étapes du fil rouge réussies`, "dw-row-meta");
}

/* ---------- vues ---------- */
function vDashboard() {
  const all = concepts();
  const focus = pageOf(CFG.focus);
  const now = M();

  const hero = root.createDiv({ cls: "dw-hero" });
  hero.createDiv({ cls: "dw-hero-title", text: `Niveau ${currentLevel()} · ${LEVELS[currentLevel()] || ""}` });
  md(hero, cap(now.clone().locale("fr").format("dddd D MMMM YYYY")) + " · une notion à la fois, comprise pour de vrai", "dw-hero-sub");

  const s = root.createDiv({ cls: "dw-stats" });
  stat(s, all.filter((c) => eff(c) === "maitrise").length, "Maîtrisées", "green");
  stat(s, all.filter((c) => eff(c) === "compris").length, "Comprises", "blue");
  stat(s, all.filter((c) => eff(c) === "en-cours").length, "En cours", "orange");
  stat(s, all.filter((c) => eff(c) === "a-decouvrir").length, "À découvrir", "grey");
  stat(s, progress(all) + " %", "Progression", "violet");

  const grid = root.createDiv({ cls: "dw-grid" });

  // Sujet actuel
  const f = panel(grid, "Sujet actuel", "violet");
  const currentPath = focus ? linkPaths(focus.current)[0] : null;
  const current = currentPath ? pageOf(currentPath) : null;
  if (!current) {
    md(f, "Aucun sujet choisi. Ouvre [[Focus]] et renseigne `current`.", "dw-empty");
  } else {
    md(f, `**${wiki(current.file.path)}** ${sbadge(eff(current))}` + (focus.goal ? `<br><span class="dw-row-meta">Objectif : ${focus.goal}</span>` : ""), "dl-current");
    methodStrip(f, current);
    const r = readiness(current);
    const lines = [];
    if (r.pre.length) lines.push("Prérequis : " + r.pre.map((p) => `${wiki(p.file.path)} ${sbadge(eff(p))}`).join(" · "));
    const ex = linking(current.file.path, exercises());
    if (ex.length) lines.push("Pratiquer : " + ex.map((e) => `${wiki(e.file.path)} ${exbadge(e.status)}`).join(" · "));
    const m = mastery(current);
    lines.push(`Mes cases : ${caseLine(current)}`);
    const nextStep = m.ex.find((e) => e.status !== "reussi");
    if (nextStep) lines.push(`Juste après le dessin : ${wiki(nextStep.file.path)} ${exbadge(nextStep.status)}`);
    bullets(f, lines);
    if (!r.ready) md(f, `> [!warning] Prérequis à consolider\n> ${r.missing.map((p) => wiki(p.file.path)).join(", ")} ${r.missing.length > 1 ? "ne sont" : "n'est"} pas encore compris : reviens-y avant d'aller plus loin.`);
  }

  // À apprendre ensuite
  const n = panel(grid, "À apprendre ensuite", "blue");
  const next = focus ? linkPaths(focus.next).map(pageOf).filter(Boolean) : [];
  bullets(n, next.map((c) => {
    const r = readiness(c);
    return `${wiki(c.file.path)} ${sbadge(eff(c))} · ` + (r.ready ? "prêt" : "après " + r.missing.map((p) => wiki(p.file.path)).join(", "));
  }), "Ajoute des notions dans `next` de [[Focus]]");

  // Niveaux
  const pp = panel(grid, `Niveau ${currentLevel()} · ${LEVELS[currentLevel()] || ""}`, "violet");
  levelRow(pp, currentLevel());
  md(pp, "Tous les niveaux : [[Niveaux]] · Le reste du coffre : [[Référence travail]]", "dw-row-meta");
  const items = pp.createDiv({ cls: "dw-items is-wide" });
  modules().filter((mod) => conceptsOfModule(mod).length).forEach((mod) => moduleRow(items, mod));

  // Révisions
  const rv = panel(grid, "À réviser", "orange");
  const due = all.filter((c) => c.next_review && toM(c.next_review).isSameOrBefore(today, "day")).sort((a, b) => toM(a.next_review) - toM(b.next_review));
  const toConfirm = all.filter((c) => eff(c) === "maitrise" && !hasSchema(c));
  bullets(rv, [
    ...due.map((c) => `${wiki(c.file.path)} ${sbadge(eff(c))} · prévue le ${toM(c.next_review).format("DD/MM")}`),
    ...toConfirm.map((c) => `${wiki(c.file.path)} · maîtrisée, mais pas encore dessinée`),
  ], "Rien à réviser aujourd'hui");

  // Exercices visuels : notions travaillées dont le schéma n'est pas encore fait
  const vx = panel(grid, `Ce qui reste au niveau ${currentLevel()}`, "blue");
  const left = all.filter((c) => lvl(c) === currentLevel() && eff(c) !== "compris" && eff(c) !== "maitrise")
    .sort((a, b) => String(stepOrder(a)).localeCompare(String(stepOrder(b))));
  bullets(vx, left.slice(0, 10).map((c) => `${wiki(c.file.path)} · ${caseLine(c)}`).concat(left.length > 10 ? [`… et ${left.length - 10} autres, voir [[Niveaux]]`] : []),
    "Toutes les notions du niveau sont comprises");

  // Fil rouge du niveau actuel
  const xp = panel(grid, "Fil rouge du niveau", "green");
  bullets(xp, levelSteps(currentLevel()).map((e) => `${wiki(e.file.path)} ${exbadge(e.status)}`), "Pas encore d'étape pour ce niveau");

  // Erreurs récentes
  const er = panel(grid, "Erreurs récentes", "red");
  bullets(er, dv.pages(`"${CFG.errors}"`).where((p) => p.type === "error").sort((p) => p.file.ctime, "desc").limit(4).array()
    .map((p) => wiki(p.file.path)), "Aucune erreur documentée");

  const q = panel(grid, "Accès rapide", "violet");
  md(q, ["Focus", "Niveaux", "Référence travail", "Parcours", "Méthode d'apprentissage", "Chemins de compréhension", "Cours", "Concepts", "Commandes", "Fiches pratiques", "Erreurs et solutions", "Exercices et projets", "Révisions", "Ressources", "Guide"]
    .map((x) => `[[${x}]]`).join(" "), "dw-links");
}

function vParcours() {
  const grid = root.createDiv({ cls: "dw-grid" });
  for (const mod of modules()) {
    const p = panel(grid, `${String(mod.order).padStart(2, "0")} · ${mod.title}`, progress(conceptsOfModule(mod)) >= 66 ? "green" : conceptsOfModule(mod).some((c) => st(eff(c)).score > 0) ? "orange" : "grey");
    moduleRow(p, mod);
    if (mod.why) md(p, `**Pourquoi ici :** ${mod.why}`, "dw-row-meta");
  }
}

function vModule() {
  const list = conceptsOfModule(cur);
  const grid = root.createDiv({ cls: "dw-grid" });
  const pr = panel(grid, "Progression", "violet");
  moduleRow(pr, cur);
  const pre = linkPaths(cur.prerequisites).map(pageOf).filter(Boolean);
  if (pre.length) bullets(pr, pre.map((m) => `Prérequis : ${wiki(m.file.path)} · ${progress(conceptsOfModule(m))} %`));

  // Chaque cours, puis les notions qu'il aborde (dans l'ordre de sa propriété « concepts »)
  const courses = dv.pages(`"${CFG.courses}"`).where((p) => p.type === "course" && linkPaths(p.module).includes(cur.file.path)).array()
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99) || base(a.file.path).localeCompare(base(b.file.path)));
  const seen = new Set();
  courses.forEach((co, i) => {
    const p = panel(grid, `Cours ${i + 1}`, "orange");
    md(p, `**${wiki(co.file.path, base(co.file.path).replace(/^Cours - /, ""))}**`, "dl-current");
    const notions = linkPaths(co.concepts).map(pageOf).filter((x) => x && x.type === "concept" && inLevel(x));
    notions.forEach((x) => seen.add(x.file.path));
    bullets(p, notions.map((x) => conceptLine(x, false)), "Aucune notion listée dans ce cours");
  });
  if (!courses.length) empty(panel(grid, "Cours", "orange"), "Aucun cours pour l'instant");

  const rest = list.filter((x) => !seen.has(x.file.path)).sort((a, b) => st(eff(b)).score - st(eff(a)).score);
  if (rest.length || !list.length) {
    const c = panel(grid, courses.length ? "Autres notions du module" : "Notions du module", "blue");
    bullets(c, rest.map((x) => conceptLine(x, false)), "Aucune notion rattachée — template *Concept* avec ce module");
  }

  const hidden = allConcepts().filter((c) => linkPaths(c.module).includes(cur.file.path) && !inLevel(c));
  if (hidden.length) md(panel(grid, "Plus tard", "grey"), `${hidden.length} notion${hidden.length > 1 ? "s" : ""} de ce module ${hidden.length > 1 ? "sont" : "est"} d'un niveau supérieur : voir [[Référence travail]].`, "dw-row-meta");

  const ex = panel(grid, "Fil rouge", "green");
  const paths = new Set([...list.map((x) => x.file.path), ...seen]);
  bullets(ex, exercises().filter((e) => linkPaths(e.concepts).some((p) => paths.has(p)))
    .map((e) => `${wiki(e.file.path)} ${exbadge(e.status)}`), "Aucun exercice relié");
}

function vConcept() {
  const box = root.createDiv({ cls: "dl-concept" });
  const head = box.createDiv({ cls: "dl-concept-head" });
  md(head, sbadge(eff(cur)) + ` <span class="dw-badge">Niveau ${lvl(cur)}</span>` + (cur.level ? ` <span class="dw-badge">${cur.level}</span>` : "") +
    (cur.module ? " · " + linkPaths(cur.module).map((p) => wiki(p)).join(", ") : ""), "", "span");
  methodStrip(box, cur);
  const lines = [];
  if (!inLevel(cur)) lines.push(`**Hors de ton niveau** (tu es au niveau ${currentLevel()}) : fiche de référence, elle ne compte pas encore dans ta progression.`);
  const r = readiness(cur);
  if (r.pre.length) lines.push("**Prérequis** : " + r.pre.map((p) => `${wiki(p.file.path)} ${sbadge(eff(p))}`).join(" · "));
  const usedBy = concepts().filter((c) => linkPaths(c.prerequisites).includes(cur.file.path) || linkPaths(c.parents).includes(cur.file.path));
  if (usedBy.length) lines.push("**Mène à** : " + usedBy.map((c) => wiki(c.file.path)).join(" · "));
  const ex = linking(cur.file.path, exercises());
  if (ex.length) lines.push("**Fil rouge** : " + ex.map((e) => `${wiki(e.file.path)} ${exbadge(e.status)}`).join(" · "));
  const cmds = linking(cur.file.path, dv.pages(`"${CFG.commands}"`).where((p) => p.type === "command").array());
  if (cmds.length) lines.push("**Commandes** : " + cmds.map((c) => wiki(c.file.path)).join(" · "));
  lines.push(`**Mes cases** : ${caseLine(cur)}` + (allCases(cur) && eff(cur) !== "maitrise" ? " — notion comprise ; « Maîtrisé », c'est toi qui le mets quand tu le sens" : ""));
  if (cur.next_review) lines.push(`**Prochaine révision** : ${toM(cur.next_review).format("DD/MM/YYYY")}`);
  bullets(box, lines);
}

function vMaitrise() {
  // Trois cases : schéma, exercices visuels, fil rouge. Les trois → « Compris ». « Maîtrisé » : moi seul, quand je le sens.
  const c = cases(cur);
  const m = mastery(cur);
  const ok = (b) => (b ? "✅" : "⬜");
  const lines = [
    `${ok(c.schema)} **Mon schéma du concept** : ${c.schema ? "fait" : "à dessiner, puis cocher « schema » dans les propriétés"}`,
    `${ok(c.visuel)} **Exercices visuels réussis** : ${c.visuel ? "oui" : "cocher « exercice_visuel » quand ils sont faits et corrigés"}`,
    `${ok(c.filRouge)} **Appliqué dans le fil rouge** : ` + (m.total ? m.ex.map((e) => `${wiki(e.file.path)} ${exbadge(e.status)}`).join(" · ") : "cocher « fil_rouge » quand je l'ai appliqué"),
  ];
  const old = oldProofs(cur);
  if (old.length) lines.push(`Anciennes preuves : ${old.map((e) => wiki(e.file.path)).join(" · ")}`);
  bullets(root, lines);
  if (eff(cur) === "maitrise") md(root, "> [!success] Maîtrisé\n> C'est toi qui l'as décidé.");
  else if (allCases(cur)) md(root, "> [!success] Compris\n> Les trois cases sont cochées. Tu passeras le statut en « maitrise » quand tu le sentiras.");
}

function vRevisions() {
  const all = concepts();
  const grid = root.createDiv({ cls: "dw-grid" });
  const due = panel(grid, "À réviser aujourd'hui", "orange");
  bullets(due, all.filter((c) => c.next_review && toM(c.next_review).isSameOrBefore(today, "day"))
    .sort((a, b) => toM(a.next_review) - toM(b.next_review))
    .map((c) => `${wiki(c.file.path)} ${sbadge(eff(c))} · prévue le ${toM(c.next_review).format("DD/MM")}`), "Rien de prévu aujourd'hui");
  const soon = panel(grid, "Cette semaine", "blue");
  bullets(soon, all.filter((c) => c.next_review && toM(c.next_review).isAfter(today, "day") && toM(c.next_review).isSameOrBefore(today.clone().add(7, "days"), "day"))
    .sort((a, b) => toM(a.next_review) - toM(b.next_review))
    .map((c) => `**${toM(c.next_review).clone().locale("fr").format("ddd DD/MM")}** ${wiki(c.file.path)}`), "Rien cette semaine");
  const draw = panel(grid, "Exercices visuels à faire (notions travaillées sans schéma)", "red");
  bullets(draw, all.filter((c) => eff(c) !== "a-decouvrir" && !hasSchema(c))
    .map((c) => `${wiki(c.file.path)} ${sbadge(eff(c))}`), "Toutes les notions travaillées ont leur schéma");
  const up = panel(grid, "À faire interroger (schéma fait et fil rouge réussi)", "green");
  bullets(up, all.filter((c) => eff(c) !== "maitrise" && hasSchema(c)).filter((c) => { const m = mastery(c); return m.total && m.done === m.total; })
    .map((c) => wiki(c.file.path)), "Aucune pour l'instant");
  const never = panel(grid, "Comprises mais sans révision prévue", "grey");
  bullets(never, all.filter((c) => (eff(c) === "compris" || eff(c) === "maitrise") && !c.next_review).map((c) => wiki(c.file.path)), "—");
}

function vAcquis() {
  const all = concepts();
  const s = root.createDiv({ cls: "dw-stats" });
  Object.entries(STATUS).reverse().forEach(([k, v]) => stat(s, all.filter((c) => eff(c) === k).length, v.label, v.tone));
  const grid = root.createDiv({ cls: "dw-grid" });
  for (const mod of modules()) {
    const list = conceptsOfModule(mod);
    if (!list.length) continue;
    const p = panel(grid, `${String(mod.order).padStart(2, "0")} · ${mod.title} · ${progress(list)} %`, "violet");
    bullets(p, list.sort((a, b) => st(eff(b)).score - st(eff(a)).score).map(conceptLine));
  }
}

function vNiveaux() {
  const grid = root.createDiv({ cls: "dw-grid" });
  LEVELS.forEach((label, n) => {
    const s = levelState(n);
    const p = panel(grid, `Niveau ${n} · ${label}` + (n === currentLevel() ? " · niveau actuel" : ""), s.ok ? "green" : n === currentLevel() ? "violet" : "grey");
    levelRow(p, n);
    md(p, "**Fil rouge**", "dw-row-meta");
    bullets(p, s.steps.map((e) => `${wiki(e.file.path)} ${exbadge(e.status)}`), "Étapes à créer quand j'arrive à ce niveau");
    md(p, `**Notions** (${s.list.length})`, "dw-row-meta");
    bullets(p, s.list.sort((a, b) => base(a.file.path).localeCompare(base(b.file.path)))
      .map((c) => `${wiki(c.file.path)} ${sbadge(eff(c))} · ${caseLine(c)}`), "Aucune notion");
  });
}

function vReference() {
  // Tout ce qui ne compte pas (encore) dans la progression : notions des niveaux supérieurs et dossier hors parcours
  const grid = root.createDiv({ cls: "dw-grid" });
  const later = allConcepts().filter((c) => !inLevel(c));
  for (const mod of modules()) {
    const list = later.filter((c) => linkPaths(c.module).includes(mod.file.path));
    if (!list.length) continue;
    const p = panel(grid, `${String(mod.order).padStart(2, "0")} · ${mod.title || base(mod.file.path)}`, "grey");
    bullets(p, list.sort((a, b) => lvl(a) - lvl(b) || base(a.file.path).localeCompare(base(b.file.path)))
      .map((c) => `${wiki(c.file.path)} <span class="dw-badge">Niveau ${lvl(c)}</span>`));
  }
}

/* ---------- routage ---------- */
const VIEWS = { dashboard: vDashboard, niveaux: vNiveaux, reference: vReference, parcours: vParcours, module: vModule, concept: vConcept, maitrise: vMaitrise, revisions: vRevisions, acquis: vAcquis };
const fn = VIEWS[opts.view];
if (!fn) empty(root, "Vue inconnue : " + opts.view);
else {
  try { await fn(); }
  catch (e) { console.error(e); empty(root, "Erreur dans la vue « " + opts.view + " » : " + e.message); }
}
