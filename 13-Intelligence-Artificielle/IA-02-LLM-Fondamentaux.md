---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M12
tags:
  - ia/llm
aliases:
  - "Fondamentaux des LLM"
parent: "[[Intelligence Artificielle]]"
children:
  - "[[IA-03-Prompt-Engineering|Prompt Engineering]]"
  - "[[IA-04-RAG-Embeddings|RAG et Embeddings]]"
  - "[[IA-05-APIs-LLM|APIs de LLM]]"
related_theory:
  - "[[IA-01-Fondamentaux-IA-ML|Fondamentaux IA et Machine Learning]]"
related_snippets:
  - "[[04_Snippets/ia-02-llm-fondamentaux]]"
related_projects: []
source: "https://docs.anthropic.com/fr/docs/intro-to-claude"
---

# Fondamentaux des LLM

> [!abstract] Introduction
> Un LLM (Large Language Model : Claude, GPT, Gemini, Mistral, Llama) est un réseau de neurones entraîné sur d'énormes quantités de texte pour prédire la suite d'un texte ; il sait ainsi répondre, résumer, traduire, coder — sans « comprendre » ni garantir la vérité.

> [!warning]- Prérequis
> [[IA-01-Fondamentaux-IA-ML|Fondamentaux IA et Machine Learning]]

---

## Théorie

> [!question]- C'est quoi ?
> Concepts :
> - **Token** : morceau de texte (~¾ de mot en anglais, un peu moins en français) — unité de facturation et de limite
> - **Fenêtre de contexte** : quantité de tokens que le modèle « voit » à la fois (prompt + historique + documents + réponse)
> - **Prompt système** : instructions de cadrage ; **messages** : l'échange utilisateur / assistant
> - **Température / effort / raisonnement** : réglages de créativité ou de profondeur de réflexion (selon les modèles)
> - **Hallucination** : réponse plausible mais fausse
> - **Sans mémoire** : chaque appel API est indépendant ; l'application renvoie l'historique

> [!example]- Analogie
> Un LLM est un stagiaire qui a lu toute la bibliothèque : brillant pour rédiger et synthétiser, mais qui peut inventer une référence avec aplomb s'il ne la connaît pas — il faut lui donner les documents et relire son travail.

> [!question]- Pourquoi l'utiliser ?
> Savoir ce qu'un LLM peut et ne peut pas faire pour concevoir des fonctionnalités fiables (et utiliser correctement les assistants de code).

> [!question]- Comment ça marche ?
> Entraînement : pré-entraînement (prédire le prochain token sur des milliards de textes) → ajustement (instructions, retours humains) → modèle « assistant ».
> Génération : token par token, chaque token prédit selon tout ce qui précède (d'où le streaming).

> [!question]- Quand l'utiliser ?
> Langage naturel : résumé, extraction, classification, rédaction, reformulation, assistance au code, chatbots sur documents.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Hallucinations, connaissances figées à une date, coût et latence, non-déterminisme, sensibilité à la formulation, risques de fuite de données et d'injection de prompt.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Token | Unité de texte traitée par le modèle |
| Contexte | Texte fourni au modèle pour un appel |
| Hallucination | Affirmation inventée |
| Prompt système | Instructions de comportement |
| Streaming | Réception de la réponse au fil de l'eau |

---

## Points clés

- Un LLM prédit du texte, il ne vérifie pas les faits
- Tout ce qu'il doit savoir doit être dans le contexte
- Coût et limites en tokens
- Toujours valider ses sorties

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Envoyer des données personnelles ou confidentielles sans accord de l'entreprise
> - Faire confiance à une réponse sans vérification

---

## Exemple minimal

```text
« Résume cette critique en 1 phrase et donne une note de 1 à 5 au format JSON »
→ {"resume": "Une fresque visuelle impressionnante au rythme lent.", "note": 4}
```

> [!note] Ce que j'en retiens
> Des consignes précises et un format de sortie défini rendent le LLM exploitable par le code.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Comprendre les compromis modèle / coût / latence / qualité et mesurer avec des évaluations

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Intelligence Artificielle]]
- Sous-sujets → [[IA-03-Prompt-Engineering|Prompt Engineering]], [[IA-04-RAG-Embeddings|RAG et Embeddings]], [[IA-05-APIs-LLM|APIs de LLM]]
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/ia-02-llm-fondamentaux]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi un LLM « oublie »-t-il la conversation si on ne renvoie pas l'historique ?

---

## Tâches

- [ ] #task Lire la politique de l'entreprise sur l'usage de l'IA et des données
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
