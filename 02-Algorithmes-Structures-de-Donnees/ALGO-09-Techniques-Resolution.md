---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Avancé
month: M12
tags:
  - algo/techniques
aliases:
  - "Techniques de Résolution d'Algorithmes"
parent: "[[Algorithmes]]"
related_theory:
  - "[[ALGO-01-Complexite-Big-O|Complexité Big O]]"
  - "[[ALGO-04-Tables-de-Hachage-Map-Set|Tables de Hachage Map et Set]]"
related_projects: []
source: "https://neetcode.io/roadmap"
---

# Techniques de Résolution d'Algorithmes

> [!abstract] En bref
> Les exercices d'algorithmes en entretien (type LeetCode) paraissent tous différents, mais reviennent à **une dizaine de schémas**. L'essentiel : une **méthode** (comprendre, solution simple, améliorer, tester) et savoir **reconnaître le schéma** dans l'énoncé. À préparer avant la recherche d'emploi, à raison de 2 ou 3 exercices par semaine.

## La méthode en entretien

1. **Reformuler** l'énoncé et poser des questions : les données sont-elles triées ? Peut-il y avoir des doublons ? Un tableau vide ?
2. **Faire un exemple** à la main.
3. **Proposer une solution simple** qui marche, même lente, et donner sa complexité.
4. **L'améliorer** : peut-on éviter la double boucle ? Une `Map` aiderait-elle ?
5. **Coder en parlant à voix haute** : le recruteur évalue ta réflexion autant que le résultat.
6. **Tester** avec l'exemple et les cas limites (vide, un seul élément, valeurs négatives).

## Reconnaître le schéma

| L'énoncé parle de… | Pense à | Note |
|---|---|---|
| « existe-t-il », « compter », « doublons » | **Map / Set** | [[ALGO-04-Tables-de-Hachage-Map-Set\|Map et Set]] |
| tableau **trié**, paires | **deux pointeurs** ou recherche binaire | [[ALGO-02-Tableaux-Chaines\|Tableaux]], [[ALGO-08-Recherche-Binaire\|Recherche binaire]] |
| sous-tableau ou sous-chaîne **d'affilée** | **fenêtre glissante** | [[ALGO-02-Tableaux-Chaines\|Tableaux]] |
| parenthèses, « annuler », « le prochain plus grand » | **pile** | [[ALGO-03-Piles-Files-Listes-Chainees\|Piles et files]] |
| grille, arbre, réseau, plus court chemin | **parcours en profondeur / largeur** | [[ALGO-06-Arbres-Graphes\|Arbres et graphes]] |
| « nombre de façons », « le meilleur », sous-problèmes répétés | **programmation dynamique** | ci-dessous |
| « toutes les combinaisons » | **retour arrière** (*backtracking*) | [[ALGO-05-Recursivite\|Récursivité]] |

## L'exemple type : Two Sum

« Trouver deux nombres du tableau dont la somme vaut `target`. »

```ts
// Solution simple : deux boucles, O(n²)
// Solution améliorée : une Map des nombres déjà vus, O(n)
function twoSum(nums: number[], target: number): [number, number] | null {
  const seen = new Map<number, number>();          // valeur → index
  for (let i = 0; i < nums.length; i++) {
    const missing = target - nums[i];
    if (seen.has(missing)) return [seen.get(missing)!, i];
    seen.set(nums[i], i);
  }
  return null;
}
```

Le réflexe : **« ai-je déjà vu ce qu'il me manque ? »** → une Map.

## La programmation dynamique, simplement

Quand un problème se découpe en sous-problèmes **qui se répètent**, on **retient** les résultats au lieu de les recalculer.

« De combien de façons monter n marches, par 1 ou 2 à la fois ? » Pour arriver à la marche n, on vient de n-1 ou de n-2 : `ways(n) = ways(n-1) + ways(n-2)`.

```ts
function stairs(n: number): number {
  let [prev, curr] = [1, 1];
  for (let i = 2; i <= n; i++) [prev, curr] = [curr, prev + curr];
  return curr;
}
```

## S'entraîner

- **LeetCode** ou **NeetCode** (liste « NeetCode 150 » organisée par schéma) ;
- commencer par les niveaux *Easy*, un schéma à la fois ;
- après chaque exercice : noter le schéma et l'astuce en une ligne.

## Pièges

- **Coder tout de suite** sans clarifier l'énoncé.
- **Rester silencieux** pendant l'entretien.
- **Viser directement la solution optimale** : une solution simple qui marche vaut mieux que rien.
- **Ne faire que ça** : en entreprise, concevoir, lire du code et collaborer comptent bien plus.
