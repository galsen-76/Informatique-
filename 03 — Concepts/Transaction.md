---
type: concept
domain: database
module: "[[Module 09 - Bases de données et SQL]]"
status: a-decouvrir
level: intermediaire
prerequisites:
  - "[[SQL]]"
parents:
  - "[[Base de données relationnelle]]"
related:
  - "[[Clé primaire et clé étrangère]]"
  - "[[Migration de base de données]]"
next_review: 
method: []
tags:
  - concept
  - database
---
# Transaction

> [!info] En une phrase
> Une transaction regroupe plusieurs opérations qui réussissent toutes ensemble ou sont toutes annulées : la base ne reste jamais à moitié modifiée.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
```sql
BEGIN;
UPDATE compte SET solde = solde - 100 WHERE id = 1;
UPDATE compte SET solde = solde + 100 WHERE id = 2;
COMMIT;      -- tout est enregistré
-- ou ROLLBACK;  -- tout est annulé
```
Propriétés **ACID** :
- **Atomicité** : tout ou rien.
- **Cohérence** : les contraintes (clés, `NOT NULL`, `CHECK`) restent vraies.
- **Isolation** : les autres connexions ne voient pas l'état intermédiaire.
- **Durabilité** : une fois validée, la modification survit à une panne.
Si une instruction échoue au milieu, PostgreSQL refuse la suite jusqu'au `ROLLBACK`.

### Pourquoi ça existe
Une opération métier touche souvent plusieurs lignes ou tables ; une panne au milieu laisserait des données incohérentes.

### Le problème résolu
Garantir qu'un transfert, une création « projet + tâches » ou un import se fait entièrement ou pas du tout.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
B[BEGIN] --> O1[Opération 1]
  O1 --> O2[Opération 2]
  O2 -->|ok| C[COMMIT]
  O2 -->|erreur| R[ROLLBACK]
```

### Exemple concret
```python
import psycopg
with psycopg.connect("postgresql://postgres:dev@localhost/notes") as conn:
    with conn.transaction():                 # BEGIN … COMMIT, ROLLBACK si exception
        cur = conn.execute("INSERT INTO projet (nom) VALUES (%s) RETURNING id", ("Chantier",))
        pid = cur.fetchone()[0]
        for i in range(3):
            conn.execute("INSERT INTO tache (projet_id, nom) VALUES (%s, %s)", (pid, f"Lot {i}"))
```
Les ORM et les outils de [[Migration de base de données|migration]] utilisent aussi des transactions.

### Cas d'utilisation
- Import de données en masse
- Opérations qui touchent plusieurs tables
- Migrations de schéma

> [!warning] À ne pas confondre
> Sans `BEGIN`, chaque instruction est sa propre transaction (*autocommit*) : une erreur à la 3ᵉ laisse les deux premières enregistrées.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin avec mes mots (section 4).

> [!example] 🛣️ Suis le trajet
> Dessine un virement entre deux comptes en deux opérations, et une panne entre les deux. Montre l'état de la base avec et sans transaction.

> [!example] 🔍 Trouve l'erreur
> Ce schéma est faux. Corrige-le en rouge et explique l'erreur.
>
> ```mermaid
> flowchart TD
>   B[Début] --> O1[Débit OK]
>   O1 --> P[Panne]
>   P --> F[Débit gardé]
> ```

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Transaction » et je l'intègre ici avec `![[Schéma - Transaction.excalidraw]]`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : je l'applique dans mon travail (CVAT, Nuclio) ou je demande une étape à Claude.

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _J'explique mon schéma avec mes mots, sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[SQL]]
- **Complémentaires** : [[Clé primaire et clé étrangère]] · [[Migration de base de données]]

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
