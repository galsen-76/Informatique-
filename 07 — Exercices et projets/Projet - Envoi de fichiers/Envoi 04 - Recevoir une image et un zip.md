---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Envoyer et recevoir un fichier en HTTP]]"
  - "[[Fichier en mémoire (io.BytesIO)]]"
tags:
  - exercice
  - mini-projet
---
# Envoi 04 - Recevoir une image et un zip

> [!info] Où tu en es
> **Projet :** [[Projet - Envoyer un zip ou une image en Python]]
> **Étape précédente :** [[Envoi 02 - Envoyer le zip avec requests]]
> **Cours à avoir lu :** [[Cours - Envoyer et recevoir des fichiers par HTTP]]
> **Notions validées par cette étape :** [[Envoyer et recevoir un fichier en HTTP]] · [[Fichier en mémoire (io.BytesIO)]]

## Le but
Faire le chemin inverse, comme ta fonction avec CVAT : télécharger l'image `GET /image.png` et l'enregistrer dans `recu.png`, puis télécharger `GET /export.zip` et lire `annotations.xml` **sans écrire le zip sur le disque**.

## Ce que tu fais
- [ ] Télécharge l'image et enregistre-la en utilisant `r.text`. Ouvre `recu.png` (`explorer.exe .` depuis WSL) : que se passe-t-il ? Corrige
- [ ] Avant d'enregistrer, vérifie le `Content-Type` de la réponse : si ce n'est pas une image PNG, le script s'arrête avec un message clair. Teste-le en demandant `/export.zip` à la place de l'image
- [ ] Télécharge `/export.zip` et affiche la liste de ce qu'il contient, sans créer de fichier zip
- [ ] Affiche le contenu de `annotations.xml` sous forme de texte, et la taille de `images/plan.png`
- [ ] Vérifie avec `ls` que seul `recu.png` a été créé

> [!warning] Le piège de cette étape
> `r.text` essaie de transformer les octets en caractères : l'image enregistrée est abîmée et ne s'ouvre plus. Pour un fichier, c'est `r.content`. Et un 404 ne lève pas d'exception tout seul : sans vérification, tu enregistres un message d'erreur JSON dans `recu.png`.

> [!success] Ça marche si…
> `recu.png` s'ouvre et montre un rectangle rouge de 40 × 20 pixels ; le script affiche `['annotations.xml', 'images/plan.png']`, le XML, et ne crée aucun `.zip`. Si tu demandes `/export.zip` à la place de l'image, il s'arrête avec ton message au lieu d'enregistrer un zip dans `recu.png`.

## Est-ce que j'ai compris ?
Réponds en quelques mots, en dessous, ou demande à Claude de t'interroger.
1. Pourquoi l'image enregistrée avec `r.text` était-elle cassée ?
2. Comment ton script sait-il que la réponse est bien une image, avant de l'enregistrer ?
3. Ta fonction Nuclio devra renvoyer un PNG au bouton React : que mettras-tu dans le corps de la réponse, et dans son `Content-Type` ?

> [!quote] Mes réponses
> _À écrire._

> [!question]- Indice
> La réponse a deux façons de donner son corps : en texte et en octets. Le type est dans `r.headers`. Pour lire un zip reçu sans disque, c'est l'étape 01 à l'envers : un `BytesIO` qui contient les octets reçus.

> [!question]- Solution
> ```python
> import io
> import zipfile
> import requests
>
> URL = "http://localhost:8000"
>
> r = requests.get(f"{URL}/image.png", timeout=30)
> r.raise_for_status()
> if r.headers.get("Content-Type") != "image/png":
>     raise SystemExit(f"Ce n'est pas une image PNG : {r.headers.get('Content-Type')}")
> with open("recu.png", "wb") as f:
>     f.write(r.content)
>
> r = requests.get(f"{URL}/export.zip", timeout=30)
> r.raise_for_status()
> with zipfile.ZipFile(io.BytesIO(r.content)) as z:
>     print(z.namelist())
>     print(z.read("annotations.xml").decode("utf-8"))
>     print(len(z.read("images/plan.png")), "octets d'image")
> ```
> 1. `r.text` décode les octets comme du texte : les octets qui ne sont pas des caractères valides sont remplacés, et le fichier n'est plus un PNG. `r.content` garde les octets tels quels.
> 2. Par le `Content-Type` de la réponse (et le code de statut). On peut aussi regarder les premiers octets : `\x89PNG`.
> 3. Les octets du PNG dans le corps, et `Content-Type: image/png`. Le navigateur s'en sert pour savoir qu'il reçoit une image.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] J'ai répondu aux questions et Claude les a vérifiées
