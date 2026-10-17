---
type: notion
statut: a apprendre
resume: "Flexbox aligne des éléments sur une seule ligne ou une seule colonne et répartit l'espace entre eux."
revu:
sources:
  - "https://css-tricks.com/snippets/css/a-guide-to-flexbox/"
---
# Flexbox CSS

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Flexbox aligne des éléments **sur une seule ligne ou une seule colonne** et répartit l'espace entre eux.

## Le problème

**Pourquoi c'est utile ?**
Pour aligner des éléments sur une ligne ou une colonne et répartir l'espace facilement.

**Qu'est-ce qui se passait sans ça ?**
On utilisait des float et des marges calculées à la main : centrer verticalement un élément était un défi célèbre.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

C'est l'outil n°1 pour une barre de navigation, une rangée de boutons, ou centrer quelque chose.

### Le principe

On active Flexbox sur le **parent**, et ce sont ses **enfants directs** qui s'alignent :

```css
.barre {
  display: flex;
  justify-content: space-between;  /* répartition sur l'axe principal */
  align-items: center;             /* alignement sur l'autre axe */
  gap: 16px;                       /* espace entre les enfants */
}
```

```html
<header class="barre">
  <a class="logo">TN</a>
  <nav>…</nav>
  <button>Contact</button>
</header>
```

Résultat : logo à gauche, bouton à droite, nav au milieu, tout centré verticalement.

### Aide-mémoire

**Sur le parent**

| Propriété | Valeurs utiles |
|---|---|
| `flex-direction` | `row` (en ligne), `column` (en colonne) |
| `justify-content` | `flex-start`, `center`, `space-between`, `flex-end` |
| `align-items` | `stretch` (défaut), `center`, `flex-start`, `flex-end` |
| `flex-wrap` | `wrap` : passe à la ligne s'il n'y a plus de place |
| `gap` | espace entre les enfants |

**Sur un enfant**

| Propriété | Effet |
|---|---|
| `flex: 1` | prend toute la place restante |
| `flex-shrink: 0` | refuse de rétrécir (une icône, un logo) |
| `margin-left: auto` | se pousse tout à droite |
| `align-self: center` | s'aligne autrement que les autres |

### Les recettes

```css
/* Centrer parfaitement */
.centre { display: flex; justify-content: center; align-items: center; }

/* Des tags qui passent à la ligne */
.tags { display: flex; flex-wrap: wrap; gap: 6px; }

/* Un champ qui prend la place, un bouton à côté */
.recherche { display: flex; gap: 8px; }
.recherche input { flex: 1; }

/* Le pied d'une carte toujours en bas */
.carte { display: flex; flex-direction: column; }
.carte .pied { margin-top: auto; }
```

### Flexbox ou Grid ?

- **Une dimension** (une ligne OU une colonne) → Flexbox.
- **Deux dimensions** (lignes ET colonnes : grille de cartes, mise en page) → [[13 Grid CSS|Grid]].

Jeu pour s'entraîner : [Flexbox Froggy](https://flexboxfroggy.com/#fr).

## 🧪 Exemple

### Les 2 axes

```mermaid
flowchart LR
  A["flex-direction: row (défaut)"] --> B["axe principal : horizontal →<br/>justify-content"]
  A --> C["axe secondaire : vertical ↓<br/>align-items"]
```

Avec `flex-direction: column`, les axes s'inversent : `justify-content` agit à la verticale.

## ⚠️ Limites et pièges

- **`display: flex` sur l'enfant** au lieu du parent.
- **Un texte long qui déborde** d'un élément flex : ajoute `min-width: 0` sur cet élément.

## 🏋️ S'entraîner

### Exercices

#### Exercice 1 · Une barre de navigation

Écris le CSS pour que le logo soit à gauche, les liens à droite, le tout centré verticalement.

```html
<header class="topbar">
  <a class="logo">CinéTrack</a>
  <nav class="links"><a>Films</a><a>Favoris</a></nav>
</header>
```

> [!success]- Solution
> ```css
> .topbar {
>   display: flex;
>   justify-content: space-between;   /* axe principal (horizontal) */
>   align-items: center;              /* axe secondaire (vertical) */
>   padding: 1rem;
> }
>
> .links {
>   display: flex;
>   gap: 1rem;
> }
> ```

#### Exercice 2 · Centrer parfaitement

Centre horizontalement et verticalement un message « Aucun film trouvé » dans une zone de 300 px de haut.

> [!success]- Solution
> ```css
> .empty {
>   display: flex;
>   justify-content: center;
>   align-items: center;
>   min-height: 300px;
> }
> ```
>
> (Avec Grid : `display: grid; place-items: center;`.)

## 🔗 Liens

- **Prérequis :** [[09 Sélecteurs cascade et spécificité CSS|Sélecteurs cascade et spécificité CSS]]
- **Voir aussi :** [[11 Box model CSS|Box model CSS]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://css-tricks.com/snippets/css/a-guide-to-flexbox/
