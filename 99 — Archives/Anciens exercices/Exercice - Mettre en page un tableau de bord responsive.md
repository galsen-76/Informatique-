---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Flexbox]]"
  - "[[Grid CSS]]"
  - "[[Responsive design]]"
tags:
  - exercice
---
# Exercice — Mettre en page un tableau de bord responsive

> [!info] Objectif
> Construire la mise en page d'une petite application, lisible du téléphone au grand écran.
> Notions : [[Flexbox]] · [[Grid CSS]] · [[Responsive design]]

## Consignes
- [ ] Crée une page avec en-tête, menu latéral, zone principale et pied de page, placés avec Grid (`grid-template-areas`)
- [ ] Dans l'en-tête, aligne un logo à gauche et deux boutons à droite avec Flexbox
- [ ] Dans la zone principale, affiche 9 cartes avec une grille `auto-fill` / `minmax`
- [ ] Écris le CSS « mobile d'abord » : une seule colonne, le menu sous l'en-tête
- [ ] À partir de 768 px, passe en deux colonnes (menu à gauche)
- [ ] Vérifie dans le mode appareil de F12 qu'il n'y a aucun défilement horizontal à 375 px

> [!question]- Indice
> Commence par la version mobile sans media query, puis ajoute `@media (min-width: 768px) { … }` qui redéfinit `grid-template-columns` et `grid-template-areas`.

> [!question]- Solution
> ```css
> .page { display: grid; gap: 1rem; padding: 1rem; min-height: 100vh;
>         grid-template-areas: "entete" "menu" "contenu" "pied"; }
> header { grid-area: entete; display: flex; justify-content: space-between; align-items: center; gap: 1rem; }
> nav { grid-area: menu; } main { grid-area: contenu; } footer { grid-area: pied; }
> .cartes { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; }
> @media (min-width: 768px) {
>   .page { grid-template-columns: 220px 1fr;
>           grid-template-areas: "entete entete" "menu contenu" "pied pied"; }
> }
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
