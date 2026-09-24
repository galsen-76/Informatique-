---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M10
tags:
  - conception/maquettage
aliases:
  - "Wireframe Maquette et Prototype"
parent: "[[Conception]]"
children: []
related_theory:
  - "[[HTML-01-Structure-Semantique|Structure HTML et Sémantique]]"
  - "[[ANG-28-Architecture-Projet-Angular|Architecture d'un Projet Angular]]"
related_snippets:
  - "[[04_Snippets/conc-06-wireframe-maquette-prototype]]"
related_projects: []
source: "https://help.figma.com/"
---

# Wireframe Maquette et Prototype

> [!abstract] Introduction
> Trois niveaux de fidélité avant le code : le wireframe (squelette), la maquette (visuel final) et le prototype (interactif) ; savoir les lire permet de les découper en composants Angular/Vue.

---

## Théorie

> [!question]- C'est quoi ?
> | Niveau | Fidélité | Contenu | Outil |
> |---|---|---|---|
> | Wireframe | Basse | Blocs gris, structure, hiérarchie | papier, Excalidraw, Figma |
> | Maquette (mockup) | Haute | Couleurs, typo, images réelles | Figma |
> | Prototype | Interactif | Navigation cliquable, transitions | Figma, code |

> [!example]- Analogie
> Le croquis au crayon, la peinture finale, puis la maquette 3D qu'on peut visiter.

> [!question]- Pourquoi l'utiliser ?
> Valider l'ergonomie avant de coder (changer un wireframe coûte 1 minute, changer du code 1 journée) et parler le même langage que les designers UX/UI.

> [!question]- Comment ça marche ?
> Du design au code :
> 1. Repérer les **composants** répétés (carte de film, bouton, champ) → design system
> 2. Repérer les **états** (vide, chargement, erreur, succès, désactivé, survol, focus)
> 3. Relever les **tokens** (couleurs, espacements, typo) dans Figma (Dev Mode) → variables CSS
> 4. Découper la page en composants conteneurs / présentation

> [!question]- Quand l'utiliser ?
> Avant toute nouvelle interface ; demander la maquette ou en faire un wireframe rapide soi-même.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Une maquette oublie souvent les états d'erreur, le vide et le responsive : le développeur doit poser la question.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Wireframe | Schéma de structure basse fidélité |
| Mockup | Maquette visuelle haute fidélité |
| Prototype | Maquette interactive |
| Design system | Bibliothèque de composants et règles visuelles |
| UX / UI | Expérience utilisateur / interface utilisateur |

---

## Points clés

- Valider tôt coûte moins cher
- Identifier composants et états avant de coder
- Tokens design → variables CSS

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Oublier les états vide/chargement/erreur
> - Recopier une maquette au pixel sans penser responsive et accessibilité

---

## Exemple minimal

```text
Découpage de la page « Liste des films » :
PageListeFilms (conteneur)
├── BarreRecherche (présentation, output: recherche)
├── FiltresGenres (présentation, model: genres)
├── GrilleFilms
│   └── FilmCard ×N (input: film, output: favori)
└── Pagination (input: page, total ; output: changer)
États : chargement (squelettes), vide (« Aucun film »), erreur (message + réessayer)
```

> [!note] Ce que j'en retiens
> Un découpage écrit avant de coder = composants réutilisables dès le départ.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Travailler avec les designers sur un design system partagé (Figma ↔ Storybook)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Conception]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/conc-06-wireframe-maquette-prototype]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Quels états une maquette oublie-t-elle souvent ?

---

## Tâches

- [ ] #task Faire le wireframe des 4 écrans de CinéTrack sur Excalidraw ou Figma
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
