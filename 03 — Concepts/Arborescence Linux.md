---
type: concept
domain: linux
module: "[[Module 18 - Linux et serveurs]]"
status: a-decouvrir
level: debutant
prerequisites:
  - "[[Système de fichiers]]"
  - "[[Bash]]"
parents: []
related:
  - "[[Permissions Linux]]"
next_review: 
method: []
tags:
  - concept
  - linux
---
# Arborescence Linux

> [!info] En une phrase
> Sous Linux tout part d'une seule racine /, et chaque dossier système a un rôle précis (programmes, configuration, journaux, données).

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
Pas de `C:` ni de `D:` : un seul arbre qui part de `/`. Les disques et partitions sont **montés** dans un dossier de cet arbre.

| Dossier | Contient |
| --- | --- |
| `/home/oumar` (`~`) | tes fichiers |
| `/root` | le dossier de root |
| `/etc` | la **configuration** (texte) : `/etc/hosts`, `/etc/ssh/sshd_config` |
| `/var` | ce qui change : `/var/log` (journaux), `/var/lib` (données : Docker, bases) |
| `/usr/bin`, `/bin` | les programmes |
| `/usr/local` | ce que l'admin installe à la main |
| `/opt` | logiciels tiers |
| `/tmp` | temporaire, vidé au redémarrage |
| `/dev` | les périphériques (`/dev/null` : le trou noir) |
| `/proc` | infos sur les processus et le noyau |
| `/mnt`, `/media` | points de montage (WSL : `/mnt/c`) |

### Pourquoi ça existe
Toutes les distributions rangent pareil : tu sais où chercher sur n'importe quel serveur.

### Le problème résolu
Chercher au hasard où un logiciel met sa configuration ou ses journaux.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  R["/"] --> H[home]
  R --> E[etc]
  R --> V[var]
  R --> U[usr]
  V --> L[log]
```
« Tout est fichier » : un périphérique, un processus, une configuration se lisent comme des fichiers.

### Exemple concret
```bash
ls /
cat /etc/os-release
ls /var/log
df -h            # disques et où ils sont montés
du -sh ~/projets # taille d'un dossier
```

### Cas d'utilisation
- Trouver la configuration d'un service (`/etc/…`) et ses journaux (`/var/log/…`)
- Comprendre les chemins des Dockerfile (`/app`, `/usr/local/bin`)

> [!warning] À ne pas confondre
> `/` (la racine) et `~` (ton dossier personnel). Et `/home` (les dossiers des utilisateurs) avec `/root` (celui de l'administrateur).

## 3 · Pratiquer
- Pour chaque dossier du tableau, liste son contenu et écris en une phrase ce que tu y vois.

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _À écrire sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Système de fichiers]] · [[Bash]]
- **Complémentaires** : [[Permissions Linux]] · [[Lien symbolique]]
- **Commandes** : [[ls]] · [[df]] · [[du]] · [[find]]

## 6 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
La notion est maîtrisée quand j'ai réussi **tous les exercices** qui l'utilisent (statut `reussi` dans l'exercice).

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
