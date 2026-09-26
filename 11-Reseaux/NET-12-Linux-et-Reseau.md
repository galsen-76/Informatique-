---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M11
tags:
  - reseaux/linux
aliases:
  - "Linux et Réseau"
parent: "[[Réseaux]]"
related_theory:
  - "[[LNX-01-Linux-Essentiels|Linux Essentiels]]"
  - "[[NET-08-Pare-feu-Securite-Reseau|Pare-feu et Sécurité Réseau]]"
  - "[[NET-11-Outils-Diagnostic|Outils de Diagnostic Réseau]]"
related_projects: []
source: "https://wiki.archlinux.org/title/Network_configuration"
---

# Linux et Réseau

> [!abstract] En bref
> Les commandes Linux pour comprendre la situation réseau d'un serveur (ou de ton WSL) : quelles adresses il a, quels programmes écoutent sur quels ports, comment il résout les noms, et comment s'y connecter en SSH.

## Aide-mémoire

| Besoin | Commande |
|---|---|
| mes adresses IP | `ip a` (ou `hostname -I`) |
| qui écoute sur quels ports | `ss -tlnp` |
| qui utilise le port 3000 | `lsof -i :3000` |
| tester un port distant | `nc -zv serveur 5432` |
| résolution DNS | `dig cinetrack.fr`, `cat /etc/resolv.conf` |
| noms forcés localement | `cat /etc/hosts` |
| requête HTTP | `curl -v http://localhost:3000/health` |
| télécharger un fichier | `curl -LO <url>` ou `wget <url>` |
| route vers une destination | `traceroute cinetrack.fr` |
| règles du pare-feu | `sudo ufw status` |

## Lire `ss -tlnp`

```text
State   Local Address:Port   Process
LISTEN  0.0.0.0:443          nginx
LISTEN  127.0.0.1:3000       node
LISTEN  127.0.0.1:5432       postgres
```

- `0.0.0.0:443` : Nginx écoute **sur toutes les interfaces**, donc joignable de l'extérieur.
- `127.0.0.1:3000` : l'API écoute **seulement en local** ; seul Nginx sur la même machine peut la joindre. C'est ce qu'on veut.

## SSH : se connecter à un serveur

```bash
ssh ubuntu@203.0.113.10                     # se connecter
ssh -i ~/.ssh/id_ed25519 ubuntu@serveur     # avec une clé précise
scp dump.sql ubuntu@serveur:/tmp/           # copier un fichier vers le serveur
ssh -L 5433:localhost:5432 ubuntu@serveur   # tunnel : la base du serveur devient localhost:5433 chez toi
```

Le **tunnel SSH** est le bon moyen d'accéder à une base de production **sans l'exposer sur Internet**.

Configurer un raccourci dans `~/.ssh/config` :

```text
Host cinetrack
  HostName 203.0.113.10
  User ubuntu
  IdentityFile ~/.ssh/id_ed25519
```

Puis simplement `ssh cinetrack`.

## WSL et le réseau

- Un serveur lancé dans WSL (`npm run dev`) est accessible depuis le navigateur Windows sur `localhost`.
- Pour qu'un serveur soit joignable depuis ton téléphone (tester le responsive) : `npm run dev -- --host` puis l'IP de ton PC sur le réseau local.

Commandes Linux générales : [[LNX-01-Linux-Essentiels|Linux essentiels]].

## Pièges

- **Une application qui écoute sur `127.0.0.1` dans un conteneur Docker** : injoignable depuis l'extérieur du conteneur. Elle doit écouter sur `0.0.0.0`.
- **Perdre l'accès SSH** en activant le pare-feu sans avoir autorisé le port 22.
