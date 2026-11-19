---
type: concept
domain: architecture
module: "[[Module 22 - Design patterns]]"
status: a-decouvrir
level: intermediaire
niveau: 5
schema: false
exercice_visuel: false
fil_rouge: false
prerequisites:
  - "[[Classe et objet]]"
parents:
  - "[[Design pattern]]"
related:
  - "[[Patron Stratégie (Strategy)]]"
  - "[[Union et type littéral]]"
next_review: 
method: []
tags:
  - concept
  - architecture
---
# Patron État (State)

> [!info] En une phrase
> Le patron État donne à un objet un comportement différent selon l'état où il se trouve, en représentant chaque état et ses transitions autorisées explicitement.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
**Famille :** comportemental

**Le problème typique :** un objet passe par des étapes (brouillon, en revue, publié ; à faire, en cours, fini) et ce qu'il peut faire dépend de l'étape.

**L'idée :** décrire les états et les transitions permises au même endroit (une **machine à états**), et refuser toute transition non prévue.

### Pourquoi ça existe
Sans ce patron : des `if statut == …` partout, et des transitions interdites qui passent quand même (une tâche « finie » repasse « à faire » sans raison).

### Quand l'utiliser
**Quand l'utiliser :** un objet a des étapes avec des règles de passage.

**Quand ne pas l'utiliser :** deux états simples (actif / inactif) : un booléen suffit.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
A[à faire] -->|commencer| E[en cours]
  E -->|valider| R[en revue]
  R -->|accepter| F[fini]
  R -->|refuser| E
```

### Exemple concret
Version simple et suffisante dans la plupart des cas : une table des transitions.
```python
TRANSITIONS = {
    ("a-faire", "commencer"): "en-cours",
    ("en-cours", "valider"):  "en-revue",
    ("en-revue", "accepter"): "fini",
    ("en-revue", "refuser"):  "en-cours",
}
class Job:
    def __init__(self): self.etat = "a-faire"
    def faire(self, action: str):
        try:
            self.etat = TRANSITIONS[(self.etat, action)]
        except KeyError:
            raise ValueError(f"« {action} » impossible depuis l'état « {self.etat} »")
```
Les jobs de CVAT ont exactement ce genre d'états (*annotation*, *validation*, *acceptance*) ; les jobs de pipeline aussi (*created*, *pending*, *running*, *success*, *failed*).

### Cas d'utilisation
- Statuts de tâches, de commandes, de jobs
- Formulaires en plusieurs étapes
- États d'un chargement (chargement, ok, erreur)

> [!warning] À ne pas confondre
> La **stratégie** est choisie de l'extérieur ; l'**état** change de l'intérieur, au fil des actions. Les [[Union et type littéral|unions discriminées]] de TypeScript sont un très bon moyen de modéliser des états.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] 🧠 Dessine de mémoire
> Dessine les états d'une tâche d'export (en attente, en cours, terminée, échouée) et les flèches entre eux.

> [!example] 🔄 Change de contexte
> Redessine-les pour une notification qui passe de « en cours » à « terminé ». Quels états, quelles transitions ?

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Patron État (State) » et je l'intègre ici avec `![[Schéma - Patron État (State).excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : elle sera pratiquée dans le fil rouge de son niveau (voir [[Niveaux]]).

## 4 · Relier
- **Prérequis** : [[Classe et objet]]
- **Complémentaires** : [[Patron Stratégie (Strategy)]] · [[Union et type littéral]]

## 5 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
Trois cases à cocher dans les propriétés de la fiche :
- `schema` : mon dessin du concept est dans « Mon schéma » ;
- `exercice_visuel` : j'ai fait et corrigé les exercices visuels de la section 3 ;
- `fil_rouge` : je l'ai appliqué dans le fil rouge (coché tout seul quand une étape qui l'utilise est réussie).

Les trois cochées : la notion compte comme **comprise**. **Maîtrisé** : c'est moi qui le mets dans `status`, quand je le sens.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
