---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M07
tags:
  - reseaux/transport
aliases:
  - "TCP vs UDP"
parent: "[[Réseaux]]"
children: []
related_theory:
  - "[[NET-01-Fondamentaux-OSI-TCP-IP|Fondamentaux Réseaux Modèles OSI et TCP IP]]"
  - "[[NET-07-HTTP2-HTTP3|HTTP2 et HTTP3]]"
related_snippets:
  - "[[04_Snippets/net-03-tcp-vs-udp]]"
related_projects: []
source: "https://developer.mozilla.org/fr/docs/Glossary/TCP"
---

# TCP vs UDP

> [!abstract] Introduction
> TCP garantit une livraison fiable et ordonnée (connexion, accusés de réception, retransmission) ; UDP envoie sans garantie mais plus vite — le web classique repose sur TCP, la vidéo en direct, le DNS et HTTP/3 sur UDP.

> [!warning]- Prérequis
> [[NET-02-Adresses-IP-Ports|Adresses IP et Ports]]

---

## Théorie

> [!question]- C'est quoi ?
> | | TCP | UDP |
> |---|---|---|
> | Connexion | Oui (poignée de main 3 temps) | Non |
> | Fiabilité | Accusés, retransmission | Aucune |
> | Ordre | Garanti | Non garanti |
> | Vitesse/latence | Plus lent à établir | Minimal |
> | Usages | HTTP/1.1-2, SSH, BDD | DNS, visio, jeux, streaming, QUIC (HTTP/3) |

> [!example]- Analogie
> TCP : lettre recommandée avec accusé de réception. UDP : carte postale — rapide, pas chère, mais tu ne sais pas si elle arrive.

> [!question]- Pourquoi l'utiliser ?
> Comprendre les coûts de connexion (d'où keep-alive, pools de connexions BDD, HTTP/2), et pourquoi HTTP/3 passe sur UDP.

> [!question]- Comment ça marche ?
> ```mermaid
> sequenceDiagram
>   participant C as Client
>   participant S as Serveur
>   C->>S: SYN
>   S-->>C: SYN-ACK
>   C->>S: ACK
>   Note over C,S: connexion établie, puis handshake TLS, puis HTTP
> ```

> [!question]- Quand l'utiliser ?
> Presque tout en web = TCP ; temps réel tolérant aux pertes = UDP.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Chaque nouvelle connexion TCP + TLS coûte plusieurs allers-retours → réutiliser les connexions.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Handshake | Poignée de main d'établissement |
| SYN / ACK | Messages d'ouverture / d'accusé |
| Retransmission | Renvoi d'un segment perdu |
| QUIC | Transport moderne sur UDP (HTTP/3) |

---

## Points clés

- TCP = fiable et ordonné
- UDP = rapide sans garantie
- Réutiliser les connexions (keep-alive, pools)

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Ouvrir une nouvelle connexion BDD par requête HTTP

---

## Exemple minimal

```text
Latence 50 ms : TCP (1 aller-retour) + TLS 1.3 (1 aller-retour) + requête (1) ≈ 150 ms avant la première donnée
```

> [!note] Ce que j'en retiens
> D'où l'intérêt de garder les connexions ouvertes et de rapprocher les serveurs (CDN).

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Comprendre le head-of-line blocking et ce que résout QUIC

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Réseaux]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/net-03-tcp-vs-udp]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi le DNS utilise-t-il principalement UDP ?

---

## Tâches

- [ ] #task Observer le handshake TCP dans Wireshark
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
