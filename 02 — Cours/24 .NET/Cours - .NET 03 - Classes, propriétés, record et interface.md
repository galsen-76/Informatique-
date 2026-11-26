---
type: course
order: 3
module: "[[Module 24 - .NET]]"
concepts:
  - "[[Classe et objet]]"
  - "[[Interface et polymorphisme]]"
tags:
  - cours
---
# 03 · Classes, propriétés, record et interface

> [!info] À quoi ça sert
> En C#, **tout** est dans une classe. Un backend est fait de trois sortes de classes : celles qui **portent des données** (entité, DTO), celles qui **font quelque chose** (service, repository), et les **interfaces** qui décrivent un contrat.

## 1. Une classe de données : les propriétés

```csharp
public class Product
{
    public int Id { get; set; }                // lisible et modifiable
    public string Name { get; set; } = "";     // valeur par défaut
    public decimal Price { get; set; }
    public DateTime CreatedAt { get; init; }   // init : fixé à la création seulement
}

var p = new Product { Name = "Clavier", Price = 29.90m };
p.Price = 25m;
```

`{ get; set; }` = une **propriété** : un champ avec une porte d'entrée et de sortie.

## 2. Un `record` : une donnée en une ligne

```csharp
public record ProductDto(int Id, string Name, decimal Price);

var dto = new ProductDto(1, "Clavier", 29.90m);
var copy = dto with { Price = 25m };   // copie avec un champ changé
```

Utilisé pour les **DTO** : ce qui voyage en JSON.

## 3. Une classe qui fait quelque chose

```csharp
public class PriceCalculator
{
    private readonly decimal _vatRate;          // champ privé, fixé une fois

    public PriceCalculator(decimal vatRate)     // constructeur : appelé par new
    {
        _vatRate = vatRate;
    }

    public decimal WithVat(decimal price) => price * (1 + _vatRate);
}

var calc = new PriceCalculator(0.20m);
var ttc = calc.WithVat(100m);   // 120
```

Convention : un champ privé commence par `_`.

## 4. L'interface : un contrat

```csharp
public interface IProductRepository           // le I devant = interface
{
    Task<Product?> GetByIdAsync(int id);
    Task AddAsync(Product product);
}

public class ProductRepository : IProductRepository   // : = « remplit le contrat »
{
    public Task<Product?> GetByIdAsync(int id) { /* … */ }
    public Task AddAsync(Product product) { /* … */ }
}
```

Le reste du code ne connaît **que l'interface**. On peut alors changer la classe (une fausse pour les tests) sans toucher au reste. C'est la base de l'injection (chapitre 07).

## 5. L'héritage

```csharp
public class ProductsController : ControllerBase   // hérite de ControllerBase (.NET)
{
    // on peut utiliser Ok(), NotFound()… écrites par .NET
}
```

## À retenir
- Propriété `{ get; set; }` = donnée, méthode = action.
- `record` = petite classe de données (DTO).
- `IXxx` = interface, `: IXxx` = la classe qui la remplit.

> [!warning] Piège
> Une classe qui fait tout (données + base + HTTP) : impossible à tester. Une classe = un rôle.

## Concepts
[[Classe et objet]] · [[Interface et polymorphisme]]

---
← [[Cours - .NET 02 - Les bases du CSharp|Les bases du C#]] · [[Cours - .NET - le plan|Le plan]] · [[Cours - .NET 04 - Listes et LINQ|Listes et LINQ]] →
