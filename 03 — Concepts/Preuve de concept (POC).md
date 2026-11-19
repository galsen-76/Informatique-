---
type: concept
domain: projet
module: "[[Module 23 - Gestion de projet]]"
status: a-decouvrir
level: debutant
prerequisites: []
parents: []
related:
  - "[[Prototype]]"
  - "[[MVP (produit minimum viable)]]"
  - "[[Dette technique]]"
  - "[[Décision d'architecture (ADR)]]"
  - "[[Critères d'acceptation]]"
next_review: 
method: []
tags:
  - concept
  - projet
---
# Preuve de concept (POC)

> [!info] En une phrase
> Une preuve de concept (POC, *proof of concept*) est un petit travail limité dans le temps qui sert à répondre à **une question** : « est-ce que c'est faisable, techniquement, dans nos conditions ? ». Son vrai livrable n'est pas le code, c'est la **réponse** (oui, non, oui mais…).

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
**Une question précise** : « Peut-on déclencher une fonction Nuclio depuis un bouton de CVAT et récupérer un PNG des annotations ? ». Pas « faire l'outil d'export ».

**Des hypothèses** à vérifier : l'API de CVAT donne bien les annotations, Nuclio peut appeler CVAT, les images passent par le Nexus de l'entreprise.

**Des critères de succès** écrits **avant** de commencer : à quoi saura-t-on que la réponse est oui ? (ex. « un clic produit un PNG correct pour une tâche de 50 images, en moins de 10 s »).

**Une durée fixée à l'avance** (*timebox*) : 1 à 3 semaines en général. Quand le temps est écoulé, on conclut, même si tout n'est pas fini.

**Un périmètre réduit** : on prend le chemin le plus court vers la réponse. Pas de gestion fine des erreurs, pas de tests complets, pas d'interface soignée, sauf si c'est justement ce qu'on veut prouver.

**Un compte rendu** à la fin : ce qui marche, ce qui ne marche pas, les limites découvertes, les risques, et la recommandation (continuer, changer d'approche, abandonner).

### Pourquoi ça existe
Avant d'investir des mois dans un développement, une équipe veut savoir si l'idée tient debout. Le POC réduit le **risque** : on dépense peu pour apprendre beaucoup.

### Le problème résolu
Découvrir trop tard qu'une technologie ne fait pas ce qu'on croyait, qu'un réseau d'entreprise bloque un accès, ou que les performances sont inacceptables.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  Q[Question] --> H[Hypothèses]
  H --> T[Essai court]
  T --> R[Résultat]
  R --> D[Décision]
```

### Exemple concret
```markdown
# POC - Export PNG depuis CVAT
Question : un bouton dans CVAT peut-il produire un PNG des annotations via Nuclio ?
Durée : 2 semaines (fin le 20/11)
Critères de succès :
- l'image CVAT se construit dans la CI GitLab avec les images du Nexus
- un clic sur le bouton appelle la fonction Nuclio
- la fonction renvoie un PNG lisible pour une tâche réelle
Hors périmètre : droits fins, tests complets, design du bouton
Résultat : (à remplir à la fin)
Recommandation : (continuer / changer d'approche / abandonner)
```

### Cas d'utilisation
- Tester une nouvelle bibliothèque ou un nouveau service avant de l'adopter
- Vérifier qu'un enchaînement de briques fonctionne de bout en bout (ton projet CVAT + Nuclio)
- Mesurer si une approche est assez rapide

> [!warning] À ne pas confondre
> Un POC n'est pas un **prototype** (qui sert à montrer à quoi ressemblera le produit) ni un **MVP** (qui est déjà un vrai produit, livré à de vrais utilisateurs). Et un POC réussi **n'est pas un produit fini** : son code est souvent à réécrire avant la mise en production.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin avec mes mots (section 4).

> [!example] 🧠 Dessine de mémoire
> Dessine ton POC CVAT : la question à laquelle il répond, ce qu'il contient, ce qu'il ne contient volontairement pas.

> [!example] ⚖️ Avant / après
> Avant / après : le POC qui marche sur ton PC, puis ce qu'il faudrait pour en faire un vrai produit. Dessine l'écart.

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Preuve de concept (POC) » et je l'intègre ici avec `![[Schéma - Preuve de concept (POC).excalidraw]]`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : je l'applique dans mon travail (CVAT, Nuclio) ou je demande une étape à Claude.

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _J'explique mon schéma avec mes mots, sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Complémentaires** : [[Prototype]] · [[MVP (produit minimum viable)]] · [[Dette technique]] · [[Décision d'architecture (ADR)]] · [[Critères d'acceptation]]

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
