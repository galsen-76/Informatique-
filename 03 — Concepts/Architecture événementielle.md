---
type: concept
domain: architecture
module: "[[Module 15 - Architecture logicielle]]"
status: a-decouvrir
level: avance
prerequisites:
  - "[[Monolithe et microservices]]"
parents: []
related:
  - "[[Patron Observateur (Observer)]]"
  - "[[Patron Commande (Command)]]"
  - "[[Boucle d'événements]]"
next_review: 
method: []
tags:
  - concept
  - architecture
---
# Architecture événementielle

> [!info] En une phrase
> Dans une architecture événementielle, les services ne s'appellent pas directement : l'un publie un événement (« image exportée ») dans une file ou un bus de messages, et ceux que ça intéresse le traitent quand ils peuvent.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
**Événement** : un fait passé, au nom au passé (`annotation.creee`, `export.termine`), avec ses données.

**Producteur** : publie l'événement, sans savoir qui l'écoute.

**Consommateur** : s'abonne et réagit, à son rythme.

**Courtier (broker)** : stocke et distribue les messages : RabbitMQ, Kafka, Redis Streams, ou les files intégrées des clouds. Le message attend dans une **file** (queue) si le consommateur est occupé ou en panne.

C'est le patron Observateur à l'échelle de plusieurs programmes.

### Pourquoi ça existe
Quand un service en appelle cinq autres en direct (HTTP), il attend chacun, échoue si l'un tombe, et doit être modifié à chaque nouveau besoin.

### Le problème résolu
Découpler les services, absorber les pics (les messages patientent dans la file), réessayer sans perdre de travail, ajouter un consommateur sans toucher au producteur.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
PR[Producteur] --> BR[Courtier]
  BR --> Q1[File export]
  BR --> Q2[File notif]
  Q1 --> C1[Consommateur]
  Q2 --> C2[Consommateur]
```

### Exemple concret
CVAT fonctionne déjà ainsi : quand tu lances une tâche lourde, la requête HTTP crée un **job** dans une file (Redis + RQ), et un *worker* le traite en arrière-plan. Les webhooks de CVAT publient aussi des événements (`create:job`, `update:task`).

```python
# producteur : répond tout de suite
file.publier("export.demande", {"tache_id": 42})
return 202   # Accepted : « c'est noté, ce sera fait »

# consommateur (autre processus)
for message in file.ecouter("export.demande"):
    png = exporter_png(source, message["tache_id"])
    file.publier("export.termine", {"tache_id": 42, "chemin": chemin})
    message.acquitter()    # sinon il sera redistribué
```

### Cas d'utilisation
- Traitements longs (export, entraînement, envoi de mails)
- Webhooks et notifications
- Microservices qui doivent rester indépendants

> [!warning] À ne pas confondre
> Plus de souplesse, mais moins de visibilité : un flux réparti est plus dur à suivre et à déboguer, l'ordre des messages et les doublons sont à gérer (un consommateur doit supporter de recevoir deux fois le même message). Ne pas confondre avec la boucle d'événements de JavaScript, qui est interne à un seul programme.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin avec mes mots (section 4).

> [!example] ⚖️ Avant / après
> Avant / après : un service qui appelle directement trois autres services, puis un service qui publie un événement « dépense ajoutée ». Dessine qui connaît qui.

> [!example] 🛣️ Suis le trajet
> Suis l'événement « dépense ajoutée » : qui le publie, où il passe, qui le reçoit et ce que chacun en fait.

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Architecture événementielle » et je l'intègre ici avec `![[Schéma - Architecture événementielle.excalidraw]]`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : je l'applique dans mon travail (CVAT, Nuclio) ou je demande une étape à Claude.

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _J'explique mon schéma avec mes mots, sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Monolithe et microservices]]
- **Complémentaires** : [[Patron Observateur (Observer)]] · [[Patron Commande (Command)]] · [[Boucle d'événements]]

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
