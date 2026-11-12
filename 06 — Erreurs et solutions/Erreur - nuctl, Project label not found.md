---
type: error
tool: Nuclio
date: 2026-11-12
concepts:
  - "[[Serverless et FaaS]]"
tags:
  - erreur
---
# Erreur — nuctl, Project label not found

> [!bug] Message
> ```text
> (W) nuctl Failed to create a function; setting the function status {"err": "Failed to enrich configuration", ...}
>
> Error - Project label not found
>     /nuclio/pkg/functionconfig/types.go:840
>
> Call stack:
> Project label not found
>     /nuclio/pkg/functionconfig/types.go:840
> Failed to get project name
>     /nuclio/pkg/processor/build/builder.go:524
> ```

## Contexte
`nuctl deploy` relancé à la main, avec les options `--env`, mais en oubliant une option des déploiements précédents.

## Lecture
- `nuctl` est écrit en Go : les lignes `….go:840` sont **le code de Nuclio**, pas le mien. Je ne les lis pas.
- La ligne utile est `Error - Project label not found`. Juste en dessous, `Failed to get project name` confirme : il manque **le nom du projet**.
- **Qui corriger** : la commande tapée.

## Cause
Nuclio range chaque fonction dans un projet, et CVAT n'affiche que celles du projet `cvat`. Sans `--project-name`, nuctl ne sait pas où la mettre.

## Solution
Ajouter `--project-name cvat` à la commande `nuctl deploy`.

> [!tip] Prévenir
> Garder la commande de déploiement complète dans un petit script `deploy.sh` (sans aucun secret dedans) au lieu de la retaper.

## Ce que j'ai appris
-

Méthode : [[Fiche - Lire un message d'erreur]]
