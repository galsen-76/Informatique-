---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - frontend/css/cascade
aliases:
  - "Sélecteurs Cascade et Spécificité CSS"
parent: "[[HTML-CSS]]"
children:
  - "[[CSS-02-Box-Model|Box Model CSS]]"
related_theory:
  - "[[HTML-01-Structure-Semantique|Structure HTML et Sémantique]]"
related_snippets:
  - "[[04_Snippets/css-01-selecteurs-cascade-specificite]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://developer.mozilla.org/fr/docs/Web/CSS/Specificity"
---

# Sélecteurs Cascade et Spécificité CSS

> [!abstract] Introduction
> CSS applique des styles aux éléments choisis par des sélecteurs ; quand plusieurs règles s'opposent, la cascade (origine, spécificité, ordre, `@layer`) décide laquelle gagne.

> [!warning]- Prérequis
> [[HTML-01-Structure-Semantique|Structure HTML et Sémantique]]

---

## Théorie

> [!question]- C'est quoi ?
> ```css
> p { color: gray; }                 /* balise      (0,0,1) */
> .film-card p { color: black; }     /* classe+bal. (0,1,1) */
> #principal { color: blue; }        /* id          (1,0,0) */
> a:hover { text-decoration: underline; }   /* pseudo-classe */
> li::before { content: "🎬"; }             /* pseudo-élément */
> ```

> [!example]- Analogie
> La spécificité, c'est un tournoi : un id bat n'importe quel nombre de classes, une classe bat n'importe quel nombre de balises ; à égalité, le dernier arrivé gagne.

> [!question]- Pourquoi l'utiliser ?
> 90 % des « mon CSS ne s'applique pas » viennent de la cascade. La comprendre évite la course aux `!important`.

> [!question]- Comment ça marche ?
> Ordre de décision : 1) importance (`!important`) et origine, 2) **`@layer`** (couches), 3) **spécificité** (id, classe/attribut/pseudo-classe, balise), 4) **ordre** d'apparition.
> **Héritage** : certaines propriétés (couleur, police) se transmettent aux enfants, d'autres non (marges, bordures).
> Sélecteurs modernes : `:is()`, `:where()` (spécificité 0), `:has()` (sélecteur parent), `:focus-visible`.

> [!question]- Quand l'utiliser ?
> En permanence. Préférer des sélecteurs de classe simples et plats (faible spécificité, faciles à surcharger).

> [!danger]- Quand NE PAS l'utiliser / Limites
> `!important` casse la cascade et oblige à surenchérir ; à réserver aux utilitaires ou à la surcharge d'une librairie tierce.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Sélecteur | Motif qui cible des éléments |
| Spécificité | Poids d'un sélecteur (id, classe, balise) |
| Cascade | Algorithme qui résout les conflits |
| Héritage | Transmission de certaines propriétés aux enfants |
| `@layer` | Couches de priorité explicites |

---

## Points clés

- id > classe > balise ; à égalité, le dernier gagne
- Styler par classes, éviter les id et l'imbrication profonde
- `:where()` pour des styles de base faciles à surcharger
- DevTools > onglet Styles montre les règles barrées (perdantes)

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Sélecteurs trop imbriqués (`.page .liste ul li a span`) impossibles à surcharger
> - Empiler des `!important`
> - Styles globaux qui fuient dans les composants (attention au `::ng-deep` Angular déprécié)

---

## Exemple minimal

```css
@layer reset, base, composants, utilitaires;
@layer base { a { color: var(--couleur-lien); } }
@layer composants { .btn { padding: .5rem 1rem; } }
@layer utilitaires { .mt-0 { margin-top: 0; } }
```

> [!note] Ce que j'en retiens
> Avec `@layer`, l'ordre des couches prime sur la spécificité : les utilitaires gagnent toujours, sans `!important`.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Maîtriser `@layer`, `:has()`, `@scope` et les container queries
> - Comprendre l'encapsulation de styles Angular (`ViewEncapsulation`) et `scoped` Vue

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[HTML-CSS]]
- Sous-sujets → [[CSS-02-Box-Model|Box Model CSS]]
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/css-01-selecteurs-cascade-specificite]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Quelle règle gagne entre `#a p` et `.b .c p` ?

---

## Tâches

- [ ] #task Faire le jeu CSS Diner (sélecteurs) jusqu'au bout
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
