<%*
const num = parseInt((await tp.system.prompt("Numéro du module (ex. 16)")) || "16", 10);
const title = ((await tp.system.prompt("Titre du module")) || "Nouveau module").trim();
const why = ((await tp.system.prompt("Pourquoi ce module vient à cette place ?", "")) || "").replace(/"/g, "'");
await tp.file.move("01 — Parcours/Modules/Module " + String(num).padStart(2, "0") + " - " + title);
-%>
---
type: module
order: <% num %>
title: "<% title %>"
prerequisites: []
why: "<% why %>"
tags:
  - module
---
# <% String(num).padStart(2, "0") %> · <% title %>

> [!tip] Pourquoi à cette place dans le parcours
> <% why %>

## Objectifs
-

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "module" })
```
