---
type: concept
domain: tests
module: "[[Module 12 - Tests]]"
status: a-decouvrir
level: debutant
prerequisites:
  - "[[Fonction]]"
  - "[[Code de sortie]]"
parents: []
related:
  - "[[pytest]]"
  - "[[Vitest et Jest]]"
next_review: 
method: []
tags:
  - concept
  - tests
---
# Test automatisé

> [!info] En une phrase
> Un test automatisé est du code qui exécute ton code avec des entrées connues et vérifie le résultat ; on les lance tous en une commande, à chaque modification et dans la CI.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
Un test suit presque toujours trois temps (**AAA**) :
1. **Préparer** (*Arrange*) : les données, l'état de départ.
2. **Agir** (*Act*) : appeler ce qu'on teste.
3. **Vérifier** (*Assert*) : comparer au résultat attendu.
La **pyramide des tests** :
| Niveau | Teste | Nombre | Vitesse |
| --- | --- | --- | --- |
| [[Test unitaire]] | une fonction isolée | beaucoup | millisecondes |
| [[Test d'intégration]] | plusieurs morceaux ensemble (API + base) | moins | secondes |
| [[Test de bout en bout]] | l'application entière dans un navigateur | peu | lent |
Un test qui échoue fait sortir la commande avec un [[Code de sortie|code non nul]], ce qui arrête la pipeline.

### Pourquoi ça existe
Vérifier à la main après chaque changement est lent, et on oublie toujours un cas ; une modification casse souvent quelque chose ailleurs.

### Le problème résolu
Pouvoir modifier le code sans peur : si quelque chose casse, on le sait en quelques secondes, avant la production.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
U[Unitaires nombreux] --> I[Intégration]
  I --> E[Bout en bout rares]
```

### Exemple concret
```python
def test_nom_archive():
    # Préparer
    dossier = "export"
    # Agir
    nom = nom_archive(dossier, date(2026, 11, 6))
    # Vérifier
    assert nom == "export-2026-11-06.zip"
```
Outils : [[pytest]] (Python), [[Vitest et Jest]] (JavaScript), Playwright (navigateur).

### Cas d'utilisation
- Le job `test` de la pipeline GitLab
- Avant un refactoring
- Reproduire un bug avant de le corriger

> [!warning] À ne pas confondre
> Un test qui passe ne prouve pas que le code est juste : il prouve seulement que **ce cas** marche. Et un test qui dépend de l'ordre, de l'heure ou du réseau échoue au hasard (*flaky*) : on finit par l'ignorer.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin avec mes mots (section 4).

> [!example] 🧠 Dessine de mémoire
> Dessine un test comme une machine : entrée connue, ton code, résultat attendu, verdict.

> [!example] 🛣️ Suis le trajet
> Dessine où tournent les tests de l'API MesDépenses : sur ton PC, puis dans la CI à chaque push.

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Test automatisé » et je l'intègre ici avec `![[Schéma - Test automatisé.excalidraw]]`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : je l'applique dans mon travail (CVAT, Nuclio) ou je demande une étape à Claude.

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _J'explique mon schéma avec mes mots, sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Fonction]] · [[Code de sortie]]
- **Complémentaires** : [[pytest]] · [[Vitest et Jest]]
- **Utilisé par** : [[Pipeline GitLab CI]]

## 6 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
La notion est maîtrisée quand je sais :
1. **l'expliquer** de façon fluide, à partir de mon schéma (section 4) ;
2. **l'adapter** à un autre contexte (consigne « Change de contexte », ou Claude m'interroge sur un autre cas) ;
3. **l'appliquer** pour de vrai dans le fil rouge (section 3).

Réussir un exercice ne suffit pas. C'est moi qui passe le statut en `maitrise`.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
