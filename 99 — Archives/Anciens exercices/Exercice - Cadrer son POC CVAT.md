---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Preuve de concept (POC)]]"
  - "[[Exigences fonctionnelles et non fonctionnelles]]"
  - "[[Critères d'acceptation]]"
tags:
  - exercice
---
# Exercice — Cadrer son POC CVAT

> [!info] Objectif
> Écrire la fiche de cadrage de ton vrai POC (CVAT, CI GitLab avec le Nexus, bouton React, fonction Nuclio), comme on le fait en entreprise avant de coder.
> Notions : [[Preuve de concept (POC)]] · [[Exigences fonctionnelles et non fonctionnelles]] · [[Critères d'acceptation]]

## Consignes
- [ ] Crée une note `Cadrage - POC export CVAT` dans « 07 — Exercices et projets »
- [ ] Écris **la question** du POC en une seule phrase
- [ ] Liste **les hypothèses** à vérifier (au moins quatre : une par brique)
- [ ] Écris **3 à 5 critères de succès** mesurables (un chiffre, un oui ou non observable)
- [ ] Ajoute au moins **un critère non fonctionnel** (temps, sécurité, contrainte d'infrastructure)
- [ ] Fixe **une date de fin** réaliste
- [ ] Écris ce qui est **hors périmètre** (au moins trois choses que tu ne feras pas)
- [ ] Liste **les risques** : ce qui pourrait faire répondre « non »
- [ ] Montre ta fiche à ton responsable et note ce qu'il a corrigé ou ajouté

> [!question]- Indice
> Reprends les quatre briques de ton projet : la CI qui construit l'image avec le Nexus, le bouton React, la fonction Nuclio, l'API CVAT. Chacune cache une hypothèse (« le Nexus fournit bien toutes les images nécessaires », « Nuclio peut joindre CVAT »…). Un critère de succès commence souvent par « on peut… » suivi d'un chiffre ou d'un résultat visible.

> [!question]- Solution
> Un exemple possible, à comparer au tien (le tien sera plus juste, tu connais le contexte) :
> - **Question** : peut-on, dans l'infrastructure de l'entreprise, déclencher depuis CVAT une fonction Nuclio qui renvoie un PNG des annotations d'une tâche ?
> - **Hypothèses** : le Nexus fournit les images de base de CVAT et de Nuclio ; la CI GitLab construit l'image CVAT modifiée ; la fonction Nuclio peut appeler l'API CVAT avec un jeton ; le front React peut appeler la fonction et afficher le PNG ; le script XML vers PNG existant fonctionne sur les données de l'API.
> - **Critères de succès** : la pipeline construit l'image sans accès direct à Internet ; un clic produit un PNG correct pour une tâche réelle de 50 images ; en moins de 10 s ; le jeton n'apparaît pas dans le code du front.
> - **Durée** : deux semaines.
> - **Hors périmètre** : droits fins par utilisateur, tests automatisés complets, design du bouton, autres formats.
> - **Risques** : images absentes du Nexus, réseau entre Nuclio et CVAT bloqué, limite de temps de Nuclio, format de l'API différent du XML attendu par le script.

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
