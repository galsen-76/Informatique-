<%*
const safeName = (s) => s.replace(/[\\/:*?"<>|#^\[\]]/g, "-").replace(/\s+/g, " ").trim().slice(0, 90);
const title = (await tp.system.prompt("Titre")) || tp.file.title;
const projectFiles = app.vault.getMarkdownFiles()
  .filter(f => f.path.startsWith("01 - Projects/"))
  .filter(f => app.metadataCache.getFileCache(f)?.frontmatter?.type === "project")
  .map(f => f.basename).sort();
const project = (await tp.system.suggester(["— Aucun projet —", ...projectFiles], ["", ...projectFiles], false, "Projet")) || "";
await tp.file.move("05 - Engineering/Debugging/Bug - " + safeName(title));
-%>
---
type: engineering
kind: bug
project: <% project ? `"[[${project}]]"` : "" %>
status: investigating
created: <% tp.date.now("YYYY-MM-DD") %>
tags:
  - tech
---
# <% title %>

> [!bug] Symptôme
> Ce qui est observé, message d'erreur exact.

## Reproduction
1.
2.

## Hypothèses
- [ ]

## Logs
```text

```

> [!success] Cause & correctif
>
