---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[CSRF]]"
tags:
  - exercice
  - mini-projet
---
# Exercice - Le jeton CSRF de CVAT

> [!info] Où tu en es
> **Fiche à avoir lue :** [[CSRF]], surtout la partie « Dans CVAT »
> **Notion validée par cet exercice :** [[CSRF]]
> **Ce qu'il faut savoir déjà :** lancer une requête avec curl ([[curl]]). Rien d'autre.
> **Où le faire :** sur ton PC, avec ton CVAT local qui tourne (`http://localhost:8080`). Tu ne crées qu'un projet d'essai, que tu supprimes à la fin.

## Le but
Tu joues le rôle de l'interface CVAT, avec curl : tu te connectes par **session** (cookies), puis tu essaies de créer un projet `essai-csrf`. Tu dois comprendre, erreur après erreur, ce que Django vérifie, puis comparer avec la façon dont ta fonction Nuclio s'identifie.

## Ce que tu fais
- [ ] Connecte-toi avec curl sur `POST /api/auth/login` (corps JSON avec `username` et `password`) en **enregistrant les cookies** reçus dans un fichier `cookies.txt`. Ouvre ce fichier : quels cookies as-tu reçus ?
- [ ] Avec ces cookies, demande `GET /api/users/self`. Ça marche ? Pourquoi aucun jeton n'a été demandé ?
- [ ] Avant de lancer : écris ce que tu prévois. Puis, avec les mêmes cookies, crée un projet : `POST /api/projects` avec le corps `{"name": "essai-csrf"}`. Recopie le statut et le message
- [ ] Corrige la requête pour que le projet soit créé. Tu dois trouver la valeur à envoyer **toi-même**, dans `cookies.txt`
- [ ] Recommence avec une valeur de jeton inventée. Puis avec la bonne valeur, mais en ajoutant l'en-tête `Origin: http://piege.local`. Recopie les deux messages
- [ ] Sans aucun cookie, crée un deuxième projet `essai-basic` avec ton identifiant et ton mot de passe en Basic (`-u`). Faut-il un jeton CSRF ? Pourquoi est-ce sans danger ?
- [ ] Dans ton navigateur, sur l'interface CVAT, ouvre l'onglet **Réseau** des outils (F12) et fais une action qui modifie quelque chose (renommer une tâche, enregistrer des annotations). Trouve la requête, puis l'en-tête qui porte le jeton, et le cookie d'où il vient
- [ ] Supprime les deux projets d'essai avec curl (`DELETE /api/projects/<id>`), sans te tromper de projet

> [!warning] Les pièges de cet exercice
> - Lire la page d'erreur jusqu'au bout : Django dit **précisément** ce qui manque.
> - Le jeton CSRF et le cookie de session ne sont pas la même chose, et ne servent pas à la même chose.
> - La suppression aussi modifie des données.

> [!success] Ça marche si…
> Tu as obtenu les trois erreurs `403` (jeton manquant, jeton faux, origine refusée), puis un `201` pour chaque projet, et les deux projets d'essai sont supprimés.

## Est-ce que j'ai compris ?
Réponds en quelques mots, en dessous, ou demande à Claude de t'interroger.
1. Quel cookie dit à CVAT **qui** tu es, et lequel sert **seulement** contre le CSRF ?
2. Pourquoi le `GET /api/users/self` n'avait-il pas besoin du jeton ?
3. Un site piège peut faire envoyer ton cookie `sessionid` par ton navigateur. Pourquoi ne peut-il pas fournir le bon `X-CSRFToken` ?
4. Pourquoi l'appel en Basic n'a-t-il pas besoin de jeton CSRF ? Et ta fonction `convert-png`, est-elle concernée ?
5. En mode dev (interface sur `localhost:3000`), quelle erreur de cette liste obtenais-tu, et quel réglage l'a réglée ?
6. Si ton bouton appelle **l'API de CVAT** avec un `fetch` à toi (pas avec `cvat-core`), que doit-il ajouter pour un `POST` ?

> [!quote] Mes réponses
> _À écrire._

> [!question]- Indice
> curl enregistre les cookies avec `-c fichier` et les renvoie avec `-b fichier`. Dans `cookies.txt`, la valeur est la dernière colonne de la ligne. Le nom de l'en-tête attendu par CVAT est donné dans la fiche [[CSRF]]. Django ne vérifie le jeton que pour les méthodes qui modifient (`POST`, `PUT`, `PATCH`, `DELETE`) **et** quand tu es identifié par la session.

> [!question]- Solution
> ```bash
> CVAT=http://localhost:8080
> curl -s -c cookies.txt -H "Content-Type: application/json" \
>   -d '{"username": "MOI", "password": "MON_MDP"}' "$CVAT/api/auth/login"
> cat cookies.txt                                   # sessionid et csrftoken
>
> curl -s -b cookies.txt "$CVAT/api/users/self"     # marche : un GET ne modifie rien
>
> curl -s -b cookies.txt -H "Content-Type: application/json" \
>   -d '{"name": "essai-csrf"}' "$CVAT/api/projects"
> # 403 {"detail": "CSRF Failed: CSRF token missing."}
>
> TOKEN=$(grep csrftoken cookies.txt | awk '{print $NF}')
> curl -s -b cookies.txt -H "X-CSRFToken: $TOKEN" -H "Content-Type: application/json" \
>   -d '{"name": "essai-csrf"}' "$CVAT/api/projects"          # 201, note l'id
>
> curl -s -b cookies.txt -H "X-CSRFToken: nimportequoi" ...   # 403 … token … incorrect (ou « incorrect length »)
> curl -s -b cookies.txt -H "X-CSRFToken: $TOKEN" -H "Origin: http://piege.local" ...
> # 403 CSRF Failed: Origin checking failed - http://piege.local does not match any trusted origins.
>
> curl -s -u MOI:MON_MDP -H "Content-Type: application/json" \
>   -d '{"name": "essai-basic"}' "$CVAT/api/projects"          # 201 sans jeton
>
> curl -s -b cookies.txt -H "X-CSRFToken: $TOKEN" -X DELETE "$CVAT/api/projects/<id>"   # 204
> ```
> 1. `sessionid` dit qui tu es. `csrftoken` ne prouve rien tout seul : il sert seulement à vérifier que la requête vient d'une page qui a pu **lire** ce cookie, donc de CVAT.
> 2. Django ne vérifie le jeton que pour les méthodes qui **modifient**. Un `GET` ne doit rien changer, donc il n'y a rien à protéger.
> 3. Le navigateur **envoie** les cookies de CVAT, mais le site piège ne peut pas les **lire** (ils appartiennent à une autre origine). Il ne connaît donc pas la valeur à recopier dans l'en-tête.
> 4. Le danger du CSRF vient de ce que le navigateur ajoute **tout seul** : les cookies. Un en-tête `Authorization` n'est jamais ajouté par le navigateur sans ton code, donc un site piège ne peut pas s'en servir. `convert-png` appelle CVAT avec `auth=(user, mdp)` : du Basic, pas concerné.
> 5. `Origin checking failed - http://localhost:3000 does not match any trusted origins` : l'origine de la page n'était ni CVAT ni dans la liste. Réglé avec `CSRF_TRUSTED_ORIGINS = ["http://localhost:3000"]`.
> 6. L'en-tête `X-CSRFToken`, avec la valeur du cookie `csrftoken` (lue avec `document.cookie`), et `credentials: "include"` si la page n'est pas sur la même origine que CVAT.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] J'ai répondu aux questions et Claude les a vérifiées
