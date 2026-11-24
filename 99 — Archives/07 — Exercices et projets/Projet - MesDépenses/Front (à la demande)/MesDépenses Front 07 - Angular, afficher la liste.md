---
type: exercise
status: a-faire
niveau: 6
difficulty: moyen
concepts:
  - "[[Angular]]"
  - "[[Angular CLI]]"
  - "[[Composant d'interface]]"
  - "[[Service et injection de dépendances]]"
  - "[[Observable et RxJS]]"
tags:
  - exercice
  - mini-projet
---
# MesDépenses 10 - Angular, afficher la liste

> [!info] Où tu en es
> **Projet :** [[Projet - MesDépenses]] · **Étape précédente :** [[MesDépenses Front 06 - La CI du front Vue]]
> **Cours :** [[Cours - Angular, composants et templates]] · [[Cours - Services, RxJS et routeur Angular]]
> **Notions :** [[Angular]] · [[Angular CLI]] · [[Composant d'interface]] · [[Template et liaison de données]] · [[Service et injection de dépendances]] · [[Observable et RxJS]] · [[Type et interface TypeScript]]
> **Commande :** [[ng]]
> **À créer :** HttpClient Angular (fiche dédiée)

## Le but
La même liste qu'à l'étape 03, cette fois en Angular, avec l'appel à l'API rangé dans un **service**.

## Ce que tu fais
- [ ] Crée `front-angular/` avec la CLI, lance-le, ouvre http://localhost:4200
- [ ] Écris l'interface TypeScript `Depense` (les champs de l'API)
- [ ] Génère un service `DepensesService` avec une méthode qui renvoie la liste des dépenses
- [ ] Génère un composant `liste-depenses` qui utilise le service et affiche la liste et le total
- [ ] Ouvre la console : qu'est-ce qui bloque cette fois ? Tu sais déjà le régler (étape 04), fais-le sans relire tes notes
- [ ] Mets l'adresse de l'API dans la configuration d'environnement Angular

> [!warning] Le piège
> Un Observable ne fait **rien** tant que personne ne s'y abonne : pas d'abonnement, pas de requête dans l'onglet Réseau.

> [!success] Ça marche si…
> La liste et le total s'affichent sur :4200, et le composant ne contient aucune URL ni aucun appel HTTP direct.

> [!quote] Mes notes
> _Ce que Vue et Angular font pareil, ce qu'ils font différemment._

> [!question]- Indice
> Pour utiliser `HttpClient`, il faut le fournir à l'application (`provideHttpClient()` dans la config). Dans le template, le pipe `async` s'abonne pour toi. `ng generate service ...` et `ng generate component ...`.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] Claude a relu mon service et mon composant
