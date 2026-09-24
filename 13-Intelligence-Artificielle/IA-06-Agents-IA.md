---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Avancé
month: M12
tags:
  - ia/agents
aliases:
  - "Agents IA et Tool Use"
parent: "[[Intelligence Artificielle]]"
children: []
related_theory:
  - "[[IA-05-APIs-LLM|APIs de LLM]]"
  - "[[IA-04-RAG-Embeddings|RAG et Embeddings]]"
related_snippets:
  - "[[04_Snippets/ia-06-agents-ia]]"
related_projects: []
source: "https://www.anthropic.com/engineering/building-effective-agents"
---

# Agents IA et Tool Use

> [!abstract] Introduction
> Un agent est un LLM qui utilise des outils (fonctions, API, recherche, code) en boucle pour accomplir une tâche en plusieurs étapes ; le « tool use » (function calling) et le protocole MCP en sont les briques.

> [!warning]- Prérequis
> [[IA-05-APIs-LLM|APIs de LLM]]

---

## Théorie

> [!question]- C'est quoi ?
> - **Tool use** : on décrit des fonctions (nom, description, schéma JSON) ; le modèle décide de les appeler, ton code les exécute et renvoie le résultat
> - **Workflow** : enchaînement d'étapes contrôlé par le code (le plus fiable)
> - **Agent** : le modèle décide lui-même des étapes et des outils (plus flexible, moins prévisible)
> - **MCP** (Model Context Protocol) : standard pour exposer outils et données aux assistants/agents

> [!example]- Analogie
> Un workflow est une recette suivie à la lettre ; un agent est un cuisinier à qui l'on donne un objectif et un accès au garde-manger, et qui décide lui-même des étapes.

> [!question]- Pourquoi l'utiliser ?
> Automatiser des tâches multi-étapes : assistant qui consulte l'API de l'application, recherche puis synthétise, agents de code.

> [!question]- Comment ça marche ?
> ```mermaid
> sequenceDiagram
>   participant App
>   participant LLM
>   participant Outil as Outil (API CinéTrack)
>   App->>LLM: question + description des outils
>   LLM-->>App: appel d'outil rechercherFilms({genre:"SF"})
>   App->>Outil: exécute
>   Outil-->>App: résultats
>   App->>LLM: résultat de l'outil
>   LLM-->>App: réponse finale
> ```
> Règle : commencer par le plus simple (un appel, puis un workflow) et ne passer à un agent autonome que si la tâche l'exige vraiment.

> [!question]- Quand l'utiliser ?
> Tâches ouvertes et multi-étapes où l'erreur est rattrapable (tests, validation humaine).

> [!danger]- Quand NE PAS l'utiliser / Limites
> Coût, latence, erreurs en cascade, sécurité : un agent qui peut appeler des outils peut faire des dégâts → droits minimaux, confirmation humaine pour les actions sensibles, journalisation.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Tool use | Appel de fonction décidé par le modèle |
| Agent | LLM + outils + boucle |
| MCP | Protocole standard d'accès aux outils/données |
| Human-in-the-loop | Validation humaine d'une action |

---

## Points clés

- Workflow avant agent
- Outils bien décrits et à droits minimaux
- Validation humaine des actions irréversibles
- Tout journaliser

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Donner à un agent un outil de suppression sans garde-fou

---

## Exemple minimal

```text
Outils exposés à l'assistant CinéTrack : rechercherFilms (lecture), ajouterFavori (écriture, confirmation requise)
```

> [!note] Ce que j'en retiens
> Séparer lecture et écriture, et faire confirmer les écritures.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Concevoir les outils (noms, descriptions, erreurs explicites) et évaluer les agents sur des scénarios

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Intelligence Artificielle]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/ia-06-agents-ia]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Quelle différence entre un workflow et un agent ?

---

## Tâches

- [ ] #task Lire « Building effective agents » (Anthropic)
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
