---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Dockerfile]]"
  - "[[Python dans Docker]]"
  - "[[Port]]"
  - "[[Volume Docker]]"
  - "[[Variable de build Docker (ARG)]]"
tags:
  - exercice
  - mini-projet
---
# MesDépenses 02 - L'API dans Docker

> [!info] Où tu en es
> **Projet :** [[Projet - MesDépenses]] · **Étape précédente :** [[MesDépenses 01 - Prendre l'API en main]]
> **Cours :** [[Cours - Faire tourner un script Python dans Docker]] · [[Cours - Docker, les bases solides]]
> **Notions :** [[Dockerfile]] · [[Image Docker]] · [[Conteneur]] · [[Python dans Docker]] · [[Port]] · [[Volume Docker]] · [[Variable de build Docker (ARG)]] · [[Nexus]] · [[Proxy]]
> **Fiches :** [[Fiche - Images Docker au travail via le Nexus]] · [[Bonnes pratiques - Docker]]

## Le but
L'API tourne dans un conteneur, se construit **au travail** (Nexus, proxy) comme **chez toi**, et ses données survivent quand tu supprimes le conteneur.

## Ce que tu fais
- [ ] Écris `api/Dockerfile` à partir d'une image Python du Nexus. Construis l'image `mes-depenses-api:1.0`
- [ ] Lance le conteneur et appelle `/health` depuis ton terminal. Si ça ne répond pas, cherche pourquoi avant de toucher au Dockerfile (logs, port, adresse d'écoute)
- [ ] Ajoute une dépense, supprime le conteneur, relance-en un neuf : la dépense a-t-elle disparu ? Corrige pour qu'elle reste
- [ ] Ajoute un `.dockerignore` : compare la taille du contexte envoyé avant et après
- [ ] Rends l'adresse du registre réglable au build, pour que le même Dockerfile marche au travail et chez toi
- [ ] Vérifie l'ordre de tes lignes : modifie `main.py`, reconstruis. Les dépendances se réinstallent-elles ? Elles ne devraient pas

> [!warning] Les pièges
> - Une API qui écoute sur `127.0.0.1` **dans** le conteneur n'est pas joignable de l'extérieur, même avec `-p`.
> - La base SQLite est un fichier **dans** le conteneur : elle meurt avec lui.

> [!success] Ça marche si…
> `curl localhost:8000/health` répond `{"status":"ok"}`, une dépense ajoutée survit à `docker rm`, et un changement dans `main.py` ne relance pas le `pip install`.

> [!quote] Mes notes
> _Ce que j'ai compris, ce qui a coincé._

> [!question]- Indice
> Regarde les options de `uvicorn` (`--host`, `--port`). Pour la base, la variable `DATABASE_URL` peut pointer vers un fichier dans un dossier que tu montes. Pour le cache, Docker réutilise une couche tant que ce qu'elle copie n'a pas changé.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] Claude a relu mon Dockerfile
