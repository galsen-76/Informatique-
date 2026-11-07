---
type: bonnes-pratiques
sujet: "POC"
concepts:
  - "[[Preuve de concept (POC)]]"
  - "[[Prototype]]"
  - "[[MVP (produit minimum viable)]]"
  - "[[Dette technique]]"
  - "[[Décision d'architecture (ADR)]]"
  - "[[Critères d'acceptation]]"
tags:
  - bonnes-pratiques
---
# Bonnes pratiques - POC

> [!info] À quoi sert cette fiche
> Mener une preuve de concept qui donne une **réponse claire** en peu de temps, sans laisser derrière elle du code bancal qui finit en production.
> Chaque règle dit **pourquoi** : c'est la raison qui compte, pour savoir l'adapter quand la situation change.

## À faire

### 1. Écrire la question avant d'écrire du code
Une seule phrase, qui se termine par un point d'interrogation. Si tu ne peux pas l'écrire, tu ne sais pas encore ce que tu cherches. Voir [[Preuve de concept (POC)]].

### 2. Fixer des critères de succès mesurables, au départ
« Un clic produit un PNG correct en moins de 10 s pour 50 images. » Écrits avant, ils empêchent de déclarer réussi après coup ce qui ne l'est pas. Même logique que les [[Critères d'acceptation]].

### 3. Fixer une date de fin (timebox)
Quand la date arrive, tu conclus avec ce que tu as. Sans date, un POC devient un projet à moitié fini que personne n'a décidé de lancer.

### 4. Attaquer le plus risqué en premier
Dans ton projet : la CI avec le Nexus et la communication Nuclio vers CVAT avant le style du bouton. Si le plus risqué échoue, tu le sais tôt.

### 5. Prendre le chemin le plus court, et noter chaque raccourci
Valeurs en dur, pas de tests, erreurs ignorées : c'est permis. Mais chaque raccourci reçoit un commentaire `# DETTE :` pour qu'on le retrouve. Voir [[Dette technique]].

### 6. Travailler avec de vraies conditions
Le vrai réseau de l'entreprise, le vrai Nexus, de vraies tâches CVAT. Un POC qui marche seulement sur ta machine ne prouve rien pour la production.

### 7. Montrer tôt et souvent
Une démonstration de 5 minutes à mi-parcours à ton responsable vaut mieux qu'un rapport parfait à la fin : il peut réorienter la question.

### 8. Finir par un compte rendu et une décision
Réponse, preuves, découvertes, dette, recommandation. La décision technique importante va dans un [[Décision d'architecture (ADR)|ADR]].

## À éviter

### 1. Un POC sans question
**Pourquoi c'est un problème :** on ne sait jamais quand il est fini ni s'il a réussi.
**À la place :** la question en une phrase, en tête de la note de cadrage.

### 2. Soigner ce qui n'est pas la question
**Pourquoi c'est un problème :** le temps passé sur le design ou l'architecture parfaite manque pour lever le vrai risque.
**À la place :** ne soigner que ce que le POC doit prouver.

### 3. Mettre le code du POC en production tel quel
**Pourquoi c'est un problème :** secrets en dur, aucune gestion d'erreur, aucun test : c'est une dette énorme livrée aux utilisateurs.
**À la place :** passer par un [[MVP (produit minimum viable)|MVP]] : réécrire ou reprendre proprement, avec tests et revue.

### 4. Cacher un « non »
**Pourquoi c'est un problème :** l'entreprise investit dans une voie sans issue.
**À la place :** un « non » argumenté est un POC réussi : il a évité des mois de travail.

### 5. Confondre POC et prototype
**Pourquoi c'est un problème :** on montre aux utilisateurs une démo technique moche, ou on fait une belle maquette qui ne prouve rien techniquement.
**À la place :** POC pour « est-ce faisable ? », [[Prototype]] pour « est-ce ce qu'il faut ? ».

### 6. Laisser grossir le périmètre
**Pourquoi c'est un problème :** chaque « tant qu'on y est » repousse la réponse.
**À la place :** une liste « hors périmètre » écrite au départ, et les idées nouvelles notées pour plus tard.

## Modèle de note de cadrage
```markdown
# POC - <sujet>
Question :
Hypothèses :
Critères de succès (mesurables) :
Date de fin :
Hors périmètre :
Risques :
--- à remplir à la fin ---
Résultat par critère (avec preuve) :
Découvertes :
Dette technique :
Recommandation :
```

## Avant de valider mon travail
- [ ] La question tient en une phrase
- [ ] Chaque critère de succès est atteint ou non, avec une preuve
- [ ] La date de fin est respectée (ou le dépassement est expliqué)
- [ ] Chaque raccourci est noté `# DETTE :` et listé dans le compte rendu
- [ ] Aucun secret n'a été poussé dans le dépôt, même pour le POC
- [ ] La recommandation est écrite et partagée
- [ ] La décision importante a son ADR

## Notions liées
[[Preuve de concept (POC)]] · [[Prototype]] · [[MVP (produit minimum viable)]] · [[Dette technique]] · [[Décision d'architecture (ADR)]] · [[Critères d'acceptation]]
