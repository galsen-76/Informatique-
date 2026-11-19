---
type: exercise
status: a-faire
niveau: 2
difficulty: moyen
concepts:
  - "[[Docker Compose]]"
  - "[[Volume Docker]]"
  - "[[DNS]]"
  - "[[Variable d'environnement]]"
  - "[[Secret et fichier .env]]"
tags:
  - exercice
  - mini-projet
---
# MesDépenses 07 - Tout lancer avec compose

> [!info] Où tu en es
> **Projet :** [[Projet - MesDépenses]] · **Étape précédente :** [[MesDépenses 06 - Le front Vue dans Docker]]
> **Cours :** [[Cours - Docker, les bases solides]]
> **Notions :** [[Docker Compose]] · [[Volume Docker]] · [[DNS]] · [[Variable d'environnement]] · [[Secret et fichier .env]] · [[Base de données relationnelle]] · [[Reverse proxy]]
> **Fiches :** [[Fiche - Lancer PostgreSQL avec Docker]] · [[Bonnes pratiques - Docker]]
> **À créer :** `depends_on` et healthcheck dans compose

## Le but
Un seul `docker compose up` lance PostgreSQL, l'API et le front Vue. Les données sont dans PostgreSQL et survivent à `docker compose down`.

## Ce que tu fais
- [ ] Écris `compose.yml` à la racine avec 3 services : `db` (PostgreSQL du Nexus), `api`, `front-vue`
- [ ] Branche l'API sur PostgreSQL avec `DATABASE_URL`. Quel nom d'hôte mettre ? Pas `localhost` : explique pourquoi
- [ ] Mets le mot de passe de la base dans un `.env` qui ne va **pas** dans Git
- [ ] Lance tout. Si l'API plante au démarrage parce que la base n'est pas prête, fais-la attendre proprement (pas de `sleep`)
- [ ] Ouvre http://localhost:8080 : CORS a-t-il changé ? Règle-le par la variable de l'étape 04
- [ ] `docker compose down` puis `up` : les dépenses sont-elles encore là ? Et avec `down -v` ?
- [ ] Bonus : fais servir l'API par le nginx du front sous `/api`. Pourquoi CORS n'est-il alors plus nécessaire ?

> [!warning] Les pièges
> - Dans un conteneur, `localhost` c'est **le conteneur lui-même**.
> - « Le conteneur est démarré » ne veut pas dire « PostgreSQL accepte les connexions ».

> [!success] Ça marche si…
> `docker compose up` suffit, la page marche sur :8080, les données survivent à `down`, et aucun mot de passe n'est dans `compose.yml` ni dans Git.

> [!quote] Mes notes
> _Ce que j'ai compris, ce qui a coincé._

> [!question]- Indice
> Sur le réseau de compose, chaque service est joignable par son **nom**. Regarde `depends_on` avec `condition: service_healthy` et la commande `pg_isready`. Les logs d'un seul service : `docker compose logs api`.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] Claude a relu mon compose.yml
