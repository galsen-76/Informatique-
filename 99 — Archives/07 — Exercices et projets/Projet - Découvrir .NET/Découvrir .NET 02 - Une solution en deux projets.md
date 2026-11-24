---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[Projet et solution .NET]]"
  - "[[Classe et objet]]"
  - "[[Module et import]]"
  - "[[Motifs de boucle]]"
  - "[[Exception]]"
  - "[[Fonction]]"
tags:
  - exercice
  - mini-projet
---
# Découvrir .NET 02 - Une solution en deux projets

> [!info] Où tu en es
> **Projet :** [[Projet - Découvrir .NET]] · **Étape précédente :** [[Découvrir .NET 01 - Un premier programme console]]
> **Cours :** [[Cours - .NET, premiers pas]] · [[Cours - Lire et écrire du code .NET]]
> **Notions :** [[Projet et solution .NET]] · [[Classe et objet]] · [[Module et import]] · [[Motifs de boucle]] · [[Exception]] · [[Fonction]]

## Le but
Le code des dépenses vit dans une bibliothèque `MesDepenses.Core`, et le programme console ne fait plus qu'afficher. Les totaux sont calculés avec LINQ, sans boucle écrite à la main.

## Ce que tu fais
- [ ] Crée une solution `MesDepenses` à la racine, et range le projet console de l'étape 01 dans `src/`
- [ ] Crée une bibliothèque `src/MesDepenses.Core`, ajoute les deux projets à la solution, et fais référencer Core par la console
- [ ] Dans Core : une classe `Depense` (libellé, montant, catégorie, date). Un montant négatif ou nul doit être **refusé dès la création**
- [ ] Dans Core : une classe `Calcul` avec trois méthodes : le total, le total d'une catégorie, et les totaux par catégorie (un dictionnaire)
- [ ] La console crée une dizaine de dépenses, puis affiche les trois résultats
- [ ] Essaie de créer une dépense à -5 € depuis la console : que se passe-t-il ? Attrape l'erreur pour afficher un message propre
- [ ] Ouvre le `.csproj` de la console : quelle ligne la commande a-t-elle ajoutée ?
- [ ] `dotnet build` à la racine construit les deux projets. Commit

> [!warning] Le piège
> Une classe de Core qui n'est pas `public` est invisible depuis la console, même avec la référence et le `using`. L'erreur parle alors de « niveau de protection ».

> [!success] Ça marche si…
> Les trois résultats s'affichent, une dépense négative donne un message clair et pas un plantage, et Core ne référence aucun autre projet.

> [!quote] Mes notes
> _Ce que j'ai compris, ce qui a coincé._

> [!question]- Indice
> Refuser à la création : c'est le rôle du constructeur, qui peut lever une `ArgumentException`. Pour les totaux par catégorie, regarde `GroupBy` puis `ToDictionary` dans [[Motifs de boucle]].

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] Claude a relu mes notes
