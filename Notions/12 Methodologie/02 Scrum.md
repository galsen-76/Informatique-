---
type: notion
statut: a apprendre
resume: "Scrum est la méthode agile la plus utilisée en entreprise, donc très probablement celle de ton équipe."
revu:
sources:
  - "https://scrumguides.org/scrum-guide.html"
---
# Scrum

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : **Scrum** est la méthode agile la plus utilisée en entreprise, donc très probablement celle de ton équipe.

## Le problème

**Pourquoi c'est utile ?**
Pour donner un cadre simple à une équipe agile : des sprints, des rôles et des rituels réguliers.

**Qu'est-ce qui se passait sans ça ?**
Sans rythme commun, on ne savait pas quand montrer le travail, qui décidait des priorités, ni comment s'améliorer.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Le travail est découpé en **sprints** (souvent 2 semaines). À chaque sprint : on choisit les tâches, on se synchronise chaque jour, on montre le résultat, et on se demande comment faire mieux.

### Le déroulé d'un sprint

```mermaid
flowchart LR
  PB["Product Backlog<br/>toutes les tâches"] --> SP["Sprint Planning<br/>on choisit"]
  SP --> SB["Sprint Backlog<br/>les tâches du sprint"]
  SB --> S["Sprint de 2 semaines<br/>+ Daily chaque matin"]
  S --> RV["Sprint Review<br/>démo"]
  RV --> RT["Rétrospective<br/>on s'améliore"]
  RT --> PB
```

### Les 3 rôles

| Rôle | Fait quoi |
|---|---|
| **Product Owner** (PO) | décide **quoi** faire et dans quel ordre (la valeur pour l'utilisateur) |
| **Scrum Master** | anime les rituels, **débloque** les obstacles |
| **Développeurs** (toi) | décident **comment** faire, et le font |

### Les rituels

| Rituel | Quand | Durée | À quoi ça sert |
|---|---|---|---|
| **Sprint Planning** | début du sprint | 1 à 2 h | choisir et découper les tâches |
| **Daily** | chaque jour | 15 min max | se synchroniser, signaler les blocages |
| **Sprint Review** | fin du sprint | 1 h | montrer ce qui marche, recueillir les retours |
| **Rétrospective** | fin du sprint | 1 h | ce qui a marché, ce qui coince, **une** action concrète |
| **Affinage** (*refinement*) | pendant le sprint | 1 h | préparer les tâches des prochains sprints |

### Le vocabulaire

- **Product Backlog** : la liste de tout ce qui reste à faire, triée par priorité.
- **Sprint Backlog** : ce que l'équipe s'engage à faire ce sprint.
- **Incrément** : la version qui fonctionne à la fin du sprint.
- **Definition of Done** : ce qu'il faut pour dire « terminé » (relu, testé, déployé en recette).
- **Vélocité** : ce que l'équipe réalise en moyenne par sprint (voir [[09 Estimation et planification|Estimation]]).

## 🧪 Exemple

### Réussir son daily

Trois phrases :

```text
« Hier : endpoint /favorites et ses tests.
  Aujourd'hui : le bouton favoris côté Angular.
  Blocage : j'attends les accès à la base de recette. »
```

Court, précis, blocage **explicite** : le Scrum Master sait quoi débloquer. Les discussions techniques se font **après**, avec les personnes concernées.

## ⚠️ Limites et pièges

- **Un daily de 45 minutes** qui tourne en réunion technique.
- **Ajouter du travail en plein sprint** sans rien retirer.
- **Une rétro sans action concrète** : on se plaint, rien ne change.
- **Rester bloqué en silence** : le daily est fait pour le dire.

## 🔗 Liens

- **Prérequis :** 
- **Voir aussi :** [[01 Agile et manifeste agile|Agile et manifeste agile]], [[09 Estimation et planification|Estimation et planification]], [[03 Issues et boards|Issues et boards]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://scrumguides.org/scrum-guide.html
