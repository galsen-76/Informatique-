---
type: exercise
status: a-faire
difficulty: difficile
concepts:
  - "[[Application monopage et routage]]"
  - "[[Effet React (useEffect)]]"
  - "[[Props React]]"
tags:
  - exercice
---
# Exercice — Ajouter un bouton qui appelle une API

> [!info] Objectif
> Reproduire en petit ce que tu feras dans CVAT : une SPA avec routes, une page de détail et un bouton qui déclenche un traitement côté serveur.
> Notions : [[Application monopage et routage]] · [[Effet React (useEffect)]] · [[Props React]]

## Consignes
- [ ] Reprends ton API Express de tâches (ou crée-en une avec `GET /api/taches`, `GET /api/taches/:id` et `POST /api/taches/:id/export` qui attend 2 secondes puis renvoie `{ fichier: "tache-12.png" }`)
- [ ] Dans l'application React, installe `react-router-dom` et crée les routes `/`, `/taches`, `/taches/:id` et une page 404
- [ ] Configure le proxy de Vite (`server.proxy: { "/api": "http://localhost:3000" }`) pour éviter CORS
- [ ] Mets tous les appels dans `src/api.ts` avec des fonctions typées qui vérifient `rep.ok`
- [ ] Sur la page détail, ajoute un composant `BoutonExport` : désactivé et affichant « Export… » pendant l'appel, puis un lien vers le fichier, ou l'erreur
- [ ] Fais `npm run build` puis `npm run preview`, ouvre directement `/taches/1` : que se passe-t-il ? Explique ce qu'il faudrait côté Nginx
- [ ] Ouvre le dépôt de CVAT et trouve dans `cvat-ui/src` un composant qui ajoute un bouton dans le menu d'une tâche

> [!question]- Indice
> État du bouton : `const [etat, setEtat] = useState<"repos" | "encours" | "ok" | "erreur">("repos")`. Le clic est un gestionnaire d'événement, pas un effet.

> [!question]- Solution
> ```tsx
> // api.ts
> export async function exporter(id: number): Promise<{ fichier: string }> {
>   const rep = await fetch(`/api/taches/${id}/export`, { method: "POST" });
>   if (!rep.ok) throw new Error(`Export impossible (${rep.status})`);
>   return rep.json();
> }
> // BoutonExport.tsx
> export default function BoutonExport({ id }: { id: number }) {
>   const [etat, setEtat] = useState<"repos" | "encours" | "ok" | "erreur">("repos");
>   const [resultat, setResultat] = useState("");
>   async function clic() {
>     setEtat("encours");
>     try { const r = await exporter(id); setResultat(r.fichier); setEtat("ok"); }
>     catch (e) { setResultat((e as Error).message); setEtat("erreur"); }
>   }
>   return (<div>
>     <button onClick={clic} disabled={etat === "encours"}>{etat === "encours" ? "Export…" : "Exporter en PNG"}</button>
>     {etat === "ok" && <a href={`/api/fichiers/${resultat}`}>{resultat}</a>}
>     {etat === "erreur" && <p role="alert">{resultat}</p>}
>   </div>);
> }
> // main.tsx
> <BrowserRouter><Routes>
>   <Route path="/" element={<Accueil />} />
>   <Route path="/taches" element={<ListeTaches />} />
>   <Route path="/taches/:id" element={<DetailTache />} />
>   <Route path="*" element={<Introuvable />} />
> </Routes></BrowserRouter>
> ```
> `vite preview` gère le repli ; un serveur statique simple renverrait une 404. Avec Nginx : `try_files $uri /index.html;`.

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
