---
type: concept
module: "[[Module 03 - Git et GitHub]]"
related:
  - "[[Changelog]]"
  - "[[Tag Git]]"
tags:
  - concept
  - git
---
# Convention de commit

> [!info] En une phrase
> Une règle d'écriture des messages de commit (type: description) qui rend l'historique lisible et permet de générer un changelog.

## 1 · Comprendre
### Définition
Les **Conventional Commits** imposent la forme `type(portée facultative): description courte`. Le **type** dit la nature du changement :

| Type | Pour |
| --- | --- |
| `feat` | une nouvelle fonctionnalité |
| `fix` | une correction de bug |
| `ci` | la configuration de la CI (`.gitlab-ci.yml`) |
| `build` | le build, les Dockerfile, les dépendances |
| `docs` | la documentation |
| `test` | les tests |
| `refactor` | réorganiser le code sans changer son comportement |
| `style` | la mise en forme du code (espaces, formatage), sans changer le comportement |
| `perf` | rendre plus rapide ou plus léger |
| `chore` | l'entretien divers (`.gitignore`, nettoyage) |
| `revert` | annuler un commit précédent |

Un `!` après le type (`feat!:`) ou un pied de page `BREAKING CHANGE:` signale un changement **cassant**.

> [!example] Plein d'exemples
> Tous les types, des messages complets et des « mauvais → bons » : [[Exemples de commits conventionnels]].

### Pourquoi ça existe
Comprendre d'un coup d'œil ce que fait chaque commit, et automatiser (changelog, numéro de version).

### Le problème résolu
Des historiques remplis de « modif », « ça marche », « wip » : impossible de retrouver quand et pourquoi un changement a été fait.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  T[type] --> S[portée]
  S --> D[description]
```

### Exemple concret
```text
ci: récupère les images de base depuis le registre interne
fix(export): corrige le nom de l'archive quand le dossier contient des espaces
build: rend entrypoint.sh exécutable
feat(ui): ajoute le bouton « Générer le plan »
```
Règles pratiques : l'impératif ou le présent, pas de point final, une ligne courte (≈ 70 caractères). Le détail du **pourquoi** va dans le corps, après une ligne vide.

### Cas d'utilisation
- Générer le [[Changelog]]

> [!warning] À ne pas confondre
> `fix` (corrige un bug du produit) et `ci` (change la pipeline). Un commit qui mélange les deux devrait être **deux** commits : un changement = un commit.

## 3 · Relier
- **Au travail** : [Convention de commit au travail](obsidian://open?vault=Travail&file=Convention%20de%20commit%20au%20travail)
- **Prérequis** : [[Commit]]
- **Complémentaires** : [[Changelog]] · [[Tag Git]]
- **Commandes** : [[git commit]] · [[git diff]]
- **Ressource** : [[Exemples de commits conventionnels]]
