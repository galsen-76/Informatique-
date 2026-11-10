---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[Charger un fichier .env (python-dotenv)]]"
  - "[[Secret et fichier .env]]"
tags:
  - exercice
  - mini-projet
---
# Exercice - Charger les identifiants CVAT depuis un .env

> [!info] Où tu en es
> **Fiches à avoir lues :** [[Charger un fichier .env (python-dotenv)]] et [[Secret et fichier .env]]
> **Notions validées par cet exercice :** [[Charger un fichier .env (python-dotenv)]] · [[Secret et fichier .env]]
> **Ce qu'il faut savoir déjà :** créer un [[Environnement virtuel Python|venv]] et y installer un paquet. Le script qui appelle CVAT est fourni.
> **Où le faire :** sur ton PC, avec ton CVAT local qui tourne (`http://localhost:8080`).

## Le but
Un petit script demande à CVAT « qui suis-je ? » avec un identifiant et un mot de passe. Aujourd'hui, il plante. Tu fais en sorte qu'il trouve ses identifiants dans un `.env`, que ce `.env` ne puisse **jamais** partir dans Git, et que n'importe qui puisse savoir quelles variables remplir.

## Le fichier de départ
Dans un dossier neuf `~/projets/qui-suis-je`, avec son venv.

`qui_suis_je.py`
```python
"""Demande à CVAT qui je suis, avec les identifiants pris dans l'environnement."""
import base64
import json
import os
import urllib.request

# À toi : faire en sorte que ces trois variables viennent du fichier .env

url = os.environ["CVAT_URL"]
utilisateur = os.environ["CVAT_USERNAME"]
mot_de_passe = os.environ["CVAT_PASSWORD"]

jeton = base64.b64encode(f"{utilisateur}:{mot_de_passe}".encode()).decode()
requete = urllib.request.Request(f"{url}/api/users/self", headers={"Authorization": f"Basic {jeton}"})
with urllib.request.urlopen(requete, timeout=10) as reponse:
    moi = json.load(reponse)

print(f"Connecté à {url} en tant que {moi['username']} (id {moi['id']})")
```

## Ce que tu fais
- [ ] Lance le script tel quel. Lis l'erreur : quelle ligne, quelle variable, et pourquoi elle n'existe pas ?
- [ ] Crée un `.env` avec tes trois valeurs, et ajoute ce qu'il faut au script (une bibliothèque, deux lignes) pour qu'il affiche « Connecté à … en tant que … »
- [ ] Va dans ton dossier personnel (`cd ~`) et lance le script en donnant son chemin complet. Avant de lancer, écris ce que tu prévois : trouve-t-il encore le `.env` ?
- [ ] Range le `.env` dans un sous-dossier `config/`. Le script plante : corrige-le **sans** remettre le fichier à sa place
- [ ] Dans le terminal, fais `export CVAT_USERNAME=personne`, puis relance. Quel nom s'affiche ? Explique, puis remets le terminal propre
- [ ] Fais du dossier un dépôt Git. Fais en sorte que `git status` ne montre **jamais** le `.env`, et ajoute un fichier commité qui liste les variables à remplir, sans leurs valeurs. Fais un premier commit et vérifie ce qu'il contient
- [ ] Mets un mauvais mot de passe dans le `.env`. Quelle erreur obtiens-tu, et que dit-elle ?

> [!warning] Les pièges de cet exercice
> - Le paquet à installer et le module à importer n'ont pas le même nom.
> - `load_dotenv()` ne cherche pas le `.env` là où tu crois, et il ne dit rien quand il ne le trouve pas.
> - Une variable déjà présente dans le terminal est prioritaire.

> [!success] Ça marche si…
> Le script affiche ton nom d'utilisateur CVAT, depuis n'importe quel dossier, avec le `.env` dans `config/`, et le premier commit contient le script, `.gitignore` et `.env.example`, mais pas `.env`.

## Est-ce que j'ai compris ?
Réponds en quelques mots, en dessous, ou demande à Claude de t'interroger.
1. Où `load_dotenv()` cherche-t-il le `.env` quand on ne lui donne pas de chemin ?
2. Pourquoi `export CVAT_USERNAME=personne` a-t-il gagné contre le `.env` ? Est-ce un bon comportement ?
3. Après le script, `echo $CVAT_PASSWORD` dans le même terminal : qu'affiche-t-il, et pourquoi ?
4. Si tu avais commité le `.env` puis supprimé dans le commit suivant, le mot de passe serait-il protégé ? Que faudrait-il faire ?
5. Ta fonction `convert-png` dans Nuclio : d'où vient `CVAT_PASSWORD`, et pourquoi pas d'un `.env` ?

> [!quote] Mes réponses
> _À écrire._

> [!question]- Indice
> Le paquet s'installe sous le nom `python-dotenv`, et s'importe avec `from dotenv import load_dotenv`. Sans argument, la recherche part du dossier **du script**, pas du dossier où tu es. `load_dotenv()` accepte un chemin, et le chemin du script s'obtient avec `Path(__file__).parent`.

> [!question]- Solution
> ```bash
> python3 -m venv .venv && source .venv/bin/activate
> pip install python-dotenv        # au travail : via le PyPI du Nexus
> ```
> ```python
> from pathlib import Path
> from dotenv import load_dotenv
>
> load_dotenv(Path(__file__).parent / "config" / ".env")
> ```
> ```bash
> # .gitignore
> .env
> config/.env
> .venv/
>
> # .env.example  (commité)
> CVAT_URL=
> CVAT_USERNAME=
> CVAT_PASSWORD=
> ```
> ```bash
> unset CVAT_USERNAME
> git init && git add . && git status     # .env ne doit pas apparaître
> git commit -m "feat: script qui_suis_je"
> git show --stat                          # le contenu du commit
> ```
> 1. Dans le dossier du script, puis dans ses dossiers parents. C'est pour ça que `cd ~` ne change rien, mais que `config/` casse tout.
> 2. Par défaut, `load_dotenv()` ne remplace pas une variable qui existe déjà. C'est voulu : le `.env` donne des valeurs par défaut pour ton PC, et l'environnement réel (Docker, CI, terminal) peut toujours les remplacer. `override=True` inverse la règle, à utiliser rarement.
> 3. Rien. `load_dotenv()` remplit `os.environ` **du programme Python**, qui disparaît quand il se termine. Ton terminal n'a jamais vu ces variables.
> 4. Non : le mot de passe reste dans l'historique (`git log -p`). Il faut le **changer** dans CVAT ; nettoyer l'historique ne suffit pas s'il a déjà été poussé.
> 5. De `nuctl deploy --env CVAT_PASSWORD=…` (et les autres de `spec.env`). Le `.env` reste sur ton PC : il n'est pas copié dans l'image de la fonction, et ne doit pas l'être, sinon le mot de passe serait lisible dans l'image.
> Le mauvais mot de passe donne `HTTP Error 401: Unauthorized` : CVAT a bien reçu la requête mais refuse les identifiants.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] J'ai répondu aux questions et Claude les a vérifiées
