---
type: command
tool: Docker
level: intermediaire
concepts:
  - "[[Docker Compose]]"
  - "[[Conteneur]]"
tags:
  - commande
  - docker
---
# docker compose up

> [!info] Docker
> Lance, arrête et inspecte d'un coup tous les services décrits dans un fichier compose.

## Pourquoi l'utiliser
Démarrer une application faite de plusieurs conteneurs (CVAT) sans taper une commande par conteneur.

## Dans quel contexte
Développement local, démonstration, petits déploiements.

## Syntaxe
```bash
docker compose [-f fichier.yml] <sous-commande>
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `up -d` | crée et démarre en arrière-plan |
| `down` | arrête et supprime les conteneurs (`-v` : aussi les volumes) |
| `ps` | état des services |
| `logs -f service` | suit les logs d'un service |
| `build` | construit les images des services qui ont `build:` |
| `pull` | télécharge les images |
| `exec service sh` | ouvre un shell dans un service |
| `config` | affiche la configuration finale fusionnée |

## Exemple concret
```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d
docker compose ps
```

## Résultat attendu
Les services passent à l'état `running` ; `docker compose ps` les liste avec leurs ports.

## Variantes utiles
- `docker compose up -d --build` : reconstruit avant de démarrer
- `docker compose restart service`
- `docker compose config` pour vérifier le YAML et les variables

> [!warning] Erreurs fréquentes
> - `docker-compose` (tiret) : ancienne version, préférer `docker compose`
> - `down -v` supprime les volumes, donc les données : à éviter sans le vouloir
> - Un port déjà pris sur la machine : voir [[Erreur - EADDRINUSE port déjà utilisé]]

## Relier
- **Commandes complémentaires** : [[docker run]] · [[docker ps]]
- **Concepts associés** : [[Docker Compose]] · [[Conteneur]]
