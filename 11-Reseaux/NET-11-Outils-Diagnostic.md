---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M07
tags:
  - reseaux/diagnostic
aliases:
  - "Outils de Diagnostic Réseau"
parent: "[[Réseaux]]"
children: []
related_theory:
  - "[[NET-01-Fondamentaux-OSI-TCP-IP|Fondamentaux Réseaux Modèles OSI et TCP IP]]"
  - "[[JS-12-Erreurs-Debug-DevTools|Gestion des Erreurs et DevTools]]"
related_snippets:
  - "[[04_Snippets/net-11-outils-diagnostic]]"
related_projects: []
source: "https://curl.se/docs/manual.html"
---

# Outils de Diagnostic Réseau

> [!abstract] Introduction
> Une boîte à outils pour diagnostiquer rapidement un problème réseau : ping, traceroute, dig, curl, nc, ss/netstat, et l'onglet Network des DevTools.

> [!warning]- Prérequis
> [[NET-01-Fondamentaux-OSI-TCP-IP|Fondamentaux Réseaux Modèles OSI et TCP IP]]

---

## Théorie

> [!question]- C'est quoi ?
> | Outil | Question | Exemple |
> |---|---|---|
> | `ping` | La machine répond-elle ? | `ping 8.8.8.8` |
> | `traceroute` / `tracert` | Par où passe le trafic ? | `traceroute cinetrack.fr` |
> | `dig` / `nslookup` | Que répond le DNS ? | `dig api.cinetrack.fr` |
> | `nc -zv` / `telnet` | Le port est-il ouvert ? | `nc -zv db 5432` |
> | `curl -v` | Que se passe-t-il en HTTP/TLS ? | `curl -v https://…/health` |
> | `ss -tlnp` / `netstat` | Qui écoute sur quel port ? | — |
> | `openssl s_client` | Quel certificat ? | `openssl s_client -connect site:443` |
> | DevTools Network | Détail des requêtes du navigateur | Timing, CORS, cache |

> [!example]- Analogie
> La trousse du médecin : stéthoscope, thermomètre, tensiomètre — chaque outil vérifie un organe précis.

> [!question]- Pourquoi l'utiliser ?
> « L'API ne répond pas » peut venir du DNS, du réseau, du port, du TLS, du proxy, de CORS ou de l'application : les outils permettent d'isoler la couche fautive en minutes.

> [!question]- Comment ça marche ?
> Démarche : DNS (`dig`) → joignabilité (`ping`, parfois bloqué) → port (`nc`) → TLS/HTTP (`curl -v`) → application (logs). Depuis un conteneur : `docker exec -it api sh` puis les mêmes outils.

> [!question]- Quand l'utiliser ?
> À chaque incident réseau ou de déploiement.

> [!danger]- Quand NE PAS l'utiliser / Limites
> ICMP (ping) est souvent bloqué par les pare-feux : un ping qui échoue ne prouve pas que le service est hors ligne.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| ICMP | Protocole utilisé par ping |
| Hop | Saut entre routeurs |
| Verbose | Mode détaillé (`-v`) |

---

## Points clés

- Diagnostiquer couche par couche
- `curl -v` montre DNS, connexion, TLS et HTTP
- Tester depuis l'endroit où le problème se produit (le conteneur)

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Conclure « serveur mort » parce que ping ne répond pas

---

## Exemple minimal

```bash
docker compose exec api sh -c "nc -zv db 5432 && curl -s localhost:3000/api/health"
```

> [!note] Ce que j'en retiens
> Depuis le conteneur de l'API : la base est-elle joignable et l'API répond-elle ?

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Utiliser `tcpdump`/Wireshark pour les cas complexes

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Réseaux]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/net-11-outils-diagnostic]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Quelle commande pour vérifier qu'un port est ouvert ?

---

## Tâches

- [ ] #task Créer une fiche « diagnostic réseau » dans 04_Snippets
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
