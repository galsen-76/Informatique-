---
type: concept
module: "[[Module 14 - DevOps et déploiement]]"
related:
  - "[[Registre Docker]]"
tags:
  - concept
  - devops
---
# Kaniko

> [!info] En une phrase
> Un outil qui construit une image à partir d'un Dockerfile sans démon Docker : l'alternative à Docker-in-Docker quand le runner n'est pas privilégié.

## 1 · Comprendre
### Définition
**Kaniko** lit le [[Dockerfile]], exécute chaque instruction dans son propre conteneur et pousse le résultat dans le registre. Une seule commande : `/kaniko/executor`.

### Pourquoi ça existe
Construire des images dans une CI où l'on n'a pas le droit de lancer Docker (fréquent en entreprise et sur Kubernetes).

### Le problème résolu
Sans runner privilégié, Docker-in-Docker est impossible, donc pas de build d'image du tout.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart LR
  DF[Dockerfile + code] --> K["/kaniko/executor/"] -- push direct --> R[(Registre)]
```

### Exemple concret
```yaml
build-image:
  image:
    name: gcr.io/kaniko-project/executor:debug   # la variante debug a un shell, nécessaire à GitLab
    entrypoint: [""]
  script:
    - /kaniko/executor
      --context "$CI_PROJECT_DIR"
      --dockerfile "$CI_PROJECT_DIR/Dockerfile"
      --destination "$CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA"
```

| | Docker-in-Docker | Kaniko |
| --- | --- | --- |
| Runner privilégié | oui | non |
| Connexion au registre | `docker login` | fichier `/kaniko/.docker/config.json` |
| Variables de build | `--build-arg` | `--build-arg` |

### Cas d'utilisation
- Construire une image sur un runner non privilégié

> [!warning] À ne pas confondre
> Kaniko **ne lance pas** de conteneurs : il ne sert qu'à construire et pousser. Pour exécuter l'image, il faut Docker ailleurs.

## 3 · Relier
- **Au travail** : [Kaniko au travail](obsidian://open?vault=Travail&file=Kaniko%20au%20travail)
- **Prérequis** : [[Construire une image dans la CI]]
- **Notion parente** : [[Construire une image dans la CI]]
- **Complémentaires** : [[Registre Docker]] · [[Variable de build Docker (ARG)]]
