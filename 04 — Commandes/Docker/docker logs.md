---
type: command
tool: Docker
level: debutant
concepts:
  - "[[Conteneur]]"
  - "[[Supervision et observabilité]]"
tags:
  - commande
  - docker
---
# docker logs

> [!info] Docker
> Affiche ce qu'un conteneur a écrit sur sa sortie standard et d'erreur.

## Pourquoi l'utiliser
Comprendre pourquoi un conteneur plante ou se comporte mal.

## Dans quel contexte
Après un `docker run -d`, quand un conteneur redémarre en boucle.

## Syntaxe
```bash
docker logs [options] conteneur
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `-f` | suit en direct |
| `--tail 100` | les 100 dernières lignes |
| `--since 10m` | depuis 10 minutes |
| `-t` | avec l'horodatage |

## Exemple concret
```bash
docker logs --tail 50 -f api
docker compose logs -f api
```

## Résultat attendu
Les lignes écrites par l'application.

## Variantes utiles
- `docker compose logs` : tous les services

> [!warning] Erreurs fréquentes
> - Rien ne s'affiche : l'application écrit dans un fichier au lieu de stdout

## Relier
- **Commandes complémentaires** : [[docker ps]] · [[docker inspect]]
- **Concepts associés** : [[Conteneur]] · [[Supervision et observabilité]]
