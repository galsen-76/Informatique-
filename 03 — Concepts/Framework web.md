---
type: concept
module: "[[Module 08 - Backend et API REST]]"
related:
  - "[[Endpoint]]"
  - "[[Middleware]]"
  - "[[Service et injection de dépendances]]"
tags:
  - concept
  - backend
---
# Framework web

> [!info] En une phrase
> Un **framework web** est une base de code qui reçoit les requêtes HTTP à ta place et appelle **ta** fonction selon l'adresse et la méthode : tu écris seulement ce que fait chaque route.

## 1 · Comprendre
### Définition
Sans framework, il faudrait ouvrir un port, lire les octets de la requête, découper l'en-tête, transformer le JSON, gérer les erreurs… Un framework web s'en charge et te laisse écrire :
- les **routes** (une méthode + une adresse → une fonction, voir [[Endpoint]]) ;
- ce que fait chaque fonction.

Il apporte aussi, prêts à l'emploi : la lecture et l'écriture du JSON, la validation des données, les [[Middleware|middlewares]] (journal, authentification, CORS), la configuration, et souvent l'[[Service et injection de dépendances|injection de dépendances]] et une documentation [[OpenAPI]].

Exemples : **FastAPI** ou Flask (Python), **Express** (Node.js), **ASP.NET Core** (.NET), Spring (Java).

### Pourquoi ça existe
Toutes les API ont besoin des mêmes briques. Les réécrire à chaque projet serait long et plein de failles.

### Le problème résolu
Se concentrer sur ce qui est propre à l'application (les règles, les données) et laisser le framework gérer HTTP de façon correcte et sûre.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  R[Requête HTTP] --> F[Framework]
  F --> M[Middlewares]
  M --> T[Ta fonction]
  T --> J[Réponse JSON]
```
« Ne m'appelle pas, c'est moi qui t'appelle » : c'est le framework qui a la main et qui appelle ton code au bon moment. C'est la différence avec une **bibliothèque**, que c'est toi qui appelles.

### Exemple concret
La même route dans deux frameworks : `GET /depenses` renvoie la liste en JSON.

> [!abstract]- Comment ça s'écrit (référence à chercher, pas à apprendre par cœur)
> **Python (FastAPI)**
> ```python
> app = FastAPI()
>
> @app.get("/depenses")
> def lister():
>     return depenses
> ```
> **C# (ASP.NET Core, API minimale)**
> ```csharp
> var builder = WebApplication.CreateBuilder(args);
> var app = builder.Build();
>
> app.MapGet("/depenses", () => depenses);
>
> app.Run();
> ```
> **JavaScript (Express)**
> ```js
> const app = express();
> app.get("/depenses", (req, res) => res.json(depenses));
> app.listen(3000);
> ```
> Dans les trois cas : on crée l'application, on déclare une route, on lance le serveur. Le framework transforme la liste en JSON tout seul.

### Cas d'utilisation
- Toute API REST
- Un back-end qui sert aussi des pages web

> [!warning] À ne pas confondre
> **Framework** (il appelle ton code, il impose une structure) et **bibliothèque** (tu l'appelles quand tu veux, comme `requests`). Et **framework web** (côté serveur) et **framework front** (Vue, React, Angular : côté navigateur).

## 3 · Relier
- **Prérequis** : [[HTTP]] · [[API REST]]
- **Complémentaires** : [[Endpoint]] · [[Middleware]] · [[Service et injection de dépendances]] · [[OpenAPI]]
- **Utilisé par** : [[Cours - Une API web avec ASP.NET Core]]
