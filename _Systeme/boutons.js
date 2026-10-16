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

const r1 = ligne(root);
r1.style.marginTop = "0";
bouton(r1, "📖 Guide", () => app.workspace.openLinkText(FICHIER.guide, "", false));
bouton(r1, "❓ À creuser", () => app.workspace.openLinkText(FICHIER.creuser, "", false));
bouton(r1, "🐞 Carnet d'erreurs", () => app.workspace.openLinkText(FICHIER.erreurs, "", false));
bouton(r1, "📊 Tableau de bord", () => app.workspace.openLinkText("00-Accueil/Tableau-de-bord.md", "", false));

async function ajouter(chemin, champ, ok) {
  const v = champ.value.trim();
  if (!v) return;
  const f = app.vault.getAbstractFileByPath(chemin);
  if (!f) return;
  await app.vault.append(f, "- " + v + " _(" + moment().format("D MMM YYYY") + ")_\n");
  champ.value = "";
  champ.placeholder = ok;
}
const r2 = ligne(root);
const question = champ(r2, "Une question, une notion à creuser…", () => ajouter(FICHIER.creuser, question, "✔ Ajouté à « À creuser ». Autre chose ?"));
bouton(r2, "❓ Ajouter", () => ajouter(FICHIER.creuser, question, "✔ Ajouté à « À creuser ». Autre chose ?"));

const r3 = ligne(root);
const erreur = champ(r3, "Erreur → cause → solution", () => ajouter(FICHIER.erreurs, erreur, "✔ Ajouté au carnet d'erreurs."));
bouton(r3, "🐞 Ajouter", () => ajouter(FICHIER.erreurs, erreur, "✔ Ajouté au carnet d'erreurs."));

const r4 = ligne(root);
const sel = r4.createEl("select");
sel.style.cssText = "padding:6px;border-radius:8px;max-width:45%;";
sel.createEl("option", { text: "— Dossier —", value: "" });
const dossiers = [...new Set(NOTES.map(p => p.file.folder).array())].sort();
for (const d of dossiers) sel.createEl("option", { text: d.replace(/^\d+[-_]/, ""), value: d });
const creerNote = async () => {
  const nom = propre(titreNote.value);
  if (!nom || !sel.value) { titreNote.placeholder = "Choisis un dossier et écris un titre"; return; }
  const path = sel.value + "/" + nom + ".md";
  let f = app.vault.getAbstractFileByPath(path);
  if (!f) {
    const t = app.vault.getAbstractFileByPath(FICHIER.modele);
    f = await app.vault.create(path, t ? await app.vault.read(t) : "# " + nom + "\n");
  }
  await app.workspace.getLeaf(false).openFile(f);
};
const titreNote = champ(r4, "Titre d'une nouvelle note de cours", creerNote);
bouton(r4, "➕ Note", creerNote);
