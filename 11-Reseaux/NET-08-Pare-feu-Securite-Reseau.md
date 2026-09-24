---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M11
tags:
  - reseaux/securite
aliases:
  - "Pare-feu et Sécurité Réseau"
parent: "[[Réseaux]]"
children: []
related_theory:
  - "[[SEC-01-Fondamentaux-Securite|Fondamentaux de la Sécurité]]"
  - "[[SEC-09-HTTPS-TLS|HTTPS et TLS]]"
related_snippets:
  - "[[04_Snippets/net-08-pare-feu-securite-reseau]]"
related_projects: []
source: "https://fr.wikipedia.org/wiki/Pare-feu_(informatique)"
---

# Pare-feu et Sécurité Réseau

> [!abstract] Introduction
> Un pare-feu filtre le trafic réseau selon des règles (IP, port, protocole) ; avec la segmentation (réseaux privés), les VPN et les WAF, il limite ce qui est exposé de ton infrastructure.

> [!warning]- Prérequis
> [[NET-02-Adresses-IP-Ports|Adresses IP et Ports]]

---

## Théorie

> [!question]- C'est quoi ?
> - **Pare-feu réseau** (iptables/nftables, ufw, security groups cloud) : autorise/refuse par IP/port
> - **WAF** (Web Application Firewall) : filtre au niveau HTTP (injections, bots)
> - **Segmentation** : BDD dans un réseau privé, seul le reverse proxy est public
> - **VPN / bastion** : accès administrateur sécurisé
> - **Protection DDoS** : CDN, rate limiting

> [!example]- Analogie
> Le pare-feu est le poste de garde à l'entrée d'un site industriel : il ne laisse entrer que les véhicules attendus, par la bonne porte.

> [!question]- Pourquoi l'utiliser ?
> Réduire la surface d'attaque : un PostgreSQL ou un Redis exposé sur Internet est trouvé et attaqué en quelques heures.

> [!question]- Comment ça marche ?
> ```mermaid
> flowchart LR
>   I((Internet)) -->|"443 uniquement"| RP["Reverse proxy / WAF<br/>(réseau public)"]
>   RP -->|"3000 interne"| API["API"]
>   API -->|"5432 interne"| DB[(PostgreSQL)]
>   ADM["Admin"] -->|"VPN / SSH bastion"| RP
> ```
> Règle par défaut : tout refuser, ouvrir le strict nécessaire.

> [!question]- Quand l'utiliser ?
> Tout déploiement, y compris un simple VPS de projet perso.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Le pare-feu ne protège pas des failles applicatives passant par le port 443 autorisé.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Pare-feu | Filtre de trafic réseau |
| WAF | Pare-feu applicatif HTTP |
| Bastion | Serveur d'accès administrateur unique |
| Security group | Pare-feu virtuel du cloud |
| DMZ | Zone exposée séparée du réseau interne |

---

## Points clés

- Seuls 80/443 publics
- BDD et cache en réseau privé
- Accès SSH par clé, idéalement via VPN/bastion
- Deny by default

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - `ports: "5432:5432"` dans un docker-compose de production exposé publiquement

---

## Exemple minimal

```bash
sudo ufw default deny incoming
sudo ufw allow OpenSSH
sudo ufw allow 443/tcp
sudo ufw enable
```

> [!note] Ce que j'en retiens
> Un VPS sécurisé de base en 4 commandes.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Concevoir un VPC avec sous-réseaux publics/privés et règles minimales

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Réseaux]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/net-08-pare-feu-securite-reseau]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi la base de données ne doit-elle jamais être dans un réseau public ?

---

## Tâches

- [ ] #task Sécuriser le VPS de déploiement de CinéTrack (ufw, SSH par clé)
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
