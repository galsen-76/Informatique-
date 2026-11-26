---
type: course
order: 14
module: "[[Module 24 - .NET]]"
concepts:
  - "[[Test unitaire]]"
  - "[[Doublure de test (mock)]]"
tags:
  - cours
---
# 14 · Tester avec xUnit

> [!info] À quoi ça sert
> Vérifier automatiquement qu'une règle marche, sans lancer l'API à la main. Grâce aux interfaces (chapitre 07), on teste un service en remplaçant son repository par un faux.

## 1. Le projet de tests

```shell
dotnet new xunit -o MonApp.Tests
dotnet add MonApp.Tests reference MonApp.Application
dotnet test
```

## 2. Un test

```csharp
public class PriceCalculatorTests
{
    [Fact]                                       // un test
    public void WithVat_AddsTwentyPercent()
    {
        var calc = new PriceCalculator(0.20m);   // préparer

        var result = calc.WithVat(100m);         // agir

        Assert.Equal(120m, result);              // vérifier
    }

    [Theory]                                     // le même test avec plusieurs valeurs
    [InlineData(0, 0)]
    [InlineData(50, 60)]
    public void WithVat_Works(decimal price, decimal expected)
        => Assert.Equal(expected, new PriceCalculator(0.20m).WithVat(price));
}
```

## 3. Remplacer une dépendance : Moq

```csharp
[Fact]
public async Task Create_Throws_WhenNameExists()
{
    var repo = new Mock<IProductRepository>();
    repo.Setup(r => r.ExistsByNameAsync("Clavier")).ReturnsAsync(true);   // le faux répond "existe"

    var service = new ProductService(repo.Object);

    await Assert.ThrowsAsync<InvalidOperationException>(
        () => service.CreateAsync(new CreateProductDto("Clavier", 10m)));

    repo.Verify(r => r.AddAsync(It.IsAny<Product>()), Times.Never);       // rien n'a été ajouté
}
```

| Écriture | Sens |
|---|---|
| `[Fact]` | un test |
| `[Theory]` + `[InlineData]` | un test, plusieurs jeux de valeurs |
| `Assert.Equal(attendu, obtenu)` | égalité |
| `Assert.ThrowsAsync<T>(…)` | doit lever cette exception |
| `new Mock<IXxx>()` | un faux objet |
| `.Setup(…).ReturnsAsync(…)` | ce que le faux répond |
| `.Verify(…, Times.Once)` | vérifier qu'il a été appelé |

## À retenir
- Un test = préparer, agir, vérifier.
- On teste le **service**, avec un faux repository.
- `dotnet test` à la racine lance tout.

> [!warning] Piège
> Un test qui dépend d'un chemin de fichier sur ton PC (`C:\Users\…`) échoue chez les autres et dans la CI.

## Concepts
[[Test unitaire]] · [[Doublure de test (mock)]]

---
← [[Cours - .NET 13 - Authentification et Authorize|Authentification et Authorize]] · [[Cours - .NET - le plan|Le plan]]
