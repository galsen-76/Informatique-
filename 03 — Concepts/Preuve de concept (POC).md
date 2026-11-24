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
  - "[[Prototype]]"
  - "[[MVP (produit minimum viable)]]"
  - "[[Dette technique]]"
  - "[[Décision d'architecture (ADR)]]"
  - "[[Critères d'acceptation]]"
next_review: 
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
**Une question précise** : « Peut-on produire le PDF mensuel des dépenses en moins de 5 s depuis un bouton ? ». Pas « faire l'outil d'export ».

**Des hypothèses** à vérifier : l'API donne bien les dépenses du mois, la bibliothèque PDF tourne dans un conteneur, l'image se construit dans la CI.

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
# POC - Export PDF des dépenses
Question : un bouton peut-il produire le PDF du mois en moins de 5 s ?
Durée : 2 semaines (fin le 20/11)
Critères de succès :
- l'image du service se construit dans la CI GitLab
- un clic sur le bouton appelle le service
- la fonction renvoie un PNG lisible pour une tâche réelle
Hors périmètre : droits fins, tests complets, design du bouton
Résultat : (à remplir à la fin)
Recommandation : (continuer / changer d'approche / abandonner)
```

### Cas d'utilisation
- Tester une nouvelle bibliothèque ou un nouveau service avant de l'adopter
- Mesurer si une approche est assez rapide

> [!warning] À ne pas confondre
> Un POC n'est pas un **prototype** (qui sert à montrer à quoi ressemblera le produit) ni un **MVP** (qui est déjà un vrai produit, livré à de vrais utilisateurs). Et un POC réussi **n'est pas un produit fini** : son code est souvent à réécrire avant la mise en production.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] 🧠 Dessine de mémoire
> Dessine un POC : la question à laquelle il répond, ce qu'il contient, ce qu'il ne contient volontairement pas.

> [!example] ⚖️ Avant / après
> Avant / après : le POC qui marche sur ton PC, puis ce qu'il faudrait pour en faire un vrai produit. Dessine l'écart.

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Preuve de concept (POC) » et je l'intègre ici avec `![[Schéma - Preuve de concept (POC).excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : elle sera pratiquée dans le fil rouge de son niveau (voir [[Niveaux]]).

## 4 · Relier
- **Au travail** : [Preuve de concept (POC) au travail](obsidian://open?vault=Travail&file=Preuve%20de%20concept%20%28POC%29%20au%20travail)
- **Complémentaires** : [[Prototype]] · [[MVP (produit minimum viable)]] · [[Dette technique]] · [[Décision d'architecture (ADR)]] · [[Critères d'acceptation]]

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
