---
type: notion
statut: a apprendre
resume: "Une distribution Linux est un système complet construit autour du noyau Linux : outils, gestionnaire de paquets, réglages et rythme de mises à jour."
revu:
sources:
  - "https://ubuntu.com/about/release-cycle"
  - "https://www.debian.org/releases/"
---
# Distributions Linux

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Une **distribution** (« distro ») est un système complet construit autour du **noyau Linux** : les outils, un **gestionnaire de paquets**, des réglages par défaut et un rythme de mises à jour.

## Le problème

**Pourquoi c'est utile ?**
Pour savoir quelle « version de Linux » tu as devant toi (serveur, image Docker, WSL), quelles commandes y marchent, et choisir la bonne base pour une image ou un serveur.

**Qu'est-ce qui se passait sans ça ?**
Le noyau seul ne sert à rien : il fallait assembler soi-même des centaines de programmes, les compiler et les mettre à jour un par un. Les distributions font ce travail d'assemblage et de suivi des failles à ta place.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Toutes les distributions partagent **le même noyau** ; ce qui change, c'est ce qu'il y a autour. Les familles à reconnaître :

| Distribution | Famille | Paquets | Où tu la croises |
|---|---|---|---|
| **Debian** | Debian | `apt` | serveurs, base de beaucoup d'images Docker (`node:22`, `postgres:16`) |
| **Ubuntu** | Debian | `apt` | **WSL**, serveurs cloud, images Playwright (`…-noble` = Ubuntu 24.04) |
| **Red Hat Enterprise Linux (RHEL)** | Red Hat | `dnf` | grandes entreprises (support payant) |
| **Rocky Linux / AlmaLinux** | Red Hat | `dnf` | versions gratuites compatibles avec RHEL |
| **Alpine** | à part | `apk` | images Docker **minuscules** (`node:22-alpine`) |

**Le gestionnaire de paquets**, c'est le « npm du système » : il installe, met à jour et supprime les logiciels, avec leurs dépendances, depuis des dépôts officiels et signés.

```bash
sudo apt install curl      # Debian / Ubuntu
sudo dnf install curl      # RHEL / Rocky
apk add curl               # Alpine (souvent dans un Dockerfile)
```

**LTS (Long Term Support).** Les versions LTS d'Ubuntu (22.04, 24.04…) reçoivent des correctifs de sécurité pendant au moins 5 ans. Sur un serveur, on choisit **toujours une LTS** : on veut de la stabilité, pas les nouveautés.

## 🧪 Exemple

Savoir sur quelle distribution tu es (dans WSL, un conteneur ou un serveur) :

```bash
cat /etc/os-release
# NAME="Ubuntu"
# VERSION="24.04 LTS (Noble Numbat)"
```

Dans un Dockerfile, la ligne `FROM` choisit la distribution :

```dockerfile
FROM node:22           # Debian : complet, pratique pour déboguer
FROM node:22-alpine    # Alpine : beaucoup plus léger, mais quelques différences
```

## ⚠️ Limites et pièges

- **`apt` n'existe pas sur Alpine** : copier une commande d'un tutoriel Ubuntu dans un Dockerfile Alpine échoue (`apt: not found`). Utiliser `apk`.
- **Alpine utilise une autre bibliothèque C (musl)** : certains paquets npm avec du code natif (et les navigateurs de Playwright) posent problème. Dans le doute, prendre l'image Debian.
- **Ne pas mélanger les familles** dans une même procédure : les noms de paquets et chemins de configuration diffèrent.
- **Une distribution en fin de vie** ne reçoit plus de correctifs de sécurité : vérifier la date de fin de support.

## 🔗 Liens

- **Prérequis :** [[01 Système d'exploitation et noyau|Système d'exploitation et noyau]]
- **Voir aussi :** [[02 Pourquoi les serveurs tournent sous Linux|Pourquoi les serveurs tournent sous Linux]], [[03 Dockerfile|Dockerfile]], [[04 Linux fichiers et commandes essentielles|Linux fichiers et commandes essentielles]]
- **Utilisé dans :** le `FROM` de tes Dockerfile, ton WSL, l'`image:` de tes jobs GitLab CI

## 📚 Notes

- Source : https://ubuntu.com/about/release-cycle
- Source : https://www.debian.org/releases/
