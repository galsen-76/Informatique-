---
created: 2026-09-16
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M11
aliases:
  - "Multi-stage Builds Docker"
tags:
  - infrastructure/docker/multi-stage
parent: "[[Docker]]"
related_theory: []
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.docker.com/build/building/multi-stage/"
---

# Multi-stage Builds

> [!abstract] En bref
> Pour **construire** ton application, il faut beaucoup d'outils (TypeScript, Angular CLI, dépendances de développement). Pour la **faire tourner**, il n'en faut presque aucun. Un **build en plusieurs étapes** construit dans une première image, puis ne copie que le **résultat** dans une image finale légère : plus rapide à déployer et plus sûre.

## L'image

Une cuisine de restaurant : on prépare le plat avec tous les ustensiles (étape 1), mais on n'envoie en salle que **l'assiette** (étape 2), pas la cuisine entière.

## Le front Angular / Vue : servi par Nginx

```dockerfile
# ── Étape 1 : construire ──
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ── Étape 2 : servir ──
FROM nginx:1.27-alpine
COPY --from=build /app/dist/cinetrack/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

```nginx
# nginx.conf
server {
  listen 80;
  root /usr/share/nginx/html;
  location / { try_files $uri $uri/ /index.html; }        # routes du front
  location ~* \.(js|css|webp|svg|woff2)$ { expires 1y; add_header Cache-Control "public, immutable"; }
}
```

Résultat : une image de **~50 Mo** au lieu de plus d'1 Go, sans Node, sans code source.

Pour Vue, le dossier de build est `/app/dist`.

## L'API NestJS

```dockerfile
# ── Étape 1 : construire ──
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate && npm run build

# ── Étape 2 : seulement ce qu'il faut pour tourner ──
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev                          # pas les dépendances de développement
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma
USER node                                      # pas en root
EXPOSE 3000
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]
```

## Ce qu'on gagne

| | Une seule étape | Multi-stage |
|---|---|---|
| Taille | 1 à 2 Go | 100 à 300 Mo (API), ~50 Mo (front) |
| Contient le code source et les outils de build | oui | non |
| Surface d'attaque | grande | réduite |
| Téléchargement au déploiement | lent | rapide |

## Pièges

- **Oublier de copier un fichier nécessaire** dans l'étape finale (client Prisma, fichiers de migration) : l'image démarre et plante.
- **Le mauvais dossier de build** dans le `COPY --from` : Nginx sert une page vide. Vérifie le chemin dans `dist/`.
- **Lancer les migrations au démarrage** de plusieurs instances en même temps : sur un vrai déploiement, on les lance plutôt dans une étape dédiée du pipeline.
