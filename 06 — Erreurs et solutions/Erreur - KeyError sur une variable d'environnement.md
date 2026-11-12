---
type: error
tool: Python / Nuclio
date: 2026-11-12
concepts:
  - "[[Variable d'environnement]]"
  - "[[Secret et fichier .env]]"
tags:
  - erreur
---
# Erreur — KeyError sur une variable d'environnement

> [!bug] Message
> ```text
>   File "/opt/nuclio/config.py", line 9, in <module>
>     ACCESS_TOKEN = os.environ["ACCESS_TOKEN"]
>                    ~~~~~~~~~~^^^^^^^^^^^^^^^^
>   File "<frozen os>", line 679, in __getitem__
> KeyError: 'ACCESS_TOKEN'
> ```

## Contexte
Juste après avoir corrigé [[Erreur - ModuleNotFoundError dans une fonction Nuclio]]. On avance d'une étape, nouvelle erreur.

## Lecture
- **Dernière ligne** : `KeyError: 'ACCESS_TOKEN'`, la clé est absente du dictionnaire `os.environ`.
- **Dernier étage** : `<frozen os>`, c'est Python lui-même. On remonte d'un cran : **ma ligne** est `config.py`, ligne 9.
- **Qui corriger** : le code est juste, c'est le **déploiement** qui n'a pas fourni la variable.

## Cause
Le `.env` reste sur le PC, il n'entre pas dans l'image. Dans la fonction, une variable n'existe que si on la passe au déploiement.

## Solution
1. Passer la variable avec `--env NOM=valeur`, une fois par variable :
   ```bash
   nuctl deploy convert-graph --project-name cvat --path . --file function.yaml --platform local \
     --env CVAT_URL=http://cvat-server:8080 \
     --env ACCESS_TOKEN="$(cat ~/.cvat_token)"
   ```
   Le token est lu depuis un fichier hors du dépôt : il n'apparaît ni à l'écran ni dans l'historique.
2. Vérifier une variable **non secrète** : `docker exec <conteneur> printenv CVAT_URL`.

> [!tip] Prévenir
> `os.environ["X"]` plante tout de suite si X manque (c'est voulu : mieux vaut une erreur claire au démarrage). `os.environ.get("X")` renvoie `None` et l'erreur arrive plus tard, moins claire.

## Ce que j'ai appris
-

Méthode : [[Fiche - Lire un message d'erreur]]
