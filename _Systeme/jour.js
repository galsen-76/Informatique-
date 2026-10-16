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
const cur = dv.current();
let cle = (input && input.aujourdhui) ? AUJ : cur.file.name;
if (!/^\d{4}-\d{2}-\d{2}$/.test(cle)) cle = AUJ;
const jour = moment(cle);
const estAuj = cle === AUJ;

// 1. Révisions du jour
const dues = aReviser(cle);
titre(root, "🧠 À réviser" + (dues.length ? " · " + dues.length : ""));
if (dues.length) {
  if (estAuj) vide(root, "Ouvre la note, réponds à son rappel actif sans regarder, puis clique.");
  listeRevision(root, dues, 7, estAuj);
  if (dues.length > 7) vide(root, "… et " + (dues.length - 7) + " autres. 7 par jour suffisent, la suite reviendra demain.");
} else vide(root, "Rien à réviser. Une note passée en 🟢 Done arrive ici automatiquement.");

// 2. Notes en cours d'apprentissage
titre(root, "📚 J'apprends en ce moment");
const ec = NOTES.where(estEnCours).sort(p => jourDe(p.modified), "desc");
if (ec.length) {
  const ul = root.createEl("ul");
  for (const p of ec.limit(8)) { const li = ul.createEl("li"); lien(li, p.file.name, p.file.path); discret(li, "  " + nomDomaine(p.file.path)); }
} else vide(root, "Aucune note 🟡. Passe une note en « 🟡 In Progress » quand tu commences à l'apprendre.");

// 3. En cours dans les Kanban
titre(root, "🔨 En cours dans mes projets");
let nb = 0;
for (const k of KANBANS.sort(p => p.file.name)) {
  const ts = k.file.tasks.where(t => !t.completed && section(t).includes("En cours") && texte(t));
  if (!ts.length) continue;
  nb += ts.length;
  const h = root.createEl("div");
  lien(h, k.file.name.replace(/^Kanban[ -]/, ""), k.file.path).style.fontWeight = "600";
  const ul = root.createEl("ul");
  for (const t of ts) puce(ul, t, cle);
}
if (!nb) vide(root, "Rien en cours : glisse une carte dans la colonne « En cours » d'un Kanban.");

// 4. Échéances (en retard + 7 jours)
titre(root, "📌 Échéances");
const lim = jour.clone().add(7, "day").format("YYYY-MM-DD");
const ech = TOUT.file.tasks.where(t => !t.completed && RE.test(t.text) && t.text.match(RE)[1] <= lim)
  .sort(t => t.text.match(RE)[1]);
if (ech.length) { const ul = root.createEl("ul"); for (const t of ech) puce(ul, t, cle); }
else vide(root, "Aucune échéance dans les 7 prochains jours.");

// 5. Pas terminé les jours précédents
const debut = jour.clone().subtract(14, "day").format("YYYY-MM-DD");
const rep = dv.pages('"' + DOSSIER.jour + '"')
  .where(p => /^\d{4}-\d{2}-\d{2}$/.test(p.file.name) && p.file.name < cle && p.file.name >= debut)
  .file.tasks.where(t => !t.completed && texte(t));
if (rep.length) {
  titre(root, "↩️ Pas terminé les jours précédents");
  const ul = root.createEl("ul");
  for (const t of rep) puce(ul, t, cle);
}
