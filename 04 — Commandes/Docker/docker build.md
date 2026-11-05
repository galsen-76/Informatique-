---
type: command
tool: Docker
level: intermediaire
concepts:
  - "[[Image Docker]]"
  - "[[Docker]]"
tags:
  - commande
  - docker
---
# docker build

> [!info] Docker
> Construit une image à partir d'un `Dockerfile`.

## Pourquoi l'utiliser
Produire un paquet reproductible de l'application.

## Dans quel contexte
Après avoir écrit ou modifié le `Dockerfile` ou le code à embarquer.

## Syntaxe
```bash
docker build -t <nom>[:tag] <contexte>
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `-t` | Nom (et version) de l'image |
| `contexte` | Dossier envoyé à Docker, souvent `.` |

## Exemple concret
```bash
docker build -t api-notes:1.0 .
```

## Résultat attendu
Les étapes du Dockerfile s'exécutent ; `docker images` liste `api-notes:1.0`.

> [!warning] Erreurs fréquentes
> - Oublier le `.` final.
> - Copier `node_modules` dans l'image : ajouter un `.dockerignore`.


## Relier
- **Commandes complémentaires** : [[docker run]] · [[docker ps]]
- **Concepts associés** : [[Image Docker]] · [[Docker]]
