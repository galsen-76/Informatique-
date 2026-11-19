---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[API]]"
  - "[[Endpoint]]"
  - "[[Méthode HTTP]]"
  - "[[Code de statut HTTP]]"
  - "[[En-tête HTTP]]"
tags:
  - exercice
---
# Exercice — Explorer une API avec curl

> [!info] Objectif
> Parler HTTP à la main pour voir chaque morceau d'un échange.
> Notions : [[API]] · [[Endpoint]] · [[Méthode HTTP]] · [[Code de statut HTTP]] · [[En-tête HTTP]]

## Consignes
- [ ] Avec `curl -i`, lis `https://jsonplaceholder.typicode.com/todos/1` : note le code, trois en-têtes de réponse et le corps
- [ ] Liste les todos de l'utilisateur 2 avec un paramètre de requête, limités à 3
- [ ] Crée un todo avec POST (corps JSON et bon `Content-Type`) : quel code obtiens-tu ?
- [ ] Modifie-le avec PATCH puis supprime-le avec DELETE
- [ ] Provoque un 404, puis appelle `https://api.github.com/user` sans jeton : quel code, et pourquoi ?
- [ ] Avec `curl -v`, repère les en-têtes que curl envoie lui-même
- [ ] Écris dans un tableau : endpoint, méthode, entrée, code attendu, pour chaque appel

> [!question]- Indice
> `-X` choisit la méthode, `-H` ajoute un en-tête, `-d` envoie un corps, `-i` affiche les en-têtes de réponse, `-s` cache la barre de progression.

> [!question]- Solution
> ```bash
> curl -i https://jsonplaceholder.typicode.com/todos/1
> curl -s "https://jsonplaceholder.typicode.com/todos?userId=2&_limit=3"
> curl -i -X POST https://jsonplaceholder.typicode.com/todos -H "Content-Type: application/json" -d '{"title":"zip","completed":false}'   # 201
> curl -i -X PATCH https://jsonplaceholder.typicode.com/todos/1 -H "Content-Type: application/json" -d '{"completed":true}'          # 200
> curl -i -X DELETE https://jsonplaceholder.typicode.com/todos/1                                                                    # 200
> curl -i https://jsonplaceholder.typicode.com/todos/99999                                                                          # 404
> curl -i https://api.github.com/user                                                                                               # 401 : pas authentifié
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
