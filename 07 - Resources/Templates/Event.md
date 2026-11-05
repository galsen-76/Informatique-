<%*
const safeName = (s) => s.replace(/[\\/:*?"<>|#^\[\]]/g, "-").replace(/\s+/g, " ").trim().slice(0, 90);
const title = (await tp.system.prompt("Événement")) || tp.file.title;
const dayIn = ((await tp.system.prompt("Date (AAAA-MM-JJ)", tp.date.now("YYYY-MM-DD"))) || "").trim();
const day = /^\d{4}-\d{2}-\d{2}$/.test(dayIn) ? dayIn : tp.date.now("YYYY-MM-DD");
const projectFiles = app.vault.getMarkdownFiles()
  .filter(f => f.path.startsWith("01 - Projects/"))
  .filter(f => app.metadataCache.getFileCache(f)?.frontmatter?.type === "project")
  .map(f => f.basename).sort();
const project = (await tp.system.suggester(["— Aucun projet —", ...projectFiles], ["", ...projectFiles], false, "Projet")) || "";
await tp.file.move("03 - Calendar/Events/" + day + " " + safeName(title));
-%>
---
type: event
date: <% day %>
project: <% project ? `"[[${project}]]"` : "" %>
tags:
  - event
---
# <% title %>

-
