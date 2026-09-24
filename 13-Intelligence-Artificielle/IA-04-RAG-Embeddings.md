---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Avancé
month: M12
tags:
  - ia/rag
aliases:
  - "RAG et Embeddings"
parent: "[[Intelligence Artificielle]]"
children: []
related_theory:
  - "[[IA-02-LLM-Fondamentaux|Fondamentaux des LLM]]"
  - "[[BDD-09-PostgreSQL-Pratique|PostgreSQL en Pratique]]"
related_snippets:
  - "[[04_Snippets/ia-04-rag-embeddings]]"
related_projects: []
source: "https://docs.anthropic.com/fr/docs/build-with-claude/embeddings"
---

# RAG et Embeddings

> [!abstract] Introduction
> Le RAG (Retrieval-Augmented Generation) consiste à rechercher les documents pertinents puis à les donner au LLM pour qu'il réponde à partir d'eux ; les embeddings (vecteurs de sens) permettent cette recherche sémantique.

> [!warning]- Prérequis
> [[IA-02-LLM-Fondamentaux|Fondamentaux des LLM]]

---

## Théorie

> [!question]- C'est quoi ?
> - **Embedding** : vecteur de nombres représentant le sens d'un texte ; deux textes proches ont des vecteurs proches
> - **Base vectorielle** : stocke et recherche par similarité (pgvector dans PostgreSQL, Qdrant, Pinecone…)
> - **RAG** : question → recherche des passages pertinents → prompt « réponds à partir de ces passages » → réponse sourcée

> [!example]- Analogie
> Un examen à livre ouvert : au lieu de répondre de mémoire (risque d'invention), l'étudiant cherche d'abord les bonnes pages puis rédige à partir d'elles.

> [!question]- Pourquoi l'utiliser ?
> Répondre sur TES données (documentation interne, catalogue, tickets) à jour, en limitant les hallucinations et en citant les sources.

> [!question]- Comment ça marche ?
> ```mermaid
> flowchart LR
>   subgraph Indexation
>     D[Documents] --> C[Découpage en passages] --> E[Embeddings] --> V[(Base vectorielle)]
>   end
>   subgraph Question
>     Q[Question] --> EQ[Embedding de la question] --> S[Recherche des k passages proches]
>     V --> S
>     S --> P["Prompt : question + passages"] --> L[LLM] --> R[Réponse + sources]
>   end
> ```
> ```sql
> CREATE EXTENSION vector;
> CREATE TABLE passages (id serial PRIMARY KEY, contenu text, embedding vector(1024));
> SELECT contenu FROM passages ORDER BY embedding <=> $1 LIMIT 5;   -- distance cosinus
> ```

> [!question]- Quand l'utiliser ?
> Chatbot sur documentation, recherche sémantique (« films sur la solitude dans l'espace »), support client.

> [!danger]- Quand NE PAS l'utiliser / Limites
> La qualité dépend du découpage et de la recherche ; les documents injectés peuvent contenir des injections de prompt ; contrôler les droits d'accès aux documents récupérés.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Embedding | Représentation vectorielle du sens |
| Similarité cosinus | Mesure de proximité entre vecteurs |
| Chunking | Découpage des documents en passages |
| Recherche hybride | Mots-clés + sémantique combinés |

---

## Points clés

- Récupérer puis générer
- Citer les sources
- Respecter les droits d'accès des documents
- Évaluer la qualité de la recherche séparément de la génération

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Passages trop longs ou trop courts
> - Indexer des documents confidentiels accessibles à tous via le chatbot

---

## Exemple minimal

```text
Question : « Quels films parlent de solitude dans l'espace ? »
Recherche sémantique → synopsis de Gravity, Moon, Seul sur Mars → le LLM répond en citant ces 3 fiches
```

> [!note] Ce que j'en retiens
> La recherche trouve par le sens, même sans le mot « solitude » dans le synopsis.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Recherche hybride, re-ranking, évaluation (précision de récupération, fidélité aux sources)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Intelligence Artificielle]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/ia-04-rag-embeddings]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi le RAG réduit-il les hallucinations sans les supprimer ?

---

## Tâches

- [ ] #task Ajouter pgvector à CinéTrack et une recherche sémantique sur les synopsis
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
