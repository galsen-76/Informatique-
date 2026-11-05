/* =====================================================================
   Dev Workspace — vues dynamiques (Dataview)

   Dans une note :
     ```dataviewjs
     await dv.view("07 - Resources/Scripts/workspace", { view: "dashboard" })
     ```
   Vues : dashboard · board · tasks · projects · project-log · person
          people · log · report · day · week · calendar
   Prérequis : plugin Dataview + « Enable JavaScript Queries ».
   ===================================================================== */

const CFG = {
  name: "Oumar",                       // ton prénom (Dashboard)
  boards: "02 - Tasks",                // dossier des boards Kanban
  boardPrefix: "Kanban - ",            // un board = « Kanban - <Projet> »
  projects: "01 - Projects",
  daily: "03 - Calendar/Daily",
  events: "03 - Calendar/Events",
  meetings: "04 - Meetings",
  people: "04 - Meetings/Personnes",
  inbox: "00 - Dashboard/Inbox",
  logHeading: "Log",                   // section des notes du jour lue par le journal
  dailyTemplate: "07 - Resources/Templates/Daily.md",
};

const APP = dv.app;
const M = window.moment;
const opts = input || {};
const cur = dv.current();
const today = M().startOf("day");
const root = dv.container.createDiv({ cls: "dw-root" });

/* ---------- Utilitaires ---------------------------------------------- */
const noExt = (p) => String(p).replace(/\.md$/, "");
const base = (p) => noExt(p).split("/").pop();
const wiki = (path, label) => `[[${noExt(path)}|${label ?? base(path)}]]`;
const inFolder = (path, folder) => typeof path === "string" && path.startsWith(folder + "/");
const toM = (d) => (d ? M(d.toISO ? d.toISO() : String(d)) : null);
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const stripDate = (s) => s.replace(/^\d{4}-\d{2}-\d{2}\s*/, "");
const exists = (path) => !!APP.vault.getAbstractFileByPath(path);
const arr = (v) => (!v ? [] : Array.isArray(v) ? v : v.array ? v.array() : [v]);
const resolve = (p) => APP.metadataCache.getFirstLinkpathDest(noExt(p), "")?.path ?? p;
const linksOf = (v) => arr(v).filter((x) => x && typeof x === "object" && x.path).map((x) => resolve(x.path));
const cleanFields = (t) => t.replace(/\[(\w+)::\s*([^\]]+)\]/g, "· $2").replace(/\s{2,}/g, " ").trim();
const when = (m) => {
  if (m.isSame(today, "day")) return "Auj. " + m.format("HH:mm");
  if (m.isSame(today.clone().add(1, "day"), "day")) return "Demain " + m.format("HH:mm");
  return m.clone().locale("fr").format("ddd DD/MM HH:mm");
};

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
function empty(parent, text) {
  parent.createDiv({ cls: "dw-empty", text: text || "Rien pour l'instant" });
}
function bullets(parent, lines, emptyText) {
  if (!lines.length) return empty(parent, emptyText);
  md(parent, lines.map((l) => "- " + l).join("\n"), "dw-list");
}
function badge(parent, text, tone) {
  parent.createSpan({ cls: "dw-badge" + (tone ? " is-" + tone : ""), text });
}
function bar(parent, pct) {
  const b = parent.createDiv({ cls: "dw-progress" });
  b.createDiv({ cls: "dw-progress-fill", attr: { style: `width:${Math.max(0, Math.min(100, pct))}%` } });
}
function stat(parent, value, label, tone) {
  const s = parent.createDiv({ cls: "dw-stat is-" + tone });
  s.createDiv({ cls: "dw-stat-value", text: String(value) });
  s.createDiv({ cls: "dw-stat-label", text: label });
}

/* ---------- Boards Kanban (plugin Kanban) ----------------------------- */
const TAG_RE = /(^|\s)#([^\s#\[\]]+)/g;
const laneKind = (name, complete) => {
  const n = name.toLowerCase().trim();
  if (complete || ["done", "terminé", "terminée", "fait", "fini"].includes(n)) return "done";
  if (["in progress", "en cours", "doing"].includes(n)) return "doing";
  if (["review", "revue", "en revue"].includes(n)) return "review";
  if (["backlog", "plus tard", "idées"].includes(n)) return "backlog";
  return "todo";
};

function parseBoard(raw) {
  const lanes = [];
  let lane = null, card = null;
  for (const line of raw.split(/\r?\n/)) {
    if (line.startsWith("%% kanban:settings")) break;
    const h = line.match(/^##\s+(.+?)\s*$/);
    if (h) { lane = { name: h[1], cards: [], complete: false }; lanes.push(lane); card = null; continue; }
    if (!lane) continue;
    if (line.trim() === "**Complete**") { lane.complete = true; continue; }
    const c = line.match(/^[-*] \[([ xX])\] ?(.*)$/);
    if (c) { card = { raw: c[2], checked: c[1] !== " " }; lane.cards.push(card); continue; }
    if (card && /^\s+\S/.test(line)) { card.raw += "\n" + line.trim(); continue; }
    card = null;
  }
  lanes.forEach((l) => (l.kind = laneKind(l.name, l.complete)));
  return lanes;
}

function toCard(c, lane, board) {
  const first = c.raw.split("\n")[0];
  const due = (c.raw.match(/@\{(\d{4}-\d{2}-\d{2})\}/) || [])[1];
  const tags = [...c.raw.matchAll(TAG_RE)].map((m) => m[2].toLowerCase());
  const done = lane.kind === "done" || c.checked;
  return {
    title: first.replace(/@@?\{[^}]*\}/g, "").replace(TAG_RE, "$1").replace(/\s{2,}/g, " ").trim(),
    tags,
    prio: tags.includes("urgent") ? 0 : tags.includes("haute") ? 1 : 2,
    due: due ? M(due, "YYYY-MM-DD") : null,
    done,
    kind: done ? "done" : lane.kind,
    board,
  };
}

let _boards = null;
async function loadBoards() {
  if (_boards) return _boards;
  const files = APP.vault.getMarkdownFiles()
    .filter((f) => inFolder(f.path, CFG.boards) && f.basename.startsWith(CFG.boardPrefix))
    .sort((a, b) => a.basename.localeCompare(b.basename));
  _boards = [];
  for (const f of files) {
    const lanes = parseBoard(await APP.vault.cachedRead(f));
    const project = f.basename.slice(CFG.boardPrefix.length);
    const projectPath = `${CFG.projects}/${project}.md`;
    const b = { path: f.path, name: f.basename, project, lanes };
    b.projLink = exists(projectPath) ? wiki(projectPath, project) : wiki(f.path, project);
    lanes.forEach((l) => (l.items = l.cards.map((c) => toCard(c, l, b))));
    b.cards = lanes.flatMap((l) => l.items);
    b.done = b.cards.filter((c) => c.done).length;
    b.pct = b.cards.length ? Math.round((100 * b.done) / b.cards.length) : 0;
    _boards.push(b);
  }
  return _boards;
}

const byDue = (a, b) => (a.due ? a.due.valueOf() : 9e15) - (b.due ? b.due.valueOf() : 9e15);
const byPrio = (a, b) => a.prio - b.prio || byDue(a, b);

function cardEl(parent, c, showProject) {
  const el = parent.createDiv({ cls: "dw-card" + (c.done ? " is-done" : "") });
  md(el, c.title || "(sans titre)", "dw-card-title");
  const meta = el.createDiv({ cls: "dw-card-meta" });
  if (!c.done && c.prio === 0) badge(meta, "Urgent", "red");
  if (!c.done && c.prio === 1) badge(meta, "Haute", "orange");
  c.tags.filter((t) => t !== "urgent" && t !== "haute").forEach((t) => badge(meta, t));
  if (c.due) {
    const late = !c.done && c.due.isBefore(today);
    const close = !c.done && c.due.diff(today, "days") <= 2;
    badge(meta, (late ? "En retard · " : "") + c.due.format("DD/MM"), late ? "red" : close ? "orange" : "");
  }
  if (showProject) md(meta, c.board.projLink, "dw-card-project", "span");
  if (!meta.childElementCount) meta.remove();
}

function cards(parent, list, emptyText) {
  if (!list.length) return empty(parent, emptyText);
  const box = parent.createDiv({ cls: "dw-items" });
  list.forEach((c) => cardEl(box, c, true));
}

function boardEl(parent, b, doneLimit = 6) {
  const wrap = parent.createDiv({ cls: "dw-board" });
  for (const lane of b.lanes) {
    const col = wrap.createDiv({ cls: "dw-col is-" + lane.kind });
    const head = col.createDiv({ cls: "dw-col-head" });
    head.createSpan({ text: lane.name });
    head.createSpan({ cls: "dw-col-count", text: String(lane.items.length) });
    let items = lane.items;
    if (lane.kind === "done") items = items.slice(-doneLimit).reverse();
    if (!items.length) { col.createDiv({ cls: "dw-empty", text: "Aucune carte" }); continue; }
    const list = col.createDiv({ cls: "dw-col-items" });
    items.forEach((c) => cardEl(list, c, false));
    if (lane.items.length > items.length) col.createDiv({ cls: "dw-empty", text: `+ ${lane.items.length - items.length} plus anciennes` });
  }
}

/* ---------- Réunions, événements, journal ---------------------------- */
function meetings() {
  return dv.pages(`"${CFG.meetings}"`).where((p) => p.type === "meeting" && p.date).array()
    .map((p) => ({ page: p, m: toM(p.date), link: wiki(p.file.path, stripDate(p.file.name)) }))
    .sort((a, b) => a.m - b.m);
}
function events() {
  return dv.pages(`"${CFG.events}"`).where((p) => p.type === "event" && p.date).array()
    .map((p) => ({ page: p, m: toM(p.date), link: wiki(p.file.path, stripDate(p.file.name)) }))
    .sort((a, b) => a.m - b.m);
}
const isPerson = (path) => inFolder(path, CFG.people) || dv.page(path)?.type === "person";
const isProject = (path) => inFolder(path, CFG.projects);

let _log = null;
function logEntries() {
  if (_log) return _log;
  const out = [];
  for (const p of dv.pages(`"${CFG.daily}"`).where((p) => p.date).array()) {
    const d = toM(p.date);
    for (const l of arr(p.file.lists)) {
      if (l.parent || !l.section || l.section.subpath !== CFG.logHeading || !l.text.trim()) continue;
      const links = arr(l.outlinks).map((x) => resolve(x.path));
      out.push({
        m: d, kind: "log", source: p.file.path,
        text: l.text.trim(),
        people: links.filter(isPerson),
        projects: links.filter(isProject),
        tags: arr(l.tags).map((t) => t.replace(/^#/, "").toLowerCase()),
      });
    }
  }
  const now = M();
  for (const mt of meetings()) {
    if (mt.m.isAfter(now)) continue;
    const people = linksOf(mt.page.participants).filter(isPerson);
    const projects = linksOf(mt.page.project);
    out.push({
      m: mt.m, kind: "meeting", source: mt.page.file.path,
      text: `Réunion ${mt.link}` + (projects.length ? ` · ${projects.map((x) => wiki(x)).join(", ")}` : "") +
            (people.length ? ` · avec ${people.map((x) => wiki(x)).join(", ")}` : ""),
      people, projects, tags: [],
    });
  }
  _log = out.sort((a, b) => b.m - a.m);
  return _log;
}
const entryLine = (e, withDate = true) =>
  (withDate ? `**${e.m.format("DD/MM")}** ` : "") + (e.kind === "meeting" ? "👥 " : "") + e.text;

function groupByDay(parent, entries) {
  const days = new Map();
  entries.forEach((e) => {
    const k = e.m.format("YYYY-MM-DD");
    if (!days.has(k)) days.set(k, []);
    days.get(k).push(e);
  });
  for (const [k, list] of days) {
    const label = cap(M(k).locale("fr").format("dddd D MMMM YYYY"));
    const dailyPath = `${CFG.daily}/${k}.md`;
    md(parent, exists(dailyPath) ? wiki(dailyPath, label) : label, "dw-day-title");
    bullets(parent, list.map((e) => entryLine(e, false)));
  }
}

/* ---------- Vues ------------------------------------------------------- */
async function vDashboard() {
  const bs = await loadBoards();
  const open = bs.flatMap((b) => b.cards).filter((c) => !c.done);
  const now = M();
  const in7 = today.clone().add(7, "days").endOf("day");
  const ms = meetings(), evs = events();
  const projects = dv.pages(`"${CFG.projects}"`).where((p) => p.type === "project").array();
  const active = projects.filter((p) => p.status === "active");
  const late = open.filter((c) => c.due && c.due.isBefore(today)).sort(byDue);
  const soon = open.filter((c) => c.due && !c.due.isBefore(today) && c.due.isSameOrBefore(in7)).sort(byDue);
  const upcoming = ms.filter((x) => x.m.isSameOrAfter(now));

  const hero = root.createDiv({ cls: "dw-hero" });
  hero.createDiv({ cls: "dw-hero-title", text: `${now.hour() < 18 ? "Bonjour" : "Bonsoir"} ${CFG.name}` });
  md(hero, cap(now.clone().locale("fr").format("dddd D MMMM YYYY")) +
    ` · [[${CFG.daily}/${today.format("YYYY-MM-DD")}|Note du jour]]`, "dw-hero-sub");

  const st = root.createDiv({ cls: "dw-stats" });
  stat(st, active.length, "Projets actifs", "violet");
  stat(st, open.length, "Tâches ouvertes", "blue");
  stat(st, upcoming.filter((x) => x.m.isSameOrBefore(in7)).length, "Réunions · 7 j", "blue");
  stat(st, soon.length, "Échéances · 7 j", "orange");
  stat(st, late.length, "En retard", late.length ? "red" : "green");

  const grid = root.createDiv({ cls: "dw-grid" });

  const t = panel(grid, "Aujourd'hui", "blue");
  bullets(t, [
    ...ms.filter((x) => x.m.isSame(today, "day")).map((x) => `**${x.m.format("HH:mm")}** ${x.link}`),
    ...evs.filter((x) => x.m.isSame(today, "day")).map((x) => `**Journée** ${x.link}`),
  ], "Aucune réunion aujourd'hui");

  const p = panel(grid, "Priorités", "violet");
  const prio = open.filter((c) => c.kind !== "backlog" && (c.prio < 2 || (c.due && c.due.diff(today, "days") <= 2))).sort(byPrio).slice(0, 6);
  cards(p, prio, "Rien d'urgent");

  const pr = panel(grid, "Projets en cours", "violet");
  if (!active.length) empty(pr, "Aucun projet actif");
  else { const it = pr.createDiv({ cls: "dw-items is-wide" }); active.forEach((pg) => projectRow(it, pg, bs)); }

  const l = panel(grid, "En retard", late.length ? "red" : "green");
  cards(l, late, "Rien en retard");

  const s = panel(grid, "Échéances · 7 jours", "orange");
  bullets(s, soon.map((c) => `**${c.due.format("DD/MM")}** ${c.title} · ${c.board.projLink}`), "Aucune échéance");

  const u = panel(grid, "Réunions à venir", "blue");
  bullets(u, upcoming.slice(0, 5).map((x) => `**${when(x.m)}** ${x.link}`), "Aucune réunion prévue");

  const j = panel(grid, "Journal récent", "green");
  bullets(j, logEntries().slice(0, 6).map((e) => entryLine(e)), "Écris une ligne dans « Log » de ta note du jour");
  md(j, "[[Log|Tout le journal →]]", "dw-more");

  const a = panel(grid, "Actions de réunion", "orange");
  const acts = arr(dv.pages(`"${CFG.meetings}"`).file.tasks).filter((x) => !x.completed);
  bullets(a, acts.map((x) => cleanFields(x.text) + " · " + wiki(x.path, stripDate(base(x.path)))), "Aucune action en attente");

  const n = panel(grid, "Notes rapides", "grey");
  bullets(n, dv.pages(`"${CFG.inbox}"`).sort((x) => x.file.ctime, "desc").limit(5).array()
    .map((x) => wiki(x.file.path, x.file.name)), "Inbox vide");

  const q = panel(grid, "Accès rapide", "violet");
  md(q, ["Projets", "Tâches", "Calendrier", "Log", "Bilan", "Réunions", "Personnes", "Engineering", "Knowledge", "Guide"]
    .map((x) => `[[${x}]]`).join(" "), "dw-links");
}

function projectRow(parent, pg, bs) {
  const b = bs.find((x) => x.project === pg.file.name);
  const row = parent.createDiv({ cls: "dw-row" });
  const top = row.createDiv({ cls: "dw-row-top" });
  md(top, wiki(pg.file.path), "dw-row-name", "span");
  top.createSpan({ cls: "dw-row-pct", text: b ? `${b.pct} %` : "" });
  bar(row, b ? b.pct : 0);
  const info = [];
  if (b) info.push(`${b.done}/${b.cards.length} tâches`);
  const open = b ? b.cards.filter((c) => !c.done && c.due && c.due.isBefore(today)).length : 0;
  if (open) info.push(`${open} en retard`);
  if (pg.deadline) info.push("deadline " + toM(pg.deadline).format("DD/MM/YYYY"));
  md(row, info.join(" · ") + (b ? ` · ${wiki(b.path, "Kanban")}` : ""), "dw-row-meta");
}

async function vBoard() {
  const name = opts.project || cur.file.name;
  const b = (await loadBoards()).find((x) => x.project === name);
  if (!b) {
    md(root, `Pas encore de board pour ce projet. Crée la note **${CFG.boards}/${CFG.boardPrefix}${name}** avec le template *Kanban*.`, "dw-empty");
    return;
  }
  const head = root.createDiv({ cls: "dw-row" });
  const top = head.createDiv({ cls: "dw-row-top" });
  md(top, wiki(b.path, "Ouvrir le Kanban →"), "dw-row-name", "span");
  top.createSpan({ cls: "dw-row-pct", text: `${b.done}/${b.cards.length} terminées · ${b.pct} %` });
  bar(head, b.pct);
  boardEl(root, b);
}

async function vTasks() {
  const bs = await loadBoards();
  const open = bs.flatMap((b) => b.cards).filter((c) => !c.done);
  const grid = root.createDiv({ cls: "dw-grid" });
  const doing = panel(grid, "En cours", "orange");
  const d = open.filter((c) => c.kind === "doing" || c.kind === "review").sort(byPrio);
  cards(doing, d, "Rien en cours");
  const next = panel(grid, "À faire ensuite", "blue");
  const n = open.filter((c) => c.kind === "todo").sort(byPrio).slice(0, 8);
  cards(next, n, "Rien à faire");
  const late = panel(grid, "En retard", "red");
  const l = open.filter((c) => c.due && c.due.isBefore(today)).sort(byDue);
  cards(late, l, "Rien en retard");
  const boards = panel(grid, "Boards", "violet");
  bs.length ? bs.forEach((b) => {
    const row = boards.createDiv({ cls: "dw-row" });
    const top = row.createDiv({ cls: "dw-row-top" });
    md(top, wiki(b.path, b.project), "dw-row-name", "span");
    top.createSpan({ cls: "dw-row-pct", text: `${b.pct} %` });
    bar(row, b.pct);
    const k = (kind) => b.cards.filter((c) => c.kind === kind).length;
    md(row, `Backlog ${k("backlog")} · Todo ${k("todo")} · En cours ${k("doing")} · Review ${k("review")} · Done ${k("done")}`, "dw-row-meta");
  }) : empty(boards, "Aucun board");
}

async function vProjects() {
  const bs = await loadBoards();
  const all = dv.pages(`"${CFG.projects}"`).where((p) => p.type === "project").sort((p) => p.file.name).array();
  const groups = [["active", "Actifs", "green"], ["planned", "Planifiés", "violet"], ["paused", "En pause", "orange"], ["done", "Terminés", "grey"]];
  const grid = root.createDiv({ cls: "dw-grid" });
  for (const [k, label, tone] of groups) {
    const list = all.filter((p) => p.status === k);
    if (!list.length) continue;
    const p = panel(grid, `${label} · ${list.length}`, tone);
    const it = p.createDiv({ cls: "dw-items is-wide" });
    list.forEach((pg) => projectRow(it, pg, bs));
  }
}

function vProjectLog() {
  const path = cur.file.path;
  const entries = logEntries().filter((e) => e.projects.includes(path));
  const people = [...new Set(entries.flatMap((e) => e.people))];
  if (people.length) md(root, "**Avec :** " + people.map((x) => wiki(x)).join(" · "), "dw-row-meta");
  entries.length ? groupByDay(root, entries.slice(0, opts.limit || 40)) :
    empty(root, "Aucune activité — ajoute une ligne qui mentionne ce projet dans « Log » de ta note du jour");
}

function vPerson() {
  const path = cur.file.path;
  const entries = logEntries().filter((e) => e.people.includes(path));
  const projects = new Map();
  entries.forEach((e) => e.projects.forEach((x) => projects.set(x, (projects.get(x) || 0) + 1)));
  const grid = root.createDiv({ cls: "dw-stats" });
  stat(grid, entries.length, "Activités ensemble", "violet");
  stat(grid, entries.filter((e) => e.kind === "meeting").length, "Réunions", "blue");
  stat(grid, projects.size, "Projets en commun", "green");
  if (entries.length) stat(grid, entries[0].m.format("DD/MM/YY"), "Dernière fois", "orange");
  if (projects.size) md(root, "**Projets :** " + [...projects].map(([x, n]) => `${wiki(x)} (${n})`).join(" · "), "dw-row-meta");
  entries.length ? groupByDay(root, entries) : empty(root, "Rien encore avec cette personne");
}

function vPeople() {
  const entries = logEntries();
  const people = dv.pages(`"${CFG.people}"`).where((p) => p.type === "person").sort((p) => p.file.name).array();
  bullets(root, people.map((p) => {
    const mine = entries.filter((e) => e.people.includes(p.file.path));
    const last = mine.length ? ` · dernière fois le ${mine[0].m.format("DD/MM")}` : "";
    return `${wiki(p.file.path)}${p.role ? " — " + p.role : ""} · ${mine.length} activité(s)${last}`;
  }), "Aucune personne — template *Person*");
}

function vLog() {
  const days = opts.days || 30;
  const from = today.clone().subtract(days, "days");
  groupByDay(root, logEntries().filter((e) => e.m.isSameOrAfter(from)));
}

function vReport() {
  const from = cur.from ? toM(cur.from) : M("2000-01-01");
  const to = cur.to ? toM(cur.to).endOf("day") : M().endOf("day");
  const entries = logEntries().filter((e) => e.m.isSameOrAfter(from) && e.m.isSameOrBefore(to));
  const asc = [...entries].reverse();
  const projects = new Map(), people = new Map(), tags = new Map();
  entries.forEach((e) => {
    e.projects.forEach((x) => projects.set(x, [...(projects.get(x) || []), e]));
    e.people.forEach((x) => people.set(x, (people.get(x) || 0) + 1));
    e.tags.forEach((x) => tags.set(x, (tags.get(x) || 0) + 1));
  });

  const st = root.createDiv({ cls: "dw-stats" });
  stat(st, new Set(entries.map((e) => e.m.format("YYYY-MM-DD"))).size, "Jours d'activité", "violet");
  stat(st, entries.length, "Activités", "blue");
  stat(st, entries.filter((e) => e.kind === "meeting").length, "Réunions", "blue");
  stat(st, projects.size, "Projets", "green");
  stat(st, people.size, "Personnes", "orange");

  md(root, "## Par projet", "dw-h");
  [...projects].sort((a, b) => b[1].length - a[1].length).forEach(([x, list]) => {
    const l = [...list].reverse();
    md(root, `### ${wiki(x)}\n${l[0].m.format("DD/MM/YYYY")} → ${l[l.length - 1].m.format("DD/MM/YYYY")} · ${l.length} activité(s)`, "dw-sub");
    bullets(root, l.map((e) => entryLine(e)));
  });

  md(root, "## Compétences (tags)", "dw-h");
  bullets(root, [...tags].sort((a, b) => b[1] - a[1]).map(([t, n]) => `#${t} · ${n}`), "Ajoute des #tags à tes lignes de Log (ex. #angular, #docker)");

  md(root, "## Personnes", "dw-h");
  bullets(root, [...people].sort((a, b) => b[1] - a[1]).map(([x, n]) => `${wiki(x)} · ${n}`));

  md(root, "## Par mois", "dw-h");
  const months = new Map();
  asc.forEach((e) => { const k = e.m.format("YYYY-MM"); months.set(k, [...(months.get(k) || []), e]); });
  [...months].reverse().forEach(([k, list]) => {
    md(root, `### ${cap(M(k + "-01").locale("fr").format("MMMM YYYY"))}`, "dw-sub");
    bullets(root, list.map((e) => entryLine(e)));
  });
}

async function vDay() {
  const day = cur.date ? toM(cur.date).startOf("day") : today;
  const bs = await loadBoards();
  const open = bs.flatMap((b) => b.cards).filter((c) => !c.done);
  const grid = root.createDiv({ cls: "dw-grid" });
  const ag = panel(grid, "Agenda", "blue");
  bullets(ag, [
    ...meetings().filter((x) => x.m.isSame(day, "day")).map((x) => `**${x.m.format("HH:mm")}** ${x.link}`),
    ...events().filter((x) => x.m.isSame(day, "day")).map((x) => `**Journée** ${x.link}`),
  ], "Aucune réunion");
  const tk = panel(grid, "Tâches du jour", "orange");
  const list = open.filter((c) => c.kind === "doing" || (c.due && c.due.isSameOrBefore(day, "day"))).sort(byPrio);
  cards(tk, list, "Rien de prévu");
}

async function vWeek() {
  const start = cur.week_start ? toM(cur.week_start).startOf("day") : today.clone().startOf("isoWeek");
  const end = start.clone().add(6, "days").endOf("day");
  const inWeek = (m) => m && m.isSameOrAfter(start) && m.isSameOrBefore(end);
  const bs = await loadBoards();
  const grid = root.createDiv({ cls: "dw-grid" });
  const r = panel(grid, "Réunions de la semaine", "blue");
  bullets(r, meetings().filter((x) => inWeek(x.m)).map((x) => `**${x.m.clone().locale("fr").format("ddd DD/MM HH:mm")}** ${x.link}`), "Aucune réunion");
  const e = panel(grid, "Échéances de la semaine", "orange");
  const due = bs.flatMap((b) => b.cards).filter((c) => !c.done && inWeek(c.due)).sort(byDue);
  cards(e, due, "Aucune échéance");
  const j = panel(grid, "Ce que j'ai fait", "green");
  const done = [...logEntries().filter((x) => inWeek(x.m))].reverse();
  bullets(j, done.map((x) => entryLine(x)), "Aucune ligne de Log cette semaine");
}

async function openDaily(day) {
  const name = day.format("YYYY-MM-DD");
  const path = `${CFG.daily}/${name}.md`;
  let file = APP.vault.getAbstractFileByPath(path);
  if (!file) {
    const tpl = APP.vault.getAbstractFileByPath(CFG.dailyTemplate);
    const templater = APP.plugins?.plugins?.["templater-obsidian"]?.templater;
    if (tpl && templater?.create_new_note_from_template) {
      // Crée la note avec le template Daily (Templater), puis l'ouvre
      await templater.create_new_note_from_template(tpl, APP.vault.getAbstractFileByPath(CFG.daily) ?? CFG.daily, name, true);
      return;
    }
    // Sans Templater : note minimale
    const label = cap(day.clone().locale("fr").format("dddd D MMMM YYYY"));
    file = await APP.vault.create(path, `---\ntype: daily\ndate: ${name}\ntags:\n  - daily\n---\n# ${label}\n\n## Focus\n- [ ] \n\n## Log\n- \n\n## Notes\n- \n`);
  }
  await APP.workspace.getLeaf(false).openFile(file);
}

async function vCalendar() {
  const bs = await loadBoards();
  const cards = bs.flatMap((b) => b.cards).filter((c) => c.due && !c.done);
  const ms = meetings(), evs = events(), log = logEntries().filter((e) => e.kind === "log");
  let month = today.clone().startOf("month");
  const holder = root.createDiv({ cls: "dw-cal" });
  const draw = () => {
    holder.empty();
    const nav = holder.createDiv({ cls: "dw-cal-nav" });
    const prev = nav.createEl("button", { text: "‹" });
    nav.createSpan({ cls: "dw-cal-title", text: cap(month.clone().locale("fr").format("MMMM YYYY")) });
    const next = nav.createEl("button", { text: "›" });
    const now = nav.createEl("button", { text: "Aujourd'hui" });
    prev.onclick = () => { month.subtract(1, "month"); draw(); };
    next.onclick = () => { month.add(1, "month"); draw(); };
    now.onclick = () => { month = today.clone().startOf("month"); draw(); };
    const g = holder.createDiv({ cls: "dw-cal-grid" });
    ["L", "M", "M", "J", "V", "S", "D"].forEach((d) => g.createDiv({ cls: "dw-cal-head", text: d }));
    const start = month.clone().startOf("isoWeek");
    const end = month.clone().endOf("month").endOf("isoWeek");
    for (const d = start.clone(); d.isSameOrBefore(end, "day"); d.add(1, "day")) {
      const day = d.clone();
      const hasNote = exists(`${CFG.daily}/${day.format("YYYY-MM-DD")}.md`);
      const cell = g.createDiv({ cls: "dw-cal-cell" +
        (day.month() !== month.month() ? " is-out" : "") +
        (day.isSame(today, "day") ? " is-today" : "") +
        (hasNote ? " has-note" : "") });
      cell.createDiv({ cls: "dw-cal-num", text: String(day.date()) });
      const dots = cell.createDiv({ cls: "dw-cal-dots" });
      const same = (m) => m && m.isSame(day, "day");
      const dueToday = cards.filter((c) => same(c.due));
      if (ms.some((x) => same(x.m))) dots.createSpan({ cls: "dw-dot is-blue" });
      if (evs.some((x) => same(x.m))) dots.createSpan({ cls: "dw-dot is-violet" });
      if (dueToday.some((c) => c.due.isBefore(today))) dots.createSpan({ cls: "dw-dot is-red" });
      else if (dueToday.length) dots.createSpan({ cls: "dw-dot is-orange" });
      if (log.some((e) => same(e.m))) dots.createSpan({ cls: "dw-dot is-green" });
      cell.onclick = () => openDaily(day);
    }
    const legend = holder.createDiv({ cls: "dw-cal-legend" });
    [["blue", "Réunion"], ["violet", "Événement"], ["orange", "Échéance"], ["red", "En retard"], ["green", "Activité (Log)"]]
      .forEach(([t, l]) => { const s = legend.createSpan(); s.createSpan({ cls: "dw-dot is-" + t }); s.appendText(" " + l); });
    holder.createDiv({ cls: "dw-empty", text: "Touche un jour pour ouvrir sa note (elle est créée si besoin)." });
  };
  draw();
}

/* ---------- Routage ---------------------------------------------------- */
const VIEWS = {
  dashboard: vDashboard, board: vBoard, tasks: vTasks, projects: vProjects,
  "project-log": vProjectLog, person: vPerson, people: vPeople, log: vLog,
  report: vReport, day: vDay, week: vWeek, calendar: vCalendar,
};
const fn = VIEWS[opts.view];
if (!fn) empty(root, "Vue inconnue : " + opts.view);
else {
  try { await fn(); }
  catch (e) { console.error(e); empty(root, "Erreur dans la vue « " + opts.view + " » : " + e.message); }
}
