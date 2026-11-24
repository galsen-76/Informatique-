---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Dockerfile]]"
  - "[[Image Docker]]"
  - "[[Variable d'environnement]]"
  - "[[Plateforme .NET]]"
tags:
  - exercice
  - mini-projet
---
# Découvrir .NET 05 - L'API dans Docker

> [!info] Où tu en es
> **Projet :** [[Projet - Découvrir .NET]] · **Étape précédente :** [[Découvrir .NET 04 - Tester avec xUnit]]
> **Cours :** [[Cours - Une API web avec ASP.NET Core]] (partie 9)
> **Notions :** [[Dockerfile]] · [[Image Docker]] · [[Variable d'environnement]] · [[Plateforme .NET]]
> **Quand :** après le niveau 2 (Docker)

## Le but
L'API tourne dans un conteneur construit en deux étapes (SDK pour construire, runtime pour exécuter), et sa configuration se règle par variables d'environnement.

## Ce que tu fais
- [ ] Écris un Dockerfile en deux étapes à la racine de la solution
- [ ] Ajoute un `.dockerignore` qui exclut `bin/`, `obj/` et `.git/`
- [ ] Construis l'image et lance le conteneur en publiant le port. Appelle `GET /depenses`
- [ ] Compare la taille de l'image finale avec celle de l'image du SDK. Pourquoi deux étapes ?
- [ ] Change la devise au lancement du conteneur, sans reconstruire l'image
- [ ] Bonus : fais tourner `dotnet test` dans l'étape de construction, pour que l'image ne se construise pas si un test échoue
- [ ] Commit

> [!warning] Le piège
> Dans le conteneur, l'API n'écoute pas forcément sur le port que tu crois. Lis la première ligne des logs du conteneur avant de chercher plus loin.

> [!success] Ça marche si…
> `curl` sur le port publié renvoie la liste, l'image finale est beaucoup plus petite que l'image du SDK, et la devise change sans reconstruire.

> [!quote] Mes notes
> _Ce que j'ai compris, ce qui a coincé._

> [!question]- Indice
> Le Dockerfile du cours est un bon point de départ. `docker logs <conteneur>` montre l'adresse d'écoute ; `ASPNETCORE_HTTP_PORTS` la règle. Si le registre `mcr.microsoft.com` est bloqué sur ton réseau, cherche s'il existe un miroir interne.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] Claude a relu mes notes
