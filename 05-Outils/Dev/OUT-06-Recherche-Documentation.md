---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - outils/apprendre
aliases:
  - "Chercher et Lire la Documentation"
parent: "[[Outils]]"
related_theory:
  - "[[METH-05-Resolution-Problemes-Debug|Résolution de Problèmes et Débogage]]"
related_projects: []
source: "https://developer.mozilla.org/fr/"
---

# Recherche et Documentation

> [!abstract] En bref
> Savoir **trouver une information fiable** fait progresser plus vite que tout le reste. L'ordre : la documentation officielle, puis le code source et les tickets de la librairie, puis les forums. L'IA aide énormément, mais elle se trompe parfois avec assurance : vérifie toujours dans la source officielle.

## Où chercher, dans l'ordre

| Source | Pour | Adresse |
|---|---|---|
| **Documentation officielle** | la référence, à jour | angular.dev, vuejs.org, docs.nestjs.com, prisma.io/docs |
| **MDN** | HTML, CSS, JavaScript, HTTP | developer.mozilla.org/fr |
| **Tickets GitHub** de la librairie | bugs connus, contournements | onglet *Issues* du dépôt |
| **Code source** | quand la doc ne dit pas tout | le dépôt, ou `node_modules/` |
| **Stack Overflow** | problèmes courants | vérifie la **date** et la version |
| **L'IA** | expliquer, proposer une piste | à vérifier dans la doc (voir [[IA-07-IA-Assistee-Dev\|IA au quotidien]]) |

## Vérifier la version

Beaucoup de réponses en ligne concernent une **ancienne version** :
- Angular : `*ngIf`, `@Input()`, NgModules, `angular.io` → ancien. `@if`, `input()`, standalone, `angular.dev` → actuel.
- Vue : `data()`, `methods` (Options API) → ancien style. `<script setup>` → actuel.

Vérifie ta version : `ng version`, `npm ls vue`, ou le `package.json`.

## Chercher efficacement

- **Copie le message d'erreur exact** entre guillemets, en retirant ce qui est propre à ton projet (chemins, noms).
- Ajoute la **techno et la version** : `"NG0201" angular 20`.
- Cherche en **anglais** : dix fois plus de résultats.
- Lis la réponse **et les commentaires** : ils signalent souvent qu'elle est dépassée.

## Lire une documentation

1. **Getting started / Tutorial** : pour démarrer.
2. **Guides** : comment faire une tâche (formulaires, routes, authentification).
3. **API reference** : la liste précise des options, à consulter quand tu sais déjà ce que tu cherches.

Pas besoin de tout lire : lis la partie dont ta tâche a besoin, c'est la méthode du vault ([[Methode-d-apprentissage|Méthode d'apprentissage]]).

## Demander de l'aide

Quand tu bloques plus de 30 à 60 minutes, demande, avec :
- **ce que tu veux faire** ;
- **ce qui se passe** (message d'erreur complet) ;
- **ce que tu as déjà essayé** ;
- un **exemple minimal** qui reproduit le problème.

Souvent, rédiger la question suffit à trouver la réponse.

## Pièges

- **Copier une réponse sans la comprendre** : le bug revient sous une autre forme.
- **Un tutoriel vidéo de 2019** pour un framework qui a beaucoup changé.
