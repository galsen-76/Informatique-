// ⚙️ Moteur du coffre (Dataview JS). Ne pas modifier : voir 00-Accueil/Guide.md.
const FICHIER = { creuser: "00-Accueil/A-creuser.md", erreurs: "04_Snippets/Erreurs-resolues.md", modele: "_Templates/TPL_Base-Knowledge.md", guide: "00-Accueil/Guide.md" };
const PALIERS = [1, 3, 7, 15, 30, 60, 120];
const AUJ = moment().format("YYYY-MM-DD");
function lien(parent, text, path) {
  const a = parent.createEl("a", { text, cls: "internal-link" });
  a.onclick = (e) => { e.preventDefault(); app.workspace.openLinkText(path, "", false); };
  return a;
}
function propre(s) { return String(s || "").replace(/[\\/:*?"<>|#^\[\]]/g, "").replace(/\s+/g, " ").trim(); }
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
const TOUT = dv.pages().where(p => !p.file.path.startsWith("_Templates/") && !p.file.path.startsWith("_Systeme/"));
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
const dues = aReviser(AUJ);
titre(root, "🧠 À réviser aujourd'hui" + (dues.length ? " · " + dues.length : ""));
if (dues.length) {
  vide(root, "Ouvre la note, réponds à son rappel actif sans regarder, puis clique.");
  listeRevision(root, dues, 7, true);
  if (dues.length > 7) vide(root, "… et " + (dues.length - 7) + " autres. 7 par jour suffisent, la suite reviendra demain.");
} else vide(root, "Rien à réviser aujourd'hui. Une note passée en 🟢 Done arrive ici automatiquement.");

titre(root, "🗓️ Les 7 prochains jours");
const r = root.createEl("div");
r.style.cssText = "display:grid;grid-template-columns:repeat(7,1fr);gap:4px;";
for (let i = 1; i <= 7; i++) {
  const d = moment().add(i, "day"), k = d.format("YYYY-MM-DD");
  const n = NOTES.where(p => jourDe(p.revoir) === k).length;
  const c = r.createEl("div");
  c.style.cssText = "text-align:center;padding:4px 2px;border-radius:8px;border:1px solid var(--background-modifier-border);" + (n ? "background:var(--background-modifier-hover);" : "");
  const j = c.createEl("div", { text: d.format("ddd D") }); j.style.cssText = "font-size:0.75em;color:var(--text-muted);";
  c.createEl("div", { text: n ? "🧠 " + n : "·" });
}
