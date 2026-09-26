---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M10
tags:
  - conception/besoins
aliases:
  - "Recueil des Besoins et Cahier des Charges"
parent: "[[Conception]]"
related_theory:
  - "[[METH-02-Scrum|Scrum]]"
related_projects: []
source: "https://fr.wikipedia.org/wiki/Cahier_des_charges"
---

# Recueil des Besoins et Cahier des Charges

> [!abstract] En bref
> Avant de coder, il faut savoir **quoi** construire et **pourquoi**. La plupart des projets ratés le sont à cause de besoins mal compris, pas d'un mauvais code. Sur tes projets perso, c'est **toi** le client : prends 30 minutes pour écrire la liste des fonctionnalités, les trier, et décider ce qui fait partie de la première version.

## Les 3 types de besoins

| Type | Question | Exemple CinéTrack |
|---|---|---|
| **Fonctionnel** | que doit **faire** l'application ? | « l'utilisateur peut ajouter un film à ses favoris » |
| **Non fonctionnel** | avec quelles **qualités** ? | rapide (< 500 ms), responsive, accessible, sécurisé |
| **Contrainte** | qu'est-ce qui est **imposé** ? | Angular, PostgreSQL, RGPD, budget 0 €, livré en 6 semaines |

Les non-fonctionnels sont de **vrais** besoins : une appli lente ou inaccessible est une appli ratée.

## Trier avec MoSCoW

| Priorité | Sens | CinéTrack v1 |
|---|---|---|
| **Must** | indispensable | rechercher un film, voir la fiche, favoris, connexion |
| **Should** | important, mais on peut livrer sans | noter un film, écrire une critique |
| **Could** | bonus | mode sombre, partage |
| **Won't** (cette fois) | pas maintenant | recommandations par IA |

Les **Must** = ton **MVP** (produit minimum viable) : la plus petite version utile. Tu la termines **avant** de toucher au reste.

## Les questions à se poser

- **Qui** utilise l'appli ? Visiteur, utilisateur connecté, administrateur ?
- **Que** doit-il pouvoir faire ? Et ne **pas** faire ?
- **Quelles données** ? D'où viennent-elles (TMDB, saisie) ? Combien ?
- **Que se passe-t-il quand ça rate ?** (API indisponible, champ invalide, pas de résultat)
- **Comment saura-t-on que c'est réussi ?**

## Le mini cahier des charges d'un projet perso

Un simple fichier `docs/besoins.md` dans le dépôt suffit :

```markdown
# CinéTrack — besoins

## Objectif
Permettre de rechercher des films, les noter et garder ses favoris.

## Utilisateurs
Visiteur (recherche, consultation) · Utilisateur (favoris, notes) · Admin (modération)

## MVP (Must)
- F1 : rechercher un film par titre
- F2 : consulter la fiche d'un film
- F3 : s'inscrire / se connecter
- F4 : ajouter / retirer un favori

## Qualités attendues
Responsive · accessible (clavier, contrastes) · réponses < 500 ms · mots de passe hachés

## Plus tard
Critiques, notes, recommandations
```

En entreprise, on parle de **cahier des charges fonctionnel** (côté métier) et de **spécifications techniques** (côté équipe).

## Pièges

- **Coder la solution imaginée** sans vérifier le vrai besoin.
- **Oublier les cas d'erreur et les rôles** : ils représentent souvent la moitié du travail.
- **Un MVP qui contient tout** : il n'est plus minimum, tu ne le finis jamais.

La suite : transformer ces besoins en [[CONC-02-User-Stories-Criteres-Acceptation|user stories]].
