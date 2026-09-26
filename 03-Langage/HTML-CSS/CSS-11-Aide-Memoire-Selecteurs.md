---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - frontend/css/selecteurs
aliases:
  - "Aide-mémoire des Sélecteurs CSS"
parent: "[[HTML-CSS]]"
related_theory:
  - "[[CSS-01-Selecteurs-Cascade-Specificite|Sélecteurs Cascade et Spécificité CSS]]"
  - "[[JS-14-Selectionner-Elements-DOM|Sélectionner des Éléments du DOM]]"
related_projects: []
source: "https://developer.mozilla.org/fr/docs/Web/CSS/CSS_selectors"
---

# Aide-mémoire des Sélecteurs CSS

> [!abstract] En bref
> Tous les sélecteurs utiles, sur une page. Ils servent à styler, mais aussi à trouver des éléments en JavaScript (`querySelector`), dans les tests et dans les DevTools.

## Les bases

| Sélecteur | Vise | Exemple |
|---|---|---|
| `*` | tout | `* { box-sizing: border-box }` |
| `balise` | toutes ces balises | `button` |
| `.classe` | ces classes | `.carte` |
| `#id` | cet id | `#recherche` |
| `a, button` | l'un **ou** l'autre | |
| `.btn.actif` | les deux classes **à la fois** (sans espace) | |

## Les relations

| Sélecteur | Vise |
|---|---|
| `.carte h3` | les `h3` **n'importe où dans** `.carte` |
| `.liste > li` | les `li` **enfants directs** de `.liste` |
| `h2 + p` | le `p` **juste après** un `h2` |
| `h2 ~ p` | tous les `p` **après** un `h2`, au même niveau |

## Les attributs

| Sélecteur | Vise |
|---|---|
| `[disabled]` | les éléments qui ont l'attribut |
| `[type="email"]` | valeur exacte |
| `[data-id="42"]` | un `data-*` précis |
| `[href^="https"]` | commence par |
| `[href$=".pdf"]` | finit par |
| `[class*="btn"]` | contient |

## Les états (pseudo-classes)

| Sélecteur | Quand |
|---|---|
| `:hover` | survolé à la souris |
| `:focus-visible` | sélectionné au **clavier** (à styler toujours) |
| `:focus-within` | un enfant a le focus (un formulaire actif) |
| `:active` | pendant le clic |
| `:checked` | case cochée |
| `:disabled` | désactivé |
| `:invalid` / `:valid` | champ invalide / valide |
| `:placeholder-shown` | champ encore vide |
| `:empty` | élément sans contenu |

## Les positions

| Sélecteur | Vise |
|---|---|
| `:first-child` / `:last-child` | premier / dernier enfant |
| `:nth-child(2)` | le 2e |
| `:nth-child(odd)` / `(even)` | impairs / pairs (lignes de tableau alternées) |
| `:not(.favori)` | tout sauf |
| `:has(img)` | qui **contient** une image (le « sélecteur parent ») |
| `:is(h1, h2, h3)` | l'un de ceux-là (raccourci) |

## Les pseudo-éléments

| Sélecteur | Vise |
|---|---|
| `::before` / `::after` | un contenu ajouté avant / après (décoration) |
| `::placeholder` | le texte indicatif d'un champ |
| `::selection` | le texte sélectionné |

## Dans le code

```ts
document.querySelector('.carte:not(.favori)');
document.querySelectorAll('form :invalid');
document.querySelector('[data-testid="btn-envoyer"]');
```

Comment ils s'affrontent en cas de conflit : [[CSS-01-Selecteurs-Cascade-Specificite|Cascade et spécificité]].
