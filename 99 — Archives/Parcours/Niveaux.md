---
cssclasses:
  - dw-wide
tags:
  - index
---
# Niveaux

> [!abstract] Le principe
> Le parcours est un jeu à niveaux. Je suis au niveau indiqué par `niveau_actuel` dans [[Focus]] (au départ **0**).
> - Chaque notion a ses **trois cases** : `schema` (mon dessin Excalidraw du concept), `exercice_visuel` (les exercices visuels de la fiche, faits et corrigés), `fil_rouge` (appliquée dans le fil rouge).
> - Les trois cases cochées : la notion est **comprise**. **Maîtrisé**, c'est moi qui le mets, quand je le sens.
> - Un niveau est **validé** quand toutes ses notions sont comprises et que toutes les étapes de son fil rouge sont réussies. Je passe alors au niveau suivant.
> - Les notions des niveaux suivants restent consultables dans [[Référence travail]], sans compter dans ma progression.

> [!tip] Comment j'avance, notion par notion
> 1. Je lis la fiche du concept.
> 2. Je dessine le concept sur Excalidraw (« Mon schéma ») et je fais ses exercices visuels.
> 3. Tout de suite après, je fais le morceau du fil rouge qui l'utilise (lien « Appliquer dans le fil rouge » de la fiche).
> 4. Je coche les trois cases : la notion est comprise. « Maîtrisé », je le mets quand je le sens.

> [!info] Opérationnel au travail d'abord, puis se perfectionner
> Les niveaux 1 à 4 suivent ce qui sert tous les jours au travail : terminal, réseau, Docker, CI, serveur. Le niveau 5 sert à aller plus loin. Le front (HTML, CSS, JavaScript, Vue, Angular) est au niveau 6 : à ouvrir seulement quand un projet le demande. Chaque niveau commence par les petites marches dont il a besoin (processus et variables avant Docker, YAML et Git en équipe avant la CI, SSH avant le serveur).

| Niveau | Ce que je sais faire à la fin | Fil rouge qui le valide |
| --- | --- | --- |
| 0 · Les bases du poste | Terminal, fichiers, processus, permissions, variables, WSL, Python de base, Git simple | [[Projet - Suivre ses dépenses en Python]] (étapes 00 à 11) |
| 1 · Réseau et API | IP, DNS, ports, TLS, proxy, HTTP, API REST, JSON, un script Python qui appelle une API | [[Projet - MesDépenses]] étapes 01 à 03 |
| 2 · Docker | Image, conteneur, Dockerfile, volume, registre, compose, YAML, PostgreSQL, dépannage | MesDépenses 04 à 06 |
| 3 · CI et travail en équipe | Branches, merge request, conflits, tests, GitLab CI, versions | MesDépenses 07 à 10 |
| 4 · Serveur et déploiement | SSH, services et journaux Linux, reverse proxy, HTTPS, CORS, scripts d'exploitation, déploiement continu | MesDépenses 11 à 14 |
| 5 · Se perfectionner | Architecture, design patterns, algorithmique, sécurité, SQL avancé, gestion de projet | À créer : comptes utilisateurs et refonte de MesDépenses |
| 6 · Le front, à la demande | HTML, CSS, JavaScript, TypeScript, Vue, React, Angular | MesDépenses Front 01 à 11 (dossier « Front (à la demande) ») |

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "niveaux" })
```
