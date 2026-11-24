---
type: concept
domain: database
module: "[[Module 09 - Bases de données et SQL]]"
status: a-decouvrir
level: intermediaire
niveau: 5
schema: false
exercice_visuel: false
fil_rouge: false
prerequisites:
  - "[[SQL]]"
  - "[[Commit]]"
parents:
  - "[[Base de données relationnelle]]"
related:
  - "[[ORM]]"
  - "[[Transaction]]"
next_review: 
tags:
  - concept
  - database
---
# Migration de base de données

> [!info] En une phrase
> Une migration est un fichier versionné qui décrit un changement du schéma de la base (ajouter une table, une colonne, un index), appliqué dans l'ordre sur chaque environnement.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
Le schéma évolue avec le code. Plutôt que de modifier la base à la main, on écrit des **migrations numérotées**, commitées avec le code :
```
migrations/
  001_creer_projet.sql
  002_creer_tache.sql
  003_ajouter_echeance_tache.sql
```
```sql
-- 003_ajouter_echeance_tache.sql
ALTER TABLE tache ADD COLUMN echeance DATE;
```
L'outil (Prisma Migrate, Alembic, `manage.py migrate` de Django, Flyway…) enregistre dans une table quelles migrations ont déjà été appliquées et n'exécute que les nouvelles.

### Pourquoi ça existe
Chaque développeur, la CI, la préproduction et la production doivent avoir **exactement** le même schéma, sans oubli.

### Le problème résolu
Faire évoluer la base de façon reproductible, relue en merge request, et rejouable.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
C[Code v2] --> M[003_echeance]
  M --> L[Local]
  M --> CI[CI]
  M --> P[Production]
```

### Exemple concret
```bash
npx prisma migrate dev --name ajouter_echeance   # crée et applique en local
npx prisma migrate deploy                         # applique en production
# Django
python manage.py makemigrations
python manage.py migrate
```
En CI ou au démarrage d'un conteneur, l'étape `migrate` passe avant le lancement de l'application.

### Cas d'utilisation
- Ajouter un champ à une application
- Recréer une base de test identique

> [!warning] À ne pas confondre
> Modifier une migration **déjà appliquée** ailleurs : les autres bases ne la rejoueront pas. On écrit une **nouvelle** migration. Et supprimer une colonne est irréversible pour les données : sauvegarde avant.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] ⚖️ Avant / après
> Avant / après : la table `depenses` sans colonne `date`, puis avec. Dessine le fichier de migration et ce qu'il fait sur une base qui contient déjà des données.

> [!example] 🛣️ Suis le trajet
> Dessine la suite des migrations 001, 002, 003 et la table qui retient laquelle a déjà été appliquée.

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Migration de base de données » et je l'intègre ici avec `![[Schéma - Migration de base de données.excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : elle sera pratiquée dans le fil rouge de son niveau (voir [[Niveaux]]).

## 4 · Relier
- **Au travail** : [Migration de base de données au travail](obsidian://open?vault=Travail&file=Migration%20de%20base%20de%20donn%C3%A9es%20au%20travail)
- **Prérequis** : [[SQL]] · [[Commit]]
- **Complémentaires** : [[ORM]] · [[Transaction]]

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
