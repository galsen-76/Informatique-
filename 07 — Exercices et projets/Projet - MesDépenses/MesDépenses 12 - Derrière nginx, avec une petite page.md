---
type: exercise
status: a-faire
niveau: 4
difficulty: moyen
concepts:
  - "[[Reverse proxy]]"
  - "[[HTTPS et TLS]]"
  - "[[Certificat]]"
  - "[[CORS]]"
  - "[[En-tête HTTP]]"
  - "[[Port]]"
tags:
  - exercice
  - mini-projet
---
# MesDépenses 12 - Derrière nginx, avec une petite page

> [!info] Où tu en es
> **Projet :** [[Projet - MesDépenses]] · **Niveau :** 4 · **Étape précédente :** [[MesDépenses 11 - Installer l'API sur un serveur]]
> **Notions :** [[Reverse proxy]] · [[HTTPS et TLS]] · [[Certificat]] · [[CORS]] · [[En-tête HTTP]] · [[Port]]

## Le but
Mettre l'API derrière un reverse proxy en HTTPS, et voir ses dépenses dans une page web toute simple. C'est l'architecture de presque toutes les applications web que tu croiseras.

> [!tip] Au travail
> Les erreurs CORS, de certificat et de reverse proxy sont parmi les plus fréquentes au travail : ici tu les provoques exprès pour les reconnaître.

## Ce que tu fais
- [ ] Ajoute un service nginx devant l'API : seul nginx est exposé, sur le port 443
- [ ] Crée un certificat (auto-signé pour commencer) et vérifie avec `curl -v` ce que le client en pense
- [ ] Fais une page HTML d'une vingtaine de lignes qui affiche le total par catégorie en appelant l'API
- [ ] Sers d'abord la page depuis une autre adresse que l'API : lis l'erreur CORS dans la console du navigateur
- [ ] Règle le problème de deux façons : en autorisant l'origine dans l'API, puis en servant la page et l'API par le même nginx. Laquelle garder ?
- [ ] Les logs de nginx montrent l'adresse du vrai client, pas celle du proxy

> [!warning] Les pièges
> - Le CORS se règle côté serveur, jamais dans la page.
> - Un certificat auto-signé chiffre, mais ne prouve pas qui est le serveur.

> [!success] Ça marche si…
> La page affiche les totaux en HTTPS, l'API n'est joignable que par nginx, et tu sais expliquer pourquoi l'erreur CORS a disparu.

> [!quote] Mes notes
> _Ce que j'ai compris, ce qui a coincé._

> [!question]- Indice
> `proxy_pass`, `proxy_set_header`, `openssl req -x509`. La fiche [[CORS]] explique l'origine et la requête preflight.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] Claude a relu ma configuration nginx
