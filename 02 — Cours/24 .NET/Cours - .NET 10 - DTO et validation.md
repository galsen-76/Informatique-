---
type: course
order: 10
module: "[[Module 24 - .NET]]"
concepts:
  - "[[Validation des données]]"
tags:
  - cours
---
# 10 · DTO et validation

> [!info] À quoi ça sert
> Un **DTO** (Data Transfer Object) est la forme des données qui **entrent** ou **sortent** de l'API. Il protège la base : le client ne voit et n'envoie que ce qu'on a prévu. La **validation** refuse ce qui est faux avant d'entrer dans le code.

## 1. Entité ≠ DTO

```csharp
// L'entité : ce qui est en base (chapitre 11)
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public decimal Price { get; set; }
    public decimal PurchaseCost { get; set; }   // interne : ne doit pas sortir
}

// Ce que le client reçoit
public record ProductDto(int Id, string Name, decimal Price);

// Ce que le client envoie pour créer
public record CreateProductDto(string Name, decimal Price);
```

Passer de l'un à l'autre :

```csharp
var dto = new ProductDto(product.Id, product.Name, product.Price);
var dtos = products.Select(p => new ProductDto(p.Id, p.Name, p.Price)).ToList();
```

(Certaines équipes utilisent une bibliothèque comme AutoMapper ou Mapster pour ça.)

## 2. Valider avec des attributs

```csharp
public class CreateProductDto
{
    [Required]                       // obligatoire
    [StringLength(100, MinimumLength = 1)]
    public string Name { get; set; } = "";

    [Range(0.01, 10000)]             // entre deux valeurs
    public decimal Price { get; set; }

    [EmailAddress]
    public string? SupplierEmail { get; set; }

    [JsonPropertyName("file_name")]  // nom du champ dans le JSON
    public string? FileName { get; set; }
}
```

Avec `[ApiController]`, si une règle échoue : **400 automatique**, la méthode n'est même pas appelée.

```json
{ "errors": { "Name": ["The Name field is required."] }, "status": 400 }
```

Certaines équipes utilisent **FluentValidation** (règles écrites en code dans une classe `…Validator`) : même rôle.

## À retenir
- Entité = la base, DTO = ce qui voyage en JSON.
- Un DTO par usage : lecture, création, modification.
- Les attributs `[Required]`, `[Range]`… valident tout seuls.

> [!warning] Piège
> Renvoyer l'entité directement : les champs internes (coût, mot de passe, id technique) partent dans la réponse.

Côté front, le même rôle est tenu par Zod : [[Fiche - Zod, valider les données en TypeScript]].

## Concepts
[[Validation des données]]

---
← [[Cours - .NET 09 - Controllers, routes et attributs|Controllers, routes et attributs]] · [[Cours - .NET - le plan|Le plan]] · [[Cours - .NET 11 - EF Core, la base de données|EF Core, la base de données]] →
