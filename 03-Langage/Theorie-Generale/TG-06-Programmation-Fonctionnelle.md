---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M02
tags:
  - theorie/fonctionnel
aliases:
  - "Programmation Fonctionnelle"
parent: "[[Théorie Générale]]"
children: []
related_theory:
  - "[[PY-12-Fonctionnel-Lambda|Programmation Fonctionnelle Lambda Python]]"
  - "[[JS-05-Objets-Tableaux-Methodes|Objets et Tableaux JavaScript]]"
related_snippets:
  - "[[04_Snippets/tg-06-programmation-fonctionnelle]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://fr.wikipedia.org/wiki/Programmation_fonctionnelle"
---

# Programmation Fonctionnelle

> [!abstract] Introduction
> La programmation fonctionnelle construit des programmes en composant des fonctions pures sur des données immuables — l'esprit de RxJS, des signals `computed`, des reducers et de `map/filter/reduce`.

> [!warning]- Prérequis
> [[JS-03-Fonctions-Scope-Closures|Fonctions Scope et Closures JavaScript]]

---

## Théorie

> [!question]- C'est quoi ?
> Principes :
> - **Fonctions pures** : même entrée → même sortie, aucun effet de bord
> - **Immutabilité** : on ne modifie pas, on crée
> - **Fonctions d'ordre supérieur** et **composition**
> - **Déclaratif** : dire QUOI obtenir plutôt que COMMENT boucler

> [!example]- Analogie
> Une fonction pure est une calculatrice : 2 + 2 donne toujours 4, sans rien changer ailleurs. Un effet de bord, c'est une calculatrice qui enverrait aussi un SMS à chaque calcul.

> [!question]- Pourquoi l'utiliser ?
> Code prévisible, facile à tester (pas de mock), parallélisable, et compatible avec la détection de changements par référence.

> [!question]- Comment ça marche ?
> ```typescript
> const total = (lignes: Ligne[]) => lignes.reduce((s, l) => s + l.prix * l.qte, 0);  // pure
> const pipe = <T>(...fns: Array<(x: T) => T>) => (x: T) => fns.reduce((v, f) => f(v), x);
> const normaliser = pipe<string>(s => s.trim(), s => s.toLowerCase());
> ```
> Les effets de bord (HTTP, DOM, logs) sont repoussés aux bords du programme (services, `effect()`, `tap()`).

> [!question]- Quand l'utiliser ?
> Logique métier et calculs dérivés : toujours viser la pureté. Isoler les effets de bord.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Tout en immuable peut coûter en performance sur de très grosses structures ; le « tout fonctionnel » dogmatique nuit à la lisibilité en équipe.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Fonction pure | Sans effet de bord, déterministe |
| Effet de bord | Action qui modifie l'extérieur |
| Composition | Enchaîner des fonctions |
| Déclaratif | Décrire le résultat plutôt que les étapes |

---

## Points clés

- Calculs purs, effets isolés
- `computed()` doit être pur, `effect()` sert aux effets
- Opérateurs RxJS = composition de fonctions

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Mettre un appel HTTP dans un `computed`/`map`

---

## Exemple minimal

```typescript
// Pur, testable sans rien mocker
export const filtrerFilms = (films: Film[], texte: string) =>
  films.filter(f => f.titre.toLowerCase().includes(texte.toLowerCase()));
```

> [!note] Ce que j'en retiens
> Une fonction pure se teste avec une simple assertion.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Reconnaître les concepts fonctionnels dans RxJS (map, flatMap = monades simplifiées)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Théorie Générale]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[TG-05-Paradigmes-POO|Programmation Orientée Objet]]

**Pratique :**
- Extrait de code → [[04_Snippets/tg-06-programmation-fonctionnelle]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Qu'est-ce qu'un effet de bord ? Donne 3 exemples en front.

---

## Tâches

- [ ] #task Extraire la logique de filtrage d'un composant en fonctions pures testées
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
