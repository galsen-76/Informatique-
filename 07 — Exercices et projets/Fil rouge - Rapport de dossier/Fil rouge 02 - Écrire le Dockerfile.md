---
type: exercise
status: reussi
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
- [x] Écris un `Dockerfile` : image de base Python, dossier de travail, copie du code, et la commande lancée par défaut
- [x] Construis l'image sous le nom `rapport-dossier:0.1` et lance-la sur `exemple/`, en récupérant le rapport chez toi
- [x] Ajoute `test_app.py` et un `requirements.txt` qui contient `pytest`, et installe les dépendances dans l'image **avant** de copier le code
- [x] Modifie une ligne de `app.py`, reconstruis, et note quelles étapes sont refaites et lesquelles viennent du cache
- [x] Ajoute une version du programme passée **au moment du build**, et rends-la lisible dans le conteneur au lancement
- [x] Ajoute un `.dockerignore` pour ne pas envoyer `sortie/` ni `.git/` au build

> [!note] Au travail, derrière le proxy
> `pip install` est bloqué tant que le proxy PyPI du Nexus n'est pas configuré (voir [[Fiche - Images Docker au travail via le Nexus]]). En attendant, les tests sont écrits avec `unittest`, livré avec Python : saute la tâche `requirements.txt` et `pytest`, et lance les tests avec `python -m unittest`. Pour la question 2, raisonne avec le cache des couches.

> [!success] Ça marche si…
> `docker run --rm -v "$PWD/exemple":/data -v "$PWD/sortie":/sortie rapport-dossier:0.1` produit le rapport, et modifier `app.py` ne réinstalle pas `pytest`.

## Est-ce que j'ai compris ?
Réponds par écrit, en dessous, **sans regarder la solution**. Ensuite, demande à Claude de vérifier tes réponses.
1. À quel moment s'exécute chaque instruction de ton Dockerfile : pendant le build ou au lancement ?
2. Pourquoi copier `requirements.txt` et installer les dépendances **avant** de copier le reste du code ?
3. Que devient le `CMD` si tu ajoutes une commande à la fin de `docker run` ? Essaie avec `python -m pytest`.
4. Quelle est la différence entre ton `ARG` et un `ENV` ? Pourquoi ne jamais mettre de mot de passe dans un `ARG` ?

> [!quote] Mes réponses
> 1. `ARG` sert seulement pendant le build, `ENV` reste quand le conteneur tourne. `CMD` et `ENTRYPOINT` s'exécutent au lancement.
> 2. Quand on rebuild, Docker refait toutes les étapes après l'endroit où il y a la différence, il n'utilise plus le cache. Donc on installe les dépendances avant de copier le code.
> 3. Avec `CMD`, ce que je tape après l'image remplace la commande (`unittest` tout seul → introuvable dans le PATH, il faut `python -m unittest`). Avec `ENTRYPOINT`, ça s'ajoute derrière (`python app.py unittest` → « Dossier introuvable : unittest »).
> 4. `ARG` n'existe qu'au build, `ENV` reste dans l'image. Un mot de passe dans un `ARG` reste visible dans l'image (`docker history`) : un secret se donne au lancement.
>
> _Adapté au travail : pas de `requirements.txt` ni de `pytest` (pip bloqué par le proxy), tests en `unittest`._

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
- [x] Le projet marche comme décrit dans « Ça marche si… »
- [x] J'ai répondu aux questions et Claude les a vérifiées
