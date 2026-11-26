---
type: course
order: 4
module: "[[Module 24 - .NET]]"
concepts:
  - "[[Liste et dictionnaire]]"
  - "[[Motifs de boucle]]"
tags:
  - cours
---
# 04 · Listes et LINQ

> [!info] À quoi ça sert
> Presque toutes les données d'un backend sont des **listes**. **LINQ** les filtre, les trie et les transforme, et EF Core traduit ces mêmes méthodes en SQL.

## 1. Les collections

```csharp
var names = new List<string> { "Clavier", "Souris" };
names.Add("Écran");

string[] colors = ["rouge", "vert"];                // tableau (C# 12)
var stock = new Dictionary<string, int> { ["Clavier"] = 5 };
var unique = new HashSet<string> { "a", "b" };      // sans doublon, recherche rapide

foreach (var name in names) { /* … */ }
```

`List<string>` : le `<string>` dit ce que contient la liste (un **générique**).

## 2. LINQ : une chaîne d'étapes

```csharp
var cheapNames = products
    .Where(p => p.Price < 50)        // garder
    .OrderBy(p => p.Price)           // trier
    .Select(p => p.Name)             // transformer
    .ToList();                       // exécuter, obtenir une List
```

`p => p.Price < 50` est une **lambda** : « pour chaque `p`, est-ce que son prix est < 50 ? ».

## 3. Les méthodes qu'on croise

| Méthode | Renvoie |
|---|---|
| `.Where(x => …)` | les éléments qui respectent la règle |
| `.Select(x => …)` | chaque élément transformé |
| `.SelectMany(x => x.Items)` | toutes les sous-listes mises bout à bout |
| `.OrderBy` / `.OrderByDescending` | trié |
| `.First()` / `.FirstOrDefault()` | le premier (ou `null` si aucun) |
| `.Any(x => …)` / `.All(x => …)` | vrai / faux |
| `.Count()` `.Sum(x => …)` `.Max(…)` | un nombre |
| `.GroupBy(x => x.Category)` | des groupes |
| `.Concat(autre)` / `.Append(x)` | la liste + d'autres éléments |
| `.ToList()` / `.ToArray()` | exécute et range dans une liste |

```csharp
bool hasExpensive = products.Any(p => p.Price > 1000);
decimal total = products.Sum(p => p.Price);
var text = string.Join(", ", names);     // "Clavier, Souris, Écran"
```

## À retenir
- `Where` filtre, `Select` transforme, `ToList` exécute.
- Une lambda `x => …` = une petite fonction sans nom.
- Une liste se colle en texte avec `string.Join`, pas avec `ToString()`.

> [!warning] Piège
> `.ToList().Where(...)` charge **tout** puis filtre. Avec une base, toujours `.Where(...)` **avant** `.ToList()`.

## Concepts
[[Liste et dictionnaire]] · [[Motifs de boucle]]

---
← [[Cours - .NET 03 - Classes, propriétés, record et interface|Classes, propriétés, record et interface]] · [[Cours - .NET - le plan|Le plan]] · [[Cours - .NET 05 - async, await et Task|async, await et Task]] →
