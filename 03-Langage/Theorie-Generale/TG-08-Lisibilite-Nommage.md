---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - theorie/lisibilite
aliases:
  - "Lisibilité et Nommage du Code"
parent: "[[Théorie Générale]]"
children: []
related_theory:
  - "[[ARCH-10-Clean-Code|Clean Code]]"
  - "[[TEST-07-Code-Review|Code Review]]"
related_snippets:
  - "[[04_Snippets/tg-08-lisibilite-nommage]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://martinfowler.com/bliki/TwoHardThings.html"
---

# Lisibilité et Nommage du Code

> [!abstract] Introduction
> Le code est lu 10 fois plus qu'il n'est écrit : bien nommer, garder des fonctions courtes et éviter la complexité accidentelle est la première compétence d'un développeur professionnel.

---

## Théorie

> [!question]- C'est quoi ?
> Deux types de complexité :
> - **Essentielle** : celle du problème métier (inévitable)
> - **Accidentelle** : celle qu'on ajoute (mauvais noms, duplication, abstractions inutiles)

> [!example]- Analogie
> Un code bien nommé est une cuisine rangée avec des étiquettes sur chaque bocal ; un code mal nommé oblige à ouvrir chaque bocal pour savoir ce qu'il contient.

> [!question]- Pourquoi l'utiliser ?
> En entreprise, tu passeras plus de temps à LIRE et MODIFIER du code existant qu'à en écrire du nouveau.

> [!question]- Comment ça marche ?
> - Noms révélant l'intention : `filmsNonVus` plutôt que `data2`
> - Booléens en question : `estFavori`, `peutEditer`
> - Fonctions qui font UNE chose, verbes d'action : `chargerFilms()`
> - Retour anticipé (guard clauses) plutôt qu'imbrication
> - Pas de nombres magiques : `const DELAI_RECHERCHE_MS = 300`
> - Commenter le POURQUOI, pas le QUOI

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Complexité accidentelle | Difficulté ajoutée par la solution |
| Nombre magique | Valeur littérale inexpliquée |
| Guard clause | Retour anticipé qui évite l'imbrication |

---

## Points clés

- Lisible > astucieux
- Un nom juste vaut mieux qu'un commentaire
- Suivre les conventions de l'équipe et du framework

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Abréviations obscures (`flmSvc`)
> - Commentaires qui paraphrasent le code et deviennent faux

---

## Exemple minimal

```typescript
// ❌
function f(u) { if (u) { if (u.a) { return u.r === 'admin'; } } return false; }
// ✅
function estAdministrateurActif(utilisateur?: Utilisateur): boolean {
  if (!utilisateur?.actif) return false;
  return utilisateur.role === 'admin';
}
```

> [!note] Ce que j'en retiens
> Le nom de la fonction raconte l'intention ; le guard clause supprime l'imbrication.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Savoir justifier un refactoring par son coût/bénéfice

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Théorie Générale]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/tg-08-lisibilite-nommage]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Quelle est la différence entre complexité essentielle et accidentelle ?

---

## Tâches

- [ ] #task Renommer 10 variables/fonctions d'un ancien projet
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
