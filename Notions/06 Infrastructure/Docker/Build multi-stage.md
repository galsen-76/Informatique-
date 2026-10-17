---
type: notion
statut: a apprendre
resume: "Un Dockerfile en plusieurs étapes : on construit l'appli dans une grosse image, puis on ne garde que le résultat dans une petite image finale."
revu:
sources:
---
```dataviewjs
await dv.view("Systeme/notion")
```

**En une phrase :** Un Dockerfile **en plusieurs étapes** : on construit l'appli dans une grosse image, puis on ne garde que le résultat dans une petite image finale.

## ❓ Le problème

**Pourquoi ça existe ?**
Pour avoir des images de production **légères et plus sûres**, sans les outils de compilation ni les dépendances de développement.

**Qu'est-ce qui se passait sans ça ?**
L'image de production contenait tout : TypeScript, les dépendances de dev, le code source… soit 1 Go au lieu de 50 Mo, plus lent à déployer et avec plus de failles possibles.

## 💡 Comment ça marche

*Explique avec tes mots, comme à un collègue.*

Exemple pour un front Angular :
```dockerfile
# Étape 1 : construire
FROM node:22 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build            # produit dist/

# Étape 2 : servir
FROM nginx:alpine
COPY --from=build /app/dist/mon-app/browser /usr/share/nginx/html
EXPOSE 80
```

L'étape `build` a Node, npm, `node_modules`… Mais l'image finale ne contient **que nginx et les fichiers compilés**. Tout le reste est jeté.

`COPY --from=build` va chercher un fichier dans l'étape précédente.

## ⚠️ Limites et pièges

- **Le chemin de sortie dépend de la version d'Angular** : `dist/mon-app` ou `dist/mon-app/browser`. Vérifier dans `angular.json`.
- **Une variable de l'étape 1 n'existe pas dans l'étape 2** : chaque `FROM` repart de zéro.
- **Les images `alpine`** sont très légères mais utilisent une autre bibliothèque système : certaines dépendances natives peuvent poser problème.

## 🔗 Liens

- **Prérequis :** [[Dockerfile]]
- **Voir aussi :** [[Registry Docker]]
- **Utilisé dans :** les images de production du front et de l'API

## 📚 Notes

- 
