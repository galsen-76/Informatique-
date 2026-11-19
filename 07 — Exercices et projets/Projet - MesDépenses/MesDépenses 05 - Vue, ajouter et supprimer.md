---
type: exercise
status: a-faire
niveau: 2
difficulty: moyen
concepts:
  - "[[Template et liaison de données]]"
  - "[[Formulaire HTML]]"
  - "[[Appeler une API HTTP]]"
  - "[[CORS]]"
tags:
  - exercice
  - mini-projet
---
# MesDépenses 05 - Vue, ajouter et supprimer

> [!info] Où tu en es
> **Projet :** [[Projet - MesDépenses]] · **Étape précédente :** [[MesDépenses 04 - Régler CORS]]
> **Cours :** [[Cours - Vue.js, composants, réactivité et directives]]
> **Notions :** [[Template et liaison de données]] · [[État et réactivité]] · [[Formulaire HTML]] · [[Appeler une API HTTP]] · [[Code de statut HTTP]] · [[CORS]]
> **À créer :** props et événements entre composants Vue

## Le but
Depuis la page : ajouter une dépense avec un formulaire, supprimer une dépense avec un bouton, et voir la liste se mettre à jour.

## Ce que tu fais
- [ ] Fais un composant `FormulaireDepense.vue` : montant, catégorie (liste lue dans `GET /categories`), date, libellé
- [ ] À l'envoi, fais un `POST /depenses`. Regarde la console : si c'est de nouveau CORS, lis bien, ce n'est pas la même requête qu'à l'étape 04
- [ ] Après l'ajout, la liste doit afficher la nouvelle dépense **sans recharger la page**. Le formulaire et la liste sont deux composants : comment la liste apprend-elle qu'il y a du nouveau ?
- [ ] Ajoute un bouton « Supprimer » sur chaque ligne (`DELETE /depenses/{id}`)
- [ ] Envoie un montant négatif : affiche à l'utilisateur le message de l'erreur 422, au lieu de ne rien faire
- [ ] Coupe l'API et essaie d'ajouter : la page doit afficher un message clair, pas rester figée

> [!warning] Les pièges
> - Un `POST` en JSON déclenche une requête `OPTIONS` avant la vraie : si ta config CORS n'autorise que `GET`, elle échoue.
> - `fetch` ne lève **pas** d'erreur sur un 404 ou un 422 : il faut regarder le code toi-même.

> [!success] Ça marche si…
> Ajouter et supprimer mettent la liste et le total à jour tout seuls, et un 422 ou une API coupée affichent un message lisible.

> [!quote] Mes notes
> _Ce que j'ai compris, ce qui a coincé._

> [!question]- Indice
> Un composant enfant prévient son parent avec un événement (`emit`), le parent recharge la liste. Une réponse a une propriété `ok` et un `status`. Le corps d'un 422 contient un tableau `detail`.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] Claude a relu mes composants
