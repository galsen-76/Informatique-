---
type: concept
domain: database
module: "[[Module 09 - Bases de données et SQL]]"
status: a-decouvrir
level: debutant
niveau: 5
schema: false
exercice_visuel: false
fil_rouge: false
prerequisites:
  - "[[Base de données relationnelle]]"
  - "[[JSON]]"
parents:
  - "[[Base de données relationnelle]]"
related:
  - "[[Docker]]"
next_review: 
tags:
  - concept
  - database
---
# Base NoSQL

> [!info] En une phrase
> NoSQL désigne les bases qui ne rangent pas les données en tables reliées : documents JSON (MongoDB), clé-valeur (Redis), colonnes ou graphes, chacune adaptée à un usage.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
| Famille | Exemple | Stocke | Bon pour |
| --- | --- | --- | --- |
| Document | MongoDB | des documents JSON | données de forme variable |
| Clé-valeur | **Redis** | `clé → valeur`, en mémoire | cache, sessions, files d'attente |
| Colonnes | Cassandra | énormes volumes distribués | journaux, capteurs |
| Graphe | Neo4j | nœuds et relations | réseaux, recommandations |
Elles sacrifient souvent les jointures et une partie des garanties [[Transaction|ACID]] pour la souplesse ou la vitesse.

### Pourquoi ça existe
Certains besoins (cache ultra-rapide, documents sans schéma fixe, volumes énormes) collent mal aux tables relationnelles.

### Le problème résolu
Choisir l'outil adapté au lieu de tout forcer dans une base SQL, ou l'inverse.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
Q{Données ?} -->|reliées, cohérentes| S[SQL]
  Q -->|cache, éphémère| R[Redis]
  Q -->|documents variables| M[MongoDB]
```

### Exemple concret
```bash
docker run -d --name redis -p 6379:6379 redis:7
docker exec -it redis redis-cli
> SET session:abc "oumar" EX 3600
> GET session:abc
"oumar"
> TTL session:abc
(integer) 3598
```
Beaucoup d'applications utilisent PostgreSQL pour leurs données **et** Redis pour leurs files de tâches et leur cache.

### Cas d'utilisation
- Cache devant une API lente
- Sessions d'utilisateurs
- File de tâches en arrière-plan

> [!warning] À ne pas confondre
> « NoSQL » ne veut pas dire « plus moderne » ni « sans structure » : pour des données reliées qui doivent rester cohérentes, une base relationnelle reste le choix par défaut.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] 🧠 Dessine de mémoire
> Dessine les mêmes dépenses rangées de deux façons : en tables reliées (SQL), puis en documents JSON (MongoDB).

> [!example] 🔄 Change de contexte
> Redessine-les en clé-valeur pour Redis. Quel usage de ton application irait bien dans chaque base ?

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Base NoSQL » et je l'intègre ici avec `![[Schéma - Base NoSQL.excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : elle sera pratiquée dans le fil rouge de son niveau (voir [[Niveaux]]).

## 4 · Relier
- **Prérequis** : [[Base de données relationnelle]] · [[JSON]]
- **Complémentaires** : [[Docker]]

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
