---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Appeler une API sans pip (urllib.request)]]"
tags:
  - exercice
  - mini-projet
---
# Envoi 03 - Le même envoi sans pip

> [!info] Où tu en es
> **Projet :** [[Projet - Envoyer un zip ou une image en Python]]
> **Étape précédente :** [[Envoi 02 - Envoyer le zip avec requests]] (ou [[Envoi 01 - Un zip sans toucher au disque]] si pip est bloqué)
> **Cours à avoir lu :** [[Cours - Envoyer et recevoir des fichiers par HTTP]]
> **Notions validées par cette étape :** [[Appeler une API sans pip (urllib.request)]]

## Le but
Faire un script `envoi_sans_pip.py` qui envoie le même zip **sans requests**, seulement avec la bibliothèque standard, sur `POST /brut` (le fichier seul dans le corps). C'est ce que tu pourras faire au travail sans rien installer.

## Ce que tu fais
- [ ] Envoie le zip sur `/brut` avec `urllib.request`, en donnant seulement l'URL et les données. Lis l'exception, puis ce qu'affiche le terminal du serveur : quel `Content-Type` est arrivé, alors que tu n'en as mis aucun ?
- [ ] Ton script a planté sur une exception : fais-le afficher proprement le code et le message JSON du serveur au lieu de planter
- [ ] Corrige pour que le serveur accepte, et affiche le statut et le JSON reçu (décodé en dictionnaire)
- [ ] Arrête le serveur (Ctrl+C) et relance ton script : quelle autre exception obtiens-tu ? Gère-la avec un message clair
- [ ] Bonus : envoie une chaîne de caractères au lieu des octets, et lis l'erreur

> [!warning] Le piège de cette étape
> Avec des données et sans `Content-Type`, urllib invente `application/x-www-form-urlencoded`, le type d'un formulaire texte. Et contrairement à requests, une réponse 400 **lève une exception** : le message du serveur est caché dedans.

> [!success] Ça marche si…
> Avec le serveur lancé : `200` et un JSON avec `"type_annonce": "application/zip"` et `"reconnu_comme": "zip"`. Serveur arrêté : un message du type « Serveur injoignable », pas une trace d'erreur.

## Est-ce que j'ai compris ?
Réponds en quelques mots, en dessous, ou demande à Claude de t'interroger.
1. Pourquoi le serveur a-t-il reçu un `Content-Type` que tu n'avais pas écrit ?
2. Quelle différence entre `HTTPError` et `URLError` ? Laquelle as-tu eue serveur arrêté ?
3. Qu'est-ce qui est plus simple avec requests, et pourquoi as-tu utilisé `/brut` plutôt que `/envoyer` ici ?

> [!quote] Mes réponses
> _À écrire._

> [!question]- Indice
> Une requête se prépare avec `urllib.request.Request(url, data=..., headers=..., method=...)`, puis part avec `urllib.request.urlopen(...)`. La réponse se lit avec `.read()` (des octets) et `json.loads` sait les lire. Les erreurs sont dans `urllib.error`.

> [!question]- Solution
> ```python
> import json
> import urllib.error
> import urllib.request
>
> octets = fabriquer_zip()        # recopie la fonction de l'étape 01, ou importe-la
>
> requete = urllib.request.Request(
>     "http://localhost:8000/brut",
>     data=octets,
>     headers={"Content-Type": "application/zip"},
>     method="POST",
> )
> try:
>     with urllib.request.urlopen(requete, timeout=30) as reponse:
>         print(reponse.status, json.loads(reponse.read()))
> except urllib.error.HTTPError as e:
>     print("Refusé :", e.code, e.read().decode("utf-8"))
> except urllib.error.URLError as e:
>     print("Serveur injoignable :", e.reason)
> ```
> 1. Dès qu'il y a des données sans `Content-Type`, urllib met celui d'un formulaire HTML texte. Pour un fichier, il faut toujours dire ce qu'on envoie.
> 2. `HTTPError` : le serveur a **répondu**, avec un code 4xx ou 5xx. `URLError` : il n'y a **pas eu de réponse** (serveur arrêté, mauvaise adresse, proxy). `HTTPError` est une sorte de `URLError` : il faut l'attraper en premier.
> 3. requests fabrique le multipart (`files=`), décode le JSON (`.json()`) et ne lève pas d'exception sur un 400. Avec urllib, le multipart serait à écrire à la main : un corps brut est beaucoup plus simple quand le serveur l'accepte. Une chaîne au lieu d'octets donne `TypeError` : il faut `.encode()`.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] J'ai répondu aux questions et Claude les a vérifiées
