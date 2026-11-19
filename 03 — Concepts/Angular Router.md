---
type: concept
domain: frontend
module: "[[Module 20 - Angular]]"
status: a-decouvrir
level: intermediaire
prerequisites:
  - "[[Application monopage et routage]]"
  - "[[Composant Angular]]"
parents:
  - "[[Angular]]"
related:
  - "[[Vue Router]]"
next_review: 
method: []
tags:
  - concept
  - frontend
---
# Angular Router

> [!info] En une phrase
> Le routeur d'Angular associe des adresses à des composants, avec paramètres, chargement à la demande et gardes qui contrôlent l'accès aux pages.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
```ts
// app.routes.ts
export const routes: Routes = [
  { path: "", component: AccueilComponent },
  { path: "taches", component: ListeTachesComponent },
  { path: "taches/:id", component: DetailTacheComponent },
  { path: "admin", loadComponent: () => import("./admin/admin.component").then((m) => m.AdminComponent),
    canActivate: [authGuard] },
  { path: "**", component: IntrouvableComponent },
];
export const authGuard: CanActivateFn = () =>
  inject(AuthService).connecte() ? true : inject(Router).parseUrl("/connexion");
```
- `<router-outlet />` : là où s'affiche la page ; `<a routerLink="/taches">` pour naviguer.
- Lire un paramètre : `inject(ActivatedRoute).snapshot.paramMap.get("id")`, ou avec `withComponentInputBinding()` une simple entrée `id = input<string>()`.
- `loadComponent` : la page est téléchargée seulement à la première visite.

### Pourquoi ça existe
Une application Angular a de nombreux écrans, dont certains réservés.

### Le problème résolu
Navigation instantanée, adresses partageables, chargement à la demande et redirection des utilisateurs non connectés.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
U[Adresse] --> R[Router]
  R --> G{canActivate}
  G -->|ok| C[Composant]
  G -->|non| L[Connexion]
```

### Exemple concret
```html
<nav><a routerLink="/" routerLinkActive="actif">Accueil</a> <a routerLink="/taches">Tâches</a></nav>
<router-outlet />
```
Même règle que toute [[Application monopage et routage|SPA]] : le serveur renvoie `index.html` pour toutes les adresses.

### Cas d'utilisation
- Toute application Angular
- Espaces d'administration

> [!warning] À ne pas confondre
> Une garde protège l'**interface**, pas les **données** : l'API doit vérifier l'autorisation elle-même.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin avec mes mots (section 4).

> [!example] 🛣️ Suis le trajet
> Dessine une navigation vers une route protégée par une garde : l'adresse, la garde qui vérifie, le composant affiché ou la redirection.

> [!example] 🔄 Change de contexte
> Redessine-la avec une route chargée à la demande. Quand le code du module est-il téléchargé ?

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Angular Router » et je l'intègre ici avec `![[Schéma - Angular Router.excalidraw]]`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : je l'applique dans mon travail (CVAT, Nuclio) ou je demande une étape à Claude.

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _J'explique mon schéma avec mes mots, sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Application monopage et routage]] · [[Composant Angular]]
- **Complémentaires** : [[Vue Router]]

## 6 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
La notion est maîtrisée quand je sais :
1. **l'expliquer** de façon fluide, à partir de mon schéma (section 4) ;
2. **l'adapter** à un autre contexte (consigne « Change de contexte », ou Claude m'interroge sur un autre cas) ;
3. **l'appliquer** pour de vrai dans le fil rouge (section 3).

Réussir un exercice ne suffit pas. C'est moi qui passe le statut en `maitrise`.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
