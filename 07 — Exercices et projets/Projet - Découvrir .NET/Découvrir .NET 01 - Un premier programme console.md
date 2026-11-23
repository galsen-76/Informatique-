---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[Plateforme .NET]]"
  - "[[Langage compilé et interprété]]"
  - "[[Variables et types]]"
  - "[[Liste et dictionnaire]]"
  - "[[Boucle (for, while)]]"
tags:
  - exercice
  - mini-projet
---
# Découvrir .NET 01 - Un premier programme console

> [!info] Où tu en es
> **Projet :** [[Projet - Découvrir .NET]] · **Étape précédente :** rien, c'est le début
> **Cours :** [[Cours - .NET, premiers pas]]
> **Notions :** [[Plateforme .NET]] · [[Langage compilé et interprété]] · [[Variables et types]] · [[Liste et dictionnaire]] · [[Boucle (for, while)]]

## Le but
Le SDK est installé, tu as un programme console qui affiche une liste de dépenses et leur total, et tu as vu de tes yeux une erreur de compilation.

## Ce que tu fais
- [ ] Installe le SDK .NET 8 et vérifie la version. Note dans « Mes notes » ce que montrent `dotnet --list-sdks` et `dotnet --list-runtimes`
- [ ] Crée `~/projets/mes-depenses-dotnet/`, fais-en un dépôt Git, ajoute un `.gitignore` adapté à .NET
- [ ] Crée un projet console dedans et lance-le
- [ ] Remplace le contenu de `Program.cs` : une liste de 4 montants (en `decimal`), affiche chaque montant puis le total
- [ ] Fais volontairement trois fautes, une à la fois : un nom de variable mal écrit, un `;` oublié, un texte rangé dans une variable `decimal`. Lance `dotnet build` et recopie chaque message d'erreur : où sont le fichier, la ligne et le code `CS…` ?
- [ ] Regarde ce qu'il y a dans `bin/` après la compilation. Lance le programme **sans** `dotnet run`, directement avec le `.dll`
- [ ] Premier commit : vérifie que `bin/` et `obj/` n'y sont pas

> [!warning] Le piège
> Un montant écrit `12.5` est un `double`, pas un `decimal` : le compilateur refuse de le mettre dans une liste de `decimal`. Lis le message avant de chercher.

> [!success] Ça marche si…
> Le programme affiche les 4 montants et le bon total, tu as noté 3 messages d'erreur différents, et le commit ne contient ni `bin/` ni `obj/`.

> [!quote] Mes notes
> _Ce que j'ai compris, ce qui a coincé._

> [!question]- Indice
> Les commandes sont dans **04 — Commandes/dotnet**. Pour la liste, ouvre [[Liste et dictionnaire]] et déplie « Comment ça s'écrit ». Pour lancer le `.dll` : `dotnet chemin/vers/Le.dll`.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] Claude a relu mes notes
