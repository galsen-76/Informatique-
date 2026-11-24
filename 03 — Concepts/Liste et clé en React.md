---
type: concept
module: "[[Module 11 - React]]"
related:
  - "[[État et réactivité]]"
tags:
  - concept
  - frontend
---
# Liste et clé en React

> [!info] En une phrase
> Pour afficher une liste, on transforme un tableau en éléments avec map, et chaque élément reçoit une prop key unique et stable pour que React sache lequel est lequel.

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

## 3 · Relier
- **Prérequis** : [[Composant d'interface]] · [[Méthodes de tableau (map, filter, reduce)]]
- **Complémentaires** : [[État et réactivité]]
