---
type: concept
domain: frontend
module: "[[Module 19 - Vue.js]]"
status: a-decouvrir
level: debutant
prerequisites:
  - "[[Composant monofichier Vue (SFC)]]"
  - "[[Formulaire HTML]]"
parents:
  - "[[Vue.js]]"
related:
  - "[[Réactivité Vue (ref et computed)]]"
next_review: 
method: []
tags:
  - concept
  - frontend
---
# Directives Vue

> [!info] En une phrase
> Les directives sont des attributs spéciaux du template Vue (v-if, v-for, v-model, v-bind, v-on) qui affichent conditionnellement, répètent, lient des valeurs ou écoutent des événements.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
| Directive | Raccourci | Rôle |
| --- | --- | --- |
| `v-if` / `v-else-if` / `v-else` | | afficher ou non (l'élément est créé ou retiré) |
| `v-show` | | cacher en CSS (l'élément reste) |
| `v-for="t in taches" :key="t.id"` | | répéter |
| `v-bind:href="url"` | `:href` | lier un attribut à une valeur |
| `v-on:click="f"` | `@click` | écouter un événement (`@submit.prevent` fait `preventDefault`) |
| `v-model="texte"` | | liaison dans les deux sens avec un champ de formulaire |
| `v-html` | | insérer du HTML (danger [[XSS]]) |
`{{ expression }}` affiche une valeur en l'**échappant** (sans risque).

### Pourquoi ça existe
Un template doit pouvoir exprimer des conditions, des boucles et des liaisons sans devenir du JavaScript.

### Le problème résolu
Écrire des interfaces dynamiques en restant proche du HTML.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
D[Données] -->|v-bind, interpolation| T[Template]
  T -->|v-on| M[Méthodes]
  T <-->|v-model| D
```

### Exemple concret
```vue
<template>
  <form @submit.prevent="ajouter">
    <input v-model.trim="texte" placeholder="Nouvelle tâche" />
    <button :disabled="!texte">Ajouter</button>
  </form>
  <p v-if="taches.length === 0">Aucune tâche</p>
  <ul v-else>
    <li v-for="t in taches" :key="t.id" :class="{ fini: t.fini }" @click="t.fini = !t.fini">
      {{ t.nom }}
    </li>
  </ul>
</template>
```

### Cas d'utilisation
- Formulaires
- Listes
- Affichage conditionnel

> [!warning] À ne pas confondre
> `v-if` (retire l'élément du DOM) et `v-show` (le garde, masqué) : `v-show` pour un affichage qui bascule souvent. Et ne mets pas `v-if` et `v-for` sur le même élément : filtre avec un `computed`.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin avec mes mots (section 4).

> [!example] 🧠 Dessine de mémoire
> Dessine un template Vue de la liste des dépenses et étiquette chaque directive (`v-for`, `v-if`, `v-model`, `v-on`, `v-bind`) avec ce qu'elle fait.

> [!example] 🔍 Trouve l'erreur
> Ce schéma est faux. Corrige-le en rouge et explique l'erreur.
>
> ```mermaid
> flowchart TD
>   I[input montant] --> B[v-bind]
>   B --> D[Donnée mise à jour]
> ```

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Directives Vue » et je l'intègre ici avec `![[Schéma - Directives Vue.excalidraw]]`._

### Appliquer dans le fil rouge
- [[MesDépenses 03 - Vue, afficher la liste]]
- [[MesDépenses 05 - Vue, ajouter et supprimer]]

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _J'explique mon schéma avec mes mots, sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Composant monofichier Vue (SFC)]] · [[Formulaire HTML]]
- **Complémentaires** : [[Réactivité Vue (ref et computed)]]

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
