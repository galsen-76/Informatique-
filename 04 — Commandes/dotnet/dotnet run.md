---
type: command
tool: dotnet
level: debutant
concepts:
  - "[[Plateforme .NET]]"
tags:
  - commande
  - dotnet
---
# dotnet run

> [!info] dotnet
> Compile le projet si besoin, puis le lance.

## Pourquoi l'utiliser
Essayer son programme pendant le développement en une commande.

## Dans quel contexte
Dans le dossier d'un projet qu'on peut lancer (console, API).

## Syntaxe
```bash
dotnet run [--project <chemin>] [-- arguments]
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `--project` | le projet à lancer, si on n'est pas dans son dossier |
| `-- …` | tout ce qui suit est passé au programme |
| `-c Release` | configuration optimisée |

## Exemple concret
```bash
dotnet run
dotnet run --project src/MesDepenses.Api
dotnet run -- fichier.csv
```

## Résultat attendu
La sortie du programme. Pour une API : l'adresse d'écoute (`Now listening on: http://localhost:5xxx`).

## Variantes utiles
- `dotnet watch` : relance tout seul à chaque modification de fichier

> [!warning] Erreurs fréquentes
> - `Couldn't find a project to run` : tu n'es pas dans le dossier du projet, ou tu es à la racine de la solution : ajoute `--project`

## Relier
- **Commandes complémentaires** : [[dotnet build]] · [[dotnet new]]
- **Concepts associés** : [[Plateforme .NET]]
