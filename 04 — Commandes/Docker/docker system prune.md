---
type: command
tool: Docker
level: debutant
concepts:
  - "[[Image Docker]]"
  - "[[Conteneur]]"
tags:
  - commande
  - docker
---
# docker system prune

> [!info] Docker
> Supprime d'un coup les conteneurs arrêtés, réseaux inutilisés, images sans tag et le cache de build.

## Pourquoi l'utiliser
Libérer de la place sur le disque.

## Dans quel contexte
Disque plein, WSL qui grossit, après beaucoup de builds.

## Syntaxe
```bash
docker system prune [options]
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `-a` | aussi toutes les images non utilisées par un conteneur |
| `--volumes` | aussi les volumes non utilisés (données !) |
| `-f` | sans confirmation |

## Exemple concret
```bash
docker system df
docker system prune
docker builder prune
```

## Résultat attendu
L'espace récupéré (`Total reclaimed space: 4.2GB`).

## Variantes utiles
- `docker system df` : voir ce qui occupe la place

> [!warning] Erreurs fréquentes
> - `--volumes` supprime des données de bases arrêtées

## Relier
- **Commandes complémentaires** : [[docker images]] · [[docker volume]]
- **Concepts associés** : [[Image Docker]] · [[Conteneur]]
