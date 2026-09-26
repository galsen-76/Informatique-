---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - frontend/html/balises
aliases:
  - "Aide-mémoire des Balises HTML"
parent: "[[HTML-CSS]]"
children: []
related_theory:
  - "[[HTML-01-Structure-Semantique|Structure HTML et Sémantique]]"
  - "[[HTML-05-Attributs-Globaux-Data|Attributs HTML et data]]"
related_snippets:
  - "[[04_Snippets/html-04-aide-memoire-balises]]"
related_projects: []
source: "https://developer.mozilla.org/fr/docs/Web/HTML/Element"
---

# Aide-mémoire des Balises HTML

> [!abstract] Introduction
> Les balises HTML qu'on utilise vraiment au quotidien, classées par usage, avec la bonne balise pour chaque besoin — pour lire, corriger et demander à l'IA le bon HTML.

---

## Théorie

> [!question]- C'est quoi ?
> | Besoin | Balise(s) | À retenir |
> |---|---|---|
> | Structure de page | `header`, `nav`, `main`, `section`, `article`, `aside`, `footer` | Un seul `main` |
> | Titres | `h1` … `h6` | Un `h1`, pas de saut de niveau |
> | Texte | `p`, `span`, `strong`, `em`, `small`, `br`, `hr` | `strong` = importance, `b` = juste gras |
> | Listes | `ul`/`ol` + `li`, `dl`/`dt`/`dd` | Menus = `ul` dans `nav` |
> | Liens | `a href` | `target="_blank"` + `rel="noopener"` |
> | Actions | `button type="button"` | Jamais de `div` cliquable |
> | Images | `img src alt`, `figure` + `figcaption`, `picture` | `alt` toujours |
> | Médias | `video`, `audio`, `iframe`, `svg` | `controls`, `loading="lazy"` |
> | Formulaires | `form`, `label`, `input`, `select`, `option`, `textarea`, `fieldset`, `legend` | Chaque champ a un `label` |
> | Tableaux | `table`, `thead`, `tbody`, `tr`, `th`, `td`, `caption` | Données tabulaires uniquement |
> | Interactifs natifs | `details`/`summary`, `dialog`, attribut `popover` | Accessibles sans JS maison |
> | Génériques | `div` (bloc), `span` (en ligne) | Quand aucune balise n'a de sens |
> | Données | `time datetime`, `data value`, `meter`, `progress`, `output` | Lisibles par les machines |
> | Modèles | `template`, `slot` | Base des Web Components |

> [!example]- Analogie
> Les balises sont les pièces d'une boîte à outils : on peut tout visser avec un couteau (`div`), mais le tournevis adapté (`button`, `nav`, `label`) fait le travail mieux et plus vite.

> [!question]- Pourquoi l'utiliser ?
> Même si l'IA génère le HTML, c'est toi qui dois repérer une mauvaise balise (un `div` cliquable, un `input` sans `label`, un tableau utilisé pour la mise en page) et le corriger. Et tes templates Angular/Vue SONT du HTML.

> [!question]- Comment ça marche ?
> Réflexe de choix :
> 1. Est-ce une zone de la page ? → balise de structure
> 2. Est-ce une action ? → `button` ; une navigation ? → `a`
> 3. Est-ce une saisie ? → élément de formulaire + `label`
> 4. Est-ce une liste/un tableau de données ? → `ul`/`table`
> 5. Sinon → `div`/`span` + classes

> [!question]- Quand l'utiliser ?
> À chaque template, et à chaque relecture de code généré.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Retenir le « bon réflexe », pas les 110 balises existantes : MDN reste la référence pour le reste.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Élément bloc | Prend toute la largeur, commence à la ligne (`div`, `p`) |
| Élément en ligne | S'insère dans le texte (`span`, `a`, `strong`) |
| Élément vide | Sans contenu ni balise fermante (`img`, `input`, `br`) |

---

## Points clés

- `button` pour agir, `a` pour naviguer
- `label` pour chaque champ
- `alt` pour chaque image
- `div`/`span` en dernier recours

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - `<a href="#" (click)="...">` au lieu d'un `button`
> - `<br><br>` pour espacer (c'est le rôle du CSS)
> - `<img>` sans dimensions → la page « saute » au chargement (CLS)

---

## Exemple minimal

```html
<nav aria-label="Principale">
  <ul>
    <li><a href="/films" aria-current="page">Films</a></li>
    <li><a href="/favoris">Favoris</a></li>
  </ul>
</nav>
<details>
  <summary>Voir le synopsis</summary>
  <p>Un voleur s'infiltre dans les rêves…</p>
</details>
```

> [!note] Ce que j'en retiens
> Un menu accessible et un bloc dépliable sans une ligne de JavaScript.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Repérer en revue de code les erreurs de sémantique générées par l'IA
> - Utiliser `dialog` et `popover` natifs avant d'installer une librairie

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[HTML-CSS]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/html-04-aide-memoire-balises]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Quelle balise pour un bouton « Supprimer » ? pour un lien « Voir la fiche » ?

---

## Tâches

- [ ] #task Relire un template Angular du travail et lister 3 balises qui pourraient être plus sémantiques
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
