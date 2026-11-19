---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[Proxy]]"
tags:
  - exercice
  - mini-projet
---
# Exercice - Le proxy de l'entreprise

> [!info] Où tu en es
> **Étape du parcours :** 3 · Réseau ([[Parcours - Python, Docker et CI]])
> **Cours à avoir lu :** [[Cours - Ports, proxy et reverse proxy]]
> **Notion validée par cet exercice :** [[Proxy]]
> **Où le faire :** sur ton **PC du travail**, branché au réseau de l'entreprise. Rien n'est installé ni modifié sur ta machine.

## Le but
Au travail, `docker pull` vers Docker Hub échoue, alors que le Nexus répond. Tu vas **dessiner la carte** du chemin que prennent tes requêtes : comment ton poste trouve le proxy, ce que le proxy laisse passer, et qui te répond vraiment. À la fin, tu dois pouvoir expliquer l'erreur Docker Hub à un collègue.

## Ce que tu fais
- [ ] Trouve dans les **paramètres de Windows** (Réseau et Internet, puis Proxy) comment ton poste connaît le proxy : réglage manuel, script de configuration (fichier PAC), ou rien du tout. Note ce que tu trouves
- [ ] Si c'est un script PAC : ouvre son adresse dans ton navigateur et lis-le. Trouve ce qu'il répond pour une adresse sur Internet, et ce qu'il répond pour une adresse interne. Repère le nom et le port du proxy
- [ ] Regarde si un logiciel de proxy tourne sur ton poste (icône près de l'horloge, par exemple Zscaler)
- [ ] Dans **PowerShell**, interroge les deux registres et compare les réponses (code et texte) :
  ```powershell
  curl.exe -sI https://registry-1.docker.io/v2/
  curl.exe -sI https://vortex-nexus.assystem.com:5000/v2/
  ```
  Si l'un des deux ne répond pas du tout, recommence en ajoutant `--proxy http://<nom>:<port>` avec le proxy que tu as trouvé
- [ ] Dans **WSL**, regarde si des variables de proxy existent. Relance les deux mêmes `curl` (sans `.exe`) et compare avec PowerShell
- [ ] Écris ta carte dans « Mes réponses » : un petit schéma (ou 4 lignes) qui part de ton poste et va jusqu'à Docker Hub et jusqu'au Nexus

> [!warning] Le piège de cet exercice
> Deux codes se ressemblent : `401 Unauthorized` et `407 Proxy Authentication Required`. Ils ne viennent **pas** du même programme. Regarde bien lequel tu reçois pour chaque registre avant de conclure.

> [!danger] Ne jamais noter de mot de passe
> Si le proxy demande ton identifiant, ne l'écris ni dans ce coffre, ni dans un script, ni dans un Dockerfile : ce dépôt est sur GitHub.

> [!success] Ça marche si…
> Tu sais dire, pour Docker Hub et pour le Nexus, **qui** t'a répondu (le proxy ou le vrai serveur), et **pourquoi**.

## Est-ce que j'ai compris ?
Réponds en quelques mots, en dessous, ou demande à Claude de t'interroger.
1. Pour Docker Hub, qui t'a répondu : Docker Hub ou le proxy ? À quoi le vois-tu ?
2. Le navigateur suit le réglage de Windows. Est-ce que `curl` dans WSL le suit aussi ? Qu'est-ce que ça explique ?
3. Pourquoi le Nexus règle-t-il le problème de Docker Hub, sans toucher au proxy ?
4. Un collègue dit « le proxy, c'est l'API de l'entreprise pour aller sur Internet ». Qu'est-ce qui est faux ?

> [!quote] Mes réponses
> _À écrire._

> [!question]- Indice
> Un code `407` vient toujours d'un **proxy** : c'est lui qui veut savoir qui tu es avant de faire la requête à ta place. Un `401` vient du **serveur que tu appelles** : il a bien reçu ta requête et te demande de te connecter. Un script PAC est une fonction qui renvoie `DIRECT` (y aller sans proxy) ou `PROXY nom:port`.

> [!question]- Solution
> Exemple de carte (à adapter à ce que tu as trouvé) :
> ```text
> Navigateur  --(réglage Windows ou PAC)-->  Proxy  --(filtre)-->  Docker Hub : bloqué ou 407
> curl WSL    --(pas de variable)--------->  essaie de sortir seul : délai dépassé
> Docker      --(réseau interne)---------->  Nexus :5000 : 401, normal pour un registre
> ```
> 1. Docker Hub ne t'a jamais vu : c'est le **proxy** qui a répondu. Le `407` (ou une page de blocage, ou une coupure) le prouve, car un vrai registre répond `401` sur `/v2/`.
> 2. Non. Les outils en ligne de commande ne lisent pas le PAC : ils ne connaissent que `HTTPS_PROXY` et `NO_PROXY` (ou leur propre réglage, comme Docker Desktop). C'est pour ça qu'une page s'ouvre dans le navigateur alors que `pip` ou `docker pull` échouent.
> 3. Le Nexus est **dans** le réseau de l'entreprise : ton poste le joint sans passer par le proxy. C'est lui, avec ses propres droits, qui télécharge les images sur Internet et en garde une copie.
> 4. Une API **offre un service** et décide de la réponse. Le proxy ne produit rien : il **fait la requête à ta place** vers un autre serveur, et au passage il filtre, journalise et met en cache. C'est un intermédiaire, pas un service.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] J'ai répondu aux questions et Claude les a vérifiées
