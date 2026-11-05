<%*
const num = ((await tp.system.prompt("Numéro du sprint (ex. 05)")) || "").trim().padStart(2, "0");
const startIn = ((await tp.system.prompt("Début (AAAA-MM-JJ)", tp.date.now("YYYY-MM-DD"))) || "").trim();
const start = /^\d{4}-\d{2}-\d{2}$/.test(startIn) ? startIn : tp.date.now("YYYY-MM-DD");
await tp.file.move("02 - Tasks/Sprints/Sprint " + num);
-%>
---
type: sprint
status: active
start: <% start %>
end: <% window.moment(start, "YYYY-MM-DD").add(13, "days").format("YYYY-MM-DD") %>
tags:
  - sprint
---
# Sprint <% num %>

> [!tip] Objectif
>

## Engagements
- [ ]
- [ ]

## Notes
-
