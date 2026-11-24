---
type: exercise
status: a-faire
niveau: 6
difficulty: facile
concepts:
  - "[[Docker Compose]]"
  - "[[CORS]]"
tags:
  - exercice
  - mini-projet
---
# MesDépenses 13 - Angular dans compose

> [!info] Où tu en es
> **Projet :** [[Projet - MesDépenses]] · **Étape précédente :** [[MesDépenses Front 09 - Le front Angular dans Docker]]
> **Déjà fait une fois :** [[MesDépenses Front 05 - Tout lancer avec compose]]
> **Notions :** [[Docker Compose]] · [[CORS]] · [[Variable d'environnement]]

## Le but
`docker compose up` lance la base, l'API et les **deux** fronts. Une dépense ajoutée dans Vue apparaît dans Angular, et l'inverse.

## Ce que tu fais
- [ ] Ajoute le service `front-angular` sur le port 8081
- [ ] Les deux fronts doivent pouvoir appeler l'API : règle CORS pour les deux origines, sans toucher au code de l'API
- [ ] Ajoute une dépense depuis Vue, recharge Angular : elle est là ? Supprime-la depuis Angular, recharge Vue
- [ ] Lance seulement la base et l'API, sans les fronts : quelle commande ?

> [!success] Ça marche si…
> Les deux fronts tournent ensemble et partagent les mêmes données.

> [!quote] Mes notes
> _Ce que j'ai retrouvé seul, ce que j'ai dû rechercher._

> [!question]- Indice
> Ta variable d'origines CORS de l'étape 04 accepte-t-elle plusieurs valeurs ? Sinon, c'est le moment.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
