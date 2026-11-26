---
type: course
order: 6
module: "[[Module 24 - .NET]]"
concepts:
  - "[[Exception]]"
tags:
  - cours
---
# 06 · Exceptions et logs

> [!info] À quoi ça sert
> Quand quelque chose ne va pas, le code **lève une exception**. Bien la gérer = renvoyer le bon code HTTP au client et écrire une trace utile dans les logs.

## 1. Lever et attraper

```csharp
if (product is null)
    throw new KeyNotFoundException($"Product {id} not found");   // lever

try
{
    await _repository.AddAsync(product);
}
catch (DbUpdateException ex)            // attraper UNE erreur précise
{
    _logger.LogError(ex, "Failed to save product {Name}", product.Name);
    throw;                              // la relancer telle quelle
}
finally
{
    // exécuté dans tous les cas
}
```

## 2. Les exceptions courantes

| Exception | Quand |
|---|---|
| `ArgumentException` / `ArgumentNullException` | mauvais paramètre |
| `KeyNotFoundException` | élément introuvable |
| `InvalidOperationException` | action impossible dans cet état |
| `UnauthorizedAccessException` | pas le droit |
| `NotImplementedException` | pas encore écrit |

Une équipe crée souvent les siennes : `public class NotFoundException : Exception { … }`.

## 3. Les logs : `ILogger`

```csharp
public class ProductService
{
    private readonly ILogger<ProductService> _logger;
    public ProductService(ILogger<ProductService> logger) => _logger = logger;

    public void Example(int id)
    {
        _logger.LogInformation("Loading product {Id}", id);    // {Id} est remplacé
        _logger.LogWarning("Stock low for {Id}", id);
    }
}
```

| Niveau | Pour |
|---|---|
| `LogDebug` | détail pour développer |
| `LogInformation` | étape normale |
| `LogWarning` | anormal mais pas bloquant |
| `LogError` | échec |

## À retenir
- `throw` pour signaler, `catch` seulement ce qu'on sait gérer.
- `throw;` relance sans perdre l'origine.
- `ILogger`, jamais `Console.WriteLine`.

> [!warning] Piège
> Un `catch` qui renvoie `false` ou ne fait rien cache l'erreur : on ne sait plus pourquoi ça échoue.

## Concepts
[[Exception]]

---
← [[Cours - .NET 05 - async, await et Task|async, await et Task]] · [[Cours - .NET - le plan|Le plan]] · [[Cours - .NET 07 - L'injection de dépendances|L'injection de dépendances]] →
