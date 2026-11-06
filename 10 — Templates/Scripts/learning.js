/* =====================================================================
   Dev Learning — vues dynamiques (Dataview)

   Dans une note :
     ```dataviewjs
     await dv.view("10 — Templates/Scripts/learning", { view: "dashboard" })
     ```
   Vues : dashboard · parcours · module · concept · maitrise · revisions · acquis
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
};

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
const METHOD = ["Comprendre", "Explorer", "Pratiquer", "Expliquer", "Relier", "Réviser"];

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
const concepts = () => dv.pages(`"${CFG.concepts}"`).where((p) => p.type === "concept").array();
const modules = () => dv.pages(`"${CFG.modules}"`).where((p) => p.type === "module").sort((p) => p.order).array();
const exercises = () => dv.pages(`"${CFG.exercises}"`).where((p) => p.type === "exercise" || p.type === "project").array();
const pageOf = (path) => dv.page(path);

// Exercices (type « exercise ») qui citent la notion dans leur propriété « concepts »
const exercisesOf = (page) => exercises().filter((e) => e.type === "exercise" && linkPaths(e.concepts).includes(page.file.path));
function mastery(page) {
  // La maîtrise est validée quand tous les exercices liés à la notion sont réussis
  const ex = exercisesOf(page);
  return { done: ex.filter((e) => e.status === "reussi").length, total: ex.length, ex };
}
function progress(list) {
  if (!list.length) return 0;
  return Math.round((100 * list.reduce((s, p) => s + st(p.status).score, 0)) / (3 * list.length));
}
const conceptsOfModule = (mod) => concepts().filter((c) => linkPaths(c.module).includes(mod.file.path));
function readiness(page) {
  const pre = linkPaths(page.prerequisites).map(pageOf).filter(Boolean);
  const missing = pre.filter((p) => st(p.status).score < 2);
  return { pre, missing, ready: missing.length === 0 };
}
const linking = (path, list) => list.filter((p) => arr(p.file.outlinks).some((l) => resolve(l.path) === path));

/* ---------- blocs réutilisés ---------- */
function conceptLine(c, showPre = true) {
  const r = readiness(c);
  const warn = showPre && !r.ready && c.status !== "maitrise" ? ` · prérequis : ${r.missing.map((p) => wiki(p.file.path)).join(", ")}` : "";
  return `${wiki(c.file.path)} ${sbadge(c.status)}${warn}`;
}
function moduleRow(parent, mod) {
  const list = conceptsOfModule(mod);
  const pct = progress(list);
  const row = parent.createDiv({ cls: "dw-row" });
  const top = row.createDiv({ cls: "dw-row-top" });
  md(top, wiki(mod.file.path, `${String(mod.order).padStart(2, "0")} · ${mod.title || base(mod.file.path)}`), "dw-row-name", "span");
  top.createSpan({ cls: "dw-row-pct", text: list.length ? `${pct} %` : "—" });
  bar(row, pct);
  const done = list.filter((c) => st(c.status).score >= 2).length;
  const pre = linkPaths(mod.prerequisites).map(pageOf).filter(Boolean);
  const preTxt = pre.length ? " · après " + pre.map((p) => wiki(p.file.path, String(p.order).padStart(2, "0"))).join(", ") : "";
  md(row, `${done}/${list.length} notions comprises${preTxt}`, "dw-row-meta");
}
function methodStrip(parent, page) {
  // Étapes de la méthode cochées dans la propriété « method »
  const doneSteps = arr(page.method).map((s) => String(s).toLowerCase());
  const strip = parent.createDiv({ cls: "dl-steps" });
  METHOD.forEach((s, i) => {
    const ok = doneSteps.includes(s.toLowerCase());
    strip.createSpan({ cls: "dl-step" + (ok ? " is-done" : ""), text: `${i + 1} ${s}` });
  });
}

/* ---------- vues ---------- */
function vDashboard() {
  const all = concepts();
  const focus = pageOf(CFG.focus);
  const now = M();

  const hero = root.createDiv({ cls: "dw-hero" });
  hero.createDiv({ cls: "dw-hero-title", text: "Apprentissage" });
  md(hero, cap(now.clone().locale("fr").format("dddd D MMMM YYYY")) + " · une notion à la fois, comprise pour de vrai", "dw-hero-sub");

  const s = root.createDiv({ cls: "dw-stats" });
  stat(s, all.filter((c) => c.status === "maitrise").length, "Maîtrisées", "green");
  stat(s, all.filter((c) => c.status === "compris").length, "Comprises", "blue");
  stat(s, all.filter((c) => c.status === "en-cours").length, "En cours", "orange");
  stat(s, all.filter((c) => c.status === "a-decouvrir").length, "À découvrir", "grey");
  stat(s, progress(all) + " %", "Progression", "violet");

  const grid = root.createDiv({ cls: "dw-grid" });

  // Sujet actuel
  const f = panel(grid, "Sujet actuel", "violet");
  const currentPath = focus ? linkPaths(focus.current)[0] : null;
  const current = currentPath ? pageOf(currentPath) : null;
  if (!current) {
    md(f, "Aucun sujet choisi. Ouvre [[Focus]] et renseigne `current`.", "dw-empty");
  } else {
    md(f, `**${wiki(current.file.path)}** ${sbadge(current.status)}` + (focus.goal ? `<br><span class="dw-row-meta">Objectif : ${focus.goal}</span>` : ""), "dl-current");
    methodStrip(f, current);
    const r = readiness(current);
    const lines = [];
    if (r.pre.length) lines.push("Prérequis : " + r.pre.map((p) => `${wiki(p.file.path)} ${sbadge(p.status)}`).join(" · "));
    const ex = linking(current.file.path, exercises());
    if (ex.length) lines.push("Pratiquer : " + ex.map((e) => `${wiki(e.file.path)} ${exbadge(e.status)}`).join(" · "));
    const m = mastery(current);
    if (m.total) lines.push(`Validation de la maîtrise : ${m.done}/${m.total} exercices réussis`);
    bullets(f, lines);
    if (!r.ready) md(f, `> [!warning] Prérequis à consolider\n> ${r.missing.map((p) => wiki(p.file.path)).join(", ")} ${r.missing.length > 1 ? "ne sont" : "n'est"} pas encore compris : reviens-y avant d'aller plus loin.`);
  }

  // À apprendre ensuite
  const n = panel(grid, "À apprendre ensuite", "blue");
  const next = focus ? linkPaths(focus.next).map(pageOf).filter(Boolean) : [];
  bullets(n, next.map((c) => {
    const r = readiness(c);
    return `${wiki(c.file.path)} ${sbadge(c.status)} · ` + (r.ready ? "prêt" : "après " + r.missing.map((p) => wiki(p.file.path)).join(", "));
  }), "Ajoute des notions dans `next` de [[Focus]]");

  // Parcours
  const pp = panel(grid, "Parcours", "violet");
  const items = pp.createDiv({ cls: "dw-items is-wide" });
  modules().forEach((mod) => moduleRow(items, mod));

  // Révisions
  const rv = panel(grid, "À réviser", "orange");
  const due = all.filter((c) => c.next_review && toM(c.next_review).isSameOrBefore(today, "day")).sort((a, b) => toM(a.next_review) - toM(b.next_review));
  const toConfirm = all.filter((c) => c.status === "maitrise" && (() => { const m = mastery(c); return m.total && m.done < m.total; })());
  bullets(rv, [
    ...due.map((c) => `${wiki(c.file.path)} ${sbadge(c.status)} · prévue le ${toM(c.next_review).format("DD/MM")}`),
    ...toConfirm.map((c) => `${wiki(c.file.path)} · maîtrise à confirmer (${mastery(c).done}/${mastery(c).total} exercices réussis)`),
  ], "Rien à réviser aujourd'hui");

  // Exercices
  const xp = panel(grid, "Exercices et projets en cours", "green");
  bullets(xp, exercises().filter((e) => e.status !== "reussi").map((e) => `${wiki(e.file.path)} ${exbadge(e.status)}`), "Aucun exercice en cours");

  // Erreurs récentes
  const er = panel(grid, "Erreurs récentes", "red");
  bullets(er, dv.pages(`"${CFG.errors}"`).where((p) => p.type === "error").sort((p) => p.file.ctime, "desc").limit(4).array()
    .map((p) => wiki(p.file.path)), "Aucune erreur documentée");

  const q = panel(grid, "Accès rapide", "violet");
  md(q, ["Focus", "Parcours", "Méthode d'apprentissage", "Chemins de compréhension", "Cours", "Concepts", "Commandes", "Fiches pratiques", "Erreurs et solutions", "Exercices et projets", "Révisions", "Ressources", "Guide"]
    .map((x) => `[[${x}]]`).join(" "), "dw-links");
}

function vParcours() {
  const grid = root.createDiv({ cls: "dw-grid" });
  for (const mod of modules()) {
    const p = panel(grid, `${String(mod.order).padStart(2, "0")} · ${mod.title}`, progress(conceptsOfModule(mod)) >= 66 ? "green" : conceptsOfModule(mod).some((c) => st(c.status).score > 0) ? "orange" : "grey");
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
    const notions = linkPaths(co.concepts).map(pageOf).filter((x) => x && x.type === "concept");
    notions.forEach((x) => seen.add(x.file.path));
    bullets(p, notions.map((x) => conceptLine(x, false)), "Aucune notion listée dans ce cours");
  });
  if (!courses.length) empty(panel(grid, "Cours", "orange"), "Aucun cours pour l'instant");

  const rest = list.filter((x) => !seen.has(x.file.path)).sort((a, b) => st(b.status).score - st(a.status).score);
  if (rest.length || !list.length) {
    const c = panel(grid, courses.length ? "Autres notions du module" : "Notions du module", "blue");
    bullets(c, rest.map((x) => conceptLine(x, false)), "Aucune notion rattachée — template *Concept* avec ce module");
  }

  const ex = panel(grid, "Exercices et projets", "green");
  const paths = new Set([...list.map((x) => x.file.path), ...seen]);
  bullets(ex, exercises().filter((e) => linkPaths(e.concepts).some((p) => paths.has(p)))
    .map((e) => `${wiki(e.file.path)} ${exbadge(e.status)}`), "Aucun exercice relié");
}

function vConcept() {
  const box = root.createDiv({ cls: "dl-concept" });
  const head = box.createDiv({ cls: "dl-concept-head" });
  md(head, sbadge(cur.status) + (cur.level ? ` <span class="dw-badge">${cur.level}</span>` : "") +
    (cur.module ? " · " + linkPaths(cur.module).map((p) => wiki(p)).join(", ") : ""), "", "span");
  methodStrip(box, cur);
  const lines = [];
  const r = readiness(cur);
  if (r.pre.length) lines.push("**Prérequis** : " + r.pre.map((p) => `${wiki(p.file.path)} ${sbadge(p.status)}`).join(" · "));
  const usedBy = concepts().filter((c) => linkPaths(c.prerequisites).includes(cur.file.path) || linkPaths(c.parents).includes(cur.file.path));
  if (usedBy.length) lines.push("**Mène à** : " + usedBy.map((c) => wiki(c.file.path)).join(" · "));
  const ex = linking(cur.file.path, exercises());
  if (ex.length) lines.push("**Exercices** : " + ex.map((e) => `${wiki(e.file.path)} ${exbadge(e.status)}`).join(" · "));
  const cmds = linking(cur.file.path, dv.pages(`"${CFG.commands}"`).where((p) => p.type === "command").array());
  if (cmds.length) lines.push("**Commandes** : " + cmds.map((c) => wiki(c.file.path)).join(" · "));
  const m = mastery(cur);
  if (!m.total) lines.push("**Maîtrise** : aucun exercice lié pour l'instant");
  else lines.push(`**Maîtrise** : ${m.done}/${m.total} exercices réussis` +
    (cur.status === "maitrise" && m.done < m.total ? " — statut « Maîtrisé » à confirmer" : "") +
    (m.done === m.total && cur.status !== "maitrise" ? " — tu peux passer en « Maîtrisé »" : ""));
  if (cur.next_review) lines.push(`**Prochaine révision** : ${toM(cur.next_review).format("DD/MM/YYYY")}`);
  bullets(box, lines);
}

function vMaitrise() {
  const m = mastery(cur);
  if (!m.total) return empty(root, "Aucun exercice lié pour l'instant : la maîtrise ne peut pas encore être validée.");
  bullets(root, m.ex.map((e) => `${wiki(e.file.path)} ${exbadge(e.status)}`));
  if (m.done === m.total) {
    md(root, cur.status === "maitrise" ? "> [!success] Maîtrise validée\n> Tous les exercices liés sont réussis."
      : "> [!success] Maîtrise validée\n> Tous les exercices liés sont réussis : tu peux passer le statut en « Maîtrisé ».");
  } else {
    md(root, `> [!todo] Pas encore validée\n> ${m.done}/${m.total} exercice${m.total > 1 ? "s" : ""} réussi${m.done > 1 ? "s" : ""}.`);
  }
}

function vRevisions() {
  const all = concepts();
  const grid = root.createDiv({ cls: "dw-grid" });
  const due = panel(grid, "À réviser aujourd'hui", "orange");
  bullets(due, all.filter((c) => c.next_review && toM(c.next_review).isSameOrBefore(today, "day"))
    .sort((a, b) => toM(a.next_review) - toM(b.next_review))
    .map((c) => `${wiki(c.file.path)} ${sbadge(c.status)} · prévue le ${toM(c.next_review).format("DD/MM")}`), "Rien de prévu aujourd'hui");
  const soon = panel(grid, "Cette semaine", "blue");
  bullets(soon, all.filter((c) => c.next_review && toM(c.next_review).isAfter(today, "day") && toM(c.next_review).isSameOrBefore(today.clone().add(7, "days"), "day"))
    .sort((a, b) => toM(a.next_review) - toM(b.next_review))
    .map((c) => `**${toM(c.next_review).clone().locale("fr").format("ddd DD/MM")}** ${wiki(c.file.path)}`), "Rien cette semaine");
  const conf = panel(grid, "Maîtrise à confirmer", "red");
  bullets(conf, all.filter((c) => c.status === "maitrise").filter((c) => { const m = mastery(c); return m.total && m.done < m.total; })
    .map((c) => `${wiki(c.file.path)} · ${mastery(c).done}/${mastery(c).total} exercices réussis`), "Toutes les maîtrises sont validées");
  const up = panel(grid, "Prêtes à passer en « Maîtrisé »", "green");
  bullets(up, all.filter((c) => c.status !== "maitrise").filter((c) => { const m = mastery(c); return m.total && m.done === m.total; })
    .map((c) => wiki(c.file.path)), "Aucune pour l'instant");
  const never = panel(grid, "Comprises mais sans révision prévue", "grey");
  bullets(never, all.filter((c) => (c.status === "compris" || c.status === "maitrise") && !c.next_review).map((c) => wiki(c.file.path)), "—");
}

function vAcquis() {
  const all = concepts();
  const s = root.createDiv({ cls: "dw-stats" });
  Object.entries(STATUS).reverse().forEach(([k, v]) => stat(s, all.filter((c) => c.status === k).length, v.label, v.tone));
  const grid = root.createDiv({ cls: "dw-grid" });
  for (const mod of modules()) {
    const list = conceptsOfModule(mod);
    if (!list.length) continue;
    const p = panel(grid, `${String(mod.order).padStart(2, "0")} · ${mod.title} · ${progress(list)} %`, "violet");
    bullets(p, list.sort((a, b) => st(b.status).score - st(a.status).score).map(conceptLine));
  }
}

/* ---------- routage ---------- */
const VIEWS = { dashboard: vDashboard, parcours: vParcours, module: vModule, concept: vConcept, maitrise: vMaitrise, revisions: vRevisions, acquis: vAcquis };
const fn = VIEWS[opts.view];
if (!fn) empty(root, "Vue inconnue : " + opts.view);
else {
  try { await fn(); }
  catch (e) { console.error(e); empty(root, "Erreur dans la vue « " + opts.view + " » : " + e.message); }
}
