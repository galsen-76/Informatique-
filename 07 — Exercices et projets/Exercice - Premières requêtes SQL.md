---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[SQL]]"
  - "[[Base de données relationnelle]]"
tags:
  - exercice
---
# Exercice — Premières requêtes SQL

> [!info] Objectif
> Créer une table, y mettre des données et les interroger.
> Notions : [[SQL]] · [[Base de données relationnelle]]

## Consignes
- [ ] Lance PostgreSQL avec Docker ([[Fiche - Lancer PostgreSQL avec Docker]]) et ouvre `psql`
- [ ] Crée une table `fichiers` (id, nom, extension, taille)
- [ ] Insère 5 lignes
- [ ] Écris des requêtes : tous les `.png`, le plus gros fichier, le nombre de fichiers par extension
- [ ] Crée une seconde table `archives` liée à `fichiers` par une clé étrangère

> [!question]- Indice
> `CREATE TABLE`, `INSERT INTO … VALUES`, `SELECT … WHERE`, `ORDER BY … DESC LIMIT 1`, `GROUP BY`, `REFERENCES`.

> [!question]- Solution
> ```sql
> CREATE TABLE fichiers (id SERIAL PRIMARY KEY, nom TEXT, extension TEXT, taille INT);
> INSERT INTO fichiers (nom, extension, taille) VALUES ('a.png','png',120),('b.txt','txt',3);
> SELECT * FROM fichiers WHERE extension = 'png';
> SELECT nom FROM fichiers ORDER BY taille DESC LIMIT 1;
> SELECT extension, COUNT(*) FROM fichiers GROUP BY extension;
> CREATE TABLE archives (id SERIAL PRIMARY KEY, fichier_id INT REFERENCES fichiers(id));
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
