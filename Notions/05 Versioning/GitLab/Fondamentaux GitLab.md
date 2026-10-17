---
type: notion
statut: a apprendre
resume: "Git est l'outil qui garde l'historique sur ta machine. GitLab est la plateforme en ligne autour : il héberge le code et ajoute ce qu'il faut pour travailler en équipe (Merge Requests, pipelines automatiques, tickets)."
revu:
sources:
  - "https://docs.gitlab.com/"
---
# Fondamentaux GitLab

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : **Git** est l'outil qui garde l'historique sur ta machine. **GitLab** est la plateforme en ligne autour : il héberge le code et ajoute ce qu'il faut pour travailler en équipe (Merge Requests, pipelines automatiques, tickets).

## Le problème

**Pourquoi c'est utile ?**
Pour héberger le code et travailler en équipe autour : MR, pipelines, tickets.

**Qu'est-ce qui se passait sans ça ?**
Le code était partagé sur un serveur sans revue, sans tests automatiques ni suivi des tâches.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Ton entreprise utilise son propre GitLab, hébergé sur ses serveurs.

### L'image

Git est le **moteur**. GitLab est l'**usine** construite autour : un bureau d'études (les tickets), un contrôle qualité (les Merge Requests et les pipelines), un entrepôt (le registre d'images), un service d'expédition (le déploiement).

### L'organisation

| Élément | C'est… |
|---|---|
| **Groupe** | une équipe ou un département, qui contient des projets |
| **Projet** | un dépôt Git + ses tickets, MR, pipelines, wiki |
| **Branche protégée** | `main` : modifiable seulement via une MR validée |
| **Rôle** | ce que tu as le droit de faire |

| Rôle | Peut |
|---|---|
| Guest / Reporter | lire, commenter les tickets |
| **Developer** | pousser des branches, ouvrir des MR (ton rôle habituel) |
| Maintainer | fusionner, configurer le projet |
| Owner | tout, y compris supprimer |

### Les fonctionnalités que tu utiliseras

| Fonctionnalité | Note |
|---|---|
| Merge Requests | Merge Requests |
| Pipelines CI/CD | CI/CD |
| Tickets et tableaux | Issues et boards |
| Registre d'images, Pages, sécurité | GitLab avancé |

### Tes projets perso

Mets tes projets sur **gitlab.com** (ou GitHub) : c'est ce que regardera un recruteur. Un dépôt propre = un README clair, des commits lisibles, un pipeline vert, un lien vers la démo.

## 🧪 Exemple

### Le parcours d'une modification

```mermaid
flowchart LR
  I["📋 Ticket<br/>(issue)"] --> B["🌿 Branche"]
  B --> P["⬆️ Push"]
  P --> MR["🔍 Merge Request<br/>revue de code"]
  MR --> CI["⚙️ Pipeline<br/>lint, tests, build"]
  CI -->|"vert + approuvé"| M["✅ Fusion dans main"]
  M --> D["🚀 Déploiement"]
```

## ⚠️ Limites et pièges

- **Confondre Git et GitLab** : Git marche très bien sans GitLab, l'inverse non.
- **Travailler directement sur `main`** : impossible si elle est protégée, et c'est tant mieux.

## 🔗 Liens

- **Prérequis :** 
- **Voir aussi :** [[Git fondamentaux]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://docs.gitlab.com/
