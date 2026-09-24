---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - ia/dev
aliases:
  - "IA Assistée au Développement"
parent: "[[Intelligence Artificielle]]"
children: []
related_theory:
  - "[[IA-03-Prompt-Engineering|Prompt Engineering]]"
  - "[[TEST-07-Code-Review|Code Review]]"
  - "[[OUT-06-Recherche-Documentation|Chercher et Lire la Documentation]]"
related_snippets:
  - "[[04_Snippets/ia-07-ia-assistee-dev]]"
related_projects: []
source: "https://docs.anthropic.com/fr/docs/claude-code/overview"
---

# IA Assistée au Développement

> [!abstract] Introduction
> Les assistants de code (Claude Code, GitHub Copilot, Cursor, assistants intégrés à IntelliJ/VS Code) accélèrent énormément le développement — à condition de les utiliser pour APPRENDRE et produire du code que l'on comprend, relit et teste.

---

## Théorie

> [!question]- C'est quoi ?
> Usages utiles :
> - Expliquer un code inconnu ou une erreur
> - Générer des tests, du code répétitif, des migrations
> - Proposer un refactoring, relire une MR
> - Apprendre : « explique-moi les signals avec un exemple, puis pose-moi 3 questions »
> - Rédiger de la documentation

> [!example]- Analogie
> Un GPS : formidable pour aller vite, mais si tu ne regardes jamais la carte, tu ne sais toujours pas où tu es — et le jour où il se trompe, tu fonces dans le lac.

> [!question]- Pourquoi l'utiliser ?
> Productivité réelle, mais un junior qui délègue tout ne progresse pas et laisse passer des erreurs (API inventées, failles, code obsolète).

> [!question]- Comment ça marche ?
> Règles d'or pour ta première année :
> 1. **Essaie d'abord seul** (15-30 min), puis demande de l'aide à l'IA
> 2. **Ne commite jamais un code que tu ne sais pas expliquer ligne par ligne**
> 3. Demande des **explications**, pas seulement du code
> 4. Vérifie dans la **documentation officielle** (versions !)
> 5. Fais relire / teste tout ce qui est généré
> 6. Respecte la **politique de l'entreprise** (données confidentielles, code client)
> 7. Utilise l'IA comme **tuteur** : quiz, exercices, revue de tes notes

> [!question]- Quand l'utiliser ?
> Tous les jours, avec discernement.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Hallucinations d'API, code daté (syntaxe Angular pré-17, Vue 2), failles de sécurité, licences ; dépendance qui freine l'apprentissage.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Assistant de code | Outil d'IA intégré au développement |
| Complétion | Suggestion de suite de code |
| Agent de code | Assistant qui modifie plusieurs fichiers et exécute des commandes |

---

## Points clés

- Comprendre avant de commiter
- Doc officielle pour vérifier
- L'IA comme tuteur, pas comme béquille
- Respecter la confidentialité

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Accepter une suggestion Angular en `*ngIf`/NgModule sur un projet moderne
> - Coller du code client confidentiel dans un outil non autorisé

---

## Exemple minimal

```text
Prompt d'apprentissage :
« Je révise les opérateurs RxJS switchMap / mergeMap / concatMap / exhaustMap.
Pose-moi 5 questions de difficulté croissante, une à la fois, et corrige mes réponses. »
```

> [!note] Ce que j'en retiens
> L'IA devient un répétiteur personnel disponible 24 h/24.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Intégrer l'IA dans le workflow d'équipe (revue assistée, génération de tests) avec des garde-fous

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Intelligence Artificielle]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/ia-07-ia-assistee-dev]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Quelle est la règle n°2 et pourquoi est-elle essentielle ?

---

## Tâches

- [ ] #task Demander quels outils d'IA sont autorisés au travail
- [ ] #task Utiliser chaque semaine un prompt « quiz » sur les notes de la semaine
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
