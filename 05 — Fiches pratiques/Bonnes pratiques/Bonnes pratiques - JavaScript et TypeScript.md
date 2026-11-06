---
type: bonnes-pratiques
sujet: "JavaScript et TypeScript"
concepts:
  - "[[JavaScript]]"
  - "[[TypeScript]]"
  - "[[Variables et types en JavaScript]]"
  - "[[async et await]]"
  - "[[Appeler une API avec fetch]]"
  - "[[Validation des données]]"
tags:
  - bonnes-pratiques
---
# Bonnes pratiques - JavaScript et TypeScript

> [!info] À quoi sert cette fiche
> Écrire du JavaScript moderne et du TypeScript qui évitent les pièges historiques du langage.
> Chaque règle dit **pourquoi** : c'est la raison qui compte, pour savoir l'adapter quand la situation change.

## À faire

### 1. const par défaut, let si besoin, jamais var
Moins de réaffectations accidentelles, portée claire. Voir [[Variables et types en JavaScript]].

### 2. Toujours === et !==
Pas de conversion cachée (`"0" == 0` est vrai).

### 3. async et await avec try / catch
Plus lisible que les chaînes de `.then`, et les erreurs sont traitées. Voir [[async et await]].

```ts
async function charger() {
  try {
    const rep = await fetch("/api/taches");
    if (!rep.ok) throw new Error(`Erreur ${rep.status}`);
    return await rep.json();
  } catch (e) {
    console.error(e);
    return [];
  }
}
```

### 4. Vérifier rep.ok après fetch
`fetch` ne lève pas d'erreur pour un 404 ou un 500. Voir [[Appeler une API avec fetch]].

### 5. Ne pas modifier les données, en créer de nouvelles
`map`, `filter`, l'étalement `{ ...objet }` : moins d'effets de bord, indispensable en React.

```ts
const terminees = taches.map((t) => (t.id === id ? { ...t, fini: true } : t));
```

### 6. TypeScript en mode strict
`"strict": true` dans `tsconfig.json`, et `unknown` plutôt que `any` pour les données inconnues. Voir [[Compilation TypeScript (tsc et tsconfig)]].

### 7. Typer les frontières
Décris avec une `interface` les données qui entrent et sortent (réponses d'API, props) ; laisse l'inférence faire le reste.

### 8. Utiliser ?. et ??
Pour les valeurs possiblement absentes, sans planter et sans confondre 0 avec « vide ».

```ts
const nom = tache?.projet?.nom ?? "sans projet";
```

### 9. Un module par responsabilité, avec des imports explicites
Voir [[Module JavaScript (import et export)]].

## À éviter

### 1. `any` pour faire taire le compilateur
**Pourquoi c'est un problème :** on perd toute la vérification, les bugs reviennent à l'exécution.
**À la place :** le bon type, ou `unknown` puis une vérification.

### 2. Oublier `await`
**Pourquoi c'est un problème :** on manipule une Promesse au lieu de la valeur (`[object Promise]`).
**À la place :** `await` partout où une fonction renvoie une Promesse ; le lint `no-floating-promises` aide.

### 3. `await` dans un `forEach`
**Pourquoi c'est un problème :** `forEach` n'attend pas : les appels partent sans contrôle.
**À la place :** `for … of` (en série) ou `Promise.all` (en parallèle).

### 4. `innerHTML` avec des données d'utilisateur
**Pourquoi c'est un problème :** faille XSS.
**À la place :** `textContent`, ou laisser React, Vue ou Angular afficher.

### 5. `sort()` sans fonction sur des nombres
**Pourquoi c'est un problème :** tri alphabétique : `[10, 9, 1]` devient `[1, 10, 9]`.
**À la place :** `sort((a, b) => a - b)`.

### 6. Croire que TypeScript vérifie les données à l'exécution
**Pourquoi c'est un problème :** une API peut renvoyer n'importe quoi malgré le type annoncé.
**À la place :** valider avec un schéma (Zod) les données qui viennent de l'extérieur.

## Avant de valider mon travail
- [ ] ESLint et Prettier ne signalent rien
- [ ] `tsc --noEmit` passe
- [ ] Aucun `any` non justifié
- [ ] Chaque `fetch` vérifie `rep.ok`
- [ ] Les tests passent

## Notions liées
[[JavaScript]] · [[TypeScript]] · [[Variables et types en JavaScript]] · [[async et await]] · [[Appeler une API avec fetch]] · [[Validation des données]]
