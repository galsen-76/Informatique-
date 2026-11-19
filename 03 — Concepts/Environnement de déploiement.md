---
type: concept
domain: devops
module: "[[Module 14 - DevOps et déploiement]]"
status: a-decouvrir
level: debutant
prerequisites:
  - "[[Image Docker]]"
  - "[[Variable d'environnement]]"
parents:
  - "[[Intégration et déploiement continus (CI-CD)]]"
related:
  - "[[Tag Git]]"
  - "[[Variables CI-CD GitLab]]"
next_review: 
method: []
tags:
  - concept
  - devops
---
# Environnement de déploiement

> [!info] En une phrase
> Un environnement est une copie de l'application qui tourne pour un usage précis : développement, test, préproduction (staging), production ; même image, configuration différente.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
| Environnement | Pour | Données |
| --- | --- | --- |
| **local** (dev) | développer | fausses |
| **test / CI** | tests automatiques | jetables |
| **préproduction** (*staging*) | valider avant la mise en ligne, démontrer | proches de la réalité |
| **production** | les vrais utilisateurs | réelles |
Principes :
- **La même image** passe d'un environnement à l'autre ; seule la **configuration** change ([[Variable d'environnement|variables d'environnement]], [[Secret et fichier .env|secrets]]).
- On garde les environnements aussi **semblables** que possible.
- On sait **revenir en arrière** (*rollback*) : redéployer l'image précédente (d'où des tags d'image par version ou par commit, jamais seulement `latest`).
Stratégies : redémarrage simple, **rolling** (instance par instance), **blue-green** (deux versions, on bascule), **canary** (un petit pourcentage d'abord).

### Pourquoi ça existe
Tester directement en production met les utilisateurs en danger ; une configuration différente partout crée des bugs « qui n'arrivent que chez eux ».

### Le problème résolu
Valider dans des conditions réalistes et pouvoir annuler une mauvaise version en minutes.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
I[Image v1.4.2] --> D[Dev]
  I --> S[Préprod]
  I --> P[Prod]
  C[Config par env] --> D
  C --> S
  C --> P
```

### Exemple concret
```bash
# même image, configuration différente
docker run -e DATABASE_URL=$URL_PREPROD -e LOG_LEVEL=debug registre/app:1.4.2
docker run -e DATABASE_URL=$URL_PROD    -e LOG_LEVEL=info  registre/app:1.4.2
# retour arrière
docker compose pull && TAG=1.4.1 docker compose up -d
```
Dans GitLab, le mot-clé `environment:` affiche les déploiements de chaque environnement et permet de redéployer une ancienne version.

### Cas d'utilisation
- Préproduction de CVAT avant une mise à jour
- Tester ta fonction Nuclio sans toucher aux vraies annotations
- Annuler un déploiement raté

> [!warning] À ne pas confondre
> Reconstruire l'image pour chaque environnement : ce qui part en production n'est alors plus ce qui a été testé. On construit **une fois**, on déploie partout.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin avec mes mots (section 4).

> [!example] 🧠 Dessine de mémoire
> Dessine trois copies de MesDépenses : dev (ton PC), recette, production. Pour chacune, sa base et sa configuration.

> [!example] 🛣️ Suis le trajet
> Suis une version de l'API depuis le merge jusqu'à la production, en passant par chaque environnement.

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Environnement de déploiement » et je l'intègre ici avec `![[Schéma - Environnement de déploiement.excalidraw]]`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : je l'applique dans mon travail (CVAT, Nuclio) ou je demande une étape à Claude.

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _J'explique mon schéma avec mes mots, sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Image Docker]] · [[Variable d'environnement]]
- **Complémentaires** : [[Tag Git]] · [[Variables CI-CD GitLab]]

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
