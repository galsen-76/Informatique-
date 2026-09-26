---
created: 2026-09-16
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M05
aliases:
  - "Déploiement & Build Angular"
tags:
  - frameworks/angular/deploiement
parent: "[[Angular]]"
related_theory: []
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://angular.dev/guide/build"
---

# Déploiement & Build Angular

> [!abstract] En bref
> Le **build** transforme ton projet TypeScript en quelques fichiers JavaScript, CSS et HTML optimisés. Le **déploiement** les met en ligne. Une application Angular sans SSR, ce sont juste des **fichiers statiques** : n'importe quel hébergeur de fichiers suffit.

## Construire

```bash
ng build          # version de production dans dist/cinetrack/browser/
```

Ce que fait le build :
- convertit le TypeScript en JavaScript ;
- **supprime** le code inutilisé et réduit la taille (minification) ;
- découpe en **morceaux** (un par route chargée à la demande) ;
- ajoute une empreinte aux noms de fichiers (`main-4f3a2b.js`) pour que le navigateur recharge seulement ce qui a changé.

## Les environnements

```ts
// src/environments/environment.ts          (développement)
export const environment = { apiUrl: 'http://localhost:3000', imageUrl: 'https://image.tmdb.org/t/p/w342' };

// src/environments/environment.prod.ts     (production)
export const environment = { apiUrl: 'https://api.cinetrack.fr', imageUrl: 'https://image.tmdb.org/t/p/w342' };
```

`angular.json` remplace le fichier selon la configuration (`fileReplacements`). Génération : `ng generate environments`.

> [!warning] Rien de secret
> Tout ce qui est dans `environment.ts` finit dans le JavaScript envoyé au navigateur : **visible par tous**.

## Mettre en ligne

| Hébergeur | Pour |
|---|---|
| GitLab Pages / GitHub Pages | projets perso, gratuit |
| Netlify, Vercel, Cloudflare Pages | gratuit, déploiement automatique à chaque push |
| Nginx dans un conteneur Docker | en entreprise, avec le back (voir [[CICD-02-Pipeline-Full-Stack\|pipeline full stack]]) |

**Le réglage indispensable :** le serveur doit renvoyer `index.html` pour **toutes** les URL, sinon rafraîchir `/movies/42` donne une erreur 404.

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

Sur GitLab / GitHub Pages : copier `index.html` en `404.html`, et régler `--base-href /cinetrack/` si le site est dans un sous-dossier.

## Dans un pipeline CI

```yaml
build:
  image: node:22
  script:
    - npm ci
    - npm run lint
    - npm test -- --no-watch
    - npx ng build
  artifacts:
    paths: [dist/]
```

Voir [[CICD-01-Fondamentaux|CI/CD]].

## Pièges

- **Tester seulement avec `ng serve`** : le build de production peut révéler des erreurs (budgets, code inutilisé). Lance `ng build` avant de pousser.
- **Oublier `base-href`** quand le site est dans un sous-dossier : écran blanc, fichiers introuvables.
- **Mettre une clé secrète dans `environment.ts`**.
