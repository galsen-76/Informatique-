---
type: notion
statut: a apprendre
resume: "Deux conventions partagées par la plupart des équipes. Conventional Commits : chaque message commence par un type (feat:, fix:…), pour un historique lisible et des notes de version automatiques. SemVer : un numéro de version en 3 parties (2.4.1) qui dit si une mise à jour peut casser ton code."
revu:
sources:
  - "https://www.conventionalcommits.org/fr/v1.0.0/"
---
# Conventions de commits et SemVer

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Deux conventions partagées par la plupart des équipes. **Conventional Commits** : chaque message commence par un type (`feat:`, `fix:`…), pour un historique lisible et des notes de version automatiques. **SemVer** : un numéro de version en 3 parties (`2.4.1`) qui dit si une mise à jour peut casser ton code.

## Le problème

**Pourquoi c'est utile ?**
Pour avoir un historique lisible et des numéros de version qui disent ce qui a changé.

**Qu'est-ce qui se passait sans ça ?**
Des messages « fix », « wip », « ça marche » : impossible de retrouver un changement, et des mises à jour qui cassaient sans prévenir.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

### Conventional Commits

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

## 🧪 Exemple

### SemVer : MAJEUR.MINEUR.CORRECTIF

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

#### Dans `package.json`

| Écriture | Accepte |
|---|---|
| `"^2.4.1"` | 2.x.x à partir de 2.4.1 (pas 3.0.0) |
| `"~2.4.1"` | 2.4.x à partir de 2.4.1 |
| `"2.4.1"` | exactement cette version |

## ⚠️ Limites et pièges

- **Des messages vagues** : « fix », « modifs », « wip ».
- **Un commit qui mélange** une fonctionnalité, une correction et du formatage : impossible à relire ou à annuler proprement.
- **Mettre à jour une dépendance de version majeure** sans lire ses notes de version.

## 🏋️ S'entraîner

### Vérifier automatiquement

**commitlint** + **husky** refusent un commit dont le message ne respecte pas la convention. Voir [[ESLint et Prettier|Qualité outillée]].

### Exercices

#### Exercice 1 · Écrire les messages

Écris un message Conventional Commits pour chaque changement :
1. ajout de la page des favoris ;
2. correction d'un plantage quand l'affiche est absente ;
3. mise à jour d'Angular ;
4. renommage de fichiers sans changement de comportement.

> [!success]- Solution
> 1. `feat(favorites): ajoute la page des favoris`
> 2. `fix(movie-card): gère l'absence d'affiche`
> 3. `chore(deps): met à jour Angular en 20.1`
> 4. `refactor: renomme les fichiers du dossier movies`

#### Exercice 2 · Quelle version ?

Ta librairie est en version `2.4.1`. Quelle est la nouvelle version après : une correction de bug ? une nouvelle fonctionnalité compatible ? la suppression d'une fonction publique ?

> [!success]- Solution
> - correction de bug → `2.4.2` (CORRECTIF)
> - nouvelle fonctionnalité compatible → `2.5.0` (MINEUR, le correctif repart à 0)
> - suppression d'une fonction publique → `3.0.0` (MAJEUR : ça casse le code des utilisateurs)

## 🔗 Liens

- **Prérequis :** [[Git fondamentaux]]
- **Voir aussi :** [[Workflows Git en équipe]], [[Documentation technique]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://www.conventionalcommits.org/fr/v1.0.0/
