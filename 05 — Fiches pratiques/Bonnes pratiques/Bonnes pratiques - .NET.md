---
type: bonnes-pratiques
sujet: ".NET"
tags:
  - bonnes-pratiques
---
# Bonnes pratiques - .NET

## À faire

| Règle | Pourquoi |
| --- | --- |
| Version LTS (8, 10…) fixée dans `global.json` | Même SDK pour l'équipe et la CI |
| `PascalCase` (classes, méthodes), `camelCase` (variables), `I` devant une interface | Le code se lit comme celui des bibliothèques |
| `dotnet format` + `.editorconfig` | Les revues parlent du fond, pas des espaces |
| Nullabilité activée, avertissements traités | Un avertissement aujourd'hui = un crash en prod demain |
| Cœur, API et tests dans 3 projets séparés | Le cœur se teste sans HTTP |
| Injection de dépendances, pas de `new` partout | On remplace une pièce sans tout toucher |
| `async` + `await` jusqu'en haut | `.Result` et `.Wait()` peuvent figer l'appli |
| `decimal` pour l'argent | `double` arrondit mal |
| Réglages dans `appsettings.json`, secrets hors du dépôt | Aucun mot de passe dans Git |
| `ILogger` avec des messages structurés | On filtre les logs par champ |

## À éviter

| Au lieu de… | Fais plutôt |
| --- | --- |
| `catch (Exception) { }` vide | Attraper le type précis, laisser remonter le reste |
| Commiter `bin/` et `obj/` | `dotnet new gitignore` dès le début |
| Modifier le `.csproj` à la main | `dotnet add package`, `dotnet add reference` |
| Suivre un tuto .NET Framework | Vérifier que c'est .NET 6+ ou ASP.NET **Core** |
| Du `static` partout, une classe qui fait tout | Petites classes, une responsabilité chacune |
| `.ToList().Where(...)` | `.Where(...).ToList()` : le filtre part en SQL |

## Avant de valider
- [ ] `dotnet build -warnaserror` passe
- [ ] `dotnet test` passe
- [ ] `dotnet format --verify-no-changes` ne trouve rien
- [ ] Aucun secret dans le code ni dans `appsettings.json`
- [ ] Les erreurs renvoient 400 ou 404, pas 500

## Voir aussi
[[Plateforme .NET]] · [[Projet et solution .NET]] · [[Service et injection de dépendances]] · [[async et await]] · [[Exception]]
