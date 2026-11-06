---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Architecture en couches]]"
  - "[[MVC]]"
  - "[[Monolithe et microservices]]"
tags:
  - exercice
---
# Exercice — Lire et dessiner une architecture

> [!info] Objectif
> Comprendre l'architecture d'un vrai projet (CVAT) et organiser la tienne.
> Notions : [[Architecture en couches]] · [[MVC]] · [[Monolithe et microservices]]

## Consignes
- [ ] Ouvre le `docker-compose.yml` de CVAT : liste chaque service, son image, ses ports et ses dépendances
- [ ] Dessine (Mermaid, vertical, étiquettes courtes) qui appelle qui et par quel moyen (HTTP, base, Redis)
- [ ] Dans `cvat/apps/engine`, trouve le modèle `Task`, sa vue (*viewset*) et son sérialiseur : à quoi correspond chacun dans MVC ?
- [ ] Explique pourquoi les fonctions Nuclio sont des services séparés plutôt que du code dans le serveur Django
- [ ] Réorganise ton API de tâches en `routes/`, `services/`, `depots/` ; le service ne doit pas importer Express
- [ ] Écris un test du service avec un faux dépôt en mémoire

> [!question]- Indice
> Les viewsets Django REST Framework jouent le rôle de contrôleurs ; les sérialiseurs transforment modèles et JSON dans les deux sens (et valident).

> [!question]- Solution
> ```mermaid
> flowchart TD
>   N[Navigateur] --> T[Traefik]
>   T --> UI[cvat-ui]
>   T --> S[cvat-server]
>   S --> DB[(PostgreSQL)]
>   S --> R[(Redis)]
>   W[Workers] --> R
>   S --> NU[Nuclio]
> ```
> - **Modèle** : `models.Task` (données, relations) ; **contrôleur** : `TaskViewSet` (reçoit la requête, applique droits et logique) ; **vue** au sens MVC : la réponse JSON produite via `TaskReadSerializer`, affichée par le frontend React.
> - Nuclio : dépendances lourdes (modèles d'IA, GPU), déploiement et mise à l'échelle indépendants, une panne n'arrête pas CVAT.
> ```js
> // services/taches.js : aucun import d'Express
> export const creerService = (depot) => ({
>   async terminer(id) { const t = await depot.trouver(id); if (!t) throw new ErreurApi(404, "INTROUVABLE", "…"); return depot.maj(id, { fini: true }); },
> });
> // test
> const depot = { trouver: async (id) => (id === 1 ? { id: 1, fini: false } : null), maj: async (id, c) => ({ id, ...c }) };
> expect(await creerService(depot).terminer(1)).toEqual({ id: 1, fini: true });
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
