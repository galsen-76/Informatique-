---
type: concept
domain: backend
module: "[[Module 08 - Backend et API REST]]"
status: a-decouvrir
level: debutant
prerequisites:
  - "[[HTTP]]"
parents:
  - "[[HTTP]]"
related:
  - "[[Code de statut HTTP]]"
  - "[[Endpoint]]"
next_review: 
method: []
tags:
  - concept
  - backend
---
# Méthode HTTP

> [!info] En une phrase
> La méthode (GET, POST, PUT, PATCH, DELETE) dit ce qu'une requête veut faire de la ressource : lire, créer, remplacer, modifier ou supprimer.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
| Méthode | Sens | Corps | Sûre | Idempotente |
| --- | --- | --- | --- | --- |
| `GET` | lire | non | oui | oui |
| `POST` | créer, ou lancer une action | oui | non | non |
| `PUT` | remplacer entièrement | oui | non | oui |
| `PATCH` | modifier en partie | oui | non | non (en général) |
| `DELETE` | supprimer | rarement | non | oui |
| `HEAD` / `OPTIONS` | en-têtes seuls / capacités (CORS) | non | oui | oui |
- **Sûre** : ne modifie rien côté serveur.
- **Idempotente** : la faire 1 fois ou 10 fois donne le même état final (on peut la rejouer après une coupure).

### Pourquoi ça existe
Un même chemin (`/taches/12`) doit permettre plusieurs actions ; la méthode dit laquelle.

### Le problème résolu
Des API prévisibles : tout le monde sait qu'un GET ne casse rien et qu'un DELETE supprime.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
T["/taches/12"] --> G[GET lire]
  T --> P[PATCH modifier]
  T --> D[DELETE supprimer]
```

### Exemple concret
```bash
curl -i https://jsonplaceholder.typicode.com/todos/1                       # GET
curl -i -X PATCH https://jsonplaceholder.typicode.com/todos/1 \
     -H "Content-Type: application/json" -d '{"completed":true}'
curl -i -X DELETE https://jsonplaceholder.typicode.com/todos/1
```

### Cas d'utilisation
- Concevoir les routes d'une API
- Comprendre pourquoi un navigateur envoie un OPTIONS avant ta requête (CORS)
- Savoir quelles requêtes on peut rejouer

> [!warning] À ne pas confondre
> `PUT` (remplace tout : les champs absents disparaissent) et `PATCH` (seulement les champs envoyés). Et un `GET` qui modifie des données est une erreur de conception (les robots et les caches le rejouent).

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin avec mes mots (section 4).

> [!example] 🧠 Dessine de mémoire
> Dessine une dépense et cinq flèches GET, POST, PUT, PATCH, DELETE. Écris ce que chacune lui fait.

> [!example] ⚖️ Avant / après
> Avant / après : une dépense avant et après un PUT (l'API MesDépenses n'a que PUT), puis imagine un PATCH qui ne change que le montant. Dessine la différence.

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Méthode HTTP » et je l'intègre ici avec `![[Schéma - Méthode HTTP.excalidraw]]`._

### Appliquer dans le fil rouge
- [[MesDépenses 01 - Prendre l'API en main]]

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _J'explique mon schéma avec mes mots, sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[HTTP]]
- **Complémentaires** : [[Code de statut HTTP]] · [[Endpoint]]

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
