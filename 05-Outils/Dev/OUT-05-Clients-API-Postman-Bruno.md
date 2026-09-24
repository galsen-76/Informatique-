---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M07
tags:
  - outils/api
aliases:
  - "Clients API Postman Bruno curl"
parent: "[[Outils]]"
children: []
related_theory:
  - "[[ARCH-04-API-REST-Design|API REST Design]]"
  - "[[NET-05-HTTP-Approfondi|HTTP Approfondi]]"
related_snippets:
  - "[[04_Snippets/out-05-clients-api-postman-bruno]]"
related_projects: []
source: "https://www.usebruno.com/"
---

# Clients API Postman Bruno curl

> [!abstract] Introduction
> Un client API (Postman, Bruno, Insomnia, curl, fichiers `.http`) permet d'envoyer des requêtes HTTP à un backend sans passer par le front — indispensable pour développer et déboguer une API.

> [!warning]- Prérequis
> [[NET-05-HTTP-Approfondi|HTTP Approfondi]]

---

## Théorie

> [!question]- C'est quoi ?
> ```bash
> curl -i http://localhost:3000/api/films
> curl -X POST http://localhost:3000/api/films \
>   -H "Content-Type: application/json" -H "Authorization: Bearer $TOKEN" \
>   -d '{"titre":"Dune","annee":2021}'
> ```
> ```http
> ### films.http (VS Code REST Client / IntelliJ HTTP Client)
> @base = http://localhost:3000/api
> GET {{base}}/films?page=1
> ###
> POST {{base}}/films
> Content-Type: application/json
>
> { "titre": "Dune", "annee": 2021 }
> ```

> [!example]- Analogie
> Tester une API avec le front, c'est tester un moteur en conduisant la voiture ; un client API, c'est mettre le moteur sur un banc d'essai.

> [!question]- Pourquoi l'utiliser ?
> Isoler un problème (front ou back ?), tester des cas d'erreur, documenter des exemples de requêtes partageables.

> [!question]- Comment ça marche ?
> - Collections versionnées (Bruno stocke en fichiers texte dans le dépôt, idéal avec Git)
> - Environnements (local, recette) avec variables
> - Scripts pour récupérer automatiquement un token

> [!question]- Quand l'utiliser ?
> Pendant tout le développement d'une API, et pour reproduire un bug remonté par le front.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Ne remplace pas les tests automatisés.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Collection | Ensemble de requêtes enregistrées |
| Environnement | Jeu de variables (URL, token) |
| `.http` | Format texte de requêtes HTTP |

---

## Points clés

- `curl -i` affiche aussi les en-têtes
- Collections versionnées avec le code
- Variables d'environnement pour ne pas dupliquer

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Commiter des tokens réels dans les collections

---

## Exemple minimal

```bash
curl -s http://localhost:3000/api/films | jq '.[].titre'
```

> [!note] Ce que j'en retiens
> `curl` + `jq` : inspection rapide d'une API depuis le terminal.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Tests de collection automatisés en CI (Bruno CLI, Newman)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Outils]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/out-05-clients-api-postman-bruno]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi tester l'API sans le front ?

---

## Tâches

- [ ] #task Créer une collection Bruno/`.http` pour l'API CinéTrack
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
