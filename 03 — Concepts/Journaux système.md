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
  S --> V[/var/log]
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
- Arrête un service, provoque une erreur de configuration, et retrouve la cause dans `journalctl`.

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _À écrire sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Service (systemd)]] · [[Arborescence Linux]]
- **Complémentaires** : [[Journaliser avec logging]] · [[Redirection et pipe]]
- **Commandes** : [[journalctl]] · [[tail]] · [[less]]

## 6 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
- [ ] Je l'explique sans notes, en 3 phrases, à quelqu'un qui ne connaît pas
- [ ] J'ai réussi un exercice qui l'utilise
- [ ] Je l'ai utilisé dans un projet
- [ ] Je sais dire quand ne pas l'utiliser (ou ce qu'il ne faut pas confondre)
