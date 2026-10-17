---
type: notion
statut: a apprendre
resume: "Tous les sélecteurs utiles, sur une page."
revu:
sources:
  - "https://developer.mozilla.org/fr/docs/Web/CSS/CSS_selectors"
---
# Aide-mémoire des sélecteurs CSS

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Tous les sélecteurs utiles, sur une page.

## Le problème

**Pourquoi c'est utile ?**
Pour retrouver vite le bon sélecteur, utile en CSS mais aussi en JavaScript, dans les tests et les DevTools.

**Qu'est-ce qui se passait sans ça ?**
On cherchait la syntaxe sur Internet à chaque fois, ou on ajoutait des classes partout faute de connaître le bon sélecteur.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Ils servent à styler, mais aussi à trouver des éléments en JavaScript (`querySelector`), dans les tests et dans les DevTools.

### Les bases

| Sélecteur | Vise | Exemple |
|---|---|---|
| `*` | tout | `* { box-sizing: border-box }` |
| `balise` | toutes ces balises | `button` |
| `.classe` | ces classes | `.carte` |
| `#id` | cet id | `#recherche` |
| `a, button` | l'un **ou** l'autre | |
| `.btn.actif` | les deux classes **à la fois** (sans espace) | |

### Les relations

| Sélecteur | Vise |
|---|---|
| `.carte h3` | les `h3` **n'importe où dans** `.carte` |
| `.liste > li` | les `li` **enfants directs** de `.liste` |
| `h2 + p` | le `p` **juste après** un `h2` |
| `h2 ~ p` | tous les `p` **après** un `h2`, au même niveau |

### Les attributs

| Sélecteur | Vise |
|---|---|
| `[disabled]` | les éléments qui ont l'attribut |
| `[type="email"]` | valeur exacte |
| `[data-id="42"]` | un `data-*` précis |
| `[href^="https"]` | commence par |
| `[href$=".pdf"]` | finit par |
| `[class*="btn"]` | contient |

### Les états (pseudo-classes)

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

### Les positions

| Sélecteur | Vise |
|---|---|
| `:first-child` / `:last-child` | premier / dernier enfant |
| `:nth-child(2)` | le 2e |
| `:nth-child(odd)` / `(even)` | impairs / pairs (lignes de tableau alternées) |
| `:not(.favori)` | tout sauf |
| `:has(img)` | qui **contient** une image (le « sélecteur parent ») |
| `:is(h1, h2, h3)` | l'un de ceux-là (raccourci) |

### Les pseudo-éléments

| Sélecteur | Vise |
|---|---|
| `::before` / `::after` | un contenu ajouté avant / après (décoration) |
| `::placeholder` | le texte indicatif d'un champ |
| `::selection` | le texte sélectionné |

## 🧪 Exemple

### Dans le code

```ts
document.querySelector('.carte:not(.favori)');
document.querySelectorAll('form :invalid');
document.querySelector('[data-testid="btn-envoyer"]');
```

Comment ils s'affrontent en cas de conflit : [[09 Sélecteurs cascade et spécificité CSS|Cascade et spécificité]].

## ⚠️ Limites et pièges

- 

## 🏋️ S'entraîner

### Exercices

#### Exercice 1 · Écrire les sélecteurs

Écris le sélecteur qui cible :
1. les liens directement dans `<nav>` (pas plus profond) ;
2. une ligne de tableau sur deux ;
3. les champs invalides ;
4. les liens qui mènent vers un autre site (commencent par `http`) ;
5. le dernier élément d'une liste.

> [!success]- Solution
> 1. `nav > a`
> 2. `tr:nth-child(even)`
> 3. `input:invalid` (ou `input:user-invalid` : seulement après une saisie)
> 4. `a[href^="http"]`
> 5. `li:last-child`

#### Exercice 2 · Un contour de focus visible

Écris la règle qui affiche un contour épais et coloré sur les éléments qui reçoivent le focus **au clavier**, sans l'afficher au clic de souris.

> [!success]- Solution
> ```css
> :focus-visible {
>   outline: 3px solid var(--primary);
>   outline-offset: 2px;
> }
> ```
>
> `:focus-visible` ne s'applique que quand le navigateur juge le contour utile (navigation clavier). Ne jamais écrire `outline: none` sans le remplacer.

## 🔗 Liens

- **Prérequis :** [[09 Sélecteurs cascade et spécificité CSS|Sélecteurs cascade et spécificité CSS]]
- **Voir aussi :** [[12 Sélectionner des éléments du DOM|Sélectionner des éléments du DOM]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://developer.mozilla.org/fr/docs/Web/CSS/CSS_selectors
