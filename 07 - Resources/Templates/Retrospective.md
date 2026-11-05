<%*
const sprint = (await tp.system.prompt("Sprint concerné (ex. Sprint 04)")) || "Sprint";
await tp.file.move("02 - Tasks/Sprints/Rétro - " + sprint);
-%>
---
type: retro
sprint: "[[<% sprint %>]]"
date: <% tp.date.now("YYYY-MM-DD") %>
tags:
  - retro
---
# Rétro — <% sprint %>

> [!success] Ce qui a bien marché
> -

> [!warning] À améliorer
> -

## Actions
- [ ]
