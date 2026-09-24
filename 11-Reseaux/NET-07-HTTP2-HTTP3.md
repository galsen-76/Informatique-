---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M07
tags:
  - reseaux/http2
aliases:
  - "HTTP2 et HTTP3"
parent: "[[Réseaux]]"
children: []
related_theory:
  - "[[NET-05-HTTP-Approfondi|HTTP Approfondi]]"
  - "[[NET-03-TCP-vs-UDP|TCP vs UDP]]"
related_snippets:
  - "[[04_Snippets/net-07-http2-http3]]"
related_projects: []
source: "https://developer.mozilla.org/fr/docs/Glossary/HTTP_2"
---

# HTTP2 et HTTP3

> [!abstract] Introduction
> HTTP/2 multiplexe plusieurs requêtes sur une seule connexion TCP et compresse les en-têtes ; HTTP/3 remplace TCP par QUIC (UDP) pour réduire encore la latence — la sémantique (méthodes, statuts) ne change pas.

> [!warning]- Prérequis
> [[NET-05-HTTP-Approfondi|HTTP Approfondi]], [[NET-03-TCP-vs-UDP|TCP vs UDP]]

---

## Théorie

> [!question]- C'est quoi ?
> | | HTTP/1.1 | HTTP/2 | HTTP/3 |
> |---|---|---|---|
> | Transport | TCP | TCP | QUIC (UDP) |
> | Requêtes parallèles | ~6 connexions/domaine | Multiplexage sur 1 connexion | Multiplexage sans blocage |
> | En-têtes | Texte | Binaire compressé (HPACK) | QPACK |
> | Chiffrement | Optionnel | De fait obligatoire (navigateurs) | Intégré |

> [!example]- Analogie
> HTTP/1.1 : une caisse = un client à la fois. HTTP/2 : une caisse qui scanne les articles de plusieurs clients en alternance. HTTP/3 : si un article tombe, les autres clients ne sont pas bloqués.

> [!question]- Pourquoi l'utiliser ?
> Comprendre pourquoi certaines optimisations de l'époque HTTP/1 (concaténer tous les fichiers, sprites, domain sharding) sont moins utiles, et configurer correctement serveur et CDN.

> [!question]- Comment ça marche ?
> Activé côté serveur/CDN (Nginx `http2`, la plupart des CDN et load balancers gèrent HTTP/3). Rien à changer dans le code Angular/Vue/Nest.

> [!question]- Quand l'utiliser ?
> Toujours activer HTTP/2 minimum en production.

> [!danger]- Quand NE PAS l'utiliser / Limites
> HTTP/2 sur TCP souffre encore du head-of-line blocking au niveau TCP en cas de pertes (résolu par HTTP/3).

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Multiplexage | Plusieurs flux sur une connexion |
| Head-of-line blocking | Un paquet perdu bloque les suivants |
| QUIC | Protocole de transport sur UDP |

---

## Points clés

- Même sémantique HTTP
- Multiplexage = moins de connexions
- Activé au niveau infrastructure

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Garder des optimisations HTTP/1 contre-productives

---

## Exemple minimal

```text
DevTools > Network > clic droit sur les colonnes > « Protocol » : h2 / h3
```

> [!note] Ce que j'en retiens
> Vérifier le protocole réellement utilisé en production.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Mesurer l'impact réel (WebPageTest) plutôt que supposer

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Réseaux]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/net-07-http2-http3]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Qu'est-ce que le multiplexage HTTP/2 ?

---

## Tâches

- [ ] #task Vérifier le protocole utilisé par les sites de l'entreprise
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
