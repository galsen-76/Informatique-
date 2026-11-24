---
type: exercise
status: a-faire
niveau: 2
difficulty: moyen
concepts:
  - "[[Docker Compose]]"
  - "[[YAML]]"
  - "[[Base de données relationnelle]]"
  - "[[SQL]]"
  - "[[Volume Docker]]"
  - "[[Variable d'environnement]]"
  - "[[DNS]]"
  - "[[Clé primaire et clé étrangère]]"
tags:
  - exercice
  - mini-projet
---
# MesDépenses 05 - L'API et PostgreSQL avec compose

> [!info] Où tu en es
> **Projet :** [[Projet - MesDépenses]] · **Niveau :** 2 · **Étape précédente :** [[MesDépenses 04 - L'API dans Docker]]
> **Notions :** [[Docker Compose]] · [[YAML]] · [[Base de données relationnelle]] · [[SQL]] · [[Volume Docker]] · [[Variable d'environnement]] · [[DNS]] · [[Clé primaire et clé étrangère]]

## Le but
L'API et sa base PostgreSQL démarrent ensemble avec une seule commande, comme la plupart des applications que tu feras tourner au travail.

> [!tip] Au travail
> Lire et modifier un `compose.yml` existant, c'est ce que tu feras le plus souvent : entraîne-toi aussi à expliquer chaque ligne du tien.

## Ce que tu fais
- [ ] Écris `compose.yml` avec deux services : `api` (ton image) et `db` (PostgreSQL)
- [ ] L'API trouve la base par le **nom du service**, via `DATABASE_URL`. Le mot de passe est dans un `.env` ignoré par Git
- [ ] Les données de PostgreSQL survivent à `docker compose down` puis `up`. Vérifie-le avec une dépense
- [ ] L'API attend que la base soit prête avant de démarrer (sinon elle plante au premier lancement)
- [ ] Entre dans la base avec `psql` et lis les dépenses avec une requête SQL : vérifie que ce sont les mêmes que celles de l'API
- [ ] Seule l'API est joignable depuis ton poste, pas la base
- [ ] Dans `psql`, trouve la clé primaire de la table des dépenses. Si les catégories avaient leur propre table, quelle colonne deviendrait une clé étrangère ?

> [!warning] Les pièges
> - Dans un conteneur, `localhost` désigne le conteneur lui-même, pas la base.
> - `docker compose down -v` efface aussi les volumes, donc les données.

> [!success] Ça marche si…
> `docker compose up -d` lance tout, une dépense survit à `down` puis `up`, `psql` montre les mêmes lignes que l'API, et le port de la base n'est pas ouvert sur ton poste.

> [!quote] Mes notes
> _Ce que j'ai compris, ce qui a coincé._

> [!question]- Indice
> `depends_on` avec `condition: service_healthy` et un `healthcheck` qui lance `pg_isready`. Un volume nommé pour `/var/lib/postgresql/data`. Voir [[Fiche - Lancer PostgreSQL avec Docker]].

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] Claude a relu mon compose.yml
