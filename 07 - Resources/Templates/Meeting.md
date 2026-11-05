<%*
const safeName = (s) => s.replace(/[\\/:*?"<>|#^\[\]]/g, "-").replace(/\s+/g, " ").trim().slice(0, 90);
const title = (await tp.system.prompt("Sujet de la réunion")) || "Réunion";
const whenIn = ((await tp.system.prompt("Date et heure (AAAA-MM-JJ HH:mm)", tp.date.now("YYYY-MM-DD HH:mm"))) || "").trim();
const when = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(whenIn) ? whenIn : tp.date.now("YYYY-MM-DD HH:mm");
const iso = when.replace(" ", "T");
const mtype = (await tp.system.suggester(
  ["Daily / Stand-up", "Planning", "Suivi de projet", "Revue technique", "Démo", "Rétrospective", "Kickoff", "Point 1:1", "Client"],
  ["daily", "planning", "suivi", "tech-review", "demo", "retro", "kickoff", "one-on-one", "client"], false, "Type")) || "suivi";
const projectFiles = app.vault.getMarkdownFiles()
  .filter(f => f.path.startsWith("01 - Projects/"))
  .filter(f => app.metadataCache.getFileCache(f)?.frontmatter?.type === "project")
  .map(f => f.basename).sort();
const project = (await tp.system.suggester(["— Aucun projet —", ...projectFiles], ["", ...projectFiles], false, "Projet")) || "";
const who = ((await tp.system.prompt("Participants (séparés par des virgules)", "")) || "")
  .split(",").map(s => s.trim()).filter(Boolean);
await tp.file.move("04 - Meetings/" + iso.slice(0, 10) + " " + safeName(title));
-%>
---
type: meeting
date: <% iso %>
meeting_type: <% mtype %>
project: <% project ? `"[[${project}]]"` : "" %>
participants:
<% who.length ? who.map(n => `  - "[[${n}]]"`).join("\n") : "  - Moi" %>
tags:
  - meeting
---
# <% title %>

**Objectif :**

## Notes
-

## Décisions
-

## Actions
%% « - [ ] Action [owner:: Nom] [due:: AAAA-MM-JJ] » — pour l'envoyer dans le Kanban : sélectionne la ligne → Alt+E → Action vers Kanban %%
- [ ]
