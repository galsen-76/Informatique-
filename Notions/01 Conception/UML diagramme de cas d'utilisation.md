---
type: notion
statut: a apprendre
resume: "UML est un ensemble de schémas standard pour décrire un logiciel."
revu:
sources:
  - "https://www.uml-diagrams.org/use-case-diagrams.html"
---
# UML diagramme de cas d'utilisation

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : **UML** est un ensemble de schémas standard pour décrire un logiciel.

## Le problème

**Pourquoi c'est utile ?**
Pour montrer en un schéma qui peut faire quoi avec l'application, et en discuter avec quelqu'un qui ne code pas.

**Qu'est-ce qui se passait sans ça ?**
Le périmètre restait dans la tête de chacun. On découvrait trop tard qu'un type d'utilisateur ou une action importante avait été oublié.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Le **diagramme de cas d'utilisation** est le plus simple : il montre **qui** (les acteurs) peut faire **quoi** (les cas d'utilisation) avec l'application. C'est une vue d'ensemble du périmètre, idéale pour démarrer un projet.

### Les éléments

| Élément | Représentation | Sens |
|---|---|---|
| **Acteur** | bonhomme (ici un cercle) | un **rôle** : Visiteur, Utilisateur, Admin, ou un système externe (TMDB) |
| **Cas d'utilisation** | ovale (ici un rectangle) | un **objectif** de l'acteur : « noter un film » |
| **include** | flèche pointillée | toujours inclus : noter **exige** d'être authentifié |
| **extend** | flèche pointillée | optionnel, sous condition : « afficher la bande-annonce » si elle existe |

### Les règles

- Un acteur est un **rôle**, pas une personne : toi, tu peux être Visiteur puis Utilisateur.
- Un cas = un **objectif** de l'utilisateur, pas un écran ni un clic (« Gérer ses favoris », pas « Cliquer sur le cœur »).
- Rester simple : 5 à 15 cas pour une application.

### À quoi ça sert concrètement

- Les **acteurs** deviennent tes **rôles** dans l'API (`VISITOR`, `USER`, `ADMIN`) → voir [[Middleware guards et interceptors NestJS|Guards NestJS]].
- Les **cas** deviennent tes **epics** et tes [[User stories et critères d'acceptation|user stories]].

## 🧪 Exemple

### Exemple : CinéTrack

```mermaid
flowchart LR
  V(("Visiteur")) --> R["Rechercher un film"]
  V --> F["Consulter une fiche"]
  U(("Utilisateur")) --> R
  U --> FAV["Gérer ses favoris"]
  U --> N["Noter un film"]
  A(("Admin")) --> M["Modérer les critiques"]
  FAV -. "include" .-> AUTH["S'authentifier"]
  N -. "include" .-> AUTH
  TMDB[/"API TMDB"/] --- R
```

(Mermaid n'a pas de vrai diagramme de cas d'utilisation : on l'imite avec un `flowchart`. draw.io ou PlantUML le font nativement.)

## ⚠️ Limites et pièges

- **Décrire des écrans** au lieu d'objectifs.
- **Vouloir y mettre l'ordre des actions** : ce diagramme ne le montre pas, c'est le rôle du [[UML séquence et activité|diagramme de séquence]].

## 🔗 Liens

- **Prérequis :** 
- **Voir aussi :** [[User stories et critères d'acceptation]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://www.uml-diagrams.org/use-case-diagrams.html
