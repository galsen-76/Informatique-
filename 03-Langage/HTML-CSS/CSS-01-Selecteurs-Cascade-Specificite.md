---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - frontend/css/cascade
aliases:
  - "Sélecteurs Cascade et Spécificité CSS"
parent: "[[HTML-CSS]]"
related_theory:
  - "[[HTML-01-Structure-Semantique|Structure HTML et Sémantique]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://developer.mozilla.org/fr/docs/Web/CSS/Specificity"
---

# Sélecteurs Cascade et Spécificité CSS

> [!abstract] En bref
> Une règle CSS = **qui** (le sélecteur) + **quoi** (les propriétés). Quand plusieurs règles visent le même élément et se contredisent, le navigateur applique la **cascade** pour choisir. La comprendre t'évite de coller des `!important` partout.

## Une règle CSS

```css
.carte h3 {            /* qui : les h3 dans un élément .carte */
  color: #10b981;      /* quoi */
  font-size: 1.1rem;
}
```

Les sélecteurs principaux :

| Sélecteur | Vise |
|---|---|
| `h3` | toutes les balises `<h3>` |
| `.carte` | les éléments avec `class="carte"` |
| `#menu` | l'élément avec `id="menu"` (à éviter pour le style) |
| `.carte h3` | les `h3` **à l'intérieur** d'une `.carte` |
| `.carte > h3` | les `h3` **enfants directs** |
| `.btn:hover` | au survol |
| `.btn:focus-visible` | quand on arrive dessus au clavier |

La liste complète : [[CSS-11-Aide-Memoire-Selecteurs|Aide-mémoire des sélecteurs]].

## Qui gagne en cas de conflit ?

Le navigateur regarde dans cet ordre :

1. **`!important`** gagne (à éviter : c'est une arme nucléaire).
2. Sinon, la règle la plus **spécifique** gagne.
3. À égalité, la règle écrite **en dernier** gagne.

### La spécificité : un score à 3 chiffres

| Sélecteur | Score (id, classe, balise) |
|---|---|
| `h3` | 0-0-1 |
| `.carte` | 0-1-0 |
| `.carte h3` | 0-1-1 |
| `.carte .titre` | 0-2-0 |
| `#menu` | 1-0-0 |
| `style="…"` dans le HTML | bat tout (sauf `!important`) |

On compare de gauche à droite : **un seul id bat cent classes**. D'où le conseil : style avec des **classes**, pas des id.

## L'héritage

Certaines propriétés passent automatiquement aux enfants : `color`, `font-family`, `font-size`, `line-height`. D'autres non : `margin`, `padding`, `border`, `background`.

C'est pour ça qu'on définit la police et la couleur du texte une seule fois sur `body`.

## Déboguer

F12 → onglet **Elements** → sélectionne l'élément → panneau **Styles** : tu vois toutes les règles qui s'appliquent, et celles qui ont perdu sont **barrées**. Tu vois immédiatement laquelle gagne et pourquoi.

## Pièges

- **`!important` pour forcer** : la prochaine fois, il faudra un autre `!important` pour le battre.
- **Sélecteurs à rallonge** (`.page .main .liste .carte .titre`) : fragiles et trop spécifiques. Une classe bien nommée suffit.
- Dans Angular et Vue, le CSS d'un composant est **limité à ce composant** par défaut : tu évites la plupart des conflits (voir [[CSS-09-Architecture-BEM-Tailwind|Architecture CSS]]).
