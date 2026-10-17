
function propre(s){return String(s||"").replace(/[\\/:*?"<>|#^\[\]]/g,"").replace(/\s+/g," ").trim();}
function lien(parent,text,path){const a=parent.createEl("a",{text,cls:"internal-link"});a.onclick=e=>{e.preventDefault();app.workspace.openLinkText(path,"",false)};return a;}
function bouton(parent,txt,fn){const b=parent.createEl("button",{text:txt});b.style.cssText="padding:6px 12px;border-radius:8px;cursor:pointer;";b.onclick=fn;return b;}
function titre(parent,txt){const h=parent.createEl("div",{text:txt});h.style.cssText="font-weight:700;margin:14px 0 6px;font-size:1.05em;";return h;}
function vide(parent,txt){const v=parent.createEl("div",{text:txt});v.style.cssText="color:var(--text-muted);font-size:0.9em;";}
const STATUTS={"a apprendre":"⚪ À apprendre","en cours":"🟡 En cours","maitrise":"🟢 Maîtrisé"};
function st(p){return String(p.statut||"a apprendre").toLowerCase();}
const NOTIONS=dv.pages('"Notions"').where(p=>p.type==="notion");
const DOMAINES=dv.pages('"Notions"').where(p=>p.type==="domaine").sort(p=>p.file.folder);
async function creerNotion(nom,dossier,statut){
  nom=propre(nom); if(!nom||!dossier) return;
  const path=dossier+"/"+nom+".md";
  let f=app.vault.getAbstractFileByPath(path);
  if(!f){
    const t=app.vault.getAbstractFileByPath("Templates/Notion.md");
    let c=t?await app.vault.read(t):"";
    c=c.split("{{title}}").join(nom).split("{{statut}}").join(statut||"en cours");
    f=await app.vault.create(path,c);
  }
  await app.workspace.getLeaf(false).openFile(f);
}
function ligne(ul,p){
  const li=ul.createEl("li");
  lien(li,p.file.name,p.file.path);
  const s=li.createEl("span",{text:"  "+p.file.folder.split("/").pop().replace(/^\d+\s*/,"")});
  s.style.cssText="font-size:0.8em;color:var(--text-muted);";
}
function barre(parent,ok,cours,total){
  const b=parent.createEl("div");
  b.style.cssText="display:flex;height:8px;border-radius:4px;overflow:hidden;background:var(--background-modifier-border);flex:1;min-width:60px;";
  if(total){
    const g=b.createEl("div");g.style.cssText="width:"+(100*ok/total)+"%;background:#30a46c;";
    const y=b.createEl("div");y.style.cssText="width:"+(100*cours/total)+"%;background:#f5d90a;";
  }
}

const root=dv.container;

// Créer une notion
const f=root.createEl("div");f.style.cssText="display:flex;flex-wrap:wrap;gap:6px;";
const inp=f.createEl("input",{type:"text",placeholder:"Nouvelle notion (ex. JWT)"});
inp.style.cssText="flex:1;min-width:150px;padding:6px;border-radius:8px;";
const sel=f.createEl("select");sel.style.cssText="padding:6px;border-radius:8px;";
sel.createEl("option",{text:"— Domaine —",value:""});
for(const d of DOMAINES) sel.createEl("option",{text:d.file.name,value:d.file.folder});
const ss=f.createEl("select");ss.style.cssText="padding:6px;border-radius:8px;";
for(const [k,v] of Object.entries(STATUTS)) ss.createEl("option",{text:v,value:k});
ss.value="en cours";
bouton(f,"➕ Notion",async()=>{ if(!sel.value){new Notice("Choisis un domaine");return;} await creerNotion(inp.value,sel.value,ss.value); });

// Progression par domaine
titre(root,"📊 Progression");
const g=root.createEl("div");g.style.cssText="display:grid;grid-template-columns:auto 1fr auto;gap:6px 10px;align-items:center;";
let T=0,O=0;
for(const d of DOMAINES){
  const ns=NOTIONS.where(p=>p.file.folder===d.file.folder||p.file.folder.startsWith(d.file.folder+"/"));
  const plan=d.file.tasks.length, planOk=d.file.tasks.where(t=>t.completed).length;
  const ok=ns.where(p=>st(p)==="maitrise").length, cours=ns.where(p=>st(p)==="en cours").length;
  const total=Math.max(ns.length,plan);
  T+=total;O+=ok;
  lien(g,d.file.name,d.file.path).style.fontSize="0.9em";
  barre(g,ok,cours,total);
  const n=g.createEl("span",{text:ok+"/"+total});n.style.cssText="font-size:0.8em;color:var(--text-muted);";
}
const tot=root.createEl("div",{text:"🟢 maîtrisé · 🟡 en cours — total : "+O+" notions maîtrisées"});
tot.style.cssText="font-size:0.75em;color:var(--text-muted);margin-top:6px;";

// En cours
titre(root,"🟡 En cours");
const ec=NOTIONS.where(p=>st(p)==="en cours").sort(p=>p.file.mtime,"desc");
if(ec.length){const ul=root.createEl("ul");for(const p of ec)ligne(ul,p);} else vide(root,"Aucune notion en cours.");

// À revoir
titre(root,"🔁 À revoir (maîtrisées, pas revues depuis 30 jours)");
const lim=moment().subtract(30,"day").format("YYYY-MM-DD");
const ar=NOTIONS.where(p=>st(p)==="maitrise"&&(!p.revu||String(p.revu).slice(0,10)<lim)).sort(p=>String(p.revu||""));
if(ar.length){const ul=root.createEl("ul");for(const p of ar.slice(0,10))ligne(ul,p);} else vide(root,"Rien à revoir.");

// À apprendre
titre(root,"⚪ À apprendre");
const aa=NOTIONS.where(p=>st(p)==="a apprendre");
if(aa.length){const ul=root.createEl("ul");for(const p of aa.slice(0,12))ligne(ul,p);
  if(aa.length>12) vide(root,"… et "+(aa.length-12)+" autres : ouvre un domaine pour les voir toutes.");}
const rest=DOMAINES.file.tasks.where(t=>!t.completed).length;
const r=root.createEl("div",{text:"+ "+rest+" notions dans les plans d'apprentissage des domaines."});
r.style.cssText="font-size:0.85em;color:var(--text-muted);";
