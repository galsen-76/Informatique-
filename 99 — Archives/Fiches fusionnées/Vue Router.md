---
type: concept
domain: frontend
module: "[[Module 19 - Vue.js]]"
status: a-decouvrir
level: intermediaire
niveau: 2
schema: false
exercice_visuel: false
fil_rouge: false
prerequisites:
  - "[[Application monopage et routage]]"
  - "[[Composant monofichier Vue (SFC)]]"
parents:
  - "[[Vue.js]]"
related:
  - "[[Pinia]]"
next_review: 
tags:
  - concept
  - frontend
---
# Vue Router

> [!warning] Fiche fusionnée le 19/11/2026
> Un concept = une fiche, quel que soit le langage ou le framework : voir [[Application monopage et routage]].

> [!info] En une phrase
> Vue Router est le routeur officiel de Vue : il associe des adresses à des composants et permet de naviguer dans une application monopage.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
```ts
// router/index.ts
import { createRouter, createWebHistory } from "vue-router";
export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: () => import("../pages/Accueil.vue") },
    { path: "/taches", component: () => import("../pages/Taches.vue") },
    { path: "/taches/:id", component: () => import("../pages/DetailTache.vue"), props: true },
    { path: "/:chemin(.*)*", component: () => import("../pages/Introuvable.vue") },
  ],
});
```
- `<RouterLink to="/taches">` pour naviguer, `<RouterView />` là où la page s'affiche.
- `useRoute().params.id` pour lire un paramètre, `useRouter().push("/")` pour naviguer en code.
- **Gardes de navigation** (`router.beforeEach`) : rediriger vers `/connexion` si l'utilisateur n'est pas connecté.
- `() => import(...)` : la page est chargée seulement quand on y va (*lazy loading*).

### Pourquoi ça existe
Une application Vue a plusieurs écrans qui doivent avoir leur propre adresse.

### Le problème résolu
Navigation instantanée, adresses partageables, protection de pages.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
U[Adresse] --> R[Vue Router]
  R --> G{Garde}
  G -->|ok| P[Page]
  G -->|non| L[Connexion]
```

### Exemple concret
```ts
router.beforeEach((to) => {
  const auth = useAuthStore();
  if (to.path !== "/connexion" && !auth.connecte) return "/connexion";
});
```
Comme pour toute [[Application monopage et routage|SPA]], le serveur doit renvoyer `index.html` pour toutes les adresses.

### Cas d'utilisation
- Toute application Vue à plusieurs écrans
- Pages réservées aux utilisateurs connectés

> [!warning] À ne pas confondre
> Une garde de navigation n'est **pas** une sécurité : elle améliore l'expérience, mais l'[[Autorisation et rôles|autorisation]] doit être vérifiée par l'API.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] 🛣️ Suis le trajet
> Dessine la navigation de `/` vers `/depenses/3` : le routeur lit l'adresse, choisit le composant, lui passe le paramètre.

> [!example] 🔄 Change de contexte
> Redessine-la quand l'utilisateur recharge la page sur `/depenses/3` avec le front servi par nginx. Qui répond en premier ?

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Vue Router » et je l'intègre ici avec `![[Schéma - Vue Router.excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : elle sera pratiquée dans le fil rouge de son niveau (voir [[Niveaux]]).

## 4 · Relier
- **Prérequis** : [[Application monopage et routage]] · [[Composant monofichier Vue (SFC)]]
- **Complémentaires** : [[Pinia]]

## 5 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
Trois cases à cocher dans les propriétés de la fiche :
- `schema` : mon dessin du concept est dans « Mon schéma » ;
- `exercice_visuel` : j'ai fait et corrigé les exercices visuels de la section 3 ;
- `fil_rouge` : je l'ai appliqué dans le fil rouge (coché tout seul quand une étape qui l'utilise est réussie).

Les trois cochées : la notion compte comme **comprise**. **Maîtrisé** : c'est moi qui le mets dans `status`, quand je le sens.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
