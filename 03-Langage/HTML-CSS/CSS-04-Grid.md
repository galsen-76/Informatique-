---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - frontend/css/grid
aliases:
  - "Grid CSS"
parent: "[[HTML-CSS]]"
children: []
related_theory:
  - "[[CSS-02-Box-Model|Box Model CSS]]"
related_snippets:
  - "[[04_Snippets/css-04-grid]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://css-tricks.com/snippets/css/complete-guide-grid/"
---

# Grid CSS

> [!abstract] Introduction
> CSS Grid crée des mises en page en DEUX dimensions (lignes et colonnes) : layouts de page, galeries responsives, tableaux de bord.

> [!warning]- Prérequis
> [[CSS-02-Box-Model|Box Model CSS]]

---

## Théorie

> [!question]- C'est quoi ?
> ```css
> .galerie {
>   display: grid;
>   grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
>   gap: 1rem;
> }
> ```

> [!example]- Analogie
> Un tableur : on définit les colonnes et les lignes, puis on place chaque élément dans ses cases (en pouvant fusionner des cellules).

> [!question]- Pourquoi l'utiliser ?
> Une galerie responsive sans aucune media query, un layout de page lisible avec des zones nommées.

> [!question]- Comment ça marche ?
> - `grid-template-columns/rows` : taille des pistes (`1fr`, `auto`, `minmax()`, `repeat()`)
> - `fr` : fraction de l'espace restant
> - `grid-template-areas` : zones nommées
> - `grid-column: 1 / -1` : s'étendre sur toutes les colonnes
> - `auto-fill` vs `auto-fit` : garder les colonnes vides ou étirer les éléments

> [!question]- Quand l'utiliser ?
> Layout global (header / sidebar / contenu / footer), grilles de cartes, formulaires alignés.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Pour une simple rangée d'éléments de tailles variables, Flexbox est plus simple.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Piste (track) | Une ligne ou une colonne de la grille |
| fr | Fraction de l'espace disponible |
| Zone (area) | Région nommée de la grille |
| subgrid | Enfant qui réutilise les pistes du parent |

---

## Points clés

- `repeat(auto-fill, minmax(X, 1fr))` = grille responsive sans media query
- `grid-template-areas` rend le layout lisible
- `gap` fonctionne en grid et flex

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Confondre `auto-fill` et `auto-fit`
> - Oublier `min-width: 0` / `minmax(0, 1fr)` → débordement de contenu long

---

## Exemple minimal

```css
.page {
  display: grid;
  grid-template-areas: "header header" "nav main" "footer footer";
  grid-template-columns: 240px 1fr;
  min-height: 100dvh;
}
.page > header { grid-area: header; }
.page > nav { grid-area: nav; }
.page > main { grid-area: main; }
.page > footer { grid-area: footer; }
@media (width < 768px) {
  .page { grid-template-areas: "header" "main" "footer"; grid-template-columns: 1fr; }
  .page > nav { display: none; }
}
```

> [!note] Ce que j'en retiens
> Changer le layout sur mobile = redéfinir les zones, sans toucher au HTML.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Utiliser `subgrid` pour aligner des cartes de hauteurs différentes

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[HTML-CSS]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[CSS-03-Flexbox|Flexbox CSS]]

**Pratique :**
- Extrait de code → [[04_Snippets/css-04-grid]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Quand choisir Grid plutôt que Flexbox ?

---

## Tâches

- [ ] #task Finir le jeu Grid Garden
- [ ] #task Faire le layout de CinéTrack avec grid-template-areas
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
