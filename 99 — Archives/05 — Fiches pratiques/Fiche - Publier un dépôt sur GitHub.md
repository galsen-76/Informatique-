---
type: howto
concepts:
  - "[[Git]]"
  - "[[Dépôt Git]]"
tags:
  - fiche-pratique
---
# Fiche - Publier un dépôt sur GitHub

> [!info] Objectif
> Envoyer un projet local sur GitHub pour le sauvegarder et le partager.

## Étapes
1. **Créer le dépôt vide sur GitHub** (bouton *New repository*), sans README ni .gitignore pour éviter un conflit au premier envoi.
2. **Dans le terminal, à la racine du projet :**
   ```bash
   git init -b main
   git add .
   git commit -m "Premier commit"
   ```
3. **Relier au dépôt distant** (copier l'URL proposée par GitHub) :
   ```bash
   git remote add origin https://github.com/<toi>/<projet>.git
   ```
4. **Envoyer :**
   ```bash
   git push -u origin main
   ```
   `-u` mémorise la branche distante : ensuite, `git push` suffit.

> [!success] Vérifier que ça marche
> La page du dépôt sur GitHub affiche tes fichiers et ton commit.

## Liens
- [[Git]] · [[Dépôt Git]] · [[git init]] · [[git add]] · [[git commit]]
