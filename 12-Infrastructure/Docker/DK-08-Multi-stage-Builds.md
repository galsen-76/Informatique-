---
created: 2026-09-16
modified: 2026-09-16
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M11
aliases:
  - "Multi-stage Builds Docker"
tags:
  - infrastructure/docker/multi-stage
parent: "[[Docker]]"
children: []
related_theory: []
related_snippets:
  - "[[04_Snippets/dockerfile-multistage]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.docker.com/build/building/multi-stage/"
---

# Multi-stage Builds Docker

> [!abstract] Introduction
> Un multi-stage build utilise plusieurs étapes dans un même Dockerfile — une pour construire, une pour ne garder que le résultat final dans une image légère.

> [!warning]- Prérequis
> [[DK-02-Dockerfile|Dockerfile]].

---

## Théorie

> [!question]- C'est quoi ?
> ```dockerfile
> FROM node:22 AS build
> WORKDIR /app
> COPY package*.json ./
> RUN npm ci
> COPY . .
> RUN npm run build
>
> FROM nginx:alpine
> COPY --from=build /app/dist/mon-app/browser /usr/share/nginx/html   # Angular récent ; Vue/Vite : /app/dist
> ```

> [!example]- Analogie
> C'est comme construire un meuble dans un grand atelier plein d'outils (l'étape `build`), puis ne livrer AU CLIENT que le meuble fini (l'étape finale) — jamais l'atelier entier avec toutes ses machines.

> [!question]- Pourquoi l'utiliser ?
> Une image plus légère est plus rapide à déployer et présente moins de surface d'attaque de sécurité.

> [!question]- Comment ça marche ?
> `AS build` nomme une étape ; `COPY --from=build` copie SEULEMENT ce qui est nécessaire, ignorant tout le reste (Node.js, `node_modules`, code source) de l'image finale.

> [!question]- Quand l'utiliser ?
> Toute application nécessitant une étape de compilation/build avant d'être servie.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Pour une application qui ne nécessite AUCUNE étape de build (un simple script Python exécuté tel quel), le multi-stage n'apporte rien — complexité inutile.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| `AS nom` | Nomme une étape pour y faire référence plus tard |
| `COPY --from=nom` | Copie depuis une étape précédente |

---

## Points clés

- Plusieurs `FROM` = plusieurs étapes dans un même Dockerfile
- `COPY --from=nom` copie uniquement ce qui est nécessaire
- L'image finale ignore tout ce qui n'est pas explicitement copié
- Réduit drastiquement taille et surface d'attaque

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Oublier `AS nom` puis se perdre dans les références par numéro d'étape
> - Copier trop (tout `/app` au lieu de juste `/app/dist`), gardant des fichiers inutiles
> - Oublier `COPY package*.json` + `npm ci` avant le build (l'exemple d'origine sautait cette étape : le build échouait faute de dépendances)
> - Mauvais chemin de sortie : Angular récent produit `dist/<projet>/browser`
> - Oublier la configuration Nginx `try_files $uri /index.html` → 404 au rafraîchissement d'une route

---

## Paramètres / Configuration

| Instruction | Description |
|-----------|-------------|
| `FROM image AS nom` | Nouvelle étape nommée |
| `COPY --from=nom source dest` | Copie depuis une étape précédente |

---

## Exemple minimal

```dockerfile
FROM node:22 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf   # try_files pour le routing SPA
COPY --from=build /app/dist/mon-app/browser /usr/share/nginx/html
```

> [!note] Ce que j'en retiens
> L'image finale ne contient QUE nginx + les fichiers compilés — Node.js et le code source complet disparaissent totalement de l'image livrée.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Plus de 2 étapes est courant (deps → build → tests → runtime) ; `--target` pour construire une étape précise (réponse à la note brute)
> - Image API NestJS : étape build + étape runtime avec seulement `dist/` et les dépendances de production (`npm ci --omit=dev`)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Docker]]
- Sous-sujets → (aucun)
- À comparer avec → [[DK-02-Dockerfile|Dockerfile]]

**Pratique :**
- Extrait de code → [[04_Snippets/dockerfile-multistage]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> Pourrais-je expliquer pourquoi l'image finale ne contient PAS Node.js, sans dire "multi-stage" ?

---

## Tâches

- [ ] #task Convertir un Dockerfile en version multi-stage et comparer la taille finale
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Peut-on avoir plus de 2 étapes, et est-ce recommandé ?
