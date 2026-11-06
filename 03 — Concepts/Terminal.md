---
type: concept
domain: terminal
module: "[[Module 02 - Terminal et environnement]]"
status: maitrise
level: debutant
prerequisites: []
parents: []
related:
  - "[[Système de fichiers]]"
  - "[[Git]]"
  - "[[Node.js]]"
next_review: 2026-11-05
method:
  - Comprendre
  - Explorer
  - Pratiquer
  - Expliquer
  - Relier
  - Réviser
tags:
  - concept
  - terminal
---
# Terminal

> [!info] En une phrase
> Une fenêtre où l'on pilote l'ordinateur en tapant des commandes texte plutôt qu'en cliquant.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
Le **terminal** est l'application (Windows Terminal, iTerm…) ; il fait tourner un **shell** (PowerShell, Bash, Zsh) qui lit tes commandes, les exécute et affiche le résultat. On dit aussi « ligne de commande » ou CLI.

### Pourquoi ça existe
Beaucoup d'outils de développement n'ont pas d'interface graphique (Git, npm, Docker) ou sont plus rapides et automatisables en commandes. Une commande peut être rejouée, enchaînée, mise dans un script.

### Le problème résolu
Répéter des actions à la souris est lent et impossible à automatiser. Une commande écrite une fois peut être relancée, documentée et partagée.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart LR
  A[Commande] --> B[Shell]
  B --> C[Programme]
  C --> D[Résultat]
```
Une commande suit presque toujours la forme : `programme sous-commande --option argument`
- `git commit -m "message"` → programme `git`, sous-commande `commit`, option `-m`, argument `"message"`.
- Le terminal travaille toujours **dans un dossier courant** : c'est le lien direct avec le [[Système de fichiers]].

### Exemple concret
```powershell
cd Documents\projets      # aller dans un dossier
mkdir api-notes          # créer un dossier
cd api-notes
node --version           # vérifier qu'un outil est installé
```

### Cas d'utilisation
- Lancer un serveur ([[Node.js]])
- Versionner du code ([[Git]])
- Installer des paquets ([[npm]])
- Gérer des conteneurs ([[Docker]])

> [!warning] À ne pas confondre
> **Terminal** (la fenêtre) et **shell** (le programme qui comprend les commandes). Sous Windows, PowerShell et Bash (WSL, Git Bash) n'ont pas exactement les mêmes commandes : `ls` existe dans les deux, mais les options diffèrent.

## 3 · Pratiquer
- [[Exercice - Naviguer dans le terminal]]

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _À écrire sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Mène à** : [[Système de fichiers]] → [[Git]]
- **Utilisé par** : [[Node.js]], [[npm]], [[Docker]]
- **Commandes** : [[cd]] · [[ls]] · [[mkdir]] · [[Get-ChildItem]]
- **Approfondir** : [[Shell]] · [[PowerShell]] · [[Bash]] · [[WSL]]

## 6 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
- [x] Je l'explique sans notes, en 3 phrases, à quelqu'un qui ne connaît pas
- [x] J'ai réussi un exercice qui l'utilise
- [x] Je l'ai utilisé dans un projet
- [ ] Je sais dire quand ne pas l'utiliser (ou ce qu'il ne faut pas confondre)
