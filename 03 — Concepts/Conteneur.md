---
type: concept
domain: devops
module: "[[Module 13 - Docker]]"
status: en-cours
level: intermediaire
niveau: 1
schema: false
exercice_visuel: false
fil_rouge: false
prerequisites:
  - "[[Image Docker]]"
parents:
  - "[[Docker]]"
related:
  - "[[Volume Docker]]"
  - "[[Démon Docker]]"
next_review: 
tags:
  - concept
  - devops
---
# Conteneur

> [!info] En une phrase
> Une instance isolée et jetable d'une image Docker, en cours d'exécution : un processus dans sa bulle.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
Un **conteneur** a son propre système de fichiers, ses processus et son réseau, mais partage le noyau de la machine hôte. On peut en lancer plusieurs à partir de la même image.

Concrètement, c'est **un processus** (ton script, un serveur) lancé dans une bulle isolée, avec une couche **modifiable** posée sur l'image en lecture seule.

### Pourquoi ça existe
Lancer une application dans un environnement propre et identique à chaque fois, sans rien installer sur la machine.

### Le problème résolu
Les applications installées directement sur une machine se marchent dessus (versions, ports, fichiers) et laissent des traces quand on les retire.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  C[Créé] --> R[En marche]
  R --> E[Arrêté]
  E --> S[Supprimé]
```
- Un conteneur **vit tant que son processus principal** (le `CMD`) tourne. Un script Python qui se termine arrête le conteneur : c'est normal.
- Son **code de sortie** est celui du processus (`Exited (0)` = succès), voir [[Code de sortie]].
- Ce qu'il écrit dans sa couche disparaît avec lui : les données à garder vont dans un [[Volume Docker]].
- Il ne voit **pas** les fichiers de ta machine, sauf ceux que tu montes avec `-v`.

### Exemple concret
```bash
docker run --rm python:3.12-slim python -c "print('bonjour')"   # lance, affiche, se supprime
docker run -it --rm python:3.12-slim bash                        # un shell dedans pour explorer
docker run -d --name web -p 8080:80 nginx                        # en arrière-plan
docker ps -a                       # tous les conteneurs, même arrêtés, avec leur état
docker logs web                    # ce qu'il a affiché
docker exec -it web sh             # ouvrir un shell dans un conteneur qui tourne
docker stop web && docker rm web   # arrêter puis supprimer
```

| Option de `docker run` | Rôle |
| --- | --- |
| `--rm` | supprime le conteneur quand il s'arrête |
| `-it` | interactif avec un terminal (pour un shell) |
| `-d` | en arrière-plan |
| `-e NOM=valeur` | une [[Variable d'environnement]] |
| `-v hôte:conteneur` | monter un dossier, voir [[Volume Docker]] |
| `-p hôte:conteneur` | publier un [[Port]] |

### Cas d'utilisation
- Lancer un script une fois sur des fichiers (`--rm`)
- Faire tourner un service (base de données, serveur web) en arrière-plan

> [!warning] À ne pas confondre
> `docker run` (crée un **nouveau** conteneur) et `docker exec` (entre dans un conteneur **qui tourne déjà**). Et un conteneur arrêté n'est pas supprimé : `docker ps -a` le montre encore.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] 🧠 Dessine de mémoire
> Dessine ce qui se passe quand tu tapes `docker run -p 8080:80 nginx` : ton PC, le conteneur, les ports, l'image, le registre d'où elle vient.

> [!example] ⚖️ Avant / après
> Avant / après : un conteneur avec des données écrites dedans, puis après `docker rm`. Dessine ce qui reste et ce qui a disparu.

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Conteneur » et je l'intègre ici avec `![[Schéma - Conteneur.excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- [[Fil rouge 01 - Lancer l'application dans un conteneur]]

## 4 · Relier
- **Prérequis** : [[Image Docker]]
- **Complémentaires** : [[Volume Docker]] · [[Port]] · [[Variable d'environnement]]
- **Utilisé par** : [[Python dans Docker]] · [[Docker Compose]]
- **Commandes** : [[docker run]] · [[docker ps]]

## 5 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation (compris, puis maîtrisé)
Trois cases à cocher dans les propriétés de la fiche :
- `schema` : mon dessin du concept est dans « Mon schéma » ;
- `exercice_visuel` : j'ai fait et corrigé les exercices visuels de la section 3 ;
- `fil_rouge` : je l'ai appliqué dans le fil rouge (coché tout seul quand une étape qui l'utilise est réussie).

Les trois cochées : la notion compte comme **comprise**. **Maîtrisé** : c'est moi qui le mets dans `status`, quand je le sens.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
