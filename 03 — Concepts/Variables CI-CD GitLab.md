---
type: concept
domain: devops
module: "[[Module 14 - DevOps et déploiement]]"
status: a-decouvrir
level: intermediaire
prerequisites:
  - "[[Pipeline GitLab CI]]"
parents:
  - "[[Pipeline GitLab CI]]"
related:
  - "[[Nexus]]"
next_review: 
method: []
tags:
  - concept
  - devops
---
# Variables CI-CD GitLab

> [!info] En une phrase
> Des valeurs que GitLab injecte dans les jobs : certaines sont fournies par GitLab, les secrets se rangent dans les paramètres du projet, jamais dans le .gitlab-ci.yml.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
Dans un `script:`, une variable se lit comme en shell : `$NOM`. Il y en a trois sortes : **prédéfinies** par GitLab, déclarées dans le fichier (`variables:`), et déclarées dans le projet (*Settings > CI/CD > Variables*).

### Pourquoi ça existe
Donner à la pipeline des informations qui changent (commit, branche) ou secrètes (mots de passe, jetons) sans les écrire dans le code.

### Le problème résolu
Les mots de passe écrits dans le fichier de CI étaient lisibles par tous et restaient pour toujours dans l'historique Git.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart LR
  GL[Prédéfinies] --> J[Job]
  Y[.gitlab-ci.yml] --> J
  S[Secrets projet] --> J
```

### Exemple concret
| Variable prédéfinie | Contient |
| --- | --- |
| `$CI_COMMIT_SHORT_SHA` | l'identifiant court du commit (pratique comme tag) |
| `$CI_COMMIT_BRANCH` | la branche |
| `$CI_DEFAULT_BRANCH` | la branche par défaut |
| `$CI_PROJECT_DIR` | le dossier du dépôt dans le job |
| `$CI_REGISTRY_IMAGE` | l'adresse de l'image dans le registre GitLab du projet |

| Option d'une variable de projet | Effet |
| --- | --- |
| **Masked** | remplacée par `[MASKED]` dans les logs |
| **Protected** | existe seulement sur les branches et tags protégés |
| **Type File** | la valeur est écrite dans un fichier, la variable contient son chemin |

```yaml
variables:
  IMAGE_NAME: mon-app        # pas secret : dans le fichier
before_script:               # NEXUS_USER et NEXUS_PASSWORD : dans les paramètres du projet
  - echo "$NEXUS_PASSWORD" | docker login -u "$NEXUS_USER" --password-stdin "$NEXUS_URL"
```
La variable spéciale **`DOCKER_AUTH_CONFIG`** permet au runner de récupérer l'`image:` d'un job depuis un registre privé.

### Cas d'utilisation
- Tagger les images avec le commit
- Se connecter à un registre sans exposer le mot de passe
- Projet CVAT : partie 1 (reprendre CVAT sur GitLab, construire ses images en CI via le Nexus)

> [!warning] À ne pas confondre
> **Protected** et **Masked** : une variable protégée est **vide** sur une branche non protégée, d'où un job qui échoue sur ta branche et marche sur `main`.

## 3 · Pratiquer
- Crée une variable masquée dans un projet de test, et vérifie dans le log qu'elle apparaît comme `[MASKED]`.

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _À écrire sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Pipeline GitLab CI]]
- **Notion parente** : [[Pipeline GitLab CI]]
- **Complémentaires** : [[Nexus]]
- **Utilisé par** : [[Construire une image dans la CI]] · [[Kaniko]]
- **Commandes** : [[docker login]]

## 6 · Réviser
> [!question]- Pourquoi un secret ne va-t-il jamais dans le `.gitlab-ci.yml` ?
> Il serait lisible par toute personne ayant accès au dépôt, et resterait dans l'historique Git même après suppression.

> [!question]- Pourquoi `--password-stdin` plutôt que `-p` ?
> Le mot de passe ne passe pas dans la ligne de commande.

### Validation de la maîtrise
- [ ] Je l'explique sans notes, en 3 phrases, à quelqu'un qui ne connaît pas
- [ ] J'ai réussi un exercice qui l'utilise
- [ ] Je l'ai utilisé dans un projet
- [ ] Je sais dire quand ne pas l'utiliser (ou ce qu'il ne faut pas confondre)
