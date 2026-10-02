Voici les deux notes, dans le même format que la tienne.

  

Note 1 : API Squash TM

Introduction

L'API Squash TM permet de manipuler les données de Squash TM (projets, exigences, cas de test, campagnes, exécutions…) depuis un programme, sans passer par l'interface web. On peut ainsi automatiser des tâches répétitives ou connecter Squash TM à d'autres outils (CI/CD, scripts, outils maison…).

C'est une API REST : on envoie des requêtes HTTP (GET, POST, PATCH, DELETE) et on reçoit des réponses en JSON.

1. Les différentes API

SquashTM dispose de deux plugins d'API, l'API REST et l'API REST Admin, et une troisième API est embarquée dans le plugin Xsquash4Jira.

- API REST : la principale, pour manipuler les exigences, cas de test, campagnes, exécutions…
- API REST Admin : pour l'administration (utilisateurs, serveurs, configuration des projets…)
- API Xsquash4Jira : pour la synchronisation avec Jira. Elle n'est accessible que si le plugin API REST Admin est installé.

2. Documentation

Ces API ne demandent aucune configuration particulière, et chacune embarque sa propre documentation, accessible directement dans le navigateur.

- API REST : url_squash/api/rest/latest/docs/api-documentation.html
- API REST Admin : url_squash/api/rest/latest/docs/admin-api-documentation.html

3. Authentification

Pour utiliser l'API, il faut s'authentifier avec un jeton d'API (token) lié à son compte. Depuis Squash TM 8, l'API permet de récupérer, ajouter et supprimer un jeton d'API via l'endpoint /tokens.

Exemple de requête :

curl -H "Authorization: Bearer <mon_jeton>" \

     https://url_squash/api/rest/latest/projects

Comment ça fonctionne ?

Script / outil externe

 |

 |-- Requête HTTP + jeton --> API REST Squash TM

 |                              |

 |                              |-- lit / modifie les données

 |                              |   (exigences, cas de test, campagnes…)

 |

 |<-- Réponse JSON -------------|

Exemples d'usage :

- Créer automatiquement des cas de test à partir d'un fichier
- Récupérer les résultats d'une campagne pour faire un reporting
- Mettre à jour le statut d'une exécution depuis un pipeline CI/CD

Conclusion

|   |   |
|---|---|
|Avantages|Inconvénients|
|Automatisation des tâches répétitives|Nécessite des compétences en développement|
|Intégration avec d'autres outils (CI/CD, Jira…)|Les fonctionnalités dépendent des plugins installés|
|Documentation intégrée|Gestion des jetons et des droits à prévoir|
|Format standard (REST / JSON)||

Guide : [https://tm-fr.doc.squashtest.com/latest/install-guide/installation/installation-plugins/apis.html](https://tm-fr.doc.squashtest.com/latest/install-guide/installation/installation-plugins/apis.html)

  

Note 2 : Squash Orchestrator

Introduction

Squash Orchestrator est l'outil qui permet d'exécuter des tests automatisés depuis Squash TM. Squash TM gère les tests manuels, et l'Orchestrator s'occupe de la partie automatisée : il lance les scripts de test et renvoie les résultats dans Squash TM.

Il est composé d'un ensemble de micro-services et repose sur l'OpenTestFactory Orchestrator, auquel il ajoute des micro-services pour exploiter les plans d'exécution Squash TM et y remonter les résultats.

1. Les deux façons de lancer des tests

On peut l'utiliser soit en lançant des tests automatisés depuis Squash TM, soit en lui envoyant un plan d'exécution écrit dans un format précis, appelé le workflow.

- Depuis Squash TM : on lance une itération ou une suite contenant des cas de test automatisés
- Depuis un workflow : on décrit les tests à lancer dans un fichier, par exemple depuis un pipeline CI/CD

2. Les composants

- Squash Orchestrator : il pilote et coordonne les éléments de la chaîne d'exécution (environnements d'exécution, automates, reporting…)
- Agent : un processus installé sur l'environnement d'exécution, qui interroge régulièrement l'Orchestrator pour savoir s'il a des tests à lancer
- opentf-ctl : une ligne de commande pour lancer des plans d'exécution, suivre leur avancement et lister les environnements d'exécution
- Plugin Jenkins : il facilite l'envoi d'un workflow à l'Orchestrator depuis un pipeline Jenkins

Comment ça fonctionne ?

Squash TM (ou pipeline CI/CD)

 |

 |-- Lance un plan d'exécution --> Squash Orchestrator

 |                                   |

 |                                   |-- Agent sur l'environnement de test

 |                                   |    |-- exécute les scripts (Cypress, Robot…)

 |                                   |

 |<-- Résultats remontés ------------|

3. Technologies supportées

En version standard : Cypress, Cucumber JVM, JUnit, Playwright, Postman, Robot Framework, SKF (Squash Keyword Framework) et SoapUI.

La licence Ultimate ajoute notamment Agilitest, Katalon, Ranorex et UFT.

⚠️ Une seule technologie de test est supportée par dépôt Git : on ne peut pas lancer une itération ou une suite contenant des tests d'un même dépôt écrits avec des technologies différentes.

Conclusion

|   |   |
|---|---|
|Avantages|Inconvénients|
|Exécution de tests automatisés depuis Squash TM|Installation et configuration complexes (orchestrateur, agents, environnements)|
|Résultats remontés automatiquement dans Squash TM|Certaines technologies réservées à la licence Ultimate|
|Nombreuses technologies supportées|Une seule technologie par dépôt Git|
|Intégration CI/CD (Jenkins, workflow)|Nécessite de savoir écrire des tests automatisés|

Guide : [https://tm-fr.doc.squashtest.com/v8/install-guide/installation/installation-orchestrator/components.html](https://tm-fr.doc.squashtest.com/v8/install-guide/installation/installation-orchestrator/components.html)

  

Avec cette deuxième note, tu peux nuancer l'inconvénient « Test manuel » de ta note principale : Squash TM seul est orienté manuel, mais l'automatisation est possible grâce à l'Orchestrator.
