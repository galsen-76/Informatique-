---
type: error
tool: CVAT SDK
date: 2026-11-12
concepts:
  - "[[SDK]]"
  - "[[Version sémantique (semver)]]"
  - "[[pip]]"
tags:
  - erreur
---
# Erreur — SDK CVAT, RqId attendu mais str reçu

> [!bug] Message
> ```text
> (E) .connection-manager.event Erreur lors du traitement : Invalid type for variable 'received_data'.
> Required value type is RqId and passed type was str at ['received_data']
> ```

## Contexte
La fonction démarre enfin, mais l'export des annotations échoue. Le début (`Erreur lors du traitement :`) vient de mon `except`, la suite est le message de l'exception.

## Lecture
- **Pas de nom de fichier à moi** : le texte `Invalid type for variable … Required value type is …` est typique d'un **SDK généré** à partir d'une description d'API. Il vérifie la forme de chaque réponse.
- Traduction : « le serveur devait renvoyer un objet `RqId` (`{"rq_id": "…"}`), il a renvoyé du texte ».
- **Qui corriger** : ni mon code ni le serveur, mais **l'accord entre les deux** : la version du SDK.

## Cause
Le SDK et le serveur ne décrivent plus la réponse de la même façon. En local, le venv avait la version du serveur ; l'image, reconstruite depuis un `requirements.txt` sans version, avait pris la dernière.

## Solution
1. Comparer :
   ```bash
   grep -i cvat requirements.txt
   docker exec <conteneur> pip show cvat-sdk | grep Version
   ```
2. Épingler dans `requirements.txt` la version **du serveur** : `cvat-sdk==<version du serveur>`, puis redéployer.
3. Si les versions sont identiques : regarder ce que le serveur a vraiment renvoyé (souvent un message d'erreur en texte, par exemple un token refusé).

> [!tip] Prévenir
> Toujours épingler la version d'un SDK qui parle à un serveur précis.

## Ce que j'ai appris
-

Méthode : [[Fiche - Lire un message d'erreur]]
