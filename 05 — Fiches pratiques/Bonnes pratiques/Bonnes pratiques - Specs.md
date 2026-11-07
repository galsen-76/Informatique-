---
type: bonnes-pratiques
sujet: "Specs"
concepts:
  - "[[Spécification (specs)]]"
  - "[[Exigences fonctionnelles et non fonctionnelles]]"
  - "[[Cahier des charges]]"
  - "[[Spécification technique]]"
  - "[[User story]]"
  - "[[Critères d'acceptation]]"
  - "[[Décision d'architecture (ADR)]]"
tags:
  - bonnes-pratiques
---
# Bonnes pratiques - Specs

> [!info] À quoi sert cette fiche
> Écrire (ou lire) des spécifications qui évitent les malentendus : assez précises pour être testées, assez courtes pour être lues.
> Chaque règle dit **pourquoi** : c'est la raison qui compte, pour savoir l'adapter quand la situation change.

## À faire

### 1. Commencer par le pourquoi
Contexte et objectif en trois lignes. Celui qui connaît le but peut proposer une meilleure solution, et trancher seul les petits détails.

### 2. Écrire le hors périmètre
Ce qu'on ne fera **pas** est aussi important que ce qu'on fera : c'est ce qui empêche le projet de grossir sans fin.

### 3. Rendre chaque exigence vérifiable
« Rapide » devient « moins de 10 s pour 50 images ». Test simple : peut-on écrire un test qui répond oui ou non ? Voir [[Exigences fonctionnelles et non fonctionnelles]].

### 4. Numéroter les exigences
F1, F2, NF1… Une merge request, un test ou une question peut alors citer « NF2 » sans ambiguïté.

### 5. Ne pas oublier le non fonctionnel
Performance, droits d'accès, journaux, déploiement (CI GitLab, images du Nexus). C'est souvent là que les projets échouent.

### 6. Décrire le besoin, pas la solution
« Les résultats s'affichent en moins de 1 s » plutôt que « utiliser un cache Redis ». La solution va dans la [[Spécification technique]], avec ses raisons.

### 7. Des critères d'acceptation avec les cas d'erreur
Étant donné, quand, alors : le cas idéal **et** les cas qui ratent (vide, interdit, service arrêté). Voir [[Critères d'acceptation]].

### 8. Mettre des exemples concrets
Un exemple de requête et de réponse, une capture de maquette, un fichier d'entrée réel : un exemple lève plus d'ambiguïtés qu'un paragraphe.

### 9. Lister les questions ouvertes
Ce qu'on ne sait pas encore, écrit noir sur blanc. Mieux vaut une question visible qu'une supposition cachée.

### 10. Versionner la spec et noter les changements
Dans le dépôt (Markdown) ou un wiki avec historique. Une décision qui change est écrite, datée et partagée ; une décision d'architecture a son [[Décision d'architecture (ADR)|ADR]].

## À éviter

### 1. Les mots flous
**Pourquoi c'est un problème :** « simple », « rapide », « sécurisé », « gérer », « etc. » veulent dire une chose différente pour chacun.
**À la place :** un chiffre, une liste fermée, un comportement observable.

### 2. Le roman de 50 pages
**Pourquoi c'est un problème :** personne ne le lit en entier, les contradictions s'y cachent.
**À la place :** une page par fonctionnalité, des listes et des exemples ; découper en [[User story|user stories]].

### 3. La spec écrite seul, sans le demandeur
**Pourquoi c'est un problème :** elle décrit ce que le développeur a compris, pas ce qui est demandé.
**À la place :** la faire relire par le demandeur et par un développeur.

### 4. Une spec figée qu'on ne met plus à jour
**Pourquoi c'est un problème :** au bout d'un mois, elle ne correspond plus au code et plus personne ne lui fait confiance.
**À la place :** la mettre à jour dans la même merge request que le changement.

### 5. Commencer à coder avec des questions ouvertes importantes
**Pourquoi c'est un problème :** on choisit une réponse au hasard, et on recode quand la vraie réponse arrive.
**À la place :** poser les questions d'abord ; si on doit avancer, écrire la supposition faite.

### 6. Des user stories sans utilisateur ni bénéfice
**Pourquoi c'est un problème :** « En tant que développeur, je veux une base de données » ne dit pas pourquoi, donc on ne peut pas prioriser.
**À la place :** un vrai utilisateur et un vrai « afin de ».

## Modèle de spec courte
```markdown
# Specs - <fonctionnalité>
## Contexte et objectif
## Périmètre
Dedans :
Hors périmètre :
## Exigences
F1 :
NF1 :
## User stories et critères d'acceptation
En tant que …, je veux …, afin de …
- Étant donné …, quand …, alors …
## Partie technique
Schéma, contrat d'API, données, déploiement, alternatives écartées
## Contraintes
## Questions ouvertes
```

## Avant de valider mon travail
- [ ] Le pourquoi tient en trois lignes
- [ ] Le hors périmètre est écrit
- [ ] Chaque exigence est numérotée et vérifiable
- [ ] Il y a au moins une exigence non fonctionnelle
- [ ] Chaque story a des critères d'acceptation, dont des cas d'erreur
- [ ] Aucun mot flou (simple, rapide, sécurisé, etc.)
- [ ] Les questions ouvertes sont listées
- [ ] Le demandeur a relu et validé

## Notions liées
[[Spécification (specs)]] · [[Exigences fonctionnelles et non fonctionnelles]] · [[Cahier des charges]] · [[Spécification technique]] · [[User story]] · [[Critères d'acceptation]] · [[Décision d'architecture (ADR)]]
