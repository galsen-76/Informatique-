---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - methodologie/scrum
aliases:
  - "Scrum"
parent: "[[Méthodologie]]"
children: []
related_theory:
  - "[[METH-01-Agile-Manifeste|Agile et Manifeste Agile]]"
  - "[[CONC-09-Estimation-Planification|Estimation et Planification]]"
  - "[[04-Issues-Boards|Issues et Boards GitLab]]"
related_snippets:
  - "[[04_Snippets/meth-02-scrum]]"
related_projects: []
source: "https://scrumguides.org/scrum-guide.html"
---

# Scrum

> [!abstract] Introduction
> Scrum est le cadre agile le plus utilisé : des sprints de 1 à 4 semaines, trois rôles (Product Owner, Scrum Master, Développeurs), des événements réguliers et des artefacts (backlogs, incrément).

> [!warning]- Prérequis
> [[METH-01-Agile-Manifeste|Agile et Manifeste Agile]]

---

## Théorie

> [!question]- C'est quoi ?
> **Rôles** : Product Owner (priorise la valeur, gère le backlog), Scrum Master (facilite, lève les obstacles), Développeurs (réalisent l'incrément).
> **Événements** : Sprint, Sprint Planning, Daily Scrum (15 min), Sprint Review (démo), Sprint Retrospective (amélioration).
> **Artefacts** : Product Backlog, Sprint Backlog, Incrément (+ Definition of Done).

> [!example]- Analogie
> Une équipe de rugby (d'où le nom « scrum » = mêlée) : des phases de jeu courtes, un point d'équipe avant chaque action, on analyse le match et on s'améliore.

> [!question]- Pourquoi l'utiliser ?
> Rythme prévisible, transparence (tout le monde voit l'avancement), amélioration continue.

> [!question]- Comment ça marche ?
> ```mermaid
> flowchart LR
>   PB[Product Backlog] --> SP[Sprint Planning]
>   SP --> SB[Sprint Backlog]
>   SB --> S["Sprint (2 sem.)<br/>Daily chaque jour"]
>   S --> I[Incrément]
>   I --> RV[Sprint Review]
>   RV --> RT[Rétrospective]
>   RT --> PB
> ```
> Daily (3 questions classiques) : qu'ai-je fait hier ? que vais-je faire ? qu'est-ce qui me bloque ?

> [!question]- Quand l'utiliser ?
> Équipes produit qui livrent par incréments réguliers.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Pour du support/run avec des demandes imprévisibles, Kanban est souvent plus adapté.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Sprint | Itération à durée fixe |
| Product Owner | Responsable de la valeur et des priorités |
| Scrum Master | Garant du cadre, facilitateur |
| Daily | Point quotidien de synchronisation |
| Rétrospective | Réunion d'amélioration de l'équipe |

---

## Points clés

- Durée de sprint fixe
- Le PO priorise, l'équipe décide du « comment »
- Daily = synchronisation, pas un reporting au chef
- Rétro = amélioration concrète et actionnable

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Daily de 45 minutes qui devient une réunion technique
> - Ajouter du travail en plein sprint sans renégocier

---

## Exemple minimal

```text
Daily efficace (1 min) :
« Hier : endpoint /favoris + tests. Aujourd'hui : bouton favoris côté Angular.
Blocage : j'attends les droits sur la BDD de recette. »
```

> [!note] Ce que j'en retiens
> Clair, court, blocage explicite : le Scrum Master sait quoi débloquer.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Contribuer aux rétrospectives avec des propositions techniques mesurables

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Méthodologie]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[METH-03-Kanban|Kanban]]

**Pratique :**
- Extrait de code → [[04_Snippets/meth-02-scrum]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Quelle différence entre Sprint Review et Rétrospective ?

> [!faq]- Questions d'entretien
> - Décrivez votre expérience de Scrum.

---

## Tâches

- [ ] #task Noter le rituel exact de l'équipe (durée de sprint, jour de démo, outil)
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
