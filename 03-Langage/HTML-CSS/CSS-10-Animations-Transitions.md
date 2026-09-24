---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M03
tags:
  - frontend/css/animations
aliases:
  - "Animations et Transitions CSS"
parent: "[[HTML-CSS]]"
children: []
related_theory:
  - "[[ANG-15-Performance-Bonnes-Pratiques|Performance & Bonnes Pratiques Angular]]"
related_snippets:
  - "[[04_Snippets/css-10-animations-transitions]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://web.dev/learn/css/animations"
---

# Animations et Transitions CSS

> [!abstract] Introduction
> Les transitions animent le passage d'un état à un autre, les keyframes décrivent des animations complètes ; bien utilisées (transform/opacity), elles restent fluides à 60 images/seconde.

> [!warning]- Prérequis
> [[CSS-02-Box-Model|Box Model CSS]]

---

## Théorie

> [!question]- C'est quoi ?
> ```css
> .btn { transition: transform 150ms ease-out, background-color 150ms; }
> .btn:hover { transform: translateY(-2px); }
> @keyframes apparition { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
> .toast { animation: apparition 200ms ease-out; }
> ```

> [!example]- Analogie
> Une transition est un fondu enchaîné entre deux diapositives ; une animation keyframes est un petit film avec plusieurs images clés.

> [!question]- Pourquoi l'utiliser ?
> Feedback visuel (survol, chargement), continuité (apparition d'une modale) — l'interface paraît plus réactive.

> [!question]- Comment ça marche ?
> Performance : animer `transform` et `opacity` (gérés par le GPU, pas de reflow). Éviter d'animer `width`, `height`, `top`, `left`.
> Accessibilité : respecter `prefers-reduced-motion`.
> Frameworks : `<Transition>` Vue, animations Angular (`@angular/animations`, ou classes CSS `animate.enter/leave` dans les versions récentes), View Transitions API.

> [!question]- Quand l'utiliser ?
> Micro-interactions de 100 à 300 ms ; pas d'animation décorative longue sur des actions fréquentes.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Trop d'animations fatiguent et ralentissent sur mobile bas de gamme.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Transition | Animation entre deux états |
| Keyframes | Étapes d'une animation |
| Easing | Courbe d'accélération |
| Reflow | Recalcul de layout coûteux |

---

## Points clés

- Animer `transform`/`opacity` uniquement si possible
- 100–300 ms pour l'UI
- Toujours gérer `prefers-reduced-motion`

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - `transition: all` → anime des propriétés inattendues, coûteux
> - Animer `height: auto` (impossible directement)

---

## Exemple minimal

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; }
}
```

> [!note] Ce que j'en retiens
> Une règle globale rend l'app confortable pour les personnes sensibles aux mouvements.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Utiliser la View Transitions API pour les changements de route
> - Profiler une animation dans l'onglet Performance

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[HTML-CSS]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/css-10-animations-transitions]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi animer `transform` est-il plus performant qu'animer `left` ?

---

## Tâches

- [ ] #task Ajouter une transition d'apparition aux cartes de films
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
