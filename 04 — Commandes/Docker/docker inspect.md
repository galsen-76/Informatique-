---
type: command
tool: Docker
level: debutant
concepts:
  - "[[Conteneur]]"
  - "[[Image Docker]]"
tags:
  - commande
  - docker
---
# docker inspect

> [!info] Docker
> Affiche toute la configuration d'un conteneur, d'une image, d'un volume ou d'un réseau en JSON.

## Pourquoi l'utiliser
Trouver une adresse IP, des variables, des montages, l'état de santé.

## Dans quel contexte
Déboguer un réseau, un volume mal monté, une variable absente.

## Syntaxe
```bash
docker inspect objet [--format modèle]
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `--format '{{.State.Health.Status}}'` | extraire un champ |
| `--format '{{json .Mounts}}'` | les montages |

## Exemple concret
```bash
docker inspect api --format '{{.State.Status}} {{.State.ExitCode}}'
docker inspect api --format '{{range .Config.Env}}{{println .}}{{end}}'
```

## Résultat attendu
Un gros JSON, ou seulement le champ demandé.

## Variantes utiles
- `docker image inspect`, `docker volume inspect`

> [!warning] Erreurs fréquentes
> - Les secrets passés en `-e` sont lisibles ici : ne passe pas de vrais secrets en clair sur une machine partagée

## Relier
- **Commandes complémentaires** : [[docker logs]] · [[docker ps]]
- **Concepts associés** : [[Conteneur]] · [[Image Docker]]
