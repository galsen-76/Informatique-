---
type: command
tool: dotnet
level: debutant
concepts:
  - "[[Plateforme .NET]]"
  - "[[Langage compilé et interprété]]"
  - "[[Projet et solution .NET]]"
tags:
  - commande
  - dotnet
---
# dotnet build

> [!info] dotnet
> Compile un projet ou toute une solution, sans lancer.

## Pourquoi l'utiliser
Vérifier que tout compile, et produire les `.dll`. C'est la première étape d'une CI .NET.

## Dans quel contexte
À la racine de la solution, avant de pousser, et dans la CI.

## Syntaxe
```bash
dotnet build [<projet ou solution>] [-c Debug|Release]
```

## Paramètres

| Élément | Rôle |
| --- | --- |
| `-c Release` | compilation optimisée |
| `-warnaserror` | refuse de construire s'il reste des avertissements |
| `--no-restore` | ne retélécharge pas les paquets (déjà fait) |

## Exemple concret
```bash
dotnet build
dotnet build -c Release -warnaserror
```

## Résultat attendu
`Build succeeded` avec le nombre d'avertissements, ou la liste des erreurs `error CSxxxx` avec fichier et ligne.

## Variantes utiles
- `dotnet clean` : vide les dossiers `bin/` et `obj/`

> [!warning] Erreurs fréquentes
> - Lire seulement la dernière ligne : la vraie erreur est la **première** `error CS…` de la liste, les suivantes en découlent souvent

## Relier
- **Commandes complémentaires** : [[dotnet run]] · [[dotnet test]] · [[dotnet publish]]
- **Concepts associés** : [[Plateforme .NET]] · [[Langage compilé et interprété]] · [[Projet et solution .NET]]
