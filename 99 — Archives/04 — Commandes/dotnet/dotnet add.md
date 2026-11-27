---
type: command
tool: dotnet
level: debutant
concepts:
  - "[[Gestionnaire de paquets]]"
  - "[[Projet et solution .NET]]"
tags:
  - commande
  - dotnet
---
# dotnet add

> [!info] dotnet
> Ajoute à un projet un paquet NuGet ou une référence vers un autre projet.

## Pourquoi l'utiliser
Ne jamais éditer le `.csproj` à la main pour ça : la commande met la bonne ligne et télécharge le paquet.

## Dans quel contexte
Quand un projet a besoin d'une bibliothèque externe ou du code d'un autre projet de la solution.

## Syntaxe
```bash
dotnet add [<projet>] package <nom> [--version <v>]
dotnet add [<projet>] reference <autre projet>
```

## Paramètres

| Élément | Rôle |
| --- | --- |
| `package` | un paquet NuGet |
| `reference` | un autre projet de la solution |
| `--version` | une version précise |

## Exemple concret
```bash
dotnet add package Serilog
dotnet add src/MesDepenses.Api reference src/MesDepenses.Core
dotnet add tests/MesDepenses.Core.Tests reference src/MesDepenses.Core
```

## Résultat attendu
Une ligne `<PackageReference>` ou `<ProjectReference>` ajoutée dans le `.csproj`.

## Variantes utiles
- `dotnet remove package <nom>`
- `dotnet list package` : les paquets du projet
- `dotnet sln add <projet>` : ajouter un projet à la solution

> [!warning] Erreurs fréquentes
> - Derrière un proxy ou sans accès à nuget.org : `Unable to load the service index`. Il faut une source interne dans `nuget.config` ou le proxy configuré

## Relier
- **Commandes complémentaires** : [[dotnet new]] · [[dotnet build]]
- **Concepts associés** : [[Gestionnaire de paquets]] · [[Projet et solution .NET]]
