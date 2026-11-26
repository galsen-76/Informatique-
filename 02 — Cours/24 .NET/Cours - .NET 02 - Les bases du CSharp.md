---
type: course
order: 2
module: "[[Module 24 - .NET]]"
concepts:
  - "[[Variables et types]]"
  - "[[Fonction]]"
tags:
  - cours
---
# 02 · Les bases du C#

> [!info] À quoi ça sert
> Lire les lignes « ordinaires » d'un backend : variables, textes, conditions, méthodes. Tout est **typé** : le compilateur vérifie avant de lancer.

## 1. Variables et types

```csharp
int quantity = 3;            // nombre entier
decimal price = 9.99m;       // argent (le m est obligatoire)
string name = "Clavier";     // texte
bool isActive = true;        // vrai / faux
DateTime now = DateTime.UtcNow;

var total = price * quantity;   // var : le type est deviné (decimal), puis figé
```

`var` ne veut pas dire « n'importe quoi » : `total = "abc";` ne compile pas.

## 2. Le `null`

```csharp
string? comment = null;               // le ? : peut être null
int length = comment?.Length ?? 0;    // ?. : ne plante pas si null ; ?? : valeur par défaut
if (string.IsNullOrWhiteSpace(comment)) { /* vide */ }
```

Sans `?`, le compilateur prévient (avertissement CS8600…) si on y met `null`.

## 3. Textes

```csharp
var message = $"Produit {name} : {price} €";   // $ : on insère des valeurs
var path = @"C:\data\file.txt";                // @ : les \ sont gardés tels quels
bool found = name.Contains("clav", StringComparison.OrdinalIgnoreCase);
```

## 4. Conditions et `switch`

```csharp
if (quantity <= 0) return;

var label = quantity switch          // switch expression : renvoie une valeur
{
    0 => "vide",
    < 10 => "peu",
    _ => "beaucoup"                  // _ = tous les autres cas
};
```

## 5. Méthodes

```csharp
public decimal ComputeTotal(decimal price, int quantity)
{
    return price * quantity;
}

// la même, en une ligne
public decimal ComputeTotal(decimal price, int quantity) => price * quantity;
```

`public` = visible de l'extérieur, `private` = seulement dans la classe. Le type avant le nom = ce qui est renvoyé (`void` = rien).

## À retenir
- Chaque valeur a un type, vérifié à la compilation.
- `?` = peut être null, `?.` et `??` pour s'en protéger.
- `$"…{x}"` pour construire un texte.

> [!warning] Piège
> `==` sur deux textes compare le contenu, mais respecte les majuscules : utiliser `StringComparison.OrdinalIgnoreCase` pour les ignorer.

Toute la syntaxe d'un coup d'œil : [[Fiche - Syntaxe CSharp en un coup d'œil]].

## Concepts
[[Variables et types]] · [[Fonction]]

---
← [[Cours - .NET 01 - Le SDK, les projets et la solution|Le SDK, les projets et la solution]] · [[Cours - .NET - le plan|Le plan]] · [[Cours - .NET 03 - Classes, propriétés, record et interface|Classes, propriétés, record et interface]] →
