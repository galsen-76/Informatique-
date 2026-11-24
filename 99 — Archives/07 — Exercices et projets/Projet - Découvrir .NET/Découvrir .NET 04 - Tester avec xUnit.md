---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Test automatisé]]"
  - "[[Test unitaire]]"
  - "[[Test d'intégration]]"
  - "[[Projet et solution .NET]]"
tags:
  - exercice
  - mini-projet
---
# Découvrir .NET 04 - Tester avec xUnit

> [!info] Où tu en es
> **Projet :** [[Projet - Découvrir .NET]] · **Étape précédente :** [[Découvrir .NET 03 - Une API minimale]]
> **Cours :** [[Cours - Tester du code .NET]]
> **Notions :** [[Test automatisé]] · [[Test unitaire]] · [[Test d'intégration]] · [[Projet et solution .NET]]

## Le but
`dotnet test` à la racine lance des tests sur les calculs de Core et sur au moins deux routes de l'API, et tout passe.

## Ce que tu fais
- [ ] Crée un projet de tests xUnit `tests/MesDepenses.Core.Tests`, ajoute-le à la solution, fais-lui référencer Core
- [ ] Écris 4 tests de `Calcul` : liste vide, une seule dépense, plusieurs catégories, une catégorie absente
- [ ] Écris un test qui vérifie qu'une dépense à -5 € est refusée
- [ ] Transforme un de tes tests en `[Theory]` avec trois jeux de valeurs
- [ ] Casse volontairement le calcul du total : lis le message de l'échec. Où sont la valeur attendue et la valeur obtenue ? Répare
- [ ] Bonus : un deuxième projet de tests pour l'API, qui vérifie qu'un `GET /depenses/999` renvoie 404 et qu'un `POST` valide renvoie 201
- [ ] Commit

> [!warning] Le piège
> Un test qui passe du premier coup ne prouve rien tant que tu ne l'as pas vu échouer. Casse le code exprès une fois pour chaque test important.

> [!success] Ça marche si…
> `dotnet test` à la racine affiche au moins 6 tests réussis et 0 échec, et tu as vu chaque test échouer au moins une fois.

> [!quote] Mes notes
> _Ce que j'ai compris, ce qui a coincé._

> [!question]- Indice
> La syntaxe d'un test est dans [[Test automatisé]] (encadré « Comment ça s'écrit »). Pour l'API, le cours montre `WebApplicationFactory` ; n'oublie pas `public partial class Program { }`.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] Claude a relu mes notes
