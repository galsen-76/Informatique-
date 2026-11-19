---
type: concept
domain: terminal
module: "[[Module 02 - Terminal et environnement]]"
status: compris
level: debutant
prerequisites: []
parents: []
related:
  - "[[Système de fichiers]]"
  - "[[Git]]"
  - "[[Node.js]]"
next_review: 
method: []
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

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin avec mes mots (section 4).

> [!example] 🧠 Dessine de mémoire
> Dessine ton terminal comme un écran avec ses parties : invite, commande, sortie. Écris à côté qui affiche quoi.

> [!example] ⚖️ Avant / après
> Avant / après : créer un dossier en cliquant dans l'explorateur, puis en tapant une commande. Dessine les deux chemins.

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Terminal » et je l'intègre ici avec `![[Schéma - Terminal.excalidraw]]`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : je l'applique dans mon travail (CVAT, Nuclio) ou je demande une étape à Claude.

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> Un terminal c'est juste l'interface : la fenêtre qui affiche le texte et envoie ce que je tape. Ce n'est pas lui qui comprend les commandes, c'est le shell qui tourne dedans.

## 5 · Relier
- **Mène à** : [[Système de fichiers]] → [[Git]]
- **Utilisé par** : [[Node.js]], [[npm]], [[Docker]]
- **Commandes** : [[cd]] · [[ls]] · [[mkdir]] · [[Get-ChildItem]]
- **Approfondir** : [[Shell]] · [[PowerShell]] · [[Bash]] · [[WSL]]

## 6 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
La notion est maîtrisée quand je sais :
1. **l'expliquer** de façon fluide, à partir de mon schéma (section 4) ;
2. **l'adapter** à un autre contexte (consigne « Change de contexte », ou Claude m'interroge sur un autre cas) ;
3. **l'appliquer** pour de vrai dans le fil rouge (section 3).

Réussir un exercice ne suffit pas. C'est moi qui passe le statut en `maitrise`.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
