---
type: exercise
status: a-faire
niveau: 4
difficulty: moyen
concepts:
  - "[[Lancer une commande (subprocess)]]"
  - "[[Archive zip (zipfile)]]"
  - "[[Copier et déplacer des fichiers (shutil)]]"
  - "[[Expressions régulières (re)]]"
  - "[[Dates et heures (datetime)]]"
  - "[[Tâche planifiée (cron)]]"
  - "[[Journaliser avec logging]]"
tags:
  - exercice
  - mini-projet
---
# MesDépenses 13 - Sauvegarder la base avec un script

> [!info] Où tu en es
> **Projet :** [[Projet - MesDépenses]] · **Niveau :** 4 · **Étape précédente :** [[MesDépenses 12 - Derrière nginx, avec une petite page]]
> **Notions :** [[Lancer une commande (subprocess)]] · [[Archive zip (zipfile)]] · [[Copier et déplacer des fichiers (shutil)]] · [[Expressions régulières (re)]] · [[Dates et heures (datetime)]] · [[Tâche planifiée (cron)]] · [[Journaliser avec logging]]

## Le but
Un script Python qui sauvegarde la base chaque nuit, garde les sept dernières sauvegardes et sait en restaurer une. Ce genre de script d'exploitation, tu en écriras souvent.

> [!tip] Au travail
> Une sauvegarde qu'on n'a jamais restaurée n'est pas une sauvegarde : la restauration fait partie de l'étape.

## Ce que tu fais
- [ ] Écris `outils/sauvegarde.py` : il lance l'export de PostgreSQL dans le conteneur, compresse le résultat dans une archive datée
- [ ] Range les archives dans un dossier `sauvegardes/` et supprime celles qui ont plus de sept jours. Trouve la date à partir du **nom** du fichier
- [ ] Si l'export échoue, le script s'arrête avec un code de sortie non nul et un message clair dans les logs
- [ ] Planifie le script chaque nuit sur le serveur
- [ ] Restaure une sauvegarde dans une base vide et vérifie que les dépenses sont là

> [!warning] Les pièges
> - Une tâche planifiée n'a pas les mêmes variables d'environnement que ton terminal.
> - Un script qui échoue en silence la nuit, personne ne le voit.

> [!success] Ça marche si…
> Le dossier contient au plus sept archives datées, un échec d'export donne un code de sortie non nul, et la restauration remet les mêmes dépenses.

> [!quote] Mes notes
> _Ce que j'ai compris, ce qui a coincé._

> [!question]- Indice
> `subprocess.run([...], check=True)`, `pg_dump` et `psql` via `docker compose exec -T`, `zipfile.ZipFile`, `re.match` sur le nom, `crontab -e` avec des chemins absolus.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] Claude a relu mon script
