---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Clé primaire et clé étrangère]]"
  - "[[Jointure SQL]]"
  - "[[Base de données relationnelle]]"
  - "[[SQL]]"
tags:
  - exercice
---
# Exercice — Modéliser et interroger une base reliée

> [!info] Objectif
> Concevoir un petit schéma relié, le remplir et répondre à des questions avec des jointures.
> Notions : [[Clé primaire et clé étrangère]] · [[Jointure SQL]] · [[Base de données relationnelle]] · [[SQL]]

## Consignes
- [ ] Lance PostgreSQL avec la [[Fiche - Lancer PostgreSQL avec Docker]] et connecte-toi avec `psql`
- [ ] Crée les tables `projet`, `tache` (clé étrangère vers projet, `ON DELETE CASCADE`), `label` et `tache_label` (clé primaire composée)
- [ ] Insère 3 projets (dont un sans tâche), 6 tâches et 3 labels, et associe des labels
- [ ] Essaie d'insérer une tâche avec un `projet_id` inexistant : lis l'erreur
- [ ] Liste chaque tâche avec le nom de son projet
- [ ] Compte les tâches par projet, y compris le projet vide
- [ ] Liste les labels de chaque tâche (`string_agg`)
- [ ] Supprime un projet et vérifie que ses tâches ont disparu

> [!question]- Indice
> Clé primaire composée : `PRIMARY KEY (tache_id, label_id)`. Pour le projet vide : `LEFT JOIN` et `COUNT(t.id)`.

> [!question]- Solution
> ```sql
> CREATE TABLE projet (id SERIAL PRIMARY KEY, nom TEXT NOT NULL UNIQUE);
> CREATE TABLE tache (id SERIAL PRIMARY KEY,
>   projet_id INT NOT NULL REFERENCES projet(id) ON DELETE CASCADE, nom TEXT NOT NULL);
> CREATE TABLE label (id SERIAL PRIMARY KEY, nom TEXT NOT NULL UNIQUE);
> CREATE TABLE tache_label (tache_id INT REFERENCES tache(id) ON DELETE CASCADE,
>   label_id INT REFERENCES label(id) ON DELETE CASCADE, PRIMARY KEY (tache_id, label_id));
>
> INSERT INTO projet (nom) VALUES ('Chantier'), ('Route'), ('Vide');
> INSERT INTO tache (projet_id, nom) VALUES (1,'Lot 1'),(1,'Lot 2'),(1,'Lot 3'),(2,'Lot A'),(2,'Lot B'),(2,'Lot C');
> INSERT INTO label (nom) VALUES ('voiture'),('piéton'),('vélo');
> INSERT INTO tache_label VALUES (1,1),(1,2),(2,1),(4,3);
>
> SELECT t.nom, p.nom AS projet FROM tache t JOIN projet p ON p.id = t.projet_id;
> SELECT p.nom, COUNT(t.id) FROM projet p LEFT JOIN tache t ON t.projet_id = p.id GROUP BY p.nom;
> SELECT t.nom, string_agg(l.nom, ', ') AS labels
> FROM tache t LEFT JOIN tache_label tl ON tl.tache_id = t.id LEFT JOIN label l ON l.id = tl.label_id
> GROUP BY t.nom ORDER BY t.nom;
> DELETE FROM projet WHERE nom = 'Route';
> SELECT count(*) FROM tache;   -- 3
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
