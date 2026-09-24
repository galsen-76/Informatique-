---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M10
tags:
  - algo/arbres-graphes
aliases:
  - "Arbres et Graphes"
parent: "[[Algorithmes]]"
children: []
related_theory:
  - "[[ALGO-05-Recursivite|Récursivité]]"
  - "[[JS-08-DOM-Evenements|DOM et Événements JavaScript]]"
related_snippets:
  - "[[04_Snippets/algo-06-arbres-graphes]]"
related_projects: []
source: "https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/"
---

# Arbres et Graphes

> [!abstract] Introduction
> Un arbre est une hiérarchie (DOM, arborescence de fichiers, routes) ; un graphe est un réseau de nœuds reliés (réseau social, dépendances npm, itinéraires). Les parcours en profondeur (DFS) et en largeur (BFS) sont les algorithmes de base.

> [!warning]- Prérequis
> [[ALGO-05-Recursivite|Récursivité]]

---

## Théorie

> [!question]- C'est quoi ?
> - **Arbre** : un nœud racine, chaque nœud a des enfants, pas de cycle ; **arbre binaire de recherche** (BST) : gauche < nœud < droite → recherche O(log n) si équilibré
> - **Graphe** : nœuds + arêtes, orienté ou non, pondéré ou non ; représenté par liste d'adjacence (`Map<nœud, voisins[]>`)
> - **DFS** (profondeur, pile/récursion) ; **BFS** (largeur, file) → plus court chemin en nombre d'étapes

> [!example]- Analogie
> DFS : explorer un labyrinthe en suivant un couloir jusqu'au bout avant de revenir. BFS : l'onde d'un caillou dans l'eau qui s'étend cercle par cercle.

> [!question]- Pourquoi l'utiliser ?
> Le DOM, le graphe de dépendances d'un bundler, le graphe réactif des signals, les index B-tree des bases, la détection de dépendances circulaires : tout est arbre ou graphe.

> [!question]- Comment ça marche ?
> ```mermaid
> graph TD
>   A[app] --> B[films]
>   A --> C[auth]
>   B --> D[shared]
>   C --> D
>   D --> E[core]
> ```
> ```typescript
> function bfs(graphe: Map<string, string[]>, depart: string): string[] {
>   const vus = new Set([depart]);
>   const file = [depart];
>   const ordre: string[] = [];
>   while (file.length) {
>     const n = file.shift()!;
>     ordre.push(n);
>     for (const v of graphe.get(n) ?? []) if (!vus.has(v)) { vus.add(v); file.push(v); }
>   }
>   return ordre;
> }
> ```

> [!question]- Quand l'utiliser ?
> Hiérarchies (menus, catégories), dépendances, recommandations, chemins.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Sans ensemble « visités », un parcours de graphe avec cycle boucle à l'infini.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Racine | Nœud de départ d'un arbre |
| Feuille | Nœud sans enfant |
| Arête | Lien entre deux nœuds |
| DFS / BFS | Parcours en profondeur / en largeur |
| Tri topologique | Ordre respectant les dépendances |

---

## Points clés

- Arbre = graphe sans cycle avec une racine
- DFS = pile, BFS = file
- Toujours marquer les nœuds visités dans un graphe

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Oublier les cycles

---

## Exemple minimal

```typescript
// Construire un arbre depuis une liste plate (parentId), cas très courant côté API
function construireArbre<T extends { id: number; parentId: number | null }>(items: T[]) {
  const parId = new Map(items.map(i => [i.id, { ...i, enfants: [] as any[] }]));
  const racines: any[] = [];
  for (const n of parId.values()) (n.parentId === null ? racines : parId.get(n.parentId)!.enfants).push(n);
  return racines;
}
```

> [!note] Ce que j'en retiens
> Liste plate → arbre en O(n) grâce à une Map.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Tri topologique (ordre de build, migrations), Dijkstra pour les chemins pondérés

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Algorithmes]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/algo-06-arbres-graphes]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Quand utiliser BFS plutôt que DFS ?

---

## Tâches

- [ ] #task Résoudre « Maximum Depth of Binary Tree » et « Number of Islands »
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
