---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Fichier en mémoire (io.BytesIO)]]"
tags:
  - exercice
  - mini-projet
---
# Envoi 01 - Un zip sans toucher au disque

> [!info] Où tu en es
> **Projet :** [[Projet - Envoyer un zip ou une image en Python]]
> **Étape précédente :** rien, c'est le début
> **Cours à avoir lu :** [[Cours - Envoyer et recevoir des fichiers par HTTP]]
> **Notions validées par cette étape :** [[Fichier en mémoire (io.BytesIO)]]

## Le but
Fabriquer dans `envoi.py` un zip qui contient deux petits fichiers texte (`rapport.txt` et `job.txt`, contenu de ton choix), **sans créer aucun fichier sur le disque**. Tu obtiens une variable qui contient les octets du zip, prête à être envoyée aux étapes suivantes.

## Ce que tu fais
- [ ] Écris une fonction `fabriquer_zip()` qui renvoie les octets du zip. Les deux fichiers sont écrits directement depuis du texte, pas depuis le disque
- [ ] Affiche la taille du zip et ses 4 premiers octets. Vérifie avec `ls` qu'aucun fichier n'a été créé
- [ ] Relis ces octets comme un zip (toujours sans disque) et affiche la liste de ce qu'il contient, puis le contenu de `job.txt`
- [ ] Maintenant seulement, enregistre le zip dans `test.zip` pour vérifier qu'il s'ouvre (`unzip -l test.zip`). Essaie d'abord en ouvrant le fichier en `"w"` : lis l'erreur, comprends-la, corrige
- [ ] Essaie `tampon.read()` juste après avoir fermé le `ZipFile` (sans `getvalue()`) : pourquoi obtiens-tu `b''` ? Corrige de deux façons différentes

> [!warning] Le piège de cette étape
> Un tampon est comme un fichier : après l'écriture, la « tête de lecture » est à la fin. `read()` lit depuis là, donc ne trouve rien. Et un zip, ce sont des octets : un fichier ouvert en `"w"` (texte) les refuse.

> [!success] Ça marche si…
> Le script affiche une taille (environ 200 à 300 octets), `b'PK\x03\x04'`, la liste `['rapport.txt', 'job.txt']`, et `unzip -l test.zip` montre les deux fichiers.

## Est-ce que j'ai compris ?
Réponds en quelques mots, en dessous, ou demande à Claude de t'interroger.
1. Pourquoi `getvalue()` marche toujours, alors que `read()` renvoie parfois `b''` ?
2. Quelle est la différence entre `"w"` et `"wb"`, et pourquoi un zip demande-t-il `"wb"` ?
3. Dans ta fonction Nuclio, pourquoi est-ce mieux de garder le zip en mémoire que de l'écrire dans un fichier ?

> [!quote] Mes réponses
> _À écrire._

> [!question]- Indice
> `zipfile.ZipFile` accepte un `io.BytesIO()` à la place d'un nom de fichier. `writestr(nom, texte)` ajoute un fichier à partir d'un texte. Pour relire, donne à `ZipFile` un **nouveau** `BytesIO` qui contient les octets.

> [!question]- Solution
> ```python
> import io
> import zipfile
>
> def fabriquer_zip():
>     tampon = io.BytesIO()
>     with zipfile.ZipFile(tampon, "w", zipfile.ZIP_DEFLATED) as z:
>         z.writestr("rapport.txt", "Rapport du job 12 : 3 annotations")
>         z.writestr("job.txt", "12")
>     return tampon.getvalue()
>
> octets = fabriquer_zip()
> print(len(octets), "octets", octets[:4])
>
> with zipfile.ZipFile(io.BytesIO(octets)) as z:
>     print(z.namelist())
>     print(z.read("job.txt").decode("utf-8"))
>
> with open("test.zip", "wb") as f:     # "w" → TypeError: write() argument must be str, not bytes
>     f.write(octets)
> ```
> 1. Après l'écriture, la position du tampon est à la fin : `read()` part de là. Soit `tampon.seek(0)` puis `read()`, soit `getvalue()`, qui renvoie tout le contenu quelle que soit la position.
> 2. `"w"` attend du texte (`str`) et l'encode ; `"wb"` écrit les octets tels quels. Un zip n'est pas du texte.
> 3. Pas de fichier à nommer, à nettoyer, ni de conflit si deux appels arrivent en même temps. Et un conteneur n'a pas toujours le droit d'écrire sur son disque.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] J'ai répondu aux questions et Claude les a vérifiées
