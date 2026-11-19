---
type: concept
domain: projet
module: "[[Module 23 - Gestion de projet]]"
status: a-decouvrir
level: debutant
niveau: 3
schema: false
exercice_visuel: false
fil_rouge: false
prerequisites:
  - "[[Spécification (specs)]]"
parents: []
related:
  - "[[Critères d'acceptation]]"
  - "[[Backlog et priorisation]]"
  - "[[Méthode agile (Scrum et Kanban)]]"
  - "[[Définition de terminé]]"
next_review: 
tags:
  - concept
  - projet
---
# User story

> [!info] En une phrase
> Une user story (récit utilisateur) est une **demande courte, écrite du point de vue de l'utilisateur**, qui dit qui veut quoi et pourquoi : « En tant que…, je veux…, afin de… ». C'est l'unité de travail des méthodes agiles.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
**Le format** : *En tant que* &lt;type d'utilisateur&gt;, *je veux* &lt;action&gt;, *afin de* &lt;bénéfice&gt;.

**Le « afin de » est le plus important** : il donne la raison, ce qui permet de proposer une meilleure solution que celle demandée.

**Toujours accompagnée** de [[Critères d'acceptation|critères d'acceptation]] qui disent quand elle est réussie.

**Les qualités d'une bonne story (INVEST)** : *Indépendante*, *Négociable* (on peut en discuter), *de Valeur* pour l'utilisateur, *Estimable*, *Petite* (faisable en quelques jours), *Testable*.

**Une grosse story** (une *épopée*, *epic*) se découpe en plusieurs petites.

### Pourquoi ça existe
Les demandes écrites comme des tâches techniques (« ajouter un endpoint ») font perdre de vue pour qui et pour quoi on travaille.

### Le problème résolu
Garder l'utilisateur au centre, découper le travail en morceaux livrables, et permettre de prioriser par la valeur.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  Q[Qui] --> S[User story]
  V[Quoi] --> S
  P[Pourquoi] --> S
  S --> CA[Critères]
```

### Exemple concret
```text
Epic : Exporter les annotations en image

Story 1
En tant qu'annotateur,
je veux exporter une tâche en PNG,
afin de joindre mes annotations à un rapport.

Story 2
En tant que responsable,
je veux que seuls les membres d'un projet puissent exporter ses tâches,
afin de protéger les plans confidentiels.
```

### Cas d'utilisation
- Découper un gros besoin en petites livraisons

> [!warning] À ne pas confondre
> Une user story n'est pas une spécification complète : c'est un **rappel de conversation**. Les détails viennent dans la discussion et les critères d'acceptation. Et « En tant que développeur, je veux une base de données » n'est pas une vraie story : il n'y a pas d'utilisateur ni de valeur.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] 🧠 Dessine de mémoire
> Écris et dessine trois user stories de ton application (« En tant que… je veux… afin de… »), chacune avec son utilisateur.

> [!example] 🔍 Trouve l'erreur
> Ce schéma est faux. Corrige-le en rouge et explique l'erreur.
>
> ```mermaid
> flowchart TD
>   U[User story] --> T[Créer table SQL]
>   T --> A[Ajouter index]
> ```

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - User story » et je l'intègre ici avec `![[Schéma - User story.excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : elle sera pratiquée dans le fil rouge de son niveau (voir [[Niveaux]]).

## 4 · Relier
- **Au travail** : [[User story au travail]]
- **Prérequis** : [[Spécification (specs)]]
- **Complémentaires** : [[Critères d'acceptation]] · [[Backlog et priorisation]] · [[Méthode agile (Scrum et Kanban)]] · [[Définition de terminé]]

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
