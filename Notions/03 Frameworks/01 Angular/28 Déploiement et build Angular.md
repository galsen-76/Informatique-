---
type: notion
statut: a apprendre
resume: "Le build transforme ton projet TypeScript en quelques fichiers JavaScript, CSS et HTML optimisés."
revu:
sources:
  - "https://angular.dev/guide/build"
---
# Déploiement et build Angular

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Le **build** transforme ton projet TypeScript en quelques fichiers JavaScript, CSS et HTML optimisés.

## Le problème

**Pourquoi c'est utile ?**
Pour transformer le projet en fichiers optimisés et les mettre en ligne.

**Qu'est-ce qui se passait sans ça ?**
On ne savait pas quoi mettre sur le serveur, et les routes renvoyaient une 404 au rechargement.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Le **déploiement** les met en ligne. Une application Angular sans SSR, ce sont juste des **fichiers statiques** : n'importe quel hébergeur de fichiers suffit.

### Construire

```bash
ng build          # version de production dans dist/cinetrack/browser/
```

Ce que fait le build :
- convertit le TypeScript en JavaScript ;
- **supprime** le code inutilisé et réduit la taille (minification) ;
- découpe en **morceaux** (un par route chargée à la demande) ;
- ajoute une empreinte aux noms de fichiers (`main-4f3a2b.js`) pour que le navigateur recharge seulement ce qui a changé.

### Mettre en ligne

| Hébergeur | Pour |
|---|---|
| GitLab Pages / GitHub Pages | projets perso, gratuit |
| Netlify, Vercel, Cloudflare Pages | gratuit, déploiement automatique à chaque push |
| Nginx dans un conteneur Docker | en entreprise, avec le back (voir pipeline full stack) |

**Le réglage indispensable :** le serveur doit renvoyer `index.html` pour **toutes** les URL, sinon rafraîchir `/movies/42` donne une erreur 404.

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

Sur GitLab / GitHub Pages : copier `index.html` en `404.html`, et régler `--base-href /cinetrack/` si le site est dans un sous-dossier.

### Dans un pipeline CI

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

Voir [[01 Intégration et déploiement continus|CI/CD]].

## 🧪 Exemple

### Les environnements

```ts
// src/environments/environment.ts          (développement)
export const environment = { apiUrl: 'http://localhost:3000', imageUrl: 'https://image.tmdb.org/t/p/w342' };

// src/environments/environment.prod.ts     (production)
export const environment = { apiUrl: 'https://api.cinetrack.fr', imageUrl: 'https://image.tmdb.org/t/p/w342' };
```

`angular.json` remplace le fichier selon la configuration (`fileReplacements`). Génération : `ng generate environments`.

> [!warning] Rien de secret
> Tout ce qui est dans `environment.ts` finit dans le JavaScript envoyé au navigateur : **visible par tous**.

## ⚠️ Limites et pièges

- **Tester seulement avec `ng serve`** : le build de production peut révéler des erreurs (budgets, code inutilisé). Lance `ng build` avant de pousser.
- **Oublier `base-href`** quand le site est dans un sous-dossier : écran blanc, fichiers introuvables.
- **Mettre une clé secrète dans `environment.ts`**.

## 🏋️ S'entraîner

### Exercices

#### Exercice 1 · Construire pour la production

Quelle commande produit le build de production ? Où sont les fichiers, et que faut-il configurer sur l'hébergeur pour que `/movies/42` ne donne pas une erreur 404 au rechargement ?

> [!success]- Solution
> ```bash
> ng build
> ```
>
> Les fichiers sont dans `dist/cinetrack/browser/`.
>
> C'est une application à page unique : toutes les URL doivent renvoyer `index.html`, puis Angular affiche la bonne page. Sur l'hébergeur, on ajoute une **règle de réécriture** (par exemple sur Netlify, un fichier `_redirects` contenant `/* /index.html 200`).

#### Exercice 2 · Les environnements

Tu veux une URL d'API différente en développement et en production. Comment l'organiser avec Angular ?

> [!success]- Solution
> ```bash
> ng generate environments
> ```
>
> ```ts
> // src/environments/environment.development.ts
> export const environment = { apiUrl: 'https://api.themoviedb.org/3', production: false };
>
> // src/environments/environment.ts
> export const environment = { apiUrl: 'https://api.themoviedb.org/3', production: true };
> ```
>
> Le CLI remplace le fichier selon la configuration (`ng serve` = développement, `ng build` = production). Ne jamais y mettre de vrai secret : tout finit dans le bundle public.

## 🔗 Liens

- **Prérequis :** [[01 Fondamentaux Angular|Fondamentaux Angular]]
- **Voir aussi :** 
- **Utilisé dans :** 

## 📚 Notes

- Source : https://angular.dev/guide/build
