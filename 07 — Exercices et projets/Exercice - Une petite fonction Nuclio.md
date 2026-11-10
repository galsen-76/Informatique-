---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Serverless et FaaS]]"
tags:
  - exercice
  - mini-projet
---
# Exercice - Une petite fonction Nuclio

> [!info] Où tu en es
> **Fiche à avoir lue :** [[Serverless et FaaS]], surtout « Nuclio, pièce par pièce » et « `init_context`, `handler`, `context`, `event` »
> **Notion validée par cet exercice :** [[Serverless et FaaS]]
> **Ce qu'il faut savoir déjà :** lancer CVAT avec Nuclio (le compose `serverless`) et utiliser curl. `function.yaml` est fourni.
> **Où le faire :** sur ton PC, avec CVAT et Nuclio lancés. Tu crées une fonction d'essai, que tu supprimes à la fin.

## Le but
Avant de déboguer `convert-png`, tu observes le modèle serverless sur une fonction **minuscule** : `miroir`. Elle renvoie en JSON ce qu'elle a reçu, et qui l'a traité. Tu vas voir de tes yeux ce que contient `event`, combien de fois `init_context` tourne, pourquoi une fonction ne doit rien garder entre deux appels, et où vont les logs et les erreurs.

## Les fichiers de départ
Dans `~/projets/miroir`. `function.yaml` est fourni, `main.py` est à écrire.

`function.yaml`
```yaml
metadata:
  name: miroir
  namespace: cvat
  annotations:
    name: Miroir (essai)
    type: external    # à garder : sans annotations, CVAT risque de ne plus réussir à lister ses fonctions

spec:
  description: Fonction d'essai qui renvoie ce qu'elle reçoit
  runtime: 'python:3.11'
  handler: main:handler
  eventTimeout: 30s

  env:
    - name: SALUTATION
      value: Bonjour

  build:
    baseImage: python:3.11-slim

  triggers:
    myHttpTrigger:
      kind: 'http'
      numWorkers: 2
      attributes:
        port: 32050
```

> [!tip] Au travail
> Docker Hub est bloqué : préfixe `baseImage` avec le Nexus, comme dans [[Fiche - Images Docker au travail via le Nexus]]. Si le déploiement échoue sur une autre image, c'est le même problème de proxy.

## Ce que tu fais
- [ ] Écris `main.py` : `init_context` note dans `context.user_data` l'heure de démarrage et un compteur à 0, et écrit une ligne de log. `handler` augmente le compteur, attend 2 secondes, puis renvoie en JSON : la méthode, le chemin, `event.fields`, le **type** de `event.body` (son nom), le corps (en texte si ce sont des octets), le PID du processus (`os.getpid()`), le compteur, l'heure de démarrage et la variable `SALUTATION`
- [ ] Déploie la fonction avec `nuctl` et vérifie qu'elle apparaît comme prête. Corrige jusqu'à ce que ce soit le cas
- [ ] Appelle-la de quatre façons et compare `body_type` et `fields` : un `GET` avec `?job_id=3&folio=2` ; un `POST` de JSON **avec** `Content-Type: application/json` ; le même JSON **sans** cet en-tête ; un `POST` d'un petit fichier binaire (une image)
- [ ] Appelle-la 5 fois **l'une après l'autre**, puis 6 fois **en même temps**. Avant de lancer, écris ce que tu prévois pour le PID et le compteur. Puis compare
- [ ] Trouve les logs de la fonction (la ligne écrite par `init_context` et celles des appels). Combien de fois vois-tu la ligne de `init_context` ?
- [ ] Redéploie en changeant `SALUTATION` **sans** toucher à `function.yaml` ni au code
- [ ] Fais planter `handler` exprès quand `event.fields` contient `casse=1`. Quel statut reçoit curl, et où trouves-tu la trace de l'erreur ? Retire le plantage
- [ ] Supprime la fonction et vérifie que son conteneur a disparu

> [!warning] Les pièges de cet exercice
> - `event.body` n'a pas toujours le même type : `json.dumps` ne sait pas écrire des octets.
> - Appels « l'un après l'autre » et appels « en même temps » ne donnent pas le même résultat.
> - Le port `32050` est celui du **conteneur de la fonction**, pas celui du dashboard (`8070`).

> [!success] Ça marche si…
> Tu as un tableau des quatre appels (`body_type`, `fields`), tu as vu **deux PID différents** avec deux compteurs séparés lors des appels simultanés, tu as changé `SALUTATION` au déploiement, et la fonction est supprimée.

## Est-ce que j'ai compris ?
Réponds en quelques mots, en dessous, ou demande à Claude de t'interroger.
1. Quand `event.body` est-il un `dict`, et quand des `bytes` ? Qu'est-ce que ça change pour `convert-png` si le bouton oublie l'en-tête ?
2. `event.fields` contient-il le corps de la requête ? D'où viennent ses valeurs ?
3. Pourquoi les appels l'un après l'autre montraient-ils (souvent) un seul PID, et les appels simultanés deux ?
4. Pourquoi un compteur dans `user_data` est-il faux ? Qu'en déduis-tu pour les fichiers temporaires de `convert-png` ?
5. Pourquoi passer un mot de passe par `--env` au déploiement plutôt que dans `function.yaml` ?
6. Dans « Models » de CVAT, verras-tu `miroir` ? Pourquoi ? (voir le tableau « Deux façons d'appeler une fonction »)

> [!quote] Mes réponses
> _À écrire._

> [!question]- Indice
> Le corps : `isinstance(event.body, bytes)`, puis `.decode(errors="replace")` pour l'afficher. La réponse : `context.Response(body=json.dumps(...), content_type="application/json", status_code=200)`. Pour lancer des appels en même temps en Bash, termine chaque commande par `&` et attends-les toutes avec `wait`. Nuclio crée **une copie de ton code par worker** : chacune a son propre `init_context`.

> [!question]- Solution
> ```python
> import json
> import os
> import time
> from datetime import datetime
>
> def init_context(context):
>     context.user_data.demarrage = datetime.now().isoformat(timespec="seconds")
>     context.user_data.compteur = 0
>     context.logger.info(f"init_context, PID {os.getpid()}")
>
> def handler(context, event):
>     if event.fields.get("casse") == "1":
>         raise RuntimeError("plantage voulu")
>     context.user_data.compteur += 1
>     time.sleep(2)
>     corps = event.body
>     if isinstance(corps, bytes):
>         corps = corps.decode(errors="replace")[:80]
>     reponse = {
>         "methode": event.method,
>         "chemin": event.path,
>         "fields": dict(event.fields),
>         "body_type": type(event.body).__name__,
>         "body": corps,
>         "pid": os.getpid(),
>         "compteur": context.user_data.compteur,
>         "demarrage": context.user_data.demarrage,
>         "salutation": os.environ.get("SALUTATION"),
>     }
>     context.logger.info(f"appel {reponse['compteur']} sur PID {reponse['pid']}")
>     return context.Response(body=json.dumps(reponse), content_type="application/json", status_code=200)
> ```
> ```bash
> nuctl deploy --project-name cvat --path . --file function.yaml --platform local
> nuctl get function --platform local
>
> F=http://localhost:32050
> curl -s "$F/?job_id=3&folio=2"
> curl -s -H "Content-Type: application/json" -d '{"job_id": 3}' $F
> curl -s -d '{"job_id": 3}' $F                       # body_type : bytes
> curl -s --data-binary @image.png $F                 # bytes
>
> for i in 1 2 3 4 5; do curl -s $F; echo; done                # l'un après l'autre
> for i in 1 2 3 4 5 6; do curl -s $F & done; wait             # en même temps
>
> docker ps --format '{{.Names}}' | grep miroir       # nom du conteneur
> docker logs <nom du conteneur>
>
> nuctl deploy --project-name cvat --path . --file function.yaml --platform local --env SALUTATION=Salut
> curl -s "$F/?casse=1" -o /dev/null -w "%{http_code}\n"    # 500, trace dans docker logs
> nuctl delete function miroir --platform local
> ```
> 1. Un `dict` seulement si le `Content-Type` est exactement `application/json`, sinon des `bytes`. Si le bouton oublie l'en-tête, `body["job_id"]` plante : d'où le `json.loads` de secours dans `convert-png`.
> 2. Non : ce sont les paramètres de l'URL (après `?`). Le corps est dans `event.body`.
> 3. Nuclio donne l'appel au premier worker **libre**. L'un après l'autre, le premier est toujours libre, donc il prend tout. En même temps, le premier est occupé (2 secondes d'attente), donc le second travaille aussi.
> 4. Chaque worker a son propre `user_data` : deux compteurs qui comptent chacun une partie des appels. Et après un redéploiement, tout repart à zéro. Rien ne doit durer d'un appel à l'autre dans la fonction : d'où un dossier temporaire neuf par appel dans `convert-png`.
> 5. `function.yaml` est dans le dépôt Git et lisible par tous. `--env` donne la valeur au moment du déploiement, depuis ton terminal (ou une variable masquée de la CI), sans qu'elle soit écrite dans un fichier.
> 6. Non. Son `type` (`external`) n'est pas un type connu de CVAT (`detector`, `interactor`, `tracker`…) : CVAT l'écarte de la liste. Comme `convert-png`, elle ne s'appelle qu'en direct, sur son port. Sans aucune annotation, en revanche, le code de CVAT qui lit la liste des fonctions risque de planter : d'où les deux lignes fournies.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] J'ai répondu aux questions et Claude les a vérifiées
