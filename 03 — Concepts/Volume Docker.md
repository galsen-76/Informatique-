---
type: concept
domain: devops
module: "[[Module 13 - Docker]]"
status: a-decouvrir
level: debutant
prerequisites:
  - "[[Conteneur]]"
  - "[[Système de fichiers]]"
parents: []
related:
  - "[[Python dans Docker]]"
next_review: 
method: []
tags:
  - concept
  - devops
---
# Volume Docker

> [!info] En une phrase
> Un moyen de brancher un dossier dans un conteneur, pour qu'il lise tes fichiers ou garde ses données après sa suppression.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
Deux sortes de montages :
- **bind mount** : un dossier **de ta machine** apparaît dans le conteneur (`-v "$PWD/donnees:/data"`). Les deux voient les mêmes fichiers en direct.
- **volume nommé** : un espace géré par Docker (`-v pg-data:/var/lib/postgresql/data`), pour les données d'un service.

### Pourquoi ça existe
Un conteneur est jetable et isolé : sans montage, il ne voit pas tes fichiers et perd ce qu'il écrit.

### Le problème résolu
Copier les fichiers dans l'image à chaque fois (lent, et l'image change à chaque donnée), ou perdre la base de données quand on supprime le conteneur.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  H[Dossier hôte] --> M[Montage -v]
  M --> C[/data conteneur]
```
Syntaxe : `-v <hôte>:<conteneur>[:ro]`. Le chemin conteneur est **toujours absolu** (`/data`). `:ro` = lecture seule.

### Exemple concret
```bash
# Bash / Git Bash
docker run --rm -v "$PWD/donnees:/data" -v "$PWD/sortie:/out" mon-zipper /data --sortie /out/export.zip
```
```powershell
# PowerShell
docker run --rm -v "${PWD}\donnees:/data" -v "${PWD}\sortie:/out" mon-zipper /data --sortie /out/export.zip
```
Le script dans le conteneur ne connaît que `/data` et `/out` : il ne sait rien de `C:\Users\...`.

```bash
docker volume ls          # volumes nommés
docker volume rm pg-data  # supprime (définitif)
```

### Cas d'utilisation
- Donner un dossier à traiter à ton script Python, et récupérer l'archive produite
- Garder les données d'une base ou de CVAT entre deux redémarrages

> [!warning] À ne pas confondre
> `COPY` dans le Dockerfile (fichiers figés **dans l'image** au build) et `-v` (fichiers branchés **au lancement**). Et sous Linux, les fichiers créés par le conteneur dans un bind mount appartiennent souvent à `root`.

## 3 · Pratiquer
- Monte un dossier de test dans `python:3.12-slim` et liste son contenu avec `ls /data`.
- Crée un fichier depuis le conteneur dans le dossier monté, et retrouve-le sur ta machine.

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _À écrire sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Conteneur]] · [[Système de fichiers]]
- **Utilisé par** : [[Python dans Docker]] · [[Docker Compose]]
- **Commandes** : [[docker run]]

## 6 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
La notion est maîtrisée quand j'ai réussi **tous les exercices** qui l'utilisent (statut `reussi` dans l'exercice).

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
