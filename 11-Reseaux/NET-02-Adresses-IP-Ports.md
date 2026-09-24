---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M07
tags:
  - reseaux/ip-ports
aliases:
  - "Adresses IP et Ports"
parent: "[[Réseaux]]"
children: []
related_theory:
  - "[[NET-01-Fondamentaux-OSI-TCP-IP|Fondamentaux Réseaux Modèles OSI et TCP IP]]"
  - "[[DK-05-Reseaux|Réseaux Docker]]"
related_snippets:
  - "[[04_Snippets/net-02-adresses-ip-ports]]"
related_projects: []
source: "https://fr.wikipedia.org/wiki/Adresse_IP"
---

# Adresses IP et Ports

> [!abstract] Introduction
> Une adresse IP identifie une machine sur un réseau, un port identifie un service sur cette machine : `192.168.1.10:5432` = PostgreSQL sur la machine .10.

> [!warning]- Prérequis
> [[NET-01-Fondamentaux-OSI-TCP-IP|Fondamentaux Réseaux Modèles OSI et TCP IP]]

---

## Théorie

> [!question]- C'est quoi ?
> - **IPv4** : `192.168.1.10` (32 bits, ~4 milliards d'adresses), **IPv6** : `2001:db8::1` (128 bits)
> - **Privées** : `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16` (non routables sur Internet) ; **publiques** : routables
> - `127.0.0.1` / `localhost` : la machine elle-même ; `0.0.0.0` (serveur) : écouter sur toutes les interfaces
> - **CIDR** : `192.168.1.0/24` = 256 adresses du même sous-réseau
> - **NAT** : la box traduit les IP privées en une IP publique
> - **Ports** (0-65535) : 22 SSH, 53 DNS, 80 HTTP, 443 HTTPS, 5432 PostgreSQL, 6379 Redis, 3000/4200/5173 serveurs de dev

> [!example]- Analogie
> L'IP est l'adresse de l'immeuble, le port est le numéro de l'appartement : le facteur (réseau) trouve l'immeuble, puis la bonne porte.

> [!question]- Pourquoi l'utiliser ?
> Configurer une API, Docker (`-p 8080:80`), un pare-feu, comprendre « connexion refusée » ou « l'API marche en local mais pas depuis le conteneur ».

> [!question]- Comment ça marche ?
> Un serveur « écoute » sur une IP et un port ; le client se connecte depuis un port éphémère aléatoire. Dans un conteneur, `localhost` désigne le CONTENEUR lui-même, pas ta machine.

> [!question]- Quand l'utiliser ?
> Configuration réseau, Docker, déploiement, pare-feu.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Une IP peut changer (DHCP, conteneurs) → utiliser des noms (DNS, noms de services Docker).

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| IP | Adresse d'une machine |
| Port | Numéro identifiant un service |
| CIDR | Notation d'un bloc d'adresses |
| NAT | Traduction d'adresses privées en publique |
| Loopback | Adresse locale 127.0.0.1 |

---

## Points clés

- localhost dans un conteneur = le conteneur
- Écouter sur 0.0.0.0 pour être joignable depuis l'extérieur du conteneur
- Ne jamais exposer 5432/6379 sur Internet

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - API NestJS qui écoute sur 127.0.0.1 dans Docker → injoignable
> - « EADDRINUSE » : port déjà utilisé par un autre processus

---

## Exemple minimal

```bash
lsof -i :3000          # qui utilise le port 3000 ? (macOS/Linux)
ss -tlnp               # ports en écoute (Linux)
netstat -ano | findstr :3000   # Windows
```

> [!note] Ce que j'en retiens
> « Port déjà utilisé » se diagnostique en une commande.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Calculer des sous-réseaux, concevoir un VPC (réseaux privés/publics)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Réseaux]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/net-02-adresses-ip-ports]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi `localhost` dans un conteneur ne désigne-t-il pas ta machine ?

---

## Tâches

- [ ] #task Lister les ports en écoute sur ta machine pendant que tu lances Angular, Vue et l'API
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
