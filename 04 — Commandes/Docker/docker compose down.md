---
type: command
tool: Docker
level: debutant
concepts:
  - "[[Docker Compose]]"
tags:
  - commande
  - docker
---
# docker compose down

> [!info] Docker
> Arrête et supprime les conteneurs et réseaux d'un projet compose.

## Pourquoi l'utiliser
Arrêter proprement toute une application multi-conteneurs.

## Dans quel contexte
Fin de travail, avant de relancer à neuf.

## Syntaxe
```bash
docker compose down [options]
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `-v` | supprime aussi les volumes (données) |
| `--rmi local` | supprime les images construites |

## Exemple concret
```bash
docker compose down
docker compose up -d --build
```

## Résultat attendu
`Container … Removed`, `Network … Removed`.

## Variantes utiles
- `docker compose stop` : arrêter sans supprimer
- `docker compose ps` : état

> [!warning] Erreurs fréquentes
> - `-v` par réflexe : la base de développement repart vide

## Relier
- **Commandes complémentaires** : [[docker compose up]]
- **Concepts associés** : [[Docker Compose]]
