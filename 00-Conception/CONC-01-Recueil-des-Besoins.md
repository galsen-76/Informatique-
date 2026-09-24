---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M10
tags:
  - conception/besoins
aliases:
  - "Recueil des Besoins et Cahier des Charges"
parent: "[[Conception]]"
children:
  - "[[CONC-02-User-Stories-Criteres-Acceptation|User Stories et Critères d'Acceptation]]"
related_theory:
  - "[[METH-02-Scrum|Scrum]]"
related_snippets:
  - "[[04_Snippets/conc-01-recueil-des-besoins]]"
related_projects: []
source: "https://fr.wikipedia.org/wiki/Cahier_des_charges"
---

# Recueil des Besoins et Cahier des Charges

> [!abstract] Introduction
> Avant d'écrire du code, il faut comprendre QUOI construire et POURQUOI : recueillir les besoins, les formaliser (cahier des charges fonctionnel et technique) et les valider avec le client.

---

## Théorie

> [!question]- C'est quoi ?
> - **Besoin fonctionnel** : ce que le système doit faire (« l'utilisateur peut ajouter un film à ses favoris »)
> - **Besoin non fonctionnel** : les qualités attendues (performance, sécurité, accessibilité RGAA, disponibilité, compatibilité navigateurs)
> - **Contraintes** : techniques (Angular imposé, hébergement interne), réglementaires (RGPD), budget, délais
> - **Cahier des charges fonctionnel (CdCF)** : besoins côté métier ; **spécifications techniques** : comment l'équipe y répond

> [!example]- Analogie
> Construire une maison sans cahier des charges, c'est laisser le maçon décider du nombre de chambres : le résultat peut être solide mais totalement inadapté.

> [!question]- Pourquoi l'utiliser ?
> La majorité des échecs de projets vient de besoins mal compris, pas de mauvais code. Un développeur senior pose des questions AVANT de coder.

> [!question]- Comment ça marche ?
> Techniques : entretiens, ateliers, observation des utilisateurs, analyse de l'existant, prototypes. Prioriser avec **MoSCoW** (Must / Should / Could / Won't).
> Questions réflexes du dev : Qui sont les utilisateurs ? Volume de données ? Cas d'erreur ? Droits ? Qu'existe-t-il déjà ? Comment saura-t-on que c'est réussi ?

> [!question]- Quand l'utiliser ?
> Début de projet, puis en continu (affinage du backlog en agile).

> [!danger]- Quand NE PAS l'utiliser / Limites
> En agile, on ne fige pas tout au départ : on affine au fil des sprints, mais les objectifs et contraintes majeures doivent être clairs tôt.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Besoin fonctionnel | Ce que le système fait |
| Non fonctionnel | Comment il doit le faire (qualités) |
| MoSCoW | Méthode de priorisation |
| Partie prenante | Personne concernée par le projet |
| MVP | Produit minimum viable |

---

## Points clés

- Comprendre le problème avant la solution
- Les non-fonctionnels (perf, sécurité, a11y) sont des besoins à part entière
- Prioriser (MoSCoW) pour livrer un MVP
- Reformuler pour valider sa compréhension

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Coder la solution imaginée sans valider le besoin réel
> - Oublier les cas d'erreur et les rôles

---

## Exemple minimal

```text
CinéTrack — MVP (Must)
- F1 : rechercher un film par titre
- F2 : ajouter/retirer un favori (utilisateur connecté)
- F3 : noter un film (1 à 5)
Non fonctionnels : réponse < 500 ms, responsive, RGAA AA, données personnelles RGPD
Won't (v1) : recommandations IA
```

> [!note] Ce que j'en retiens
> Un MVP clair et priorisé évite de s'éparpiller.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Challenger un besoin (« pourquoi ? » ×5) et proposer une alternative moins coûteuse

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Conception]]
- Sous-sujets → [[CONC-02-User-Stories-Criteres-Acceptation|User Stories et Critères d'Acceptation]]
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/conc-01-recueil-des-besoins]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Donne 3 exigences non fonctionnelles pour une application de ton entreprise.

---

## Tâches

- [ ] #task Rédiger le cahier des charges de CinéTrack (1 page)
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
