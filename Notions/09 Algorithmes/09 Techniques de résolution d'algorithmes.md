---
type: notion
statut: a apprendre
resume: "Les exercices d'algorithmes en entretien (type LeetCode) paraissent tous différents, mais reviennent à une dizaine de schémas."
revu:
sources:
  - "https://neetcode.io/roadmap"
---
# Techniques de résolution d'algorithmes

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Les exercices d'algorithmes en entretien (type LeetCode) paraissent tous différents, mais reviennent à **une dizaine de schémas**.

## Le problème

**Pourquoi c'est utile ?**
Pour aborder un exercice d'algorithme avec une méthode et reconnaître le schéma qui se cache derrière.

**Qu'est-ce qui se passait sans ça ?**
Chaque exercice d'entretien semblait nouveau : on paniquait, on codait sans plan, et on bloquait.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

L'essentiel : une **méthode** (comprendre, solution simple, améliorer, tester) et savoir **reconnaître le schéma** dans l'énoncé. À préparer avant la recherche d'emploi, à raison de 2 ou 3 exercices par semaine.

### La méthode en entretien

1. **Reformuler** l'énoncé et poser des questions : les données sont-elles triées ? Peut-il y avoir des doublons ? Un tableau vide ?
2. **Faire un exemple** à la main.
3. **Proposer une solution simple** qui marche, même lente, et donner sa complexité.
4. **L'améliorer** : peut-on éviter la double boucle ? Une `Map` aiderait-elle ?
5. **Coder en parlant à voix haute** : le recruteur évalue ta réflexion autant que le résultat.
6. **Tester** avec l'exemple et les cas limites (vide, un seul élément, valeurs négatives).

### Reconnaître le schéma

| L'énoncé parle de… | Pense à | Note |
|---|---|---|
| « existe-t-il », « compter », « doublons » | **Map / Set** | Map et Set |
| tableau **trié**, paires | **deux pointeurs** ou recherche binaire | Tableaux, Recherche binaire |
| sous-tableau ou sous-chaîne **d'affilée** | **fenêtre glissante** | Tableaux |
| parenthèses, « annuler », « le prochain plus grand » | **pile** | Piles et files |
| grille, arbre, réseau, plus court chemin | **parcours en profondeur / largeur** | Arbres et graphes |
| « nombre de façons », « le meilleur », sous-problèmes répétés | **programmation dynamique** | ci-dessous |
| « toutes les combinaisons » | **retour arrière** (*backtracking*) | Récursivité |

### La programmation dynamique, simplement

Quand un problème se découpe en sous-problèmes **qui se répètent**, on **retient** les résultats au lieu de les recalculer.

« De combien de façons monter n marches, par 1 ou 2 à la fois ? » Pour arriver à la marche n, on vient de n-1 ou de n-2 : `ways(n) = ways(n-1) + ways(n-2)`.

```ts
function stairs(n: number): number {
  let [prev, curr] = [1, 1];
  for (let i = 2; i <= n; i++) [prev, curr] = [curr, prev + curr];
  return curr;
}
```

## 🧪 Exemple

### L'exemple type : Two Sum

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

## ⚠️ Limites et pièges

- **Coder tout de suite** sans clarifier l'énoncé.
- **Rester silencieux** pendant l'entretien.
- **Viser directement la solution optimale** : une solution simple qui marche vaut mieux que rien.
- **Ne faire que ça** : en entreprise, concevoir, lire du code et collaborer comptent bien plus.

## 🏋️ S'entraîner

### S'entraîner

- **LeetCode** ou **NeetCode** (liste « NeetCode 150 » organisée par schéma) ;
- commencer par les niveaux *Easy*, un schéma à la fois ;
- après chaque exercice : noter le schéma et l'astuce en une ligne.

## 🔗 Liens

- **Prérequis :** [[01 Complexité Big O|Complexité Big O]]
- **Voir aussi :** [[04 Tables de hachage Map et Set|Tables de hachage Map et Set]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://neetcode.io/roadmap
