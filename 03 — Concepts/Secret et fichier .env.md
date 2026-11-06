---
type: concept
domain: securite
module: "[[Module 10 - Authentification et sécurité]]"
status: a-decouvrir
level: debutant
prerequisites:
  - "[[Variable d'environnement]]"
  - "[[Ignorer des fichiers (gitignore)]]"
parents:
  - "[[Authentification]]"
related:
  - "[[Variables CI-CD GitLab]]"
  - "[[Docker Compose]]"
next_review: 
method: []
tags:
  - concept
  - securite
---
# Secret et fichier .env

> [!info] En une phrase
> Un secret (mot de passe, clé d'API, jeton) ne s'écrit jamais dans le code ni dans Git : on le passe par une variable d'environnement, souvent chargée depuis un fichier .env ignoré par Git en local, et depuis un coffre ou les variables masquées de la CI ailleurs.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
```bash
# .env  (jamais commité : il est dans .gitignore)
DATABASE_URL=postgresql://postgres:dev@localhost:5432/notes
JWT_SECRET=4f8c…long-et-aléatoire
CVAT_TOKEN=…
```
```bash
# .env.example  (commité : la liste des variables, sans les valeurs)
DATABASE_URL=
JWT_SECRET=
CVAT_TOKEN=
```
- Lecture : `process.env.JWT_SECRET` (Node 20+ : `node --env-file=.env app.js`), `os.environ["JWT_SECRET"]` (Python, avec `python-dotenv`), `env_file:` dans [[Docker Compose]].
- En CI : [[Variables CI-CD GitLab]] **masquées** et **protégées**.
- En production : un gestionnaire de secrets (Vault, secrets Kubernetes, coffre du cloud).
- Un secret **commité une fois** est compromis, même supprimé ensuite (il reste dans l'historique) : il faut le **révoquer** et en créer un nouveau.

### Pourquoi ça existe
Le code est partagé, copié, publié ; les secrets ne doivent pas suivre.

### Le problème résolu
Garder les secrets hors de Git et des images Docker, et pouvoir les changer sans modifier le code.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
E[.env local] --> A[Application]
  V[Variables CI masquées] --> A
  C[Coffre prod] --> A
  G[Git] -.jamais.-> S[Secrets]
```

### Exemple concret
```js
const secret = process.env.JWT_SECRET;
if (!secret) { console.error("JWT_SECRET manquant"); process.exit(1); }   // échouer tôt
```
```bash
git log -p | grep -i "password\|secret\|token"   # vérifier qu'aucun secret n'a fui
```
Les outils comme **gitleaks** le vérifient automatiquement dans la CI.

### Cas d'utilisation
- Configurer une application en local
- La pipeline GitLab qui pousse dans Nexus (identifiants du registre)
- Le jeton CVAT de ta fonction Nuclio

> [!warning] À ne pas confondre
> Mettre un secret dans un `ARG` ou un `ENV` de [[Dockerfile]] : il reste lisible dans l'image (`docker history`). Et `.env` n'est pas chiffré : il protège seulement contre le partage par Git.

## 3 · Pratiquer
- Déplace les secrets d'un petit projet dans un `.env`, ajoute un `.env.example`, et vérifie avec `git status` que `.env` n'apparaît pas

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _À écrire sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Variable d'environnement]] · [[Ignorer des fichiers (gitignore)]]
- **Complémentaires** : [[Variables CI-CD GitLab]] · [[Docker Compose]]

## 6 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
La notion est maîtrisée quand j'ai réussi **tous les exercices** qui l'utilisent (statut `reussi` dans l'exercice).

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
