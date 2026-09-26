---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - frontend/css/selecteurs
aliases:
  - "Aide-mémoire des Sélecteurs CSS"
parent: "[[HTML-CSS]]"
children: []
related_theory:
  - "[[CSS-01-Selecteurs-Cascade-Specificite|Sélecteurs Cascade et Spécificité CSS]]"
  - "[[JS-14-Selectionner-Elements-DOM|Sélectionner des Éléments du DOM]]"
related_snippets:
  - "[[04_Snippets/css-11-aide-memoire-selecteurs]]"
related_projects: []
source: "https://developer.mozilla.org/fr/docs/Web/CSS/CSS_selectors"
---

# Aide-mémoire des Sélecteurs CSS

> [!abstract] Introduction
> Tous les sélecteurs CSS utiles sur une page : ils servent à styler, mais aussi à sélectionner en JavaScript (`querySelector`), dans les tests et dans les DevTools.

> [!warning]- Prérequis
> [[CSS-01-Selecteurs-Cascade-Specificite|Sélecteurs Cascade et Spécificité CSS]]

---

## Théorie

> [!question]- C'est quoi ?
> | Sélecteur | Sélectionne | Exemple |
> |---|---|---|
> | `*` | Tout | `* { box-sizing: border-box }` |
> | `p` | Balise | tous les paragraphes |
> | `.carte` | Classe | éléments `class="carte"` |
> | `#recherche` | Id | l'élément `id="recherche"` |
> | `a, button` | Groupe | liens ET boutons |
> | `.liste li` | Descendant | tous les `li` dans `.liste` |
> | `.liste > li` | Enfant direct | seulement le premier niveau |
> | `h2 + p` | Frère immédiat | le `p` juste après un `h2` |
> | `h2 ~ p` | Frères suivants | tous les `p` après un `h2` |
> | `[disabled]` | A l'attribut | champs désactivés |
> | `[data-statut="vu"]` | Attribut = valeur | — |
> | `[href^="https"]` / `$=".pdf"` / `*="film"` | Commence / finit / contient | — |
> | `:hover`, `:focus-visible`, `:active` | État d'interaction | — |
> | `:checked`, `:disabled`, `:invalid`, `:placeholder-shown` | État de formulaire | — |
> | `:first-child`, `:last-child`, `:nth-child(2n)`, `:nth-of-type(3)` | Position | lignes paires d'un tableau |
> | `:not(.favori)` | Négation | — |
> | `:is(h1, h2, h3)` / `:where(...)` | Liste (spécificité normale / nulle) | — |
> | `.carte:has(img)` | Parent qui contient | carte avec image |
> | `::before`, `::after`, `::placeholder`, `::selection` | Pseudo-éléments | contenu décoratif |

> [!example]- Analogie
> Les sélecteurs sont des adresses postales de plus en plus précises : « toutes les maisons » (`*`), « la rue des Lilas » (`.lilas`), « le n°12 » (`#n12`), « la maison à côté de l'école » (`.ecole + .maison`).

> [!question]- Pourquoi l'utiliser ?
> Écrire moins de classes, cibler précisément, comprendre le CSS généré par l'IA ou les librairies, et sélectionner dans les tests et la console.

> [!question]- Comment ça marche ?
> Tester un sélecteur : DevTools > Console > `$$('.liste > li:nth-child(odd)')` (raccourci de `querySelectorAll`) ou Ctrl+F dans l'onglet Elements (accepte les sélecteurs).
> Angular/Vue : les styles d'un composant sont limités au composant (encapsulation / `scoped`) ; `:host` (Angular) cible l'élément racine du composant.

> [!question]- Quand l'utiliser ?
> En CSS, rester simple (classes). Les sélecteurs avancés servent surtout pour des états (`:has`, `:focus-visible`), des tableaux (`:nth-child`) et le ciblage en JS/tests.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Sélecteurs longs et imbriqués = fragiles et trop spécifiques.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Combinateur | Relation entre éléments (espace, `>`, `+`, `~`) |
| Pseudo-classe | État ou position (`:hover`, `:nth-child`) |
| Pseudo-élément | Partie d'un élément (`::before`) |
| `:host` | Racine d'un composant Angular |

---

## Points clés

- Classes pour styler
- `>` enfant direct, espace = descendant
- `:has()` = sélecteur parent
- `$$()` dans la console pour tester

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Confondre `:nth-child` (toutes balises confondues) et `:nth-of-type` (même balise)
> - `:hover` seul sans `:focus-visible` → inaccessible au clavier

---

## Exemple minimal

```css
tbody tr:nth-child(even) { background: var(--fond-alt); }
.carte:has(input:checked) { outline: 2px solid var(--couleur-primaire); }
.btn:is(:hover, :focus-visible) { transform: translateY(-1px); }
input:user-invalid { border-color: var(--couleur-danger); }
```

> [!note] Ce que j'en retiens
> Lignes alternées, carte sélectionnée, survol accessible et erreurs de saisie, sans une ligne de JS.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Utiliser `:where()` dans les styles de base pour qu'ils restent faciles à surcharger

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[HTML-CSS]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/css-11-aide-memoire-selecteurs]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Différence entre `.liste li` et `.liste > li` ?

---

## Tâches

- [ ] #task Terminer CSS Diner (flukeout.github.io)
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
