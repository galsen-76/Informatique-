---
type: concept
module: "[[Module 23 - Gestion de projet]]"
related:
  - "[[Refactorisation]]"
  - "[[MVP (produit minimum viable)]]"
  - "[[Principes DRY, KISS et YAGNI]]"
  - "[[Décision d'architecture (ADR)]]"
tags:
  - concept
  - projet
---
# Dette technique

> [!info] En une phrase
> La dette technique, ce sont les **raccourcis pris dans le code** (volontairement ou non) qui font gagner du temps maintenant mais **coûtent plus cher plus tard**, chaque fois qu'on doit modifier ce code. Comme une dette d'argent, elle a des intérêts.

## 1 · Comprendre
### Définition
**Volontaire** : dans un POC, on code vite exprès (pas de tests, valeurs en dur, erreurs ignorées). C'est normal, **si on le note** et qu'on ne garde pas ce code tel quel.

**Involontaire** : code copié-collé, noms flous, fonctions de 300 lignes, dépendances jamais mises à jour.

**Les intérêts** : chaque nouvelle fonctionnalité prend plus de temps, les bugs se multiplient, on a peur de toucher au code.

**Le remboursement** : [[Refactorisation]], ajout de tests, mise à jour des dépendances, réécriture du code de POC avant la production.

### Pourquoi ça existe
Il est parfois raisonnable de s'endetter pour aller vite (un POC, une démo urgente). Le problème, c'est la dette **cachée** et jamais remboursée.

### Le problème résolu
Rendre visible ce qui ralentira l'équipe, pour décider en connaissance de cause quand rembourser.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  R[Raccourci] --> G[Gain immédiat]
  G --> I[Intérêts]
  I --> RF[Remboursement]
```

### Exemple concret
```python
# Dans le POC : raccourcis assumés et notés
API_URL = "http://localhost:8080"   # DETTE : à passer en variable d'environnement
TOKEN = "abc123"                      # DETTE : secret en dur, interdit hors POC

def handler(context, event):
    # DETTE : aucune gestion d'erreur si la tâche n'existe pas
    xml = telecharger_annotations(API_URL, TOKEN, event.body["tache_id"])
    return dessiner_png(xml)
```

### Cas d'utilisation
- Lister les raccourcis d'un POC dans son compte rendu
- Garder une colonne « dette » dans le backlog

> [!warning] À ne pas confondre
> La dette technique n'est pas « du mauvais code » en général : c'est un **choix** (ou un oubli) qui a un coût futur. Du code simple et un peu répétitif peut être tout à fait sain.

## 3 · Relier
- **Prérequis** : [[Preuve de concept (POC)]]
- **Complémentaires** : [[Refactorisation]] · [[MVP (produit minimum viable)]] · [[Principes DRY, KISS et YAGNI]] · [[Décision d'architecture (ADR)]]
