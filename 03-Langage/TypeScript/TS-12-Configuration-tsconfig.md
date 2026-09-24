---
created: 2026-09-14
modified: 2026-09-14
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M03
aliases:
  - "Configuration (tsconfig.json)"
tags:
  - frontend/typescript/configuration
parent: "[[TypeScript]]"
children: []
related_theory:
  - "[[TS-01-Fondamentaux|Fondamentaux TypeScript]]"
related_snippets:
  - "[[04_Snippets/tsconfig-exemple]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://www.typescriptlang.org/tsconfig"
---

# Configuration (tsconfig.json)

> [!abstract] Introduction
> Le fichier `tsconfig.json` contient les règles que le compilateur TypeScript doit suivre pour vérifier et transformer le code d'un projet — quelle version de JavaScript viser, quelle rigueur appliquer, quels fichiers inclure.

---

## Théorie

> [!question]- C'est quoi ?
> > [!note] C'est quoi un fichier de configuration ?
> > Un fichier de configuration est un fichier texte (souvent au format JSON) qui contient des réglages pour un outil, plutôt que du code exécutable. `tsconfig.json` dit au compilateur TypeScript "voici comment tu dois te comporter sur CE projet précis".
>
> Ce fichier se trouve à la racine d'un projet TypeScript (Angular en génère un automatiquement à la création du projet).

> [!question]- Pourquoi l'utiliser ?
> Sans configuration, TypeScript devrait deviner tout seul comment se comporter, ou utiliser des réglages par défaut qui ne conviennent pas forcément à tous les projets. `tsconfig.json` permet d'adapter la rigueur du typage, la version de JavaScript ciblée, et bien d'autres comportements, à chaque projet spécifique.

> [!question]- Comment ça marche ?
> ```json
> {
>   "compilerOptions": {
>     "target": "ES2022",
>     "strict": true,
>     "module": "ESNext",
>     "outDir": "./dist",
>     "esModuleInterop": true
>   },
>   "include": ["src/**/*.ts"]
> }
> ```
>
> > [!note] Les options les plus importantes à connaître
> > - `target` : à quelle version de JavaScript le code TypeScript doit être converti (ex : `ES2022` = JavaScript moderne compatible avec les navigateurs récents)
> > - `strict` : active TOUTES les vérifications de type les plus rigoureuses d'un coup (fortement recommandé)
> > - `outDir` : dans quel dossier mettre les fichiers JavaScript générés après compilation
> > - `include` : quels fichiers du projet doivent être pris en compte par TypeScript
>
> **Le mode `strict` en détail :**
>
> > [!note] Ce que fait concrètement `strict: true`
> > Ça active plusieurs vérifications strictes en même temps, notamment :
> > - `strictNullChecks` : empêche d'utiliser une valeur qui pourrait être `null` ou `undefined` sans l'avoir vérifiée avant
> > - `noImplicitAny` : interdit qu'une variable ait le type `any` "par accident", sans qu'on l'ait explicitement choisi
>
> Sans `strict`, TypeScript est beaucoup plus permissif et laisse passer des erreurs potentielles qu'il aurait pu détecter.

> [!question]- Quand l'utiliser ?
> - Toujours activer `strict: true` sur un nouveau projet — c'est la configuration recommandée par l'équipe TypeScript elle-même
> - Sur un projet Angular, le CLI génère déjà un `tsconfig.json` adapté (souvent en mode strict) — pas besoin de tout configurer à la main

---

## Points clés

- `tsconfig.json` définit les règles de compilation pour tout le projet
- `strict: true` active les vérifications les plus rigoureuses — recommandé, surtout pour un nouveau projet
- `target` détermine la version de JavaScript générée à la fin
- Angular gère déjà un `tsconfig.json` de base à la création du projet — il est rare d'avoir besoin de tout configurer manuellement en partant de zéro

---

## Paramètres / Configuration

| Option | Description | Notes |
|-----------|-------------|-------|
| `target` | Version JavaScript ciblée | Ex : `ES2022` |
| `strict` | Active toutes les vérifications strictes | Fortement recommandé : `true` |
| `module` | Système de modules utilisé | Ex : `ESNext` pour Angular moderne |
| `outDir` | Dossier de sortie des fichiers compilés | Ex : `./dist` |
| `include` / `exclude` | Fichiers à inclure/exclure de la compilation | — |

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Désactiver `strict` sur un nouveau projet
> - Oublier `skipLibCheck` et subir les erreurs des types de dépendances
> - Modifier `target`/`lib` sans vérifier la compatibilité navigateurs

---

## Exemple minimal

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "module": "ESNext",
    "outDir": "./dist"
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}
```

> [!note] Ce que j'en retiens
> `strict: true` combiné à `noImplicitAny` et `strictNullChecks` force à écrire du code TypeScript rigoureux dès le départ — ça peut sembler contraignant au début, mais ça évite énormément de bugs plus tard.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Options utiles en plus de `strict` : `noUncheckedIndexedAccess`, `noImplicitOverride`, `exactOptionalPropertyTypes`, `verbatimModuleSyntax`
> - Angular ajoute `angularCompilerOptions` (`strictTemplates` : vérification de types dans les templates)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[TypeScript]]
- Sous-sujets → (aucun sous-thème identifié pour l'instant)
- À comparer avec → [[ANG-17-Deploiement-Build|Déploiement et Build Angular]]

**Pratique :**
- Extrait de code → [[04_Snippets/tsconfig-exemple]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Que active exactement `strict: true` ?

---

## Tâches

- [ ] #task Ouvrir et lire ligne par ligne le `tsconfig.json` généré automatiquement par Angular CLI pour CinéTrack
- [ ] #task Vérifier que `strict: true` est bien activé sur le projet
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Quelles options `tsconfig` spécifiques Angular ajoute-t-il par rapport à un projet TypeScript "pur" ?
