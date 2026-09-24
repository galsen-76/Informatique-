---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M03
tags:
  - frontend/html/accessibilite
aliases:
  - "Accessibilité Web"
parent: "[[HTML-CSS]]"
children: []
related_theory:
  - "[[HTML-01-Structure-Semantique|Structure HTML et Sémantique]]"
  - "[[ANG-16-i18n-Accessibilite|Internationalisation & Accessibilité Angular]]"
related_snippets:
  - "[[04_Snippets/html-03-accessibilite-web]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://www.w3.org/WAI/standards-guidelines/wcag/fr"
---

# Accessibilité Web

> [!abstract] Introduction
> L'accessibilité (a11y) garantit qu'un site est utilisable par tous : lecteurs d'écran, navigation clavier, daltonisme, handicap moteur — c'est aussi une obligation légale (RGAA en France, European Accessibility Act depuis 2025).

> [!warning]- Prérequis
> [[HTML-01-Structure-Semantique|Structure HTML et Sémantique]]

---

## Théorie

> [!question]- C'est quoi ?
> Les règles WCAG reposent sur 4 principes (POUR) : **Perceptible**, **Utilisable** (Operable), **Compréhensible**, **Robuste**. Niveaux A, AA (visé), AAA.

> [!example]- Analogie
> Une rampe d'accès construite pour les fauteuils sert aussi aux poussettes, aux livreurs et aux valises : l'accessibilité profite à tout le monde.

> [!question]- Pourquoi l'utiliser ?
> ~20 % de la population a une forme de handicap ; en France le RGAA s'impose aux services publics et grandes entreprises, et l'EAA étend l'obligation à de nombreux services privés.

> [!question]- Comment ça marche ?
> Checklist de base :
> - Tout est utilisable au **clavier** (Tab, Entrée, Espace, Échap), focus **visible**
> - Contraste texte/fond ≥ 4.5:1
> - Images avec `alt`, champs avec `label`
> - Titres hiérarchisés, landmarks
> - ARIA seulement si aucune balise native ne convient (« pas d'ARIA vaut mieux que du mauvais ARIA »)
> - Annoncer les changements dynamiques (`aria-live`) pour les messages d'erreur/succès
> - Gérer le focus lors de l'ouverture d'une modale et au changement de route (SPA)

> [!question]- Quand l'utiliser ?
> Dès la conception de la maquette (contrastes, tailles de cible) puis à chaque composant.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Les outils automatiques (Lighthouse, axe) ne détectent qu'environ 30-40 % des problèmes : tester au clavier et avec un lecteur d'écran (NVDA, VoiceOver) reste indispensable.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| WCAG | Règles internationales d'accessibilité |
| RGAA | Référentiel français basé sur WCAG |
| ARIA | Attributs qui enrichissent la sémantique pour les technologies d'assistance |
| Focus trap | Maintien du focus clavier dans une modale |

---

## Points clés

- Le HTML sémantique fait 80 % du travail
- Clavier + focus visible + contraste = bases non négociables
- ARIA complète, ne remplace pas
- Tester manuellement, pas seulement avec des outils

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - `outline: none` sans alternative → focus invisible
> - Information transmise uniquement par la couleur (erreur en rouge sans texte)
> - Modale qui ne capture pas le focus

---

## Exemple minimal

```html
<div role="status" aria-live="polite" class="sr-only">{{ message }}</div>
<style>
.sr-only { position:absolute; width:1px; height:1px; overflow:hidden; clip:rect(0 0 0 0); white-space:nowrap; }
</style>
```

> [!note] Ce que j'en retiens
> Une zone `aria-live` invisible annonce « Film ajouté » aux utilisateurs de lecteur d'écran sans rien changer visuellement.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Utiliser Angular CDK a11y (`FocusTrap`, `LiveAnnouncer`) plutôt que du code maison
> - Intégrer axe-core dans les tests E2E (Playwright)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[HTML-CSS]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/html-03-accessibilite-web]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Citez les 4 principes WCAG.

> [!faq]- Questions d'entretien
> - Comment rendriez-vous une modale accessible ?

---

## Tâches

- [ ] #task Naviguer CinéTrack uniquement au clavier et corriger 3 problèmes
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
