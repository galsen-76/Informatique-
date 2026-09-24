---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M07
tags:
  - backend/bdd/modelisation
aliases:
  - "Modélisation Relationnelle et Normalisation"
parent: "[[Bases de Données]]"
children: []
related_theory:
  - "[[CONC-07-Modelisation-Donnees-MCD-MLD|Modélisation des Données MCD MLD]]"
  - "[[SQL-07-DDL-Contraintes-Types|DDL Contraintes et Types SQL]]"
related_snippets:
  - "[[04_Snippets/bdd-02-modelisation-normalisation]]"
related_projects:
  - "[[02_Projects/CinéTrack-API]]"
source: "https://fr.wikipedia.org/wiki/Forme_normale_(bases_de_donn%C3%A9es_relationnelles)"
---

# Modélisation Relationnelle et Normalisation

> [!abstract] Introduction
> Modéliser, c'est traduire le métier en tables et relations (1-1, 1-N, N-N) ; normaliser, c'est éliminer la redondance pour éviter les incohérences.

> [!warning]- Prérequis
> [[BDD-01-Fondamentaux-SGBD|Fondamentaux des Bases de Données]]

---

## Théorie

> [!question]- C'est quoi ?
> Relations :
> - **1-N** : un utilisateur a plusieurs critiques → FK `user_id` dans `critiques`
> - **N-N** : utilisateurs ↔ films favoris → table d'association `favoris(user_id, film_id)`
> - **1-1** : utilisateur ↔ profil → FK unique
> Formes normales (les 3 premières suffisent en pratique) :
> - **1FN** : valeurs atomiques (pas de liste « SF,Thriller » dans une colonne)
> - **2FN** : tout attribut dépend de TOUTE la clé
> - **3FN** : pas de dépendance entre attributs non-clés (le nom du réalisateur dans `realisateurs`, pas dans `films`)

> [!example]- Analogie
> Normaliser, c'est ne noter l'adresse d'un client qu'à UN endroit (sa fiche) plutôt que sur chaque facture : s'il déménage, une seule correction.

> [!question]- Pourquoi l'utiliser ?
> Éviter les anomalies de mise à jour (même info modifiée à un endroit et pas à l'autre), économiser l'espace, garantir la cohérence.

> [!question]- Comment ça marche ?
> ```mermaid
> erDiagram
>   USERS ||--o{ CRITIQUES : ecrit
>   FILMS ||--o{ CRITIQUES : recoit
>   USERS }o--o{ FILMS : "favoris (table d'association)"
>   REALISATEURS ||--o{ FILMS : realise
>   FILMS }o--o{ GENRES : "films_genres"
> ```

> [!question]- Quand l'utiliser ?
> À la conception (depuis le MCD, voir [[CONC-07-Modelisation-Donnees-MCD-MLD|Modélisation des Données MCD MLD]]). Dénormaliser ensuite volontairement pour la performance, en le documentant.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Sur-normaliser multiplie les jointures ; une dénormalisation maîtrisée (compteur `nb_favoris`) est parfois préférable.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Cardinalité | Nombre d'occurrences liées (1, N) |
| Table d'association | Table qui matérialise un lien N-N |
| Redondance | Même information stockée plusieurs fois |
| Dénormalisation | Redondance volontaire pour la performance |

---

## Points clés

- N-N = table d'association
- Viser la 3FN, dénormaliser consciemment
- Une information = un seul endroit

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Colonnes `genre1`, `genre2`, `genre3`
> - Stocker des listes séparées par des virgules

---

## Exemple minimal

```sql
CREATE TABLE genres (id SERIAL PRIMARY KEY, nom TEXT UNIQUE NOT NULL);
CREATE TABLE films_genres (
  film_id INT REFERENCES films(id) ON DELETE CASCADE,
  genre_id INT REFERENCES genres(id),
  PRIMARY KEY (film_id, genre_id)
);
```

> [!note] Ce que j'en retiens
> Un film peut avoir autant de genres que nécessaire, sans colonne vide.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Savoir quand utiliser JSONB (données semi-structurées) plutôt que des tables

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Bases de Données]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/bdd-02-modelisation-normalisation]]
- Projet → [[02_Projects/CinéTrack-API]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Comment modéliser « un film a plusieurs genres, un genre a plusieurs films » ?

> [!faq]- Questions d'entretien
> - Qu'est-ce que la normalisation et pourquoi dénormaliser parfois ?

---

## Tâches

- [ ] #task Dessiner le schéma entité-relation complet de CinéTrack (Mermaid erDiagram)
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
