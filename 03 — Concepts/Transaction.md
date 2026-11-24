---
type: concept
module: "[[Module 09 - Bases de données et SQL]]"
related:
  - "[[Clé primaire et clé étrangère]]"
  - "[[Migration de base de données]]"
tags:
  - concept
  - database
---
# Transaction

> [!info] En une phrase
> Une transaction regroupe plusieurs opérations qui réussissent toutes ensemble ou sont toutes annulées : la base ne reste jamais à moitié modifiée.

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

## 3 · Relier
- **Prérequis** : [[SQL]]
- **Complémentaires** : [[Clé primaire et clé étrangère]] · [[Migration de base de données]]
