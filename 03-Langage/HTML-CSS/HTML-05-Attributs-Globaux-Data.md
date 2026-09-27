---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - frontend/html/attributs
aliases:
  - "Attributs HTML et data"
parent: "[[HTML-CSS]]"
related_theory:
  - "[[HTML-04-Aide-Memoire-Balises|Aide-mémoire des Balises HTML]]"
  - "[[JS-14-Selectionner-Elements-DOM|Sélectionner des Éléments du DOM]]"
related_projects: []
source: "https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes"
---

# Attributs HTML et data

> [!abstract] En bref
> Les **attributs** sont les réglages d'une balise : `<button type="submit" disabled>`. Certains existent sur toutes les balises (`id`, `class`, `data-*`, `hidden`, `aria-*`) et servent à la fois au style, au JavaScript, aux tests et à l'accessibilité.

## Les attributs à connaître

| Attribut | Rôle | Exemple |
|---|---|---|
| `id` | identifiant **unique** dans la page | `id="recherche"` (relie un `label for`) |
| `class` | groupe(s) pour le style | `class="carte favori"` |
| `data-*` | tes propres données, pour le JavaScript | `data-film-id="42"` |
| `hidden` | cache l'élément | `<p hidden>` |
| `disabled` | désactive un champ ou un bouton | `<button disabled>` |
| `tabindex` | focus au clavier | `0` = focusable, `-1` = seulement par code |
| `aria-*`, `role` | informations pour les lecteurs d'écran | `aria-label="Fermer"` |
| `title` | info-bulle au survol | peu accessible, à éviter pour une info importante |

## `data-*` : attacher une donnée à un élément

```html
<button type="button" data-film-id="42">★ Favori</button>
```

```ts
bouton.dataset.filmId;           // '42' (toujours du texte)
Number(bouton.dataset.filmId);   // 42
```

`data-film-id` en HTML devient `dataset.filmId` en JavaScript (tirets → majuscules).

Usage fréquent : **`data-testid`** pour retrouver un élément dans les tests sans dépendre des classes CSS.

## Attribut ou propriété ?

- L'**attribut** est écrit dans le HTML : c'est la valeur **de départ**.
- La **propriété** est sur l'objet JavaScript : c'est la valeur **actuelle**.

```ts
input.getAttribute('value');   // ce qui était écrit dans le HTML
input.value;                   // ce que l'utilisateur a tapé
```

C'est pour ça qu'Angular a deux écritures : `[value]="x"` (propriété) et `[attr.data-id]="x"` (attribut).

## Les attributs « booléens »

Pour `disabled`, `hidden`, `required`, `checked`, **la présence suffit** :

```html
<button disabled>              <!-- désactivé -->
<button disabled="false">      <!-- désactivé aussi ! -->
<button>                       <!-- actif -->
```

Dans un framework : `[disabled]="envoiEnCours"` (Angular) ou `:disabled="envoiEnCours"` (Vue) ajoute ou retire l'attribut selon la valeur.

## Pièges

- **Un `id` en dur dans un composant répété** (une carte affichée 10 fois) : 10 éléments avec le même id. Utilise des classes, ou génère un id unique.
- **Styler avec un `id`** : trop « fort » en CSS, difficile à surcharger. Utilise des classes.

## Exercices

### Exercice 1 · Stocker l'id dans le HTML

Ajoute l'id TMDB au bouton, puis écris le JavaScript qui le lit au clic.

```html
<button class="favorite">♥</button>
```

> [!success]- Solution
> ```html
> <button class="favorite" data-movie-id="438631" aria-label="Ajouter aux favoris">♥</button>
> ```
>
> ```js
> document.querySelector('.favorite').addEventListener('click', (e) => {
>   const id = Number(e.currentTarget.dataset.movieId);   // data-movie-id → dataset.movieId
>   console.log(id);   // 438631
> });
> ```
>
> `dataset` renvoie toujours du texte : on convertit avec `Number`.

### Exercice 2 · Attribut booléen

Pourquoi ce bouton reste-t-il désactivé ? Comment l'activer correctement en HTML et en JavaScript ?

```html
<button disabled="false">Envoyer</button>
```

> [!success]- Solution
> Pour un attribut booléen, c'est la **présence** qui compte, pas la valeur : `disabled="false"` est désactivé.
>
> ```html
> <button>Envoyer</button>              <!-- activé -->
> <button disabled>Envoyer</button>     <!-- désactivé -->
> ```
>
> ```js
> button.disabled = false;   // propriété JavaScript : ici la valeur compte
> ```
