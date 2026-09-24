---
created: 2026-09-16
modified: 2026-09-16
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M07
aliases:
  - "Conception d'API REST"
tags:
  - cs/architecture/api-rest
parent: "[[Architecture Logicielle]]"
children: []
related_theory:
  - "[[ANG-09-HTTP-Communication-Serveur|HTTP et Communication Serveur]]"
  - "[[ARCH-03-Architecture-en-Couches|Architecture en Couches]]"
related_snippets:
  - "[[04_Snippets/api-rest-design]]"
related_projects:
  - "[[02_Projects/app-planification-sprints]]"
source: "https://restfulapi.net/"
---

# Conception d'API REST

> [!abstract] Introduction
> REST est un ensemble de conventions pour concevoir des API HTTP cohérentes et prévisibles : chaque URL représente une "ressource" (un film, un utilisateur), et le VERBE HTTP (GET, POST, PUT, DELETE) indique l'action à effectuer dessus.

---

## Théorie

> [!question]- C'est quoi ?
> > [!note] C'est quoi une "ressource" en REST ?
> > Une ressource est une entité identifiable de ton application (un film, un utilisateur, une commande). Chaque ressource a une URL dédiée, généralement au PLURIEL : `/films`, `/utilisateurs`.

> [!question]- Pourquoi l'utiliser ?
> Sans convention partagée, chaque API serait organisée différemment (parfois `getFilm`, parfois `film/get`, parfois `recupererFilm`) — un vrai casse-tête pour quiconque doit l'utiliser. REST impose une logique UNIFORME et PRÉVISIBLE : une fois qu'on connaît les conventions, on devine facilement comment interagir avec N'IMPORTE QUELLE API REST bien conçue.

> [!question]- Comment ça marche ?
> **Le verbe HTTP indique l'action, l'URL indique la ressource :**
>
> | Verbe | URL | Action |
> |---|---|---|
> | GET | `/films` | Liste tous les films |
> | GET | `/films/42` | Récupère le film n°42 |
> | POST | `/films` | Crée un nouveau film |
> | PUT | `/films/42` | Remplace ENTIÈREMENT le film n°42 |
> | PATCH | `/films/42` | Modifie PARTIELLEMENT le film n°42 |
> | DELETE | `/films/42` | Supprime le film n°42 |
>
> > [!note] Erreur fréquente de débutant
> > Créer des URLs comme `/getFilms` ou `/supprimerFilm42` répète dans l'URL ce que le VERBE HTTP indique déjà — en REST, le verbe HTTP porte l'action, l'URL ne décrit QUE la ressource concernée.
>
> **Ressources imbriquées (relations entre entités) :**
> ```
> GET /projets/5/sprints          → tous les sprints du projet 5
> GET /projets/5/sprints/12/taches → toutes les tâches du sprint 12 du projet 5
> ```
> > [!note] Pertinent pour l'app de planification de sprints
> > Cette logique d'imbrication correspond exactement à la hiérarchie Projet → Sprint → Tâche de ton application — une bonne conception REST refléterait naturellement cette structure dans les URLs.
>
> **Codes de statut HTTP — communiquer le résultat :**
> | Code | Signification | Quand l'utiliser |
> |---|---|---|
> | 200 | OK | Succès général |
> | 201 | Created | Ressource créée avec succès (après un POST) |
> | 400 | Bad Request | La requête envoyée est mal formée |
> | 401 | Unauthorized | Authentification manquante ou invalide |
> | 404 | Not Found | La ressource demandée n'existe pas |
> | 500 | Internal Server Error | Erreur côté serveur |
>
> > [!note] Pourquoi ne pas juste retourner `200` avec un message d'erreur dans le corps ?
> > Les codes de statut permettent au CLIENT (frontend, autre service) de réagir de façon standardisée SANS avoir à lire et interpréter le contenu de chaque réponse — un `404` déclenche naturellement un traitement différent d'un `500`, de façon uniforme entre toutes les API bien conçues.
>
> **Filtrage, tri, pagination (via les query params) :**
> ```
> GET /films?annee=2010&tri=titre&page=2
> ```

> [!question]- Quand l'utiliser ?
> Pour quasiment toute API destinée à être consommée par un frontend ou un autre service — REST reste le standard le plus répandu et le plus facilement compris par d'autres développeurs.

---

## Points clés

- Le verbe HTTP porte l'ACTION, l'URL représente la RESSOURCE (jamais l'inverse)
- Les URLs de ressources sont généralement au pluriel (`/films`, pas `/film`)
- Les codes de statut HTTP communiquent le résultat de façon standardisée
- Les ressources imbriquées reflètent les relations entre entités (`/projets/:id/sprints`)
- La pagination, le filtrage et le tri passent par les query params (`?page=2`)

---

## Paramètres / Configuration

| Convention | Bonne pratique | À éviter |
|-----------|-------------|---------|
| Nommage URL | `/films` (pluriel, nom) | `/getFilms` (verbe dans l'URL) |
| Action | Verbe HTTP (GET, POST...) | Verbe dans l'URL |
| Erreur | Code de statut approprié (404, 400...) | Toujours 200 avec un message d'erreur |
| Relations | `/projets/:id/sprints` | `/sprintsParProjet?id=...` |

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Verbes dans les URL (`/getFilms`, `/deleteFilm/3`)
> - Renvoyer 200 pour une erreur, ou 500 pour une erreur de validation
> - Pas de pagination sur les listes

---

## Exemple minimal

```
GET    /projets/5/sprints          → liste les sprints du projet 5
POST   /projets/5/sprints          → crée un nouveau sprint
GET    /sprints/12/taches          → liste les tâches du sprint 12
PATCH  /taches/42                  → modifie partiellement la tâche 42
DELETE /taches/42                  → supprime la tâche 42
```

> [!note] Ce que j'en retiens
> Cette structure d'URLs, appliquée à l'app de planification de sprints, refléterait naturellement la hiérarchie Projet → Sprint → Tâche déjà en place côté GitLab (Milestone = sprint, Issue = tâche) — une API cohérente facilite grandement l'intégration côté frontend Angular.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Versionnement (`/v1`), format d'erreur standard (RFC 9457), idempotence des POST critiques (`Idempotency-Key`)
> - Documenter avec OpenAPI (voir [[NEST-12-OpenAPI-Swagger|OpenAPI et Swagger NestJS]])

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Architecture Logicielle]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[ANG-09-HTTP-Communication-Serveur|HTTP et Communication Serveur]], [[API GitLab]]

**Pratique :**
- Extrait de code → [[04_Snippets/api-rest-design]]
- Projet → [[02_Projects/app-planification-sprints]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Différence entre PUT et PATCH ?
> - Quel code pour une création réussie ?

> [!faq]- Questions d'entretien
> - Quelles sont les bonnes pratiques de conception d'une API REST ?

---

## Tâches

- [ ] #task Comparer la conception des URLs de l'API GitLab avec les conventions REST vues ici
- [ ] #task Concevoir sur papier les endpoints REST qu'exposerait un futur backend pour l'app de planification de sprints
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? GraphQL (mentionné dans la note API GitLab) résout-il certains défauts structurels de REST, ou est-ce juste une alternative avec d'autres compromis ?
