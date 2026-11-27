---
type: concept
module: "[[Module 13 - Docker]]"
related:
  - "[[Variable de build Docker (ARG)]]"
  - "[[Registre Docker]]"
tags:
  - concept
  - devops
---
# Dockerfile

> [!info] En une phrase
> La recette écrite d'une image : une liste d'instructions que Docker exécute dans l'ordre pour la construire.

## 1 · Comprendre
### Définition
Un **Dockerfile** est un fichier texte, à la racine du projet en général, qui décrit comment construire une [[Image Docker]]. Chaque instruction ajoute une **couche**, mise en cache.

### Pourquoi ça existe
Fabriquer l'image de façon automatique et identique à chaque fois, sur n'importe quelle machine (poste, CI, serveur).

### Le problème résolu
Préparer un serveur à la main en suivant un document : une étape oubliée et l'environnement diffère.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart LR
  F[FROM] --> W[COPY] --> R[RUN] --> C[CMD]
  C -- build --> I[Image]
```

### Exemple concret
```dockerfile
FROM python:3.11-slim                 # image de départ (sans registre : Docker Hub)
WORKDIR /app                          # dossier de travail dans l'image
COPY requirements.txt .               # d'abord les dépendances, pour le cache
RUN pip install -r requirements.txt   # exécuté pendant la construction
COPY . .                              # puis le code
CMD ["python", "main.py"]             # exécuté au démarrage du conteneur
```

| Instruction | Rôle |
| --- | --- |
| `FROM` | l'image de départ |
| `WORKDIR` | le dossier de travail |
| `COPY` | copie des fichiers du projet dans l'image |
| `RUN` | commande exécutée **pendant le build** |
| `ARG` | variable de build, voir [[Variable de build Docker (ARG)]] |
| `CMD` | commande lancée **au démarrage** du conteneur, **remplacée** par ce que tu tapes après l'image |
| `ENTRYPOINT` | programme lancé **au démarrage**, toujours : ce que tu tapes après l'image **s'ajoute** derrière |
| `ENV` | variable d'environnement gardée dans l'image, lisible par le programme au lancement |

### Ce que j'ai vu en pratique (fil rouge, 7 novembre)
- **`COPY . .`** : le 1er `.` est **sur mon PC** (le contexte de build, le dossier donné à `docker build .`), le 2e est **dans l'image** (le `WORKDIR`). `COPY` va toujours du PC vers l'image. Ce qui ne doit pas partir dans l'image va dans `.dockerignore`.
- **`WORKDIR` plutôt que `RUN cd`** : `WORKDIR` crée le dossier et reste valable pour toutes les lignes suivantes et pour le conteneur. Un `RUN cd` est oublié à la ligne suivante, car chaque `RUN` est un nouveau shell.
- **`CMD` contre `ENTRYPOINT`** :
  - avec `ENTRYPOINT ["python", "app.py"]`, `docker run image unittest` lance `python app.py unittest` → « Dossier introuvable : unittest » ;
  - avec `CMD ["python", "app.py"]`, la même commande lance `unittest` tout seul → « executable file not found in $PATH ». La bonne commande : `python -m unittest`.
- **Le cache** : chaque instruction est une couche. Si une couche change, elle et toutes celles d'en dessous sont refaites. D'où : dépendances avant `COPY . .`.
- **Au travail**, le `FROM` passe par le Nexus : [[Fiche - Images Docker au travail via le Nexus]].

Un Dockerfile peut contenir **plusieurs `FROM`** (*multi-stage build*) : une étape compile, la suivante ne garde que le résultat. Un projet peut aussi avoir **plusieurs Dockerfile** (`Dockerfile`, `Dockerfile.ui`…), construits avec `docker build -f`.

### Cas d'utilisation
- Conteneuriser une application (API, front)

> [!warning] À ne pas confondre
> `RUN` (pendant le build) et `CMD` (au démarrage du conteneur). Et le **Dockerfile** (la recette) avec l'**image** (le résultat).

## 3 · Relier
- **Au travail** : [Dockerfile au travail](obsidian://open?vault=Travail&file=Dockerfile%20au%20travail)
- **Prérequis** : [[Docker]]
- **Notion parente** : [[Image Docker]]
- **Complémentaires** : [[Variable de build Docker (ARG)]] · [[Registre Docker]]
- **Utilisé par** : [[Construire une image dans la CI]]
- **Commandes** : [[docker build]]
