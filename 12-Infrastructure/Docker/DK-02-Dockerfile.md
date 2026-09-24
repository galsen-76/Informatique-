---
created: 2026-09-16
modified: 2026-09-16
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M11
aliases:
  - "Dockerfile"
tags:
  - infrastructure/docker/dockerfile
parent: "[[Docker]]"
children:
  - "[[DK-08-Multi-stage-Builds|Multi-stage Builds Docker]]"
related_theory: []
related_snippets:
  - "[[04_Snippets/dockerfile-angular]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.docker.com/engine/reference/builder/"
---

# Dockerfile

> [!abstract] Introduction
> Un Dockerfile décrit étape par étape comment construire une image Docker.

> [!warning]- Prérequis
> [[DK-01-Fondamentaux|Fondamentaux Docker]].

---

## Théorie

> [!question]- C'est quoi ?
> ```dockerfile
> FROM node:22
> WORKDIR /app
> COPY package.json .
> RUN npm ci
> COPY . .
> CMD ["npm", "start"]
> ```

> [!example]- Analogie
> Un Dockerfile est une recette de cuisine écrite étape par étape : chaque ligne est une instruction qui s'ajoute au plat final (l'image), dans l'ordre exact où elle est écrite.

> [!question]- Pourquoi l'utiliser ?
> Rendre la construction d'une image reproductible et versionnable — n'importe qui reconstruit exactement la même image.

> [!question]- Comment ça marche ?
> `RUN` s'exécute UNE FOIS pendant la construction ; `CMD` s'exécute À CHAQUE démarrage du conteneur. L'ordre des instructions influence le cache de build : copier `package.json` AVANT le reste du code évite de réinstaller les dépendances à chaque changement de code.

> [!question]- Quand l'utiliser ?
> Pour toute application destinée à tourner dans Docker.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Copier tout le code AVANT `npm install` invalide le cache à chaque changement de code, même inutilement — un ordre mal pensé ruine le bénéfice du cache de build.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| `FROM` | Image de base |
| `WORKDIR` | Dossier de travail dans le conteneur |
| Cache de build | Réutilisation des étapes précédentes non modifiées |
| `.dockerignore` | Exclut des fichiers de ce qui est copié dans l'image |

---

## Points clés

- `FROM` définit l'image de base, `WORKDIR` le dossier de travail
- `RUN` = pendant la construction, `CMD` = au démarrage
- Ordre des instructions = clé du cache de build efficace
- `.dockerignore` évite de copier des fichiers inutiles (`node_modules`)

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Confondre `RUN` et `CMD`
> - Copier tout le code avant `npm install`, cassant le cache à chaque modification
> - Oublier `.dockerignore`, gonflant inutilement l'image avec `node_modules` ou `.git`
> - `npm install` au lieu de `npm ci` → versions non reproductibles
> - Conteneur exécuté en root → ajouter `USER node` dans l'image finale

---

## Paramètres / Configuration

| Instruction | Description |
|-----------|-------------|
| `FROM image:tag` | Image de base |
| `COPY source dest` | Copie de fichiers |
| `RUN commande` | Exécutée au build |
| `CMD ["exe","arg"]` | Exécutée au démarrage |

---

## Exemple minimal

```dockerfile
FROM node:22 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
```

> [!note] Ce que j'en retiens
> Copier `package*.json` avant le reste permet à Docker de réutiliser le cache de `npm install` si seul le code change ensuite.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - `CMD` vs `ENTRYPOINT` : `ENTRYPOINT` fixe l'exécutable, `CMD` fournit des arguments par défaut remplaçables (réponse à la note brute)
> - Épingler les versions d'images (`node:22-alpine`, voire par digest) et utiliser `HEALTHCHECK`

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Docker]]
- Sous-sujets → [[DK-08-Multi-stage-Builds|Multi-stage Builds Docker]]
- À comparer avec → [[DK-01-Fondamentaux|Fondamentaux Docker]]

**Pratique :**
- Extrait de code → [[04_Snippets/dockerfile-angular]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> Pourrais-je expliquer pourquoi l'ordre des `COPY` affecte le temps de build, sans dire "cache" ?

> [!faq]- Questions d'entretien
> - Comment optimisez-vous le cache de build d'un Dockerfile ?

---

## Tâches

- [ ] #task Écrire un Dockerfile pour une application Angular
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Différence pratique entre `CMD` et `ENTRYPOINT` ?
