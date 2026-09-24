---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M10
tags:
  - conception/uml/sequence
aliases:
  - "UML Séquence et Activité"
parent: "[[Conception]]"
children: []
related_theory:
  - "[[NET-05-HTTP-Approfondi|HTTP Approfondi]]"
  - "[[NEST-10-Authentification-JWT|Authentification JWT NestJS]]"
related_snippets:
  - "[[04_Snippets/conc-05-uml-sequence-activite]]"
related_projects: []
source: "https://mermaid.js.org/syntax/sequenceDiagram.html"
---

# UML Séquence et Activité

> [!abstract] Introduction
> Le diagramme de séquence montre les échanges entre acteurs/composants dans le temps (idéal pour un appel API ou un flux d'authentification) ; le diagramme d'activité montre un processus avec ses décisions.

---

## Théorie

> [!question]- C'est quoi ?
> ```mermaid
> sequenceDiagram
>   actor U as Utilisateur
>   participant F as Front (Angular)
>   participant A as API (NestJS)
>   participant DB as PostgreSQL
>   U->>F: clic « Ajouter aux favoris »
>   F->>A: POST /api/favoris {filmId}
>   A->>A: vérifier JWT
>   alt non authentifié
>     A-->>F: 401
>     F-->>U: redirection /login
>   else authentifié
>     A->>DB: INSERT favoris
>     DB-->>A: OK
>     A-->>F: 201
>     F-->>U: bouton « Retirer »
>   end
> ```
> ```mermaid
> flowchart TD
>   D([Début]) --> C{Connecté ?}
>   C -- Non --> L[Page de connexion] --> C
>   C -- Oui --> E{Déjà en favori ?}
>   E -- Oui --> R[Retirer] --> Fin([Fin])
>   E -- Non --> A[Ajouter] --> Fin
> ```

> [!example]- Analogie
> La séquence est le script d'une pièce de théâtre (qui parle à qui, dans quel ordre) ; l'activité est l'organigramme d'une procédure administrative.

> [!question]- Pourquoi l'utiliser ?
> Concevoir et expliquer un flux complexe (auth, paiement, synchronisation), repérer les cas d'erreur, documenter une API.

> [!question]- Comment ça marche ?
> Séquence : participants, messages synchrones `->>`, réponses `-->>`, blocs `alt/else`, `opt`, `loop`, `par`. Activité : début, actions, décisions, fin.

> [!question]- Quand l'utiliser ?
> Avant d'implémenter un flux à plusieurs composants ; dans la documentation technique et les ADR.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Pas adapté pour décrire la structure (→ classes) ni tout le système (→ C4).

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Ligne de vie | Axe temporel d'un participant |
| Message | Appel entre participants |
| Fragment alt | Branches conditionnelles |
| Nœud de décision | Losange avec plusieurs sorties |

---

## Points clés

- Séquence = interactions dans le temps
- Toujours représenter les cas d'erreur (alt)
- Mermaid = diagramme versionné avec le code

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Diagramme trop détaillé (chaque méthode interne)

---

## Exemple minimal

```text
Astuce : un diagramme de séquence par endpoint critique dans le README de l'API
```

> [!note] Ce que j'en retiens
> Un schéma d'une minute évite une heure d'explication.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Diagrammes de séquence pour les flux inter-services (événements, sagas)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Conception]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/conc-05-uml-sequence-activite]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Quel bloc utiliser pour représenter un cas d'erreur ?

---

## Tâches

- [ ] #task Dessiner la séquence complète login + refresh token
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
