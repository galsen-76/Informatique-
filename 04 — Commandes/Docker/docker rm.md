---
type: command
tool: Docker
level: debutant
concepts:
  - "[[Conteneur]]"
tags:
  - commande
  - docker
---
# docker rm

> [!info] Docker
> Supprime un ou plusieurs conteneurs arrêtés.

## Pourquoi l'utiliser
Faire le ménage et libérer un nom de conteneur.

## Dans quel contexte
`The container name is already in use`, nettoyage.

## Syntaxe
```bash
docker rm conteneur
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `-f` | force (arrête puis supprime) |
| `-v` | supprime aussi les volumes anonymes |

## Exemple concret
```bash
docker rm api
docker rm -f $(docker ps -aq --filter status=exited)
```

## Résultat attendu
Le nom des conteneurs supprimés.

## Variantes utiles
- `docker run --rm` : supprimé automatiquement à l'arrêt

> [!warning] Erreurs fréquentes
> - Supprimer un conteneur ne supprime pas ses volumes nommés (les données restent)

## Relier
- **Commandes complémentaires** : [[docker stop]] · [[docker system prune]]
- **Concepts associés** : [[Conteneur]]
