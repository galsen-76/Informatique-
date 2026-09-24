---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M12
tags:
  - ia/prompt
aliases:
  - "Prompt Engineering"
parent: "[[Intelligence Artificielle]]"
children: []
related_theory:
  - "[[IA-02-LLM-Fondamentaux|Fondamentaux des LLM]]"
  - "[[IA-07-IA-Assistee-Dev|IA Assistée au Développement]]"
related_snippets:
  - "[[04_Snippets/ia-03-prompt-engineering]]"
related_projects: []
source: "https://docs.anthropic.com/fr/docs/build-with-claude/prompt-engineering/overview"
---

# Prompt Engineering

> [!abstract] Introduction
> Le prompt engineering consiste à formuler les instructions données à un LLM pour obtenir des réponses fiables : contexte clair, rôle, exemples, format de sortie, et itération mesurée.

> [!warning]- Prérequis
> [[IA-02-LLM-Fondamentaux|Fondamentaux des LLM]]

---

## Théorie

> [!question]- C'est quoi ?
> Bonnes pratiques :
> 1. **Être clair et direct** : la tâche, le public, le but
> 2. **Donner le contexte** : pourquoi, contraintes, données (délimitées par des balises `<document>…</document>`)
> 3. **Exemples** (few-shot) : 2-3 exemples d'entrée/sortie attendue
> 4. **Format de sortie** : JSON, liste, longueur (ou sorties structurées de l'API)
> 5. **Laisser réfléchir** sur les tâches complexes (raisonnement étape par étape ou mode de réflexion du modèle)
> 6. **Découper** les tâches complexes en plusieurs appels
> 7. **Tester et itérer** sur un jeu d'exemples réels

> [!example]- Analogie
> Briefer un prestataire : plus le brief est précis (objectif, public, exemples, livrable attendu), moins il y a d'allers-retours.

> [!question]- Pourquoi l'utiliser ?
> La même question formulée différemment donne des résultats très différents ; en production, un prompt est du code qui doit être versionné et testé.

> [!question]- Comment ça marche ?
> ```text
> Système : Tu es un assistant de modération pour CinéTrack.
> Utilisateur :
> Classe la critique ci-dessous dans une catégorie : "ok", "spoiler", "insulte".
> Réponds uniquement en JSON : {"categorie": "...", "raison": "..."}
>
> Exemple : "Le héros meurt à la fin" → {"categorie": "spoiler", "raison": "révèle la fin"}
>
> <critique>{{texte}}</critique>
> ```

> [!question]- Quand l'utiliser ?
> Toute intégration de LLM (fonctionnalité produit) et usage quotidien des assistants.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Le prompt ne garantit rien : valider les sorties (schéma), gérer les refus et erreurs, et se protéger de l'**injection de prompt** (un texte utilisateur qui contient « ignore les instructions précédentes »).

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Few-shot | Donner quelques exemples dans le prompt |
| Zero-shot | Sans exemple |
| Injection de prompt | Texte malveillant qui détourne les instructions |
| Sortie structurée | Réponse contrainte par un schéma |

---

## Points clés

- Clarté, contexte, exemples, format
- Délimiter les données utilisateur
- Versionner et évaluer les prompts
- Valider la sortie côté code

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Mélanger instructions et données utilisateur sans délimitation
> - Juger un prompt sur 1 seul exemple

---

## Exemple minimal

```text
Moins bon : « Améliore ce code »
Mieux : « Refactore ce service Angular pour utiliser des signals au lieu de BehaviorSubject.
Garde l'API publique identique. Explique les changements en 3 puces. <code>…</code> »
```

> [!note] Ce que j'en retiens
> Objectif, contrainte, livrable : le résultat devient prévisible.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Construire un jeu d'évaluation pour comparer des versions de prompts

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Intelligence Artificielle]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/ia-03-prompt-engineering]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Qu'est-ce qu'une injection de prompt et comment la limiter ?

---

## Tâches

- [ ] #task Écrire le prompt de modération de critiques et le tester sur 20 exemples
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
