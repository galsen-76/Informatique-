<%*
const safeName = (s) => s.replace(/[\\/:*?"<>|#^\[\]]/g, "-").replace(/\s+/g, " ").trim().slice(0, 90);
const title = (await tp.system.prompt("Titre")) || tp.file.title;
const domain = (await tp.system.suggester(["Architecture", "Backend", "Frontend", "Database", "DevOps", "API", "Debugging"], ["Architecture", "Backend", "Frontend", "Database", "DevOps", "API", "Debugging"], false, "Domaine")) || "Backend";
const projectFiles = app.vault.getMarkdownFiles()
  .filter(f => f.path.startsWith("01 - Projects/"))
  .filter(f => app.metadataCache.getFileCache(f)?.frontmatter?.type === "project")
  .map(f => f.basename).sort();
const project = (await tp.system.suggester(["— Aucun projet —", ...projectFiles], ["", ...projectFiles], false, "Projet")) || "";
await tp.file.move("05 - Engineering/" + domain + "/" + safeName(title));
-%>
---
type: engineering
kind: technical-note
project: <% project ? `"[[${project}]]"` : "" %>
domain: <% domain.toLowerCase() %>
created: <% tp.date.now("YYYY-MM-DD") %>
tags:
  - tech
---
# <% title %>

> [!info] Contexte
> Le problème technique et pourquoi cette note.

## Solution
-

```ts
// exemple
```

## Points d'attention
-

## Références
-
