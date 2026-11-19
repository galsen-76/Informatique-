---
type: concept
domain: securite
module: "[[Module 10 - Authentification et sécurité]]"
status: a-decouvrir
level: debutant
niveau: 2
schema: false
exercice_visuel: false
fil_rouge: false
prerequisites:
  - "[[Variable d'environnement]]"
  - "[[Ignorer des fichiers (gitignore)]]"
parents:
  - "[[Authentification]]"
related:
  - "[[Variables CI-CD GitLab]]"
  - "[[Docker Compose]]"
next_review: 
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
API_TOKEN=…
```
```bash
# .env.example  (commité : la liste des variables, sans les valeurs)
DATABASE_URL=
JWT_SECRET=
API_TOKEN=
```
- Lecture : `process.env.JWT_SECRET` (Node 20+ : `node --env-file=.env app.js`), `os.environ["JWT_SECRET"]` (Python, après `load_dotenv()` : voir [[Charger un fichier .env (python-dotenv)]]), `env_file:` dans [[Docker Compose]].
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

> [!warning] À ne pas confondre
> Mettre un secret dans un `ARG` ou un `ENV` de [[Dockerfile]] : il reste lisible dans l'image (`docker history`). Et `.env` n'est pas chiffré : il protège seulement contre le partage par Git.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] 🛣️ Suis le trajet
> Dessine le trajet du mot de passe de la base dans ton application : le `.env`, compose, la variable d'environnement, le code. Marque où il ne doit jamais aller.

> [!example] 🔄 Change de contexte
> Redessine-le dans la CI GitLab : où ranger le secret au lieu du `.env` ?

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Secret et fichier .env » et je l'intègre ici avec `![[Schéma - Secret et fichier .env.excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- [[MesDépenses 07 - Tout lancer avec compose]]

## 4 · Relier
- **Au travail** : [[Secret et fichier .env au travail]]
- **Prérequis** : [[Variable d'environnement]] · [[Ignorer des fichiers (gitignore)]]
- **Complémentaires** : [[Variables CI-CD GitLab]] · [[Docker Compose]] · [[Charger un fichier .env (python-dotenv)]]

## 5 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation (compris, puis maîtrisé)
Trois cases à cocher dans les propriétés de la fiche :
- `schema` : mon dessin du concept est dans « Mon schéma » ;
- `exercice_visuel` : j'ai fait et corrigé les exercices visuels de la section 3 ;
- `fil_rouge` : je l'ai appliqué dans le fil rouge (coché tout seul quand une étape qui l'utilise est réussie).

Les trois cochées : la notion compte comme **comprise**. **Maîtrisé** : c'est moi qui le mets dans `status`, quand je le sens.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
