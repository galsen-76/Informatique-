---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Design pattern]]"
  - "[[Patron Stratégie (Strategy)]]"
  - "[[Patron Adaptateur (Adapter)]]"
  - "[[Patron Observateur (Observer)]]"
  - "[[Patron Façade (Facade)]]"
  - "[[Patron Décorateur (Decorator)]]"
tags:
  - exercice
---
# Exercice — Reconnaître le bon patron

> [!info] Objectif
> Entraîner le réflexe le plus utile : à partir d'un problème, reconnaître quel patron (ou aucun) convient, et justifier.
> Notions : [[Design pattern]] · [[Patron Stratégie (Strategy)]] · [[Patron Adaptateur (Adapter)]] · [[Patron Observateur (Observer)]] · [[Patron Façade (Facade)]] · [[Patron Décorateur (Decorator)]]

## Consignes
- [ ] Pour chacune des situations suivantes, écris le patron qui convient (ou « aucun »), en une phrase de justification, **avant** d'ouvrir la solution
- [ ] 1. Ta fonction Nuclio doit pouvoir lire les annotations depuis CVAT ou depuis un fichier XML de ton ancien script
- [ ] 2. Chaque appel à l'API de CVAT doit être réessayé trois fois en cas d'erreur réseau
- [ ] 3. Quand un export est terminé, il faut écrire un log, prévenir l'équipe et mettre à jour un compteur
- [ ] 4. L'export peut produire un PNG, un PDF ou un SVG, et d'autres formats viendront
- [ ] 5. Le handler Nuclio doit rester court alors que l'export enchaîne cinq étapes
- [ ] 6. Une fonction de 15 lignes qui additionne des tailles de fichiers
- [ ] 7. Le code appelle `boto3` (S3) directement à vingt endroits et l'entreprise veut passer à un stockage interne
- [ ] 8. Un formulaire en quatre étapes où l'on ne peut passer à l'étape 3 qu'après avoir validé la 2
- [ ] Ensuite, ouvre le code de CVAT (`cvat/apps`) ou d'Express et trouve deux patrons utilisés pour de vrai

> [!question]- Indice
> Pose-toi trois questions : est-ce que des **variantes** existent ou vont arriver ? Est-ce qu'il faut **traduire** une interface ? Est-ce que plusieurs parties doivent **réagir** à un événement ?

> [!question]- Solution
> 1. **Adaptateur** : deux sources différentes derrière une même interface `SourceAnnotations`.
> 2. **Décorateur** (`@reessayer`) : un comportement transversal ajouté sans toucher aux fonctions.
> 3. **Observateur** : l'export émet un événement, trois abonnés indépendants réagissent.
> 4. **Stratégie** (avec une **fabrique** pour choisir selon le format demandé).
> 5. **Façade** : `ServiceExport.exporter(id)` cache les cinq étapes.
> 6. **Aucun** : une fonction simple est la meilleure solution (KISS).
> 7. **Adaptateur** (et **dépôt**) : une interface `Stockage`, un adaptateur S3 puis un adaptateur interne ; on ne modifie plus que l'adaptateur.
> 8. **État** : une table des transitions permises entre les étapes.
> Dans CVAT : les *serializers* de Django REST Framework (adaptateurs entre modèles et JSON), les permissions en **chaîne**, les signaux Django (**observateur**). Dans Express : les middlewares (**chaîne de responsabilité**).

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
