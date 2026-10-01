---
created: 2026-10-01
modified: 2026-10-01
type: knowledge
status: "🟡 In Progress"
level: Intermédiaire
tags:
  - tests/squash
aliases:
  - "API Squash TM"
parent: "[[Squash TM]]"
source: "https://tm-fr.doc.squashtest.com/latest/install-guide/installation/installation-plugins/apis.html"
---

# API Squash TM

## Introduction

L'API de Squash TM permet de **manipuler les données de [[Squash TM]] depuis un programme** : projets, exigences, cas de test, campagnes, exécutions.

C'est une **API REST** :
- on envoie des **requêtes HTTP** (GET pour lire, POST pour créer, PATCH pour modifier, DELETE pour supprimer) ;
- Squash TM répond en **JSON** (un format de texte structuré).

## 1. Les plugins d'API

Il existe deux plugins d'API :

| Plugin | Sert à |
| --- | --- |
| **API REST** | l'API principale : projets, exigences, cas de test, campagnes, exécutions |
| **API REST Admin** | l'administration : utilisateurs, serveurs, configuration |

Une **API Xsquash4Jira** existe aussi. Elle n'est accessible que si l'API REST Admin est installée.

## 2. La documentation

Aucune configuration particulière n'est nécessaire. La documentation est **intégrée à l'instance** de Squash TM : il suffit de remplacer `url_squash` par l'adresse de ton Squash.

| API | Adresse de la documentation |
| --- | --- |
| API REST | `url_squash/api/rest/latest/docs/api-documentation.html` |
| API REST Admin | `url_squash/api/rest/latest/docs/admin-api-documentation.html` |
| API Xsquash4Jira | `url_squash/api/rest/latest/docs/jira-sync-api-documentation.html` |

Le lien est aussi disponible dans le menu **« Aide »** de Squash TM.

## 3. L'authentification

On s'authentifie avec un **jeton d'API** : une clé secrète qui prouve qui fait la requête.

Depuis Squash TM 8, l'endpoint (l'adresse d'API) `/tokens` permet de gérer les jetons.

Exemple : lister les projets.

```bash
curl -H "Authorization: Bearer <mon_jeton>" https://url_squash/api/rest/latest/projects
```

#### Comment ça fonctionne ?

```
Programme -> requête HTTP + jeton -> API Squash TM -> réponse JSON -> Programme
```

## 4. Les usages

- **Créer des cas de test** depuis un fichier.
- **Récupérer les résultats** d'une campagne pour faire du reporting.
- **Mettre à jour des exécutions** depuis un pipeline CI/CD (voir [[Orchestrator vs API]]).

L'API automatise l'**import**, pas la **réflexion** : quelqu'un doit toujours rédiger le contenu des tests.

## 5. Le piège des références

L'API compare les valeurs **à l'identique**. Une erreur dans une référence (un espace en trop, une majuscule, une faute de frappe) et elle ne trouve rien. On obtient souvent une erreur **404** (« introuvable »).

```
Référence envoyée : "Connexion "   -> espace en trop -> rien trouvé -> 404
Référence attendue : "Connexion"
```

#### Les solutions

1. **Utiliser les ID numériques** plutôt que les références texte. C'est le plus fiable.
2. **Récupérer la liste puis chercher dedans** : retirer les espaces (trim), tout mettre en minuscules, faire une recherche approximative.
3. **Valider avant d'envoyer**, avec un message d'erreur clair.
4. **Corriger à la source** : par exemple, des listes déroulantes dans le fichier Excel de départ.

## Conclusion

| Avantages | Inconvénients |
| --- | --- |
| Automatisation | Compétences de développement nécessaires |
| Intégration (CI/CD, Jira) | Dépend des plugins installés |
| Documentation intégrée | Gestion des jetons et des droits |
| Format standard (REST, JSON) | |

Guide : https://tm-fr.doc.squashtest.com/latest/install-guide/installation/installation-plugins/apis.html
