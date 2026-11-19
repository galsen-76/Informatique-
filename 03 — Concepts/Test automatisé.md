---
type: concept
domain: tests
module: "[[Module 12 - Tests]]"
status: a-decouvrir
level: debutant
niveau: 3
schema: false
exercice_visuel: false
fil_rouge: false
prerequisites:
  - "[[Fonction]]"
  - "[[Code de sortie]]"
parents: []
related:
  - "[[Test automatisé]]"
next_review: 
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
Outils : [[Test automatisé]] (Python), [[Test automatisé]] (JavaScript), Playwright (navigateur).

> [!abstract]- Comment ça s'écrit (référence à chercher, pas à apprendre par cœur)
> L'idée est la même partout ; seule l'écriture change.
>
> **Python (pytest ou unittest)**
> ```python
> def test_total():
>     assert total([{"montant": 2}, {"montant": 3}]) == 5
> # lancer : pytest   (il lance aussi les tests unittest)
> ```
>
> **JavaScript / TypeScript (Vitest ou Jest)**
> ```js
> import { test, expect } from "vitest";
> test("total", () => {
>   expect(total([{ montant: 2 }, { montant: 3 }])).toBe(5);
> });
> // lancer : npx vitest run
> ```
> Les deux outils trouvent les tests tout seuls (`test_*.py`, `*.test.js`) et rendent un code de sortie : 0 si tout passe, ce que lit la CI.

### Cas d'utilisation
- Le job `test` de la pipeline GitLab
- Avant un refactoring
- Reproduire un bug avant de le corriger

> [!warning] À ne pas confondre
> Un test qui passe ne prouve pas que le code est juste : il prouve seulement que **ce cas** marche. Et un test qui dépend de l'ordre, de l'heure ou du réseau échoue au hasard (*flaky*) : on finit par l'ignorer.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] 🧠 Dessine de mémoire
> Dessine un test comme une machine : entrée connue, ton code, résultat attendu, verdict.

> [!example] 🛣️ Suis le trajet
> Dessine où tournent les tests de ton API : sur ton PC, puis dans la CI à chaque push.

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Test automatisé » et je l'intègre ici avec `![[Schéma - Test automatisé.excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- [[MesDépenses 08 - Tester l'API]]

## 4 · Relier
- **Prérequis** : [[Fonction]] · [[Code de sortie]]
- **Complémentaires** : [[Test automatisé]] · [[Test automatisé]]
- **Utilisé par** : [[Pipeline GitLab CI]]

## 5 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation (compris, puis maîtrisé)
Trois cases à cocher dans les propriétés de la fiche :
- `schema` : mon dessin du concept est dans « Mon schéma » ;
- `exercice_visuel` : j'ai fait et corrigé les exercices visuels de la section 3 ;
- `fil_rouge` : je l'ai appliqué dans le fil rouge (coché tout seul quand une étape qui l'utilise est réussie).

Les trois cochées : la notion compte comme **comprise**. **Maîtrisé** : c'est moi qui le mets dans `status`, quand je le sens.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
