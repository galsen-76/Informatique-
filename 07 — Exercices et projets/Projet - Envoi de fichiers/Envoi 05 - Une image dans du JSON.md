---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Base64]]"
tags:
  - exercice
  - mini-projet
---
# Envoi 05 - Une image dans du JSON

> [!info] Où tu en es
> **Projet :** [[Projet - Envoyer un zip ou une image en Python]]
> **Étape précédente :** [[Envoi 04 - Recevoir une image et un zip]]
> **Cours à avoir lu :** [[Cours - Envoyer et recevoir des fichiers par HTTP]]
> **Notions validées par cette étape :** [[Base64]]

## Le but
Envoyer l'image `recu.png` au serveur **à l'intérieur d'un JSON**, sur `POST /json-image`, sous la forme `{"image": "..."}`. C'est la façon dont CVAT envoie une image à ses fonctions Nuclio de détection.

## Ce que tu fais
- [ ] Essaie de mettre directement les octets de l'image dans le dictionnaire et de l'envoyer en JSON : lis l'erreur
- [ ] Encode l'image en base64 et remets-la dans le dictionnaire : lis la nouvelle erreur, même si elle ressemble à la première. Affiche le type de ce que renvoie l'encodage
- [ ] Corrige, envoie, et affiche la réponse : le serveur doit retrouver une image PNG de 40 × 20
- [ ] Compare la taille de l'image en octets et la longueur du texte base64 : de combien a-t-elle grossi ?
- [ ] Décode toi-même le texte base64 et vérifie que tu retrouves exactement les octets de départ

> [!warning] Le piège de cette étape
> `base64.b64encode` renvoie encore des **octets** (`b'iVBOR...'`), pas du texte. JSON refuse les octets : `Object of type bytes is not JSON serializable`. Il faut une dernière conversion en texte.

> [!success] Ça marche si…
> La réponse contient `"reconnu_comme": "png"`, `"largeur": 40`, `"hauteur": 20`, et ta comparaison affiche `True`.

## Est-ce que j'ai compris ?
Réponds en quelques mots, en dessous, ou demande à Claude de t'interroger.
1. Pourquoi ne peut-on pas mettre des octets dans du JSON ?
2. Base64 protège-t-il l'image ? Pourquoi ?
3. Ta fonction `convert-png` renverra un PNG : vaut-il mieux le renvoyer brut avec `image/png`, ou en base64 dans du JSON ? Quand choisirais-tu l'un ou l'autre ?

> [!quote] Mes réponses
> _À écrire._

> [!question]- Indice
> Le module `base64` a une fonction pour encoder et une pour décoder. Le résultat de l'encodage est fait seulement de caractères simples : on peut le transformer en `str` sans risque. Avec requests, `json=` fabrique le JSON pour toi.

> [!question]- Solution
> ```python
> import base64
> import requests
>
> with open("recu.png", "rb") as f:
>     octets = f.read()
>
> texte = base64.b64encode(octets).decode("ascii")
> print(len(octets), "octets →", len(texte), "caractères")
>
> r = requests.post("http://localhost:8000/json-image", json={"image": texte}, timeout=30)
> r.raise_for_status()
> print(r.json())
>
> print(base64.b64decode(texte) == octets)    # True
> ```
> 1. JSON ne connaît que du texte, des nombres, des listes et des dictionnaires. Des octets d'image contiennent des valeurs qui ne sont pas des caractères : il faut d'abord les écrire en texte.
> 2. Non : base64 n'est pas un chiffrement, n'importe qui le décode. Il change seulement l'écriture (et grossit le fichier d'environ un tiers).
> 3. Seulement une image à renvoyer, affichée par le navigateur : brut avec `image/png`, plus léger et plus simple. Image **plus** d'autres informations dans une même réponse (dimensions, nombre de tracés…) : base64 dans du JSON.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] J'ai répondu aux questions et Claude les a vérifiées
