---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M10
tags:
  - conception/uml/use-case
aliases:
  - "UML Diagramme de Cas d'Utilisation"
parent: "[[Conception]]"
children:
  - "[[CONC-04-UML-Diagramme-de-Classes|UML Diagramme de Classes]]"
  - "[[CONC-05-UML-Sequence-Activite|UML Séquence et Activité]]"
related_theory:
  - "[[CONC-02-User-Stories-Criteres-Acceptation|User Stories et Critères d'Acceptation]]"
related_snippets:
  - "[[04_Snippets/conc-03-uml-cas-utilisation]]"
related_projects: []
source: "https://www.uml-diagrams.org/use-case-diagrams.html"
---

# UML Diagramme de Cas d'Utilisation

> [!abstract] Introduction
> UML est un langage graphique standard pour modéliser un logiciel ; le diagramme de cas d'utilisation montre QUI (acteurs) peut faire QUOI (cas d'utilisation) avec le système.

---

## Théorie

> [!question]- C'est quoi ?
> Éléments : **acteurs** (humains ou systèmes externes), **cas d'utilisation** (ovales), **frontière du système** (rectangle), relations `include` (toujours inclus) et `extend` (optionnel).

> [!example]- Analogie
> Un plan de la carte d'un restaurant par type de client : ce que peut commander un client, ce que fait le serveur, ce que gère le chef.

> [!question]- Pourquoi l'utiliser ?
> Vision d'ensemble du périmètre avant d'entrer dans les détails ; support de discussion avec le métier.

> [!question]- Comment ça marche ?
> ```mermaid
> flowchart LR
>   V(("Visiteur")) --> R["Rechercher un film"]
>   V --> F["Consulter une fiche"]
>   U(("Utilisateur")) --> R
>   U --> FAV["Gérer ses favoris"]
>   U --> N["Noter un film"]
>   A(("Admin")) --> M["Modérer les critiques"]
>   FAV -. "include" .-> AUTH["S'authentifier"]
>   N -. "include" .-> AUTH
>   TMDB[["API TMDB (système)"]] --- R
> ```
> (Mermaid n'a pas de diagramme use case natif : on l'approche avec un flowchart ; PlantUML ou draw.io le font nativement.)

> [!question]- Quand l'utiliser ?
> Début de projet ou nouvelle grande fonctionnalité.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Ne décrit pas l'ordre des actions ni l'interface : compléter avec des user stories et des diagrammes de séquence.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Acteur | Rôle externe interagissant avec le système |
| Cas d'utilisation | Fonction rendue à un acteur |
| include | Cas toujours exécuté par un autre |
| extend | Cas optionnel sous condition |

---

## Points clés

- Acteurs = rôles, pas personnes
- Un cas = un objectif utilisateur
- Complément des user stories, pas un remplacement

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Modéliser des écrans ou des clics au lieu d'objectifs

---

## Exemple minimal

```text
Acteurs CinéTrack : Visiteur, Utilisateur, Administrateur, API TMDB
```

> [!note] Ce que j'en retiens
> Les rôles identifiés ici deviendront les rôles d'autorisation (RBAC) de l'API.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Utiliser le C4 model pour l'architecture, UML pour le détail quand il apporte de la valeur

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Conception]]
- Sous-sujets → [[CONC-04-UML-Diagramme-de-Classes|UML Diagramme de Classes]], [[CONC-05-UML-Sequence-Activite|UML Séquence et Activité]]
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/conc-03-uml-cas-utilisation]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Différence entre include et extend ?

---

## Tâches

- [ ] #task Dessiner le diagramme de cas d'utilisation de CinéTrack
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
