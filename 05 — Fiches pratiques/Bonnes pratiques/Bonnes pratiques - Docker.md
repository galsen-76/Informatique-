---
type: bonnes-pratiques
sujet: "Docker"
concepts:
  - "[[Docker]]"
  - "[[Dockerfile]]"
  - "[[Image Docker]]"
  - "[[Volume Docker]]"
  - "[[Docker Compose]]"
  - "[[Secret et fichier .env]]"
tags:
  - bonnes-pratiques
---
# Bonnes pratiques - Docker

> [!info] À quoi sert cette fiche
> Des images petites, sûres et reproductibles, et des conteneurs faciles à dépanner.
> Chaque règle dit **pourquoi** : c'est la raison qui compte, pour savoir l'adapter quand la situation change.

## À faire

### 1. Partir d'une image officielle, légère et à version fixe
`python:3.12-slim`, `node:22-alpine` : reproductible et moins de failles. Jamais seulement `latest`.

### 2. Ordonner le Dockerfile pour profiter du cache
D'abord ce qui change rarement (dépendances), ensuite le code.

```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["python", "zipper.py"]
```

### 3. Un .dockerignore
Exclure `.git`, `.venv`, `node_modules`, `.env` : image plus petite, build plus rapide, pas de secret embarqué.

### 4. Lancer en utilisateur non root
Si l'application est compromise, l'attaquant n'est pas root.

```dockerfile
RUN useradd --create-home app
USER app
```

### 5. Un processus par conteneur, des logs sur la sortie standard
`docker logs` et la supervision fonctionnent sans configuration. Voir [[Supervision et observabilité]].

### 6. La configuration par variables d'environnement
La même image en développement, préproduction et production. Voir [[Environnement de déploiement]].

### 7. Des volumes pour les données qui doivent survivre
Base de données, fichiers produits. Voir [[Volume Docker]].

### 8. Construire en plusieurs étapes pour les applications compilées
Une étape pour construire (Node, outils), une étape finale minimale (Nginx, runtime seul).

### 9. Tagger chaque image avec une version ou un commit
Pour savoir ce qui tourne et pouvoir revenir en arrière.

## À éviter

### 1. Mettre un secret dans le Dockerfile (`ENV`, `ARG`, `COPY .env`)
> [!danger] Important
> Un secret (mot de passe, jeton, clé d'API) ne va **jamais dans l'image**.

**Pourquoi c'est un problème :** la valeur reste **enregistrée dans l'image**, même si le conteneur ne la voit plus.
- `ARG` disparaît au lancement, mais Docker garde l'historique de chaque couche avec les valeurs utilisées. `docker history mon-image` affiche par exemple `RUN |1 MDP=secret123 ...` en clair.
- `ENV` est encore pire : la valeur est dans l'image **et** dans chaque conteneur (`docker inspect`).
- `COPY .env` : le fichier est dans une couche de l'image. Le supprimer dans une couche suivante ne l'efface pas de la précédente.
- La commande `docker build --build-arg MDP=...` reste aussi dans l'historique du terminal et dans les logs de la CI.

Toute personne qui récupère l'image, sur le Nexus ou dans la CI, peut donc lire le secret.

**À la place :** donner le secret **au lancement**, jamais au build.
```bash
docker run -e MDP="$MDP" mon-image          # variable au lancement
docker run --env-file .env mon-image        # fichier .env, jamais copié dans l'image
```
Dans la CI : une variable GitLab **masquée et protégée** ([[Variables CI-CD GitLab]]). Et toujours `.env` dans le `.dockerignore` et le `.gitignore`.

### 2. `COPY . .` avant l'installation des dépendances
**Pourquoi c'est un problème :** chaque modification du code réinstalle tout.
**À la place :** copier d'abord le fichier de dépendances.

### 3. Utiliser le tag `latest` en production
**Pourquoi c'est un problème :** impossible de savoir quelle version tourne ni de revenir en arrière.
**À la place :** un tag par version (`1.4.2`) ou par commit.

### 4. Modifier un conteneur à la main (`docker exec` puis installer)
**Pourquoi c'est un problème :** perdu au prochain redémarrage, non reproductible.
**À la place :** modifier le Dockerfile et reconstruire.

### 5. `docker compose down -v` ou `system prune --volumes` par réflexe
**Pourquoi c'est un problème :** les données des bases sont effacées.
**À la place :** lire ce que fait l'option, sauvegarder avant.

### 6. Lancer des conteneurs en `--privileged` ou monter le socket Docker sans raison
**Pourquoi c'est un problème :** donne le contrôle de la machine hôte.
**À la place :** seulement quand c'est indispensable et compris (Kaniko existe pour éviter ça en CI).

## Avant de valider mon travail
- [ ] L'image de base a une version fixe
- [ ] Un `.dockerignore` existe
- [ ] L'application tourne en utilisateur non root
- [ ] Aucun secret dans l'image
- [ ] L'image est taguée avec une version
- [ ] `docker logs` affiche quelque chose d'utile

## Notions liées
[[Docker]] · [[Dockerfile]] · [[Image Docker]] · [[Volume Docker]] · [[Docker Compose]] · [[Secret et fichier .env]]
