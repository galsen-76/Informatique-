<%*
const safeName = (s) => s.replace(/[\\/:*?"<>|#^\[\]]/g, "-").replace(/\s+/g, " ").trim().slice(0, 90);
const title = (await tp.system.prompt("Décision (ex. Utiliser PostgreSQL)")) || tp.file.title;
const nums = app.vault.getMarkdownFiles()
  .filter(f => f.path.startsWith("05 - Engineering/ADR/"))
  .map(f => parseInt((f.basename.match(/^ADR-(\d+)/) || [])[1] || "0", 10));
const id = "ADR-" + String(Math.max(0, ...nums) + 1).padStart(3, "0");
const projectFiles = app.vault.getMarkdownFiles()
  .filter(f => f.path.startsWith("01 - Projects/"))
  .filter(f => app.metadataCache.getFileCache(f)?.frontmatter?.type === "project")
  .map(f => f.basename).sort();
const project = (await tp.system.suggester(["— Aucun projet —", ...projectFiles], ["", ...projectFiles], false, "Projet")) || "";
await tp.file.move("05 - Engineering/ADR/" + id + " " + safeName(title));
-%>
---
type: engineering
kind: adr
status: proposed
date: <% tp.date.now("YYYY-MM-DD") %>
project: <% project ? `"[[${project}]]"` : "" %>
tags:
  - adr
---
# <% id %> — <% title %>

## Contexte
-

## Décision
> [!decision] Décision retenue
>

## Alternatives considérées
-

## Conséquences
-
