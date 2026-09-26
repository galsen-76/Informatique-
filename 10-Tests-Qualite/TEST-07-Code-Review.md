---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M10
tags:
  - tests/code-review
aliases:
  - "Code Review"
parent: "[[Tests et Qualité]]"
related_theory:
  - "[[02-Merge-Requests|Merge Requests]]"
  - "[[ARCH-10-Clean-Code|Clean Code]]"
related_projects: []
source: "https://google.github.io/eng-practices/review/"
---

# Code Review

> [!abstract] En bref
> La **revue de code**, c'est un collègue qui relit ta Merge Request avant qu'elle entre dans `main`. Elle attrape des bugs, partage les connaissances dans l'équipe et garde un code homogène. Savoir **relire** et savoir **recevoir** une revue sont deux compétences qu'on attend d'un développeur.

## Que regarder quand tu relis

Dans cet ordre, du plus important au moins important :

| Priorité | Question |
|---|---|
| 1. **Ça marche ?** | le code fait-il ce que demande le ticket ? Cas limites, erreurs gérées ? |
| 2. **Sécurité** | données validées ? droits vérifiés ? secret exposé ? |
| 3. **Conception** | le code est-il au bon endroit (service, composant, mapper) ? duplication ? |
| 4. **Tests** | la logique importante est-elle testée ? |
| 5. **Lisibilité** | noms clairs ? fonctions courtes ? |
| 6. **Détails** | le style (Prettier et ESLint s'en chargent : ne pas perdre de temps dessus) |

## Écrire un bon commentaire

| ❌ | ✅ |
|---|---|
| « C'est nul » | « Cette boucle fait une requête par critique (N+1). Un `include: { user: true }` éviterait 20 requêtes. » |
| « Renomme ça » | « Suggestion : `filteredMovies` plutôt que `data`, pour savoir ce que contient la variable. » |
| « Pourquoi ? » | « Question : pourquoi un `effect` ici plutôt qu'un `computed` ? Je me demande si j'ai raté quelque chose. » |

Des préfixes clarifient l'importance : **bloquant**, **suggestion**, **question**, **détail** (*nit*).

## Recevoir une revue

- Un commentaire porte sur le **code**, pas sur toi.
- **Réponds à chaque commentaire** : « corrigé dans le commit abc », ou pourquoi tu ne changes pas.
- Si tu n'es pas d'accord, **argumente**, puis accepte la décision de l'équipe.
- Remercie : chaque revue est une leçon gratuite.

## Faciliter la revue de tes MR

- **Petites MR**, un seul sujet (voir [[02-Merge-Requests|Merge Requests]]).
- **Relis-toi d'abord** dans l'interface de GitLab : tu trouveras tes `console.log` et oublis.
- **Description claire** : quoi, pourquoi, comment tester, captures.
- **Pipeline vert** avant de demander.

## Relire pour apprendre

En alternance comme en poste : **lis les MR des collègues plus expérimentés**, même si on ne te le demande pas. C'est l'une des façons les plus rapides de progresser.

## Pièges

- **Approuver sans lire** (« LGTM » en 30 secondes sur 800 lignes).
- **Bloquer une MR pour des questions de goût** : si ce n'est pas une règle de l'équipe, c'est une suggestion.
- **Des discussions interminables** en commentaires : passe à l'oral.
