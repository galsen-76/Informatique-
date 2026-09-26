---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - frontend/html/medias
aliases:
  - "Images et Médias HTML"
parent: "[[HTML-CSS]]"
children: []
related_theory:
  - "[[HTML-04-Aide-Memoire-Balises|Aide-mémoire des Balises HTML]]"
  - "[[CSS-05-Responsive-Design|Responsive Design]]"
related_snippets:
  - "[[04_Snippets/html-07-images-medias]]"
related_projects: []
source: "https://web.dev/learn/images"
---

# Images et Médias HTML

> [!abstract] Introduction
> Afficher images, icônes SVG, vidéos et contenus intégrés correctement : texte alternatif, tailles, chargement différé et formats modernes — c'est souvent ce qui pèse le plus dans une page.

---

## Théorie

> [!question]- C'est quoi ?
> ```html
> <img src="dune.webp" alt="Affiche de Dune" width="300" height="450" loading="lazy" decoding="async">
> <picture>
>   <source srcset="dune.avif" type="image/avif">
>   <img src="dune.jpg" alt="Affiche de Dune" width="300" height="450">
> </picture>
> <img src="petite.jpg" srcset="petite.jpg 400w, grande.jpg 1200w" sizes="(max-width: 600px) 100vw, 400px" alt="…">
> <video src="bande-annonce.mp4" controls preload="metadata" poster="poster.jpg"></video>
> <svg aria-hidden="true" width="24" height="24"><use href="/icons.svg#coeur"></use></svg>
> ```

> [!example]- Analogie
> Envoyer une affiche en taille réelle à un téléphone, c'est livrer un canapé pour quelqu'un qui voulait un tabouret : `srcset` choisit la bonne taille selon l'écran.

> [!question]- Pourquoi l'utiliser ?
> Les images sont souvent 50 % du poids d'une page ; sans `width`/`height` elles font « sauter » la mise en page ; sans `alt` elles sont invisibles pour les lecteurs d'écran.

> [!question]- Comment ça marche ?
> - `alt` descriptif pour une image informative, `alt=""` pour une image décorative
> - `width`/`height` pour réserver la place (évite le CLS)
> - `loading="lazy"` sous la ligne de flottaison, jamais sur l'image principale (LCP)
> - Formats : AVIF/WebP pour les photos, SVG pour les icônes et logos
> - Angular : `NgOptimizedImage` (`<img ngSrc="…" width height priority>`) applique ces bonnes pratiques automatiquement

> [!question]- Quand l'utiliser ?
> Toute image de contenu ; icônes : préférer une librairie d'icônes SVG (voir [[UI-Librairies-Interfaces-Rapides|Librairies UI pour Interfaces Rapides]]).

> [!danger]- Quand NE PAS l'utiliser / Limites
> Le HTML ne compresse pas les images : il faut les optimiser en amont (build, CDN d'images).

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| `srcset` | Liste d'images de tailles différentes |
| `sizes` | Largeur d'affichage prévue selon l'écran |
| Lazy loading | Chargement quand l'image approche de l'écran |
| LCP / CLS | Vitesse d'affichage / stabilité de la mise en page |

---

## Points clés

- `alt` toujours, vide si décoratif
- `width` + `height` toujours
- Lazy sauf l'image principale
- SVG pour les icônes

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - `loading="lazy"` sur l'image du haut de page → LCP dégradé
> - Icône seule dans un bouton sans `aria-label`

---

## Exemple minimal

```html
<button type="button" aria-label="Ajouter aux favoris">
  <svg aria-hidden="true" width="20" height="20"><use href="/icons.svg#coeur"></use></svg>
</button>
```

> [!note] Ce que j'en retiens
> L'icône est cachée aux lecteurs d'écran, le bouton est décrit par `aria-label`.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Mesurer le poids des images avec Lighthouse et mettre en place un CDN d'images

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[HTML-CSS]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/html-07-images-medias]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi préciser `width` et `height` sur une image ?

---

## Tâches

- [ ] #task Passer une page d'un projet dans Lighthouse et corriger les images signalées
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
