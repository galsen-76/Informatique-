---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M07
tags:
  - securite/https
aliases:
  - "HTTPS et TLS"
parent: "[[Sécurité]]"
children: []
related_theory:
  - "[[NET-05-HTTP-Approfondi|HTTP Approfondi]]"
  - "[[NET-01-Fondamentaux-OSI-TCP-IP|Fondamentaux Réseaux Modèles OSI et TCP IP]]"
  - "[[NET-09-Proxy-Reverse-Proxy-Load-Balancer|Proxy Reverse Proxy et Load Balancer]]"
related_snippets:
  - "[[04_Snippets/sec-09-https-tls]]"
related_projects: []
source: "https://developer.mozilla.org/fr/docs/Glossary/HTTPS"
---

# HTTPS et TLS

> [!abstract] Introduction
> HTTPS = HTTP chiffré par TLS : il garantit la confidentialité (personne ne lit), l'intégrité (personne ne modifie) et l'authenticité du serveur (certificat) — obligatoire pour toute application.

> [!warning]- Prérequis
> [[NET-05-HTTP-Approfondi|HTTP Approfondi]]

---

## Théorie

> [!question]- C'est quoi ?
> - **Chiffrement asymétrique** (clé publique/privée) pour l'échange initial et l'authentification du serveur
> - **Chiffrement symétrique** (clé de session) pour les données, plus rapide
> - **Certificat** : lie un domaine à une clé publique, signé par une autorité de certification (CA) ; gratuit avec Let's Encrypt
> - **HSTS** : force le navigateur à toujours utiliser HTTPS

> [!example]- Analogie
> Envoyer une lettre dans un coffre fermé dont seul le destinataire a la clé, après avoir vérifié sa carte d'identité (certificat) signée par la préfecture (CA).

> [!question]- Pourquoi l'utiliser ?
> Sans HTTPS, mots de passe et tokens circulent en clair sur le wifi public ; les navigateurs bloquent de nombreuses fonctionnalités (cookies `Secure`, service workers, géolocalisation) hors HTTPS.

> [!question]- Comment ça marche ?
> ```mermaid
> sequenceDiagram
>   participant N as Navigateur
>   participant S as Serveur
>   N->>S: ClientHello (versions, algos)
>   S-->>N: ServerHello + certificat
>   N->>N: vérifie le certificat (CA, domaine, dates)
>   N->>S: échange de clé (ECDHE)
>   Note over N,S: clé de session partagée
>   N->>S: requêtes HTTP chiffrées
> ```
> En pratique : TLS terminé au reverse proxy (Nginx, Traefik, load balancer cloud) avec certificats automatiques.

> [!question]- Quand l'utiliser ?
> Toujours, y compris en recette. En local, `localhost` est considéré comme sûr par les navigateurs.

> [!danger]- Quand NE PAS l'utiliser / Limites
> HTTPS protège le transport, pas l'application (XSS, injection restent possibles), ni les données une fois arrivées.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| TLS | Protocole de chiffrement du transport |
| Certificat | Preuve d'identité d'un domaine |
| CA | Autorité de certification |
| HSTS | En-tête imposant HTTPS |
| Terminaison TLS | Point où le trafic est déchiffré |

---

## Points clés

- HTTPS partout
- Certificats automatisés (Let's Encrypt)
- HSTS en production
- TLS 1.2 minimum, idéalement 1.3

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Contenu mixte (ressources HTTP dans une page HTTPS)
> - Certificat expiré faute d'automatisation

---

## Exemple minimal

```nginx
server {
  listen 443 ssl;
  server_name cinetrack.fr;
  ssl_certificate /etc/letsencrypt/live/cinetrack.fr/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/cinetrack.fr/privkey.pem;
  add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
}
```

> [!note] Ce que j'en retiens
> Le reverse proxy porte le certificat et HSTS ; l'application derrière reste en HTTP interne.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Comprendre mTLS (authentification mutuelle entre services)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Sécurité]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/sec-09-https-tls]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi utilise-t-on à la fois du chiffrement asymétrique et symétrique ?

---

## Tâches

- [ ] #task Inspecter le certificat d'un site (cadenas) et tester un domaine sur SSL Labs
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
