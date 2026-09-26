---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - frontend/html/medias
aliases:
  - "Images et Médias HTML"
parent: "[[HTML-CSS]]"
related_theory:
  - "[[HTML-04-Aide-Memoire-Balises|Aide-mémoire des Balises HTML]]"
  - "[[CSS-05-Responsive-Design|Responsive Design]]"
related_projects: []
source: "https://web.dev/learn/images"
---

# Images et Médias HTML

> [!abstract] En bref
> Les images sont souvent ce qui **pèse le plus** dans une page. Bien les intégrer, c'est : un texte alternatif, des dimensions, le bon format et un chargement différé. Pour CinéTrack (des dizaines d'affiches), ça fait toute la différence.

## Une image bien intégrée

```html
<img
  src="/affiches/dune.webp"
  alt="Affiche du film Dune"
  width="300" height="450"
  loading="lazy"
>
```

| Attribut | Pourquoi |
|---|---|
| `alt` | lu par les lecteurs d'écran, affiché si l'image ne charge pas. `alt=""` si l'image est purement décorative |
| `width` / `height` | le navigateur réserve la place : **la page ne « saute » pas** pendant le chargement |
| `loading="lazy"` | l'image se charge seulement quand on s'en approche en faisant défiler |

**Exception :** l'image principale en haut de page (ta photo dans le hero) ne doit **pas** être en `lazy`, pour s'afficher le plus vite possible.

## Écrire un bon `alt`

- Décris **ce que l'image apporte**, pas « image de… ».
- Affiche de film : `alt="Affiche du film Dune"`.
- Ta photo : `alt="Portrait de Ton Nom"`.
- Icône décorative à côté d'un texte : `alt=""`.
- Bouton avec seulement une icône : pas d'`alt` sur l'icône, mais `aria-label` sur le bouton.

## Les formats

| Format | Pour |
|---|---|
| **WebP** / AVIF | photos et captures (beaucoup plus léger que JPG / PNG) |
| **SVG** | logos et icônes (net à toutes les tailles, très léger) |
| PNG | image avec transparence, si WebP impossible |
| JPG | photos, si WebP impossible |

## Une image adaptée à l'écran

```html
<img
  src="capture-800.webp"
  srcset="capture-400.webp 400w, capture-800.webp 800w, capture-1600.webp 1600w"
  sizes="(max-width: 900px) 100vw, 33vw"
  alt="Page d'accueil de CinéTrack"
  width="800" height="500"
>
```

Le navigateur choisit la plus petite image suffisante : un mobile ne télécharge pas la version 1600 px.

## Vidéo et contenu intégré

```html
<video src="demo.mp4" controls muted playsinline poster="demo.webp"></video>

<iframe src="https://www.youtube.com/embed/…" title="Démo de CinéTrack" loading="lazy"></iframe>
```

## Icônes

Dans tes projets, utilise une librairie d'icônes (Lucide, PrimeIcons) plutôt que des images : voir [[UI-Librairies-Interfaces-Rapides|Librairies UI]].

## Pièges

- **Images sans dimensions** : le contenu saute pendant le chargement (mauvais score Lighthouse « CLS »).
- **Une photo de 4 Mo** : compresse et convertis en WebP (squoosh.app).
- **Du texte dans une image** : illisible pour Google et les lecteurs d'écran.
