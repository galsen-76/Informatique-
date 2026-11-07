---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Runner GitLab]]"
  - "[[Pipeline GitLab CI]]"
tags:
  - exercice
---
# Exercice — Faire tourner son propre runner

> [!info] Objectif
> Installer un runner sur ta machine, l'enregistrer sur un projet de test, et voir qui exécute vraiment les jobs.
> Notions : [[Runner GitLab]] · [[Pipeline GitLab CI]]

## Consignes
- [ ] Crée un projet de test sur GitLab.com avec un `.gitlab-ci.yml` qui contient un job `qui-suis-je` : `script: [hostname, cat /etc/os-release, "echo $CI_RUNNER_DESCRIPTION"]`. Pousse et lis le journal : quel runner l'a exécuté ?
- [ ] Dans WSL avec Docker, lance le conteneur `gitlab/gitlab-runner` avec les deux volumes (configuration et socket Docker)
- [ ] Dans GitLab : *Settings → CI/CD → Runners → New project runner*, donne-lui le tag `mon-pc`, copie le jeton, puis lance `gitlab-runner register` avec l'exécuteur docker
- [ ] Vérifie dans GitLab que le runner apparaît en vert ; ouvre `config.toml` et explique chaque ligne
- [ ] Ajoute `tags: [mon-pc]` au job, pousse : le journal doit afficher ton runner et `hostname` doit renvoyer l'identifiant d'un conteneur de ton PC
- [ ] Pendant le job, lance `docker ps` dans WSL : repère le conteneur du job créé par le runner
- [ ] Mets `tags: [inexistant]` sur un job : observe l'état *pending* et le message affiché
- [ ] Arrête ton runner (`docker stop gitlab-runner`) et relance une pipeline avec `tags: [mon-pc]` : que se passe-t-il ?
- [ ] Nettoie : supprime le runner dans GitLab, puis `docker rm -f gitlab-runner`

> [!question]- Indice
> Le runner contacte GitLab, pas l'inverse : il n'a pas besoin d'être joignable depuis Internet, seulement de pouvoir sortir vers gitlab.com en HTTPS.

> [!question]- Solution
> ```yaml
> qui-suis-je:
>   image: alpine:3.20
>   tags: [mon-pc]
>   script:
>     - hostname
>     - cat /etc/os-release
>     - echo "Runner : $CI_RUNNER_DESCRIPTION"
> ```
> ```bash
> docker run -d --name gitlab-runner --restart always \
>   -v /srv/gitlab-runner/config:/etc/gitlab-runner \
>   -v /var/run/docker.sock:/var/run/docker.sock \
>   gitlab/gitlab-runner:latest
> docker exec -it gitlab-runner gitlab-runner register \
>   --url https://gitlab.com --token glrt-… --executor docker --docker-image alpine:3.20
> sudo cat /srv/gitlab-runner/config/config.toml
> docker ps        # pendant le job : un conteneur runner-…-project-…-concurrent-0
> ```
> - `hostname` affiche l'identifiant du **conteneur** créé pour le job sur ton PC : le job tourne chez toi, pas chez GitLab.
> - Avec un tag que personne n'a, le job reste *pending* : « This job is stuck because you don't have any active runners that can run this job » (ou qui ont ce tag).
> - Runner arrêté : même chose, le job attend qu'un runner avec ce tag revienne.
> - Le jeton `glrt-…` est un secret : quiconque l'a peut recevoir les jobs (et leurs variables) de ton projet.

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
