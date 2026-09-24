---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - outils/git/conventions
aliases:
  - "Conventions de Commits et SemVer"
parent: "[[Git]]"
children: []
related_theory:
  - "[[GIT-06-Workflows-Equipe|Workflows Git en Équipe]]"
  - "[[METH-04-Documentation-Technique|Documentation Technique]]"
related_snippets:
  - "[[04_Snippets/git-07-conventions-commits-semver]]"
related_projects: []
source: "https://www.conventionalcommits.org/fr/v1.0.0/"
---

# Conventions de Commits et SemVer

> [!abstract] Introduction
> Les Conventional Commits normalisent les messages (`feat:`, `fix:`…) et le versionnement sémantique (MAJEUR.MINEUR.PATCH) exprime l'impact d'une version — ensemble, ils permettent changelogs et versions automatiques.

> [!warning]- Prérequis
> [[GIT-01-Fondamentaux|Git Fondamentaux]]

---

## Théorie

> [!question]- C'est quoi ?
> ```text
> <type>(<portée>): <description courte à l'impératif>
>
> [corps : le POURQUOI]
>
> [footer : BREAKING CHANGE: …, Closes #123]
> ```
> Types : `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
> SemVer `2.4.1` : **MAJEUR** (incompatible) . **MINEUR** (fonctionnalité compatible) . **PATCH** (correctif).

> [!example]- Analogie
> Des étiquettes normalisées sur des cartons de déménagement : n'importe qui sait ce qu'il y a dedans sans ouvrir, et une machine peut les trier.

> [!question]- Pourquoi l'utiliser ?
> Historique lisible, revue facilitée, génération automatique du changelog et du numéro de version (`feat` → mineure, `fix` → patch, `BREAKING CHANGE` → majeure).

> [!question]- Comment ça marche ?
> Outillage : commitlint + husky (hook `commit-msg`), semantic-release / release-please / changesets.

> [!question]- Quand l'utiliser ?
> Tous les commits, si l'équipe l'adopte (très répandu).

> [!danger]- Quand NE PAS l'utiliser / Limites
> Une convention n'aide que si elle est respectée : l'outiller (hook, CI) plutôt que compter sur la mémoire.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Conventional Commits | Format standard des messages de commit |
| SemVer | Versionnement sémantique |
| Changelog | Journal des changements par version |
| Breaking change | Changement incompatible |

---

## Points clés

- Message à l'impératif, court, avec un type
- Le corps explique le pourquoi
- BREAKING CHANGE = version majeure

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - « fix », « update », « wip » comme messages
> - Un commit qui mélange feat + refactor + format

---

## Exemple minimal

```text
feat(favoris): permettre de trier les favoris par date d'ajout

Les utilisateurs retrouvaient difficilement leurs derniers ajouts.

Closes #87
```

> [!note] Ce que j'en retiens
> Type, portée, intention, raison et ticket : tout est là.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Mettre en place semantic-release dans la CI

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Git]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/git-07-conventions-commits-semver]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Quelle version après 1.4.2 pour un `feat` ? Pour un `fix` ? Pour un breaking change ?

---

## Tâches

- [ ] #task Installer commitlint + husky sur CinéTrack
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
