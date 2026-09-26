---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - outils/gitlab/merge-requests
aliases:
  - "Merge Requests"
parent: "[[GitLab]]"
related_theory:
  - "[[TEST-07-Code-Review|Code Review]]"
  - "[[GIT-02-Branches-Merge-Rebase|Branches Merge et Rebase]]"
related_projects: []
source: "https://docs.gitlab.com/user/project/merge_requests/"
---

# Merge Requests

> [!abstract] En bref
> Une **Merge Request** (MR) est une **demande d'intégration** : « voici mon travail sur la branche `feature/filtre`, pouvez-vous le relire avant qu'il entre dans `main` ? ». Elle regroupe la revue de code par un collègue et le pipeline automatique. C'est le cœur du travail en équipe.

## Le déroulé

1. Tu pousses ta branche : `git push -u origin feature/filtre-technos`.
2. GitLab affiche un lien « Create merge request ».
3. Tu remplis la description, tu assignes un relecteur.
4. Le **pipeline** tourne (lint, tests, build).
5. Le relecteur **commente**, tu corriges en poussant de nouveaux commits sur la même branche.
6. Pipeline vert + approbation → **fusion** dans `main`.

## Une bonne description

```markdown
## Quoi
Ajoute le filtre par techno sur la page Projets.

## Pourquoi
Ticket #23 : les visiteurs veulent voir seulement les projets Angular.

## Comment tester
1. Aller sur /projects
2. Cliquer sur « Angular » : seuls CinéTrack et CinéTrack Full Stack restent
3. « Tous » réaffiche les 6 projets

## Captures
(avant / après)

## Points d'attention
Le filtre est aussi mis dans l'URL (?tech=angular) pour partager le lien.
```

Écrire `Closes #23` ferme automatiquement le ticket à la fusion.

## Une bonne MR

| Règle | Pourquoi |
|---|---|
| **Petite** (moins de ~300 lignes) | relue sérieusement, fusionnée vite |
| **Un seul sujet** | facile à comprendre et à annuler |
| **Relue par toi d'abord** | tu vois tes `console.log` oubliés avant les autres |
| **Pipeline vert** avant de demander une revue | ne fais pas perdre de temps au relecteur |
| **Draft** tant que ce n'est pas prêt | le préfixe « Draft: » empêche la fusion |

## Recevoir des commentaires

- Un commentaire porte sur le **code**, pas sur toi.
- Réponds à **chaque** commentaire : corrigé, ou pourquoi tu ne le fais pas.
- Pose des questions si tu ne comprends pas : c'est le meilleur moment pour apprendre.
- Clique sur « Resolve thread » quand c'est réglé.

**Relire les MR des collègues plus expérimentés** est l'un des meilleurs moyens de progresser. Voir aussi [[TEST-07-Code-Review|Code review]].

## Pièges

- **Une MR de 2 000 lignes** : personne ne la relit vraiment.
- **Pousser des corrections sans répondre** aux commentaires : le relecteur doit tout revérifier.
- **Fusionner avec un pipeline rouge** « parce que c'est urgent ».
