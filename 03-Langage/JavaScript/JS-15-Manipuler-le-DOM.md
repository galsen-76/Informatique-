---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - frontend/javascript/dom-manipulation
aliases:
  - "Manipuler le DOM"
parent: "[[JavaScript]]"
related_theory:
  - "[[JS-14-Selectionner-Elements-DOM|Sélectionner des Éléments du DOM]]"
  - "[[JS-08-DOM-Evenements|DOM et Événements JavaScript]]"
  - "[[SEC-06-XSS-CSRF|XSS et CSRF]]"
related_projects: []
source: "https://developer.mozilla.org/fr/docs/Web/API/Element"
---

# Manipuler le DOM

> [!abstract] En bref
> Une fois un élément trouvé, on peut changer son texte, ses classes, ses attributs, en créer de nouveaux ou en supprimer. C'est exactement ce qu'Angular et Vue font à ta place quand tes données changent.

## Aide-mémoire

| Besoin | Code |
|---|---|
| Changer le texte | `el.textContent = 'Dune'` |
| Ajouter / retirer une classe | `el.classList.add('actif')`, `.remove('actif')` |
| Basculer une classe selon une condition | `el.classList.toggle('favori', estFavori)` |
| Tester une classe | `el.classList.contains('actif')` |
| Changer un attribut | `el.setAttribute('aria-expanded', 'true')` |
| Lire / écrire un `data-*` | `el.dataset.id = '42'` (→ `data-id="42"`) |
| Changer un style | `el.style.display = 'none'` (préfère une classe) |
| Créer un élément | `document.createElement('li')` |
| L'ajouter dans un parent | `parent.append(el)` (à la fin), `parent.prepend(el)` (au début) |
| Le placer avant / après | `el.before(autre)`, `el.after(autre)` |
| Le supprimer | `el.remove()` |
| Vider un parent | `parent.replaceChildren()` |

## Exemple : afficher une liste de films

```ts
interface Film { id: number; titre: string; favori: boolean }

function afficherFilms(liste: HTMLUListElement, films: Film[]) {
  const elements = films.map(f => {
    const li = document.createElement('li');
    li.textContent = f.titre;              // jamais innerHTML avec des données
    li.dataset.id = String(f.id);
    li.classList.toggle('favori', f.favori);
    return li;
  });
  liste.replaceChildren(...elements);      // une seule mise à jour de la page
}
```

## La même chose avec un framework

Image : manipuler le DOM à la main, c'est **déplacer les meubles toi-même** à chaque changement. Un framework, c'est **décrire la pièce idéale** et laisser des déménageurs déplacer seulement ce qui a changé.

```html
<!-- Angular -->
@for (f of films(); track f.id) {
  <li [class.favori]="f.favori" [attr.data-id]="f.id">{{ f.titre }}</li>
}

<!-- Vue -->
<li v-for="f in films" :key="f.id" :class="{ favori: f.favori }" :data-id="f.id">
  {{ f.titre }}
</li>
```

Tu décris le résultat, le framework fait les `classList` et `append` pour toi.

## Pièges

- **`innerHTML` avec des données** = faille XSS : un titre contenant `<script>` serait exécuté. Utilise `textContent`.
- **`innerHTML +=` dans une boucle** : lent, et les écouteurs d'événements déjà posés sont perdus.
- **Changer dix propriétés `style`** une à une : crée une classe CSS et bascule-la.
- **Modifier le DOM d'un composant Angular / Vue à la main** : le framework peut écraser tes changements au prochain affichage.

## Exercices

### Exercice 1 · Afficher une liste

Avec un `<ul id="list">` vide dans la page, écris la fonction `renderMovies(movies)` qui affiche un `<li>` par film au format `Dune (2021)`, sans utiliser `innerHTML`.

> [!success]- Solution
> ```js
> function renderMovies(movies) {
>   const list = document.querySelector('#list');
>   list.replaceChildren();                      // vide la liste
>   for (const m of movies) {
>     const li = document.createElement('li');
>     li.textContent = `${m.title} (${m.year})`;
>     list.append(li);
>   }
> }
> ```
>
> `textContent` affiche le texte tel quel : un titre contenant du HTML ne sera pas interprété.

### Exercice 2 · Le danger d'`innerHTML`

Pourquoi ce code est-il dangereux si `review.text` vient d'un utilisateur ? Corrige-le.

```js
card.innerHTML = `<p>${review.text}</p>`;
```

> [!success]- Solution
> Si un utilisateur écrit `<img src=x onerror="alert(document.cookie)">`, le navigateur **exécute** ce code chez tous les visiteurs : c'est une faille **XSS**.
>
> ```js
> const p = document.createElement('p');
> p.textContent = review.text;   // affiché comme du texte, jamais exécuté
> card.append(p);
> ```
>
> Angular et Vue échappent automatiquement le texte dans les templates (`{{ }}`).
