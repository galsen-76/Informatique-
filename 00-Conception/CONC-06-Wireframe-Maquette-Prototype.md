---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M10
tags:
  - conception/maquettage
aliases:
  - "Wireframe Maquette et Prototype"
parent: "[[Conception]]"
related_theory:
  - "[[HTML-01-Structure-Semantique|Structure HTML et Sémantique]]"
  - "[[ANG-28-Architecture-Projet-Angular|Architecture d'un Projet Angular]]"
related_projects: []
source: "https://help.figma.com/"
---

# Wireframe Maquette et Prototype

> [!abstract] En bref
> Avant de coder une interface, on la dessine, en trois niveaux de détail : le **wireframe** (le squelette en blocs gris), la **maquette** (le rendu final avec couleurs et images) et le **prototype** (une maquette cliquable). Changer un dessin prend une minute, changer du code une journée. Ton rôle de développeur : **découper la maquette en composants** et repérer tous les **états** oubliés.

## Les 3 niveaux

| Niveau | À quoi ça ressemble | Sert à | Outil |
|---|---|---|---|
| **Wireframe** | blocs gris, pas de couleur | valider la structure de la page | papier, Excalidraw, Figma |
| **Maquette** | le rendu final | valider le visuel | Figma |
| **Prototype** | maquette cliquable | tester le parcours | Figma |

Exemple : ta [[Portfolio-Maquette|maquette du portfolio]].

## De la maquette au code, en 4 étapes

1. **Repère les composants qui se répètent** : carte de film, bouton, champ de recherche.
2. **Liste les états** de chaque élément : chargement, vide, erreur, succès, désactivé, survol, focus.
3. **Relève les valeurs du design** (couleurs, espacements, polices) → [[CSS-07-Variables-Themes|variables CSS]].
4. **Découpe la page** en composants (voir [[ARCH-15-Structure-de-Projet|Structure de projet]]).

## Exemple de découpage

```text
MoviesPage (page : charge les données)
├── SearchBar          (émet : search)
├── GenreFilters       (valeur : genres sélectionnés)
├── MovieGrid
│   └── MovieCard ×N   (reçoit : movie, émet : toggleFavorite)
└── Pagination         (reçoit : page, total ; émet : pageChange)

États de la page :
- chargement → cartes « squelettes » grises
- vide       → « Aucun film ne correspond à ta recherche »
- erreur     → message + bouton « Réessayer »
```

Écrire ce découpage **avant** de coder te donne directement la liste des composants à créer.

## Ce que les maquettes oublient souvent

- l'état **vide** et l'état **erreur** ;
- le **chargement** ;
- le **mobile** (souvent seule la version bureau est dessinée) ;
- les **textes longs** (un titre de film sur 3 lignes) ;
- le **focus clavier** et les contrastes.

Pose la question au designer, ou décide toi-même sur tes projets perso.

## Pièges

- **Coder sans découper** : tu te retrouves avec une page de 600 lignes.
- **Recopier au pixel près** sans penser responsive ni accessibilité.
- **Ne coder que le cas où tout va bien.**
