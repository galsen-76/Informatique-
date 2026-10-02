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

## Pourquoi ça marche

Sur un serveur, il n'y a pas d'interface graphique : ces commandes sont tes yeux. `ss -tlnp` montre **qui écoute, sur quelle adresse et sur quel port** : c'est ce qui dit si un service est joignable de l'extérieur (`0.0.0.0`) ou seulement localement (`127.0.0.1`).

Le **tunnel SSH** fait passer une connexion à travers la connexion SSH déjà autorisée : on accède à un service interne sans ouvrir de nouveau port sur Internet.

## Contre-exemple

**Intuition fausse : « si `ss -tlnp` montre mon API sur `127.0.0.1:3000`, elle est mal configurée ».**

```text
LISTEN  0.0.0.0:443     nginx
LISTEN  127.0.0.1:3000  node
```

Sur un serveur **avec Nginx devant**, c'est exactement ce qu'on veut : seul Nginx (sur la même machine) joint l'API. Le problème n'apparaît que **dans un conteneur Docker**, où `127.0.0.1` n'est pas joignable depuis l'extérieur du conteneur.

## Pièges

- **Une application qui écoute sur `127.0.0.1` dans un conteneur Docker** : injoignable depuis l'extérieur du conteneur. Elle doit écouter sur `0.0.0.0`.
- **Perdre l'accès SSH** en activant le pare-feu sans avoir autorisé le port 22.

## Vérifie sans tes notes

Réponds de tête, à voix haute ou par écrit, **avant** d’ouvrir la réponse.

**1. Quelle commande montre quels programmes écoutent sur quels ports ?**

> [!check]- Réponse
> `ss -tlnp` (ou `lsof -i :port` pour un port précis).

**2. Quelle différence entre écouter sur `0.0.0.0:3000` et sur `127.0.0.1:3000` ?**

> [!check]- Réponse
> `0.0.0.0` accepte les connexions de toutes les interfaces (y compris l'extérieur) ; `127.0.0.1` seulement celles de la machine elle-même.

**3. À quoi sert `ssh -L 5433:localhost:5432 serveur` ?**

> [!check]- Réponse
> À créer un tunnel : `localhost:5433` chez toi mène à la base du serveur, sans ouvrir le port 5432 sur Internet.

## Exercices

> [!info] Comment t’entraîner
> 1. Cherche seul, sans regarder la note.
> 2. Bloqué ? Ouvre l’**indice 1**, puis l’**indice 2**.
> 3. Seulement ensuite, la **solution**.
> 4. Referme tout et **refais l’exercice sans regarder**.

### Exercice 1 · Un raccourci SSH

Crée l'entrée `~/.ssh/config` qui permet de taper `ssh recette` au lieu de `ssh -i ~/.ssh/id_ed25519 deploy@198.51.100.7`.

> [!tip]- Indice 1
> Il faut un bloc `Host` avec le nom court, puis l'adresse, l'utilisateur et la clé.

> [!tip]- Indice 2
> Les mots-clés : `HostName`, `User`, `IdentityFile`.

> [!success]- Solution
> ```text
> Host recette
>   HostName 198.51.100.7
>   User deploy
>   IdentityFile ~/.ssh/id_ed25519
> ```

### Exercice 2 · Lire `ss -tlnp`

Voici la sortie sur un serveur de production. Qu'est-ce qui pose problème ?

```text
LISTEN  0.0.0.0:443     nginx
LISTEN  0.0.0.0:22      sshd
LISTEN  0.0.0.0:5432    postgres
LISTEN  127.0.0.1:6379  redis
```

> [!tip]- Indice 1
> Quels services doivent être joignables de l'extérieur ?

> [!tip]- Indice 2
> `0.0.0.0` = toutes les interfaces, donc potentiellement Internet si le pare-feu laisse passer.

> [!success]- Solution
> **PostgreSQL écoute sur `0.0.0.0:5432`** : il est joignable de l'extérieur si le pare-feu le laisse passer. Il devrait écouter sur `127.0.0.1` (ou n'être joignable que sur le réseau privé), et le port 5432 doit être fermé au public.
>
> Nginx (443) et SSH (22) sur `0.0.0.0` sont normaux ; Redis sur `127.0.0.1` est correct.

### Transfert · Copier une sauvegarde

Un problème différent : il vérifie que tu as compris le principe, pas seulement l’exemple.

Tu dois récupérer sur ton PC le fichier `/var/backups/cinetrack.dump` du serveur `recette` (configuré dans `~/.ssh/config`), puis envoyer un fichier `seed.sql` de ton PC vers le dossier `/tmp` du serveur. Quelles commandes ?

> [!tip]- Indice 1
> La commande de copie à travers SSH s'appelle `scp` : `scp source destination`.

> [!tip]- Indice 2
> Un chemin distant s'écrit `hote:/chemin` ; le raccourci `recette` fonctionne aussi avec `scp`.

> [!success]- Solution
> ```bash
> scp recette:/var/backups/cinetrack.dump .
> scp seed.sql recette:/tmp/
> ```

## Je maîtrise quand…

Coche quand tu sais le faire **sans aide**. Une notion n’est maîtrisée que si les 6 cases sont cochées (voir [[Methode-du-coach|Méthode du coach]]).

- [ ] **Expliquer** : Expliquer ce que montrent `ss -tlnp` et la différence entre 0.0.0.0 et 127.0.0.1
- [ ] **Rappeler** : Dire de mémoire les commandes pour voir ses IP, les ports ouverts, tester un port, faire une requête
- [ ] **Utiliser** : Se connecter, copier des fichiers et créer un tunnel SSH sans aide
- [ ] **Résoudre un problème nouveau** : Prévoir si un service est joignable de l'extérieur en lisant `ss -tlnp`
- [ ] **Repérer les erreurs** : Repérer une base exposée ou une règle de pare-feu qui coupe SSH
- [ ] **Savoir quand ne pas l’utiliser** : Savoir quand ne pas ouvrir un port : utiliser un tunnel SSH à la place
