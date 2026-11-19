---
type: concept
domain: frontend
module: "[[Module 11 - React]]"
status: a-decouvrir
level: debutant
niveau: 4
schema: false
exercice_visuel: false
fil_rouge: false
prerequisites:
  - "[[Composant d'interface]]"
  - "[[Méthodes de tableau (map, filter, reduce)]]"
parents:
  - "[[Composant d'interface]]"
related:
  - "[[État et réactivité]]"
next_review: 
tags:
  - concept
  - frontend
---
# Liste et clé en React

> [!info] En une phrase
> Pour afficher une liste, on transforme un tableau en éléments avec map, et chaque élément reçoit une prop key unique et stable pour que React sache lequel est lequel.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
```tsx
<ul>
  {taches.map((t) => (
    <li key={t.id}>{t.nom}</li>
  ))}
</ul>
```
- La **clé** (`key`) identifie un élément d'un rendu à l'autre : React sait alors quoi ajouter, déplacer ou supprimer.
- Utilise un **identifiant stable** venant des données (`t.id`).
- L'**indice** (`key={i}`) pose problème si la liste peut être triée, filtrée ou si on insère au début : l'état d'une ligne (case cochée, champ saisi) se retrouve sur la mauvaise ligne.

### Pourquoi ça existe
Presque toute interface affiche des listes qui changent.

### Le problème résolu
Mettre à jour efficacement et correctement une liste sans tout recréer.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
T[Tableau] --> M[map]
  M --> E[Éléments avec key]
  E --> R[React compare les clés]
```

### Exemple concret
```tsx
function ListeTaches({ taches, onSupprimer }: { taches: Tache[]; onSupprimer: (id: number) => void }) {
  if (taches.length === 0) return <p>Aucune tâche</p>;
  return (
    <ul>
      {taches
        .filter((t) => !t.archivee)
        .sort((a, b) => a.nom.localeCompare(b.nom))
        .map((t) => (
          <li key={t.id}>
            {t.nom} <button onClick={() => onSupprimer(t.id)}>Supprimer</button>
          </li>
        ))}
    </ul>
  );
}
```
Attention : `sort` modifie le tableau ; sur un état, trie une copie (`[...taches].sort(…)` ou `toSorted`).

### Cas d'utilisation
- Tableaux de données
- Listes de tâches, d'annotations, de résultats
- Menus générés

> [!warning] À ne pas confondre
> La `key` n'est pas une prop lisible par l'enfant : si l'enfant a besoin de l'id, passe-le aussi en prop. Et React affiche un avertissement *Each child in a list should have a unique "key" prop* : ne l'ignore pas.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] 🛣️ Suis le trajet
> Dessine une liste de trois dépenses, puis la suppression de celle du milieu. Montre comment React retrouve les lignes grâce à leur `key`.

> [!example] ⚖️ Avant / après
> Avant / après : `key={index}` puis `key={depense.id}`. Dessine ce qui se mélange dans le premier cas.

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Liste et clé en React » et je l'intègre ici avec `![[Schéma - Liste et clé en React.excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : elle sera pratiquée dans le fil rouge de son niveau (voir [[Niveaux]]).

## 4 · Relier
- **Prérequis** : [[Composant d'interface]] · [[Méthodes de tableau (map, filter, reduce)]]
- **Complémentaires** : [[État et réactivité]]

## 5 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation (compris, puis maîtrisé)
Trois cases à cocher dans les propriétés de la fiche :
- `schema` : mon dessin du concept est dans « Mon schéma » ;
- `exercice_visuel` : j'ai fait et corrigé les exercices visuels de la section 3 ;
- `fil_rouge` : je l'ai appliqué dans le fil rouge (coché tout seul quand une étape qui l'utilise est réussie).

Les trois cochées : la notion compte comme **comprise**. **Maîtrisé** : c'est moi qui le mets dans `status`, quand je le sens.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
