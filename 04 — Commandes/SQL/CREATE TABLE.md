---
type: command
tool: SQL
level: debutant
concepts:
  - "[[SQL]]"
  - "[[Clé primaire et clé étrangère]]"
  - "[[Migration de base de données]]"
tags:
  - commande
  - sql
---
# CREATE TABLE

> [!info] SQL
> Crée une table avec ses colonnes, types et contraintes.

## Pourquoi l'utiliser
Définir le schéma de la base.

## Dans quel contexte
Début de projet, migration.

## Syntaxe
```bash
CREATE TABLE nom (colonne TYPE contraintes, …);
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `SERIAL PRIMARY KEY` | identifiant auto-incrémenté |
| `TEXT`, `INT`, `NUMERIC`, `BOOLEAN`, `DATE`, `TIMESTAMPTZ`, `JSONB` | types courants |
| `NOT NULL`, `UNIQUE`, `DEFAULT`, `CHECK (…)` | contraintes |
| `REFERENCES t(id)` | clé étrangère |
| `IF NOT EXISTS` | ne plante pas si elle existe |

## Exemple concret
```bash
CREATE TABLE tache (
  id SERIAL PRIMARY KEY,
  projet_id INT NOT NULL REFERENCES projet(id),
  nom TEXT NOT NULL,
  fini BOOLEAN NOT NULL DEFAULT false,
  cree_le TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

## Résultat attendu
`CREATE TABLE`.

## Variantes utiles
- `ALTER TABLE t ADD COLUMN …` : modifier
- `DROP TABLE t` : supprimer (définitif)

> [!warning] Erreurs fréquentes
> - `TIMESTAMP` sans fuseau : préfère `TIMESTAMPTZ`
> - Oublier `NOT NULL` partout

## Relier
- **Commandes complémentaires** : [[INSERT]] · [[psql]]
- **Concepts associés** : [[SQL]] · [[Clé primaire et clé étrangère]] · [[Migration de base de données]]
