---
type: concept
domain: projet
module: "[[Module 23 - Gestion de projet]]"
status: a-decouvrir
level: intermediaire
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
method: []
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
Front React (bouton) -> fonction Nuclio export-png -> API CVAT
## Contrat de la fonction
POST /export-png   corps : {"tache_id": 42}
200 -> image/png     404 -> {"erreur": "tâche introuvable"}
## Composants
- SourceCvat : lit les annotations via l'API (jeton de service)
- Dessinateur : transforme les annotations en PNG (Pillow)
## Déploiement
Image construite par la CI GitLab, images de base tirées du Nexus.
## Alternatives écartées
Export côté navigateur : trop lent pour 50 images.
## Risques
Limite de temps d'exécution de Nuclio sur les grosses tâches.
```

### Cas d'utilisation
- Concevoir la fonction Nuclio d'export avant de l'écrire
- Faire valider une architecture par un développeur plus expérimenté

> [!warning] À ne pas confondre
> Une spec technique n'est pas une documentation écrite après coup : elle sert à **décider avant**. Et elle ne doit pas recopier le code ligne par ligne, seulement ce qui structure la solution.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin avec mes mots (section 4).

> [!example] 🧠 Dessine de mémoire
> Dessine le design doc de la réannotation CVAT : le problème, la solution choisie, les composants, les risques.

> [!example] 🔄 Change de contexte
> Redessine-le à côté de la spec fonctionnelle. Qui lit chacun, et pour décider quoi ?

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Spécification technique » et je l'intègre ici avec `![[Schéma - Spécification technique.excalidraw]]`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : je l'applique dans mon travail (CVAT, Nuclio) ou je demande une étape à Claude.

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _J'explique mon schéma avec mes mots, sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Spécification (specs)]] · [[Exigences fonctionnelles et non fonctionnelles]]
- **Complémentaires** : [[Décision d'architecture (ADR)]] · [[OpenAPI]] · [[Architecture en couches]] · [[Serverless et FaaS]]

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
