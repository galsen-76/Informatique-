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

| Niveau | Ce que je sais faire à la fin | Fil rouge qui le valide |
| --- | --- | --- |
| 0 · Les bases du poste | Terminal, fichiers, WSL, Python de base, Git simple | [[Projet - Suivre ses dépenses en Python]] (étapes 00 à 11) |
| 1 · Une appli qui tourne | HTTP, API REST, JSON, Docker, proxy, registre | MesDépenses 01 et 02 : l'API en main (curl, Bruno), puis dans Docker |
| 2 · Le web complet | HTML, CSS, JavaScript, Vue, CORS, nginx, compose, PostgreSQL | MesDépenses 03 à 07 : le front Vue, CORS, tout dans compose |
| 3 · Le travail en équipe | Tests, GitLab CI, branches et merge requests, journaux | MesDépenses 08 et 09 : la CI de l'API et du front |
| 4 · Changer de contexte | Angular, TypeScript, un autre framework ou langage | MesDépenses 10 à 14 : le front Angular |
| 5 · Concevoir | Architecture, design patterns, sécurité, performance | À créer : comptes utilisateurs et refonte de MesDépenses |

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "niveaux" })
```
