---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M11
tags:
  - infra/hebergement-front
aliases:
  - "Héberger un Front"
parent: "[[Infrastructure]]"
children: []
related_theory:
  - "[[ANG-17-Deploiement-Build|Déploiement & Build Angular]]"
  - "[[NET-06-Cookies-Cache-HTTP|Cookies et Cache HTTP]]"
  - "[[NET-09-Proxy-Reverse-Proxy-Load-Balancer|Proxy Reverse Proxy et Load Balancer]]"
related_snippets:
  - "[[04_Snippets/cloud-02-heberger-front]]"
related_projects:
  - "[[02_Projects/CinéTrack-Fullstack]]"
source: "https://angular.dev/tools/cli/deployment"
---

# Héberger un Front

> [!abstract] Introduction
> Une SPA Angular/Vue buildée est un ensemble de fichiers statiques : on l'héberge sur un serveur web (Nginx), un hébergeur statique ou un CDN, avec deux règles essentielles — fallback vers index.html et bonne stratégie de cache.

> [!warning]- Prérequis
> [[ANG-17-Deploiement-Build|Déploiement & Build Angular]]

---

## Théorie

> [!question]- C'est quoi ?
> Options :
> - **Nginx** dans un conteneur (image multi-stage) → contrôle total, déploiement sur n'importe quelle infra
> - **Hébergeurs statiques** : GitLab Pages, Netlify, Vercel, Cloudflare Pages, S3 + CloudFront
> - **SSR** (Angular SSR, Nuxt) : nécessite un serveur Node (ou prerender = statique)

> [!example]- Analogie
> Héberger une SPA, c'est poser un présentoir de brochures : il suffit de les distribuer vite (CDN) et de toujours rediriger vers l'accueil (index.html) si quelqu'un demande une page précise.

> [!question]- Pourquoi l'utiliser ?
> Mettre en ligne ton portfolio et tes projets, comprendre comment les applis du travail sont servies.

> [!question]- Comment ça marche ?
> ```dockerfile
> FROM node:22-alpine AS build
> WORKDIR /app
> COPY package*.json ./
> RUN npm ci
> COPY . .
> RUN npm run build
> FROM nginx:1.27-alpine
> COPY nginx.conf /etc/nginx/conf.d/default.conf
> COPY --from=build /app/dist/cinetrack/browser /usr/share/nginx/html
> ```
> (Vue/Vite : `COPY --from=build /app/dist /usr/share/nginx/html`)
> Configuration par environnement : l'image doit être identique partout → charger un `config.json` au démarrage (APP_INITIALIZER / `provideAppInitializer`) plutôt que rebuilder par environnement.

> [!question]- Quand l'utiliser ?
> Toute application front en production.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Les variables d'environnement de build sont figées dans le bundle et publiques.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Statique | Fichiers servis tels quels |
| Fallback | Réponse par défaut (index.html) pour les routes de la SPA |
| CDN | Réseau de distribution proche des utilisateurs |
| Runtime config | Configuration chargée au démarrage de l'app |

---

## Points clés

- `try_files $uri /index.html`
- index.html non caché, assets hashés en cache 1 an
- Compression gzip/brotli
- Même image pour tous les environnements

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Chemin de sortie Angular récent : `dist/<projet>/browser` (et non `dist/<projet>`)
> - Oublier la `base href` si l'app est servie dans un sous-dossier

---

## Exemple minimal

```typescript
// Configuration runtime (Angular)
export const appConfig: ApplicationConfig = {
  providers: [provideAppInitializer(() => inject(ConfigService).charger('/config.json'))],
};
```

> [!note] Ce que j'en retiens
> Un seul build, une config par environnement montée dans le conteneur.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Déployer sur CDN avec invalidation de cache et en-têtes de sécurité (CSP, HSTS)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Infrastructure]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/cloud-02-heberger-front]]
- Projet → [[02_Projects/CinéTrack-Fullstack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi un rafraîchissement sur `/films/42` renvoie-t-il 404 sans fallback ?

---

## Tâches

- [ ] #task Déployer le portfolio sur GitLab Pages et CinéTrack front en conteneur Nginx
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
