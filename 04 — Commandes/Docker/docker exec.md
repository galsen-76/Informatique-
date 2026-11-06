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
# docker exec

> [!info] Docker
> Lance une commande dans un conteneur qui tourne déjà.

## Pourquoi l'utiliser
Entrer dans un conteneur pour inspecter ou déboguer.

## Dans quel contexte
Ouvrir un shell, lancer psql, vérifier un fichier.

## Syntaxe
```bash
docker exec [options] conteneur commande
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `-it` | interactif avec terminal (pour un shell) |
| `-u root` | en tant qu'un autre utilisateur |
| `-w /app` | dossier de travail |
| `-e VAR=x` | variable d'environnement |

## Exemple concret
```bash
docker exec -it pg-notes psql -U postgres
docker exec -it api sh
docker exec api ls /app/sortie
```

## Résultat attendu
Le résultat de la commande, ou un shell dans le conteneur.

## Variantes utiles
- `docker compose exec service sh`
- `docker run --rm -it image sh` : un nouveau conteneur

> [!warning] Erreurs fréquentes
> - `bash: not found` : les images légères n'ont que `sh`
> - Le conteneur doit tourner (`docker ps`)

## Relier
- **Commandes complémentaires** : [[docker ps]] · [[docker logs]]
- **Concepts associés** : [[Conteneur]]
