---
type: command
tool: Docker
level: debutant
concepts:
  - "[[Registre Docker]]"
  - "[[Image Docker]]"
tags:
  - commande
  - docker
---
# docker pull

> [!info] Docker
> Télécharge une image depuis un registre.

## Pourquoi l'utiliser
Récupérer une image sans la construire.

## Dans quel contexte
Préparer un déploiement, mettre à jour une image.

## Syntaxe
```bash
docker pull registre/nom:tag
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `:tag` | version (sinon `latest`) |
| `--platform linux/amd64` | architecture voulue |

## Exemple concret
```bash
docker pull postgres:16
docker pull nexus.exemple.com:8443/equipe/cvat-export:1.2.0
```

## Résultat attendu
Les couches téléchargées puis `Status: Downloaded newer image`.

## Variantes utiles
- `docker compose pull` : toutes les images d'un compose

> [!warning] Erreurs fréquentes
> - `unauthorized` : faire `docker login` d'abord
> - `manifest unknown` : le tag n'existe pas

## Relier
- **Commandes complémentaires** : [[docker login]] · [[docker push]]
- **Concepts associés** : [[Registre Docker]] · [[Image Docker]]
