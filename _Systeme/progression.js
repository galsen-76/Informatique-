// ⚙️ Moteur du coffre (Dataview JS). Ne pas modifier : voir 00-Accueil/Guide.md.
const RE = /@\{(\d{4}-\d{2}-\d{2})\}/;
const DOSSIER = { jour: "01_Daily", semaines: "01_Daily/Semaines", modeles: "_Templates", projets: "02_Projects", inbox: "00-Accueil/Inbox.md" };
const PALIERS = [1, 3, 7, 15, 30, 60, 120];
const AUJ = moment().format("YYYY-MM-DD");
function lien(parent, text, path) {
  const a = parent.createEl("a", { text, cls: "internal-link" });
  a.onclick = (e) => { e.preventDefault(); app.workspace.openLinkText(path, "", false); };
  return a;
}
async function dossier(dir) {
  let acc = "";
  for (const part of dir.split("/").filter(Boolean)) {
    acc = acc ? acc + "/" + part : part;
    if (!app.vault.getAbstractFileByPath(acc)) await app.vault.createFolder(acc);
  }
}
async function creerDepuis(path, tpl, d, vars = {}, ouvrir = true) {
  let f = app.vault.getAbstractFileByPath(path);
  if (!f) {
    let c = "";
    const t = app.vault.getAbstractFileByPath(tpl);
    if (t) c = await app.vault.read(t);
    const title = path.split("/").pop().replace(/\.md$/, "");
    c = c.replace(/\{\{date:([^}]+)\}\}/g, (_, fmt) => d.format(fmt))
         .replace(/\{\{date\}\}/g, d.format("YYYY-MM-DD"))
         .replace(/\{\{title\}\}/g, title);
    for (const [k, v] of Object.entries(vars)) c = c.split("{{" + k + "}}").join(v);
    await dossier(path.split("/").slice(0, -1).join("/"));
    f = await app.vault.create(path, c);
  }
  if (ouvrir) await app.workspace.getLeaf(false).openFile(f);
  return f;
}
function propre(s) { return String(s || "").replace(/[\\/:*?"<>|#^\[\]]/g, "").replace(/\s+/g, " ").trim(); }
function section(t) { return String((t.section && t.section.subpath) || ""); }
function texte(t) { return t.text.replace(RE, "").replace(/#task/g, "").replace(/\s+/g, " ").trim(); }
function jourDe(v) { if (!v) return ""; if (v.toFormat) return v.toFormat("yyyy-MM-dd"); return String(v).slice(0, 10); }
function titre(parent, txt) {
  const h = parent.createEl("div", { text: txt });
  h.style.cssText = "font-weight:700;margin:14px 0 6px;font-size:1.05em;";
  return h;
}
function vide(parent, txt) {
  const v = parent.createEl("div", { text: txt });
  v.style.cssText = "color:var(--text-muted);font-size:0.9em;";
  return v;
}
function discret(parent, txt) {
  const s = parent.createEl("span", { text: txt });
  s.style.cssText = "font-size:0.8em;color:var(--text-muted);";
  return s;
}
function bouton(parent, txt, fn, petit = false) {
  const b = parent.createEl("button", { text: txt });
  b.style.cssText = petit ? "padding:2px 8px;border-radius:6px;cursor:pointer;font-size:0.8em;" : "padding:6px 12px;border-radius:8px;cursor:pointer;";
  b.onclick = fn;
  return b;
}
function champ(parent, placeholder, onEntree) {
  const i = parent.createEl("input", { type: "text", placeholder });
  i.style.cssText = "flex:1;min-width:160px;padding:6px;border-radius:8px;";
  i.onkeydown = (e) => { if (e.key === "Enter") onEntree(); };
  return i;
}
function ligne(parent) {
  const r = parent.createEl("div");
  r.style.cssText = "display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;";
  return r;
}
function puce(parent, t, cle) {
  const li = parent.createEl("li");
  li.createEl("span", { text: texte(t) + "  " });
  const m = t.text.match(RE);
  if (m) {
    const chip = li.createEl("span", { text: "📌 " + moment(m[1]).format("ddd D MMM") });
    const retard = cle && m[1] < cle;
    chip.style.cssText = "font-size:0.8em;padding:1px 6px;border-radius:10px;margin-right:6px;" +
      (retard ? "background:#e5484d;color:white;" : "background:var(--background-modifier-hover);");
  }
  const nom = t.path.split("/").pop().replace(/\.md$/, "").replace(/^Kanban[ -]/, "");
  lien(li, "→ " + nom, t.path).style.cssText = "font-size:0.8em;color:var(--text-muted);";
  return li;
}
const TOUT = dv.pages().where(p => !p.file.path.startsWith("_Templates/") && !p.file.path.startsWith("_Systeme/"));
const KANBANS = TOUT.where(p => p["kanban-plugin"]);
const NOTES = TOUT.where(p => p.type === "knowledge");
const estFaite = (p) => String(p.status || "").includes("Done");
const estEnCours = (p) => String(p.status || "").includes("In Progress");
const pastille = (p) => estFaite(p) ? "🟢" : estEnCours(p) ? "🟡" : "🔴";
const NOMS = { "Methodologie": "Méthodologie", "Algorithmes Structures de Donnees": "Algorithmes", "Langage": "Langages", "Bases de Donnees": "Bases de données", "Securite": "Sécurité", "Tests Qualite": "Tests et qualité", "Reseaux": "Réseaux", "Intelligence Artificielle": "IA" };
function nomDomaine(path) { const n = path.split("/")[0].replace(/^\d+[-_]/, "").replace(/[-_]/g, " "); return NOMS[n] || n; }
function aReviser(cle) {
  return NOTES.where(p => p.revoir ? jourDe(p.revoir) <= cle : estFaite(p)).sort(p => jourDe(p.revoir) || "0000");
}
async function noter(p, su) {
  const f = app.vault.getAbstractFileByPath(p.file.path);
  if (!f) return;
  await app.fileManager.processFrontMatter(f, (fm) => {
    const avant = Number.isInteger(fm.palier) ? fm.palier : -1;
    const palier = su ? Math.min(avant + 1, PALIERS.length - 1) : 0;
    fm.palier = palier;
    fm.revoir = moment().add(su ? PALIERS[palier] : 1, "day").format("YYYY-MM-DD");
    fm.derniere_revision = AUJ;
  });
}
function listeRevision(parent, notes, max, actif) {
  const ul = parent.createEl("ul");
  for (const p of notes.limit(max)) {
    const li = ul.createEl("li");
    lien(li, p.file.name, p.file.path);
    discret(li, "  " + nomDomaine(p.file.path) + "  ");
    if (!actif) continue;
    const zone = li.createEl("span");
    zone.style.cssText = "display:inline-flex;gap:4px;";
    const fin = (txt) => { zone.empty(); discret(zone, txt); };
    bouton(zone, "✅ Su", async () => {
      await noter(p, true);
      const n = Math.min((Number.isInteger(p.palier) ? p.palier : -1) + 1, PALIERS.length - 1);
      fin("✔ prochaine révision dans " + PALIERS[n] + " j");
    }, true);
    bouton(zone, "🔁 Pas su", async () => { await noter(p, false); fin("↻ on la revoit demain"); }, true);
  }
}
const root = dv.container;
const groupes = {};
let total = 0, faites = 0, encours = 0;
for (const p of NOTES) {
  const d = p.file.path.split("/")[0];
  const g = groupes[d] || (groupes[d] = { t: 0, f: 0, e: 0 });
  g.t++; total++;
  if (estFaite(p)) { g.f++; faites++; } else if (estEnCours(p)) { g.e++; encours++; }
}
const pct = (x, t) => t ? Math.round((x / t) * 100) : 0;
const tete = root.createEl("div", { text: "🟢 " + faites + " maîtrisées · 🟡 " + encours + " en cours · 🔴 " + (total - faites - encours) + " à découvrir · " + pct(faites, total) + " % du coffre" });
tete.style.cssText = "font-weight:600;margin-bottom:8px;";
const grid = root.createEl("div");
grid.style.cssText = "display:grid;grid-template-columns:minmax(120px,max-content) 1fr max-content;gap:4px 10px;align-items:center;font-size:0.9em;";
for (const d of Object.keys(groupes).sort()) {
  const g = groupes[d];
  grid.createEl("div", { text: nomDomaine(d) });
  const barre = grid.createEl("div");
  barre.style.cssText = "display:flex;height:10px;border-radius:999px;overflow:hidden;background:var(--background-modifier-border);";
  const v = barre.createEl("div"); v.style.cssText = "width:" + pct(g.f, g.t) + "%;background:var(--color-green);";
  const j = barre.createEl("div"); j.style.cssText = "width:" + pct(g.e, g.t) + "%;background:var(--color-yellow);";
  discret(grid, g.f + " / " + g.t);
}
