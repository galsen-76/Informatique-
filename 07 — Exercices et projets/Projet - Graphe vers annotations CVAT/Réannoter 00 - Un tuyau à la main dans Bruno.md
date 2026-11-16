---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[Annotations dans l'API CVAT]]"
tags:
  - exercice
  - mini-projet
---
# Réannoter 00 - Un tuyau à la main dans Bruno

> [!info] Où tu en es
> **Projet :** [[Projet - Réannoter un job CVAT depuis le graphe]]
> **Cours à avoir lu :** [[Cours - Du graphe JSON aux annotations CVAT par l'API]] (parties 1 à 3)
> **Notions validées par cette étape :** [[Annotations dans l'API CVAT]]

## Le but
Faire les 4 étapes du script **à la main**, dans Bruno, pour un seul tuyau. Tu sauras ensuite exactement ce que le code doit faire.

## Ce que tu fais
- [ ] `GET /api/labels?job_id={{jobId}}` : note l'id du label `tuyau` et l'id de son attribut `debut`. Combien de labels au total ? Tous sont-ils dans la réponse ?
- [ ] `GET /api/jobs/{{jobId}}/annotations` : trouve un tuyau du folio qui t'intéresse. Note son `id`, son `frame` et ses `attributes`
- [ ] `PATCH .../annotations?action=create` avec **un** tuyau : `points` = `[100.0, 400.0, 300.0, 284.53]`, `debut` = `"true"`. Regarde le job dans CVAT : combien de tuyaux maintenant ?
- [ ] `PATCH .../annotations?action=delete` avec l'ancien tuyau, recopié **tel quel** depuis le `GET`. Regarde le job
- [ ] Renvoie ton tuyau avec `"value": true` (sans guillemets), puis avec `axe` = `"W"` : lis les erreurs

> [!warning] Le piège de cette étape
> `create` ajoute **par-dessus** : sans `delete`, l'ancien tuyau reste. Et les valeurs d'attributs sont toujours du texte.

> [!success] Ça marche si…
> Le folio n'a plus que ton tuyau, de (100, 400) à (300, 284.53), avec `debut` coché.

> [!quote] Mes notes
> _Les ids trouvés, les erreurs rencontrées._

> [!question]- Indice
> Si tous les labels ne sont pas dans la réponse, regarde `count` et `next` : ajoute `&page_size=100`.
