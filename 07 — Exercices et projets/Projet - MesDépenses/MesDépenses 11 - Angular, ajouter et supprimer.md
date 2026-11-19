---
type: exercise
status: a-faire
niveau: 4
difficulty: moyen
concepts:
  - "[[Template et liaison de données]]"
  - "[[Observable et RxJS]]"
  - "[[Formulaire HTML]]"
tags:
  - exercice
  - mini-projet
---
# MesDépenses 11 - Angular, ajouter et supprimer

> [!info] Où tu en es
> **Projet :** [[Projet - MesDépenses]] · **Étape précédente :** [[MesDépenses 10 - Angular, afficher la liste]]
> **Cours :** [[Cours - Angular, composants et templates]] · [[Cours - Services, RxJS et routeur Angular]]
> **Notions :** [[Template et liaison de données]] · [[Composant d'interface]] · [[Observable et RxJS]] · [[Formulaire HTML]] · [[Code de statut HTTP]]
> **À créer :** formulaires réactifs Angular · `@Input` et `@Output`

## Le but
Comme à l'étape 05 : ajouter avec un formulaire, supprimer avec un bouton, liste à jour sans recharger, erreurs lisibles.

## Ce que tu fais
- [ ] Ajoute au service les méthodes pour créer et supprimer une dépense, et lire les catégories
- [ ] Fais un composant `formulaire-depense` avec validation **côté front** : montant positif obligatoire, libellé obligatoire. Le bouton est grisé tant que le formulaire est invalide
- [ ] Après un ajout ou une suppression, la liste se met à jour toute seule
- [ ] Désactive ta validation front un instant et envoie un montant négatif : affiche le message du 422 de l'API. Puis remets la validation
- [ ] Coupe l'API : un message clair s'affiche

> [!warning] Le piège
> Côté Angular, une erreur HTTP (404, 422) **arrive dans l'Observable** comme une erreur : sans traitement, elle passe dans la console et l'utilisateur ne voit rien.

> [!success] Ça marche si…
> Ajouter et supprimer mettent la liste à jour, le formulaire refuse un montant vide ou négatif, et un 422 ou une API coupée affichent un message.

> [!quote] Mes notes
> _Ce qui m'a paru plus simple ou plus dur qu'en Vue._

> [!question]- Indice
> `subscribe` accepte un objet `{ next, error }`. Le composant enfant prévient le parent avec un `@Output()` (ou le service garde la liste et chacun la lit).

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] Claude a relu mes composants
