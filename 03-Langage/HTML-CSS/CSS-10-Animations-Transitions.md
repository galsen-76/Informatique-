---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M03
tags:
  - frontend/css/animations
aliases:
  - "Animations et Transitions CSS"
parent: "[[HTML-CSS]]"
related_theory:
  - "[[ANG-15-Performance-Bonnes-Pratiques|Performance & Bonnes Pratiques Angular]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://web.dev/learn/css/animations"
---

# Animations et Transitions CSS

> [!abstract] En bref
> Une **transition** anime le passage d'un état à un autre (survol d'un bouton). Une **animation** (`@keyframes`) décrit un mouvement complet (un chargement qui tourne). Règle d'or pour qu'elles restent fluides : n'animer que `transform` et `opacity`.

## La transition : le cas le plus courant

```css
.carte {
  transition: transform 0.2s ease, border-color 0.2s ease;
}
.carte:hover {
  transform: translateY(-4px);   /* la carte se soulève légèrement */
  border-color: var(--primaire);
}
```

Se lit : « quand `transform` ou `border-color` change, fais-le en douceur sur 0,2 seconde ».

| Partie | Valeurs |
|---|---|
| propriété | celle(s) qui changent |
| durée | `0.15s` à `0.3s` pour une interface (au-delà, ça paraît lent) |
| courbe | `ease` (naturel), `ease-out` (rapide puis ralentit), `linear` |

## L'animation : un mouvement complet

```css
@keyframes tourner {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.loader {
  animation: tourner 1s linear infinite;
}

@keyframes apparaitre {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

.toast { animation: apparaitre 0.25s ease-out; }
```

## Pourquoi seulement `transform` et `opacity` ?

| Animer… | Coût pour le navigateur |
|---|---|
| `transform` (déplacer, agrandir, tourner), `opacity` | **faible** : fluide |
| `width`, `height`, `top`, `margin` | **élevé** : recalcul de toute la mise en page à chaque image → saccades |

Pour déplacer : `transform: translateX(…)`, pas `left`. Pour agrandir : `transform: scale(1.05)`, pas `width`.

## Respecter les réglages de l'utilisateur

Certaines personnes ont le mal des transports avec les animations et l'ont désactivé dans leur système :

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Dans les frameworks

- **Vue** : `<Transition name="fade">` ajoute et retire automatiquement des classes quand un élément apparaît ou disparaît (`v-if`).
- **Angular** : `animate.enter` / `animate.leave` (versions récentes) ou le module `@angular/animations`.
- PrimeVue et PrimeNG animent déjà leurs composants.

## Pièges

- **`transition: all`** : anime aussi ce que tu ne voulais pas, et coûte plus cher. Liste les propriétés.
- **Trop d'animations** : une interface pro reste sobre. Survol, apparition, chargement : c'est suffisant.
