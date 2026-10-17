---
type: notion
statut: a apprendre
resume: "Sur un gros projet, le CSS devient vite ingérable : on ne sait plus quelle règle agit où, et modifier un style en casse un autre."
revu:
sources:
  - "https://tailwindcss.com/docs"
---
# Architecture CSS BEM et Tailwind

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Sur un gros projet, le CSS devient vite ingérable : on ne sait plus quelle règle agit où, et modifier un style en casse un autre.

## Le problème

**Pourquoi c'est utile ?**
Pour organiser le CSS d'un gros projet sans que les styles se marchent dessus.

**Qu'est-ce qui se passait sans ça ?**
Modifier un style en cassait un autre ailleurs, et plus personne n'osait supprimer une règle.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Trois stratégies existent : une convention de nommage (**BEM**), le **CSS limité au composant** (Angular / Vue), et le **CSS utilitaire** (**Tailwind**). Dans tes projets, tu combineras surtout les deux dernières.

### Le problème

```css
.titre { color: red; }   /* écrit pour la page Contact… */
```

… et tous les `.titre` du site deviennent rouges. Le CSS est **global** par défaut.

### Solution 2 : le CSS du composant (ce que tu fais déjà)

Angular et Vue **limitent** le CSS d'un composant à ce composant :

```vue
<style scoped>
.titre { color: red; }   /* ne touche QUE les .titre de ce composant */
</style>
```

En Angular, c'est automatique pour le CSS de chaque composant. Plus besoin de noms à rallonge : `.titre` suffit à l'intérieur d'un composant.

### Solution 3 : Tailwind, des classes utilitaires

Chaque classe fait **une seule chose**, et on les combine directement dans le HTML :

```html
<article class="rounded-xl border border-slate-800 bg-slate-900 p-5 hover:border-emerald-500">
  <h3 class="text-lg font-bold">Dune</h3>
  <p class="text-sm text-slate-400">2021 · SF</p>
</article>
```

| Avantages | Inconvénients |
|---|---|
| on ne quitte pas le HTML | HTML chargé |
| aucun conflit, aucun CSS mort | il faut apprendre les noms de classes |
| cohérent (espacements et couleurs d'une échelle fixe) | |
| responsive facile : `md:grid-cols-3` | |

### Ce que tu utilises dans tes projets

| Besoin | Outil |
|---|---|
| Les composants tout faits (boutons, tableaux, menus) | PrimeVue / PrimeNG |
| La mise en page et les ajustements | Tailwind ou CSS du composant |
| Les couleurs, rayons, ombres | variables CSS de la charte |

Voir [[Librairies UI pour interfaces rapides|Librairies UI]].

**Au travail**, suis la convention déjà en place dans le projet.

## 🧪 Exemple

### Solution 1 : BEM, une convention de nommage

**B**loc, **E**lément, **M**odificateur :

```html
<article class="carte carte--favori">
  <h3 class="carte__titre">Dune</h3>
  <button class="carte__bouton">Voir</button>
</article>
```

| Partie | Écriture | Sens |
|---|---|---|
| Bloc | `carte` | le composant |
| Élément | `carte__titre` | une partie du bloc |
| Modificateur | `carte--favori` | une variante |

Chaque classe est unique et plate : pas de conflit, pas de sélecteurs imbriqués.

## ⚠️ Limites et pièges

- 

## 🏋️ S'entraîner

### Exercices

#### Exercice 1 · Nommer en BEM

Donne les classes BEM pour une carte de film qui contient une affiche, un titre et un bouton favori, avec une variante « en vedette ».

> [!success]- Solution
> ```html
> <article class="movie-card movie-card--featured">
>   <img class="movie-card__poster" />
>   <h2 class="movie-card__title">Dune</h2>
>   <button class="movie-card__favorite">♥</button>
> </article>
> ```
>
> Bloc `movie-card`, éléments `__poster`, `__title`, `__favorite`, modificateur `--featured`.

#### Exercice 2 · Traduire en Tailwind

Écris cette carte avec des classes Tailwind : fond blanc, coins arrondis, ombre, espacement interne, et l'ombre qui grossit au survol.

> [!success]- Solution
> ```html
> <article class="rounded-xl bg-white p-4 shadow transition hover:shadow-lg">
>   <h2 class="font-semibold">Dune</h2>
> </article>
> ```
>
> Pas de fichier CSS : chaque classe applique une seule règle.

## 🔗 Liens

- **Prérequis :** [[Sélecteurs cascade et spécificité CSS]]
- **Voir aussi :** [[SCSS et Sass]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://tailwindcss.com/docs
