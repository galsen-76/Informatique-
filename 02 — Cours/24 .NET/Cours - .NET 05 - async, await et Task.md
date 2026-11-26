---
type: course
order: 5
module: "[[Module 24 - .NET]]"
concepts:
  - "[[async et await]]"
tags:
  - cours
---
# 05 · async, await et Task

> [!info] À quoi ça sert
> Un backend attend tout le temps : la base, un fichier, une autre API. `async`/`await` permet d'attendre **sans bloquer** le serveur, qui sert d'autres requêtes pendant ce temps.

## 1. Lire une méthode async

```csharp
public async Task<Product?> GetByIdAsync(int id)
{
    var product = await _context.Products.FindAsync(id);   // on attend la base
    return product;
}
```

| Morceau | Sens |
|---|---|
| `async` | la méthode contient des `await` |
| `Task<Product?>` | « je renverrai un `Product?` plus tard » (comme `Promise<T>` en JS) |
| `Task` (sans `<>`) | « je renverrai rien, plus tard » |
| `await` | attendre le résultat avant la ligne suivante |
| `…Async` à la fin du nom | convention : la méthode renvoie une `Task` |

## 2. L'appeler

```csharp
var product = await _repository.GetByIdAsync(12);   // dans une méthode async
```

Dès qu'on appelle un `…Async`, la méthode appelante devient `async` aussi : ça remonte jusqu'au controller.

## 3. Lancer plusieurs choses en même temps

```csharp
var t1 = _repository.GetByIdAsync(1);
var t2 = _repository.GetByIdAsync(2);
await Task.WhenAll(t1, t2);    // comme Promise.all en JS
```

## 4. Annuler : `CancellationToken`

```csharp
public async Task<List<Product>> GetAllAsync(CancellationToken ct)
{
    return await _context.Products.ToListAsync(ct);   // s'arrête si le client part
}
```

## À retenir
- `Task<T>` = un résultat qui arrivera plus tard.
- Toujours `await` un `…Async`.
- `async` remonte jusqu'au controller.

> [!warning] Piège
> Oublier `await` : la méthode continue sans le résultat, et l'erreur arrive ailleurs. Ne jamais utiliser `.Result` ou `.Wait()` : ça peut figer l'application.

## Concepts
[[async et await]]

---
← [[Cours - .NET 04 - Listes et LINQ|Listes et LINQ]] · [[Cours - .NET - le plan|Le plan]] · [[Cours - .NET 06 - Exceptions et logs|Exceptions et logs]] →
