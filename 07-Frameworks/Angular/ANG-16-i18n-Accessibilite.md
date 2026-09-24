---
created: 2026-09-16
modified: 2026-09-16
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M05
aliases:
  - "Internationalisation & Accessibilité Angular"
tags:
  - frameworks/angular/i18n-a11y
parent: "[[Angular]]"
children: []
related_theory: []
related_snippets:
  - "[[04_Snippets/angular-i18n]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://angular.dev/guide/i18n"
---

# Internationalisation & Accessibilité Angular

> [!abstract] Introduction
> L'i18n adapte une application à plusieurs langues, l'a11y la rend utilisable par des personnes en situation de handicap.

> [!warning]- Prérequis
> [[ANG-03-Templates-Data-Binding|Templates et Data Binding Angular]].

---

## Théorie

> [!question]- C'est quoi ?
> ```html
> <h1 i18n="@@titrePage">Bienvenue</h1>
> <button aria-label="Ajouter aux favoris"><img alt=""></button>
> ```

> [!example]- Analogie
> `aria-label` est un panneau en braille collé sous une icône muette pour les visiteurs qui ne peuvent pas voir l'image elle-même.

> [!question]- Pourquoi l'utiliser ?
> i18n : disponibilité multi-langue sans dupliquer le code. a11y : obligation légale fréquente et surtout inclusion réelle des utilisateurs.

> [!question]- Comment ça marche ?
> `i18n="@@id"` marque un texte traduisible, générant un fichier par langue au build. `aria-label` décrit un élément pour les lecteurs d'écran.

> [!question]- Quand l'utiliser ?
> i18n dès qu'une app doit exister en plusieurs langues ; a11y dès la conception, pas en correction après coup.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Ajouter des attributs `aria-*` partout sans utiliser les bonnes balises sémantiques HTML (`<button>` plutôt qu'un `<div>` cliquable) est un pansement, pas une vraie solution d'accessibilité.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| i18n | Internationalisation, rendre une app traduisible |
| a11y | Accessibilité, utilisabilité pour tous |
| `aria-label` | Description invisible visuellement, lue par un lecteur d'écran |

---

## Points clés

- `i18n` génère une version compilée par langue
- `aria-*` enrichit le HTML pour les lecteurs d'écran
- Les bonnes balises sémantiques valent souvent mieux que des `aria-*` ajoutés partout
- L'accessibilité bénéficie à tous, pas seulement aux personnes en situation de handicap

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Utiliser un `<div>` cliquable au lieu d'un `<button>`, cassant la navigation au clavier
> - Oublier `alt=""` sur une image purement décorative
> - Traiter l'accessibilité comme une correction finale plutôt qu'un critère de conception

---

## Paramètres / Configuration

| Attribut | Description |
|-----------|-------------|
| `i18n="@@id"` | Marque un texte traduisible |
| `aria-label` | Décrit un élément pour lecteur d'écran |
| `alt` | Texte alternatif d'image |
| `tabindex` | Ordre de navigation au clavier |

---

## Exemple minimal

```html
<button aria-label="Ajouter ce film aux favoris" (click)="ajouterFavori()">
  <img src="coeur.svg" alt="">
</button>
```

> [!note] Ce que j'en retiens
> Le bouton reste compréhensible pour un lecteur d'écran même sans texte visible.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Alternatives à `@angular/localize` : Transloco ou ngx-translate (traduction à l'exécution, sans rebuild par langue)
> - Angular CDK a11y : `FocusTrap`, `LiveAnnouncer`, `FocusMonitor` ; audit RGAA

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Angular]]
- Sous-sujets → (aucun)
- À comparer avec → [[HTML-01-Structure-Semantique|HTML sémantique]]

**Pratique :**
- Extrait de code → [[04_Snippets/angular-i18n]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> Pourrais-je expliquer pourquoi `<button>` est préférable à `<div (click)>`, sans dire "accessibilité" ?

> [!faq]- Questions d'entretien
> - Comment rendez-vous une application Angular accessible ?

---

## Tâches

- [ ] #task Auditer l'accessibilité de CinéTrack avec Lighthouse
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Alternatives à `@angular/localize` pour gérer les traductions ?
