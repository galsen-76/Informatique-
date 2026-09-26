---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M11
tags:
  - infra/hebergement-front
aliases:
  - "Héberger un Front"
parent: "[[Infrastructure]]"
related_theory:
  - "[[ANG-17-Deploiement-Build|Déploiement & Build Angular]]"
  - "[[NET-06-Cookies-Cache-HTTP|Cookies et Cache HTTP]]"
  - "[[NET-09-Proxy-Reverse-Proxy-Load-Balancer|Proxy Reverse Proxy et Load Balancer]]"
related_projects:
  - "[[02_Projects/CinéTrack-Fullstack]]"
source: "https://angular.dev/tools/cli/deployment"
---

# Héberger un Front

> [!abstract] En bref
> Une fois construite (`npm run build`), une application Angular ou Vue n'est qu'un **dossier de fichiers statiques** (HTML, JS, CSS, images). N'importe quel hébergeur de fichiers peut la servir, souvent **gratuitement** et avec HTTPS automatique. C'est la façon de mettre ton Portfolio en ligne.

## Les options

| Hébergeur | Points forts | Pour |
|---|---|---|
| **GitLab Pages** | intégré à ton dépôt GitLab, gratuit | le Portfolio (déploiement par le pipeline) |
| **Netlify** / **Vercel** | déploiement automatique à chaque push, aperçu de chaque MR, gratuit | projets perso |
| **Cloudflare Pages** | très rapide partout, gratuit | projets perso |
| **Nginx dans un conteneur** | tu contrôles tout | en entreprise, avec l'API (voir [[DK-08-Multi-stage-Builds\|Multi-stage]]) |
| **Stockage objet + CDN** (S3 + CloudFront) | très gros trafic | grandes entreprises |

## Les 3 réglages indispensables

### 1. Toutes les URL renvoient `index.html`

Le routage se fait dans le navigateur. Si quelqu'un ouvre directement `/projects/cinetrack`, le serveur doit renvoyer `index.html` (sinon : 404).

| Hébergeur | Réglage |
|---|---|
| GitLab / GitHub Pages | copier `index.html` en `404.html` |
| Netlify | fichier `_redirects` : `/*  /index.html  200` |
| Vercel | `vercel.json` avec une règle de réécriture |
| Nginx | `try_files $uri $uri/ /index.html;` |

### 2. Le bon chemin de base

Si le site est dans un sous-dossier (`ton-nom.gitlab.io/portfolio/`) :
- Vue / Vite : `base: '/portfolio/'` dans `vite.config.ts` ;
- Angular : `ng build --base-href /portfolio/`.

Sinon : écran blanc, fichiers introuvables.

### 3. L'URL de l'API selon l'environnement

`.env.production` (Vite) ou `environment.prod.ts` (Angular) : l'URL de l'API de production. **Aucun secret** : tout est visible.

## Le Portfolio sur GitLab Pages

Le job `pages` du pipeline publie le dossier `public/` (voir [[03-CI-CD|GitLab CI/CD]]). L'adresse : `https://ton-nom.gitlab.io/portfolio/`, puis ton propre domaine (voir [[NET-04-DNS|DNS]]).

## Après la mise en ligne

- **Lighthouse** sur la version en ligne : performance, accessibilité, SEO.
- Vérifie l'**aperçu de partage** (colle le lien dans LinkedIn) : balises `og:` (voir [[HTML-06-Head-Meta-Scripts|Head et meta]]).
- Vérifie les **routes** en ouvrant directement une page interne et en rafraîchissant.

## Pièges

- **Écran blanc** après déploiement : presque toujours le chemin de base, ou la console montre un fichier introuvable.
- **404 au rafraîchissement** : la règle « tout vers `index.html` » manque.
- **Les utilisateurs gardent l'ancienne version** : `index.html` mis en cache trop longtemps (voir [[NET-06-Cookies-Cache-HTTP|Cache HTTP]]).
