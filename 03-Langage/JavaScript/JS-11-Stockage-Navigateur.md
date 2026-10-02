---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M02
tags:
  - frontend/javascript/stockage
aliases:
  - "Stockage Navigateur"
parent: "[[JavaScript]]"
related_theory:
  - "[[SEC-03-Authentification-Sessions-JWT|Authentification Sessions vs JWT]]"
  - "[[NET-06-Cookies-Cache-HTTP|Cookies et Cache HTTP]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://developer.mozilla.org/fr/docs/Web/API/Web_Storage_API"
---

# Stockage Navigateur

> [!abstract] En bref
> Le navigateur peut garder des données entre deux visites : le thème choisi, un brouillon, une session de connexion. Il existe plusieurs « tiroirs », chacun avec ses règles. Le bon choix évite des bugs et des failles de sécurité.

## Les tiroirs disponibles

| Tiroir | Taille | Durée de vie | Envoyé au serveur ? | Pour quoi |
|---|---|---|---|---|
| `localStorage` | ~5 Mo | pour toujours (jusqu'à suppression) | non | préférences : thème, langue, brouillon |
| `sessionStorage` | ~5 Mo | tant que l'onglet est ouvert | non | état temporaire d'un onglet |
| **Cookie** | ~4 Ko | au choix | **oui, à chaque requête** | session de connexion |
| IndexedDB | grande | pour toujours | non | beaucoup de données hors ligne (rare) |

Image : le **cookie** est un badge que tu montres à chaque entrée du bâtiment. Le **localStorage** est ton casier dans le hall : personne ne le voit passer, mais n'importe quel script de la page peut l'ouvrir.

## localStorage en pratique

Il ne stocke **que du texte**. Pour un objet, on passe par JSON :

```ts
localStorage.setItem('theme', 'sombre');
const theme = localStorage.getItem('theme') ?? 'clair';   // null si absent

localStorage.setItem('favoris', JSON.stringify([12, 42]));
const favoris: number[] = JSON.parse(localStorage.getItem('favoris') ?? '[]');

localStorage.removeItem('theme');
```

Une fonction sûre, à réutiliser :

```ts
export function lire<T>(cle: string, defaut: T): T {
  try {
    const brut = localStorage.getItem(cle);
    return brut ? (JSON.parse(brut) as T) : defaut;
  } catch {
    return defaut;   // contenu abîmé ou stockage indisponible
  }
}
```

Dans le Portfolio, VueUse fait tout ça pour toi : `const theme = useLocalStorage('theme', 'sombre')`.

## Et pour la connexion ?

Le plus sûr est un **cookie posé par le serveur** avec ces options :

```http
Set-Cookie: session=abc123; HttpOnly; Secure; SameSite=Lax
```

| Option | Protège de |
|---|---|
| `HttpOnly` | JavaScript ne peut pas le lire → un script malveillant ne peut pas le voler |
| `Secure` | envoyé seulement en HTTPS |
| `SameSite=Lax` | pas envoyé depuis un autre site (protège d'une attaque CSRF) |

Voir [[SEC-03-Authentification-Sessions-JWT|Authentification, sessions et JWT]].

## Pourquoi ça marche

Le **cookie** existe pour que le **serveur** reconnaisse le navigateur : le navigateur le renvoie tout seul à chaque requête. Avec `HttpOnly`, aucun script de la page ne peut le lire, donc une faille XSS ne peut pas le voler.

Le **localStorage** est fait pour le **front** : il n'est jamais envoyé au serveur, mais **tout script** de la page peut le lire. Il ne stocke que du texte, parce que sa conception d'origine est simple : une clé texte, une valeur texte. D'où le passage par JSON pour les objets.

## Contre-exemple

**Intuition fausse : « localStorage stocke mes objets tels quels ».**

```js
localStorage.setItem('user', { name: 'Awa' });
localStorage.getItem('user');   // "[object Object]"
```

L'objet est converti en texte n'importe comment : les données sont perdues. Il faut `JSON.stringify` à l'écriture et `JSON.parse` à la lecture.

## Pièges

- **Mettre un jeton de connexion dans `localStorage`** : si ton site a une faille XSS, un script peut le lire et le voler.
- **`JSON.parse` sur un contenu abîmé** plante : garde le `try/catch`.
- **`localStorage` n'existe pas côté serveur** (Angular SSR, Nuxt) : ne l'utilise que dans le navigateur.
- **L'utilisateur peut tout effacer** : prévois toujours une valeur par défaut.

## Vérifie sans tes notes

Réponds de tête, à voix haute ou par écrit, **avant** d’ouvrir la réponse.

**1. Quelle différence entre `localStorage` et `sessionStorage` ?**

> [!check]- Réponse
> `localStorage` garde les données pour toujours ; `sessionStorage` seulement tant que l'onglet est ouvert.

**2. Pourquoi éviter de mettre un jeton de connexion dans `localStorage` ?**

> [!check]- Réponse
> Tout script de la page peut le lire : une faille XSS suffit à le voler.

**3. Que protège l'option `HttpOnly` d'un cookie ?**

> [!check]- Réponse
> Elle empêche JavaScript de lire le cookie.

## Exercices

> [!info] Comment t’entraîner
> 1. Cherche seul, sans regarder la note.
> 2. Bloqué ? Ouvre l’**indice 1**, puis l’**indice 2**.
> 3. Seulement ensuite, la **solution**.
> 4. Referme tout et **refais l’exercice sans regarder**.

### Exercice 1 · Se souvenir du thème

Écris le code qui enregistre le thème choisi (`'dark'` ou `'light'`) dans le navigateur, et le relit au chargement de la page (thème clair par défaut).

> [!tip]- Indice 1
> Deux opérations : `setItem` pour écrire, `getItem` pour lire.

> [!tip]- Indice 2
> `getItem` renvoie `null` si la clé n'existe pas : quel opérateur donne une valeur par défaut ?

> [!success]- Solution
> ```js
> function saveTheme(theme) {
>   localStorage.setItem('theme', theme);
> }
>
> function loadTheme() {
>   return localStorage.getItem('theme') ?? 'light';
> }
>
> document.documentElement.dataset.theme = loadTheme();
> ```

### Exercice 2 · Stocker une liste

On veut garder la liste des ids de films récemment vus. Pourquoi ce code ne marche pas ? Corrige-le.

```js
localStorage.setItem('recent', [438631, 348]);
const recent = localStorage.getItem('recent');
recent.includes(348);
```

> [!tip]- Indice 1
> Que stocke `localStorage` : des objets, ou seulement du texte ?

> [!tip]- Indice 2
> Quel couple de fonctions convertit un tableau en texte et inversement ?

> [!success]- Solution
> `localStorage` ne stocke que du **texte** : le tableau devient `"438631,348"`, et `includes(348)` cherche dans une chaîne.
>
> ```js
> localStorage.setItem('recent', JSON.stringify([438631, 348]));
> const recent = JSON.parse(localStorage.getItem('recent') ?? '[]');
> recent.includes(348);   // true
> ```

### Transfert · Le brouillon de critique

Un problème différent : il vérifie que tu as compris le principe, pas seulement l’exemple.

Un utilisateur écrit une critique dans un `<textarea id="review">`. Sauvegarde le texte dans le navigateur à chaque frappe, et remets-le dans le champ au chargement de la page. Une fois la critique envoyée, efface le brouillon.

> [!tip]- Indice 1
> Quel événement se déclenche à chaque frappe dans un champ ?

> [!tip]- Indice 2
> `input` pour sauvegarder, `getItem` au chargement, `removeItem` après l'envoi.

> [!success]- Solution
> ```js
> const textarea = document.querySelector('#review');
>
> textarea.value = localStorage.getItem('review-draft') ?? '';
>
> textarea.addEventListener('input', () => {
>   localStorage.setItem('review-draft', textarea.value);
> });
>
> function onReviewSent() {
>   localStorage.removeItem('review-draft');
> }
> ```

## Je maîtrise quand…

Coche quand tu sais le faire **sans aide**. Une notion n’est maîtrisée que si les 6 cases sont cochées (voir [[Methode-du-coach|Méthode du coach]]).

- [ ] **Expliquer** : Expliquer la différence entre cookie et localStorage avec l'image du badge et du casier
- [ ] **Rappeler** : Dire de mémoire quel stockage choisir pour un thème, un brouillon, une session
- [ ] **Utiliser** : Écrire la lecture et l'écriture d'un objet dans `localStorage` sans modèle
- [ ] **Résoudre un problème nouveau** : Prédire ce qui se passe si on stocke un objet sans JSON
- [ ] **Repérer les erreurs** : Repérer un jeton de connexion mal stocké
- [ ] **Savoir quand ne pas l’utiliser** : Savoir quand ne pas utiliser localStorage : côté serveur (SSR) et pour des données sensibles
