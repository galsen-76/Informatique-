---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[API]]"
  - "[[OpenAPI]]"
  - "[[SDK]]"
tags:
  - exercice
---
# Exercice — Explorer une API avec OpenAPI et un SDK

> [!info] Objectif
> Trouver une route dans la documentation d'une API, l'appeler à la main, puis avec un SDK.
> Notions : [[API]] · [[OpenAPI]] · [[SDK]]

## Consignes
- [ ] Lance CVAT en local et ouvre la documentation interactive de son API
- [ ] Trouve la route qui liste les tâches et celle qui renvoie les annotations d'une tâche
- [ ] Crée une tâche de test avec quelques annotations dans l'interface
- [ ] Appelle la route des annotations avec `curl` (ou `requests`) et lis le JSON
- [ ] Fais le même appel avec le SDK Python de CVAT (même version que le serveur), et compare

> [!question]- Indice
> La doc est sur `/api/docs/`, le schéma sur `/api/schema/`. Authentification simple : `curl -u user:motdepasse`. Le SDK : `pip install cvat-sdk==<version du serveur>`.

> [!question]- Solution
> ```bash
> curl -u user:motdepasse http://localhost:8080/api/tasks
> curl -u user:motdepasse http://localhost:8080/api/tasks/1/annotations
> ```
> ```python
> from cvat_sdk import make_client
> with make_client("http://localhost:8080", credentials=("user", "motdepasse")) as client:
>     print(client.tasks.retrieve(1).get_annotations())
> ```
> Le SDK évite d'écrire URL, authentification et décodage JSON à la main.

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
