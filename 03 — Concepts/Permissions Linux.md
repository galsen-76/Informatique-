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
  - "[[Système de fichiers]]"
parents: []
related:
  - "[[Fichiers entre Windows et Linux]]"
  - "[[Script shell]]"
next_review: 
method: []
tags:
  - concept
  - terminal
---
# Permissions Linux

> [!info] En une phrase
> Sous Linux, chaque fichier appartient à un utilisateur et dit qui peut le lire (r), l'écrire (w) ou l'exécuter (x) ; root peut tout, sudo permet d'agir en root.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
Chaque fichier a un **propriétaire**, un **groupe**, et trois séries de droits : pour le propriétaire, le groupe, les autres. Chaque série combine `r` (lire), `w` (écrire), `x` (exécuter ; pour un dossier : y entrer).

**root** est l'administrateur, qui a tous les droits. `sudo commande` lance **une** commande en root, après ton mot de passe.

### Pourquoi ça existe
Plusieurs utilisateurs et services partagent la machine : chacun ne doit toucher que ce qui le regarde.

### Le problème résolu
N'importe quel programme pouvait modifier les fichiers du système ou d'un autre utilisateur.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  F[Fichier] --> U[Propriétaire]
  F --> G[Groupe]
  F --> O[Autres]
```
```text
-rwxr-xr--  1 oumar oumar  512 nov.  6 21:30 entrypoint.sh
│└┬┘└┬┘└┬┘    └─┬─┘ └─┬─┘
│ │  │  └ autres : r--  (lire)
│ │  └─── groupe : r-x  (lire, exécuter)
│ └────── propriétaire : rwx (tout)
└──────── - = fichier, d = dossier
```
En chiffres : r = 4, w = 2, x = 1. `755` = `rwxr-xr-x`, `644` = `rw-r--r--`.

### Exemple concret
```bash
ls -l script.sh
chmod +x script.sh          # rendre exécutable
./script.sh                 # le lancer (./ = dans le dossier courant)
chmod 644 config.yml
sudo apt install tree       # installer un paquet demande root
sudo chown oumar:oumar fichier   # changer le propriétaire
whoami                      # qui suis-je ?
```

### Cas d'utilisation
- `Permission denied` en lançant un script : il manque `x` (voir [[Fichiers entre Windows et Linux]] pour Git)
- Fichiers créés par un conteneur qui appartiennent à `root` dans un dossier monté
- Installer des paquets avec [[Gestionnaire de paquets|apt]]

> [!warning] À ne pas confondre
> `sudo` pour **une** commande d'administration, et tout faire en `sudo` « pour que ça marche » : les fichiers créés appartiennent alors à root et tu ne peux plus les modifier normalement. Et `chmod 777` (tout le monde peut tout) n'est jamais une vraie solution.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] 🧠 Dessine de mémoire
> Dessine un fichier avec ses trois groupes de droits (propriétaire, groupe, autres) et les lettres r, w, x. Écris à côté le sens de `-rwxr-x---`.

> [!example] 🔍 Trouve l'erreur
> Ce schéma est faux. Corrige-le en rouge et explique l'erreur.
>
> ```mermaid
> flowchart TD
>   F[script.sh] --> D[droits rw-]
>   D --> L[./script.sh marche]
> ```

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Permissions Linux » et je l'intègre ici avec `![[Schéma - Permissions Linux.excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- [[Dépenses 09 - Un vrai outil en ligne de commande]]

## 4 · Relier
- **Prérequis** : [[Bash]] · [[Système de fichiers]]
- **Complémentaires** : [[Fichiers entre Windows et Linux]] · [[Script shell]]
- **Commandes** : [[chmod]] · [[sudo]]

## 5 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
Trois cases à cocher dans les propriétés de la fiche :
- `schema` : mon dessin du concept est dans « Mon schéma » ;
- `exercice_visuel` : j'ai fait et corrigé les exercices visuels de la section 3 ;
- `fil_rouge` : je l'ai appliqué dans le fil rouge (coché tout seul quand une étape qui l'utilise est réussie).

Les trois cochées : la notion compte comme **comprise**. **Maîtrisé** : c'est moi qui le mets dans `status`, quand je le sens.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
