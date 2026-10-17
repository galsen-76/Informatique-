---
type: notion
statut: a apprendre
resume: "Le Dockerfile est la recette pour construire une image : une liste d'instructions exécutées dans l'ordre."
revu:
sources:
---
```dataviewjs
await dv.view("Systeme/notion")
```

**En une phrase :** Le Dockerfile est la **recette pour construire une image** : une liste d'instructions exécutées dans l'ordre.

## ❓ Le problème

**Pourquoi ça existe ?**
Pour fabriquer l'image de ton application de façon automatique et identique à chaque fois.

**Qu'est-ce qui se passait sans ça ?**
On préparait les serveurs à la main en suivant un document. Une étape oubliée, et l'environnement était différent.

## 💡 Comment ça marche

*Explique avec tes mots, comme à un collègue.*

Un Dockerfile typique pour une appli Node :

```dockerfile
FROM node:22                 # on part d'une image qui a déjà Node et npm
WORKDIR /app                 # dossier de travail dans l'image
COPY package*.json ./        # d'abord SEULEMENT package.json et package-lock.json (ceux de TON projet)
RUN npm ci                   # installe les dépendances
COPY . .                     # puis tout le reste du code
EXPOSE 3000                  # documente le port de l'appli
CMD ["npm", "start"]         # la commande lancée quand le conteneur démarre
```

```bash
docker build -t mon-api .    # construit l'image
docker run -p 3000:3000 mon-api
```

Pourquoi copier `package*.json` avant le reste ? Chaque instruction crée une **couche** mise en cache. Tant que tes dépendances ne changent pas, Docker réutilise la couche `npm ci` et le build prend quelques secondes au lieu de quelques minutes.

## ⚠️ Limites et pièges

- **`RUN` s'exécute au build, `CMD` au démarrage du conteneur** : les confondre est l'erreur classique.
- **Sans `.dockerignore`**, `COPY . .` copie aussi `node_modules/` et `.git/` : image énorme et dépendances de la mauvaise plateforme.
- **Mettre `COPY . .` avant `npm ci`** casse le cache : chaque modification de code relance l'installation.
- **Pas de secret dans le Dockerfile** (`ENV TOKEN=...`) : il reste lisible dans l'image.

## 🔗 Liens

- **Prérequis :** [[01 Docker|Docker]], [[03 npm install vs npm ci|npm install vs npm ci]]
- **Voir aussi :** [[09 Ports et réseau Docker|Ports et réseau Docker]]
- **Utilisé dans :** la construction des images d'API ou de front

## 📚 Notes

- 
