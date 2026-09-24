---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M10
tags:
  - conception/uml/classes
aliases:
  - "UML Diagramme de Classes"
parent: "[[Conception]]"
children: []
related_theory:
  - "[[TG-05-Paradigmes-POO|Programmation Orientée Objet]]"
  - "[[CONC-07-Modelisation-Donnees-MCD-MLD|Modélisation des Données MCD MLD]]"
related_snippets:
  - "[[04_Snippets/conc-04-uml-diagramme-de-classes]]"
related_projects: []
source: "https://mermaid.js.org/syntax/classDiagram.html"
---

# UML Diagramme de Classes

> [!abstract] Introduction
> Le diagramme de classes représente la structure statique du code : classes, attributs, méthodes et relations (association, héritage, composition, dépendance).

> [!warning]- Prérequis
> [[TG-05-Paradigmes-POO|Programmation Orientée Objet]]

---

## Théorie

> [!question]- C'est quoi ?
> ```mermaid
> classDiagram
>   class Utilisateur {
>     +id: number
>     +email: string
>     -hashMotDePasse: string
>     +ajouterFavori(film: Film) void
>   }
>   class Film {
>     +id: number
>     +titre: string
>     +annee: number
>     +noteMoyenne() number
>   }
>   class Critique {
>     +note: number
>     +texte: string
>   }
>   Utilisateur "1" --> "0..*" Critique : écrit
>   Film "1" *-- "0..*" Critique : contient
>   Utilisateur "0..*" -- "0..*" Film : favoris
>   class Notifieur { <<interface>> +envoyer(msg: string) }
>   EmailNotifieur ..|> Notifieur
> ```

> [!example]- Analogie
> Le plan d'architecte d'un immeuble : il montre les pièces et comment elles communiquent, pas la vie des habitants.

> [!question]- Pourquoi l'utiliser ?
> Réfléchir au modèle métier avant de coder, communiquer une conception, documenter une partie complexe.

> [!question]- Comment ça marche ?
> Visibilité : `+` public, `-` privé, `#` protégé. Relations :
> - Association `--` (lien), multiplicités `1`, `0..*`
> - Composition `*--` (la partie meurt avec le tout)
> - Agrégation `o--` (partie partageable)
> - Héritage `<|--`, réalisation d'interface `..|>`, dépendance `..>`

> [!question]- Quand l'utiliser ?
> Modélisation du domaine (entités, DTO), conception d'un module complexe.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Documenter tout le code en UML est inutile et vite obsolète : ne dessiner que ce qui aide à comprendre.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Multiplicité | Nombre d'instances liées |
| Composition | Relation « fait partie de », cycle de vie commun |
| Agrégation | Relation « a un », cycle de vie indépendant |
| Réalisation | Une classe implémente une interface |

---

## Points clés

- Mermaid classDiagram s'affiche dans Obsidian et GitLab
- Modéliser le domaine, pas chaque classe technique
- Multiplicités = futures relations en BDD

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Confondre composition et agrégation
> - Diagramme non maintenu qui contredit le code

---

## Exemple minimal

```text
Utilisateur 0..* — 0..* Film  →  table d'association « favoris » en BDD
```

> [!note] Ce que j'en retiens
> Le diagramme de classes du domaine se traduit presque directement en schéma Prisma.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Relier au Domain-Driven Design (agrégats, entités, objets valeur)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Conception]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/conc-04-uml-diagramme-de-classes]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Quelle différence entre composition et agrégation ?

---

## Tâches

- [ ] #task Faire le diagramme de classes du domaine CinéTrack en Mermaid
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
