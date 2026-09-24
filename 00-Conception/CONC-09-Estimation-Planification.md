---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M10
tags:
  - conception/estimation
aliases:
  - "Estimation et Planification"
parent: "[[Conception]]"
children: []
related_theory:
  - "[[METH-02-Scrum|Scrum]]"
  - "[[CONC-02-User-Stories-Criteres-Acceptation|User Stories et Critères d'Acceptation]]"
related_snippets:
  - "[[04_Snippets/conc-09-estimation-planification]]"
related_projects: []
source: "https://www.mountaingoatsoftware.com/agile/planning-poker"
---

# Estimation et Planification

> [!abstract] Introduction
> Estimer, c'est donner un ordre de grandeur de l'effort (story points, jours idéaux) pour planifier ; découper le travail en petites tâches est la meilleure façon d'estimer juste.

> [!warning]- Prérequis
> [[CONC-02-User-Stories-Criteres-Acceptation|User Stories et Critères d'Acceptation]]

---

## Théorie

> [!question]- C'est quoi ?
> - **Story points** : effort relatif (complexité + incertitude + volume), suite de Fibonacci 1, 2, 3, 5, 8, 13…
> - **Planning poker** : chaque membre vote en même temps, on discute les écarts
> - **Vélocité** : points réalisés par sprint (sert à planifier, pas à comparer les équipes)
> - **T-shirt sizing** (S/M/L/XL) pour les estimations grossières

> [!example]- Analogie
> Estimer la distance d'une randonnée en « heures de marche » plutôt qu'en kilomètres : on tient compte du dénivelé (complexité) et du brouillard (incertitude).

> [!question]- Pourquoi l'utiliser ?
> Donner de la visibilité, détecter les stories trop grosses ou floues, engager l'équipe sur un sprint réaliste.

> [!question]- Comment ça marche ?
> Découper une story en tâches techniques :
> ```text
> Story « Ajouter aux favoris » (5 pts)
> - [ ] API : table favoris + migration
> - [ ] API : POST/DELETE /favoris + tests e2e
> - [ ] Front : FavorisService + intercepteur auth
> - [ ] Front : bouton + état + tests
> - [ ] Recette + doc
> ```
> Règle : une tâche > 1 jour est trop grosse ; une story > 8 points doit être découpée.

> [!question]- Quand l'utiliser ?
> Affinage du backlog et sprint planning.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Une estimation n'est pas un engagement contractuel ; transformer les points en heures pour « contrôler » l'équipe détruit leur intérêt.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Story point | Unité relative d'effort |
| Vélocité | Capacité mesurée d'une équipe par sprint |
| Planning poker | Estimation collective par vote simultané |
| Buffer | Marge pour l'imprévu |

---

## Points clés

- Découper pour mieux estimer
- Estimer en relatif, collectivement
- Inclure tests, revue et doc dans l'estimation

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Oublier les tests, la revue et le déploiement dans l'estimation
> - Sous-estimer l'intégration et les imprévus

---

## Exemple minimal

```text
Écart au planning poker : A vote 2, B vote 13
→ B connaît un piège (la BDD legacy n'a pas de clé étrangère) : discussion, re-vote à 8
```

> [!note] Ce que j'en retiens
> Les écarts de vote révèlent les risques cachés : c'est la vraie valeur du planning poker.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Donner des estimations avec une fourchette et les hypothèses associées

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Conception]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/conc-09-estimation-planification]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi une tâche de plus d'un jour doit-elle être découpée ?

---

## Tâches

- [ ] #task Estimer toutes les stories du MVP CinéTrack et comparer au réel
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
