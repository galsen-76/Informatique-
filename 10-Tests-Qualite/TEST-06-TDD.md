---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M10
tags:
  - tests/tdd
aliases:
  - "TDD"
parent: "[[Tests et Qualité]]"
children: []
related_theory:
  - "[[TEST-01-Pyramide-des-Tests|Pyramide des Tests]]"
  - "[[ARCH-10-Clean-Code|Clean Code]]"
related_snippets:
  - "[[04_Snippets/test-06-tdd]]"
related_projects: []
source: "https://martinfowler.com/bliki/TestDrivenDevelopment.html"
---

# TDD

> [!abstract] Introduction
> Le Test-Driven Development consiste à écrire le test AVANT le code, en cycles très courts Rouge → Vert → Refactor ; il produit un code testable, minimal et une documentation vivante.

> [!warning]- Prérequis
> [[TEST-02-Tests-Unitaires-Vitest-Jest|Tests Unitaires avec Vitest et Jest]]

---

## Théorie

> [!question]- C'est quoi ?
> ```mermaid
> flowchart LR
>   R["🔴 Rouge<br/>écrire un test qui échoue"] --> V["🟢 Vert<br/>code minimal pour passer"]
>   V --> F["🔵 Refactor<br/>améliorer sans casser"]
>   F --> R
> ```

> [!example]- Analogie
> Définir la cible avant de tirer à l'arc : on sait exactement quand on a réussi, et on ne fait pas plus que nécessaire.

> [!question]- Pourquoi l'utiliser ?
> Conception guidée par l'usage (on écrit d'abord comment on VEUT utiliser le code), pas de code superflu, filet de sécurité immédiat pour refactorer.

> [!question]- Comment ça marche ?
> 1. Écrire le plus petit test qui décrit un comportement et le voir échouer (pour la bonne raison)
> 2. Écrire le code le plus simple qui le fait passer (même « naïf »)
> 3. Refactorer code ET tests, tests toujours verts
> 4. Recommencer avec le cas suivant (cas limite, erreur)
> Variante BDD : partir des critères d'acceptation (Étant donné / Quand / Alors).

> [!question]- Quand l'utiliser ?
> Logique métier, règles de calcul, corrections de bugs (écrire d'abord le test qui reproduit le bug).

> [!danger]- Quand NE PAS l'utiliser / Limites
> Moins naturel pour l'UI exploratoire ou le prototypage ; demande de la pratique pour ne pas ralentir au début.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Red-Green-Refactor | Cycle du TDD |
| Baby steps | Très petites étapes |
| BDD | Behaviour-Driven Development |

---

## Points clés

- Test d'abord, le voir échouer
- Code minimal pour passer
- Refactor avec les tests verts
- Idéal pour la correction de bugs

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Écrire tous les tests d'un coup puis tout le code
> - Sauter l'étape refactor

---

## Exemple minimal

```typescript
// 1. Rouge
it('refuse une note hors de 1..5', () => expect(() => noter(6)).toThrow(NoteInvalide));
// 2. Vert
export function noter(n: number) { if (n < 1 || n > 5) throw new NoteInvalide(n); return n; }
// 3. Refactor : extraire la règle
const NOTE_MIN = 1, NOTE_MAX = 5;
```

> [!note] Ce que j'en retiens
> Le test exprime la règle métier avant même que le code existe.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Pratiquer des katas (FizzBuzz, Bowling, Gilded Rose) pour ancrer le réflexe

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Tests et Qualité]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/test-06-tdd]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi faut-il voir le test échouer avant d'écrire le code ?

---

## Tâches

- [ ] #task Faire le kata Gilded Rose en TypeScript en TDD
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
