
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
const file=app.vault.getAbstractFileByPath(cur.file.path);
const row=root.createEl("div");row.style.cssText="display:flex;flex-wrap:wrap;gap:6px;align-items:center;";
const now=st(cur);
for(const [k,v] of Object.entries(STATUTS)){
  const b=bouton(row,v,async()=>{
    await app.fileManager.processFrontMatter(file,fm=>{fm.statut=k;if(k==="maitrise")fm.revu=moment().format("YYYY-MM-DD");});
  });
  if(k===now){b.style.outline="2px solid var(--interactive-accent)";b.style.fontWeight="700";}
}
bouton(row,"🔁 Revu aujourd'hui",async()=>{
  await app.fileManager.processFrontMatter(file,fm=>{fm.revu=moment().format("YYYY-MM-DD");});
  new Notice("Révision notée ✔");
});
const parts=cur.file.folder.split("/"), domDir=parts.slice(0,2).join("/"), dom=parts[1]||"";
const info=root.createEl("div");info.style.cssText="font-size:0.8em;color:var(--text-muted);margin-top:4px;";
info.createEl("span",{text:"Domaine : "});
lien(info,dom.replace(/^\d+\s*/,""),domDir+"/"+dom+".md");
if(parts.length>2) info.createEl("span",{text:" › "+parts.slice(2).join(" › ")});
if(cur.revu) info.createEl("span",{text:" · revu le "+moment(String(cur.revu).slice(0,10)).format("D MMM YYYY")});
