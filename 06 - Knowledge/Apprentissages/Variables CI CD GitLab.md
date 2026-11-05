---
type: knowledge
category: apprentissages
source: "https://docs.gitlab.com/ee/ci/variables/"
created: 2026-11-05
tags:
  - knowledge
  - gitlab-ci
---
# Variables CI CD GitLab

> [!tip] À retenir
> Les variables CI/CD sont des valeurs que GitLab injecte dans les jobs : certaines sont fournies par GitLab, les secrets se rangent dans les paramètres du projet, jamais dans le .gitlab-ci.yml.

## Le problème
**Pourquoi ça existe ?**
Pour que la pipeline connaisse des informations qui changent (commit, branche) ou qui sont secrètes (mots de passe, jetons) sans les écrire dans le code.

**Qu'est-ce qui se passait sans ça ?**
Les mots de passe étaient écrits dans le fichier de CI, lisibles par toute personne ayant accès au dépôt et conservés pour toujours dans l'historique Git.

## Points clés
Dans un `script:`, une variable se lit comme en shell : `$NOM`.

**Prédéfinies par GitLab** :

| Variable | Contient |
| --- | --- |
| `$CI_COMMIT_SHORT_SHA` | l'identifiant court du commit (pratique comme tag d'image) |
| `$CI_COMMIT_BRANCH` | la branche |
| `$CI_DEFAULT_BRANCH` | la branche par défaut (souvent `main`) |
| `$CI_PROJECT_DIR` | le dossier où le dépôt est cloné dans le job |
| `$CI_REGISTRY`, `$CI_REGISTRY_IMAGE` | l'adresse du registry GitLab et de l'image du projet |

**Dans le fichier** (`variables:`) : seulement ce qui n'est pas secret.

**Dans le projet** (*Settings > CI/CD > Variables*), pour les secrets :

| Option | Effet |
| --- | --- |
| **Masked** | la valeur est remplacée par `[MASKED]` dans les logs |
| **Protected** | la variable n'existe que sur les branches et tags protégés |
| **Type File** | GitLab écrit la valeur dans un fichier, la variable contient son chemin |

La variable spéciale **`DOCKER_AUTH_CONFIG`** permet au runner de récupérer l'`image:` d'un job depuis un registre privé.

## Exemple
```yaml
variables:
  IMAGE_NAME: mon-app        # pas secret : dans le fichier

before_script:               # NEXUS_USER et NEXUS_PASSWORD : dans Settings > CI/CD > Variables
  - echo "$NEXUS_PASSWORD" | docker login -u "$NEXUS_USER" --password-stdin "$NEXUS_URL"
```

## Points d'attention
- **Un secret dans le `.gitlab-ci.yml` est un secret publié** : il reste dans l'historique Git même après suppression.
- **Protected + branche non protégée = variable vide** : le job échoue sur une branche de travail alors qu'il marche sur `main`.
- **Masked a des conditions** (longueur minimale, caractères interdits) : si GitLab refuse de masquer, change le format du secret plutôt que de décocher l'option.
- **Préférer `--password-stdin` à `-p`** pour `docker login` : le mot de passe ne passe pas dans la ligne de commande.

## Avec mes mots
*Explique avec tes mots, comme à un collègue : ce que tu as compris, et ce qui reste flou.*


## Liens
- Prérequis : [[Pipeline GitLab CI]]
- Voir aussi : [[Nexus et proxy d'images Docker]], [[Construire une image Docker dans GitLab CI]]
- Utilisé dans : projet CVAT (CI GitLab + Nexus)
