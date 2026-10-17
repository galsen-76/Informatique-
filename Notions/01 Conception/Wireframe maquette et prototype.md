---
type: notion
statut: a apprendre
resume: "Avant de coder une interface, on la dessine, en trois niveaux de détail : le wireframe (le squelette en blocs gris), la maquette (le rendu final avec couleurs et images) et le prototype (une maquette cliquable)."
revu:
sources:
  - "https://help.figma.com/"
---
# Wireframe maquette et prototype

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Avant de coder une interface, on la dessine, en trois niveaux de détail : le **wireframe** (le squelette en blocs gris), la **maquette** (le rendu final avec couleurs et images) et le **prototype** (une maquette cliquable).

## Le problème

**Pourquoi c'est utile ?**
Pour valider une interface en dessin avant de la coder, parce qu'un dessin se change en 5 minutes et du code en une journée.

**Qu'est-ce qui se passait sans ça ?**
On codait les écrans directement. Chaque retour (« le bouton ici plutôt ») coûtait des heures de développement.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Changer un dessin prend une minute, changer du code une journée. Ton rôle de développeur : **découper la maquette en composants** et repérer tous les **états** oubliés.

### Les 3 niveaux

| Niveau | À quoi ça ressemble | Sert à | Outil |
|---|---|---|---|
| **Wireframe** | blocs gris, pas de couleur | valider la structure de la page | papier, Excalidraw, Figma |
| **Maquette** | le rendu final | valider le visuel | Figma |
| **Prototype** | maquette cliquable | tester le parcours | Figma |

Exemple : ta maquette du portfolio.

### De la maquette au code, en 4 étapes

1. **Repère les composants qui se répètent** : carte de film, bouton, champ de recherche.
2. **Liste les états** de chaque élément : chargement, vide, erreur, succès, désactivé, survol, focus.
3. **Relève les valeurs du design** (couleurs, espacements, polices) → [[Variables CSS et thèmes|variables CSS]].
4. **Découpe la page** en composants (voir [[Structure de projet]]).

### Ce que les maquettes oublient souvent

- l'état **vide** et l'état **erreur** ;
- le **chargement** ;
- le **mobile** (souvent seule la version bureau est dessinée) ;
- les **textes longs** (un titre de film sur 3 lignes) ;
- le **focus clavier** et les contrastes.

Pose la question au designer, ou décide toi-même sur tes projets perso.

## 🧪 Exemple

### Exemple de découpage

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

## ⚠️ Limites et pièges

- **Coder sans découper** : tu te retrouves avec une page de 600 lignes.
- **Recopier au pixel près** sans penser responsive ni accessibilité.
- **Ne coder que le cas où tout va bien.**

## 🔗 Liens

- **Prérequis :** 
- **Voir aussi :** [[Structure HTML et sémantique]], [[Architecture d'un projet Angular]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://help.figma.com/
