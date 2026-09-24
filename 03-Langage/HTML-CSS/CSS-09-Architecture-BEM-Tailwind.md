---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M03
tags:
  - frontend/css/architecture
aliases:
  - "Architecture CSS BEM et Tailwind"
parent: "[[HTML-CSS]]"
children: []
related_theory:
  - "[[CSS-08-SCSS-Sass|SCSS Sass]]"
related_snippets:
  - "[[04_Snippets/css-09-architecture-bem-tailwind]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://tailwindcss.com/docs"
---

# Architecture CSS BEM et Tailwind

> [!abstract] Introduction
> Sur un gros projet, il faut une stratégie pour nommer et organiser le CSS : conventions (BEM), encapsulation des composants (Angular/Vue), ou CSS utilitaire (Tailwind).

> [!warning]- Prérequis
> [[CSS-01-Selecteurs-Cascade-Specificite|Sélecteurs Cascade et Spécificité CSS]]

---

## Théorie

> [!question]- C'est quoi ?
> **BEM** (Block, Element, Modifier) : `.film-card`, `.film-card__titre`, `.film-card--favori`.
> **Utility-first (Tailwind)** : `<div class="flex gap-4 p-4 rounded-lg shadow">`.
> **Encapsulation composant** : Angular `ViewEncapsulation.Emulated`, Vue `<style scoped>` → styles limités au composant.

> [!example]- Analogie
> BEM, c'est étiqueter chaque boîte d'un déménagement « cuisine / assiettes / fragile » ; Tailwind, c'est avoir un kit de pièces standard qu'on assemble directement sur place.

> [!question]- Pourquoi l'utiliser ?
> Éviter les conflits de noms, le CSS mort qui s'accumule et la peur de modifier une règle.

> [!question]- Comment ça marche ?
> | Approche | + | − |
> |---|---|---|
> | BEM + SCSS | Lisible, sémantique | Verbeux, discipline requise |
> | Styles scopés | Isolation automatique | Styles globaux à gérer à part |
> | Tailwind | Rapide, pas de CSS mort, cohérent | HTML chargé, apprentissage des classes |
> | Composants UI (Material, PrimeVue) | Productivité | Personnalisation parfois difficile |

> [!question]- Quand l'utiliser ?
> Suivre la convention de l'équipe. Encapsulation de composant + tokens CSS est un bon socle ; Tailwind est très répandu dans les projets Vue/Nuxt récents.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Mélanger 3 stratégies dans un même projet = chaos. Les surcharges de librairie (Material) nécessitent leurs propres APIs de thème.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| BEM | Convention Bloc__Élément--Modificateur |
| Utility-first | Classes à usage unique combinées dans le HTML |
| CSS mort | Règles qui ne s'appliquent plus à rien |

---

## Points clés

- Une seule stratégie par projet
- Styles de composant scopés + tokens globaux
- Tailwind : purge automatique du CSS inutilisé

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - `::ng-deep` / `:deep()` utilisé partout pour « forcer » des styles
> - Classes Tailwind construites dynamiquement par concaténation (non détectées au build)

---

## Exemple minimal

```html
<!-- BEM -->
<article class="film-card film-card--favori">
  <h2 class="film-card__titre">Dune</h2>
</article>
<!-- Tailwind -->
<article class="rounded-lg border p-4 shadow-sm data-[favori=true]:border-amber-400">
  <h2 class="text-lg font-semibold">Dune</h2>
</article>
```

> [!note] Ce que j'en retiens
> Deux philosophies pour le même résultat ; l'important est la cohérence d'équipe.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Construire un design system (tokens + composants) documenté dans Storybook

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[HTML-CSS]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/css-09-architecture-bem-tailwind]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi le CSS scopé réduit-il le besoin de BEM ?

---

## Tâches

- [ ] #task Demander au travail quelle convention CSS est utilisée et pourquoi
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
