---
type: exercise
status: a-faire
niveau: 1
difficulty: facile
concepts:
  - "[[Adresse IP]]"
  - "[[DNS]]"
  - "[[Port]]"
  - "[[TCP et UDP]]"
  - "[[HTTPS et TLS]]"
  - "[[Certificat]]"
  - "[[Proxy]]"
  - "[[En-tête HTTP]]"
  - "[[Internet]]"
  - "[[Routage et NAT]]"
tags:
  - exercice
  - mini-projet
---
# MesDépenses 02 - Suivre une requête sur le réseau

> [!info] Où tu en es
> **Projet :** [[Projet - MesDépenses]] · **Niveau :** 1 · **Étape précédente :** [[MesDépenses 01 - Prendre l'API en main]]
> **Notions :** [[Adresse IP]] · [[DNS]] · [[Port]] · [[TCP et UDP]] · [[HTTPS et TLS]] · [[Certificat]] · [[Proxy]] · [[En-tête HTTP]] · [[Internet]] · [[Routage et NAT]]

## Le but
Quand « ça ne répond pas », savoir dire **où** ça bloque : le nom, l'adresse, le port, le certificat ou le proxy. C'est le diagnostic que tu feras le plus souvent au travail.

> [!tip] Au travail
> Le tableau « message → cause » de cette étape te servira tel quel : c'est le premier réflexe quand un service, une CI ou un conteneur n'arrive pas à joindre quelque chose.

## Ce que tu fais
- [ ] Appelle ton API avec `curl -v` et lis chaque ligne : résolution du nom, connexion, requête envoyée, en-têtes reçus
- [ ] Trouve quel programme écoute sur le port 8000 et sur quelle adresse. Relance l'API sur une autre adresse d'écoute et compare ce qui reste joignable
- [ ] Résous à la main le nom d'un site public, puis appelle-le en HTTPS avec `curl -v` : repère le certificat, qui l'a signé, jusqu'à quand il est valable
- [ ] Regarde si ton terminal passe par un proxy (variables d'environnement). Appelle un site public avec et sans le proxy, et note ce qui change
- [ ] Provoque trois pannes et note le message exact de chacune : mauvais nom, mauvais port, API arrêtée. Range-les dans un petit tableau « message → cause »
- [ ] Trouve l'adresse IP de ton poste, celle de WSL (ou d'un conteneur) et la passerelle par laquelle tu sors. Explique pourquoi elles ne sont pas les mêmes

> [!warning] Les pièges
> - « Connection refused » et « timeout » ne veulent pas dire la même chose : l'un dit que la machine répond mais que personne n'écoute, l'autre que rien ne revient.
> - `localhost` n'est pas la même machine selon d'où tu appelles (Windows, WSL, conteneur).

> [!success] Ça marche si…
> Tu as ton tableau de trois pannes avec leur message, et tu sais dire pour chacune à quelle couche ça a bloqué (nom, connexion, port, HTTP).

> [!quote] Mes notes
> _Ce que j'ai compris, ce qui a coincé._

> [!question]- Indice
> Les outils à chercher dans [[Commandes]] : `curl -v`, `ss -ltnp`, `getent hosts` ou `nslookup`, `env | grep -i proxy`. La fiche [[Fiche - Lire un message d'erreur]] aide à lire les messages.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] Claude m'a donné trois pannes au hasard et j'ai trouvé la couche à chaque fois
