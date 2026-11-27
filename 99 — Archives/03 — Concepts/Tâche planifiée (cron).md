---
type: concept
module: "[[Module 18 - Linux et serveurs]]"
related:
  - "[[Service (systemd)]]"
tags:
  - concept
  - linux
---
# Tâche planifiée (cron)

> [!info] En une phrase
> cron lance automatiquement une commande à heures fixes (chaque nuit, chaque lundi, toutes les 5 minutes).

## 1 · Comprendre
### Définition
Chaque utilisateur a une **crontab** : une ligne par tâche, avec 5 champs de date puis la commande.
```text
┌ minute (0-59)
│ ┌ heure (0-23)
│ │ ┌ jour du mois (1-31)
│ │ │ ┌ mois (1-12)
│ │ │ │ ┌ jour de la semaine (0-7, 0 et 7 = dimanche)
│ │ │ │ │
0 2 * * *  /opt/zipper/run.sh >> /var/log/zipper.log 2>&1
```

### Pourquoi ça existe
Automatiser les tâches répétitives : sauvegardes, nettoyages, rapports.

### Le problème résolu
Oublier de lancer à la main la sauvegarde du soir.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  C[cron] --> H{Heure ?}
  H -- oui --> T[Commande]
  T --> L[Log]
```

| Expression | Sens |
| --- | --- |
| `*/5 * * * *` | toutes les 5 minutes |
| `0 2 * * *` | chaque jour à 2 h |
| `0 9 * * 1` | chaque lundi à 9 h |
| `0 0 1 * *` | le 1er du mois à minuit |

### Exemple concret
```bash
crontab -e      # modifier ses tâches
crontab -l      # les lister
```
Vérifie une expression sur crontab.guru.

### Cas d'utilisation
- Lancer ton script de zip chaque nuit
- Nettoyer les vieux fichiers d'export
- En CI, l'équivalent est une **pipeline planifiée** (*Build > Pipeline schedules*)

> [!warning] À ne pas confondre
> cron lance la commande avec un environnement **minimal** (peu de variables, `PATH` court, dossier `~`) : utilise des **chemins absolus** et redirige la sortie vers un fichier, sinon les erreurs disparaissent.

## 3 · Relier
- **Prérequis** : [[Script shell]] · [[Redirection et pipe]]
- **Complémentaires** : [[Service (systemd)]]
- **Commandes** : [[crontab]]
