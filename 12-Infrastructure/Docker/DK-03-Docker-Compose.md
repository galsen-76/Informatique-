---
created: 2026-09-16
modified: 2026-09-16
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M11
aliases:
  - "Docker Compose"
tags:
  - infrastructure/docker/compose
parent: "[[Docker]]"
children: []
related_theory: []
related_snippets:
  - "[[04_Snippets/docker-compose-fullstack]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.docker.com/compose/"
---

# Docker Compose

> [!abstract] Introduction
> Docker Compose décrit et lance plusieurs conteneurs qui travaillent ensemble via un seul fichier et une seule commande.

> [!warning]- Prérequis
> [[DK-02-Dockerfile|Dockerfile]], [[DK-01-Fondamentaux|Fondamentaux Docker]].

---

## Théorie

> [!question]- C'est quoi ?
> ```yaml
> services:
>   frontend:
>     build: ./frontend
>     ports: ["4200:80"]
>   db:
>     image: postgres:16
> ```

> [!example]- Analogie
> Docker Compose est une partition d'orchestre : au lieu de dire à chaque musicien (conteneur) individuellement quand jouer, une seule partition coordonne tout le monde en même temps.

> [!question]- Pourquoi l'utiliser ?
> Un seul fichier versionné permet à toute l'équipe de lancer l'environnement complet (BDD incluse) en une commande.

> [!question]- Comment ça marche ?
> Chaque service communique par son NOM, via un réseau créé automatiquement — pas besoin d'adresse IP.

> [!question]- Quand l'utiliser ?
> Dès qu'un projet a plusieurs services à faire tourner ensemble (très courant en dev local).

> [!danger]- Quand NE PAS l'utiliser / Limites
> `depends_on` garantit seulement l'ORDRE de démarrage, pas que le service soit VRAIMENT prêt à recevoir des requêtes — une base de données qui met du temps à s'initialiser peut encore faire échouer les premières connexions.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Service | Un conteneur défini dans `docker-compose.yml` |
| `depends_on` | Définit l'ordre de démarrage souhaité |

---

## Points clés

- `docker-compose.yml` décrit plusieurs services à lancer ensemble
- Les services communiquent par leur NOM
- `depends_on` = ordre, pas garantie de disponibilité réelle
- `docker compose up -d` / `down` gèrent tout le cycle de vie

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Croire que `depends_on` attend que le service soit VRAIMENT opérationnel
> - Oublier `-d` et bloquer le terminal sur les logs en direct

---

## Paramètres / Configuration

| Clé YAML | Description |
|-----------|-------------|
| `services` | Liste des conteneurs |
| `build` | Depuis un Dockerfile local |
| `image` | Image existante |
| `depends_on` | Ordre de démarrage |
| `volumes` | Persistance des données |

---

## Exemple minimal

```bash
docker compose up -d
docker compose logs -f backend
docker compose down
```

> [!note] Ce que j'en retiens
> Ces 3 commandes gèrent tout le cycle de vie d'un environnement multi-services, sans longue commande `docker run` par conteneur.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Attendre qu'une BDD soit prête : `healthcheck` sur le service + `depends_on: { db: { condition: service_healthy } }` (réponse à la note brute)
> - Fichiers multiples : `compose.yaml` + `compose.override.yaml` (dev) + `compose.prod.yaml`

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Docker]]
- Sous-sujets → (aucun)
- À comparer avec → [[DK-02-Dockerfile|Dockerfile]], [[DK-05-Reseaux|Reseaux Docker]]

**Pratique :**
- Extrait de code → [[04_Snippets/docker-compose-fullstack]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> Pourrais-je expliquer pourquoi `depends_on` ne suffit pas toujours pour une base de données lente à démarrer ?

> [!faq]- Questions d'entretien
> - À quoi sert Docker Compose ?

---

## Tâches

- [ ] #task Créer un `docker-compose.yml` avec un frontend et une base de données
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Comment forcer l'attente réelle qu'une BDD soit prête avant de lancer le backend ?
