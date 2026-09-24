---
created: 2026-09-16
modified: 2026-09-16
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M11
aliases:
  - "Fondamentaux Docker"
tags:
  - infrastructure/docker/fondamentaux
parent: "[[Docker]]"
children:
  - "[[DK-02-Dockerfile|Dockerfile]]"
  - "[[DK-03-Docker-Compose|Docker Compose]]"
related_theory: []
related_snippets: []
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.docker.com/get-started/"
---

# Fondamentaux Docker

> [!abstract] Introduction
> Docker empaquette une application avec tout ce dont elle a besoin dans un "conteneur" qui tourne de façon identique sur n'importe quelle machine.

> [!warning]- Prérequis
> [[PY-13-Environnements-Virtuels-Pip|notion d'isolation]] aide à comprendre le principe, mais aucun prérequis technique strict.

---

## Théorie

> [!question]- C'est quoi ?
> Une image est un modèle figé ; un conteneur est une instance en cours d'exécution de cette image.

> [!example]- Analogie
> Une image est une recette de cuisine écrite. Un conteneur est le plat effectivement cuisiné à partir de cette recette — on peut cuisiner plusieurs plats identiques (conteneurs) à partir de la même recette (image).

> [!question]- Pourquoi l'utiliser ?
> Éliminer le "ça marche sur ma machine" : l'image contient tout ce qui est nécessaire, le conteneur se comporte identiquement partout.

> [!question]- Comment ça marche ?
> ```bash
> docker build -t mon-app .
> docker run mon-app
> ```
> Contrairement à une VM, un conteneur partage le noyau du système hôte — plus léger et rapide à démarrer.

> [!question]- Quand l'utiliser ?
> Garantir un comportement identique dev/prod, isoler plusieurs services sur une même machine, simplifier l'onboarding.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Un conteneur est éphémère : tout ce qui y est écrit disparaît à sa suppression, SAUF utilisation d'un volume (voir [[DK-04-Volumes|Volumes Docker]]) — ne jamais y stocker de données critiques sans volume.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Image | Modèle figé décrivant le contenu d'un conteneur |
| Conteneur | Instance en cours d'exécution d'une image |
| Noyau (kernel) | Cœur du système d'exploitation, partagé par les conteneurs |

---

## Points clés

- Image = modèle figé, conteneur = instance en exécution
- Docker partage le noyau de l'hôte, contrairement à une VM complète
- `docker build` crée une image, `docker run` démarre un conteneur
- Un conteneur est éphémère par nature

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Stocker des données importantes DANS un conteneur sans volume, les perdant à sa suppression
> - Confondre image et conteneur dans le vocabulaire, source de confusion en lisant la doc

---

## Paramètres / Configuration

| Commande | Description |
|-----------|-------------|
| `docker build -t nom .` | Construit une image |
| `docker run nom` | Démarre un conteneur |
| `docker ps` | Liste les conteneurs actifs |
| `docker images` | Liste les images locales |

---

## Exemple minimal

```bash
docker run --rm -it node:22 node --version
```

> [!note] Ce que j'en retiens
> Node.js s'exécute dans un conteneur isolé, sans jamais avoir été installé sur la machine hôte elle-même.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Sur Mac/Windows, Docker Desktop fait tourner une VM Linux légère : les conteneurs partagent le noyau de CETTE VM (réponse à la note brute)
> - Scanner les images (Trivy, Docker Scout) et utiliser des images de base minimales

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Docker]]
- Sous-sujets → [[DK-02-Dockerfile|Dockerfile]], [[DK-03-Docker-Compose|Docker Compose]]
- À comparer avec → [[PY-13-Environnements-Virtuels-Pip|Environnements Virtuels et Pip]]

**Pratique :**
- Extrait de code → (aucun pour l'instant)
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> Pourrais-je expliquer la différence image/conteneur avec l'analogie recette/plat, sans le mot "Docker" ?

> [!faq]- Questions d'entretien
> - Différence entre un conteneur et une machine virtuelle ?

---

## Tâches

- [ ] #task Installer Docker Desktop et lancer un premier conteneur
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Sur Mac Apple Silicon, Docker utilise-t-il une VM en coulisses malgré le discours "plus léger" ?
