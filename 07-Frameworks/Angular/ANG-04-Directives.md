---
created: 2026-09-16
modified: 2026-09-16
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M04
aliases:
  - "Directives Angular"
tags:
  - frameworks/angular/directives
parent: "[[Angular]]"
children: []
related_theory: []
related_snippets:
  - "[[04_Snippets/angular-directives]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://angular.dev/guide/directives"
---

# Directives Angular

> [!abstract] Introduction
> Une directive est une instruction collée sur une balise HTML pour lui donner un comportement ou une apparence supplémentaire, sans créer un composant entier.

> [!warning]- Prérequis
> [[ANG-03-Templates-Data-Binding|Templates et Data Binding Angular]].

---

## Théorie

> [!question]- C'est quoi ?
> 2 catégories : structurelles (`@if`, `@for`, changent le HTML présent) et d'attribut (`ngClass`, modifient un élément existant).

> [!example]- Analogie
> Une directive structurelle est un videur de boîte de nuit (décide qui entre ou reste dehors — ajoute/retire des éléments). Une directive d'attribut est un maquilleur (change l'apparence de ce qui est déjà là, sans rien ajouter ni retirer).

> [!question]- Pourquoi l'utiliser ?
> Manipuler le HTML de façon déclarative plutôt qu'avec du JavaScript manuel (cacher, répéter des éléments).

> [!question]- Comment ça marche ?
> ```html
> @if (filmEstNote) {
>   <p>Ce film a une note</p>
> }
> @for (film of films; track film.id) {
>   <li>{{ film.titre }}</li>
> }
> <p [ngClass]="{ 'favori': estFavori }">Titre</p>
> ```

> [!question]- Quand l'utiliser ?
> `@if`/`@for` pour afficher/masquer ou lister ; `ngClass`/`ngStyle` pour l'apparence conditionnelle.

> [!danger]- Quand NE PAS l'utiliser / Limites
> `track` est obligatoire avec `@for` — l'omettre (ou mal le choisir) dégrade sérieusement la performance sur de grandes listes qui changent souvent.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Directive structurelle | Ajoute/retire des éléments du DOM |
| `track` | Identifie chaque élément de liste de façon unique |

---

## Points clés

- `@if`/`@for`/`@switch` remplacent `*ngIf`/`*ngFor`/`*ngSwitch` depuis Angular 17
- `track` obligatoire avec `@for`
- Directive structurelle = ajoute/retire, directive d'attribut = modifie sans retirer

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Oublier `track` dans `@for` (erreur de compilation avec la nouvelle syntaxe)
> - Utiliser encore `*ngIf`/`*ngFor` sur un nouveau projet sans raison

---

## Paramètres / Configuration

| Directive | Description | Notes |
|-----------|-------------|-------|
| `@if / @else` | Condition | Remplace `*ngIf` |
| `@for (x of l; track x.id)` | Boucle | `track` obligatoire |
| `[ngClass]` | Classes conditionnelles | Objet `{classe: condition}` |

---

## Exemple minimal

```typescript
template: `
  @for (film of films; track film.id) {
    <li [ngClass]="{ 'favori': film.estFavori }">{{ film.titre }}</li>
  }
`
```

> [!note] Ce que j'en retiens
> `track` permet à Angular de savoir quel élément a changé sans redessiner toute la liste.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Créer ses propres directives d'attribut (`@Directive`) et les composer via `hostDirectives`
> - Migration automatique vers le contrôle de flux : `ng generate @angular/core:control-flow`

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Angular]]
- Sous-sujets → (aucun)
- À comparer avec → [[VUE-04-Directives-Templates|Directives & Templates Vue.js]]

**Pratique :**
- Extrait de code → [[04_Snippets/angular-directives]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> Pourrais-je expliquer pourquoi `track` améliore la performance, sans dire "DOM" ?

> [!faq]- Questions d'entretien
> - Différence entre directive structurelle et directive d'attribut ?

---

## Tâches

- [ ] #task Refaire une liste avec la nouvelle syntaxe `@for`/`@if`
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Gain de performance concret entre l'ancienne et la nouvelle syntaxe ?
