<%*
const safeName = (s) => s.replace(/[\\/:*?"<>|#^\[\]]/g, "-").replace(/\s+/g, " ").trim().slice(0, 90);
const name = safeName((await tp.system.prompt("Nom du projet")) || tp.file.title);
const status = (await tp.system.suggester(["Actif", "Planifié", "En pause"], ["active", "planned", "paused"], false, "Statut")) || "active";
const deadlineIn = ((await tp.system.prompt("Deadline (AAAA-MM-JJ, vide si aucune)", "")) || "").trim();
const deadline = /^\d{4}-\d{2}-\d{2}$/.test(deadlineIn) ? deadlineIn : "";
await tp.file.move("01 - Projects/" + name);
// Crée le board Kanban du projet s'il n'existe pas
if (!app.vault.getAbstractFileByPath("02 - Tasks/Kanban - " + name + ".md")) {
  const board = '---\n\nkanban-plugin: basic\n\n---\n\n## Backlog\n\n\n\n## Todo\n\n\n\n## In Progress\n\n\n\n## Review\n\n\n\n## Done\n\n**Complete**\n\n\n%% kanban:settings\n```\n{"kanban-plugin": "basic", "lane-width": 260, "date-format": "YYYY-MM-DD", "show-checkboxes": false, "move-tags": true, "move-dates": true, "tag-colors": [{"tagKey": "#urgent", "color": "rgba(245, 100, 110, 1)", "backgroundColor": "rgba(245, 100, 110, 0.15)"}, {"tagKey": "#haute", "color": "rgba(245, 165, 80, 1)", "backgroundColor": "rgba(245, 165, 80, 0.15)"}, {"tagKey": "#bug", "color": "rgba(245, 100, 110, 1)", "backgroundColor": "rgba(245, 100, 110, 0.15)"}, {"tagKey": "#doc", "color": "rgba(84, 150, 255, 1)", "backgroundColor": "rgba(84, 150, 255, 0.15)"}, {"tagKey": "#dette", "color": "rgba(140, 148, 165, 1)", "backgroundColor": "rgba(140, 148, 165, 0.15)"}], "date-colors": [{"isBefore": true, "color": "rgba(245, 100, 110, 1)", "backgroundColor": "rgba(245, 100, 110, 0.15)"}, {"isToday": true, "color": "rgba(245, 165, 80, 1)", "backgroundColor": "rgba(245, 165, 80, 0.15)"}, {"distance": 2, "unit": "days", "direction": "after", "color": "rgba(245, 165, 80, 1)", "backgroundColor": "rgba(245, 165, 80, 0.1)"}]}\n```\n%%';
  await tp.file.create_new(board, "Kanban - " + name, false, app.vault.getAbstractFileByPath("02 - Tasks"));
}
-%>
---
type: project
status: <% status %>
start: <% tp.date.now("YYYY-MM-DD") %>
deadline: <% deadline %>
stack: []
repo: ""
tags:
  - project
---
# <% name %>

> [!info] En une phrase
> Quel problème ce projet résout-il, et pour qui ?

## Objectifs
-

## Roadmap
- [ ] Cadrage
- [ ] MVP
- [ ] Tests
- [ ] Mise en production

## Tâches
```dataviewjs
await dv.view("07 - Resources/Scripts/workspace", { view: "board" })
```

## Journal
```dataviewjs
await dv.view("07 - Resources/Scripts/workspace", { view: "project-log" })
```

## Réunions
```dataview
LIST WITHOUT ID file.link + " · " + dateformat(date, "dd/MM/yyyy")
FROM "04 - Meetings"
WHERE type = "meeting" AND project = this.file.link
SORT date DESC
```

## Documentation & décisions
```dataview
LIST WITHOUT ID file.link + " · " + kind
FROM "05 - Engineering"
WHERE type = "engineering" AND project = this.file.link
SORT kind ASC
```

## Risques
-
