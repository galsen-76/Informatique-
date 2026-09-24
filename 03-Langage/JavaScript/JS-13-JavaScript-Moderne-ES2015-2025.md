---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M02
tags:
  - frontend/javascript/moderne
aliases:
  - "JavaScript Moderne ES2015+"
parent: "[[JavaScript]]"
children: []
related_theory:
  - "[[JS-05-Objets-Tableaux-Methodes|Objets et Tableaux JavaScript]]"
  - "[[JS-07-Promises-Async-Await|Promises et Async Await JavaScript]]"
related_snippets:
  - "[[04_Snippets/js-13-javascript-moderne-es2015-2025]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://github.com/tc39/proposals/blob/main/finished-proposals.md"
---

# JavaScript Moderne ES2015+

> [!abstract] Introduction
> Récapitulatif des fonctionnalités modernes de JavaScript (ES2015 → ES2025) que l'on croise quotidiennement dans du code Angular, Vue et Node.

> [!warning]- Prérequis
> [[JS-01-Fondamentaux|Fondamentaux JavaScript]]

---

## Théorie

> [!question]- C'est quoi ?
> | Version | Nouveautés clés |
> |---|---|
> | ES2015 (ES6) | `let/const`, fléchées, classes, modules, Promises, template literals, déstructuration, `Map/Set` |
> | ES2017 | `async/await`, `Object.entries/values` |
> | ES2018 | spread/rest d'objets, `Promise.finally` |
> | ES2020 | `?.`, `??`, `BigInt`, `Promise.allSettled`, `import()` |
> | ES2021 | `??=`, `||=`, `replaceAll`, séparateurs numériques `1_000_000` |
> | ES2022 | champs privés `#x`, `at()`, top-level `await`, `Object.hasOwn`, `Error.cause` |
> | ES2023 | `toSorted`, `toReversed`, `with`, `findLast` |
> | ES2024 | `Object.groupBy`, `Promise.withResolvers` |
> | ES2025 | méthodes de `Set` (union, intersection…), helpers d'itérateurs |

> [!example]- Analogie
> Comme une langue vivante : de nouveaux mots arrivent chaque année ; les connaître permet de lire le code des autres et d'écrire plus court.

> [!question]- Pourquoi l'utiliser ?
> Le code d'entreprise mélange des styles de différentes époques ; reconnaître chaque syntaxe évite de réinventer ce qui existe.

> [!question]- Comment ça marche ?
> Le build (TypeScript/esbuild/Vite) « transpile » vers la cible configurée (`target`) : on peut écrire du JS récent même si certains navigateurs sont plus anciens (à condition d'avoir les polyfills pour les nouvelles API).

> [!question]- Quand l'utiliser ?
> Utiliser par défaut les syntaxes modernes quand la cible du projet les supporte (vérifier `browserslist` / `target`).

> [!danger]- Quand NE PAS l'utiliser / Limites
> Les nouvelles MÉTHODES (`Object.groupBy`, `toSorted`) ne sont pas transpilées : si la cible est ancienne, il faut un polyfill ou `lib` adaptée dans tsconfig.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| TC39 | Comité qui fait évoluer JavaScript |
| Transpiler | Convertir une syntaxe récente vers une plus ancienne |
| Polyfill | Code qui ajoute une API manquante |
| browserslist | Liste des navigateurs cibles du projet |

---

## Points clés

- La syntaxe est transpilée, les API nécessitent des polyfills
- `?.` et `??` réduisent énormément le code défensif
- Méthodes immuables récentes idéales pour les frameworks réactifs

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Utiliser une API récente non supportée par le navigateur cible du client
> - Confondre `#champ` (privé réel à l'exécution) et `private` (TypeScript, compilation seulement)

---

## Exemple minimal

```javascript
const config = { retry: 0 };
config.retry ??= 3;                 // reste 0 (pas nullish)
const ville = user?.adresse?.ville ?? "Inconnue";
const budget = 1_500_000;
const derniers = films.at(-1);
const { promise, resolve } = Promise.withResolvers();
```

> [!note] Ce que j'en retiens
> Ces syntaxes rendent le code plus court ET plus sûr ; elles sont partout dans le code Angular/Vue récent.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Suivre les propositions TC39 à venir (Temporal pour les dates, decorators standard)
> - Configurer `browserslist` et savoir mesurer l'impact des polyfills sur le bundle

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[JavaScript]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/js-13-javascript-moderne-es2015-2025]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Quelle différence entre `x ||= 3` et `x ??= 3` ?

---

## Tâches

- [ ] #task Réécrire un vieux fichier JS en utilisant 5 syntaxes modernes
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
