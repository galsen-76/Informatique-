---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - methodologie/debug
aliases:
  - "Résolution de Problèmes et Débogage"
parent: "[[Méthodologie]]"
children: []
related_theory:
  - "[[JS-12-Erreurs-Debug-DevTools|Gestion des Erreurs et DevTools]]"
  - "[[OUT-06-Recherche-Documentation|Chercher et Lire la Documentation]]"
related_snippets:
  - "[[04_Snippets/meth-05-resolution-problemes-debug]]"
related_projects: []
source: "https://jvns.ca/blog/2022/12/08/a-debugging-manifesto/"
---

# Résolution de Problèmes et Débogage

> [!abstract] Introduction
> Déboguer est une démarche scientifique : observer, formuler une hypothèse, tester, conclure — plutôt que modifier du code au hasard jusqu'à ce que « ça marche ».

---

## Théorie

> [!question]- C'est quoi ?
> Méthode :
> 1. **Reproduire** le bug de façon fiable (étapes, données, environnement)
> 2. **Lire** le message d'erreur et la stack trace en entier
> 3. **Réduire** : isoler la plus petite zone en cause (front ou back ? quel composant ? quelle donnée ?)
> 4. **Hypothèse** puis **expérience** (log, breakpoint, test)
> 5. **Corriger** la cause racine, pas le symptôme
> 6. **Protéger** : écrire un test qui reproduit le bug

> [!example]- Analogie
> Un médecin ne prescrit pas au hasard : il interroge, examine, fait des analyses, puis traite la cause.

> [!question]- Pourquoi l'utiliser ?
> Un développeur passe une grande partie de son temps à comprendre des problèmes ; une méthode rigoureuse divise ce temps.

> [!question]- Comment ça marche ?
> Outils : DevTools (Network, Console, Sources), débogueur IDE, logs, `git bisect`, reproduction minimale, « rubber duck debugging » (expliquer le problème à voix haute).
> Questions clés : Qu'est-ce qui a changé récemment ? Ça marche où / pour qui ? Quelle est la plus petite entrée qui casse ?
> Règle du timebox : bloqué plus de 30-60 min → demander de l'aide avec un résumé clair de ce qui a été essayé.

> [!question]- Quand l'utiliser ?
> À chaque bug, et pour comprendre du code inconnu.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Les bugs non reproductibles (concurrence, environnement) demandent des logs et de l'observabilité en amont.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Cause racine | Origine réelle du problème |
| Reproduction minimale | Plus petit cas qui montre le bug |
| Rubber duck | Expliquer le problème pour le comprendre |
| Régression | Fonctionnalité qui marchait et ne marche plus |

---

## Points clés

- Reproduire → isoler → hypothèse → vérifier
- Lire l'erreur complète
- Test de non-régression après correction
- Savoir demander de l'aide au bon moment

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Changer plusieurs choses à la fois
> - « Corriger » en ajoutant un `try/catch` qui masque l'erreur

---

## Exemple minimal

```text
Bug : la liste des favoris est vide en recette mais pas en local
1. Network : GET /api/favoris → 200 mais []   → le front n'est pas en cause
2. Hypothèse : l'utilisateur de recette n'a pas de favoris ? → vérifié en BDD : il en a
3. Hypothèse : le filtre userId est faux → log côté API : userId = undefined
4. Cause : le JWT de recette utilise « id » au lieu de « sub »
5. Correction + test e2e qui vérifie le claim sub
```

> [!note] Ce que j'en retiens
> Chaque étape élimine une moitié du problème.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Rédiger un post-mortem sans blâme après un incident

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Méthodologie]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/meth-05-resolution-problemes-debug]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi écrire un test après avoir corrigé un bug ?

> [!faq]- Questions d'entretien
> - Racontez un bug difficile que vous avez résolu et votre démarche.

---

## Tâches

- [ ] #task Tenir un journal de bugs (cause, symptôme, résolution) dans le daily note
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
