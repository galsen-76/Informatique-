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
prerequisites:
  - "[[User story]]"
parents: []
related:
  - "[[Méthode agile (Scrum et Kanban)]]"
  - "[[MVP (produit minimum viable)]]"
  - "[[Principes DRY, KISS et YAGNI]]"
next_review: 
tags:
  - concept
  - projet
---
# Backlog et priorisation

> [!info] En une phrase
> Le backlog est la **liste ordonnée de tout ce qui reste à faire** sur un produit (stories, bugs, dette technique). La priorisation consiste à décider l'ordre : on fait d'abord ce qui apporte le plus de valeur ou réduit le plus de risque.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
**Le haut du backlog** contient des éléments petits, clairs, prêts à être développés. Le bas peut rester flou : on le précisera plus tard (ou jamais).

**On le revoit régulièrement** (*affinage*, *refinement*) : découper, préciser, réordonner, supprimer ce qui n'a plus de sens.

**Méthode MoSCoW** pour trier :
- **M**ust : indispensable, sinon le produit ne sert à rien (le MVP) ;
- **S**hould : important, mais on peut livrer sans ;
- **C**ould : agréable si on a le temps ;
- **W**on't (this time) : pas maintenant, et on le dit clairement.

**Valeur contre effort** : ce qui rapporte beaucoup pour peu d'effort passe en premier ; ce qui rapporte peu pour beaucoup d'effort descend.

**Les risques d'abord** : ce qui est incertain techniquement se traite tôt (c'est le rôle d'un POC).

### Pourquoi ça existe
Il y a toujours plus d'idées que de temps. Sans ordre clair, on travaille sur ce qui est amusant ou urgent plutôt que sur ce qui compte.

### Le problème résolu
Savoir à tout moment quelle est la prochaine chose la plus utile à faire.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  ID[Idées] --> BL[Backlog]
  BL --> TRI[Tri MoSCoW]
  TRI --> HAUT[Prochaines tâches]
```

### Exemple concret
```text
Backlog de l'appli de dépenses (ordonné)
1. [Must]   Ajouter et lister les dépenses                    (cœur du besoin)
2. [Must]   Total par catégorie
3. [Must]   Bouton React qui appelle la fonction
4. [Must]   Message d'erreur clair si l'export échoue
5. [Should] Journaliser chaque export
6. [Could]  Choisir l'épaisseur du trait
7. [Won't]  Export PDF (pas pour cette version)
```

### Cas d'utilisation
- Décider quoi mettre dans le MVP
- Dire non (ou « pas maintenant ») à une demande sans la perdre

> [!warning] À ne pas confondre
> Le backlog n'est pas une liste de promesses : un élément qui y figure peut être retiré. Et tout mettre en « Must » revient à ne pas prioriser.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] 🧠 Dessine de mémoire
> Dessine le backlog de ton application en colonnes MoSCoW (Must, Should, Could, Won't) avec trois éléments par colonne.

> [!example] 🔄 Change de contexte
> Fais le même dessin pour un projet court de quelques semaines. Qu'est-ce qui reste en Must ?

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Backlog et priorisation » et je l'intègre ici avec `![[Schéma - Backlog et priorisation.excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : elle sera pratiquée dans le fil rouge de son niveau (voir [[Niveaux]]).

## 4 · Relier
- **Prérequis** : [[User story]]
- **Complémentaires** : [[Méthode agile (Scrum et Kanban)]] · [[MVP (produit minimum viable)]] · [[Principes DRY, KISS et YAGNI]]

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
