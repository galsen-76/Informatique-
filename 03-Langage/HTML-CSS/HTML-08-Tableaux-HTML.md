---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - frontend/html/tableaux
aliases:
  - "Tableaux HTML"
parent: "[[HTML-CSS]]"
children: []
related_theory:
  - "[[HTML-04-Aide-Memoire-Balises|Aide-mémoire des Balises HTML]]"
  - "[[UI-Librairies-Interfaces-Rapides|Librairies UI pour Interfaces Rapides]]"
related_snippets:
  - "[[04_Snippets/html-08-tableaux-html]]"
related_projects: []
source: "https://developer.mozilla.org/fr/docs/Learn/HTML/Tables"
---

# Tableaux HTML

> [!abstract] Introduction
> Les tableaux affichent des données en lignes et colonnes (listes d'utilisateurs, commandes, statistiques) — l'écran le plus fréquent des applications métier et des dashboards.

---

## Théorie

> [!question]- C'est quoi ?
> ```html
> <table>
>   <caption>Films les mieux notés</caption>
>   <thead>
>     <tr><th scope="col">Titre</th><th scope="col">Année</th><th scope="col">Note</th></tr>
>   </thead>
>   <tbody>
>     <tr><th scope="row">Dune</th><td>2021</td><td>8,1</td></tr>
>     <tr><th scope="row">Heat</th><td>1995</td><td>8,3</td></tr>
>   </tbody>
> </table>
> ```

> [!example]- Analogie
> Un tableau HTML, c'est une feuille Excel : en-têtes de colonnes (`th`), lignes (`tr`) et cellules (`td`).

> [!question]- Pourquoi l'utiliser ?
> Structure lisible par les lecteurs d'écran (qui annoncent l'en-tête de chaque cellule), tri et export faciles, base de tous les composants « data table ».

> [!question]- Comment ça marche ?
> - `thead` / `tbody` / `tfoot` : parties du tableau
> - `th scope="col|row"` : en-têtes de colonne ou de ligne
> - `caption` : titre du tableau
> - `colspan` / `rowspan` : fusion de cellules
> - Responsive : conteneur `overflow-x: auto` ou affichage en cartes sur mobile
> - Dans les frameworks : boucle `@for` / `v-for` sur les lignes ; pour tri, pagination, filtres → composant de librairie (Material Table, PrimeNG/PrimeVue DataTable, AG Grid)

> [!question]- Quand l'utiliser ?
> Données tabulaires uniquement (jamais pour la mise en page).

> [!danger]- Quand NE PAS l'utiliser / Limites
> Au-delà de quelques centaines de lignes : pagination serveur ou virtualisation.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| `th` | Cellule d'en-tête |
| `td` | Cellule de données |
| `scope` | Indique à quelles cellules s'applique un en-tête |
| `colspan` | Fusion horizontale de cellules |

---

## Points clés

- `th` + `scope` pour l'accessibilité
- `caption` pour décrire le tableau
- Librairie de data table pour tri/pagination/filtre

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Tableau utilisé pour aligner un formulaire
> - Tableau de 5000 lignes rendu d'un coup

---

## Exemple minimal

```html
<!-- Angular -->
<tbody>
  @for (f of films(); track f.id) {
    <tr><th scope="row">{{ f.titre }}</th><td>{{ f.annee }}</td><td>{{ f.note | number:'1.1-1' }}</td></tr>
  } @empty {
    <tr><td colspan="3">Aucun film</td></tr>
  }
</tbody>
```

> [!note] Ce que j'en retiens
> `@empty` gère le cas « liste vide » directement dans le tableau.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Choisir entre table maison, composant UI et AG Grid selon volume et besoins (édition, export)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[HTML-CSS]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/html-08-tableaux-html]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - À quoi sert `scope="col"` ?

---

## Tâches

- [ ] #task Afficher la liste des films en tableau dans CinéTrack
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
