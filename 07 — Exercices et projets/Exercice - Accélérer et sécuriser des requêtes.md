---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Index de base de données]]"
  - "[[Transaction]]"
tags:
  - exercice
---
# Exercice — Accélérer et sécuriser des requêtes

> [!info] Objectif
> Mesurer l'effet d'un index et vivre une transaction annulée.
> Notions : [[Index de base de données]] · [[Transaction]]

## Consignes
- [ ] Crée une table `mesure(id SERIAL PRIMARY KEY, capteur INT, valeur NUMERIC, prise_le TIMESTAMPTZ)`
- [ ] Insère un million de lignes avec `generate_series` et `random()`
- [ ] Lance `EXPLAIN ANALYZE SELECT avg(valeur) FROM mesure WHERE capteur = 42;` et note le temps et le type de parcours
- [ ] Crée un index sur `capteur`, relance et compare
- [ ] Ouvre une transaction, supprime toutes les mesures du capteur 42, vérifie le compte, puis `ROLLBACK` ; vérifie qu'elles sont revenues
- [ ] Ouvre deux terminaux `psql` : dans le premier, une transaction qui modifie une ligne sans `COMMIT` ; que voit le second ?
- [ ] Dans une transaction, provoque une erreur au milieu, puis essaie une autre requête : lis le message

> [!question]- Indice
> `INSERT INTO mesure (capteur, valeur, prise_le) SELECT (random()*1000)::int, random()*100, now() - (g || ' seconds')::interval FROM generate_series(1, 1000000) g;`

> [!question]- Solution
> ```sql
> EXPLAIN ANALYZE SELECT avg(valeur) FROM mesure WHERE capteur = 42;   -- Seq Scan, ~60 ms
> CREATE INDEX idx_mesure_capteur ON mesure (capteur);
> EXPLAIN ANALYZE SELECT avg(valeur) FROM mesure WHERE capteur = 42;   -- Bitmap Index Scan, ~1 ms
>
> BEGIN;
> DELETE FROM mesure WHERE capteur = 42;
> SELECT count(*) FROM mesure WHERE capteur = 42;   -- 0
> ROLLBACK;
> SELECT count(*) FROM mesure WHERE capteur = 42;   -- ~1000 de nouveau
> ```
> Le second terminal voit l'**ancienne** valeur tant que le premier n'a pas validé (isolation). Après une erreur : *current transaction is aborted, commands ignored until end of transaction block*, il faut `ROLLBACK`.

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
