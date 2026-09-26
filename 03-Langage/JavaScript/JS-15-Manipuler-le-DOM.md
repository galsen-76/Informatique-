---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - frontend/javascript/dom-manipulation
aliases:
  - "Manipuler le DOM"
parent: "[[JavaScript]]"
children: []
related_theory:
  - "[[JS-14-Selectionner-Elements-DOM|Sélectionner des Éléments du DOM]]"
  - "[[JS-08-DOM-Evenements|DOM et Événements JavaScript]]"
  - "[[SEC-06-XSS-CSRF|XSS et CSRF]]"
related_snippets:
  - "[[04_Snippets/js-15-manipuler-le-dom]]"
related_projects: []
source: "https://developer.mozilla.org/fr/docs/Web/API/Element"
---

# Manipuler le DOM

> [!abstract] Introduction
> Créer, modifier, déplacer et supprimer des éléments, changer leurs classes, attributs, styles et contenu — ce que les frameworks font automatiquement quand tes données changent.

> [!warning]- Prérequis
> [[JS-14-Selectionner-Elements-DOM|Sélectionner des Éléments du DOM]]

---

## Théorie

> [!question]- C'est quoi ?
> | Besoin | Code |
> |---|---|
> | Texte (sûr) | `el.textContent = 'Dune'` |
> | HTML (⚠️ XSS) | `el.innerHTML = '<b>Dune</b>'` |
> | Classes | `el.classList.add/remove/toggle/contains('actif')` |
> | Attributs | `el.setAttribute('aria-expanded', 'true')`, `removeAttribute`, `hasAttribute` |
> | Données | `el.dataset.filmId = '42'` |
> | Style inline | `el.style.setProperty('--couleur', 'red')`, `el.style.display = 'none'` |
> | Créer | `document.createElement('li')` |
> | Insérer | `parent.append(el)`, `prepend`, `el.before(x)`, `el.after(x)` |
> | Remplacer / supprimer | `el.replaceWith(nouveau)`, `el.remove()` |
> | Vider | `parent.replaceChildren()` |
> | Cloner | `el.cloneNode(true)` |
> | Gabarit | `<template>` + `template.content.cloneNode(true)` |

> [!example]- Analogie
> Manipuler le DOM à la main, c'est déplacer les meubles soi-même à chaque changement ; un framework, c'est décrire le plan de la pièce idéale et laisser des déménageurs réorganiser uniquement ce qui a changé.

> [!question]- Pourquoi l'utiliser ?
> Comprendre le coût et les risques de ce que font Angular et Vue, intégrer des librairies externes, et savoir coder une petite page sans framework.

> [!question]- Comment ça marche ?
> ```typescript
> interface Film { id: number; titre: string; favori: boolean }
>
> function rendreListe(conteneur: HTMLUListElement, films: Film[]): void {
>   const fragments = films.map(f => {
>     const li = document.createElement('li');
>     li.textContent = f.titre;                     // jamais innerHTML avec des données
>     li.dataset.id = String(f.id);
>     li.classList.toggle('favori', f.favori);
>     return li;
>   });
>   conteneur.replaceChildren(...fragments);        // une seule mise à jour du DOM
> }
> ```
> Règles de performance : regrouper les modifications (fragment, `replaceChildren`), éviter d'alterner lecture de taille (`offsetHeight`) et écriture de style dans une boucle, modifier des classes plutôt que des styles un par un.

> [!question]- Quand l'utiliser ?
> JS pur, petits scripts, directives Angular / directives Vue, intégration d'une librairie. Dans un composant, laisser le template faire le travail (`@if`, `[class.x]`, `v-if`, `:class`).

> [!danger]- Quand NE PAS l'utiliser / Limites
> Modifier directement le DOM d'un composant Angular/Vue : le framework peut écraser tes changements au prochain rendu, et ça casse en SSR.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| `textContent` | Texte brut, sans interprétation HTML |
| `innerHTML` | Contenu interprété comme HTML |
| Fragment | Conteneur temporaire pour insérer plusieurs éléments en une fois |
| Reflow | Recalcul de mise en page provoqué par une modification |

---

## Points clés

- `textContent` par défaut, `innerHTML` jamais avec des données utilisateur
- `classList.toggle(classe, condition)`
- Insérer en une fois (`append(...liste)`, `replaceChildren`)
- Dans un framework : décrire l'état, pas manipuler le DOM

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - `innerHTML +=` dans une boucle → lent et perd les écouteurs d'événements
> - Modifier `el.style` de dizaines de propriétés au lieu de basculer une classe
> - Supprimer un élément sans retirer ses écouteurs globaux

---

## Exemple minimal

```typescript
// Angular / Vue : la même chose de façon déclarative
// Angular : <li [class.favori]="f.favori" [attr.data-id]="f.id">{{ f.titre }}</li>
// Vue    : <li :class="{ favori: f.favori }" :data-id="f.id">{{ f.titre }}</li>
```

> [!note] Ce que j'en retiens
> Le template décrit le résultat ; le framework calcule les appels `classList`/`setAttribute` à ta place.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Comprendre pourquoi `track`/`:key` permettent de déplacer des éléments existants au lieu de les recréer

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[JavaScript]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[ANG-03-Templates-Data-Binding|Templates & Data Binding Angular]], [[VUE-04-Directives-Templates|Directives & Templates Vue.js]]

**Pratique :**
- Extrait de code → [[04_Snippets/js-15-manipuler-le-dom]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi `textContent` est-il plus sûr qu'`innerHTML` ?

---

## Tâches

- [ ] #task Coder la liste de films du Lab TypeScript en manipulant le DOM à la main, puis comparer avec la version Angular
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
