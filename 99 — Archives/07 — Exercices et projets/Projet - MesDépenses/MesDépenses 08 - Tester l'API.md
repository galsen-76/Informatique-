---
type: exercise
status: a-faire
niveau: 3
difficulty: moyen
concepts:
  - "[[Test automatisé]]"
  - "[[Test unitaire]]"
  - "[[Test d'intégration]]"
  - "[[Doublure de test (mock)]]"
  - "[[Couverture de code]]"
  - "[[Linter et formateur]]"
  - "[[Test de bout en bout]]"
tags:
  - exercice
  - mini-projet
---
# MesDépenses 08 - Tester l'API

> [!info] Où tu en es
> **Projet :** [[Projet - MesDépenses]] · **Niveau :** 3 · **Étape précédente :** [[MesDépenses 07 - Travailler en branche]]
> **Notions :** [[Test automatisé]] · [[Test unitaire]] · [[Test d'intégration]] · [[Doublure de test (mock)]] · [[Couverture de code]] · [[Linter et formateur]] · [[Test de bout en bout]]

## Le but
Lancer et écrire des tests pour être sûr qu'un changement ne casse rien, avant que la CI le fasse à ta place.

> [!tip] Au travail
> Au travail, les tests sont en `unittest` : ce que tu écris ici se recopie tel quel dans tes projets.

## Ce que tu fais
- [ ] Lance les tests fournis avec l'API et lis le résultat
- [ ] Ajoute un test pour un cas qui n'est pas couvert (par exemple une catégorie refusée, ou un total vide)
- [ ] Teste ton client Python **sans** lancer l'API : remplace les appels réseau par une doublure
- [ ] Mesure la couverture : trouve une partie du code qu'aucun test ne passe, et décide si elle mérite un test
- [ ] Ajoute un linter et un formateur, et corrige ce qu'ils signalent
- [ ] Casse exprès une règle de l'API et vérifie qu'un test échoue
- [ ] Écris un test de bout en bout : lance l'application avec compose, ajoute une dépense avec ton client, vérifie le total

> [!warning] Les pièges
> - Un test qui appelle la vraie API dépend du réseau : il échouera dans la CI sans raison.
> - 100 % de couverture ne veut pas dire zéro bug.

> [!success] Ça marche si…
> Tous les tests passent, ton nouveau test échoue quand tu casses la règle, ton client est testé sans réseau et le linter ne signale plus rien.

> [!quote] Mes notes
> _Ce que j'ai compris, ce qui a coincé._

> [!question]- Indice
> `python -m unittest`, `unittest.mock.patch`, `coverage run` puis `coverage report`. Linter et formateur : `ruff` fait les deux.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] Claude a relu mes tests
