---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M07
tags:
  - reseaux/fondamentaux
aliases:
  - "Fondamentaux Réseaux Modèles OSI et TCP IP"
parent: "[[Réseaux]]"
children:
  - "[[NET-02-Adresses-IP-Ports|Adresses IP et Ports]]"
  - "[[NET-03-TCP-vs-UDP|TCP vs UDP]]"
  - "[[NET-04-DNS|DNS]]"
  - "[[NET-05-HTTP-Approfondi|HTTP Approfondi]]"
related_theory: []
related_snippets:
  - "[[04_Snippets/net-01-fondamentaux-osi-tcp-ip]]"
related_projects: []
source: "https://developer.mozilla.org/fr/docs/Learn/Common_questions/Web_mechanics/How_does_the_Internet_work"
---

# Fondamentaux Réseaux Modèles OSI et TCP IP

> [!abstract] Introduction
> Un réseau fait circuler des données entre machines en couches successives ; les modèles OSI (7 couches, théorique) et TCP/IP (4 couches, réel) expliquent comment une requête HTTP voyage de ton navigateur jusqu'au serveur.

---

## Théorie

> [!question]- C'est quoi ?
> | TCP/IP | OSI | Rôle | Exemples |
> |---|---|---|---|
> | Application | 7-6-5 Application, Présentation, Session | Données de l'application | HTTP, DNS, TLS, SSH, SMTP |
> | Transport | 4 Transport | Communication entre processus (ports) | TCP, UDP |
> | Internet | 3 Réseau | Adressage et routage entre réseaux | IP, ICMP |
> | Accès réseau | 2-1 Liaison, Physique | Transmission locale | Ethernet, Wi-Fi, MAC |

> [!example]- Analogie
> Envoyer un colis : tu écris la lettre (application), tu la mets dans une enveloppe avec numéro de bureau (port/transport), le transporteur ajoute l'adresse postale (IP), puis le camion livre physiquement (liaison/physique). Chaque couche ajoute son emballage (encapsulation).

> [!question]- Pourquoi l'utiliser ?
> Diagnostiquer « ça ne marche pas » : DNS ? port fermé ? TLS ? CORS ? Un full stack doit savoir à quelle couche chercher.

> [!question]- Comment ça marche ?
> ```mermaid
> flowchart LR
>   A["HTTP : GET /api/films"] --> B["TCP : port 443, segments, accusés"]
>   B --> C["IP : 192.0.2.10 → 203.0.113.5"]
>   C --> D["Ethernet/Wi-Fi : trames"]
>   D -->|"routeurs d'Internet"| E["Serveur : désencapsulation inverse"]
> ```

> [!question]- Quand l'utiliser ?
> Chaque fois qu'un problème de connexion, de latence ou de déploiement apparaît.

> [!danger]- Quand NE PAS l'utiliser / Limites
> OSI est un modèle pédagogique : dans la réalité, les couches 5-6-7 sont fusionnées dans les protocoles applicatifs.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Protocole | Règles de communication |
| Encapsulation | Ajout d'en-têtes à chaque couche |
| Paquet | Unité de données IP |
| Routeur | Équipement qui achemine entre réseaux |
| Latence | Temps de trajet d'un message |

---

## Points clés

- 4 couches TCP/IP à connaître
- HTTP repose sur TCP (ou QUIC/UDP pour HTTP/3) qui repose sur IP
- Chaque couche a ses outils de diagnostic

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Confondre un problème DNS (nom introuvable) et un problème HTTP (404)

---

## Exemple minimal

```bash
nslookup cinetrack.fr     # couche application (DNS)
ping cinetrack.fr         # couche réseau (ICMP)
nc -zv cinetrack.fr 443   # couche transport (port ouvert ?)
curl -v https://cinetrack.fr/api/health   # application (TLS + HTTP)
```

> [!note] Ce que j'en retiens
> Diagnostiquer couche par couche, de bas en haut.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Lire une capture Wireshark d'une requête HTTPS (handshake TCP puis TLS)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Réseaux]]
- Sous-sujets → [[NET-02-Adresses-IP-Ports|Adresses IP et Ports]], [[NET-03-TCP-vs-UDP|TCP vs UDP]], [[NET-04-DNS|DNS]], [[NET-05-HTTP-Approfondi|HTTP Approfondi]]
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/net-01-fondamentaux-osi-tcp-ip]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - À quelle couche se trouve TCP ? et HTTP ?

> [!faq]- Questions d'entretien
> - Que se passe-t-il quand on tape une URL dans le navigateur ?

---

## Tâches

- [ ] #task Suivre le cours « How does the Internet work » (MDN) puis expliquer le trajet d'une requête à voix haute
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
