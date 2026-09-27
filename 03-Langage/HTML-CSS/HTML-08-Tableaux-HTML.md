---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - frontend/html/tableaux
aliases:
  - "Tableaux HTML"
parent: "[[HTML-CSS]]"
related_theory:
  - "[[HTML-04-Aide-Memoire-Balises|Aide-mémoire des Balises HTML]]"
  - "[[UI-Librairies-Interfaces-Rapides|Librairies UI pour Interfaces Rapides]]"
related_projects: []
source: "https://developer.mozilla.org/fr/docs/Learn/HTML/Tables"
---

# Tableaux HTML

> [!abstract] En bref
> Un tableau affiche des **données en lignes et colonnes** : liste d'utilisateurs, commandes, statistiques. C'est l'écran le plus fréquent des applications métier. En pratique, tu utiliseras souvent le composant tableau d'une librairie (PrimeVue / PrimeNG), mais il produit ce même HTML.

## Un tableau correct

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

## Avec Angular ou Vue

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

## Sur mobile

Un tableau large déborde. Solution simple : l'envelopper dans un conteneur qui défile horizontalement.

```html
<div style="overflow-x: auto">
  <table>…</table>
</div>
```

## Pièges

- **Utiliser un tableau pour la mise en page** : c'est le rôle de Flexbox et Grid.
- **Pas de `th`** : le lecteur d'écran lit une suite de valeurs sans savoir à quelle colonne elles appartiennent.
- **Des milliers de lignes d'un coup** : pagine, ou utilise un tableau « virtualisé ».

## Exercices

### Exercice 1 · Un tableau accessible

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

### Exercice 2 · Tableau ou pas ?

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
