---
type: knowledge
category: apprentissages
source: "https://docs.docker.com/reference/dockerfile/"
created: 2026-11-05
tags:
  - knowledge
  - docker
---
# Docker image conteneur et Dockerfile

> [!tip] À retenir
> Une image est une recette figée (système + dépendances + application), un conteneur est cette image en train de tourner ; le Dockerfile est la recette écrite.

## Le problème
**Pourquoi ça existe ?**
Pour fabriquer et lancer une application de façon identique sur n'importe quelle machine : poste, CI, serveur.

**Qu'est-ce qui se passait sans ça ?**
On installait les serveurs à la main en suivant un document. Une étape oubliée, une version différente, et « ça marche chez moi » mais pas en production.

## Points clés
- **Image** : modèle en lecture seule, construit une fois, réutilisable partout.
- **Conteneur** : une image lancée. On peut en lancer plusieurs à partir de la même image.
- **Dockerfile** : liste d'instructions exécutées dans l'ordre. Chaque instruction ajoute une **couche**, mise en cache.

| Instruction | Rôle |
| --- | --- |
| `FROM` | l'image de départ (sans registre précisé : Docker Hub) |
| `WORKDIR` | le dossier de travail dans l'image |
| `COPY` | copie des fichiers du projet dans l'image |
| `RUN` | exécute une commande **pendant la construction** |
| `ARG` | variable de construction, voir [[ARG et images de base paramétrables]] |
| `CMD` | commande lancée **au démarrage** du conteneur |

Un Dockerfile peut contenir **plusieurs `FROM`** (*multi-stage build*) : une étape compile, la suivante ne garde que le résultat.

| Commande | Effet |
| --- | --- |
| `docker build -t monapp:1.0 .` | construit l'image à partir du Dockerfile du dossier courant |
| `docker build -f Dockerfile.ui .` | utilise un Dockerfile qui ne s'appelle pas `Dockerfile` |
| `docker run -p 8080:8080 monapp:1.0` | lance un conteneur et expose son port |
| `docker images` / `docker ps` | liste les images / les conteneurs lancés |

**Docker Compose** (`docker-compose.yml`) décrit plusieurs conteneurs qui fonctionnent ensemble (serveur, interface, base de données) et les lance d'une commande : `docker compose up`.

## Exemple
```dockerfile
FROM python:3.11-slim                 # image de départ
WORKDIR /app
COPY requirements.txt .               # d'abord les dépendances (cache)
RUN pip install -r requirements.txt
COPY . .                              # puis le code
CMD ["python", "main.py"]
```

## Points d'attention
- **`RUN` s'exécute au build, `CMD` au démarrage** : les confondre est l'erreur classique.
- **Copier tout le code avant d'installer les dépendances** casse le cache : chaque modification relance l'installation.
- **Pas de secret dans le Dockerfile** (`ENV TOKEN=...`) : il reste lisible dans l'image.
- **Sans `.dockerignore`**, `COPY . .` copie aussi `.git/` et les dossiers de dépendances.

## Avec mes mots
*Explique avec tes mots, comme à un collègue : ce que tu as compris, et ce qui reste flou.*


## Liens
- Prérequis : 
- Voir aussi : [[Registry Docker]], [[ARG et images de base paramétrables]]
- Utilisé dans : projet CVAT (CI GitLab + Nexus)
