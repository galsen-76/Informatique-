---
type: concept
domain: terminal
module: "[[Module 02 - Terminal et environnement]]"
status: en-cours
level: debutant
niveau: 0
schema: false
exercice_visuel: false
fil_rouge: false
prerequisites:
  - "[[Bash]]"
parents: []
related:
  - "[[Code de sortie]]"
  - "[[Conteneur]]"
next_review: 
tags:
  - concept
  - terminal
---
# Processus

> [!info] En une phrase
> Un programme en train de tourner, avec un numéro (PID) ; on peut le lister, l'interrompre ou l'envoyer en arrière-plan.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
Lancer un programme crée un **processus**, identifié par un **PID**. Un processus a un parent (celui qui l'a lancé, souvent le shell), hérite de ses [[Variable d'environnement|variables d'environnement]] et finit par renvoyer un [[Code de sortie]].

### Pourquoi ça existe
Faire tourner plusieurs programmes en même temps, chacun isolé, et pouvoir les surveiller ou les arrêter.

### Le problème résolu
Un serveur bloqué ou un script qui tourne à l'infini : il faut pouvoir le trouver et l'arrêter.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  S[Shell] --> P1[python]
  S --> P2[serveur]
  P2 --> E[Code de sortie]
```

### Exemple concret
```bash
python serveur.py              # au premier plan : le terminal est occupé
# Ctrl+C                       # l'interrompre
python serveur.py &            # en arrière-plan : le terminal reste libre
jobs                           # mes tâches en arrière-plan
ps aux | grep python           # trouver un processus et son PID
kill 1234                      # lui demander de s'arrêter
kill -9 1234                   # le forcer (dernier recours)
top                            # ou htop : qui consomme le processeur (q pour quitter)
```
```powershell
Get-Process python
Stop-Process -Id 1234
```

### Cas d'utilisation
- Libérer un [[Port]] occupé par un serveur oublié
- Comprendre un conteneur : son processus principal **est** le conteneur ([[Conteneur]])

> [!warning] À ne pas confondre
> **Ctrl+C** (interrompt le programme) et **Ctrl+Z** (le **suspend** seulement : il existe encore, `fg` pour le reprendre). Et fermer le terminal tue en général les processus lancés dedans.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] 🧠 Dessine de mémoire
> Dessine trois processus qui tournent dans WSL avec leur PID. Montre ce que font `&`, `ps` et `kill` sur ce dessin.

> [!example] 🛣️ Suis le trajet
> Dessine ce qui se passe quand tu lances ton API avec uvicorn puis fais Ctrl+C : le processus naît, tourne, reçoit le signal, s'arrête.

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Processus » et je l'intègre ici avec `![[Schéma - Processus.excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- [[Dépenses 00 - Découvrir son poste]]

## 4 · Relier
- **Prérequis** : [[Bash]]
- **Complémentaires** : [[Code de sortie]] · [[Port]]
- **Utilisé par** : [[Conteneur]]

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
