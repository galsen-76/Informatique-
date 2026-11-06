---
tags:
  - index
---
# Guide

> [!tip] En bref
> Chaque jour : [[Dashboard]] → sujet actuel → une ou deux étapes de la [[Méthode d'apprentissage]] → mise à jour du statut. Les idées hors sujet vont dans le *Parking* de [[Focus]].

## Installation
1. **Ouvrir le vault** : Obsidian → *Ouvrir un dossier comme coffre* → `Dev Learning`. C'est un coffre séparé de Dev Workspace.
2. **Plugins communautaires** (*Paramètres → Plugins communautaires* → désactiver le mode restreint) :

| Plugin | Rôle | |
| --- | --- | --- |
| [Dataview](https://obsidian.md/plugins?id=dataview) | Dashboard, parcours, progression, révisions | indispensable |
| [Templater](https://obsidian.md/plugins?id=templater-obsidian) | Templates qui posent les questions et rangent la fiche | recommandé |

3. **Réglages**
   - Dataview : *Enable JavaScript Queries* activé.
   - Templater : *Template folder location* → `10 — Templates` ; *Trigger Templater on new file creation* activé.
4. **Thème** : *Apparence* → thème **Sombre** → *Extraits CSS* → ↻ → activer **dev-learning** (déjà activé si tu ouvres le vault tel quel). C'est le même design que Dev Workspace.

## Comment c'est organisé
| Espace | Contient | Template |
| --- | --- | --- |
| 00 — Dashboard | [[Dashboard]], [[Focus]], ce guide | — |
| 01 — Parcours | [[Parcours]] (15 modules), [[Méthode d'apprentissage]], [[Chemins de compréhension]] | Module |
| 02 — Cours | Un dossier par module, un cours par chapitre | Cours |
| 03 — Concepts | Une fiche par notion, suivant les 6 étapes | Concept |
| 04 — Commandes | Un sous-dossier par outil | Commande |
| 05 — Fiches pratiques | Procédures pas à pas | Fiche pratique |
| 06 — Erreurs et solutions | Erreurs rencontrées et résolues | Erreur |
| 07 — Exercices et projets | Exercices, projet fil rouge | Exercice · Projet |
| 08 — Ressources | Documentation officielle et outils | — |
| 09 — Révisions | [[Révisions]], [[Suivi des acquis]] | — |
| 10 — Templates | Modèles + le script des vues | — |
| 99 — Archives | Contenus terminés | — |

## Les gestes du quotidien
- **Créer une fiche** : `Alt+N` (Templater) → choisir le modèle → répondre aux questions.
- **Avancer dans la méthode** : dans les propriétés de la fiche, ajoute l'étape terminée à `method` (Comprendre, Explorer, Pratiquer, Expliquer, Relier, Réviser).
- **Changer l'état** d'une notion : propriété `status` → `a-decouvrir`, `en-cours`, `compris` ou `maitrise`.
- **Prouver la maîtrise** : réussir tous les exercices liés à la notion (un exercice se lie à une notion par sa propriété `concepts`, et passe en `reussi` quand il est fait). Tant qu'ils ne le sont pas, le statut *Maîtrisé* est signalé « à confirmer ».
- **Planifier une révision** : propriété `next_review` (+1 j, +3, +7, +14, +30).
- **Relier** : remplir `prerequisites`, `parents` et `related` dans les propriétés (le dashboard vérifie les prérequis) **et** expliquer les liens dans la section 5.
- **Changer de sujet** : dans [[Focus]], `current` reçoit la prochaine notion de `next`.

## Exemples fournis
- 26 fiches concepts connectées (11 complètes : [[Git]], [[Branche Git]], [[Terminal]], [[HTTP]], [[API REST]], [[JSON]], [[Node.js]], [[Express]], [[Middleware]], [[Docker]], [[SQL]] ; les autres plus courtes pour compléter les chemins).
- 18 commandes, dont [[git merge]] détaillée.
- 4 cours, 3 fiches pratiques, 2 erreurs documentées, 3 exercices et le [[Projet - API Notes]].

> [!warning] Les statuts sont des exemples
> Les états (*compris*, *en cours*…) et les dates de révision des exemples servent à montrer le fonctionnement. Ajuste-les à ton niveau réel : une notion que tu n'as pas expliquée avec tes mots n'est pas *comprise*.

## Ce qui demande un plugin
| Fonction | Nécessite |
| --- | --- |
| Dashboard, parcours, progression, révisions, bloc « où j'en suis » des fiches | Dataview (+ JavaScript Queries) |
| Listes des pages index | Dataview |
| Templates avec questions et rangement automatique | Templater |
| Schémas, callouts, questions repliables, vue graphique colorée | Natif |

## Arborescence
```text
Dev Learning/
├── .obsidian/   (snippet CSS, couleurs du graphe, réglages)
├── 00 — Dashboard/
│   ├── Dashboard.md
│   └── Focus.md
├── 01 — Parcours/
│   ├── Chemins de compréhension.md
│   ├── Modules/
│   │   ├── Module 01 - Fondamentaux informatiques.md
│   │   ├── Module 02 - Terminal et environnement.md
│   │   ├── Module 03 - Git et GitHub.md
│   │   ├── Module 04 - HTML et CSS.md
│   │   ├── Module 05 - JavaScript.md
│   │   ├── Module 06 - TypeScript.md
│   │   ├── Module 07 - Node.js.md
│   │   ├── Module 08 - Backend et API REST.md
│   │   ├── Module 09 - Bases de données et SQL.md
│   │   ├── Module 10 - Authentification et sécurité.md
│   │   ├── Module 11 - React.md
│   │   ├── Module 12 - Tests.md
│   │   ├── Module 13 - Docker.md
│   │   ├── Module 14 - DevOps et déploiement.md
│   │   └── Module 15 - Architecture logicielle.md
│   ├── Méthode d'apprentissage.md
│   └── Parcours.md
├── 02 — Cours/
│   ├── 01 Fondamentaux informatiques/
│   │   └── Cours - Comment fonctionne le web.md
│   ├── 03 Git et GitHub/
│   │   ├── Cours - Branches et fusion.md
│   │   └── Cours - Git, les bases.md
│   ├── 08 Backend et API REST/
│   │   └── Cours - Construire une API REST avec Express.md
│   └── Cours.md
├── 03 — Concepts/
│   ├── API REST.md
│   ├── API.md
│   ├── Authentification.md
│   ├── Base de données relationnelle.md
│   ├── Branche Git.md
│   ├── Client-serveur.md
│   ├── Commit.md
│   ├── Concepts.md
│   ├── Conflit de merge.md
│   ├── Conteneur.md
│   ├── Docker.md
│   ├── Dépôt Git.md
│   ├── Endpoint.md
│   ├── Express.md
│   ├── Git.md
│   ├── HTTP.md
│   ├── Image Docker.md
│   ├── Internet.md
│   ├── JSON.md
│   ├── JWT.md
│   ├── Merge.md
│   ├── Middleware.md
│   ├── Node.js.md
│   ├── SQL.md
│   ├── Système de fichiers.md
│   ├── Terminal.md
│   └── npm.md
├── 04 — Commandes/
│   ├── Commandes.md
│   ├── Docker/
│   │   ├── docker build.md
│   │   ├── docker ps.md
│   │   └── docker run.md
│   ├── Git/
│   │   ├── git add.md
│   │   ├── git branch.md
│   │   ├── git commit.md
│   │   ├── git init.md
│   │   ├── git merge.md
│   │   ├── git status.md
│   │   └── git switch.md
│   ├── Node/
│   │   └── node.md
│   ├── PowerShell/
│   │   └── Get-ChildItem.md
│   ├── SQL/
│   │   └── SELECT.md
│   ├── Terminal/
│   │   ├── cd.md
│   │   ├── ls.md
│   │   └── mkdir.md
│   └── npm/
│       ├── npm init.md
│       └── npm install.md
├── 05 — Fiches pratiques/
│   ├── Fiche - Démarrer un projet Node.js.md
│   ├── Fiche - Lancer PostgreSQL avec Docker.md
│   ├── Fiche - Publier un dépôt sur GitHub.md
│   └── Fiches pratiques.md
├── 06 — Erreurs et solutions/
│   ├── Erreur - CONFLICT lors d'un git merge.md
│   ├── Erreur - EADDRINUSE port déjà utilisé.md
│   └── Erreurs et solutions.md
├── 07 — Exercices et projets/
│   ├── Exercice - Branches et merge avec Git.md
│   ├── Exercice - Créer une API REST avec Express.md
│   ├── Exercice - Naviguer dans le terminal.md
│   ├── Exercices et projets.md
│   └── Projet - API Notes.md
├── 08 — Ressources/
│   ├── Assets/
│   └── Ressources.md
├── 09 — Révisions/
│   ├── Révisions.md
│   └── Suivi des acquis.md
├── 10 — Templates/
│   ├── Modèle - Commande.md
│   ├── Modèle - Concept.md
│   ├── Modèle - Cours.md
│   ├── Modèle - Erreur.md
│   ├── Modèle - Exercice.md
│   ├── Modèle - Fiche pratique.md
│   ├── Modèle - Module.md
│   ├── Modèle - Projet.md
│   └── Scripts/
│       └── learning.js
└── 99 — Archives/
    └── Archives.md
```
