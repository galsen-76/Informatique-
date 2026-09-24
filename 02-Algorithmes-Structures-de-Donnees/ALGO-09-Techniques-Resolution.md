---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Avancé
month: M12
tags:
  - algo/techniques
aliases:
  - "Techniques de Résolution d'Algorithmes"
parent: "[[Algorithmes]]"
children: []
related_theory:
  - "[[ALGO-01-Complexite-Big-O|Complexité Big O]]"
  - "[[ALGO-04-Tables-de-Hachage-Map-Set|Tables de Hachage Map et Set]]"
related_snippets:
  - "[[04_Snippets/algo-09-techniques-resolution]]"
related_projects: []
source: "https://neetcode.io/roadmap"
---

# Techniques de Résolution d'Algorithmes

> [!abstract] Introduction
> Méthode et patterns récurrents pour résoudre des problèmes algorithmiques (entretiens techniques et vrais bugs de performance) : deux pointeurs, fenêtre glissante, hachage, programmation dynamique, glouton, backtracking.

> [!warning]- Prérequis
> [[ALGO-01-Complexite-Big-O|Complexité Big O]], [[ALGO-04-Tables-de-Hachage-Map-Set|Tables de Hachage Map et Set]], [[ALGO-05-Recursivite|Récursivité]]

---

## Théorie

> [!question]- C'est quoi ?
> | Pattern | Signal dans l'énoncé | Exemple |
> |---|---|---|
> | Hachage | « trouver si existe », « compter » | Two Sum |
> | Deux pointeurs | tableau trié, paires | 3Sum |
> | Fenêtre glissante | sous-tableau/sous-chaîne contigu | plus longue sous-chaîne sans doublon |
> | Pile | parenthèses, « prochain plus grand » | Daily Temperatures |
> | BFS/DFS | grille, arbre, graphe | Number of Islands |
> | Programmation dynamique | nombre de façons, optimum, sous-problèmes répétés | Climbing Stairs |
> | Glouton | choix local optimal | intervalles |
> | Backtracking | toutes les combinaisons | permutations |

> [!example]- Analogie
> Comme en échecs : on ne calcule pas tout de zéro, on reconnaît des ouvertures connues.

> [!question]- Pourquoi l'utiliser ?
> Les entretiens techniques (surtout en grandes entreprises) en contiennent ; et ces réflexes aident à écrire du code efficace au quotidien.

> [!question]- Comment ça marche ?
> Méthode en entretien (UMPIRE) :
> 1. **Comprendre** : reformuler, exemples, cas limites (vide, doublons, négatifs)
> 2. **Associer** à un pattern connu
> 3. **Planifier** : solution naïve + sa complexité, puis optimisation
> 4. **Implémenter** proprement en parlant à voix haute
> 5. **Relire/tester** avec les exemples et cas limites
> 6. **Évaluer** complexité temps/espace

> [!question]- Quand l'utiliser ?
> Préparation aux entretiens (mois 12) et en continu : 2-3 problèmes par semaine.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Le « LeetCode grinding » ne remplace pas les compétences de conception, d'architecture et de collaboration, plus importantes au quotidien.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Programmation dynamique | Résoudre en combinant des sous-problèmes mémoïsés |
| Glouton | Choix optimal local à chaque étape |
| Backtracking | Exploration avec retour arrière |
| Cas limite | Entrée inhabituelle (vide, énorme, négative) |

---

## Points clés

- Toujours commencer par une solution naïve correcte
- Annoncer la complexité
- Tester les cas limites
- Reconnaître les patterns

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Coder immédiatement sans clarifier l'énoncé
> - Rester silencieux pendant l'entretien

---

## Exemple minimal

```typescript
// Programmation dynamique : nombre de façons de monter n marches (1 ou 2 à la fois)
function escalier(n: number): number {
  let [a, b] = [1, 1];
  for (let i = 2; i <= n; i++) [a, b] = [b, a + b];
  return b;
}
```

> [!note] Ce que j'en retiens
> Sous-problèmes répétés + mémoire de la valeur précédente = O(n) au lieu de O(2ⁿ).

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Savoir expliquer ses compromis et proposer des alternatives

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Algorithmes]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/algo-09-techniques-resolution]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Quel pattern pour « la plus longue sous-chaîne sans caractère répété » ?

---

## Tâches

- [ ] #task Suivre la roadmap NeetCode 150 à raison de 3 problèmes par semaine (mois 10-12)
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
