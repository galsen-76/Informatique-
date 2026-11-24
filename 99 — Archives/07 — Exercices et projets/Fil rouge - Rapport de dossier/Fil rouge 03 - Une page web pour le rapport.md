---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Docker Compose]]"
  - "[[Port]]"
tags:
  - exercice
  - fil-rouge
---
# Fil rouge 03 - Une page web pour le rapport

> [!info] Où tu en es
> **Projet :** [[Projet fil rouge - Rapport de dossier]] · **Étape du parcours :** 3 · Réseau
> **Étape précédente :** [[Fil rouge 02 - Écrire le Dockerfile]]
> **Cours à avoir lus :** [[Cours - Docker, les bases solides]] · [[Cours - Ports, proxy et reverse proxy]]
> **Notions validées par cette étape :** [[Docker Compose]] · [[Port]]

## Le but
Afficher le rapport dans ton **navigateur** : un deuxième conteneur, un serveur web `nginx`, sert le dossier `sortie/`. Les deux conteneurs se décrivent dans un seul fichier `compose.yaml`.

## Ce que tu fais
- [ ] Écris un `compose.yaml` avec deux services : `rapport` (ton image, construite depuis le Dockerfile) et `web` (`nginx`)
- [ ] Fais en sorte que `rapport` écrive dans un volume que `web` sert comme site
- [ ] Rends le site accessible sur `http://localhost:8080/rapport.json` depuis ton navigateur Windows
- [ ] Lance le tout, vérifie, puis arrête et supprime tout avec une seule commande
- [ ] Change le port de ta machine en `9090` sans toucher au port de nginx, et vérifie

> [!success] Ça marche si…
> `http://localhost:8080/rapport.json` affiche ton rapport dans le navigateur, et une seule commande démarre et arrête l'ensemble.

## Est-ce que j'ai compris ?
Réponds par écrit, en dessous, **sans regarder la solution**. Ensuite, demande à Claude de vérifier tes réponses.
1. Dans `8080:80`, quel nombre est le port de ta machine, et lequel est celui du conteneur ? Pourquoi peut-on changer l'un sans l'autre ?
2. Comment le service `web` lit-il un fichier écrit par le service `rapport` ? Que se passerait-il sans volume partagé ?
3. Le service `rapport` s'arrête après avoir écrit son fichier, `web` continue. Pourquoi ?
4. Pourquoi peut-on joindre un service par son **nom** depuis un autre service ?

> [!quote] Mes réponses
> _À écrire._

> [!question]- Indice
> Un volume nommé déclaré en bas du fichier, monté à deux endroits : là où `rapport` écrit (`/sortie`) et là où nginx sert ses pages (`/usr/share/nginx/html`). Pour le port : `ports:` avec `machine:conteneur`.

> [!question]- Solution
> ```yaml
> services:
>   rapport:
>     build: .
>     volumes:
>       - ./exemple:/data:ro
>       - resultats:/sortie
>   web:
>     image: nginx:1.27-alpine
>     ports:
>       - "8080:80"
>     volumes:
>       - resultats:/usr/share/nginx/html:ro
> volumes:
>   resultats:
> ```
> ```bash
> docker compose up --build -d
> docker compose ps
> docker compose down
> ```
> 1. `8080` = ta machine, `80` = nginx dans le conteneur. Docker relie l'un à l'autre : on change le côté machine sans toucher au programme.
> 2. Le volume `resultats` est monté dans les deux conteneurs : même stockage. Sans lui, chaque conteneur a ses propres fichiers.
> 3. Un conteneur vit tant que son programme tourne : `app.py` se termine, nginx est un serveur qui attend.
> 4. Compose crée un réseau pour le projet, avec un nom résolu pour chaque service.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] J'ai répondu aux questions et Claude les a vérifiées
