---
type: concept
domain: architecture
module: "[[Module 15 - Architecture logicielle]]"
status: a-decouvrir
level: intermediaire
niveau: 5
schema: false
exercice_visuel: false
fil_rouge: false
prerequisites:
  - "[[Test unitaire]]"
  - "[[Commit]]"
parents:
  - "[[Séparation des responsabilités]]"
related:
  - "[[Principes DRY, KISS et YAGNI]]"
  - "[[Convention de commit]]"
next_review: 
method: []
tags:
  - concept
  - architecture
---
# Refactorisation

> [!info] En une phrase
> Refactoriser, c'est améliorer la structure du code sans changer son comportement, par petites étapes vérifiées par les tests ; c'est ainsi qu'on rembourse la dette technique.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
**Dette technique** : les raccourcis pris pour aller vite (copier-coller, fonctions géantes, absence de tests) qui rendent chaque modification suivante plus coûteuse.
**Refactoriser** :
1. S'assurer que des **tests** couvrent le comportement actuel (sinon en écrire d'abord).
2. Faire **une petite transformation** : renommer, extraire une fonction, supprimer une duplication, simplifier une condition, déplacer du code.
3. Relancer les tests ; **commit**.
4. Recommencer.
On ne mélange **jamais** refactorisation et nouvelle fonctionnalité dans le même commit : la revue devient impossible.
Les éditeurs (VS Code, PyCharm) font les plus courantes automatiquement : *Rename Symbol* (F2), *Extract Function*.

### Pourquoi ça existe
Le code se dégrade à chaque ajout ; sans entretien, il devient trop risqué à toucher.

### Le problème résolu
Garder le code facile à modifier, en continu, sans grand chantier risqué.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
T[Tests verts] --> P[Petite transformation]
  P --> R[Relancer tests]
  R --> C[Commit]
  C --> P
```

### Exemple concret
```python
# avant
def traiter(d):
    if d["type"] == "png" and d["taille"] < 10_000_000 and not d["nom"].startswith("."):
        ...
# après : extraire et nommer
def est_image_valide(fichier) -> bool:
    return (fichier["type"] == "png"
            and fichier["taille"] < 10_000_000
            and not fichier["nom"].startswith("."))
def traiter(fichier):
    if est_image_valide(fichier):
        ...
```

### Cas d'utilisation
- Avant d'ajouter une fonctionnalité dans du code confus
- Après une revue de code
- Faire évoluer ton script de zip

> [!warning] À ne pas confondre
> **Refactoriser** (même comportement, meilleure structure) n'est pas **réécrire** (tout jeter et recommencer, très risqué). Et sans tests, ce n'est plus une refactorisation mais un pari.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] ⚖️ Avant / après
> Avant / après : un script en un seul bloc, puis découpé en fonctions. Dessine les morceaux et ce qui garantit que le comportement n'a pas changé.

> [!example] 🛣️ Suis le trajet
> Dessine une refactorisation en petites étapes : un changement, les tests, un commit, et ainsi de suite.

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Refactorisation » et je l'intègre ici avec `![[Schéma - Refactorisation.excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : elle sera pratiquée dans le fil rouge de son niveau (voir [[Niveaux]]).

## 4 · Relier
- **Prérequis** : [[Test unitaire]] · [[Commit]]
- **Complémentaires** : [[Principes DRY, KISS et YAGNI]] · [[Convention de commit]]

## 5 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
Trois cases à cocher dans les propriétés de la fiche :
- `schema` : mon dessin du concept est dans « Mon schéma » ;
- `exercice_visuel` : j'ai fait et corrigé les exercices visuels de la section 3 ;
- `fil_rouge` : je l'ai appliqué dans le fil rouge (coché tout seul quand une étape qui l'utilise est réussie).

Les trois cochées : la notion compte comme **comprise**. **Maîtrisé** : c'est moi qui le mets dans `status`, quand je le sens.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
