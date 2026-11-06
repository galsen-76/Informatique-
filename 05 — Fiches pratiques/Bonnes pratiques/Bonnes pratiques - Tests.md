---
type: bonnes-pratiques
sujet: "Tests"
concepts:
  - "[[Test automatisé]]"
  - "[[Test unitaire]]"
  - "[[Test d'intégration]]"
  - "[[Test de bout en bout]]"
  - "[[Doublure de test (mock)]]"
  - "[[Couverture de code]]"
  - "[[pytest]]"
  - "[[Vitest et Jest]]"
tags:
  - bonnes-pratiques
---
# Bonnes pratiques - Tests

> [!info] À quoi sert cette fiche
> Des tests qui donnent vraiment confiance, sans devenir un fardeau.
> Chaque règle dit **pourquoi** : c'est la raison qui compte, pour savoir l'adapter quand la situation change.

## À faire

### 1. Tester le comportement, pas l'implémentation
« Pour cette entrée, ce résultat » : le test survit aux refactorisations. Voir [[Test unitaire]].

### 2. Un test, une idée, un nom qui la dit
`test_nom_archive_remplace_les_espaces` : quand il échoue, on sait quoi.

### 3. Préparer, agir, vérifier
Trois blocs visibles dans chaque test. Voir [[Test automatisé]].

### 4. Couvrir les cas limites et les erreurs
Liste vide, valeur absente, fichier inexistant, réponse 500.

### 5. Des tests indépendants et reproductibles
Chacun prépare ses données ; pas de dépendance à l'ordre, à l'heure ou au réseau.

### 6. Simuler seulement les frontières
Réseau, horloge, hasard ; garder la vraie logique. Voir [[Doublure de test (mock)]].

### 7. Lancer les tests dans la CI à chaque push
Un test qui ne tourne pas automatiquement est vite oublié.

### 8. Écrire le test du bug avant la correction
Le bug ne revient pas sans prévenir.

## À éviter

### 1. Des tests qui dépendent les uns des autres
**Pourquoi c'est un problème :** l'ordre compte, échecs au hasard.
**À la place :** chaque test prépare et nettoie ses données.

### 2. Désactiver un test qui échoue pour avoir une pipeline verte
**Pourquoi c'est un problème :** le problème est caché, pas réglé.
**À la place :** corriger le code ou le test, ou documenter et créer une tâche.

### 3. Tout simuler
**Pourquoi c'est un problème :** le test vérifie tes doublures, pas ton code.
**À la place :** des tests d'intégration avec de vraies dépendances jetables.

### 4. Des `sleep` pour attendre
**Pourquoi c'est un problème :** tests lents et fragiles.
**À la place :** attendre une condition (assertions de Playwright, `await`).

### 5. Viser 100 % de couverture
**Pourquoi c'est un problème :** on écrit des tests sans valeur pour le chiffre.
**À la place :** couvrir ce qui compte ; la couverture sert à trouver les trous.

### 6. Des tests sans assertion
**Pourquoi c'est un problème :** ils passent toujours.
**À la place :** au moins un `assert` ou `expect` significatif.

## Avant de valider mon travail
- [ ] Chaque nouvelle fonction a ses tests, cas limites compris
- [ ] Les tests passent en local et dans la CI
- [ ] Aucun test désactivé sans explication
- [ ] Les tests ne dépendent ni du réseau ni de l'heure

## Notions liées
[[Test automatisé]] · [[Test unitaire]] · [[Test d'intégration]] · [[Test de bout en bout]] · [[Doublure de test (mock)]] · [[Couverture de code]] · [[pytest]] · [[Vitest et Jest]]
