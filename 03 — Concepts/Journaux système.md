---
type: concept
domain: linux
module: "[[Module 18 - Linux et serveurs]]"
status: a-decouvrir
level: debutant
prerequisites:
  - "[[Service (systemd)]]"
parents: []
related:
  - "[[Journaliser avec logging]]"
next_review: 
method: []
tags:
  - concept
  - linux
---
# Journaux système

> [!info] En une phrase
> Les fichiers et le journal où le système et les services écrivent ce qu'ils font : la première chose à lire quand quelque chose ne marche pas.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
Deux endroits principaux :
- **journald** (systemd) : un journal central, lu avec `journalctl` ;
- **`/var/log/`** : des fichiers texte (`syslog`, `auth.log` pour les connexions, `nginx/error.log`…).
Les conteneurs, eux, ont leurs logs dans Docker (`docker logs`).

### Pourquoi ça existe
Comprendre après coup pourquoi un service a planté, qui s'est connecté, ce qui a changé.

### Le problème résolu
Deviner la cause d'une panne sans aucune trace.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  S[Services] --> J[journald]
  S --> V["/var/log"]
  C[Conteneurs] --> DL[docker logs]
```

### Exemple concret
```bash
journalctl -u docker --since "1 hour ago"    # un service, depuis une heure
journalctl -u nginx -f                        # suivre en direct
journalctl -p err -b                          # erreurs depuis le démarrage
sudo tail -f /var/log/auth.log                # connexions SSH
docker logs --tail 100 -f cvat_server
```
Méthode : partir de l'heure du problème, chercher la **première** erreur, pas la dernière.

### Cas d'utilisation
- Un service qui ne démarre pas : `systemctl status` puis `journalctl -u`
- Voir les tentatives de connexion SSH

> [!warning] À ne pas confondre
> Les logs **du système** (journalctl, /var/log) et ceux **d'un conteneur** (`docker logs`) : un conteneur n'écrit pas dans journald par défaut.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin avec mes mots (section 4).

> [!example] 🛣️ Suis le trajet
> Dessine où un service écrit ses messages et comment tu les retrouves : `/var/log`, `journalctl`, `docker logs`.

> [!example] 🔄 Change de contexte
> Ta fonction Nuclio plante. Redessine le chemin pour retrouver son message d'erreur. Où regardes-tu en premier ?

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Journaux système » et je l'intègre ici avec `![[Schéma - Journaux système.excalidraw]]`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : je l'applique dans mon travail (CVAT, Nuclio) ou je demande une étape à Claude.

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _J'explique mon schéma avec mes mots, sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Service (systemd)]] · [[Arborescence Linux]]
- **Complémentaires** : [[Journaliser avec logging]] · [[Redirection et pipe]]
- **Commandes** : [[journalctl]] · [[tail]] · [[less]]

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
