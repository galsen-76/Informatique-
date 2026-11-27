---
type: concept
module: "[[Module 18 - Linux et serveurs]]"
related:
  - "[[Journaux système]]"
  - "[[Démon Docker]]"
tags:
  - concept
  - linux
---
# Service (systemd)

> [!info] En une phrase
> Un programme qui tourne en permanence en arrière-plan sur un serveur (base de données, serveur web, Docker), démarré et surveillé par systemd.

## 1 · Comprendre
### Définition
**systemd** est le premier programme lancé par Linux ; il démarre et surveille les **services** (*units*). Chaque service est décrit par un fichier `.service` et piloté avec `systemctl` : démarrer, arrêter, redémarrer, activer au démarrage.

### Pourquoi ça existe
Un serveur doit relancer ses applications au démarrage et après un plantage, sans humain.

### Le problème résolu
Lancer des programmes à la main dans un terminal, qui s'arrêtent quand on se déconnecte.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  S[systemd] --> D[docker]
  S --> N[nginx]
  S --> P[postgresql]
  D --> J[journald]
```

### Exemple concret
```bash
systemctl status docker            # état, PID, dernières lignes de journal
sudo systemctl restart docker
sudo systemctl enable --now nginx  # démarrer maintenant et à chaque démarrage
systemctl list-units --type=service --state=running
```
Un service à soi : `/etc/systemd/system/zipper.service`
```ini
[Unit]
Description=Script de zip
[Service]
ExecStart=/usr/bin/python3 /opt/zipper/zipper.py /data
User=deploy
Restart=on-failure
[Install]
WantedBy=multi-user.target
```
puis `sudo systemctl daemon-reload && sudo systemctl enable --now zipper`.

### Cas d'utilisation
- Le démon Docker est un service systemd
- Faire tourner une application sans Docker sur un serveur

> [!warning] À ne pas confondre
> `start` (maintenant) et `enable` (au prochain démarrage) : il faut souvent les deux. Dans WSL, systemd doit être activé (`/etc/wsl.conf` : `[boot]` puis `systemd=true`) ; dans un **conteneur**, il n'y a pas de systemd : le conteneur lance un seul processus.

## 3 · Relier
- **Prérequis** : [[Processus]] · [[Utilisateur et groupe]]
- **Complémentaires** : [[Journaux système]] · [[Démon Docker]]
- **Commandes** : [[systemctl]] · [[journalctl]]
