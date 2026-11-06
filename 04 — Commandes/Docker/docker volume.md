---
type: command
tool: Docker
level: debutant
concepts:
  - "[[Volume Docker]]"
tags:
  - commande
  - docker
---
# docker volume

> [!info] Docker
> Gère les volumes, où Docker garde les données qui doivent survivre aux conteneurs.

## Pourquoi l'utiliser
Lister, créer, inspecter ou supprimer les données persistantes.

## Dans quel contexte
Base de données, sauvegarde, nettoyage.

## Syntaxe
```bash
docker volume ls | create | inspect | rm | prune
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `ls` | liste |
| `inspect nom` | emplacement sur le disque |
| `rm nom` | supprime (données perdues) |
| `prune` | supprime les volumes non utilisés |

## Exemple concret
```bash
docker volume ls
docker volume inspect pg-notes-data
docker run --rm -v pg-notes-data:/data -v "$PWD":/backup alpine tar -czf /backup/pg.tar.gz -C /data .
```

## Résultat attendu
La liste des volumes, ou leur détail.

## Variantes utiles
- `docker compose down -v` : supprime aussi les volumes du projet

> [!warning] Erreurs fréquentes
> - `docker volume prune` ou `down -v` sans réfléchir : la base est vidée

## Relier
- **Commandes complémentaires** : [[docker run]] · [[docker system prune]]
- **Concepts associés** : [[Volume Docker]]
