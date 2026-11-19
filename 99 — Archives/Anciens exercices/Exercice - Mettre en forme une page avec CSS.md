---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[CSS]]"
  - "[[Sélecteur CSS]]"
  - "[[Modèle de boîte]]"
tags:
  - exercice
---
# Exercice — Mettre en forme une page avec CSS

> [!info] Objectif
> Donner un style propre et cohérent à ta page, en comprenant chaque règle.
> Notions : [[CSS]] · [[Sélecteur CSS]] · [[Modèle de boîte]]

## Consignes
- [ ] Relie un fichier `style.css` à la page de l'exercice HTML
- [ ] Définis 4 variables de couleur dans `:root` et utilise-les partout
- [ ] Ajoute `box-sizing: border-box` à tous les éléments
- [ ] Transforme chaque `article` en carte (padding, bordure, coins arrondis, marge)
- [ ] Stylise les liens du menu, avec un état `:hover` et `:focus` visible
- [ ] Écris une règle volontairement écrasée par une autre et explique, grâce à F12, pourquoi elle perd
- [ ] Stylise les champs du formulaire, y compris un champ invalide (`:invalid`)

> [!question]- Indice
> La spécificité : `#id` > `.classe` > `balise`. Dans F12, la règle perdante est barrée et la gagnante est indiquée au-dessus.

> [!question]- Solution
> ```css
> :root { --fond: #1e1f24; --texte: #c8ced9; --accent: #ffc66d; --bord: #3a3d46; }
> *, *::before, *::after { box-sizing: border-box; }
> body { margin: 0; font-family: system-ui, sans-serif; background: var(--fond); color: var(--texte); line-height: 1.5; }
> article { padding: 1rem 1.25rem; border: 1px solid var(--bord); border-radius: 8px; margin: 0 0 1.5rem; }
> nav a { color: var(--texte); text-decoration: none; margin-right: 1rem; }
> nav a:hover, nav a:focus { color: var(--accent); text-decoration: underline; }
> input, select, textarea { display: block; width: 100%; padding: .5rem; margin-bottom: 1rem; }
> input:invalid { border-color: tomato; }
> p { color: white; }        /* écrasée par… */
> article p { color: var(--texte); }   /* …celle-ci, plus spécifique */
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
