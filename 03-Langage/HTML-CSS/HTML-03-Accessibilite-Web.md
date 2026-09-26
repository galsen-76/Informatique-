---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M03
tags:
  - frontend/html/accessibilite
aliases:
  - "Accessibilité Web"
parent: "[[HTML-CSS]]"
related_theory:
  - "[[HTML-01-Structure-Semantique|Structure HTML et Sémantique]]"
  - "[[ANG-16-i18n-Accessibilite|Internationalisation & Accessibilité Angular]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://www.w3.org/WAI/standards-guidelines/wcag/fr"
---

# Accessibilité Web

> [!abstract] En bref
> L'accessibilité (abrégée **a11y**) veut dire : ton site est utilisable par **tout le monde**, y compris au clavier seul, avec un lecteur d'écran, avec une mauvaise vue ou en plein soleil. C'est aussi une **obligation légale** en Europe pour beaucoup de sites depuis 2025. Bonne nouvelle : 80 % du travail, c'est du HTML correct.

## Qui est concerné

- Personnes aveugles ou malvoyantes (lecteur d'écran, zoom).
- Personnes qui ne peuvent pas utiliser une souris (clavier seul).
- Daltoniens (environ 1 homme sur 12).
- Tout le monde, un jour : bras cassé, écran au soleil, connexion lente.

## Les 8 réflexes

| Réflexe | Comment |
|---|---|
| **Bonnes balises** | `<button>` pour une action, `<a>` pour un lien, `<nav>`, `<main>`… (voir [[HTML-01-Structure-Semantique|sémantique]]) |
| **Texte alternatif** | `alt="Affiche du film Dune"` sur les images utiles, `alt=""` sur les images décoratives |
| **Labels** | chaque champ de formulaire a un `<label>` |
| **Clavier** | tout se fait avec Tab, Entrée, Espace, Échap |
| **Focus visible** | on voit toujours quel élément est sélectionné au clavier (ne supprime jamais l'`outline` sans le remplacer) |
| **Contraste** | texte lisible sur son fond : ratio **4,5 minimum** |
| **Pas que la couleur** | une erreur = texte rouge **et** un message ou une icône |
| **Langue** | `<html lang="fr">` |

## Tester en 5 minutes

1. **Débranche ta souris** et parcours la page avec Tab. Tu vois où tu es ? Tu peux tout faire ?
2. **Lighthouse** (F12 → Lighthouse → Accessibilité) : vise **95+**.
3. **Zoom à 200 %** : rien ne doit se chevaucher ou disparaître.
4. **Contraste** : les DevTools l'affichent quand tu inspectes un texte.

Dans le Portfolio, c'est ce qui nous a fait passer le texte des boutons verts du blanc au noir (contraste 2,5 → 7,9).

## Et ARIA ?

Les attributs `aria-*` ajoutent des informations pour les lecteurs d'écran :

```html
<button aria-label="Fermer">✕</button>                  <!-- bouton avec seulement une icône -->
<button aria-expanded="false" aria-controls="menu">☰</button>
<div role="status" aria-live="polite">Message envoyé</div>   <!-- annonce un changement -->
```

**Première règle d'ARIA : ne pas utiliser ARIA** si une balise HTML fait déjà le travail. Un `<button>` vaut mieux qu'un `<div role="button">`.

## Pièges

- **`outline: none`** sur les boutons sans le remplacer : les utilisateurs du clavier sont perdus.
- **Un `<div>` cliquable** : ni focus, ni Entrée, ni annonce au lecteur d'écran.
- **Du texte dans une image** : illisible par le lecteur d'écran et par Google.
- **Une fenêtre modale** qui ne garde pas le focus à l'intérieur : utilise les composants de PrimeVue / Angular CDK, qui le gèrent.
