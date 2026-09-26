---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - frontend/html/balises
aliases:
  - "Aide-mémoire des Balises HTML"
parent: "[[HTML-CSS]]"
related_theory:
  - "[[HTML-01-Structure-Semantique|Structure HTML et Sémantique]]"
  - "[[HTML-05-Attributs-Globaux-Data|Attributs HTML et data]]"
related_projects: []
source: "https://developer.mozilla.org/fr/docs/Web/HTML/Element"
---

# Aide-mémoire des Balises HTML

> [!abstract] En bref
> Les balises vraiment utilisées au quotidien, classées par besoin. Sers-t'en pour **relire le HTML généré par l'IA** : c'est toi qui repères le `<div>` cliquable ou le champ sans étiquette.

## Choisir la bonne balise en 5 questions

1. C'est une **zone** de la page ? → `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`
2. C'est une **action** ? → `button`. Une **navigation** vers une autre page ? → `a`
3. C'est une **saisie** ? → `input` / `select` / `textarea` + `label`
4. C'est une **liste** ou un **tableau de données** ? → `ul` / `ol` / `table`
5. Rien de tout ça ? → `div` (bloc) ou `span` (dans une ligne)

## Les balises par usage

| Besoin | Balises | À retenir |
|---|---|---|
| Structure | `header` `nav` `main` `section` `article` `aside` `footer` | un seul `main` |
| Titres | `h1` … `h6` | un `h1`, pas de niveau sauté |
| Texte | `p` `strong` `em` `small` `br` | `strong` = important ; l'espacement, c'est le CSS |
| Listes | `ul` / `ol` + `li` | un menu = `ul` dans `nav` |
| Lien | `a href="…"` | vers un autre site : `target="_blank" rel="noopener"` |
| Action | `button type="button"` | jamais de `div` cliquable |
| Image | `img src alt`, `figure` + `figcaption` | `alt` toujours (voir [[HTML-07-Images-Medias\|Images]]) |
| Médias | `video` `audio` `iframe` `svg` | |
| Formulaire | `form` `label` `input` `select` `option` `textarea` `fieldset` `legend` | voir [[HTML-02-Formulaires\|Formulaires]] |
| Tableau | `table` `thead` `tbody` `tr` `th` `td` `caption` | pour des données, pas la mise en page (voir [[HTML-08-Tableaux-HTML\|Tableaux]]) |
| Dépliable | `details` + `summary` | accordéon sans JavaScript |
| Fenêtre | `dialog` | modale native, gère le focus |
| Date, progression | `time datetime="2026-09-26"`, `progress`, `meter` | |
| Générique | `div`, `span` | en dernier recours |

## Deux exemples utiles

```html
<!-- Un menu accessible -->
<nav aria-label="Navigation principale">
  <ul>
    <li><a href="/" aria-current="page">Accueil</a></li>
    <li><a href="/projets">Projets</a></li>
  </ul>
</nav>

<!-- Un bloc dépliable, sans JavaScript -->
<details>
  <summary>Voir le synopsis</summary>
  <p>Un voleur s'infiltre dans les rêves…</p>
</details>
```

## Ce qu'on corrige le plus souvent dans du HTML généré

| ❌ | ✅ |
|---|---|
| `<div class="btn" onclick="…">` | `<button type="button">` |
| `<a href="#" (click)="…">` | `<button type="button" (click)="…">` |
| `<input placeholder="Email">` seul | `<label for="email">E-mail</label><input id="email">` |
| `<br><br>` pour espacer | une marge en CSS |
| `<img src="…">` | `<img src="…" alt="…" width="…" height="…">` |
| `<b>` pour un texte important | `<strong>` |

La référence complète : [MDN – Éléments HTML](https://developer.mozilla.org/fr/docs/Web/HTML/Element).
