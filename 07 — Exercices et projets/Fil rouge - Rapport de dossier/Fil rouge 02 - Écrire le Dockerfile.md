---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Dockerfile]]"
  - "[[Python dans Docker]]"
  - "[[Variable de build Docker (ARG)]]"
tags:
  - exercice
  - fil-rouge
---
# Fil rouge 02 - Écrire le Dockerfile

> [!info] Où tu en es
> **Projet :** [[Projet fil rouge - Rapport de dossier]] · **Étape du parcours :** 2 · Docker
> **Étape précédente :** [[Fil rouge 01 - Lancer l'application dans un conteneur]]
> **Cours à avoir lus :** [[Cours - Faire tourner un script Python dans Docker]]
> **Notions validées par cette étape :** [[Dockerfile]] · [[Python dans Docker]] · [[Variable de build Docker (ARG)]]

## Le but
Ne plus taper une longue commande : construire **ta propre image** `rapport-dossier`, qui contient déjà l'application et se lance avec un simple `docker run`.

## Ce que tu fais
- [ ] Écris un `Dockerfile` : image de base Python, dossier de travail, copie du code, et la commande lancée par défaut
- [ ] Construis l'image sous le nom `rapport-dossier:0.1` et lance-la sur `exemple/`, en récupérant le rapport chez toi
- [ ] Ajoute `test_app.py` et un `requirements.txt` qui contient `pytest`, et installe les dépendances dans l'image **avant** de copier le code
- [ ] Modifie une ligne de `app.py`, reconstruis, et note quelles étapes sont refaites et lesquelles viennent du cache
- [ ] Ajoute une version du programme passée **au moment du build**, et rends-la lisible dans le conteneur au lancement
- [ ] Ajoute un `.dockerignore` pour ne pas envoyer `sortie/` ni `.git/` au build

> [!success] Ça marche si…
> `docker run --rm -v "$PWD/exemple":/data -v "$PWD/sortie":/sortie rapport-dossier:0.1` produit le rapport, et modifier `app.py` ne réinstalle pas `pytest`.

## Est-ce que j'ai compris ?
Réponds par écrit, en dessous, **sans regarder la solution**. Ensuite, demande à Claude de vérifier tes réponses.
1. À quel moment s'exécute chaque instruction de ton Dockerfile : pendant le build ou au lancement ?
2. Pourquoi copier `requirements.txt` et installer les dépendances **avant** de copier le reste du code ?
3. Que devient le `CMD` si tu ajoutes une commande à la fin de `docker run` ? Essaie avec `python -m pytest`.
4. Quelle est la différence entre ton `ARG` et un `ENV` ? Pourquoi ne jamais mettre de mot de passe dans un `ARG` ?

> [!quote] Mes réponses
> _À écrire._

> [!question]- Indice
> Ordre conseillé des instructions : `FROM` → `WORKDIR` → `COPY requirements.txt` → `RUN pip install` → `COPY . .` → `CMD`. Pour la version : un `ARG` recopié dans un `ENV`, et l'option `--build-arg` de `docker build`.

> [!question]- Solution
> ```dockerfile
> FROM python:3.12-slim
> ARG VERSION=0.1
> ENV VERSION=$VERSION
> WORKDIR /app
> COPY requirements.txt .
> RUN pip install --no-cache-dir -r requirements.txt
> COPY . .
> CMD ["python", "app.py", "/data"]
> ```
> ```text
> # .dockerignore
> .git
> sortie
> __pycache__
> ```
> ```bash
> docker build -t rapport-dossier:0.1 --build-arg VERSION=0.1 .
> docker run --rm -v "$PWD/exemple":/data -v "$PWD/sortie":/sortie rapport-dossier:0.1
> docker run --rm rapport-dossier:0.1 python -m pytest -q     # remplace le CMD
> docker run --rm rapport-dossier:0.1 sh -c 'echo $VERSION'
> ```
> 1. Build : `FROM`, `ARG`, `ENV`, `WORKDIR`, `COPY`, `RUN`. Lancement : `CMD`.
> 2. Chaque instruction est une couche en cache ; la couche `COPY . .` change à chaque modification du code, et tout ce qui est en dessous est refait. Dépendances avant le code = pas de réinstallation.
> 3. La commande donnée à `docker run` **remplace** le `CMD`.
> 4. `ARG` n'existe qu'au build, `ENV` reste dans l'image. Les `ARG` restent visibles dans `docker history`.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] J'ai répondu aux questions et Claude les a vérifiées
