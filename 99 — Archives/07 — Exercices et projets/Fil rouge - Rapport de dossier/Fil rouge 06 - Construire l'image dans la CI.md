---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Construire une image dans la CI]]"
  - "[[Kaniko]]"
  - "[[Registre Docker]]"
  - "[[Nexus]]"
tags:
  - exercice
  - fil-rouge
---
# Fil rouge 06 - Construire l'image dans la CI

> [!info] Où tu en es
> **Projet :** [[Projet fil rouge - Rapport de dossier]] · **Étape du parcours :** 5 · GitLab CI
> **Étape précédente :** [[Fil rouge 05 - Première pipeline, les tests]]
> **Cours à avoir lus :** [[Cours - Construire et publier les images d'un projet avec GitLab CI]]
> **Notions validées par cette étape :** [[Construire une image dans la CI]] · [[Kaniko]] · [[Registre Docker]] · [[Nexus]]

## Le but
Ne plus construire l'image sur ton PC : la pipeline la construit et la range dans le **registre** de ton projet GitLab, avec un tag qui dit de quel commit elle vient.

## Ce que tu fais
- [ ] Ajoute un stage `build` après `test`, avec un job qui construit l'image à partir de ton Dockerfile
- [ ] Pousse l'image dans le registre du projet, taguée avec l'identifiant court du commit
- [ ] Retrouve l'image dans GitLab (Déployer > Registre de conteneurs), puis télécharge-la sur ton PC et lance-la
- [ ] Quand la pipeline tourne pour un **tag Git**, pousse aussi l'image avec le nom du tag (`v0.1.0`)
- [ ] Écris en commentaire dans le fichier ce qu'il faudrait changer si ton entreprise impose de passer par Nexus

> [!success] Ça marche si…
> Le registre du projet contient `rapport-dossier:<commit>`, et `docker run` de cette image sur ton PC produit le même rapport qu'en local.

## Est-ce que j'ai compris ?
Réponds par écrit, en dessous, **sans regarder la solution**. Ensuite, demande à Claude de vérifier tes réponses.
1. Pourquoi construire une image dans un job est-il plus compliqué que lancer `pytest` ? Quel est le problème du « Docker dans Docker » ?
2. Qu'est-ce que Kaniko fait différemment de `docker build` ?
3. Pourquoi taguer l'image avec le commit plutôt qu'avec `latest` ?
4. Où se connecte le job pour avoir le droit de pousser, et d'où viennent les identifiants ?

> [!quote] Mes réponses
> _À écrire._

> [!question]- Indice
> Le job a besoin d'un moteur Docker : soit un service `docker:dind`, soit Kaniko, qui construit sans démon. Le registre du projet et ses identifiants sont fournis par des variables `CI_REGISTRY…`. Cherche aussi la variable qui contient le nom d'un tag Git.

> [!question]- Solution
> Avec Docker-in-Docker :
> ```yaml
> stages: [test, build]
>
> construire:
>   stage: build
>   image: docker:27
>   services: [docker:27-dind]
>   script:
>     - docker login -u "$CI_REGISTRY_USER" -p "$CI_REGISTRY_PASSWORD" "$CI_REGISTRY"
>     - docker build -t "$CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA" .
>     - docker push "$CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA"
>     - |
>       if [ -n "$CI_COMMIT_TAG" ]; then
>         docker tag "$CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA" "$CI_REGISTRY_IMAGE:$CI_COMMIT_TAG"
>         docker push "$CI_REGISTRY_IMAGE:$CI_COMMIT_TAG"
>       fi
> ```
> Avec Kaniko, sans démon (le projet Kaniko d'origine est archivé, des versions maintenues existent) :
> ```yaml
> construire:
>   stage: build
>   image: { name: gcr.io/kaniko-project/executor:debug, entrypoint: [""] }
>   script:
>     - /kaniko/executor --context "$CI_PROJECT_DIR" --destination "$CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA"
> ```
> Nexus : `FROM nexus.entreprise.fr/docker-hub/python:3.12-slim` dans le Dockerfile, et pousser vers le registre Nexus avec ses identifiants rangés dans les variables CI-CD.
> 1. Le job tourne déjà dans un conteneur, sans moteur Docker : il faut lui en donner un (service `dind`, qui demande des droits élevés) ou utiliser un outil qui s'en passe.
> 2. Kaniko lit le Dockerfile et construit les couches lui-même, sans démon ni droits spéciaux.
> 3. Le commit identifie **exactement** ce qui est dans l'image ; `latest` change de sens à chaque push.
> 4. `docker login` vers `$CI_REGISTRY`, avec `$CI_REGISTRY_USER` et `$CI_REGISTRY_PASSWORD`, créés par GitLab pour chaque job.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] J'ai répondu aux questions et Claude les a vérifiées
- [ ] Commit poussé sur GitLab
