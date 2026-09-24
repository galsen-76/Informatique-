---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - frontend/css/position
aliases:
  - "Positionnement et Z-Index CSS"
parent: "[[HTML-CSS]]"
children: []
related_theory:
  - "[[CSS-02-Box-Model|Box Model CSS]]"
related_snippets:
  - "[[04_Snippets/css-06-positionnement-z-index]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://developer.mozilla.org/fr/docs/Web/CSS/position"
---

# Positionnement et Z-Index CSS

> [!abstract] Introduction
> `position` sort un élément du flux normal (menus déroulants, modales, en-têtes collants) et `z-index` règle l'ordre d'empilement — avec le piège des contextes d'empilement.

> [!warning]- Prérequis
> [[CSS-02-Box-Model|Box Model CSS]]

---

## Théorie

> [!question]- C'est quoi ?
> | Valeur | Référence | Dans le flux ? |
> |---|---|---|
> | `static` | — (défaut) | Oui |
> | `relative` | Sa position normale | Oui (garde sa place) |
> | `absolute` | Ancêtre positionné le plus proche | Non |
> | `fixed` | Viewport | Non |
> | `sticky` | Relative puis fixe au scroll | Oui |

> [!example]- Analogie
> `absolute`, c'est un post-it collé sur un classeur (le parent positionné) ; `fixed`, un post-it collé sur l'écran lui-même ; `sticky`, un titre de chapitre qui reste en haut tant qu'on lit le chapitre.

> [!question]- Pourquoi l'utiliser ?
> Badges, tooltips, menus, headers collants, modales.

> [!question]- Comment ça marche ?
> `z-index` ne fonctionne que sur un élément positionné (ou enfant flex/grid). Un nouveau **contexte d'empilement** est créé par `position` + `z-index`, `opacity < 1`, `transform`, `filter`… : un enfant ne peut JAMAIS passer au-dessus d'un élément extérieur au contexte de son parent, quel que soit son z-index.

> [!question]- Quand l'utiliser ?
> `relative` sur le parent + `absolute` sur l'enfant pour un badge ; `sticky` pour les en-têtes de tableau ; modales via overlay CDK / Teleport Vue.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Les modales positionnées dans un composant profond souffrent des contextes d'empilement → les rendre à la racine du document (`<Teleport>` Vue, CDK Overlay Angular, élément `<dialog>` natif en top layer).

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Flux normal | Placement par défaut des éléments |
| Contexte d'empilement | Groupe isolé pour le calcul du z-index |
| Top layer | Couche au-dessus de tout (dialog, popover) |

---

## Points clés

- `absolute` se positionne par rapport au plus proche ancêtre non `static`
- `z-index: 9999` ne résout pas un problème de contexte d'empilement
- `sticky` nécessite un `top` et un parent qui défile

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - `sticky` qui ne marche pas à cause d'un `overflow: hidden` sur un ancêtre
> - Escalade de z-index (999, 9999, 99999) → définir une échelle en variables

---

## Exemple minimal

```css
:root { --z-dropdown: 100; --z-sticky: 200; --z-modal: 1000; --z-toast: 1100; }
.carte { position: relative; }
.carte .badge { position: absolute; top: .5rem; right: .5rem; }
```

> [!note] Ce que j'en retiens
> Une échelle de z-index centralisée évite la guerre des 9999.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Utiliser `<dialog>` et l'API `popover` natives (top layer) pour éviter les problèmes d'empilement

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[HTML-CSS]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/css-06-positionnement-z-index]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi un z-index de 9999 peut-il rester sous un élément de z-index 1 ?

---

## Tâches

- [ ] #task Créer un header sticky et un badge « favori » positionné sur les cartes
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
