---
type: command
tool: Docker
level: debutant
concepts:
  - "[[Image Docker]]"
tags:
  - commande
  - docker
---
# docker images

> [!info] Docker
> Liste les images présentes sur la machine.

## Pourquoi l'utiliser
Savoir quelles images sont téléchargées ou construites, et leur taille.

## Dans quel contexte
Avant un nettoyage, après un build, pour retrouver un tag.

## Syntaxe
```bash
docker images [nom]
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `-a` | aussi les images intermédiaires |
| `--filter dangling=true` | images sans tag (restes de builds) |
| `--format` | choisir les colonnes |

## Exemple concret
```bash
docker images
docker images python
```

## Résultat attendu
REPOSITORY, TAG, IMAGE ID, CREATED, SIZE pour chaque image.

## Variantes utiles
- `docker image ls` : même chose
- `docker rmi image` : supprimer une image

> [!warning] Erreurs fréquentes
> - Une image `<none>` : ancien build remplacé par un nouveau tag

## Relier
- **Commandes complémentaires** : [[docker build]] · [[docker system prune]]
- **Concepts associés** : [[Image Docker]]
