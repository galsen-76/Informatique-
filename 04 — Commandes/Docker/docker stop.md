---
type: command
tool: Docker
level: debutant
concepts:
  - "[[Conteneur]]"
  - "[[Processus]]"
tags:
  - commande
  - docker
---
# docker stop

> [!info] Docker
> Arrête proprement un conteneur (signal SIGTERM, puis SIGKILL après 10 secondes).

## Pourquoi l'utiliser
Arrêter un service sans le supprimer.

## Dans quel contexte
Fin de travail, avant une mise à jour.

## Syntaxe
```bash
docker stop conteneur
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `-t 30` | attendre 30 secondes avant de forcer |

## Exemple concret
```bash
docker stop api pg-notes
docker start api
```

## Résultat attendu
Le nom du conteneur arrêté.

## Variantes utiles
- `docker start` : relancer
- `docker restart`
- `docker kill` : arrêt immédiat

> [!warning] Erreurs fréquentes
> - Le conteneur met 10 s à s'arrêter : le programme n'écoute pas SIGTERM (souvent un script lancé via `sh -c`)

## Relier
- **Commandes complémentaires** : [[docker rm]] · [[docker ps]]
- **Concepts associés** : [[Conteneur]] · [[Processus]]
