---
type: command
tool: dotnet
level: debutant
concepts:
  - "[[Plateforme .NET]]"
  - "[[Dockerfile]]"
tags:
  - commande
  - dotnet
---
# dotnet publish

> [!info] dotnet
> Prépare un dossier prêt à déployer : l'application compilée en Release et tout ce dont elle a besoin.

## Pourquoi l'utiliser
C'est ce dossier, et pas le code source, qu'on copie sur un serveur ou dans une image Docker.

## Dans quel contexte
Dans la CI ou dans un Dockerfile, à l'étape de construction.

## Syntaxe
```bash
dotnet publish [<projet>] -c Release -o <dossier>
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `-c Release` | compilation optimisée |
| `-o` | dossier de sortie |
| `--self-contained` | embarque le runtime : rien à installer sur le serveur |
| `-r linux-x64` | système visé |

## Exemple concret
```bash
dotnet publish src/MesDepenses.Api -c Release -o out
dotnet out/MesDepenses.Api.dll
```

## Résultat attendu
Un dossier `out/` avec le `.dll` principal, ses dépendances et `appsettings.json`.

## Variantes utiles
- `dotnet publish /t:PublishContainer` : construit directement une image Docker sans Dockerfile

> [!warning] Erreurs fréquentes
> - Copier le dossier `bin/Debug` sur le serveur au lieu de publier : version non optimisée, fichiers manquants

## Relier
- **Commandes complémentaires** : [[dotnet build]] · [[dotnet run]]
- **Concepts associés** : [[Plateforme .NET]] · [[Dockerfile]]
