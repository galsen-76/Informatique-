---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M10
tags:
  - architecture/clean-code
aliases:
  - "Clean Code"
parent: "[[Architecture Logicielle]]"
children:
  - "[[ARCH-11-SOLID|SOLID]]"
related_theory:
  - "[[TG-08-Lisibilite-Nommage|Lisibilité et Nommage du Code]]"
  - "[[TEST-07-Code-Review|Code Review]]"
related_snippets:
  - "[[04_Snippets/arch-10-clean-code]]"
related_projects: []
source: "https://refactoring.guru/fr/refactoring/smells"
---

# Clean Code

> [!abstract] Introduction
> Le Clean Code regroupe des pratiques pour écrire un code facile à lire, à tester et à modifier : noms explicites, petites fonctions, pas de duplication, gestion d'erreurs claire, et refactoring continu guidé par les « code smells ».

> [!warning]- Prérequis
> [[TG-08-Lisibilite-Nommage|Lisibilité et Nommage du Code]]

---

## Théorie

> [!question]- C'est quoi ?
> Principes :
> - **KISS** (Keep It Simple) — la solution la plus simple qui marche
> - **DRY** (Don't Repeat Yourself) — une connaissance = un endroit
> - **YAGNI** (You Aren't Gonna Need It) — ne pas coder pour un futur hypothétique
> - **Règle du boy-scout** — laisser le code un peu plus propre qu'on ne l'a trouvé
> - Fonctions courtes, un niveau d'abstraction, peu de paramètres
> Code smells courants : fonction trop longue, classe « Dieu », duplication, longue liste de paramètres, `if/else` en cascade sur un type, nombres magiques, commentaires qui expliquent un code obscur.

> [!example]- Analogie
> Un atelier rangé : chaque outil à sa place, étiqueté, on retrouve tout sans chercher ; le refactoring, c'est le rangement quotidien plutôt que le grand ménage annuel.

> [!question]- Pourquoi l'utiliser ?
> Le coût d'un logiciel est surtout dans sa maintenance ; un code propre réduit bugs, temps d'onboarding et peur de modifier.

> [!question]- Comment ça marche ?
> Refactorings de base (toujours sous tests) : extraire une fonction, renommer, remplacer un nombre magique par une constante, remplacer des conditions par du polymorphisme ou une table de correspondance, introduire un objet paramètre.
> ```typescript
> // Avant
> function prix(t: string, p: number) { if (t === 'e') return p * 0.5; else if (t === 's') return p * 0.8; else return p; }
> // Après
> const REDUCTIONS: Record<TypeClient, number> = { etudiant: 0.5, senior: 0.8, standard: 1 };
> const prixApresReduction = (type: TypeClient, prix: number) => prix * REDUCTIONS[type];
> ```

> [!question]- Quand l'utiliser ?
> En continu, surtout quand on touche un code (règle du boy-scout) et avant d'ajouter une fonctionnalité dans une zone confuse.

> [!danger]- Quand NE PAS l'utiliser / Limites
> DRY poussé à l'extrême crée des abstractions couplées : deux codes qui se ressemblent par hasard ne doivent pas forcément être fusionnés (« la duplication vaut mieux que la mauvaise abstraction »).

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Code smell | Symptôme d'un problème de conception |
| Refactoring | Améliorer la structure sans changer le comportement |
| KISS / DRY / YAGNI | Simplicité / pas de duplication / pas de sur-ingénierie |
| Dette technique | Coût futur des raccourcis pris aujourd'hui |

---

## Points clés

- Refactorer sous couverture de tests
- Petites étapes, commits séparés du changement fonctionnel
- Simplicité avant généricité

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Refactoring géant mélangé à une nouvelle fonctionnalité dans la même MR
> - Sur-abstraction « au cas où »

---

## Exemple minimal

```typescript
// Guard clauses au lieu d'imbrication
function peutNoter(user?: Utilisateur, film?: Film): boolean {
  if (!user || !film) return false;
  if (user.estBanni) return false;
  return film.dateSortie <= new Date();
}
```

> [!note] Ce que j'en retiens
> Chaque condition éliminatoire sort tôt ; le cas nominal se lit à la fin.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Piloter la dette technique : la rendre visible (tickets), la prioriser, la rembourser par petits lots

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Architecture Logicielle]]
- Sous-sujets → [[ARCH-11-SOLID|SOLID]]
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/arch-10-clean-code]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi la duplication est-elle parfois préférable à une abstraction ?

> [!faq]- Questions d'entretien
> - Qu'est-ce qu'un code propre pour vous ?

---

## Tâches

- [ ] #task Lire le catalogue des code smells de refactoring.guru et en identifier 3 dans un vieux projet
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
