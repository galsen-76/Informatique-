---
type: concept
domain: projet
module: "[[Module 23 - Gestion de projet]]"
status: a-decouvrir
level: debutant
niveau: 5
schema: false
exercice_visuel: false
fil_rouge: false
prerequisites: []
parents: []
related:
  - "[[Exigences fonctionnelles et non fonctionnelles]]"
  - "[[Cahier des charges]]"
  - "[[Spécification technique]]"
  - "[[User story]]"
  - "[[Critères d'acceptation]]"
next_review: 
tags:
  - concept
  - projet
---
# Spécification (specs)

> [!info] En une phrase
> Une spécification (les « specs ») est un **document qui décrit précisément ce qu'on doit construire** : ce que le logiciel doit faire, dans quelles conditions, et comment on saura qu'il est réussi. C'est l'accord écrit entre ceux qui demandent et ceux qui construisent.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
**Deux grandes familles** :
- **specs fonctionnelles** : le **quoi**, vu par l'utilisateur (« quand je clique sur Export PNG, je reçois une image de mes annotations ») ;
- **specs techniques** : le **comment**, vu par les développeurs (architecture, API, formats, choix de technologies). Voir [[Spécification technique]].

**Ce qu'on y trouve en général** : le contexte et l'objectif, le périmètre (ce qui est dedans et **hors** périmètre), les [[Exigences fonctionnelles et non fonctionnelles|exigences]], les cas d'usage ou [[User story|user stories]], les [[Critères d'acceptation|critères d'acceptation]], les contraintes, les questions encore ouvertes.

**Formes possibles** : un gros document ([[Cahier des charges]]), une page de wiki, une liste de user stories dans un ticket, un fichier OpenAPI pour une API. La forme compte moins que la précision.

« Lire les specs » = lire ce document avant de coder. « C'est dans les specs » = c'était convenu.

### Pourquoi ça existe
Sans écrit, chacun garde en tête sa propre version de la demande. On découvre les différences à la livraison.

### Le problème résolu
Éviter les malentendus, permettre d'estimer le travail, servir de référence pour tester et pour dire « c'est terminé ».

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  B[Besoin] --> S[Specs]
  S --> D[Développement]
  S --> T[Tests]
  T --> L[Livraison]
```

### Exemple concret
```markdown
# Specs - Export PNG des annotations
## Contexte
Les annotateurs doivent partager leurs annotations sous forme d'image.
## Objectif
Exporter en un clic les dépenses du mois en PDF.
## Périmètre
Dedans : une tâche à la fois, format PNG. Hors périmètre : PDF, export groupé.
## Exigences
- F1 : un bouton « Export PNG » sur la page d'une tâche
- NF1 : l'image est prête en moins de 10 s pour 50 images
## Critères d'acceptation
Étant donné une tâche annotée, quand je clique sur Export PNG, alors un PNG se télécharge.
## Questions ouvertes
- Un PNG par image ou une seule planche ?
```

### Cas d'utilisation
- Décrire une API avant de l'implémenter (OpenAPI)
- Répondre à un appel d'offres

> [!warning] À ne pas confondre
> Une spec n'est pas gravée dans le marbre : elle évolue, mais **chaque changement est écrit et partagé**. Et elle ne remplace pas la discussion : elle la résume.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] 🧠 Dessine de mémoire
> Dessine la spec d'une fonction de ton application (« filtrer par catégorie ») : le but, les règles, les cas limites.

> [!example] 🛣️ Suis le trajet
> Dessine le chemin d'une spec : demande, spec écrite, code, tests qui la vérifient.

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Spécification (specs) » et je l'intègre ici avec `![[Schéma - Spécification (specs).excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : elle sera pratiquée dans le fil rouge de son niveau (voir [[Niveaux]]).

## 4 · Relier
- **Au travail** : [[Spécification (specs) au travail]]
- **Complémentaires** : [[Exigences fonctionnelles et non fonctionnelles]] · [[Cahier des charges]] · [[Spécification technique]] · [[User story]] · [[Critères d'acceptation]]

## 5 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation (compris, puis maîtrisé)
Trois cases à cocher dans les propriétés de la fiche :
- `schema` : mon dessin du concept est dans « Mon schéma » ;
- `exercice_visuel` : j'ai fait et corrigé les exercices visuels de la section 3 ;
- `fil_rouge` : je l'ai appliqué dans le fil rouge (coché tout seul quand une étape qui l'utilise est réussie).

Les trois cochées : la notion compte comme **comprise**. **Maîtrisé** : c'est moi qui le mets dans `status`, quand je le sens.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
