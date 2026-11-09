---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Reverse proxy]]"
tags:
  - exercice
  - mini-projet
---
# Exercice - Un reverse proxy nginx

> [!info] Où tu en es
> **Étape du parcours :** 3 · Réseau ([[Parcours - Python, Docker et CI]]), après [[Fil rouge 03 - Une page web pour le rapport]]
> **Cours à avoir lu :** [[Cours - Ports, proxy et reverse proxy]]
> **Notion validée par cet exercice :** [[Reverse proxy]]
> **Ce qu'il faut savoir déjà :** lancer un `compose.yaml` (vu dans le fil rouge 03). Tout le reste est fourni.

## Le but
Une petite application a deux services : un **site** (une page HTML) et une **API** (qui renvoie un fichier JSON). Tu mets un **nginx devant**, pour que tout passe par une seule adresse : `http://localhost:8080/` pour le site, `http://localhost:8080/api/statut.json` pour l'API. Ensuite, tu lances deux copies de l'API et tu vérifies que nginx se partage le travail.

## Les fichiers de départ
Crée `~/projets/entree` avec ces fichiers. Seul `entree/nginx.conf` est à écrire par toi.

`compose.yaml`
```yaml
services:
  site:
    image: nginx:1.27-alpine
    volumes:
      - ./site:/usr/share/nginx/html:ro

  api:
    image: python:3.12-slim
    command: python -m http.server 8000 --directory /data
    volumes:
      - ./api:/data:ro

  entree:
    image: nginx:1.27-alpine
    ports:
      - "8080:80"
    volumes:
      - ./entree/nginx.conf:/etc/nginx/conf.d/default.conf:ro
    depends_on:
      - site
      - api
```

`site/index.html`
```html
<h1>Le site</h1>
<p>Si tu lis ceci, nginx t'a envoyé au service <code>site</code>.</p>
```

`api/statut.json`
```json
{ "service": "api", "etat": "ok" }
```

`entree/nginx.conf` (à compléter)
```nginx
server {
    listen 80;

    # À toi : envoie / au service site, et /api/ au service api.
}
```

> [!tip] Au travail
> Docker Hub est bloqué : préfixe les deux images avec le Nexus, comme dans [[Fiche - Images Docker au travail via le Nexus]].

## Ce que tu fais
- [ ] Écris `nginx.conf` pour que `/` arrive au site et `/api/` arrive à l'API. Lance le tout et vérifie les deux adresses dans ton navigateur
- [ ] Si tu obtiens `502 Bad Gateway` ou `404`, lis la page d'erreur : **qui** l'a renvoyée, nginx ou Python ? Corrige jusqu'à ce que les deux adresses marchent
- [ ] Essaie d'ouvrir le site et l'API **sans** passer par nginx, directement. Pourquoi est-ce impossible ? Est-ce un défaut ou un avantage ?
- [ ] Ajoute cette ligne dans le bloc de `/api/`, pour savoir quelle copie de l'API t'a répondu : `add_header X-Servi-Par $upstream_addr always;`
- [ ] Lance **deux copies** de l'API avec `docker compose up -d --scale api=2`. Appelle l'API plusieurs fois avec `curl -sI http://localhost:8080/api/statut.json` et regarde `X-Servi-Par`. Si c'est toujours la même adresse, trouve pourquoi et corrige
- [ ] Arrête et supprime tout

> [!warning] Les pièges de cet exercice
> - Dans un conteneur, `localhost` ne veut pas dire ce que tu crois.
> - Dans `proxy_pass`, un `/` à la fin de l'adresse change le chemin envoyé à l'API.

> [!success] Ça marche si…
> `http://localhost:8080/` affiche « Le site », `http://localhost:8080/api/statut.json` affiche le JSON, et avec deux copies de l'API, `X-Servi-Par` alterne entre deux adresses.

## Est-ce que j'ai compris ?
Réponds en quelques mots, en dessous, ou demande à Claude de t'interroger.
1. Pourquoi `proxy_pass http://localhost:8000` donne-t-il un `502` ? Que veut dire `502` ?
2. Avec et sans le `/` final dans `proxy_pass`, quel chemin l'API reçoit-elle pour `/api/statut.json` ?
3. Pourquoi seul `entree` publie-t-il un port ? Qu'est-ce que ça protège ?
4. Après le `--scale`, pourquoi a-t-il fallu redémarrer nginx pour qu'il voie la deuxième copie ?
5. Ce nginx, est-ce une API ? Pourquoi ?

> [!quote] Mes réponses
> _À écrire._

> [!question]- Indice
> Chaque `location` reçoit un `proxy_pass` vers `http://<nom du service>:<port interne>`. Compose donne à chaque service un nom que les autres conteneurs peuvent appeler. Pour le chemin : sans `/` final, nginx envoie le chemin complet ; avec un `/` final, il remplace le préfixe de la `location` par ce `/`. nginx cherche l'adresse des services **une seule fois**, à son démarrage.

> [!question]- Solution
> ```nginx
> server {
>     listen 80;
>
>     location / {
>         proxy_pass http://site:80;
>     }
>
>     location /api/ {
>         proxy_pass http://api:8000/;
>         add_header X-Servi-Par $upstream_addr always;
>     }
> }
> ```
> ```bash
> docker compose up -d
> docker compose up -d --scale api=2
> docker compose restart entree
> for i in 1 2 3 4; do curl -sI http://localhost:8080/api/statut.json | grep X-Servi-Par; done
> docker compose down
> ```
> 1. Dans le conteneur `entree`, `localhost` est **le conteneur nginx lui-même**, et rien n'y écoute sur 8000. `502 Bad Gateway` veut dire : nginx marche, mais le service derrière lui ne répond pas. Il faut appeler le service par son nom : `api`.
> 2. Sans `/` final, l'API reçoit `/api/statut.json` et répond `404`, car elle n'a pas de dossier `api`. Ce 404 vient de **Python**, pas de nginx. Avec `/` final, nginx remplace `/api/` par `/` et l'API reçoit `/statut.json`.
> 3. Le visiteur ne peut entrer que par nginx : une seule porte, une seule adresse, un seul endroit où mettre le HTTPS et les règles. Les services derrière restent cachés.
> 4. Au démarrage, nginx demande l'adresse de `api` et la garde. La deuxième copie est arrivée après : il ne la connaît pas tant qu'il ne redemande pas, donc tant qu'il n'a pas redémarré. Après, il connaît deux adresses et les utilise chacune à son tour.
> 5. Non. Il ne produit aucune donnée : le JSON vient du service `api`. nginx **reçoit et transmet** la requête au bon service : c'est un reverse proxy.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] J'ai répondu aux questions et Claude les a vérifiées
