---
type: notion
statut: a apprendre
resume: "Une fois construite (npm run build), une application Angular ou Vue n'est qu'un dossier de fichiers statiques (HTML, JS, CSS, images)."
revu:
sources:
  - "https://angular.dev/tools/cli/deployment"
---
# Héberger un front

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Une fois construite (`npm run build`), une application Angular ou Vue n'est qu'un **dossier de fichiers statiques** (HTML, JS, CSS, images).

## Le problème

**Pourquoi c'est utile ?**
Pour mettre en ligne les fichiers statiques d'une application Angular ou Vue.

**Qu'est-ce qui se passait sans ça ?**
On louait un serveur complet juste pour servir quelques fichiers.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

N'importe quel hébergeur de fichiers peut la servir, souvent **gratuitement** et avec HTTPS automatique. C'est la façon de mettre ton Portfolio en ligne.

### Les options

| Hébergeur | Points forts | Pour |
|---|---|---|
| **GitLab Pages** | intégré à ton dépôt GitLab, gratuit | le Portfolio (déploiement par le pipeline) |
| **Netlify** / **Vercel** | déploiement automatique à chaque push, aperçu de chaque MR, gratuit | projets perso |
| **Cloudflare Pages** | très rapide partout, gratuit | projets perso |
| **Nginx dans un conteneur** | tu contrôles tout | en entreprise, avec l'API (voir Multi-stage) |
| **Stockage objet + CDN** (S3 + CloudFront) | très gros trafic | grandes entreprises |

### Les 3 réglages indispensables

#### 1. Toutes les URL renvoient `index.html`

Le routage se fait dans le navigateur. Si quelqu'un ouvre directement `/projects/cinetrack`, le serveur doit renvoyer `index.html` (sinon : 404).

| Hébergeur | Réglage |
|---|---|
| GitLab / GitHub Pages | copier `index.html` en `404.html` |
| Netlify | fichier `_redirects` : `/*  /index.html  200` |
| Vercel | `vercel.json` avec une règle de réécriture |
| Nginx | `try_files $uri $uri/ /index.html;` |

#### 2. Le bon chemin de base

Si le site est dans un sous-dossier (`ton-nom.gitlab.io/portfolio/`) :
- Vue / Vite : `base: '/portfolio/'` dans `vite.config.ts` ;
- Angular : `ng build --base-href /portfolio/`.

Sinon : écran blanc, fichiers introuvables.

#### 3. L'URL de l'API selon l'environnement

`.env.production` (Vite) ou `environment.prod.ts` (Angular) : l'URL de l'API de production. **Aucun secret** : tout est visible.

### Le Portfolio sur GitLab Pages

Le job `pages` du pipeline publie le dossier `public/` (voir [[Pipeline GitLab CI|GitLab CI/CD]]). L'adresse : `https://ton-nom.gitlab.io/portfolio/`, puis ton propre domaine (voir [[DNS]]).

### Après la mise en ligne

- **Lighthouse** sur la version en ligne : performance, accessibilité, SEO.
- Vérifie l'**aperçu de partage** (colle le lien dans LinkedIn) : balises `og:` (voir [[Head meta et chargement des scripts|Head et meta]]).
- Vérifie les **routes** en ouvrant directement une page interne et en rafraîchissant.

## 🧪 Exemple

> À compléter avec un exemple tiré de ton travail.

## ⚠️ Limites et pièges

- **Écran blanc** après déploiement : presque toujours le chemin de base, ou la console montre un fichier introuvable.
- **404 au rafraîchissement** : la règle « tout vers `index.html` » manque.
- **Les utilisateurs gardent l'ancienne version** : `index.html` mis en cache trop longtemps (voir [[Cookies et cache HTTP|Cache HTTP]]).

## 🔗 Liens

- **Prérequis :** [[Cloud notions de base]]
- **Voir aussi :** [[Déploiement et build Angular]], [[Cookies et cache HTTP]], [[Reverse proxy et load balancer]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://angular.dev/tools/cli/deployment
