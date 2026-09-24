---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M07
tags:
  - reseaux/dns
aliases:
  - "DNS"
parent: "[[Réseaux]]"
children: []
related_theory:
  - "[[NET-02-Adresses-IP-Ports|Adresses IP et Ports]]"
  - "[[CLOUD-02-Heberger-Front|Héberger un Front]]"
related_snippets:
  - "[[04_Snippets/net-04-dns]]"
related_projects: []
source: "https://developer.mozilla.org/fr/docs/Glossary/DNS"
---

# DNS

> [!abstract] Introduction
> Le DNS est l'annuaire d'Internet : il traduit un nom (`cinetrack.fr`) en adresse IP ; bien le comprendre évite des heures de débogage lors des déploiements.

> [!warning]- Prérequis
> [[NET-02-Adresses-IP-Ports|Adresses IP et Ports]]

---

## Théorie

> [!question]- C'est quoi ?
> Enregistrements courants :
> | Type | Rôle | Exemple |
> |---|---|---|
> | A / AAAA | Nom → IPv4 / IPv6 | `cinetrack.fr → 203.0.113.5` |
> | CNAME | Alias vers un autre nom | `www → cinetrack.fr` |
> | MX | Serveurs mail | — |
> | TXT | Texte (vérifications, SPF, DKIM) | — |
> | NS | Serveurs faisant autorité | — |
> **TTL** : durée de mise en cache d'une réponse.

> [!example]- Analogie
> Le répertoire de ton téléphone : tu appelles « Maman », le téléphone compose le numéro ; si elle change de numéro, il faut que le répertoire soit mis à jour partout (TTL).

> [!question]- Pourquoi l'utiliser ?
> Mise en ligne d'un domaine, sous-domaines (`api.`, `app.`), certificats TLS (validation DNS), bascule de serveur ; et Docker/Kubernetes utilisent un DNS interne (noms de services).

> [!question]- Comment ça marche ?
> Résolution : cache du navigateur → cache de l'OS → résolveur (FAI, 1.1.1.1) → serveurs racine → TLD (`.fr`) → serveur faisant autorité → réponse mise en cache pendant le TTL.
> Fichier `hosts` : surcharge locale (`127.0.0.1 cinetrack.local`).

> [!question]- Quand l'utiliser ?
> Chaque déploiement sur un nom de domaine ; chaque « ça marche chez moi mais pas chez lui ».

> [!danger]- Quand NE PAS l'utiliser / Limites
> La propagation dépend des TTL : baisser le TTL AVANT une migration.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Résolveur | Serveur qui cherche la réponse pour toi |
| TTL | Durée de cache |
| Zone | Ensemble des enregistrements d'un domaine |
| Serveur faisant autorité | Source officielle d'un domaine |

---

## Points clés

- A = IP, CNAME = alias
- TTL = cache ; le baisser avant un changement
- Docker Compose : les services se trouvent par leur nom via un DNS interne

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - « J'ai changé le DNS mais rien ne change » → cache/TTL
> - CNAME sur le domaine racine (non autorisé par la norme ; certains fournisseurs proposent ALIAS/ANAME)

---

## Exemple minimal

```bash
dig cinetrack.fr +short
dig api.cinetrack.fr CNAME
nslookup cinetrack.fr 1.1.1.1
```

> [!note] Ce que j'en retiens
> `dig` montre exactement ce que répond le DNS.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Stratégies de bascule (blue/green via DNS, GeoDNS)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Réseaux]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/net-04-dns]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Que signifie un TTL de 3600 ?

---

## Tâches

- [ ] #task Configurer un sous-domaine pour le portfolio
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
