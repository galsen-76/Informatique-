---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M11
tags:
  - infra/linux
aliases:
  - "Linux Essentiels"
parent: "[[Infrastructure]]"
related_theory:
  - "[[OUT-01-Terminal-Bash|Terminal et Bash]]"
related_projects: []
source: "https://linuxjourney.com/"
---

# Linux Essentiels

> [!abstract] En bref
> Les serveurs, les conteneurs Docker et la CI tournent sous **Linux**, et tu travailles dans WSL : savoir t'y repérer est indispensable. Cette note complète [[OUT-01-Terminal-Bash|Terminal et Bash]] avec ce qu'il faut pour **se débrouiller sur un serveur** : l'arborescence, lire des fichiers, installer, éditer.

## L'arborescence

Tout part de `/` (pas de `C:`).

| Dossier | Contient |
|---|---|
| `/home/ton-nom` (`~`) | tes fichiers |
| `/etc` | la configuration (`/etc/nginx/`, `/etc/hosts`) |
| `/var/log` | les logs du système et des services |
| `/var/lib` | les données des services (`/var/lib/postgresql`) |
| `/usr/bin` | les programmes |
| `/tmp` | fichiers temporaires (effacés au redémarrage) |
| `/opt` | logiciels installés à part |

Les fichiers commençant par `.` sont **cachés** (`.bashrc`, `.env`) : `ls -a` pour les voir.

## Lire des fichiers et des logs

| Commande | Rôle |
|---|---|
| `cat fichier` | tout afficher |
| `less fichier` | lire page par page (`q` pour quitter, `/mot` pour chercher) |
| `head -n 20` / `tail -n 50 fichier` | début / fin |
| `tail -f /var/log/nginx/error.log` | **suivre** un log en direct |
| `grep -i error app.log` | lignes qui contiennent « error » |
| `grep -rn "DATABASE_URL" .` | chercher dans tous les fichiers |
| `wc -l fichier` | compter les lignes |

## Éditer un fichier sur un serveur

`nano fichier` : simple. `Ctrl+O` puis `Entrée` pour enregistrer, `Ctrl+X` pour quitter.

(Tu croiseras `vim` : `i` pour écrire, `Échap` puis `:wq` pour enregistrer et quitter, `:q!` pour quitter sans enregistrer.)

## Installer des logiciels (Ubuntu / Debian)

```bash
sudo apt update                 # mettre à jour la liste des paquets
sudo apt install -y nginx       # installer
sudo apt upgrade -y             # mettre à jour ce qui est installé
apt search postgresql           # chercher
```

`sudo` = exécuter en administrateur (il demande ton mot de passe).

## Espace disque et mémoire

| Commande | Rôle |
|---|---|
| `df -h` | espace libre sur les disques |
| `du -sh *` | taille de chaque dossier ici |
| `free -h` | mémoire vive |
| `htop` (ou `top`) | processus et charge en direct |

## Archiver et transférer

```bash
tar -czf sauvegarde.tar.gz dossier/     # compresser
tar -xzf sauvegarde.tar.gz              # décompresser
scp fichier ubuntu@serveur:/tmp/        # copier vers un serveur
```

La suite : utilisateurs, droits, processus et services dans [[LNX-02-Permissions-Processus-Services|Permissions, processus et services]].

## Pièges

- **`sudo rm -rf`** : aucune corbeille, aucune confirmation.
- **Les majuscules comptent** : `Readme.md` et `README.md` sont deux fichiers différents.
- **Un espace dans un nom de fichier** : entoure-le de guillemets (`"mon fichier.txt"`).
