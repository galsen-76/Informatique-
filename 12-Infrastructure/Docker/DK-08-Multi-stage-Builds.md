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

## Pourquoi ça marche

Dans un Dockerfile multi-stage, chaque `FROM` démarre une **nouvelle image**, vierge. Seule la **dernière** étape devient l'image finale. Les étapes précédentes servent d'ateliers : on y installe tous les outils, on construit, puis `COPY --from=build` récupère **uniquement les fichiers utiles**.

Tout ce qui n'est pas copié (code source, TypeScript, dépendances de développement, outils de build) disparaît de l'image finale : elle est plus petite, plus rapide à télécharger, et contient moins de logiciels qui pourraient avoir des failles.

## Contre-exemple

**Intuition fausse : « l'image finale contient tout ce qui a été installé dans le Dockerfile ».**

```dockerfile
FROM node:22-alpine AS build
RUN npm ci
RUN npm run build

FROM nginx:1.27-alpine
# rien de copié depuis build
```

L'image finale ne contient **que Nginx** : `npm ci` et le build ont eu lieu dans une autre image, qui n'est pas livrée. Sans `COPY --from=build`, Nginx sert une page vide.

## Pièges

- **Oublier de copier un fichier nécessaire** dans l'étape finale (client Prisma, fichiers de migration) : l'image démarre et plante.
- **Le mauvais dossier de build** dans le `COPY --from` : Nginx sert une page vide. Vérifie le chemin dans `dist/`.
- **Lancer les migrations au démarrage** de plusieurs instances en même temps : sur un vrai déploiement, on les lance plutôt dans une étape dédiée du pipeline.

## Vérifie sans tes notes

Réponds de tête, à voix haute ou par écrit, **avant** d’ouvrir la réponse.

**1. Qu'est-ce qui finit dans l'image finale d'un build multi-stage ?**

> [!check]- Réponse
> Seulement la dernière étape, et ce qu'on y copie avec `COPY --from=...`.

**2. Pourquoi une image plus petite est-elle aussi plus sûre ?**

> [!check]- Réponse
> Elle contient moins de logiciels (pas d'outils de build, pas de code source), donc moins de failles possibles.

**3. Pourquoi faut-il `try_files … /index.html` dans la configuration Nginx d'un front ?**

> [!check]- Réponse
> Pour que les routes du front (`/movies/42`) renvoient `index.html` au lieu d'une erreur 404 ; Angular ou Vue affiche ensuite la bonne page.

## Exercices

> [!info] Comment t’entraîner
> 1. Cherche seul, sans regarder la note.
> 2. Bloqué ? Ouvre l’**indice 1**, puis l’**indice 2**.
> 3. Seulement ensuite, la **solution**.
> 4. Referme tout et **refais l’exercice sans regarder**.

### Exercice 1 · Compléter le Dockerfile d'un front Vue

Complète la deuxième étape pour servir le build d'une application Vue (construite dans `/app/dist`) avec Nginx.

```dockerfile
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.27-alpine
# à compléter
```

> [!tip]- Indice 1
> Il faut copier le dossier de build depuis l'étape `build` vers le dossier que Nginx sert.

> [!tip]- Indice 2
> Nginx sert `/usr/share/nginx/html` ; la copie se fait avec `COPY --from=build`.

> [!success]- Solution
> ```dockerfile
> FROM nginx:1.27-alpine
> COPY --from=build /app/dist /usr/share/nginx/html
> COPY nginx.conf /etc/nginx/conf.d/default.conf
> EXPOSE 80
> ```

### Exercice 2 · La page blanche

Après avoir construit l'image Angular multi-stage, le site affiche la page d'accueil de Nginx (« Welcome to nginx »). Quelles sont les deux causes probables ?

> [!tip]- Indice 1
> La page par défaut de Nginx s'affiche quand il ne trouve pas tes fichiers.

> [!tip]- Indice 2
> Vérifie le chemin source du `COPY --from` et le contenu réel du dossier `dist/`.

> [!success]- Solution
> 1. **Le mauvais chemin de build** dans `COPY --from=build` : en Angular récent, le build est dans `dist/<nom-du-projet>/browser`, pas directement `dist/`.
> 2. **Le `COPY --from` manquant ou mal placé** (dans la mauvaise étape).
>
> Pour vérifier : `docker run --rm -it <image> ls /usr/share/nginx/html`.

### Transfert · L'API trop lourde

Un problème différent : il vérifie que tu as compris le principe, pas seulement l’exemple.

L'image de ton API NestJS fait 1,4 Go. Elle est construite en une seule étape avec `npm ci` (dépendances de développement incluses), le code source TypeScript et le résultat du build. Décris les deux étapes que tu mettrais en place, et ce que chacune contient.

> [!tip]- Indice 1
> Étape 1 : tout ce qu'il faut pour **construire**. Étape 2 : seulement ce qu'il faut pour **tourner**.

> [!tip]- Indice 2
> Dans l'étape 2 : les dépendances de production seulement (`npm ci --omit=dev`), le dossier `dist`, et ce dont Prisma a besoin.

> [!success]- Solution
> - **Étape 1 (`build`)** : `node:22-alpine`, `npm ci` complet, copie du code, `prisma generate`, `npm run build`.
> - **Étape 2 (finale)** : `node:22-alpine`, `npm ci --omit=dev`, puis `COPY --from=build` de `dist/`, `prisma/` et du client Prisma généré, `USER node`, et la commande de démarrage.
>
> Le code source TypeScript et les outils de développement ne sont plus dans l'image : elle passe à quelques centaines de Mo.

## Je maîtrise quand…

Coche quand tu sais le faire **sans aide**. Une notion n’est maîtrisée que si les 6 cases sont cochées (voir [[Methode-du-coach|Méthode du coach]]).

- [ ] **Expliquer** : Expliquer pourquoi seule la dernière étape finit dans l'image
- [ ] **Rappeler** : Dire de mémoire ce qu'on copie dans l'étape finale d'un front et d'une API
- [ ] **Utiliser** : Écrire un Dockerfile multi-stage front + Nginx sans modèle
- [ ] **Résoudre un problème nouveau** : Prévoir ce que contiendra l'image finale
- [ ] **Repérer les erreurs** : Diagnostiquer une page blanche ou un fichier manquant dans l'image finale
- [ ] **Savoir quand ne pas l’utiliser** : Savoir quand le multi-stage n'apporte rien : une image sans étape de build
