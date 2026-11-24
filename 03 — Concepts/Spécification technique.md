---
type: concept
domain: projet
module: "[[Module 23 - Gestion de projet]]"
status: a-decouvrir
level: intermediaire
niveau: 5
schema: false
exercice_visuel: false
fil_rouge: false
prerequisites:
  - "[[Spécification (specs)]]"
  - "[[Exigences fonctionnelles et non fonctionnelles]]"
parents: []
related:
  - "[[Décision d'architecture (ADR)]]"
  - "[[OpenAPI]]"
  - "[[Architecture en couches]]"
  - "[[Serverless et FaaS]]"
next_review: 
tags:
  - concept
  - projet
---
# Spécification technique

> [!info] En une phrase
> La spécification technique (ou *design doc*, document de conception) décrit **comment** l'équipe va construire la solution : les composants, leurs échanges, les formats de données, les choix techniques et leurs raisons. Elle est écrite par les développeurs, pour les développeurs.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
**Elle part des specs fonctionnelles** et répond : avec quelles briques, quelles API, quelles données, quel déploiement ?

**Contenu habituel** :
- schéma d'architecture (qui parle à qui) ;
- description des composants et de leurs responsabilités ;
- contrats d'échange : routes d'API, formats JSON, exemples de requêtes et de réponses (souvent en [[OpenAPI]]) ;
- modèle de données ;
- déploiement, configuration, sécurité ;
- **alternatives envisagées** et pourquoi on ne les a pas choisies ;
- risques et points ouverts.

**Un POC sert souvent à la nourrir** : on ne sait pas encore si une approche marche, on la teste, puis on écrit la spec technique avec ce qu'on a appris.

### Pourquoi ça existe
Écrire la conception avant de coder permet de faire relire les choix par l'équipe quand ils coûtent encore peu à changer.

### Le problème résolu
Éviter de découvrir en revue de code que l'architecture ne convient pas, et garder une trace des raisons des choix.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  SF[Specs fonctionnelles] --> ST[Spec technique]
  ST --> A[Architecture]
  ST --> API[Contrats d'API]
  ST --> DEP[Déploiement]
```

### Exemple concret
```markdown
# Spec technique - Export PNG
## Architecture
Front (bouton) -> service export-pdf -> API des dépenses
## Contrat de la fonction
POST /export-png   corps : {"tache_id": 42}
200 -> image/png     404 -> {"erreur": "tâche introuvable"}
## Composants
- SourceCvat : lit les annotations via l'API (jeton de service)
- Dessinateur : transforme les annotations en PNG (Pillow)
## Déploiement
Image construite par la CI GitLab.
## Alternatives écartées
Export côté navigateur : trop lent pour 50 images.
## Risques
Temps de génération sur les mois très chargés.
```

### Cas d'utilisation
- Faire valider une architecture par un développeur plus expérimenté

> [!warning] À ne pas confondre
> Une spec technique n'est pas une documentation écrite après coup : elle sert à **décider avant**. Et elle ne doit pas recopier le code ligne par ligne, seulement ce qui structure la solution.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] 🧠 Dessine de mémoire
> Dessine le design doc d'une nouvelle fonctionnalité : le problème, la solution choisie, les composants, les risques.

> [!example] 🔄 Change de contexte
> Redessine-le à côté de la spec fonctionnelle. Qui lit chacun, et pour décider quoi ?

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Spécification technique » et je l'intègre ici avec `![[Schéma - Spécification technique.excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : elle sera pratiquée dans le fil rouge de son niveau (voir [[Niveaux]]).

## 4 · Relier
- **Au travail** : [Spécification technique au travail](obsidian://open?vault=Travail&file=Sp%C3%A9cification%20technique%20au%20travail)
- **Prérequis** : [[Spécification (specs)]] · [[Exigences fonctionnelles et non fonctionnelles]]
- **Complémentaires** : [[Décision d'architecture (ADR)]] · [[OpenAPI]] · [[Architecture en couches]] · [[Serverless et FaaS]]

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
