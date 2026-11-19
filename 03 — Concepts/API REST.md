---
type: concept
domain: backend
module: "[[Module 08 - Backend et API REST]]"
status: a-decouvrir
level: intermediaire
prerequisites:
  - "[[HTTP]]"
  - "[[API]]"
  - "[[JSON]]"
parents:
  - "[[API]]"
related:
  - "[[Endpoint]]"
  - "[[Express]]"
  - "[[CORS]]"
next_review: 
method: []
tags:
  - concept
  - backend
---
# API REST

> [!info] En une phrase
> Une façon d'organiser une API web autour de ressources (notes, utilisateurs…) manipulées avec les méthodes HTTP.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
**REST** (REpresentational State Transfer) est un **style d'architecture**. Une API REST expose des **ressources** identifiées par des URL (`/notes`, `/notes/42`) et utilise les **méthodes HTTP** pour dire ce qu'on fait dessus. Les réponses sont le plus souvent en [[JSON]].

### Pourquoi ça existe
Donner des conventions communes : un développeur qui connaît REST devine comment utiliser une nouvelle API sans lire 50 pages.

### Le problème résolu
Sans conventions, chaque API invente ses routes (`/getAllNotes`, `/deleteNoteById?id=42`…) : incohérent et difficile à apprendre.

## 2 · Explorer
### Comment ça fonctionne
Le CRUD d'une ressource `notes` :

| Action | Méthode | Route | Code de succès |
| --- | --- | --- | --- |
| Lister | `GET` | `/notes` | `200` |
| Lire une | `GET` | `/notes/:id` | `200` (ou `404`) |
| Créer | `POST` | `/notes` | `201` |
| Modifier | `PUT` / `PATCH` | `/notes/:id` | `200` |
| Supprimer | `DELETE` | `/notes/:id` | `204` |

Principes :
- **Ressources au pluriel**, des noms, pas des verbes (`/notes`, pas `/createNote`).
- **Sans état** : chaque requête porte tout le contexte (dont l'[[Authentification]]).
- **Codes de statut cohérents** (voir [[HTTP]]).

### Exemple concret
```bash
curl http://localhost:3000/notes
curl -X POST http://localhost:3000/notes \
  -H "Content-Type: application/json" \
  -d '{"title": "Courses"}'
```

### Cas d'utilisation
- Back-end d'une application web ou mobile
- Intégration entre services (paiement, météo, GitHub…)

> [!warning] À ne pas confondre
> **REST** (un style, des conventions) et **HTTP** (le protocole). Une API peut utiliser HTTP sans être REST (ex. une API qui n'a que `POST /action`). Et **PUT** remplace toute la ressource, **PATCH** n'en modifie qu'une partie.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin avec mes mots (section 4).

> [!example] 🧠 Dessine de mémoire
> Dessine la ressource `depenses` de MesDépenses et les cinq routes CRUD autour : méthode, adresse, ce qu'elles font.

> [!example] 🔍 Trouve l'erreur
> Ce schéma est faux. Corrige-le en rouge et explique l'erreur.
>
> ```mermaid
> flowchart TD
>   G[GET /supprimer/3] --> S[Supprime 3]
>   P[POST /depenses/liste] --> L[Liste]
> ```

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - API REST » et je l'intègre ici avec `![[Schéma - API REST.excalidraw]]`._

### Appliquer dans le fil rouge
- [[MesDépenses 01 - Prendre l'API en main]]

Pour m'aider :
- [[Projet - API Notes]]

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _J'explique mon schéma avec mes mots, sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[HTTP]], [[API]], [[JSON]]
- **Notion parente** : [[API]]
- **Mène à** : [[Endpoint]] → [[Express]] → [[Middleware]]
- **Complémentaires** : [[Authentification]], [[SQL]] (où stocker les ressources)
- **Cours** : [[Cours - Construire une API REST avec Express]]

## 6 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
La notion est maîtrisée quand je sais :
1. **l'expliquer** de façon fluide, à partir de mon schéma (section 4) ;
2. **l'adapter** à un autre contexte (consigne « Change de contexte », ou Claude m'interroge sur un autre cas) ;
3. **l'appliquer** pour de vrai dans le fil rouge (section 3).

Réussir un exercice ne suffit pas. C'est moi qui passe le statut en `maitrise`.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
