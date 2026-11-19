---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[React]]"
  - "[[Composant React]]"
  - "[[Props React]]"
  - "[[Liste et clé en React]]"
  - "[[Outil de build front (Vite)]]"
tags:
  - exercice
---
# Exercice — Construire une interface en composants React

> [!info] Objectif
> Créer un projet React et afficher une liste de tâches à partir de données, en composants.
> Notions : [[React]] · [[Composant React]] · [[Props React]] · [[Liste et clé en React]] · [[Outil de build front (Vite)]]

## Consignes
- [ ] Crée un projet `npm create vite@latest taches -- --template react-ts`, lance-le
- [ ] Dans `src/donnees.ts`, exporte un tableau typé de 5 tâches (`id`, `nom`, `statut`, `labels`)
- [ ] Crée les composants `EnTete`, `ListeTaches`, `CarteTache` et `Badge`, chacun dans son fichier, avec des props typées
- [ ] `ListeTaches` reçoit les tâches en props et les affiche avec `map` et une `key` correcte
- [ ] Affiche « Aucune tâche » si la liste est vide
- [ ] Crée un composant `Bouton` avec une prop `onClick` ; un clic sur une carte affiche son nom dans la console
- [ ] Lance `npm run build` et regarde le contenu de `dist/`

> [!question]- Indice
> Type des props : `function CarteTache({ tache, onChoisir }: { tache: Tache; onChoisir: (t: Tache) => void })`.

> [!question]- Solution
> ```tsx
> // types.ts
> export interface Tache { id: number; nom: string; statut: "a-faire" | "en-cours" | "fini"; labels: string[] }
> // Badge.tsx
> export default function Badge({ statut }: { statut: Tache["statut"] }) {
>   return <span className={`badge ${statut}`}>{statut}</span>;
> }
> // CarteTache.tsx
> export default function CarteTache({ tache, onChoisir }: { tache: Tache; onChoisir: (t: Tache) => void }) {
>   return (
>     <article className="carte" onClick={() => onChoisir(tache)}>
>       <h2>{tache.nom}</h2>
>       <Badge statut={tache.statut} />
>       <p>{tache.labels.join(", ")}</p>
>     </article>
>   );
> }
> // ListeTaches.tsx
> export default function ListeTaches({ taches }: { taches: Tache[] }) {
>   if (taches.length === 0) return <p>Aucune tâche</p>;
>   return <section>{taches.map((t) => <CarteTache key={t.id} tache={t} onChoisir={(x) => console.log(x.nom)} />)}</section>;
> }
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
