---
created: 2026-09-16
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M11
aliases:
  - "Commandes CLI Essentielles Docker"
tags:
  - infrastructure/docker/cli
parent: "[[Docker]]"
related_theory: []
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.docker.com/engine/reference/commandline/cli/"
---

# Commandes Docker CLI

> [!abstract] En bref
> L'aide-mémoire des commandes Docker du quotidien : lancer, voir, entrer dans un conteneur, lire les logs, nettoyer.

## Les conteneurs

| Commande | Rôle |
|---|---|
| `docker run -d --name api -p 3000:3000 image` | lancer un conteneur en arrière-plan |
| `docker run -it --rm node:22 bash` | lancer un conteneur jetable et entrer dedans |
| `docker ps` | les conteneurs **en marche** |
| `docker ps -a` | **tous** les conteneurs (arrêtés compris) |
| `docker stop api` / `docker start api` | arrêter / relancer |
| `docker restart api` | redémarrer |
| `docker rm api` | supprimer (arrêté) ; `-f` pour forcer |
| `docker logs -f api` | suivre les logs |
| `docker logs --tail 100 api` | les 100 dernières lignes |
| `docker exec -it api sh` | ouvrir un terminal **dans** un conteneur |
| `docker inspect api` | tout le détail (IP, variables, volumes) |
| `docker stats` | CPU et mémoire en direct |

## Les images

| Commande | Rôle |
|---|---|
| `docker build -t cinetrack-api .` | construire depuis le Dockerfile du dossier |
| `docker images` | lister les images |
| `docker pull postgres:17` | télécharger |
| `docker rmi image` | supprimer une image |
| `docker history image` | la taille de chaque couche |

## Les options de `docker run`

| Option | Effet |
|---|---|
| `-d` | en arrière-plan |
| `--name api` | donner un nom |
| `-p 3000:3000` | publier un port (machine:conteneur) |
| `-e CLE=valeur` / `--env-file .env` | variables d'environnement |
| `-v db-data:/var/lib/postgresql/data` | un volume |
| `--rm` | supprimer le conteneur à l'arrêt |
| `-it` | mode interactif (pour un terminal) |
| `--network nom` | rejoindre un réseau |

## Compose

| Commande | Rôle |
|---|---|
| `docker compose up -d` | tout lancer |
| `docker compose logs -f api` | logs d'un service |
| `docker compose exec db psql -U cinetrack` | entrer dans un service |
| `docker compose down` | tout arrêter |

Détails : [[DK-03-Docker-Compose|Docker Compose]].

## Faire de la place

| Commande | Supprime |
|---|---|
| `docker system df` | (affiche l'espace utilisé) |
| `docker container prune` | les conteneurs arrêtés |
| `docker image prune` | les images sans nom |
| `docker builder prune` | le cache de construction |
| `docker system prune` | tout ce qui est inutilisé (**sauf volumes**) |
| `docker system prune --volumes` | ⚠️ **y compris les volumes** (données des bases) |

## Le déroulé de débogage

1. `docker ps -a` : le conteneur tourne-t-il ? S'est-il arrêté ?
2. `docker logs api` : que dit-il ?
3. `docker exec -it api sh` : entrer et vérifier (fichiers, variables avec `env`).
4. `docker inspect api` : ports, réseau, volumes.

## Pourquoi ça marche

Toutes les commandes Docker suivent la même logique : **un objet**, puis **une action**. `docker container ls`, `docker image rm`, `docker volume prune`, `docker network inspect`… Les formes courtes (`docker ps`, `docker rmi`) sont des raccourcis des mêmes commandes.

Comprendre cette logique évite d'apprendre par cœur : si tu sais qu'il existe des conteneurs, des images, des volumes et des réseaux, tu peux deviner la commande, puis vérifier avec `docker <objet> --help`.

## Contre-exemple

**Intuition fausse : « `docker system prune` nettoie sans danger, c'est juste du cache ».**

```bash
docker system prune --volumes
```

Avec `--volumes`, la commande supprime aussi **les volumes non utilisés**, donc les données de tes bases si leurs conteneurs sont arrêtés à ce moment-là. Toujours lire ce qu'une commande `prune` va supprimer.

## Vérifie sans tes notes

Réponds de tête, à voix haute ou par écrit, **avant** d’ouvrir la réponse.

**1. Quelle différence entre `docker ps` et `docker ps -a` ?**

> [!check]- Réponse
> `ps` montre les conteneurs en marche ; `-a` montre aussi ceux qui sont arrêtés.

**2. Comment entrer dans un conteneur en marche pour regarder ce qui s'y passe ?**

> [!check]- Réponse
> `docker exec -it nom sh` (ou `bash` s'il existe).

**3. Quelles sont les 4 étapes de débogage d'un conteneur ?**

> [!check]- Réponse
> `docker ps -a` (tourne-t-il ?), `docker logs` (que dit-il ?), `docker exec -it … sh` (vérifier à l'intérieur), `docker inspect` (ports, réseau, volumes).

## Exercices

> [!info] Comment t’entraîner
> 1. Cherche seul, sans regarder la note.
> 2. Bloqué ? Ouvre l’**indice 1**, puis l’**indice 2**.
> 3. Seulement ensuite, la **solution**.
> 4. Referme tout et **refais l’exercice sans regarder**.

### Exercice 1 · La bonne commande

Donne la commande pour chaque besoin :
1. voir les 50 dernières lignes de logs du conteneur `api` ;
2. voir la mémoire utilisée par chaque conteneur ;
3. lancer un conteneur Node 22 jetable avec un terminal ;
4. savoir quelle place Docker occupe sur le disque.

> [!tip]- Indice 1
> Cherche dans les tableaux de la note : logs, stats, run, system.

> [!tip]- Indice 2
> Pour un conteneur jetable avec terminal : `--rm` et `-it`, puis la commande `sh` ou `bash`.

> [!success]- Solution
> 1. `docker logs --tail 50 api`
> 2. `docker stats`
> 3. `docker run -it --rm node:22 bash`
> 4. `docker system df`

### Exercice 2 · Le conteneur qui s'arrête tout seul

Tu lances `docker run -d --name api cinetrack-api`. `docker ps` n'affiche rien. Écris dans l'ordre les commandes pour comprendre ce qui s'est passé.

> [!tip]- Indice 1
> D'abord, vérifie si le conteneur existe toujours, même arrêté.

> [!tip]- Indice 2
> Un conteneur arrêté garde ses logs.

> [!success]- Solution
> ```bash
> docker ps -a          # le conteneur est « Exited » : il a démarré puis s'est arrêté
> docker logs api       # le message d'erreur (variable manquante, port déjà pris, crash…)
> ```
>
> Si les logs ne suffisent pas : `docker inspect api` (variables, ports), ou relancer en interactif pour tester : `docker run -it --rm cinetrack-api sh`.

### Transfert · Le disque plein

Un problème différent : il vérifie que tu as compris le principe, pas seulement l’exemple.

Ton disque est plein. `docker system df` montre 15 Go d'images, 8 Go de cache de construction et 2 Go de volumes. Tu veux libérer de la place **sans perdre** les données de ta base de développement. Quelles commandes utilises-tu, et laquelle éviter ?

> [!tip]- Indice 1
> Quelles commandes `prune` touchent aux images et au cache, sans toucher aux volumes ?

> [!tip]- Indice 2
> Les volumes contiennent les données : c'est l'option `--volumes` qu'il faut éviter.

> [!success]- Solution
> ```bash
> docker builder prune      # le cache de construction (8 Go)
> docker image prune -a     # les images non utilisées par un conteneur
> docker container prune    # les conteneurs arrêtés
> ```
>
> À **éviter** : `docker system prune --volumes` ou `docker volume prune`, qui supprimeraient les données de la base.

## Je maîtrise quand…

Coche quand tu sais le faire **sans aide**. Une notion n’est maîtrisée que si les 6 cases sont cochées (voir [[Methode-du-coach|Méthode du coach]]).

- [ ] **Expliquer** : Expliquer la logique « objet + action » des commandes Docker
- [ ] **Rappeler** : Dire de mémoire les commandes pour lancer, lister, lire les logs, entrer dans un conteneur
- [ ] **Utiliser** : Enchaîner les commandes de débogage sans regarder l'aide-mémoire
- [ ] **Résoudre un problème nouveau** : Prévoir ce qu'une commande `prune` va supprimer
- [ ] **Repérer les erreurs** : Diagnostiquer un conteneur qui s'arrête ou ne répond pas
- [ ] **Savoir quand ne pas l’utiliser** : Savoir quand utiliser Compose plutôt que des `docker run` à la main
