---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - outils/git/conflits
aliases:
  - "Résoudre les Conflits Git"
parent: "[[Git]]"
children: []
related_theory:
  - "[[GIT-02-Branches-Merge-Rebase|Branches Merge et Rebase]]"
related_snippets:
  - "[[04_Snippets/git-04-conflits]]"
related_projects: []
source: "https://git-scm.com/book/fr/v2/Les-branches-avec-Git-Branches-et-fusions%C2%A0%3A-les-bases"
---

# Résoudre les Conflits Git

> [!abstract] Introduction
> Un conflit survient quand deux branches modifient la même zone d'un fichier : Git ne sait pas quelle version garder et te demande de décider.

> [!warning]- Prérequis
> [[GIT-02-Branches-Merge-Rebase|Branches Merge et Rebase]]

---

## Théorie

> [!question]- C'est quoi ?
> ```text
> <<<<<<< HEAD
> titre = 'Mes films';
> =======
> titre = 'Ma collection';
> >>>>>>> feature/renommage
> ```

> [!example]- Analogie
> Deux personnes ont corrigé la même phrase d'un document partagé de deux façons différentes : quelqu'un doit relire et choisir (ou combiner).

> [!question]- Pourquoi l'utiliser ?
> Les conflits sont normaux en équipe ; les résoudre sereinement et correctement est une compétence clé.

> [!question]- Comment ça marche ?
> 1. `git status` : liste les fichiers en conflit
> 2. Ouvrir chaque fichier (IntelliJ/VS Code proposent un outil 3 volets)
> 3. Garder la bonne version (ou combiner), supprimer les marqueurs
> 4. Compiler / lancer les tests
> 5. `git add fichier` puis `git commit` (merge) ou `git rebase --continue`
> Abandonner : `git merge --abort` / `git rebase --abort`.

> [!question]- Quand l'utiliser ?
> À chaque merge/rebase conflictuel ; en cas de doute, demander à l'auteur de l'autre modification.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Un merge sans conflit textuel peut quand même casser la logique (conflit sémantique) → les tests restent indispensables.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Conflit | Modifications concurrentes incompatibles |
| Marqueurs | `<<<<<<<`, `=======`, `>>>>>>>` |
| Conflit sémantique | Code fusionné sans conflit mais incohérent |

---

## Points clés

- Petites branches fréquemment intégrées = peu de conflits
- Toujours relancer build + tests après résolution
- `--abort` pour revenir à l'état initial

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Garder « ma version » partout sans lire l'autre
> - Commiter des marqueurs de conflit
> - Conflits sur `package-lock.json` → régénérer (`npm install`) plutôt qu'éditer à la main

---

## Exemple minimal

```bash
git rebase origin/main
# CONFLICT (content): Merge conflict in src/app/films.service.ts
# … résolution dans l'IDE …
git add src/app/films.service.ts
git rebase --continue
npm test
```

> [!note] Ce que j'en retiens
> Résoudre, marquer résolu (`add`), continuer, puis TESTER.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Configurer `rerere` pour réutiliser des résolutions

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Git]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/git-04-conflits]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Qu'est-ce qu'un conflit sémantique ?

---

## Tâches

- [ ] #task Provoquer volontairement un conflit entre deux branches et le résoudre dans IntelliJ
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
