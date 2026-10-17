---
type: notion
statut: a apprendre
resume: "Un tableau affiche des données en lignes et colonnes : liste d'utilisateurs, commandes, statistiques."
revu:
sources:
  - "https://developer.mozilla.org/fr/docs/Learn/HTML/Tables"
---
# Tableaux HTML

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Un tableau affiche des **données en lignes et colonnes** : liste d'utilisateurs, commandes, statistiques.

## Le problème

**Pourquoi c'est utile ?**
Pour afficher des données en lignes et colonnes de façon lisible et accessible.

**Qu'est-ce qui se passait sans ça ?**
On faisait des tableaux avec des <div> alignées à la main : illisibles au lecteur d'écran et fragiles.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

C'est l'écran le plus fréquent des applications métier. En pratique, tu utiliseras souvent le composant tableau d'une librairie (PrimeVue / PrimeNG), mais il produit ce même HTML.

### Un tableau correct

```html
<table>
  <caption>Mes films vus en 2026</caption>
  <thead>
    <tr>
      <th scope="col">Titre</th>
      <th scope="col">Année</th>
      <th scope="col">Note</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Dune</td>
      <td>2021</td>
      <td>9/10</td>
    </tr>
  </tbody>
</table>
```

| Balise | Rôle |
|---|---|
| `table` | le tableau |
| `caption` | son titre (lu par les lecteurs d'écran) |
| `thead` / `tbody` / `tfoot` | en-tête / corps / pied (totaux) |
| `tr` | une ligne |
| `th` | une cellule d'**en-tête** (avec `scope="col"` ou `scope="row"`) |
| `td` | une cellule de donnée |

Les `th` avec `scope` permettent au lecteur d'écran d'annoncer « Note : 9/10 » au lieu de « 9/10 » seul.

### Sur mobile

Un tableau large déborde. Solution simple : l'envelopper dans un conteneur qui défile horizontalement.

```html
<div style="overflow-x: auto">
  <table>…</table>
</div>
```

## 🧪 Exemple

### Avec Angular ou Vue

```html
<!-- Angular -->
@for (f of films(); track f.id) {
  <tr><td>{{ f.titre }}</td><td>{{ f.annee }}</td></tr>
} @empty {
  <tr><td colspan="2">Aucun film</td></tr>
}

<!-- Vue -->
<tr v-for="f in films" :key="f.id">
  <td>{{ f.titre }}</td><td>{{ f.annee }}</td>
</tr>
```

Pour le tri, la pagination et les filtres, prends le composant `DataTable` de PrimeVue ou `p-table` de PrimeNG plutôt que de tout recoder.

## ⚠️ Limites et pièges

- **Utiliser un tableau pour la mise en page** : c'est le rôle de Flexbox et Grid.
- **Pas de `th`** : le lecteur d'écran lit une suite de valeurs sans savoir à quelle colonne elles appartiennent.
- **Des milliers de lignes d'un coup** : pagine, ou utilise un tableau « virtualisé ».

## 🏋️ S'entraîner

### Exercices

#### Exercice 1 · Un tableau accessible

Écris un tableau des films notés avec les colonnes Titre, Année, Note, un titre de tableau, et 2 lignes.

> [!success]- Solution
> ```html
> <table>
>   <caption>Mes films notés</caption>
>   <thead>
>     <tr>
>       <th scope="col">Titre</th>
>       <th scope="col">Année</th>
>       <th scope="col">Note</th>
>     </tr>
>   </thead>
>   <tbody>
>     <tr><td>Dune</td><td>2021</td><td>5</td></tr>
>     <tr><td>Alien</td><td>1979</td><td>4</td></tr>
>   </tbody>
> </table>
> ```

#### Exercice 2 · Tableau ou pas ?

Pour chaque cas, faut-il un `<table>` ?
1. comparer les notes de plusieurs films sur plusieurs critères ;
2. afficher une grille d'affiches de films ;
3. un formulaire en deux colonnes.

> [!success]- Solution
> 1. **Oui** : ce sont des données en lignes et colonnes.
> 2. **Non** : c'est de la mise en page → CSS Grid.
> 3. **Non** : mise en page → CSS Grid ou Flexbox.
>
> Un `<table>` sert uniquement pour des **données tabulaires**, jamais pour la mise en page.

## 🔗 Liens

- **Prérequis :** [[01 Structure HTML et sémantique|Structure HTML et sémantique]]
- **Voir aussi :** [[02 Aide-mémoire des balises HTML|Aide-mémoire des balises HTML]], [[04 Librairies UI pour interfaces rapides|Librairies UI pour interfaces rapides]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://developer.mozilla.org/fr/docs/Learn/HTML/Tables
