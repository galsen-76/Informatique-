---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M12
tags:
  - ia/llm
aliases:
  - "Fondamentaux des LLM"
parent: "[[Intelligence Artificielle]]"
related_theory:
  - "[[IA-01-Fondamentaux-IA-ML|Fondamentaux IA et Machine Learning]]"
related_projects: []
source: "https://docs.anthropic.com/fr/docs/intro-to-claude"
---

# Fondamentaux des LLM

> [!abstract] En bref
> Un **LLM** (*Large Language Model* : Claude, GPT, Gemini, Mistral) a lu une quantité gigantesque de texte et a appris à **prédire la suite la plus probable**. C'est ce qui lui permet de répondre, résumer, traduire ou coder. Mais il **ne vérifie rien** : il peut inventer avec assurance. La règle d'or : **tout ce qu'il doit savoir doit être dans ce que tu lui envoies**.

## Comment il écrit

Il génère sa réponse **morceau par morceau** (*token* par token), chaque morceau choisi selon tout ce qui précède. C'est pour ça que les réponses s'affichent au fil de l'eau (*streaming*).

```text
« Le film Inception est réalisé par » → « Christopher » → « Nolan » → « . »
```

## Les 5 notions à connaître

| Notion | En clair | Pourquoi ça compte pour toi |
|---|---|---|
| **Token** | un morceau de mot (environ 3 à 4 caractères) | tu **paies** au token, et les limites sont en tokens |
| **Fenêtre de contexte** | tout ce que le modèle « voit » en un appel : consignes + historique + documents + réponse | ce qui n'y est pas **n'existe pas** pour lui |
| **Prompt système** | les consignes générales (« tu es l'assistant de CinéTrack… ») | fixe le rôle et les règles |
| **Sans mémoire** | chaque appel est indépendant | pour une conversation, **ton application** renvoie tout l'historique à chaque fois |
| **Hallucination** | une réponse plausible mais fausse | il faut **vérifier** et lui fournir les bonnes sources |

## Comment il a été fabriqué

1. **Pré-entraînement** : prédire le mot suivant sur des milliards de textes → il apprend la langue, les faits, le code.
2. **Affinage** : on lui apprend à suivre des instructions et à être utile, avec des retours humains → il devient un « assistant ».

Conséquence : ses connaissances s'arrêtent à une **date**. Il ne connaît pas les films sortis après, ni ta base de données.

## Ce qu'il fait bien, ce qu'il fait mal

| ✅ Bien | ⚠️ Attention |
|---|---|
| résumer, reformuler, traduire | les faits précis (dates, chiffres, références) |
| extraire des infos d'un texte | les calculs exacts |
| classer (ton d'une critique, catégorie) | l'actualité après sa date de connaissances |
| écrire et expliquer du code | les API récentes (il peut proposer une ancienne syntaxe) |
| répondre à partir de documents fournis | répondre de mémoire sur **tes** données |

## Exemple

```text
Consigne : « Résume cette critique en une phrase et donne une note de 1 à 5, en JSON. »
Réponse  : {"resume": "Une fresque visuelle impressionnante au rythme lent.", "note": 4}
```

Une consigne précise + un format de sortie défini = une réponse **exploitable par ton code**.

## Pièges

- **Lui faire confiance sans vérifier** : relis, teste, valide.
- **Lui envoyer des données confidentielles** (code client, données personnelles) sans l'accord de l'entreprise.
- **Croire qu'il se souvient** de la conversation d'hier : c'est l'application qui garde l'historique.

La suite : bien lui parler avec [[IA-03-Prompt-Engineering|le prompt engineering]].
