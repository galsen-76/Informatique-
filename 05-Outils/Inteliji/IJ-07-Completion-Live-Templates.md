---
created: 2026-09-16
modified: 2026-09-16
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
aliases:
  - "Complétion de Code & Live Templates IntelliJ"
tags:
  - outils/intellij/completion
parent: "[[IntelliJ IDEA]]"
children: []
related_theory: []
related_snippets: []
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://www.jetbrains.com/help/idea/auto-completing-code.html"
---

# Complétion de Code & Live Templates IntelliJ

> [!abstract] Introduction
> IntelliJ propose plusieurs niveaux d'autocomplétion, jusqu'à la génération automatique de blocs de code via des raccourcis ("live templates").

> [!warning]- Prérequis
> [[IJ-01-Interface-Fondamentaux|Interface et Fondamentaux IntelliJ]].

---

## Théorie

> [!question]- C'est quoi ?
> Complétion basique (tout ce qui commence par ces lettres), complétion intelligente (filtrée par contexte de type), live templates (raccourci + Tab = bloc généré).

> [!example]- Analogie
> La complétion basique est un dictionnaire qui propose tous les mots commençant par "ch". La complétion intelligente est un correcteur qui ne propose que les mots qui ont VRAIMENT du sens dans cette phrase précise.

> [!question]- Pourquoi l'utiliser ?
> Écrire du code répétitif à la main est lent et source d'erreurs — les live templates le génèrent instantanément.

> [!question]- Comment ça marche ?
> `Cmd/Ctrl+Shift+Espace` = complétion intelligente. `sout` + Tab (Java) génère `System.out.println()`. Postfix completion : `expression.if` génère la structure `if`.

> [!question]- Quand l'utiliser ?
> Complétion intelligente dès qu'on hésite entre plusieurs suggestions ; live templates pour toute structure répétée souvent.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Les live templates diffèrent selon le langage du fichier ouvert — un raccourci appris en Java ne fonctionnera pas forcément identique en TypeScript.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Live template | Raccourci générant un bloc de code entier après Tab |
| Postfix completion | Complétion inversée (`expr.if` génère la structure autour) |

---

## Points clés

- Complétion intelligente filtre selon le type attendu au contexte
- Live templates changent selon le langage du fichier
- Postfix completion inverse l'ordre d'écriture habituel
- Live templates personnalisables dans les préférences

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - S'attendre à un live template identique entre deux langages différents
> - Ignorer la complétion intelligente et se fier uniquement à la basique, plus bruyante

---

## Paramètres / Configuration

| Action | Raccourci (Mac) |
|-----------|-------------|
| Complétion intelligente | `Cmd+Shift+Espace` |
| Générer du code | `Cmd+N` |

---

## Exemple minimal

```typescript
function afficher(film: Film) { }
const monFilm: Film = { titre: "Inception", annee: 2010 };
afficher(m) // Cmd+Shift+Espace -> propose directement "monFilm"
```

> [!note] Ce que j'en retiens
> La complétion intelligente élimine les suggestions non pertinentes en filtrant par TYPE attendu.

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[IntelliJ IDEA]]
- Sous-sujets → (aucun)
- À comparer avec → [[OUT-04-VSCode-Productivite|VSCode - IntelliSense et Snippets]]

**Pratique :**
- Extrait de code → (aucun, sujet non-code)
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> Pourrais-je expliquer pourquoi la complétion intelligente donne moins de résultats que la basique ?

---

## Tâches

- [ ] #task Tester la complétion intelligente sur une fonction TypeScript
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Existe-t-il des live templates prêts à l'emploi spécifiques à Angular ?
