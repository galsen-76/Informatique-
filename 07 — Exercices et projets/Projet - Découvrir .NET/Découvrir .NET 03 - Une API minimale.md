---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Framework web]]"
  - "[[Endpoint]]"
  - "[[Service et injection de dépendances]]"
  - "[[Interface et polymorphisme]]"
  - "[[Variable d'environnement]]"
  - "[[Code de statut HTTP]]"
  - "[[JSON]]"
tags:
  - exercice
  - mini-projet
---
# Découvrir .NET 03 - Une API minimale

> [!info] Où tu en es
> **Projet :** [[Projet - Découvrir .NET]] · **Étape précédente :** [[Découvrir .NET 02 - Une solution en deux projets]]
> **Cours :** [[Cours - Une API web avec ASP.NET Core]]
> **Notions :** [[Framework web]] · [[Endpoint]] · [[Service et injection de dépendances]] · [[Interface et polymorphisme]] · [[Variable d'environnement]] · [[Code de statut HTTP]] · [[JSON]]

## Le but
Une API `MesDepenses.Api` qui utilise Core et répond comme l'API Python : lister, lire une dépense, ajouter, supprimer, totaux par catégorie, avec les bons codes de statut.

## Ce que tu fais
- [ ] Crée `src/MesDepenses.Api` avec le modèle d'API web, ajoute-le à la solution, fais-lui référencer Core
- [ ] Supprime l'exemple de météo du modèle. Lance l'API et note l'adresse affichée au démarrage
- [ ] Dans Core : une interface `IStockage` (lister, lire par id, ajouter, supprimer) et une implémentation **en mémoire**
- [ ] Enregistre l'implémentation dans `Program.cs`. Quelle durée de vie choisis-tu pour un stockage en mémoire, et pourquoi ?
- [ ] Écris les routes : `GET /depenses`, `GET /depenses/{id}`, `POST /depenses`, `DELETE /depenses/{id}`, `GET /totaux`
- [ ] Appelle chaque route avec curl ou Bruno. Obtiens un 200, un 201, un 204, un 404 et un 400 (montant négatif)
- [ ] Ajoute dans `appsettings.json` une devise (`"Devise": "EUR"`) renvoyée par `GET /totaux`. Relance avec une variable d'environnement qui la remplace par `XOF` sans toucher au fichier
- [ ] Commit

> [!warning] Le piège
> L'exception levée par le constructeur de `Depense` arrive jusqu'au framework et donne un 500. À toi de la transformer en 400 avec un message lisible.

> [!success] Ça marche si…
> Les 5 codes (200, 201, 204, 400, 404) sont obtenus, et la devise change avec la variable d'environnement sans modifier le fichier.

> [!quote] Mes notes
> _Ce que j'ai compris, ce qui a coincé._

> [!question]- Indice
> Un stockage en mémoire doit garder ses données entre deux requêtes. Relis les trois durées de vie dans [[Service et injection de dépendances]]. Pour le 400 : un `try/catch` dans la route et `Results.BadRequest(...)`. Pour la devise : `Devise=XOF dotnet run`.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] Claude a relu mes notes
