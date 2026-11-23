---
type: concept
domain: dotnet
module: "[[Module 24 - .NET]]"
status: a-decouvrir
level: debutant
niveau: 5
schema: false
exercice_visuel: false
fil_rouge: false
prerequisites:
  - "[[Plateforme .NET]]"
  - "[[Module et import]]"
parents: []
related:
  - "[[Gestionnaire de paquets]]"
  - "[[Séparation des responsabilités]]"
next_review: 
tags:
  - concept
  - dotnet
---
# Projet et solution .NET

> [!info] En une phrase
> En .NET, un **projet** (fichier `.csproj`) produit un programme ou une bibliothèque ; une **solution** (fichier `.sln`) regroupe plusieurs projets qui travaillent ensemble.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
- **Projet** : un dossier avec un fichier `.csproj` et des fichiers `.cs`. Le `.csproj` dit **quoi** construire (une application qu'on lance, ou une **bibliothèque** que d'autres projets utilisent), pour **quelle version** de .NET, et avec **quels paquets** NuGet.
- **Solution** : un fichier `.sln` qui liste des projets. Elle ne contient pas de code ; elle sert à tout construire et tout tester en une commande, et à ouvrir l'ensemble dans l'éditeur.
- **Référence de projet** : le projet A déclare qu'il utilise le projet B. A peut alors appeler les classes publiques de B.

### Pourquoi ça existe
Séparer le code en morceaux qui ont chacun un rôle : le cœur métier dans une bibliothèque, l'API dans un projet web, les tests dans un projet de tests. Chaque morceau se compile et se teste à part.

### Le problème résolu
Éviter le « gros projet unique » où tout dépend de tout. Une référence ne va que dans un sens : si la bibliothèque n'a pas de référence vers l'API, elle ne **peut pas** en dépendre, et le compilateur le garantit.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  S[Solution .sln] --> A[Projet Api]
  S --> C[Projet Core]
  S --> T[Projet Tests]
  A -->|référence| C
  T -->|référence| C
```

### Exemple concret
Une solution typique :
```text
MesDepenses/
├── MesDepenses.sln
├── src/
│   ├── MesDepenses.Core/        bibliothèque : les classes et les règles
│   │   ├── MesDepenses.Core.csproj
│   │   └── Depense.cs
│   └── MesDepenses.Api/         application web
│       ├── MesDepenses.Api.csproj
│       ├── Program.cs           point d'entrée
│       └── appsettings.json     configuration
└── tests/
    └── MesDepenses.Core.Tests/
```
Un `.csproj` minimal :
```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
  </PropertyGroup>
  <ItemGroup>
    <PackageReference Include="Serilog" Version="4.0.0" />
    <ProjectReference Include="..\MesDepenses.Core\MesDepenses.Core.csproj" />
  </ItemGroup>
</Project>
```
- `bin/` et `obj/` : produits par la compilation, à mettre dans `.gitignore` (`dotnet new gitignore` le crée).
- `Program.cs` : là où le programme démarre.

### Cas d'utilisation
- Une API + sa bibliothèque métier + ses tests
- Partager du code entre une API et un outil en ligne de commande

> [!warning] À ne pas confondre
> La **solution** (`.sln`, juste une liste) et le **projet** (`.csproj`, ce qui se compile). Et la **référence de projet** (vers un projet de la même solution) et la **référence de paquet** (vers un paquet NuGet téléchargé, voir [[Gestionnaire de paquets]]).

> [!abstract]- Comment ça s'écrit (référence à chercher, pas à apprendre par cœur)
> ```bash
> dotnet new sln -n MesDepenses
> dotnet new classlib -o src/MesDepenses.Core
> dotnet new webapi   -o src/MesDepenses.Api
> dotnet sln add src/MesDepenses.Core src/MesDepenses.Api
> dotnet add src/MesDepenses.Api reference src/MesDepenses.Core
> dotnet build          # à la racine : construit toute la solution
> ```
> Depuis .NET 9, la solution peut aussi être au format `.slnx` (plus court, en XML) ; les commandes sont les mêmes.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] 🧠 Dessine de mémoire
> Dessine une solution avec trois projets (une bibliothèque, une application, des tests) et les flèches de référence. Barre la flèche qui serait interdite si on veut une bibliothèque indépendante.

> [!example] 🔄 Change de contexte
> Redessine le même découpage pour un projet Python ou JavaScript : qu'est-ce qui joue le rôle du `.csproj`, de la solution et de la référence de projet ?

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Projet et solution .NET » et je l'intègre ici avec `![[Schéma - Projet et solution .NET.excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- [[Découvrir .NET 02 - Une solution en deux projets]]

## 4 · Relier
- **Prérequis** : [[Plateforme .NET]] · [[Module et import]]
- **Complémentaires** : [[Gestionnaire de paquets]] · [[Séparation des responsabilités]]
- **Commandes** : [[dotnet new]] · [[dotnet add]] · [[dotnet build]]

## 5 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation (compris, puis maîtrisé)
Trois cases à cocher dans les propriétés de la fiche :
- `schema` : mon dessin du concept est dans « Mon schéma » ;
- `exercice_visuel` : j'ai fait et corrigé les exercices visuels de la section 3 ;
- `fil_rouge` : je l'ai appliqué dans le fil rouge (coché tout seul quand une étape qui l'utilise est réussie).

Les trois cochées : la notion compte comme **comprise**. **Maîtrisé** : c'est moi qui le mets dans `status`, quand je le sens.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
