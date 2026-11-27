---
type: concept
module: "[[Module 18 - Linux et serveurs]]"
related: []
tags:
  - concept
  - linux
---
# Lien symbolique

> [!info] En une phrase
> Un raccourci vers un autre fichier ou dossier : on l'utilise comme l'original.

## 1 · Comprendre
### Définition
Un **lien symbolique** (*symlink*) est un petit fichier qui contient le chemin d'un autre. Ouvrir le lien ouvre la cible. Si la cible disparaît, le lien est **cassé**.

### Pourquoi ça existe
Avoir un même fichier accessible à plusieurs endroits, ou basculer d'une version à une autre en changeant un seul lien.

### Le problème résolu
Copier des fichiers à plusieurs endroits et devoir garder les copies à jour.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  L[current] --> V2[app-v2]
  V1[app-v1]
```

### Exemple concret
```bash
ln -s /opt/app-v2 /opt/current     # current → app-v2
ls -l /opt/current                 # lrwxrwxrwx … current -> /opt/app-v2
ln -sfn /opt/app-v1 /opt/current   # revenir à v1 (retour arrière instantané)
ls -l /usr/bin/python3             # souvent un lien vers python3.12
```

### Cas d'utilisation
- Déployer une nouvelle version et revenir en arrière en une commande
- Comprendre pourquoi `python3` pointe vers une version précise

> [!warning] À ne pas confondre
> Lien **symbolique** (`ln -s`, un chemin, peut être cassé) et lien **physique** (`ln`, un second nom pour les mêmes données). Supprimer le lien (`rm lien`) ne supprime pas la cible.

## 3 · Relier
- **Prérequis** : [[Arborescence Linux]]
- **Commandes** : [[ln]]
