---
type: concept
domain: git
module: "[[Module 03 - Git et GitHub]]"
status: a-decouvrir
level: debutant
niveau: 0
schema: false
exercice_visuel: false
fil_rouge: false
prerequisites:
  - "[[Dépôt Git]]"
parents: []
related:
  - "[[Index Git (staging)]]"
next_review: 
tags:
  - concept
  - git
---
# Ignorer des fichiers (gitignore)

> [!info] En une phrase
> Le fichier .gitignore liste ce que Git doit ignorer : environnements, dépendances, fichiers générés, secrets.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
`.gitignore`, à la racine du dépôt, contient des motifs : chaque fichier qui correspond n'apparaît plus dans `git status` et ne peut pas être ajouté par erreur.

```text
# Python
.venv/
__pycache__/
*.pyc
# Node
node_modules/
dist/
# Secrets et données locales
.env
*.log
sortie/
```

### Pourquoi ça existe
Un dépôt ne doit contenir que ce qui est nécessaire pour reconstruire le projet.

### Le problème résolu
Des dépôts énormes (`node_modules`, `.venv`), des conflits sur des fichiers générés, des mots de passe publiés (`.env`).

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  F[Fichier] --> Q{Dans .gitignore ?}
  Q -- oui --> X[Ignoré]
  Q -- non --> S[git status]
```

### Exemple concret
```bash
git check-ignore -v .venv/bin/python   # quelle règle ignore ce fichier
git status --ignored                   # voir aussi les ignorés
git rm -r --cached node_modules        # arrêter de suivre un dossier déjà commité
```
Modèles prêts à l'emploi : github.com/github/gitignore.

### Cas d'utilisation
- Tout nouveau projet : créer le `.gitignore` **avant** le premier commit
- Le `.dockerignore` suit la même idée pour le contexte de build Docker

> [!warning] À ne pas confondre
> Ajouter un fichier au `.gitignore` ne le **retire pas** s'il est déjà suivi : il faut `git rm --cached`. Et un secret déjà poussé reste dans l'historique : il faut le **changer**, pas seulement l'ignorer.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] ⚖️ Avant / après
> Avant / après : `git status` dans ton application sans `.gitignore` (avec `.venv`, `node_modules`, `.env`), puis avec. Dessine ce qui disparaît.

> [!example] 🔍 Trouve l'erreur
> Ce schéma est faux. Corrige-le en rouge et explique l'erreur.
>
> ```mermaid
> flowchart TD
>   E[.env déjà commité] --> G[Ajout au gitignore]
>   G --> S[Secret retiré]
> ```

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Ignorer des fichiers (gitignore) » et je l'intègre ici avec `![[Schéma - Ignorer des fichiers (gitignore).excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- [[Dépenses 07 - Le projet dans Git]]

## 4 · Relier
- **Prérequis** : [[Dépôt Git]]
- **Complémentaires** : [[Index Git (staging)]] · [[Secret et fichier .env]]

## 5 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation (compris, puis maîtrisé)
Trois cases à cocher dans les propriétés de la fiche :
- `schema` : mon dessin du concept est dans « Mon schéma » ;
- `exercice_visuel` : j'ai fait et corrigé les exercices visuels de la section 3 ;
- `fil_rouge` : je l'ai appliqué dans le fil rouge (coché tout seul quand une étape qui l'utilise est réussie).

Les trois cochées : la notion compte comme **comprise**. **Maîtrisé** : c'est moi qui le mets dans `status`, quand je le sens.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
