---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - frontend/css/flexbox
aliases:
  - "Flexbox CSS"
parent: "[[HTML-CSS]]"
children: []
related_theory:
  - "[[CSS-02-Box-Model|Box Model CSS]]"
related_snippets:
  - "[[04_Snippets/css-03-flexbox]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/"
---

# Flexbox CSS

> [!abstract] Introduction
> Flexbox dispose des éléments sur UN axe (ligne ou colonne) en gérant l'alignement, l'espacement et la répartition de l'espace disponible — l'outil n°1 des barres de navigation, cartes et boutons.

> [!warning]- Prérequis
> [[CSS-02-Box-Model|Box Model CSS]]

---

## Théorie

> [!question]- C'est quoi ?
> ```css
> .barre { display: flex; justify-content: space-between; align-items: center; gap: 1rem; }
> ```

> [!example]- Analogie
> Des livres sur une étagère : on choisit l'axe (horizontal), leur répartition (serrés à gauche, espacés…) et leur alignement vertical (alignés en haut, centrés…).

> [!question]- Pourquoi l'utiliser ?
> Centrer, aligner, répartir en quelques lignes — ce qui était un casse-tête avec `float`.

> [!question]- Comment ça marche ?
> Sur le **conteneur** :
> - `flex-direction` : `row` | `column` (définit l'axe principal)
> - `justify-content` : alignement sur l'axe principal
> - `align-items` : alignement sur l'axe secondaire
> - `flex-wrap: wrap` : passage à la ligne
> - `gap` : espacement
> Sur les **enfants** :
> - `flex: 1` (= grow 1, shrink 1, basis 0) : prend l'espace restant
> - `flex-shrink: 0` : ne rétrécit jamais
> - `align-self`, `order`

> [!question]- Quand l'utiliser ?
> Mise en page à une dimension : navbar, rangée de boutons, carte (image + texte), centrage.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Pour une vraie grille à 2 dimensions (lignes ET colonnes alignées), Grid est plus adapté.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Axe principal | Direction de `flex-direction` |
| Axe secondaire | Perpendiculaire à l'axe principal |
| flex-basis | Taille de départ avant répartition |
| flex-grow / shrink | Capacité à grandir / rétrécir |

---

## Points clés

- `justify-*` = axe principal, `align-*` = axe secondaire
- `gap` plutôt que des marges
- `min-width: 0` sur un enfant flex pour permettre le texte tronqué
- Centrage parfait : `display:flex; place-items` (ou justify+align center)

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Texte long qui déborde car les enfants flex ont `min-width: auto` → ajouter `min-width: 0`
> - Confondre `justify-content` et `align-items` après un passage en `column`

---

## Exemple minimal

```css
.film-card { display: flex; gap: 1rem; align-items: flex-start; }
.film-card img { flex-shrink: 0; width: 120px; }
.film-card .infos { flex: 1; min-width: 0; }
.film-card .titre { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
```

> [!note] Ce que j'en retiens
> Image à taille fixe, texte qui prend le reste et se tronque proprement : le pattern « media object ».

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Savoir quand combiner Flex (composants) et Grid (layout de page)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[HTML-CSS]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[CSS-04-Grid|Grid CSS]]

**Pratique :**
- Extrait de code → [[04_Snippets/css-03-flexbox]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Que fait `flex: 1` exactement ?

---

## Tâches

- [ ] #task Finir le jeu Flexbox Froggy
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
