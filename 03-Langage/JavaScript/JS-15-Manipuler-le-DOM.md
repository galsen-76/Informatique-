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

## Pourquoi ça marche

Chaque modification du DOM peut obliger le navigateur à **recalculer la mise en page** puis à redessiner. Préparer les éléments d'abord, puis les insérer **en une fois** (`replaceChildren(...elements)`), limite ce travail.

`textContent` insère du **texte** : le navigateur ne l'interprète jamais comme du HTML. `innerHTML`, lui, **analyse** le texte comme du HTML, et peut donc exécuter du code caché dedans. D'où la règle : `textContent` pour toute donnée.

## Contre-exemple

**Intuition fausse : « `innerHTML +=` ajoute simplement du contenu à la fin ».**

```js
button.addEventListener('click', like);
list.innerHTML += '<li>Nouveau film</li>';
// le bouton (qui était dans list) ne réagit plus au clic !
```

`+=` relit **tout** le HTML, le **détruit** puis le **recrée** : les écouteurs posés sur les anciens éléments disparaissent. Utilise `append`.

## Pièges

- **`innerHTML` avec des données** = faille XSS : un titre contenant `<script>` serait exécuté. Utilise `textContent`.
- **`innerHTML +=` dans une boucle** : lent, et les écouteurs d'événements déjà posés sont perdus.
- **Changer dix propriétés `style`** une à une : crée une classe CSS et bascule-la.
- **Modifier le DOM d'un composant Angular / Vue à la main** : le framework peut écraser tes changements au prochain affichage.

## Vérifie sans tes notes

Réponds de tête, à voix haute ou par écrit, **avant** d’ouvrir la réponse.

**1. Pourquoi préférer `textContent` à `innerHTML` pour afficher une donnée ?**

> [!check]- Réponse
> `textContent` affiche le texte tel quel ; `innerHTML` l'interprète comme du HTML, ce qui ouvre une faille XSS.

**2. Comment ajouter une classe seulement si une condition est vraie ?**

> [!check]- Réponse
> `el.classList.toggle('classe', condition)`.

**3. Que fait un framework à ta place ?**

> [!check]- Réponse
> Tu décris le résultat (le template) ; il fait les créations, classes et insertions dans le DOM, seulement là où ça change.

## Exercices

> [!info] Comment t’entraîner
> 1. Cherche seul, sans regarder la note.
> 2. Bloqué ? Ouvre l’**indice 1**, puis l’**indice 2**.
> 3. Seulement ensuite, la **solution**.
> 4. Referme tout et **refais l’exercice sans regarder**.

### Exercice 1 · Afficher une liste

Avec un `<ul id="list">` vide dans la page, écris la fonction `renderMovies(movies)` qui affiche un `<li>` par film au format `Dune (2021)`, sans utiliser `innerHTML`.

> [!tip]- Indice 1
> Vide d'abord la liste, puis crée un `<li>` par film avec `createElement`.

> [!tip]- Indice 2
> Le texte va dans `textContent`, et l'élément s'ajoute avec `append`.

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

> [!tip]- Indice 1
> Un utilisateur peut écrire du HTML dans sa critique. Que fait `innerHTML` de ce HTML ?

> [!tip]- Indice 2
> Crée l'élément, mets le texte avec la propriété qui n'interprète rien, puis ajoute-le.

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

### Transfert · Le bouton favori

Un problème différent : il vérifie que tu as compris le principe, pas seulement l’exemple.

Une carte `<article class="card" data-id="42">` contient `<button class="fav" aria-pressed="false">♡</button>`. Au clic, le bouton bascule entre favori et non favori : la carte gagne ou perd la classe `favorite`, le bouton affiche ♥ ou ♡, et `aria-pressed` passe à `"true"` ou `"false"`.

> [!tip]- Indice 1
> Commence par calculer le nouvel état : la carte a-t-elle déjà la classe `favorite` ?

> [!tip]- Indice 2
> `classList.toggle` renvoie le nouvel état (`true` si la classe vient d'être ajoutée).

> [!success]- Solution
> ```js
> document.querySelectorAll('.card .fav').forEach((button) => {
>   button.addEventListener('click', () => {
>     const card = button.closest('.card');
>     const isFavorite = card.classList.toggle('favorite');
>     button.textContent = isFavorite ? '♥' : '♡';
>     button.setAttribute('aria-pressed', String(isFavorite));
>   });
> });
> ```

## Je maîtrise quand…

Coche quand tu sais le faire **sans aide**. Une notion n’est maîtrisée que si les 6 cases sont cochées (voir [[Methode-du-coach|Méthode du coach]]).

- [ ] **Expliquer** : Expliquer pourquoi `innerHTML` est dangereux et coûteux
- [ ] **Rappeler** : Dire de mémoire les méthodes pour créer, ajouter, supprimer un élément et changer une classe
- [ ] **Utiliser** : Écrire l'affichage d'une liste sans modèle et sans `innerHTML`
- [ ] **Résoudre un problème nouveau** : Prédire ce que `innerHTML +=` fait aux écouteurs existants
- [ ] **Repérer les erreurs** : Traduire une manipulation du DOM en template Angular ou Vue
- [ ] **Savoir quand ne pas l’utiliser** : Savoir quand ne pas manipuler le DOM à la main : dans un composant de framework
