---
tags:
  - index
---
# Parcours

Seulement l'utile au travail, dans l'ordre, une notion à la fois. Le reste du coffre sert de dictionnaire.

## Les 13 fondamentaux
**Mon poste**
1. [[Terminal]], [[Chemin de fichier]]
2. [[Variable d'environnement]]
3. [[Git]], [[Branche Git]], [[Merge request]]

**Python**
4. [[Variables et types]], [[Condition (if)]], [[Boucle (for, while)]]
5. [[Fonction]], [[Module et import]], [[Environnement virtuel Python]]
6. [[Liste et dictionnaire]], [[JSON]]
7. [[Exception]], [[Fiche - Lire un message d'erreur]]

**Réseau et API**
8. [[HTTP]], [[Code de statut HTTP]]
9. [[API]], [[Appeler une API HTTP]]
10. [[Port]], [[Proxy]], [[CORS]]

**Livrer**
11. [[Image Docker]], [[Conteneur]], [[Dockerfile]]
12. [[Docker Compose]]
13. [[Pipeline GitLab CI]]

## Méthode
1. Lire « En une phrase » et « Comprendre ».
2. Dessiner les points clés dans Excalidraw, sans regarder. Comparer, corriger.
3. Expliquer en 3 phrases, puis Claude m'interroge.
4. Utiliser dans mes tickets.
5. Revoir : J+1, J+7, J+30.

Finie = `schema`, `explique` et `utilise` cochés dans la fiche.

## Où j'en suis
```dataview
TABLE WITHOUT ID file.link AS "Notion", choice(schema, "oui", "") AS "Dessin", choice(explique, "oui", "") AS "Expliqué", choice(utilise, "oui", "") AS "Utilisé"
FROM outgoing([[Parcours]])
WHERE type = "concept"
```
