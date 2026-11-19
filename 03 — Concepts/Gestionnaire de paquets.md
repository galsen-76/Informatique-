---
type: concept
domain: terminal
module: "[[Module 02 - Terminal et environnement]]"
status: en-cours
level: debutant
prerequisites:
  - "[[Permissions Linux]]"
parents: []
related:
  - "[[pip]]"
  - "[[npm]]"
next_review: 
method: []
tags:
  - concept
  - terminal
---
# Gestionnaire de paquets

> [!info] En une phrase
> L'outil qui installe, met à jour et désinstalle les logiciels d'un système depuis des dépôts de confiance (apt sous Ubuntu, winget sous Windows).

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
Un **gestionnaire de paquets** télécharge des logiciels depuis des **dépôts** et gère leurs dépendances. Il y en a pour les systèmes et pour les langages :

| Niveau | Outil |
| --- | --- |
| Ubuntu / Debian (WSL, beaucoup d'images Docker) | `apt` |
| Alpine (petites images Docker) | `apk` |
| Windows | `winget` |
| Python | [[pip]] |
| Node.js | [[npm]] |

### Pourquoi ça existe
Installer un logiciel en une commande, toujours depuis la même source, et tout mettre à jour d'un coup.

### Le problème résolu
Chercher des installateurs sur des sites web, gérer les dépendances à la main.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  U[apt update] --> L[Liste à jour]
  L --> I[apt install]
  I --> D[(Dépôt)]
```

### Exemple concret
```bash
sudo apt update              # met à jour la LISTE des paquets disponibles
sudo apt upgrade             # met à jour les paquets installés
sudo apt install tree zip    # installer
apt search unzip             # chercher
sudo apt remove tree         # désinstaller
```
Dans un Dockerfile basé sur Debian :
```dockerfile
RUN apt-get update && apt-get install -y --no-install-recommends zip \
 && rm -rf /var/lib/apt/lists/*
```
Dans un script ou un Dockerfile, on écrit **`apt-get`** plutôt que `apt` : même travail, mais une sortie stable faite pour les scripts (`apt` est fait pour un humain devant le terminal). Détail dans [[apt]].
```powershell
winget install Python.Python.3.12    # sous Windows
```

### Cas d'utilisation
- Installer des outils dans WSL (`zip`, `tree`, `jq`)
- Les lignes `RUN apt-get install` des Dockerfile de CVAT (en entreprise, elles passent par le [[Nexus]] ou un [[Proxy]])

> [!warning] À ne pas confondre
> `apt update` (rafraîchit la liste, n'installe rien) et `apt upgrade` (installe les mises à jour). Et `apt` (paquets du **système**) avec `pip` (paquets **Python**).

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin avec mes mots (section 4).

> [!example] 🛣️ Suis le trajet
> Dessine `apt install curl` : ta commande, le dépôt de paquets, les dépendances téléchargées, l'installation.

> [!example] 🔄 Change de contexte
> Refais le dessin pour `apk add` dans une image Alpine construite dans la CI GitLab, derrière le proxy. Où ça bloque ?

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Gestionnaire de paquets » et je l'intègre ici avec `![[Schéma - Gestionnaire de paquets.excalidraw]]`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : je l'applique dans mon travail (CVAT, Nuclio) ou je demande une étape à Claude.

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _J'explique mon schéma avec mes mots, sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Permissions Linux]]
- **Complémentaires** : [[pip]] · [[npm]]
- **Commandes** : [[apt]]

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
