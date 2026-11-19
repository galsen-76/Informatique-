---
type: concept
domain: git
module: "[[Module 03 - Git et GitHub]]"
status: a-decouvrir
level: debutant
prerequisites:
  - "[[Dépôt Git]]"
parents: []
related:
  - "[[Commit]]"
next_review: 
method: []
tags:
  - concept
  - git
---
# Index Git (staging)

> [!info] En une phrase
> La zone de préparation entre tes fichiers modifiés et le prochain commit : git add y met ce qui partira, et seulement ça.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
Git a trois zones :
1. le **répertoire de travail** : tes fichiers tels qu'ils sont sur le disque ;
2. l'**index** (*staging area*) : ce que tu as préparé avec `git add` ;
3. l'**historique** : les commits.
`git commit` enregistre **l'index**, pas le répertoire de travail.

### Pourquoi ça existe
Choisir précisément ce qui entre dans un commit, même si tu as modifié plusieurs choses à la fois.

### Le problème résolu
Committer d'un coup des changements qui n'ont rien à voir, ou des fichiers de test oubliés.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  W[Travail] -- git add --> I[Index]
  I -- git commit --> H[Historique]
  I -- git restore --staged --> W
```

### Exemple concret
```bash
git status                  # rouge : modifié non indexé ; vert : indexé
git add zipper.py           # un fichier
git add -p                  # morceau par morceau (choix interactif)
git diff                    # travail vs index
git diff --staged           # index vs dernier commit : ce qui va partir
git restore --staged a.py   # retirer de l'index sans perdre la modification
```

### Cas d'utilisation
- Faire deux commits propres à partir de modifications mélangées
- Relire exactement ce qui part avant chaque commit

> [!warning] À ne pas confondre
> `git add` ne sauvegarde rien dans l'historique : il **prépare**. Et un fichier modifié **après** `git add` doit être ré-ajouté, sinon c'est l'ancienne version qui part.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin avec mes mots (section 4).

> [!example] 🧠 Dessine de mémoire
> Dessine les trois zones : fichiers de travail, index, historique. Place deux fichiers modifiés dont un seul passe dans l'index.

> [!example] 🛣️ Suis le trajet
> Suis `git add -p` : dessine un fichier avec deux changements, dont un seul part dans le commit.

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Index Git (staging) » et je l'intègre ici avec `![[Schéma - Index Git (staging).excalidraw]]`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : je l'applique dans mon travail (CVAT, Nuclio) ou je demande une étape à Claude.

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _J'explique mon schéma avec mes mots, sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Dépôt Git]]
- **Mène à** : [[Commit]]
- **Commandes** : [[git add]] · [[git status]] · [[git diff]] · [[git restore]]

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
