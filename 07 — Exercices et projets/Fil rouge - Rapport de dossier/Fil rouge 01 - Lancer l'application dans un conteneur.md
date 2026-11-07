---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Docker]]"
  - "[[Démon Docker]]"
  - "[[Image Docker]]"
  - "[[Conteneur]]"
  - "[[Volume Docker]]"
tags:
  - exercice
  - fil-rouge
---
# Fil rouge 01 - Lancer l'application dans un conteneur

> [!info] Où tu en es
> **Projet :** [[Projet fil rouge - Rapport de dossier]] · **Étape du parcours :** 2 · Docker
> **Étape précédente :** rien, c'est le début
> **Cours à avoir lus :** [[Cours - Docker, les bases solides]]
> **Notions validées par cette étape :** [[Docker]] · [[Démon Docker]] · [[Image Docker]] · [[Conteneur]] · [[Volume Docker]]

## Le but
Faire tourner `app.py` **sans installer Python sur ta machine** : dans un conteneur créé à partir de l'image officielle `python:3.12-slim`, qui lit un dossier de ta machine et y dépose son rapport. Pas encore de Dockerfile.

## Ce que tu fais
- [ ] Dans WSL, crée `~/projets/rapport-dossier` avec `app.py` (code dans [[Projet fil rouge - Rapport de dossier]]) et un dossier `exemple/` contenant quelques fichiers vides de types différents
- [ ] Lance l'application dans un conteneur `python:3.12-slim`, en partageant ton dossier de projet avec le conteneur, pour qu'elle analyse `exemple/` et écrive son rapport dans un dossier `sortie/` **de ta machine**
- [ ] Lance-la une seconde fois et observe ce qui change dans les messages de Docker
- [ ] Liste les conteneurs, même arrêtés : combien y en a-t-il ? Fais en sorte que le prochain lancement ne laisse pas de conteneur derrière lui
- [ ] Arrête le moteur Docker, relance la commande, lis l'erreur, puis relance le moteur

> [!success] Ça marche si…
> `sortie/rapport.json` existe **sur ta machine** et compte bien les fichiers de `exemple/`, alors que tu n'as rien installé d'autre que Docker.

## Est-ce que j'ai compris ?
Réponds par écrit, en dessous, **sans regarder la solution**. Ensuite, demande à Claude de vérifier tes réponses.
1. Que s'est-il passé, dans l'ordre, la toute première fois que tu as lancé la commande ?
2. Pourquoi le rapport apparaît-il sur ta machine alors que le programme tournait dans le conteneur ? Que se passerait-il sans le partage de dossier ?
3. Qui a reçu ta commande `docker`, et qui a vraiment créé le conteneur ? Que dit l'erreur quand le moteur est arrêté ?
4. Quelle est la différence entre l'image `python:3.12-slim` et le conteneur que tu as lancé ?

> [!quote] Mes réponses
> _À écrire._

> [!question]- Indice
> Il te faut : l'option qui partage un dossier (`-v dossier_machine:dossier_conteneur`), le dossier de travail dans le conteneur (`-w`), la commande à lancer à la fin (`python app.py …`), et les variables `SORTIE` ou un argument pour dire où lire et écrire. L'option qui supprime le conteneur à la fin commence par deux tirets.

> [!question]- Solution
> ```bash
> cd ~/projets/rapport-dossier
> mkdir -p exemple/photos && touch exemple/a.png exemple/b.txt exemple/photos/c.png
> docker run --rm -v "$PWD":/projet -w /projet -e SORTIE=/projet/sortie \
>   python:3.12-slim python app.py /projet/exemple
> cat sortie/rapport.json
> docker ps -a
> ```
> 1. Docker ne trouve pas l'image en local → il la télécharge depuis Docker Hub → crée un conteneur → lance `python app.py` → le programme se termine, le conteneur s'arrête. La 2e fois : pas de téléchargement.
> 2. `-v` relie ton dossier au dossier `/projet` du conteneur : ce que le programme écrit dans `/projet/sortie` arrive chez toi. Sans lui, le rapport resterait dans le conteneur et disparaîtrait avec lui.
> 3. Le client `docker` a envoyé l'ordre au **démon** Docker, qui a créé le conteneur. Moteur arrêté : `Cannot connect to the Docker daemon`.
> 4. L'image est le modèle figé (Debian + Python) ; le conteneur est une exécution de ce modèle, jetable. Sans `--rm`, chaque lancement laisse un conteneur arrêté.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] J'ai répondu aux questions et Claude les a vérifiées
