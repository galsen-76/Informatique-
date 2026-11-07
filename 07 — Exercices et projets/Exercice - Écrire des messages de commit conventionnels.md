---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[Convention de commit]]"
  - "[[Commit]]"
tags:
  - exercice
---
# Exercice — Écrire des messages de commit conventionnels

> [!info] Objectif
> Choisir le bon type et écrire des messages clairs, en t'aidant de [[Exemples de commits conventionnels]].
> Notions : [[Convention de commit]] · [[Commit]]

## Consignes
- [ ] Pour chacun de ces changements, écris l'en-tête du commit : (a) le bouton d'export ne réagissait pas au clic ; (b) tu ajoutes une option `--sortie` à ton script de zip ; (c) tu ajoutes `.venv` au `.gitignore` ; (d) tu renommes des variables sans changer le résultat ; (e) la pipeline GitLab lance maintenant les tests ; (f) tu passes à l'image `python:3.12-slim` ; (g) tu ajoutes un test pour un dossier vide ; (h) la route d'export renvoie maintenant du JSON au lieu de texte, ce qui oblige le front à changer
- [ ] Réécris ces messages : `modif`, `fix bug`, `feat: ajout export + correction css + maj readme`, `refactor: corrige le plantage`
- [ ] Écris un message complet (en-tête, corps qui explique le pourquoi, pied de page `Closes #5`) pour la correction (a)
- [ ] Configure le modèle `~/.gitmessage` de la ressource et fais un vrai commit dans ton projet avec `git commit` sans `-m`
- [ ] Lance `git log --oneline -20` sur le dépôt de CVAT et classe les messages par type

> [!question]- Indice
> Pose-toi les questions dans l'ordre : le comportement change-t-il ? Si oui, est-ce un bug corrigé ? Si non, est-ce la forme ou l'organisation du code ?
> Un message qui contient « + » ou « et » cache souvent deux commits.

> [!question]- Solution
> ```text
> (a) fix(ui): réactive le clic sur le bouton d'export
> (b) feat(zip): ajoute l'option --sortie pour choisir le dossier de destination
> (c) chore: ignore le dossier .venv
> (d) refactor(zip): renomme les variables pour plus de clarté
> (e) ci: lance les tests avant la construction de l'image
> (f) build(docker): passe à l'image python:3.12-slim
> (g) test(zip): vérifie le comportement avec un dossier vide
> (h) feat(api)!: renvoie l'export au format JSON
> ```
> Réécritures : `modif` → dire quoi (`fix(zip): corrige le chemin de sortie`) ; `fix bug` → nommer le bug ; le commit « + » devient trois commits `feat`, `fix`, `docs` ; un refactor ne corrige rien, c'est un `fix(...)`.
> ```text
> fix(ui): réactive le clic sur le bouton d'export
>
> Le gestionnaire de clic était attaché avant que le bouton
> existe dans la page, il n'était donc jamais appelé.
>
> Closes #5
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
