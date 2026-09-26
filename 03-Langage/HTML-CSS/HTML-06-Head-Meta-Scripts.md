---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - frontend/html/head
aliases:
  - "Head Meta et Chargement des Scripts"
parent: "[[HTML-CSS]]"
children: []
related_theory:
  - "[[HTML-04-Aide-Memoire-Balises|Aide-mémoire des Balises HTML]]"
  - "[[TG-01-Comment-fonctionne-un-programme|Comment fonctionne un programme]]"
related_snippets:
  - "[[04_Snippets/html-06-head-meta-scripts]]"
related_projects: []
source: "https://developer.mozilla.org/fr/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML"
---

# Head Meta et Chargement des Scripts

> [!abstract] Introduction
> Le `<head>` contient les informations invisibles mais essentielles de la page (encodage, responsive, titre, SEO, aperçus de partage, icônes) et le chargement des scripts (`defer`, `async`, `type="module"`).

---

## Théorie

> [!question]- C'est quoi ?
> ```html
> <head>
>   <meta charset="utf-8">
>   <meta name="viewport" content="width=device-width, initial-scale=1">
>   <title>CinéTrack — suivez vos films</title>
>   <meta name="description" content="Recherchez, notez et suivez vos films.">
>   <meta property="og:title" content="CinéTrack">
>   <meta property="og:image" content="https://cinetrack.fr/og.png">
>   <link rel="icon" href="/favicon.svg" type="image/svg+xml">
>   <link rel="stylesheet" href="/styles.css">
>   <base href="/">
>   <script type="module" src="/main.js"></script>
> </head>
> ```

> [!example]- Analogie
> Le `<head>` est l'étiquette et la notice d'un colis : invisible une fois le colis ouvert, mais indispensable pour qu'il soit bien acheminé et reconnu.

> [!question]- Pourquoi l'utiliser ?
> Encodage des accents, affichage mobile, référencement, aperçu des liens partagés, et surtout : l'ordre de chargement des scripts influence la vitesse d'affichage.

> [!question]- Comment ça marche ?
> | Chargement | Téléchargement | Exécution | Usage |
> |---|---|---|---|
> | `<script>` | Bloque l'analyse du HTML | Immédiate | À éviter dans le head |
> | `defer` | En parallèle | Après l'analyse, dans l'ordre | Scripts de l'application |
> | `async` | En parallèle | Dès qu'il arrive, ordre non garanti | Analytics, scripts indépendants |
> | `type="module"` | En parallèle | Comme `defer` par défaut | ESM moderne (Vite) |
> Angular et Vite génèrent ce `<head>` : dans `index.html` (Angular : `src/index.html`, `base href` ; Vue/Vite : `index.html` à la racine) et on le modifie à l'exécution avec le service `Title`/`Meta` d'Angular ou `useHead`/`useSeoMeta` (Nuxt/unhead).

> [!question]- Quand l'utiliser ?
> Au démarrage du projet, puis pour chaque page publique (titre et description propres).

> [!danger]- Quand NE PAS l'utiliser / Limites
> Dans une SPA sans SSR, les robots et aperçus de partage peuvent ne voir que le `<head>` initial.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Meta | Métadonnée de la page |
| Open Graph | Balises d'aperçu pour les réseaux sociaux |
| `defer` | Exécution après l'analyse du HTML |
| `base href` | URL de base des liens relatifs (routing Angular) |

---

## Points clés

- `charset` + `viewport` toujours
- Un `title` unique par page
- `defer`/`module` pour les scripts
- `base href` correct si l'app est dans un sous-dossier

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Oublier `viewport` → site minuscule sur mobile
> - Mauvais `base href` → fichiers JS en 404 une fois déployé

---

## Exemple minimal

```typescript
// Angular : titre et description par page
export class FilmDetailPage {
  constructor() {
    inject(Title).setTitle('Dune — CinéTrack');
    inject(Meta).updateTag({ name: 'description', content: 'Fiche du film Dune' });
  }
}
```

> [!note] Ce que j'en retiens
> Chaque page de la SPA peut avoir son propre titre (utile pour l'historique et l'accessibilité).

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Titre de route Angular (`title` dans les routes) et stratégie de titre personnalisée

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[HTML-CSS]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/html-06-head-meta-scripts]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Différence entre `defer` et `async` ?

---

## Tâches

- [ ] #task Lire le `index.html` d'un projet Angular et d'un projet Vue du travail
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
