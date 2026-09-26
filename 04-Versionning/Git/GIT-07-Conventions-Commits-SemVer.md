---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - outils/git/conventions
aliases:
  - "Conventions de Commits et SemVer"
parent: "[[Git]]"
related_theory:
  - "[[GIT-06-Workflows-Equipe|Workflows Git en Équipe]]"
  - "[[METH-04-Documentation-Technique|Documentation Technique]]"
related_projects: []
source: "https://www.conventionalcommits.org/fr/v1.0.0/"
---

# Conventions de Commits et SemVer

> [!abstract] En bref
> Deux conventions partagées par la plupart des équipes. **Conventional Commits** : chaque message commence par un type (`feat:`, `fix:`…), pour un historique lisible et des notes de version automatiques. **SemVer** : un numéro de version en 3 parties (`2.4.1`) qui dit si une mise à jour peut casser ton code.

## Conventional Commits

```text
type(portée optionnelle): description courte à l'impératif

corps optionnel : le pourquoi
```

```bash
git commit -m "feat(projects): ajoute le filtre par techno"
git commit -m "fix(contact): empêche le double envoi du formulaire"
git commit -m "docs: complète le README"
```

| Type | Pour |
|---|---|
| `feat` | une nouvelle fonctionnalité |
| `fix` | une correction de bug |
| `refactor` | réorganiser le code sans changer le comportement |
| `style` | mise en forme (espaces, point-virgule), pas le CSS |
| `test` | ajouter ou corriger des tests |
| `docs` | documentation |
| `chore` | maintenance (dépendances, configuration) |
| `ci` | pipeline |
| `perf` | performance |

Un changement qui **casse** la compatibilité : `feat!: …` ou une ligne `BREAKING CHANGE: …`.

**Un bon message** dit **ce que fait** le commit, pas ce que tu as fait : « ajoute la pagination », pas « j'ai travaillé sur la liste ».

## SemVer : MAJEUR.MINEUR.CORRECTIF

```text
  2  .  4  .  1
  │     │     └─ CORRECTIF : correction de bug, rien ne change pour toi
  │     └─────── MINEUR : nouvelle fonctionnalité, compatible
  └───────────── MAJEUR : changement qui peut casser ton code
```

| Passage | Signification | Risque pour toi |
|---|---|---|
| 2.4.1 → 2.4.2 | correction | aucun |
| 2.4.1 → 2.5.0 | nouveauté | faible |
| 2.4.1 → 3.0.0 | changement cassant | **lire les notes de migration** |

Le lien avec les commits : `fix` → correctif, `feat` → mineur, `BREAKING CHANGE` → majeur. Des outils (semantic-release, release-please) calculent la version et le changelog automatiquement.

### Dans `package.json`

| Écriture | Accepte |
|---|---|
| `"^2.4.1"` | 2.x.x à partir de 2.4.1 (pas 3.0.0) |
| `"~2.4.1"` | 2.4.x à partir de 2.4.1 |
| `"2.4.1"` | exactement cette version |

## Vérifier automatiquement

**commitlint** + **husky** refusent un commit dont le message ne respecte pas la convention. Voir [[OUT-03-ESLint-Prettier-Qualite|Qualité outillée]].

## Pièges

- **Des messages vagues** : « fix », « modifs », « wip ».
- **Un commit qui mélange** une fonctionnalité, une correction et du formatage : impossible à relire ou à annuler proprement.
- **Mettre à jour une dépendance de version majeure** sans lire ses notes de version.
