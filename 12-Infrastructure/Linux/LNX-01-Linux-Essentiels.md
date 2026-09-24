---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M11
tags:
  - infra/linux
aliases:
  - "Linux Essentiels"
parent: "[[Infrastructure]]"
children:
  - "[[LNX-02-Permissions-Processus-Services|Permissions Processus et Services Linux]]"
related_theory:
  - "[[OUT-01-Terminal-Bash|Terminal et Bash]]"
related_snippets:
  - "[[04_Snippets/lnx-01-linux-essentiels]]"
related_projects: []
source: "https://linuxjourney.com/"
---

# Linux Essentiels

> [!abstract] Introduction
> Linux fait tourner l'immense majorité des serveurs et toutes les images Docker : arborescence, utilisateurs, paquets et commandes de base sont indispensables pour déployer et déboguer.

> [!warning]- Prérequis
> [[OUT-01-Terminal-Bash|Terminal et Bash]]

---

## Théorie

> [!question]- C'est quoi ?
> Arborescence :
> | Dossier | Contenu |
> |---|---|
> | `/etc` | Configuration |
> | `/var/log` | Logs |
> | `/home` | Dossiers utilisateurs |
> | `/usr/bin` | Programmes |
> | `/tmp` | Temporaire |
> | `/srv`, `/opt` | Applications |
> Distributions : Debian/Ubuntu (`apt`), Alpine (`apk`, images Docker légères), RHEL/Rocky (`dnf`).

> [!example]- Analogie
> Linux est un immeuble de bureaux bien rangé : chaque étage a sa fonction (config, logs, programmes), et chaque bureau a son propriétaire et ses clés (permissions).

> [!question]- Pourquoi l'utiliser ?
> Écrire des Dockerfiles, lire des logs en recette, comprendre les erreurs de permissions, administrer un VPS.

> [!question]- Comment ça marche ?
> ```bash
> sudo apt update && sudo apt install -y nginx
> df -h          # espace disque
> du -sh *       # taille des dossiers
> free -h        # mémoire
> top / htop     # processus et CPU
> journalctl -u nginx -f     # logs d'un service systemd
> tail -f /var/log/nginx/error.log
> ```

> [!question]- Quand l'utiliser ?
> Serveurs, conteneurs, WSL2 sur Windows.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Les images Alpine utilisent musl et `sh` (pas `bash`) : certaines commandes/paquets diffèrent.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Distribution | Variante de Linux (Ubuntu, Alpine) |
| Paquet | Logiciel installable |
| sudo | Exécuter en administrateur |
| systemd | Gestionnaire de services |

---

## Points clés

- Config dans `/etc`, logs dans `/var/log`
- `df -h` et `free -h` en premier réflexe d'incident
- `journalctl` pour les services

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Disque plein (logs, images Docker) → application qui plante sans message clair

---

## Exemple minimal

```bash
docker system df          # espace pris par Docker
sudo du -sh /var/lib/docker
```

> [!note] Ce que j'en retiens
> Un serveur « qui plante tout seul » a souvent un disque plein.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Automatiser la maintenance (logrotate, nettoyage Docker, mises à jour de sécurité)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Infrastructure]]
- Sous-sujets → [[LNX-02-Permissions-Processus-Services|Permissions Processus et Services Linux]]
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/lnx-01-linux-essentiels]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Où chercher la configuration d'Nginx ? ses logs ?

---

## Tâches

- [ ] #task Installer WSL2 (si Windows) et faire Linux Journey (Command line, Text-fu)
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
