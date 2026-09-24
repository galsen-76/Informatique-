---
created: 2026-09-16
modified: 2026-09-16
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M11
aliases:
  - "Registry & Docker Hub"
tags:
  - infrastructure/docker/registry
parent: "[[Docker]]"
children: []
related_theory: []
related_snippets: []
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.docker.com/docker-hub/"
---

# Registry & Docker Hub

> [!abstract] Introduction
> Un registry héberge des images Docker prêtes à être téléchargées ou publiées ; Docker Hub est le plus connu publiquement.

> [!warning]- Prérequis
> [[DK-01-Fondamentaux|Fondamentaux Docker]].

---

## Théorie

> [!question]- C'est quoi ?
> ```bash
> docker pull postgres:16
> docker push moncompte/mon-app:1.0
> ```

> [!example]- Analogie
> Un registry est une bibliothèque publique de recettes de cuisine (images) : tu peux emprunter (pull) une recette existante, ou déposer la tienne (push) pour que d'autres l'utilisent.

> [!question]- Pourquoi l'utiliser ?
> Partager une image déjà construite entre plusieurs machines ou membres d'équipe, sans reconstruire à chaque fois.

> [!question]- Comment ça marche ?
> Le tag (`:16`) précise la version. GitLab intègre son propre registry privé, lié aux permissions du projet (voir [[01-GitLab|Fondamentaux GitLab]]).

> [!question]- Quand l'utiliser ?
> Docker Hub pour des images officielles publiques ; registry privé pour ses propres images d'entreprise.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Utiliser `latest` (sans tag précis) en production est risqué : la version peut changer sans prévenir, cassant un déploiement qui fonctionnait la veille.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Tag | Précise la version d'une image |
| `latest` | Tag par défaut si aucun n'est précisé, risqué en production |

---

## Points clés

- `docker pull` télécharge, `docker push` publie
- Le tag précise la version, éviter `latest` en production
- GitLab intègre un Container Registry privé lié aux permissions du projet

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Utiliser `latest` en production, exposé à un changement de version imprévisible
> - Oublier `docker login` avant un `push`, provoquant une erreur d'authentification

---

## Paramètres / Configuration

| Commande | Description |
|-----------|-------------|
| `docker pull image:tag` | Télécharge une image |
| `docker push image:tag` | Publie une image |
| `docker login registry` | Authentification |

---

## Exemple minimal

```bash
docker build -t registry.gitlab.com/monequipe/cinetrack:1.0 .
docker login registry.gitlab.com
docker push registry.gitlab.com/monequipe/cinetrack:1.0
```

> [!note] Ce que j'en retiens
> Une fois publiée, cette image précise (1.0) est accessible depuis n'importe quelle machine autorisée, sans ambiguïté de version.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Politiques de nettoyage (cleanup policies) du Container Registry GitLab pour supprimer les vieux tags (réponse à la note brute)
> - Taguer par SHA de commit et par version SemVer, jamais seulement `latest`

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Docker]]
- Sous-sujets → (aucun)
- À comparer avec → [[01-GitLab|Fondamentaux GitLab]], [[03-CI-CD|CICD Pipelines GitLab]]

**Pratique :**
- Extrait de code → (aucun pour l'instant)
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> Pourrais-je expliquer pourquoi `latest` est risqué en production ?

---

## Tâches

- [ ] #task Publier une image de test sur le Container Registry GitLab
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Comment gérer le nettoyage des vieilles images accumulées sur un registry ?
