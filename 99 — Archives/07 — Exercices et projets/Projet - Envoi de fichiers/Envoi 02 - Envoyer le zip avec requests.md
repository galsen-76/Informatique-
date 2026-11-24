---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Envoyer et recevoir un fichier en HTTP]]"
tags:
  - exercice
  - mini-projet
---
# Envoi 02 - Envoyer le zip avec requests

> [!info] Où tu en es
> **Projet :** [[Projet - Envoyer un zip ou une image en Python]]
> **Étape précédente :** [[Envoi 01 - Un zip sans toucher au disque]]
> **Cours à avoir lu :** [[Cours - Envoyer et recevoir des fichiers par HTTP]]
> **Notions validées par cette étape :** [[Envoyer et recevoir un fichier en HTTP]]

## Le but
Envoyer le zip de l'étape 01 au serveur, sur `POST /envoyer`, sous forme de formulaire multipart, avec à côté un champ `job_id` qui vaut `12`. Le serveur doit répondre qu'il a reçu un zip et en lister le contenu.

## Ce que tu fais
- [ ] Envoie d'abord les octets avec `data=` : lis la réponse du serveur et ce qu'affiche son terminal (`Content-Type`). Pourquoi refuse-t-il ?
- [ ] Corrige pour envoyer un vrai formulaire multipart, mais nomme le champ `file` : lis la nouvelle erreur
- [ ] Corrige le nom du champ, donne un nom de fichier `rapport.zip` et le type MIME d'un zip, et ajoute le champ `job_id`
- [ ] Affiche le code de statut puis le JSON de la réponse. Fais en sorte que le script s'arrête avec une erreur claire si le statut n'est pas un succès
- [ ] Regarde le `Content-Type` affiché par le serveur : tu ne l'as pas écrit. D'où vient-il, et à quoi sert le `boundary` ?

> [!warning] Le piège de cette étape
> `data=octets` envoie un corps brut, pas un formulaire. Le serveur attend un multipart, donc il répond 400. Et le nom du champ (`fichier`) est imposé par le serveur, comme le nom d'un paramètre de fonction.

> [!success] Ça marche si…
> La réponse contient `"recu": "ok"`, `"nom_du_fichier": "rapport.zip"`, `"reconnu_comme": "zip"`, la liste des deux fichiers et `"autres_champs": {"job_id": "12"}`.

## Est-ce que j'ai compris ?
Réponds en quelques mots, en dessous, ou demande à Claude de t'interroger.
1. Quelle différence entre `data=octets` et `files={...}` dans ce qui part sur le réseau ?
2. Dans `("rapport.zip", octets, "application/zip")`, qui choisit chaque morceau : toi ou le serveur ?
3. Pourquoi ne faut-il pas écrire soi-même `Content-Type: multipart/form-data` ?

> [!quote] Mes réponses
> _À écrire._

> [!question]- Indice
> Un formulaire multipart se fait avec le paramètre `files`, un dictionnaire `{nom_du_champ: (nom_du_fichier, octets, type_mime)}`. Les champs texte à côté passent par `data`. Le terminal du serveur montre ce qui arrive vraiment.
> 
> Si `import requests` échoue : `python3 -m venv .venv`, `source .venv/bin/activate`, `pip install requests`. Au travail, si pip est bloqué, passe par le PyPI du Nexus, ou fais l'étape 03 d'abord.

> [!question]- Solution
> ```python
> import requests
>
> URL = "http://localhost:8000"
> octets = fabriquer_zip()
>
> r = requests.post(f"{URL}/envoyer",
>                   files={"fichier": ("rapport.zip", octets, "application/zip")},
>                   data={"job_id": "12"},
>                   timeout=30)
> r.raise_for_status()
> print(r.status_code, r.json())
> ```
> 1. `data=octets` met les octets seuls dans le corps, sans type. `files=` fabrique un corps découpé en parties (le fichier, son nom, son type, et les champs de `data`), avec `Content-Type: multipart/form-data; boundary=...`.
> 2. Le **nom du champ** (`fichier`) est imposé par le serveur. Le nom du fichier et le type MIME, c'est toi qui les donnes (le serveur peut s'en servir, ou les vérifier).
> 3. Le `boundary` est la ligne de séparation entre les parties, choisie au hasard par requests. Si tu écris l'en-tête à la main, il manque ou ne correspond pas au corps : le serveur ne sait plus découper.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] J'ai répondu aux questions et Claude les a vérifiées
