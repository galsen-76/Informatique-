<%*
const safeName = (s) => s.replace(/[\\/:*?"<>|#^\[\]]/g, "-").replace(/\s+/g, " ").trim().slice(0, 90);
const title = (await tp.system.prompt("Titre")) || tp.file.title;
const lang = ((await tp.system.prompt("Langage (ts, py, bash, sql…)", "ts")) || "ts").trim();
const projectFiles = app.vault.getMarkdownFiles()
  .filter(f => f.path.startsWith("01 - Projects/"))
  .filter(f => app.metadataCache.getFileCache(f)?.frontmatter?.type === "project")
  .map(f => f.basename).sort();
const project = (await tp.system.suggester(["— Aucun projet —", ...projectFiles], ["", ...projectFiles], false, "Projet")) || "";
await tp.file.move("05 - Engineering/Snippets/" + safeName(title));
-%>
---
type: engineering
kind: snippet
project: <% project ? `"[[${project}]]"` : "" %>
language: <% lang %>
created: <% tp.date.now("YYYY-MM-DD") %>
tags:
  - tech
---
# <% title %>

À quoi ça sert :

```<% lang %>

```

## Utilisation
-
