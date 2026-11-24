---
type: concept
module: "[[Module 16 - Python]]"
related:
  - "[[Environnement virtuel Python]]"
  - "[[Serverless et FaaS]]"
  - "[[Docker Compose]]"
tags:
  - concept
  - python
---
# Charger un fichier .env (python-dotenv)

> [!info] En une phrase
> Python ne lit pas le fichier `.env` tout seul : `load_dotenv()`, de la bibliothèque `python-dotenv`, copie ses lignes dans les variables d'environnement du programme, et le code les lit ensuite avec `os.environ`, comme si elles venaient du terminal.

## 1 · Comprendre
### Définition
Un `.env` est un simple fichier texte, une variable par ligne :
```bash
# .env
API_URL=http://localhost:8080
API_USER=robot
API_PASSWORD="mot de passe avec espaces"
```
```python
import os
from dotenv import load_dotenv   # le paquet s'appelle python-dotenv, le module dotenv

load_dotenv()                     # lit le .env et remplit os.environ
url = os.environ["API_URL"]      # KeyError si elle manque : on le voit tout de suite
```
Les règles à connaître :
- **Où il cherche** : sans argument, `load_dotenv()` cherche `.env` dans le dossier **du script**, puis dans les dossiers parents. Pas dans le dossier où tu lances la commande. Pour un autre fichier : `load_dotenv("chemin/vers/.env")`.
- **Qui gagne** : une variable **déjà définie** dans le terminal (`export API_URL=…`) **n'est pas remplacée** par le `.env`. Pour forcer : `load_dotenv(override=True)`.
- **Pas trouvé = pas d'erreur** : si le fichier n'existe pas, `load_dotenv()` ne dit rien. L'erreur arrive plus loin, sur `os.environ["…"]`.
- **Sans toucher à l'environnement** : `dotenv_values(".env")` renvoie un simple dictionnaire.
- **Installation** : `pip install python-dotenv`, dans le [[Environnement virtuel Python|venv]] du projet.

### Pourquoi ça existe
Taper `export API_PASSWORD=…` à chaque nouveau terminal est pénible, et l'écrire dans le code le met dans Git. Le `.env` garde les valeurs à côté du projet, hors de Git ([[Secret et fichier .env]]).

### Le problème résolu
Le même code lit `os.environ` partout. En local, les valeurs viennent du `.env` ; dans Docker, de `env_file:` ou `-e` ; sur une plateforme serverless, de sa configuration. Le code ne change pas.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
F[.env] -->|load_dotenv| E[os.environ]
T[export terminal] --> E
E --> C[Ton code]
```

### Exemple concret
```python
import os
from dotenv import load_dotenv

load_dotenv()
manquantes = [n for n in ("API_URL", "API_USER", "API_PASSWORD") if n not in os.environ]
if manquantes:
    raise SystemExit(f"Variables manquantes : {', '.join(manquantes)}")   # échouer tôt, avec un message clair
```

### Cas d'utilisation
- Tout projet avec un `.env.example` commité et un `.env` ignoré

> [!warning] À ne pas confondre
> - **`load_dotenv()` et le terminal** : le `.env` n'existe que pour le programme Python qui l'a chargé. `echo $API_URL` dans Bash reste vide.
> - **`.env` et déploiement** : une appli déployée n'a pas de `.env` (il n'est pas copié dans l'image, et ne doit pas l'être). Elle reçoit ses variables par la plateforme (Docker, CI, serverless). Garde `load_dotenv()` seulement pour les essais en local.
> - **`os.environ["X"]` et `os.environ.get("X")`** : le premier plante si `X` manque (utile pour un secret obligatoire), le second renvoie `None` sans prévenir.

## 3 · Relier
- **Au travail** : [Charger un fichier .env (python-dotenv) au travail](obsidian://open?vault=Travail&file=Charger%20un%20fichier%20.env%20%28python-dotenv%29%20au%20travail)
- **Prérequis** : [[Variable d'environnement]] · [[Secret et fichier .env]]
- **Complémentaires** : [[Environnement virtuel Python]] · [[Serverless et FaaS]] · [[Docker Compose]]
