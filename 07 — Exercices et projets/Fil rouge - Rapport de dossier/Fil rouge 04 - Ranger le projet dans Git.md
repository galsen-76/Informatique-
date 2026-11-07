---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Convention de commit]]"
  - "[[Tag Git]]"
tags:
  - exercice
  - fil-rouge
---
# Fil rouge 04 - Ranger le projet dans Git

> [!info] Où tu en es
> **Projet :** [[Projet fil rouge - Rapport de dossier]] · **Étape du parcours :** 4 · Git dans un vrai projet
> **Étape précédente :** [[Fil rouge 03 - Une page web pour le rapport]]
> **Cours à avoir lus :** [[Cours - Git propre dans un vrai projet]]
> **Notions validées par cette étape :** [[Convention de commit]] · [[Tag Git]]

## Le but
Mettre le projet sur **GitLab** proprement : uniquement les bons fichiers, un historique lisible, et une première version étiquetée `v0.1.0`.

## Ce que tu fais
- [ ] Crée un projet vide sur GitLab et relie ton dossier à ce dépôt
- [ ] Écris un `.gitignore` pour que `sortie/`, `__pycache__/` et les fichiers de l'éditeur ne soient jamais commités
- [ ] Fais **au moins trois** commits séparés, chacun avec un message conventionnel : l'application, le Dockerfile, le fichier Compose
- [ ] Crée le tag `v0.1.0` et pousse le code **et** le tag
- [ ] Corrige une faute dans un message ou un fichier, et fais un commit du bon type

> [!success] Ça marche si…
> Sur GitLab, tu vois tes commits avec des messages `feat:`, `build:`… et le tag `v0.1.0` dans la liste des tags, sans aucun fichier de `sortie/`.

## Est-ce que j'ai compris ?
Réponds par écrit, en dessous, **sans regarder la solution**. Ensuite, demande à Claude de vérifier tes réponses.
1. Quel type as-tu donné au commit du Dockerfile, et pourquoi pas `feat` ?
2. Pourquoi `sortie/` ne doit-il pas être dans Git ?
3. Un tag et une branche pointent tous les deux vers un commit. Quelle est la différence ?
4. Pourquoi `git push` seul n'envoie-t-il pas ton tag ?

> [!quote] Mes réponses
> _À écrire._

> [!question]- Indice
> Voir [[Exemples de commits conventionnels]]. Les types utiles ici : `feat`, `build`, `docs`, `chore`. Un tag annoté se crée avec un message ; les tags se poussent à part.

> [!question]- Solution
> ```bash
> git init -b main
> git remote add origin git@gitlab.com:<toi>/rapport-dossier.git
> printf 'sortie/\n__pycache__/\n.vscode/\n' > .gitignore
> git add app.py test_app.py requirements.txt .gitignore && git commit -m "feat: compte les fichiers d'un dossier par extension"
> git add Dockerfile .dockerignore && git commit -m "build(docker): ajoute l'image de l'application"
> git add compose.yaml && git commit -m "feat(web): affiche le rapport avec nginx"
> git tag -a v0.1.0 -m "Première version"
> git push -u origin main && git push origin v0.1.0
> ```
> 1. `build` : le Dockerfile change la façon de construire, pas ce que fait l'application.
> 2. C'est un résultat produit à chaque lancement, pas du code source : il changerait sans arrêt et n'a rien à faire dans l'historique.
> 3. Une branche avance à chaque commit ; un tag reste fixé sur un commit, pour marquer une version.
> 4. Par défaut, `git push` envoie les branches ; les tags se poussent explicitement (`git push origin v0.1.0` ou `--tags`).

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] J'ai répondu aux questions et Claude les a vérifiées
- [ ] Commit poussé sur GitLab
