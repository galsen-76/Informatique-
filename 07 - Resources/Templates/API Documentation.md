<%*
const safeName = (s) => s.replace(/[\\/:*?"<>|#^\[\]]/g, "-").replace(/\s+/g, " ").trim().slice(0, 90);
const title = (await tp.system.prompt("Titre")) || tp.file.title;
const projectFiles = app.vault.getMarkdownFiles()
  .filter(f => f.path.startsWith("01 - Projects/"))
  .filter(f => app.metadataCache.getFileCache(f)?.frontmatter?.type === "project")
  .map(f => f.basename).sort();
const project = (await tp.system.suggester(["— Aucun projet —", ...projectFiles], ["", ...projectFiles], false, "Projet")) || "";
await tp.file.move("05 - Engineering/API/" + safeName(title));
-%>
---
type: engineering
kind: api
project: <% project ? `"[[${project}]]"` : "" %>
version: v1
created: <% tp.date.now("YYYY-MM-DD") %>
tags:
  - tech
---
# <% title %>

> [!info] Résumé
> Rôle de l'API, consommateurs, authentification.

## Endpoints
| Méthode | Route | Description |
| --- | --- | --- |
| `GET` | `/ressource` |  |
| `POST` | `/ressource` |  |

## Exemple
```json
{ "champ": "valeur" }
```

## Erreurs
| Code | Signification |
| --- | --- |
| 400 | Requête invalide |
| 401 | Non authentifié |
