---
type: concept
domain: frontend
module: "[[Module 11 - React]]"
status: a-decouvrir
level: intermediaire
niveau: 6
schema: false
exercice_visuel: false
fil_rouge: false
prerequisites:
  - "[[Composant d'interface]]"
  - "[[Client-serveur]]"
  - "[[HTTP]]"
parents:
  - "[[React]]"
related:
  - "[[Reverse proxy]]"
next_review: 
tags:
  - concept
  - frontend
---
# Application monopage et routage

> [!info] En une phrase
> Une application monopage (SPA) charge une seule page HTML puis change l'affichage en JavaScript ; le routage côté client associe chaque adresse (/taches/12) à un composant sans recharger la page.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
**SPA** (*Single Page Application*) : le serveur envoie un `index.html` presque vide et un gros fichier JavaScript. Ensuite, les données viennent de l'[[API]] en JSON et la navigation se fait **dans le navigateur**.
Le **routeur** (React Router, Vue Router, Angular Router) lit l'adresse et affiche le bon composant :
```tsx
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";
<BrowserRouter>
  <nav><Link to="/">Accueil</Link> <Link to="/taches">Tâches</Link></nav>
  <Routes>
    <Route path="/" element={<Accueil />} />
    <Route path="/taches" element={<ListeTaches />} />
    <Route path="/taches/:id" element={<DetailTache />} />
    <Route path="*" element={<Introuvable />} />
  </Routes>
</BrowserRouter>
function DetailTache() { const { id } = useParams(); /* … */ }
```

### Pourquoi ça existe
Recharger toute la page à chaque clic est lent et perd l'état de l'interface.

### Le problème résolu
Une navigation instantanée, des adresses partageables (`/taches/12`) et le bouton Précédent qui fonctionne.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
U["/taches/12"] --> R[Routeur]
  R --> C[DetailTache]
  C -->|fetch| A[API]
```

### Exemple concret
Conséquence côté serveur : si on ouvre directement `https://app.ex/taches/12`, le serveur doit renvoyer `index.html` (et pas une 404), puis le routeur fait le reste.
```nginx
location / { try_files $uri /index.html; }
```
Gmail ou GitLab sont des SPA : l'adresse change sans recharger la page, c'est leur routeur qui choisit l'écran.

> [!abstract]- Comment ça s'écrit (référence à chercher, pas à apprendre par cœur)
> L'idée est la même partout ; seule l'écriture change.
>
> **Vue (Vue Router)**
> ```js
> const routes = [
>   { path: "/", component: Liste },
>   { path: "/depenses/:id", component: Detail },
> ];
> // <RouterLink to="/depenses/3"> · useRoute().params.id
> ```
>
> **Angular (Router)**
> ```ts
> export const routes: Routes = [
>   { path: "", component: ListeComponent },
>   { path: "depenses/:id", component: DetailComponent, canActivate: [connecteGuard] },
> ];
> // <a routerLink="/depenses/3"> · route.snapshot.paramMap.get("id")
> ```
>
> **React (React Router)**
> ```jsx
> <Route path="/depenses/:id" element={<Detail />} />
> // <Link to="/depenses/3"> · useParams().id
> ```
> Partout : une liste « adresse → composant », des paramètres dans l'adresse, et un serveur (nginx) qui renvoie `index.html` pour toutes les adresses.

### Cas d'utilisation
- Tout frontend React, Vue ou Angular
- Configuration du serveur ou du reverse proxy d'une SPA

> [!warning] À ne pas confondre
> `<a href>` recharge toute la page ; dans une SPA, utilise le composant `Link` du routeur. Et une SPA n'est pas idéale pour le référencement : les frameworks comme Next.js ou Nuxt génèrent le HTML côté serveur (SSR).

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] ⚖️ Avant / après
> Avant / après : un site classique qui recharge une page par adresse, puis une SPA. Dessine ce que le serveur envoie dans chaque cas.

> [!example] 🛣️ Suis le trajet
> Dessine ce qui arrive quand tu recharges `/depenses/3` sur le front Vue servi par nginx. Où faut-il une règle pour renvoyer `index.html` ?

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Application monopage et routage » et je l'intègre ici avec `![[Schéma - Application monopage et routage.excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- [[MesDépenses Front 04 - Le front Vue dans Docker]]
- [[MesDépenses Front 09 - Le front Angular dans Docker]]

## 4 · Relier
- **Au travail** : [Application monopage et routage au travail](obsidian://open?vault=Travail&file=Application%20monopage%20et%20routage%20au%20travail)
- **Prérequis** : [[Composant d'interface]] · [[Client-serveur]] · [[HTTP]]
- **Complémentaires** : [[Reverse proxy]]

## 5 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation (compris, puis maîtrisé)
Trois cases à cocher dans les propriétés de la fiche :
- `schema` : mon dessin du concept est dans « Mon schéma » ;
- `exercice_visuel` : j'ai fait et corrigé les exercices visuels de la section 3 ;
- `fil_rouge` : je l'ai appliqué dans le fil rouge (coché tout seul quand une étape qui l'utilise est réussie).

Les trois cochées : la notion compte comme **comprise**. **Maîtrisé** : c'est moi qui le mets dans `status`, quand je le sens.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
