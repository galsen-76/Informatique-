---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[Internet]]"
  - "[[Client-serveur]]"
  - "[[HTTP]]"
tags:
  - exercice
---
# Exercice — Suivre une requête web

> [!info] Objectif
> Observer ce qui se passe vraiment quand le navigateur charge une page.
> Notions : [[Internet]] · [[Client-serveur]] · [[HTTP]]

## Consignes
- [ ] Ouvre les outils de développement du navigateur (F12), onglet *Réseau*, et charge une page web
- [ ] Pour la première requête, note la méthode, l'URL, le code de statut et deux en-têtes de réponse
- [ ] Refais la même requête en ligne de commande avec `curl -i` (dans WSL) et compare
- [ ] Provoque un code 404 et explique qui (client ou serveur) l'a décidé
- [ ] Explique en 3 phrases le trajet de la requête de ton PC au serveur et retour

> [!question]- Indice
> Dans `curl -i`, la première ligne de la réponse contient le code de statut. Une URL qui n'existe pas sur un site existant donne un 404.

> [!question]- Solution
> ```bash
> curl -i https://example.com/
> # HTTP/2 200 … en-têtes (content-type, date…) puis le HTML
> curl -i https://example.com/page-qui-nexiste-pas   # 404 décidé par le serveur
> ```
> Trajet : le client résout le nom (DNS), ouvre une connexion vers le serveur, envoie une requête HTTP ; le serveur répond avec un code et un contenu.

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
