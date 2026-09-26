---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M07
tags:
  - reseaux/http2
aliases:
  - "HTTP2 et HTTP3"
parent: "[[Réseaux]]"
related_theory:
  - "[[NET-05-HTTP-Approfondi|HTTP Approfondi]]"
  - "[[NET-03-TCP-vs-UDP|TCP vs UDP]]"
related_projects: []
source: "https://developer.mozilla.org/fr/docs/Glossary/HTTP_2"
---

# HTTP/2 et HTTP/3

> [!abstract] En bref
> HTTP a évolué pour aller plus vite, sans changer ce que tu écris : les méthodes, codes et en-têtes restent les mêmes. **HTTP/2** fait passer **plusieurs requêtes en même temps** sur une seule connexion. **HTTP/3** fonctionne sur un nouveau transport (QUIC) plus rapide, surtout sur mobile. C'est l'hébergeur qui les active : tu dois surtout savoir ce qu'ils changent.

## Les trois versions

| | HTTP/1.1 | HTTP/2 | HTTP/3 |
|---|---|---|---|
| Transport | TCP | TCP | **QUIC (sur UDP)** |
| Plusieurs requêtes à la fois | non (une à la fois par connexion) | **oui**, sur une seule connexion | oui |
| En-têtes | texte, répétés à chaque fois | compressés | compressés |
| Un paquet perdu | bloque la connexion | bloque **toute** la connexion (TCP) | ne bloque que sa requête |
| Chiffrement | optionnel | en pratique obligatoire | **intégré** |
| Changement de réseau (Wi-Fi → 4G) | reconnexion | reconnexion | la connexion **survit** |

## L'image

- **HTTP/1.1** : une caisse de supermarché où chaque client passe **l'un après l'autre**.
- **HTTP/2** : une caisse qui traite **plusieurs paniers en parallèle** ; mais si un article bloque, toute la caisse attend.
- **HTTP/3** : chaque panier a sa propre file ; un blocage ne gêne que lui.

## Ce que ça change pour toi

- **Les anciennes astuces sont inutiles, voire nuisibles** : regrouper toutes les images dans une seule (sprites), répartir les fichiers sur plusieurs domaines… HTTP/2 gère très bien les nombreux petits fichiers.
- Le **découpage du code par page** (lazy loading) devient encore plus intéressant.
- Ton **serveur ou hébergeur** active HTTP/2 et HTTP/3 (Nginx, Cloudflare, Netlify le font souvent par défaut). Ton code Angular / Vue / NestJS ne change pas.

## Voir la version utilisée

F12 → Network → clic droit sur les en-têtes de colonne → cocher **Protocol** : `h2` = HTTP/2, `h3` = HTTP/3.
