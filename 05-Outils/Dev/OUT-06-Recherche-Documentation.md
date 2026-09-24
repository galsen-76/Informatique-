---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - outils/apprendre
aliases:
  - "Chercher et Lire la Documentation"
parent: "[[Outils]]"
children: []
related_theory:
  - "[[METH-05-Resolution-Problemes-Debug|Résolution de Problèmes et Débogage]]"
related_snippets:
  - "[[04_Snippets/out-06-recherche-documentation]]"
related_projects: []
source: "https://developer.mozilla.org/fr/"
---

# Chercher et Lire la Documentation

> [!abstract] Introduction
> Savoir trouver l'information fiable (doc officielle, code source, issues GitHub) et lire une documentation technique est la compétence qui fait progresser le plus vite — surtout avec l'IA qui peut se tromper.

---

## Théorie

> [!question]- C'est quoi ?
> Sources par ordre de fiabilité :
> 1. Documentation officielle (angular.dev, vuejs.org, docs.nestjs.com, MDN, postgresql.org)
> 2. Code source et types (`Ctrl+clic` dans l'IDE)
> 3. Changelogs, guides de migration, RFC
> 4. Issues/discussions GitHub du projet
> 5. Stack Overflow, blogs, IA (à vérifier, souvent datés)

> [!example]- Analogie
> La doc officielle est la carte IGN à jour ; un article de blog de 2019 est un plan dessiné par un voisin : utile, mais les routes ont peut-être changé.

> [!question]- Pourquoi l'utiliser ?
> Les frameworks évoluent vite (Angular : signals, contrôle de flux, zoneless ; Vue 3.5 ; Nest 11) : beaucoup de tutoriels sont obsolètes.

> [!question]- Comment ça marche ?
> - Toujours vérifier la **version** (du tuto vs de ton projet)
> - Lire le « Getting started » puis les « Guides », garder l'« API reference » pour les détails
> - Reproduire le problème dans un projet minimal (StackBlitz)
> - Poser une question : contexte, ce que tu as essayé, message d'erreur complet, exemple minimal

> [!question]- Quand l'utiliser ?
> Avant toute installation de librairie, à chaque nouvelle API, à chaque message d'erreur inconnu.

> [!danger]- Quand NE PAS l'utiliser / Limites
> L'IA peut inventer des API ou mélanger des versions : toujours confronter à la doc et tester.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Changelog | Liste des changements par version |
| Guide de migration | Étapes pour passer d'une version à l'autre |
| Reproduction minimale | Plus petit exemple qui montre le problème |

---

## Points clés

- Doc officielle d'abord
- Vérifier la version
- Exemple minimal pour comprendre ou demander de l'aide

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Copier-coller une solution sans la comprendre
> - Suivre un tutoriel Angular basé sur NgModules/`*ngIf` pour un projet récent

---

## Exemple minimal

```text
Question bien posée :
« Angular 20, composant standalone. `toSignal(this.route.paramMap)` renvoie undefined au premier rendu.
J'ai essayé initialValue et requireSync (erreur NG0601). Reproduction : <lien StackBlitz>. »
```

> [!note] Ce que j'en retiens
> Version, contexte, essais, erreur, reproduction : on obtient une réponse en minutes.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Contribuer à la doc ou aux issues des projets open source utilisés

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Outils]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/out-06-recherche-documentation]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Comment vérifier qu'un tutoriel correspond à ta version ?

---

## Tâches

- [ ] #task Mettre en favoris les docs officielles de la stack
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
