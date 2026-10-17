
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

const root=dv.container, cur=dv.current();
const f=root.createEl("div");f.style.cssText="display:flex;gap:6px;";
const inp=f.createEl("input",{type:"text",placeholder:"Nouvelle notion dans ce domaine"});
inp.style.cssText="flex:1;padding:6px;border-radius:8px;";
bouton(f,"➕",()=>creerNotion(inp.value,cur.file.folder,"en cours"));
const ns=NOTIONS.where(p=>p.file.folder===cur.file.folder||p.file.folder.startsWith(cur.file.folder+"/"));
for(const [k,v] of [["en cours","🟡 En cours"],["a apprendre","⚪ À apprendre"],["maitrise","🟢 Maîtrisé"]]){
  const l=ns.where(p=>st(p)===k).sort(p=>p.file.folder+"/"+p.file.name);
  if(!l.length) continue;
  titre(root,v+" ("+l.length+")");
  const ul=root.createEl("ul");
  for(const p of l){const li=ul.createEl("li");lien(li,p.file.name,p.file.path);
    const sd=p.file.folder.slice(cur.file.folder.length+1); if(sd){const t=li.createEl("span",{text:"  "+sd});t.style.cssText="font-size:0.75em;color:var(--text-muted);";}
    if(p.resume){const s=li.createEl("span",{text:" — "+p.resume});s.style.cssText="font-size:0.85em;color:var(--text-muted);";}}
}
if(!ns.length) vide(root,"Aucune notion pour l'instant. Pioche dans le plan ci-dessous.");
