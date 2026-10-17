---
type: notion
statut: a apprendre
resume: "Squash TM peut être relié à GitLab dans les deux sens utiles :"
revu:
sources:
---
# Squash TM et GitLab

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : [[02 Squash TM|Squash TM]] peut être relié à GitLab dans les deux sens utiles :

## Le problème

**Pourquoi c'est utile ?**
Pour relier les tests automatisés de GitLab aux cas de test de Squash TM.

**Qu'est-ce qui se passait sans ça ?**
Les résultats de la CI restaient dans GitLab, et Squash TM ne savait pas ce qui avait été testé.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

### Introduction

[[02 Squash TM|Squash TM]] peut être relié à GitLab dans les deux sens utiles :
- les **issues GitLab** deviennent des **exigences** dans Squash ;
- un **test échoué** dans Squash crée une **issue** (un bug) dans GitLab.

### 1. Issue GitLab -> exigence Squash

Le plugin **Xsquash4GitLab** importe automatiquement les issues GitLab comme **exigences**, et les met à jour régulièrement. (Pour Jira, l'équivalent s'appelle Xsquash4Jira.)

##### Comment ça fonctionne ?

```
Issue GitLab -> Xsquash4GitLab -> Exigence synchronisée dans Squash TM
                                   |
                                   |-- Exigence de test 1
                                   |-- Exigence de test 2
```

- La synchronisation va dans **un seul sens** : GitLab -> Squash.
- Squash peut **afficher l'avancement des tests sur l'issue GitLab** (sous forme de notes créées par Squash).
- Une issue peut donner **plusieurs exigences de test**, rangées sous l'exigence synchronisée.
- Les **itérations** et **milestones** (jalons) GitLab sont reproduits en **dossiers**. On peut les archiver une fois fermés.

### 2. Ne pas tout synchroniser

On définit un **périmètre** : par exemple, filtrer par **label** `user-story` ou par **milestone**.

```
200 issues GitLab
 |
 |-- 120 tâches techniques -> ignorées
 |-- 50 bugs               -> ignorés
 |-- 30 user stories       -> synchronisées dans Squash TM
```

Bonne pratique : mettre en place une **convention de labels dès le départ**.

Les options exactes dépendent de la version du plugin.

### 3. Test échoué -> issue GitLab

Depuis une **exécution** en échec, on déclare une **anomalie**. Elle crée une **issue dans GitLab**, utilisé comme bugtracker (outil de suivi des bugs). Le lien entre les deux est conservé.

```
Exigence -> Cas de test -> Exécution (échec) -> Issue GitLab "Bug paiement"
```

### 4. Prérequis

Le plugin doit être **installé et configuré par un administrateur** :
- l'adresse du serveur GitLab ;
- un jeton d'accès ;
- le périmètre à synchroniser.

## 🧪 Exemple

> À compléter avec un exemple tiré de ton travail.

## ⚠️ Limites et pièges

- 

## 🔗 Liens

- **Prérequis :** 
- **Voir aussi :** 
- **Utilisé dans :** 

## 📚 Notes

- 
