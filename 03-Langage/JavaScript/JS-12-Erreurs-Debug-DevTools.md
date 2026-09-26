---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M02
tags:
  - frontend/javascript/debug
aliases:
  - "Gestion des Erreurs et DevTools"
parent: "[[JavaScript]]"
related_theory:
  - "[[METH-05-Resolution-Problemes-Debug|Résolution de Problèmes et Débogage]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://developer.chrome.com/docs/devtools"
---

# Gestion des Erreurs et DevTools

> [!abstract] En bref
> Deux compétences qui font gagner des heures : **gérer les erreurs** proprement dans ton code, et **enquêter** avec les outils du navigateur (F12) au lieu de deviner.

## Lever et attraper une erreur

```ts
function trouverFilm(id: number) {
  const film = films.find(f => f.id === id);
  if (!film) throw new Error(`Film ${id} introuvable`);   // on signale le problème
  return film;
}

try {
  const film = trouverFilm(99);
} catch (erreur) {
  console.error(erreur);          // on le traite
} finally {
  chargement = false;             // exécuté dans tous les cas
}
```

**Règle :** n'attrape que ce que tu sais traiter. Le reste, laisse-le remonter : une erreur cachée est pire qu'une erreur visible.

### Tes propres erreurs

```ts
class ErreurApi extends Error {
  constructor(message: string, public status: number) {
    super(message);
    this.name = 'ErreurApi';
  }
}

try {
  await chargerProfil();
} catch (e) {
  if (e instanceof ErreurApi && e.status === 401) redirigerVersConnexion();
  else throw e;   // pas pour moi → je relance
}
```

## Lire un message d'erreur

```
TypeError: Cannot read properties of undefined (reading 'titre')
    at FilmCardComponent.afficher (film-card.component.ts:14:22)
    at …
```

1. **Le type** (`TypeError`) et **le message** : ici, tu as lu `.titre` sur quelque chose de vide.
2. **La pile d'appels** (stack trace) : descends jusqu'à la première ligne qui vient de **ton** fichier (`film-card.component.ts:14`). C'est là qu'il faut regarder.

| Erreur | Veut souvent dire |
|---|---|
| `TypeError: … of undefined` | la donnée n'est pas encore arrivée, ou le nom du champ est faux |
| `ReferenceError: x is not defined` | faute de frappe, ou oubli d'import |
| `SyntaxError` | parenthèse ou accolade manquante, JSON mal formé |

## Les DevTools (F12)

| Onglet | Tu t'en sers pour |
|---|---|
| **Console** | voir les erreurs, tester une ligne de code |
| **Elements** | voir le HTML réel et modifier le CSS en direct |
| **Network** (Réseau) | voir chaque appel API : URL, statut, données envoyées et reçues |
| **Sources** | mettre le code **en pause** sur une ligne (point d'arrêt) et avancer pas à pas |
| **Application** | voir le localStorage et les cookies |
| **Lighthouse** | mesurer performance et accessibilité |

Ajoute les extensions **Angular DevTools** et **Vue DevTools** : elles montrent tes composants et leur état.

### Le point d'arrêt

Au lieu de mettre des `console.log` partout : dans **Sources**, clique sur un numéro de ligne (ou écris `debugger;` dans ton code). L'exécution s'arrête là, et tu vois la valeur de toutes les variables à cet instant.

## La méthode d'enquête

1. **Lire** le message et la pile d'appels.
2. **Reproduire** le bug à coup sûr.
3. Problème de **données** ? → onglet Network.
4. Problème de **logique** ? → point d'arrêt.
5. Une hypothèse à la fois, vérifiée avant de passer à la suivante.

Voir aussi [[METH-05-Resolution-Problemes-Debug|Résolution de problèmes]].

## Pièges

- **`catch (e) {}` vide** : l'erreur disparaît, le bug devient introuvable.
- **`throw 'erreur'`** (un texte) : pas de pile d'appels. Lance toujours `new Error(…)`.
- **Des `console.log` oubliés** en production.
