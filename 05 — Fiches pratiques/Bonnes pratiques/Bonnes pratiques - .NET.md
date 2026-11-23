---
type: bonnes-pratiques
sujet: ".NET"
concepts:
  - "[[Plateforme .NET]]"
  - "[[Projet et solution .NET]]"
  - "[[Variables et types]]"
  - "[[Exception]]"
  - "[[async et await]]"
  - "[[Service et injection de dépendances]]"
  - "[[Test automatisé]]"
tags:
  - bonnes-pratiques
---
# Bonnes pratiques - .NET

> [!info] À quoi sert cette fiche
> Écrire du C# et organiser un projet .NET comme le font les développeurs .NET expérimentés.
> Chaque règle dit **pourquoi** : c'est la raison qui compte, pour savoir l'adapter quand la situation change.

## À faire

### 1. Choisir une version LTS et la fixer
.NET 8, 10… (les versions paires). Écris la version du SDK dans un `global.json` à la racine (`dotnet new globaljson`).
Pourquoi : 3 ans de correctifs de sécurité, et toute l'équipe et la CI compilent avec le même SDK. Voir [[Plateforme .NET]].

### 2. Suivre les conventions de nommage
`PascalCase` pour les classes, méthodes, propriétés et namespaces ; `camelCase` pour les variables locales et les paramètres ; `_camelCase` pour les champs privés ; `I` devant une interface ; `Async` à la fin d'une méthode asynchrone.
Pourquoi : tout l'écosystème .NET les suit, ton code se lit comme celui des bibliothèques que tu utilises.

### 3. Laisser un outil formater et vérifier
`dotnet format` pour la mise en forme, un fichier `.editorconfig` pour les règles de l'équipe.
Pourquoi : les revues de code parlent du fond, pas des espaces. Voir [[Linter et formateur]].

### 4. Garder la nullabilité activée et traiter les avertissements
`<Nullable>enable</Nullable>` dans le `.csproj` (c'est le cas par défaut), et `-warnaserror` dans la CI.
Pourquoi : l'avertissement `CS8602` d'aujourd'hui est le `NullReferenceException` en production de demain.

### 5. Séparer le cœur et l'API en projets différents
Les classes et les règles dans une bibliothèque, l'API dans un projet web qui la référence, les tests dans un troisième.
Pourquoi : le cœur se teste sans HTTP, et le compilateur empêche le cœur de dépendre de l'API. Voir [[Projet et solution .NET]].

### 6. Passer par l'injection de dépendances
Une route ou une classe **demande** ce dont elle a besoin (dans son constructeur ou en paramètre) au lieu de faire `new` elle-même ; l'implémentation est choisie dans `Program.cs`.
Pourquoi : on change le stockage ou on le remplace par un faux dans un test sans toucher au code qui l'utilise. Voir [[Service et injection de dépendances]].

### 7. async jusqu'en haut
Une méthode qui appelle une méthode `…Async` est elle-même `async` et fait `await`.
Pourquoi : `.Result` et `.Wait()` bloquent un fil d'exécution et peuvent figer l'application. Voir [[async et await]].

### 8. Utiliser `decimal` pour l'argent
Pourquoi : `double` arrondit en binaire (`0.1 + 0.2` ne vaut pas exactement `0.3`) ; `decimal` compte comme un humain.

### 9. Mettre les réglages dans la configuration, les secrets hors du dépôt
Les réglages dans `appsettings.json`, ce qui change selon l'environnement en variables d'environnement, les secrets dans `dotnet user-secrets` en local et dans les variables de la CI ou du serveur ailleurs.
Pourquoi : la même image tourne partout, et aucun mot de passe ne finit dans Git. Voir [[Variable d'environnement]].

### 10. Journaliser avec `ILogger` et des messages structurés
`logger.LogInformation("Expense {Id} created", id)` plutôt qu'une chaîne construite à la main ; jamais de `Console.WriteLine` dans une API.
Pourquoi : chaque valeur devient un champ qu'on peut filtrer dans les journaux, et le niveau (Information, Warning, Error) se règle dans la configuration.

## À éviter

### 1. Attraper `Exception` pour ne rien faire
**Pourquoi c'est un problème :** l'erreur disparaît, le programme continue dans un état faux, et personne ne sait pourquoi.
**À la place :** attrape le type précis que tu sais traiter, et laisse remonter le reste (ou journalise-le avant de relancer avec `throw;`). Voir [[Exception]].

### 2. Commiter `bin/` et `obj/`
**Pourquoi c'est un problème :** fichiers lourds, propres à ta machine, qui créent des conflits à chaque compilation.
**À la place :** `dotnet new gitignore` dès la création du dépôt.

### 3. Modifier le `.csproj` ou le `.sln` à la main pour ajouter une dépendance
**Pourquoi c'est un problème :** une faute de chemin ou de version casse la compilation de toute l'équipe.
**À la place :** `dotnet add package`, `dotnet add reference`, `dotnet sln add`. Voir [[dotnet add]].

### 4. Suivre un tutoriel .NET Framework pour un projet .NET moderne
**Pourquoi c'est un problème :** `web.config`, `Global.asax`, `packages.config` n'existent plus ; tu perds du temps sur une API qui ne s'applique pas.
**À la place :** vérifie que la page parle de .NET 6 ou plus récent (ou d'ASP.NET **Core**).

### 5. Des méthodes `static` partout et une classe qui fait tout
**Pourquoi c'est un problème :** impossible à remplacer dans un test, et chaque modification touche tout.
**À la place :** de petites classes avec un rôle chacune, reliées par des interfaces. Voir [[Séparation des responsabilités]].

### 6. Charger toute une table pour en filtrer une partie
**Pourquoi c'est un problème :** `db.Depenses.ToList().Where(...)` ramène toutes les lignes en mémoire avant de filtrer.
**À la place :** `db.Depenses.Where(...).ToList()` : le filtre part dans la requête SQL. Voir [[ORM]].

## Avant de valider mon travail
- [ ] `dotnet build -warnaserror` passe à la racine de la solution
- [ ] `dotnet test` passe, et j'ai vu chaque nouveau test échouer une fois
- [ ] `dotnet format --verify-no-changes` ne trouve rien
- [ ] Aucun secret dans `appsettings.json` ni dans le code
- [ ] `bin/` et `obj/` ne sont pas dans le commit
- [ ] Les erreurs renvoient le bon code de statut (400, 404) et pas un 500

## Notions liées
[[Plateforme .NET]] · [[Projet et solution .NET]] · [[Variables et types]] · [[Exception]] · [[async et await]] · [[Service et injection de dépendances]] · [[Test automatisé]] · [[Bonnes pratiques - Code en général]] · [[Bonnes pratiques - Tests]] · [[Bonnes pratiques - API REST]]
