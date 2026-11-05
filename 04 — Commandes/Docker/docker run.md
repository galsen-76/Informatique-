---
type: command
tool: Docker
level: intermediaire
concepts:
  - "[[Conteneur]]"
  - "[[Docker]]"
tags:
  - commande
  - docker
---
# docker run

> [!info] Docker
> Crée et démarre un conteneur à partir d'une image.

## Pourquoi l'utiliser
Lancer une application ou un service (base de données…) sans l'installer sur ta machine.

## Dans quel contexte
Tester une image construite, lancer PostgreSQL pour un projet.

## Syntaxe
```bash
docker run [options] <image>
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `-d` | En arrière-plan |
| `-p hôte:conteneur` | Publie un port, ex. `3000:3000` |
| `--name` | Nom du conteneur |
| `-e` | Variable d'environnement |
| `-v` | Volume pour garder des données |
| `--rm` | Supprime le conteneur à l'arrêt |

## Exemple concret
```bash
docker run -d --name api -p 3000:3000 api-notes:1.0
```

## Résultat attendu
Un identifiant de conteneur s'affiche ; l'API répond sur http://localhost:3000.

> [!warning] Erreurs fréquentes
> - Port déjà utilisé sur la machine : changer la partie gauche de `-p` (ex. `3001:3000`).
> - L'application écoute sur `localhost` dans le conteneur : elle doit écouter sur `0.0.0.0` pour être joignable.


## Relier
- **Commandes complémentaires** : [[docker build]] · [[docker ps]]
- **Concepts associés** : [[Conteneur]] · [[Docker]]
