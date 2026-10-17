---
type: notion
statut: a apprendre
resume: "Les serveurs, les conteneurs Docker et la CI tournent sous Linux, et tu travailles dans WSL : savoir t'y repérer est indispensable."
revu:
sources:
  - "https://linuxjourney.com/"
---
# Linux fichiers et commandes essentielles

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Les serveurs, les conteneurs Docker et la CI tournent sous **Linux**, et tu travailles dans WSL : savoir t'y repérer est indispensable.

## Le problème

**Pourquoi c'est utile ?**
Pour se repérer sous Linux, là où tournent les serveurs, les conteneurs et la CI.

**Qu'est-ce qui se passait sans ça ?**
On était perdu dès qu'il fallait intervenir sur un serveur ou dans un conteneur.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Cette note complète [[Terminal et shell|Terminal et Bash]] avec ce qu'il faut pour **se débrouiller sur un serveur** : l'arborescence, lire des fichiers, installer, éditer.

### L'arborescence

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

### Lire des fichiers et des logs

| Commande | Rôle |
|---|---|
| `cat fichier` | tout afficher |
| `less fichier` | lire page par page (`q` pour quitter, `/mot` pour chercher) |
| `head -n 20` / `tail -n 50 fichier` | début / fin |
| `tail -f /var/log/nginx/error.log` | **suivre** un log en direct |
| `grep -i error app.log` | lignes qui contiennent « error » |
| `grep -rn "DATABASE_URL" .` | chercher dans tous les fichiers |
| `wc -l fichier` | compter les lignes |

### Éditer un fichier sur un serveur

`nano fichier` : simple. `Ctrl+O` puis `Entrée` pour enregistrer, `Ctrl+X` pour quitter.

(Tu croiseras `vim` : `i` pour écrire, `Échap` puis `:wq` pour enregistrer et quitter, `:q!` pour quitter sans enregistrer.)

### Espace disque et mémoire

| Commande | Rôle |
|---|---|
| `df -h` | espace libre sur les disques |
| `du -sh *` | taille de chaque dossier ici |
| `free -h` | mémoire vive |
| `htop` (ou `top`) | processus et charge en direct |

### Archiver et transférer

```bash
tar -czf sauvegarde.tar.gz dossier/     # compresser
tar -xzf sauvegarde.tar.gz              # décompresser
scp fichier ubuntu@serveur:/tmp/        # copier vers un serveur
```

La suite : utilisateurs, droits, processus et services dans [[Linux permissions processus et services|Permissions, processus et services]].

## 🧪 Exemple

### Installer des logiciels (Ubuntu / Debian)

```bash
sudo apt update                 # mettre à jour la liste des paquets
sudo apt install -y nginx       # installer
sudo apt upgrade -y             # mettre à jour ce qui est installé
apt search postgresql           # chercher
```

`sudo` = exécuter en administrateur (il demande ton mot de passe).

## ⚠️ Limites et pièges

- **`sudo rm -rf`** : aucune corbeille, aucune confirmation.
- **Les majuscules comptent** : `Readme.md` et `README.md` sont deux fichiers différents.
- **Un espace dans un nom de fichier** : entoure-le de guillemets (`"mon fichier.txt"`).

## 🔗 Liens

- **Prérequis :** 
- **Voir aussi :** [[Terminal et shell]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://linuxjourney.com/
