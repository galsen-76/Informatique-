---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - frontend/css/responsive
aliases:
  - "Responsive Design"
parent: "[[HTML-CSS]]"
children: []
related_theory:
  - "[[CSS-03-Flexbox|Flexbox CSS]]"
  - "[[CSS-04-Grid|Grid CSS]]"
related_snippets:
  - "[[04_Snippets/css-05-responsive-design]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://web.dev/learn/design"
---

# Responsive Design

> [!abstract] Introduction
> Le responsive design adapte une interface à toutes les tailles d'écran (mobile, tablette, desktop) avec des mises en page fluides, des media queries et des container queries.

> [!warning]- Prérequis
> [[CSS-03-Flexbox|Flexbox CSS]], [[CSS-04-Grid|Grid CSS]]

---

## Théorie

> [!question]- C'est quoi ?
> ```css
> .grille { display: grid; grid-template-columns: 1fr; }
> @media (min-width: 768px) { .grille { grid-template-columns: 1fr 1fr; } }
> @media (min-width: 1200px) { .grille { grid-template-columns: repeat(3, 1fr); } }
> ```

> [!example]- Analogie
> Un liquide prend la forme du récipient ; une interface responsive prend la forme de l'écran.

> [!question]- Pourquoi l'utiliser ?
> Plus de la moitié du trafic web est mobile ; Google indexe en « mobile first ».

> [!question]- Comment ça marche ?
> - **Mobile first** : styles de base pour mobile, puis `min-width` pour agrandir
> - Tailles fluides : `%`, `fr`, `clamp(1rem, 2.5vw, 2rem)`
> - Images : `max-width: 100%`, `srcset`/`sizes`, `<picture>`
> - **Container queries** : un composant s'adapte à la taille de SON conteneur, pas de l'écran → idéal pour des composants réutilisables Angular/Vue
> - `prefers-color-scheme`, `prefers-reduced-motion`

> [!question]- Quand l'utiliser ?
> Toujours. Définir 2-3 points de rupture selon le contenu, pas selon des appareils précis.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Les media queries répondent à la taille de l'écran, pas à l'espace réel d'un composant (→ container queries).

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Breakpoint | Largeur où la mise en page change |
| Mobile first | Styles de base pour petits écrans |
| Container query | Règle basée sur la taille du conteneur |
| Viewport | Zone visible de la page |

---

## Points clés

- `<meta name="viewport">` indispensable
- Mobile first + `min-width`
- Container queries pour les composants
- Tester dans le mode appareil des DevTools ET sur un vrai téléphone

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Largeurs fixes en px qui débordent sur mobile
> - Zones cliquables trop petites (< 44px)
> - Oublier le mode paysage

---

## Exemple minimal

```css
.carte-wrapper { container-type: inline-size; }
.film-card { display: grid; gap: .5rem; }
@container (min-width: 400px) {
  .film-card { grid-template-columns: 120px 1fr; }
}
```

> [!note] Ce que j'en retiens
> La carte passe en horizontal dès que SON conteneur fait 400px, qu'elle soit dans une sidebar ou en plein écran.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Images responsives optimisées (AVIF/WebP, `NgOptimizedImage`)
> - Typographie fluide avec `clamp()`

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[HTML-CSS]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/css-05-responsive-design]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Quelle différence entre media query et container query ?

---

## Tâches

- [ ] #task Rendre le portfolio parfaitement utilisable de 320px à 1920px
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
