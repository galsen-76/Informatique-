---
type: notion
statut: a apprendre
resume: "Sous Linux, chaque fichier a des droits (qui peut lire, écrire, exécuter), chaque programme en cours est un processus, et les programmes qui tournent en permanence (Nginx, PostgreSQL, Docker) sont des services."
revu:
sources:
  - "https://linuxjourney.com/lesson/file-permissions"
---
# Linux permissions processus et services

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Sous Linux, chaque fichier a des **droits** (qui peut lire, écrire, exécuter), chaque programme en cours est un **processus**, et les programmes qui tournent en permanence (Nginx, PostgreSQL, Docker) sont des **services**.

## Le problème

**Pourquoi c'est utile ?**
Pour comprendre qui peut faire quoi sur un fichier, et gérer les programmes qui tournent.

**Qu'est-ce qui se passait sans ça ?**
Des « Permission denied » incompréhensibles, et des services qu'on ne savait ni redémarrer ni surveiller.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Trois choses à savoir manipuler quand tu gères un serveur ou déboques un conteneur.

### Les permissions

```bash
ls -l deploy.sh
-rwxr-x---  1 ubuntu devs  512 sept. 26  deploy.sh
 └┬┘└┬┘└┬┘    └─┬──┘ └─┬┘
  │  │  │       │      └ groupe
  │  │  │       └ propriétaire
  │  │  └ les autres : rien
  │  └ le groupe : lire, exécuter
  └ le propriétaire : lire, écrire, exécuter
```

| Lettre | Droit | Sur un fichier | Sur un dossier |
|---|---|---|---|
| `r` | lire | voir le contenu | lister |
| `w` | écrire | modifier | créer / supprimer dedans |
| `x` | exécuter | lancer comme programme | entrer dedans |

```bash
chmod +x deploy.sh          # rendre exécutable
chmod 600 ~/.ssh/id_ed25519 # clé privée : lisible par toi seul (sinon SSH refuse)
chmod 644 index.html        # lecture pour tous, écriture pour toi
sudo chown ubuntu:ubuntu fichier   # changer le propriétaire
```

En chiffres : `r=4`, `w=2`, `x=1`, additionnés par groupe : `755` = `rwxr-xr-x`.

### Les processus

| Commande | Rôle |
|---|---|
| `ps aux \| grep node` | trouver un processus |
| `htop` | vue en direct (CPU, mémoire) |
| `kill <PID>` | demander l'arrêt |
| `kill -9 <PID>` | forcer l'arrêt (en dernier recours) |
| `lsof -i :3000` | quel processus utilise ce port |
| `commande &` / `nohup commande &` | lancer en arrière-plan |

### Les utilisateurs

- **Ne travaille pas en `root`** sur un serveur : crée un utilisateur et utilise `sudo` quand il faut.
- Dans une image Docker : `USER node` pour que l'application ne tourne pas en administrateur.
- `whoami` : qui suis-je ? `id` : mes groupes.

## 🧪 Exemple

### Les services (systemd)

```bash
sudo systemctl status nginx      # état
sudo systemctl start nginx       # démarrer
sudo systemctl stop nginx        # arrêter
sudo systemctl restart nginx     # redémarrer
sudo systemctl reload nginx      # relire la configuration sans couper
sudo systemctl enable nginx      # démarrer automatiquement au boot
journalctl -u nginx -f           # suivre les logs du service
```

Avec Docker, tes applications sont gérées par Docker (`restart: unless-stopped` dans Compose) : systemd sert surtout pour Docker lui-même, Nginx, etc.

## ⚠️ Limites et pièges

- **`chmod 777`** pour « régler » un problème de droits : tout le monde peut tout faire. Donne le droit minimal.
- **« Permission denied »** en lançant un script : il manque `chmod +x`, ou le fichier a des fins de ligne Windows.
- **`kill -9` en premier réflexe** : le programme n'a pas le temps de se fermer proprement (fichiers, connexions).

## 🔗 Liens

- **Prérequis :** [[01 Linux fichiers et commandes essentielles|Linux fichiers et commandes essentielles]]
- **Voir aussi :** [[03 Dockerfile|Dockerfile]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://linuxjourney.com/lesson/file-permissions
