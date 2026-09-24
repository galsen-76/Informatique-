---
created: 2026-09-16
modified: 2026-09-16
type: knowledge
status: "🟡 In Progress"
level: Fondamental
month: M04
aliases:
  - "Fondamentaux Angular"
tags:
  - frameworks/angular/fondamentaux
parent: "[[Angular]]"
children:
  - "[[ANG-02-Composants|Composants Angular]]"
  - "[[ANG-03-Templates-Data-Binding|Templates et Data Binding Angular]]"
related_theory: []
related_snippets:
  - "[[04_Snippets/angular-cli-commandes]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://angular.dev"
---

# Fondamentaux Angular

> [!abstract] Introduction
> Angular est un framework complet pour construire des sites où le contenu change dynamiquement sans recharger la page, en organisant le code en composants réutilisables.

> [!warning]- Prérequis
> [[TS-01-Fondamentaux|Fondamentaux TypeScript]] (Angular s'écrit exclusivement en TypeScript).

---

## Théorie

> [!question]- C'est quoi ?
> Angular fournit un CLI, des composants, des services, un routing intégré, et TypeScript par défaut — un ensemble complet, pas une simple librairie qu'on assemble soi-même.

> [!example]- Analogie
> React est une boîte de Lego libre (tu assembles ce que tu veux, comme tu veux). Angular est un meuble en kit avec un manuel strict — plus rigide, mais garantit que tout le monde le monte de la même façon.

> [!question]- Pourquoi l'utiliser ?
> Sans framework, une application complexe devient vite ingérable. Angular impose une structure commune qui facilite le travail en équipe et la maintenance à long terme.

> [!question]- Comment ça marche ?
> ```bash
> ng new mon-app
> ng serve
> ng generate component header
> ```
> Une application Angular est un arbre de composants imbriqués, compilé en une SPA (Single Page Application) qui se met à jour sans rechargement complet.

> [!question]- Quand l'utiliser ?
> Applications complexes d'entreprise, avec une équipe qui a besoin d'une structure stricte imposée dès le départ.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Pour un site vitrine simple ou statique, Angular est disproportionné — sa courbe d'apprentissage et sa taille de bundle ne se justifient que pour de vraies applications interactives.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| SPA | Single Page Application — une seule page HTML qui change de contenu en JavaScript |
| CLI | Command Line Interface, l'outil `ng` qui génère et gère le projet |

---

## Points clés

- Framework complet, contrairement à React qui est une librairie qu'on assemble
- Le CLI (`ng`) génère du code cohérent automatiquement
- TypeScript par défaut, quasi jamais omis en pratique
- Une app = un arbre de composants imbriqués

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Créer des fichiers à la main plutôt qu'avec `ng generate`, perdant la cohérence de structure
> - Sous-estimer le temps d'apprentissage initial en comparant à un framework plus léger

---

## Paramètres / Configuration

| Commande CLI | Description | Notes |
|-----------|-------------|-------|
| `ng new mon-projet` | Crée un projet | — |
| `ng generate component nom` | Génère un composant | 4 fichiers créés |
| `ng serve` | Serveur de dev | `localhost:4200` |
| `ng build` | Build production | Génère `/dist` |

---

## Exemple minimal

```bash
ng new mon-app
cd mon-app
ng serve
```

> [!note] Ce que j'en retiens
> Le CLI fait tout le travail de mise en place — jamais besoin de créer les fichiers à la main.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Suivre le rythme de versions (majeure tous les 6 mois) et utiliser `ng update` pour migrer
> - Connaître les grandes évolutions récentes : standalone par défaut, contrôle de flux `@if/@for`, signals, `@defer`, zoneless, SSR avec hydratation

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Angular]]
- Sous-sujets → [[ANG-02-Composants|Composants Angular]], [[ANG-03-Templates-Data-Binding|Templates et Data Binding Angular]]
- À comparer avec → [[VUE-01-Fondamentaux|Fondamentaux Vue.js]]

**Pratique :**
- Extrait de code → [[04_Snippets/angular-cli-commandes]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> Pourrais-je expliquer à quelqu'un la différence Angular/React sans dire "librairie" ni "framework" ?

> [!faq]- Questions d'entretien
> - Qu'apporte Angular par rapport à Vue ?
> - Quelles sont les nouveautés majeures d'Angular ces dernières versions ?

---

## Tâches

- [ ] #task Créer un projet Angular vide et explorer chaque fichier généré
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Qu'est-ce qui différencie vraiment une SPA d'un site multi-pages classique, côté navigateur ?
