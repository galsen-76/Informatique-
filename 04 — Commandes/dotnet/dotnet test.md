---
type: command
tool: dotnet
level: debutant
concepts:
  - "[[Test automatisé]]"
  - "[[Test unitaire]]"
tags:
  - commande
  - dotnet
---
# dotnet test

> [!info] dotnet
> Compile puis lance tous les tests de la solution ou d'un projet de tests.

## Pourquoi l'utiliser
Vérifier en une commande que rien n'est cassé ; c'est elle que lance le job de tests de la CI.

## Dans quel contexte
Avant de pousser, et dans la CI.

## Syntaxe
```bash
dotnet test [<solution ou projet>] [--filter <expression>]
```

## Paramètres

| Élément | Rôle |
| --- | --- |
| `--filter` | ne lance que certains tests (`FullyQualifiedName~Calcul`) |
| `--logger trx` | écrit un rapport de résultats |
| `--collect "XPlat Code Coverage"` | mesure la couverture |

## Exemple concret
```bash
dotnet test
dotnet test --filter FullyQualifiedName~CalculTests
```

## Résultat attendu
`Passed! - Failed: 0, Passed: 12…` et un code de sortie 0, ou la liste des tests en échec avec la valeur attendue et la valeur obtenue.

## Variantes utiles
- `dotnet test --logger "console;verbosity=detailed"` : affiche chaque test

> [!warning] Erreurs fréquentes
> - `No test is available` : le projet de tests ne référence pas les paquets xUnit, ou les méthodes n'ont pas `[Fact]`

## Relier
- **Commandes complémentaires** : [[dotnet build]] · [[dotnet add]]
- **Concepts associés** : [[Test automatisé]] · [[Test unitaire]]
