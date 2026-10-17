---
type: notion
statut: a apprendre
resume: "Une règle CSS = qui (le sélecteur) + quoi (les propriétés)."
revu:
sources:
  - "https://developer.mozilla.org/fr/docs/Web/CSS/Specificity"
---
# Sélecteurs cascade et spécificité CSS

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Une règle CSS = **qui** (le sélecteur) + **quoi** (les propriétés).

## Le problème

**Pourquoi c'est utile ?**
Pour savoir quelle règle CSS s'applique quand plusieurs visent le même élément.

**Qu'est-ce qui se passait sans ça ?**
On ne comprenait pas pourquoi un style « ne marchait pas », et on ajoutait des !important partout jusqu'à ce que plus rien ne soit modifiable.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Quand plusieurs règles visent le même élément et se contredisent, le navigateur applique la **cascade** pour choisir. La comprendre t'évite de coller des `!important` partout.

### Une règle CSS

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

La liste complète : [[Aide-mémoire des sélecteurs CSS|Aide-mémoire des sélecteurs]].

### Qui gagne en cas de conflit ?

Le navigateur regarde dans cet ordre :

1. **`!important`** gagne (à éviter : c'est une arme nucléaire).
2. Sinon, la règle la plus **spécifique** gagne.
3. À égalité, la règle écrite **en dernier** gagne.

#### La spécificité : un score à 3 chiffres

| Sélecteur | Score (id, classe, balise) |
|---|---|
| `h3` | 0-0-1 |
| `.carte` | 0-1-0 |
| `.carte h3` | 0-1-1 |
| `.carte .titre` | 0-2-0 |
| `#menu` | 1-0-0 |
| `style="…"` dans le HTML | bat tout (sauf `!important`) |

On compare de gauche à droite : **un seul id bat cent classes**. D'où le conseil : style avec des **classes**, pas des id.

### L'héritage

Certaines propriétés passent automatiquement aux enfants : `color`, `font-family`, `font-size`, `line-height`. D'autres non : `margin`, `padding`, `border`, `background`.

C'est pour ça qu'on définit la police et la couleur du texte une seule fois sur `body`.

### Déboguer

F12 → onglet **Elements** → sélectionne l'élément → panneau **Styles** : tu vois toutes les règles qui s'appliquent, et celles qui ont perdu sont **barrées**. Tu vois immédiatement laquelle gagne et pourquoi.

## 🧪 Exemple

> À compléter avec un exemple tiré de ton travail.

## ⚠️ Limites et pièges

- **`!important` pour forcer** : la prochaine fois, il faudra un autre `!important` pour le battre.
- **Sélecteurs à rallonge** (`.page .main .liste .carte .titre`) : fragiles et trop spécifiques. Une classe bien nommée suffit.
- Dans Angular et Vue, le CSS d'un composant est **limité à ce composant** par défaut : tu évites la plupart des conflits (voir [[Architecture CSS BEM et Tailwind|Architecture CSS]]).

## 🏋️ S'entraîner

### Exercices

#### Exercice 1 · Quelle couleur ?

De quelle couleur est le titre ? Explique.

```html
<h2 id="main-title" class="title">Dune</h2>
```

```css
#main-title { color: red; }
.title { color: blue; }
h2 { color: green; }
```

> [!success]- Solution
> **Rouge**. La spécificité l'emporte sur l'ordre :
> - `#main-title` → (1, 0, 0)
> - `.title` → (0, 1, 0)
> - `h2` → (0, 0, 1)
>
> L'id gagne. C'est pour ça qu'on évite les `id` en CSS : ils sont difficiles à surcharger.

#### Exercice 2 · Calculer des scores

Classe ces sélecteurs du moins fort au plus fort :
`nav a`, `.card .title`, `a:hover`, `.movie-card`, `#header .logo`.

> [!success]- Solution
> | Sélecteur | Score |
> |---|---|
> | `nav a` | (0, 0, 2) |
> | `.movie-card` | (0, 1, 0) |
> | `a:hover` | (0, 1, 1) |
> | `.card .title` | (0, 2, 0) |
> | `#header .logo` | (1, 1, 0) |
>
> On compare colonne par colonne, de gauche à droite.

## 🔗 Liens

- **Prérequis :** 
- **Voir aussi :** [[Structure HTML et sémantique]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://developer.mozilla.org/fr/docs/Web/CSS/Specificity
