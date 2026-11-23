---
type: command
tool: dotnet
level: debutant
concepts:
  - "[[Plateforme .NET]]"
  - "[[Projet et solution .NET]]"
tags:
  - commande
  - dotnet
---
# dotnet new

> [!info] dotnet
> Crée un projet, une solution ou un fichier à partir d'un modèle.

## Pourquoi l'utiliser
Démarrer un projet avec la bonne structure sans rien écrire à la main.

## Dans quel contexte
Au début d'un projet, ou pour ajouter un projet de tests à une solution.

## Syntaxe
```bash
dotnet new <modèle> -o <dossier> [-n <nom>]
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `console` | programme en ligne de commande |
| `classlib` | bibliothèque (pas de point d'entrée) |
| `webapi` | API web ASP.NET Core |
| `xunit` | projet de tests xUnit |
| `sln` | une solution vide |
| `gitignore` | un .gitignore adapté à .NET |
| `-o` | dossier de sortie |
| `-n` | nom du projet |

## Exemple concret
```bash
dotnet new sln -n MesDepenses
dotnet new console -o src/MesDepenses.Console
dotnet new gitignore
```

## Résultat attendu
Un dossier avec un `.csproj` et un `Program.cs` (ou un `.sln`).

## Variantes utiles
- `dotnet new list` : tous les modèles installés
- `dotnet new webapi --use-controllers` : API avec contrôleurs au lieu de l'API minimale

> [!warning] Erreurs fréquentes
> - Lancer `dotnet new console` sans `-o` dans un dossier qui contient déjà un projet : deux `.csproj` au même endroit, la compilation ne sait plus lequel prendre

## Relier
- **Commandes complémentaires** : [[dotnet run]] · [[dotnet add]] · [[dotnet build]]
- **Concepts associés** : [[Plateforme .NET]] · [[Projet et solution .NET]]
