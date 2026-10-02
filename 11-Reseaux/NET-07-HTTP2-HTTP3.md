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

## Pourquoi ça marche

En HTTP/1.1, une connexion ne transporte **qu'une requête à la fois** : les navigateurs ouvraient donc plusieurs connexions, et les développeurs regroupaient les fichiers pour en faire moins.

HTTP/2 **découpe** chaque requête en petits morceaux et les mélange sur une seule connexion : plusieurs requêtes avancent en même temps (*multiplexage*). Mais il reste sur TCP : si **un** paquet se perd, TCP bloque **tout** en attendant son renvoi.

HTTP/3 passe sur QUIC (UDP), qui gère chaque flux séparément : une perte ne bloque que sa propre requête. La connexion n'est pas liée à l'adresse IP, d'où sa survie au passage du Wi-Fi à la 4G.

## Contre-exemple

**Intuition fausse : « avec HTTP/2, il faut toujours regrouper les fichiers pour aller plus vite ».**

```text
HTTP/1.1 : 1 gros bundle de 2 Mo = mieux que 50 petits fichiers
HTTP/2   : 50 petits fichiers passent en parallèle sur une connexion
```

Avec HTTP/2, découper le code par page (lazy loading) est souvent **meilleur** : chaque page ne télécharge que ce qu'elle utilise, et ce qui n'a pas changé reste en cache.

## Vérifie sans tes notes

Réponds de tête, à voix haute ou par écrit, **avant** d’ouvrir la réponse.

**1. Quelle est la principale amélioration de HTTP/2 par rapport à HTTP/1.1 ?**

> [!check]- Réponse
> Plusieurs requêtes passent en même temps sur une seule connexion.

**2. Quel problème de HTTP/2 HTTP/3 résout-il ?**

> [!check]- Réponse
> Avec TCP, un paquet perdu bloque toute la connexion ; avec QUIC, il ne bloque que sa requête.

**3. Faut-il modifier ton code Angular pour profiter de HTTP/2 ?**

> [!check]- Réponse
> Non : c'est le serveur ou l'hébergeur qui l'active.

## Exercices

> [!info] Comment t’entraîner
> 1. Cherche seul, sans regarder la note.
> 2. Bloqué ? Ouvre l’**indice 1**, puis l’**indice 2**.
> 3. Seulement ensuite, la **solution**.
> 4. Referme tout et **refais l’exercice sans regarder**.

### Exercice 1 · Quelle version ?

Pour chaque phrase, dis si elle décrit HTTP/1.1, HTTP/2 ou HTTP/3 :
1. « Une requête à la fois par connexion. »
2. « Fonctionne sur QUIC. »
3. « Plusieurs requêtes sur une connexion, mais un paquet perdu bloque tout. »
4. « La connexion survit au passage du Wi-Fi à la 4G. »

> [!tip]- Indice 1
> Reprends le tableau de la note, ligne « Transport » et ligne « Un paquet perdu ».

> [!tip]- Indice 2
> QUIC et la survie au changement de réseau vont ensemble.

> [!success]- Solution
> 1. **HTTP/1.1**
> 2. **HTTP/3**
> 3. **HTTP/2**
> 4. **HTTP/3**

### Exercice 2 · Voir le protocole

Décris comment savoir, dans le navigateur, quelle version de HTTP utilise chaque requête de CinéTrack. Que signifient `h2` et `h3` ?

> [!tip]- Indice 1
> C'est dans l'onglet qui liste les requêtes.

> [!tip]- Indice 2
> La colonne n'est pas affichée par défaut : clic droit sur les en-têtes de colonnes.

> [!success]- Solution
> F12 → **Network** → clic droit sur les en-têtes de colonnes → cocher **Protocol**.
>
> - `h2` = HTTP/2
> - `h3` = HTTP/3
> - `http/1.1` = HTTP/1.1

### Transfert · L'astuce héritée

Un problème différent : il vérifie que tu as compris le principe, pas seulement l’exemple.

Un ancien projet regroupe toutes les icônes dans une seule image géante (*sprite*) et répartit les fichiers sur `static1.cinetrack.fr`, `static2.cinetrack.fr` et `static3.cinetrack.fr` pour charger plus vite. Le site est maintenant servi en HTTP/2. Ces astuces sont-elles encore utiles ? Explique.

> [!tip]- Indice 1
> Pourquoi ces astuces existaient-elles en HTTP/1.1 ?

> [!tip]- Indice 2
> Plusieurs domaines = plusieurs connexions à ouvrir (DNS, TCP, TLS pour chacune).

> [!success]- Solution
> **Non, elles sont devenues inutiles, voire nuisibles :**
> - elles contournaient la limite d'**une requête à la fois par connexion** de HTTP/1.1 ;
> - en HTTP/2, une seule connexion transporte tout en parallèle ;
> - plusieurs domaines obligent à faire **plusieurs** résolutions DNS et connexions TLS : c'est plus lent ;
> - un sprite géant oblige à tout retélécharger dès qu'une seule icône change.

## Je maîtrise quand…

Coche quand tu sais le faire **sans aide**. Une notion n’est maîtrisée que si les 6 cases sont cochées (voir [[Methode-du-coach|Méthode du coach]]).

- [ ] **Expliquer** : Expliquer ce que changent HTTP/2 et HTTP/3 avec l'image de la caisse
- [ ] **Rappeler** : Dire de mémoire le transport et la gestion des pertes de chaque version
- [ ] **Utiliser** : Vérifier la version utilisée dans le navigateur
- [ ] **Résoudre un problème nouveau** : Prévoir l'effet de HTTP/2 sur les techniques d'optimisation
- [ ] **Repérer les erreurs** : Repérer une ancienne astuce devenue nuisible
- [ ] **Savoir quand ne pas l’utiliser** : Savoir que ce n'est pas au code de l'application d'activer HTTP/2 ou HTTP/3
