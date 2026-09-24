---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M07
tags:
  - conception/merise
aliases:
  - "Modélisation des Données MCD MLD"
parent: "[[Conception]]"
children: []
related_theory:
  - "[[BDD-02-Modelisation-Normalisation|Modélisation Relationnelle et Normalisation]]"
  - "[[CONC-04-UML-Diagramme-de-Classes|UML Diagramme de Classes]]"
related_snippets:
  - "[[04_Snippets/conc-07-modelisation-donnees-mcd-mld]]"
related_projects: []
source: "https://fr.wikipedia.org/wiki/Merise_(informatique)"
---

# Modélisation des Données MCD MLD

> [!abstract] Introduction
> Méthode Merise (très utilisée en France) : le MCD (Modèle Conceptuel de Données) décrit entités et associations métier, le MLD (Modèle Logique) le traduit en tables, clés primaires et étrangères.

---

## Théorie

> [!question]- C'est quoi ?
> MCD : entités (Utilisateur, Film), associations (FAVORISER), cardinalités (0,n / 1,1).
> MLD : `Utilisateur(id, email, hash)`, `Film(id, titre, annee)`, `Favori(#user_id, #film_id, date_ajout)`.

> [!example]- Analogie
> Le MCD est la description d'une famille (qui est lié à qui) ; le MLD est l'arbre généalogique rangé dans des fiches classées.

> [!question]- Pourquoi l'utiliser ?
> Identifier les entités et relations dès la conception évite des refontes de BDD coûteuses ; Merise est enseigné et demandé dans beaucoup d'entreprises françaises.

> [!question]- Comment ça marche ?
> Règles de passage MCD → MLD :
> - Entité → table, identifiant → clé primaire
> - Association **1-N** → clé étrangère côté N
> - Association **N-N** → table d'association (clés étrangères composées + attributs portés, ex. `date_ajout`)
> - Association **1-1** → clé étrangère unique
> ```mermaid
> erDiagram
>   UTILISATEUR ||--o{ FAVORI : ajoute
>   FILM ||--o{ FAVORI : "est ajouté"
>   FAVORI {
>     int user_id FK
>     int film_id FK
>     date date_ajout
>   }
> ```

> [!question]- Quand l'utiliser ?
> Conception de toute nouvelle base ou évolution importante.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Merise ne dit rien des index, performances ou NoSQL : compléter au niveau physique (MPD).

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| MCD | Modèle conceptuel (métier) |
| MLD | Modèle logique (tables, clés) |
| MPD | Modèle physique (types, index, SGBD) |
| Cardinalité | Min et max d'occurrences d'une association |
| Attribut porté | Donnée propre à une association |

---

## Points clés

- MCD = métier, MLD = relationnel
- N-N → table d'association
- Cardinalités (0,n) (1,1) à lire de chaque côté

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Lire les cardinalités Merise dans le mauvais sens (inverse de l'UML)

---

## Exemple minimal

```text
UTILISATEUR (0,n) —— NOTER (note, date) —— (0,n) FILM
→ MLD : Note(#user_id, #film_id, note, date)
```

> [!note] Ce que j'en retiens
> Les attributs portés par l'association deviennent des colonnes de la table d'association.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Passer fluidement du MCD au schéma Prisma et aux migrations

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Conception]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/conc-07-modelisation-donnees-mcd-mld]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Comment traduire une association N-N avec attribut en MLD ?

---

## Tâches

- [ ] #task Faire le MCD puis le MLD complets de CinéTrack
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
