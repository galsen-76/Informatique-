---
tags:
  - index
---
# Parcours

Les concepts pour comprendre ce que je fais au travail. Pas de syntaxe : elle se cherche.

## Les 16 concepts
**Mon poste**
1. [[Terminal]], [[Shell]], [[WSL]] : où je tape, et les commandes de base (`04 — Commandes/Terminal`)
2. [[Chemin de fichier]], [[Permissions Linux]] : où sont mes fichiers, qui peut y toucher
3. [[Processus]], [[Variable d'environnement]], [[Variable PATH]] : ce qui tourne, et avec quels réglages

**Travailler en équipe**
4. [[Git]], [[Branche Git]], [[Merge]] : l'historique et les versions parallèles
5. [[Merge request]], [[Conflit de merge]] : faire relire et fusionner

**Le réseau**
6. [[Client-serveur]], [[HTTP]], [[Code de statut HTTP]] : qui demande, qui répond, et comment
7. [[Adresse IP]], [[Port]], [[DNS]] : comment on trouve une machine et un service
8. [[Proxy]], [[Reverse proxy]], [[CORS]] : les intermédiaires et les blocages
9. [[API REST]], [[JSON]], [[Authentification]] : parler à une application

**Docker**
10. [[Image Docker]], [[Conteneur]], [[Dockerfile]] : emballer et lancer une application
11. [[Docker Compose]], [[Volume Docker]] : plusieurs conteneurs et leurs données
12. [[Registre Docker]], [[Nexus]] : où vont les images, et le passage obligé au travail

**Livrer**
13. [[Intégration et déploiement continus (CI-CD)]], [[Pipeline GitLab CI]], [[Runner GitLab]] : tester et construire à chaque push
14. [[Environnement de déploiement]], [[Secret et fichier .env]] : dev, staging, prod, et les mots de passe hors du code

**Quand ça casse**
15. [[Gestionnaire de paquets]], [[Environnement virtuel Python]] : les dépendances
16. [[Fiche - Lire un message d'erreur]], [[Journaliser avec logging]], [[Test unitaire]], [[Test de bout en bout]] : trouver et prévenir les erreurs

## Méthode
1. Lire « En une phrase » et « Comprendre ».
2. Dessiner les points clés dans Excalidraw, sans regarder.
3. Envoyer le dessin à Claude : il le regarde, puis on discute du concept avec des questions de situation réelle (« pourquoi ça bloque ? », « que se passe-t-il si… »).
4. Utiliser dans mes tickets.
5. Revoir : J+1, J+7, J+30.

Finie = `schema`, `explique` (j'ai tenu la discussion) et `utilise` cochés dans la fiche.

## Où j'en suis
```dataview
TABLE WITHOUT ID file.link AS "Notion", choice(schema, "oui", "") AS "Dessin", choice(explique, "oui", "") AS "Expliqué", choice(utilise, "oui", "") AS "Utilisé"
FROM outgoing([[Parcours]])
WHERE type = "concept"
```
