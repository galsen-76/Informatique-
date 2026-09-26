---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M10
tags:
  - conception/estimation
aliases:
  - "Estimation et Planification"
parent: "[[Conception]]"
related_theory:
  - "[[METH-02-Scrum|Scrum]]"
  - "[[CONC-02-User-Stories-Criteres-Acceptation|User Stories et Critères d'Acceptation]]"
related_projects: []
source: "https://www.mountaingoatsoftware.com/agile/planning-poker"
---

# Estimation et Planification

> [!abstract] En bref
> Estimer, c'est donner un **ordre de grandeur** du temps ou de l'effort, pas une promesse. Le secret pour estimer juste : **découper** en petites tâches. Une tâche d'une demi-journée s'estime bien ; « faire l'authentification » ne s'estime pas.

## Découper pour estimer

```text
Story « Ajouter un film aux favoris »
- [ ] API : modèle Favorite + migration Prisma         2 h
- [ ] API : POST et DELETE /favorites + tests         3 h
- [ ] Front : FavoritesApi + store                     2 h
- [ ] Front : bouton sur la fiche + états             2 h
- [ ] Front : page « Mes favoris »                     3 h
- [ ] Tests E2E + relecture                            2 h
                                             Total ≈ 14 h → 2 jours
```

**Règle** : une tâche de plus d'une journée est trop grosse, découpe-la encore.

## Les estimations en équipe

| Outil | Principe |
|---|---|
| **Story points** | un effort **relatif** (1, 2, 3, 5, 8, 13…) : « deux fois plus compliqué que celle-là » |
| **Planning poker** | tout le monde vote en même temps, puis on discute des écarts |
| **Vélocité** | nombre de points réalisés par sprint, pour prévoir les suivants |
| **Tailles de t-shirt** | S / M / L / XL pour une première idée rapide |

Pourquoi relatif ? On est mauvais pour dire « 6 heures », mais bons pour dire « c'est plus gros que la story d'hier ».

L'intérêt du planning poker, ce sont les **écarts** : si l'un vote 2 et l'autre 13, le second connaît sûrement un piège. On en parle, puis on revote.

## Ce qu'on oublie toujours d'estimer

- les **tests** ;
- la **relecture** et les corrections qui suivent ;
- l'**intégration** front + back (les formats qui ne collent pas) ;
- le **déploiement** et la configuration ;
- les **imprévus** : garde de la marge (20 à 30 %).

## Sur tes projets perso

- Découpe chaque projet en jalons d'une ou deux semaines (tickets dans GitLab).
- Note l'estimation **et** le temps réel : après quelques projets, tu sauras de combien tu te trompes (tout le monde sous-estime au début).

## Pièges

- **Estimer une tâche floue** : clarifie ou découpe d'abord.
- **Prendre l'estimation pour un engagement ferme.**
- **Oublier tout ce qui n'est pas du code.**
