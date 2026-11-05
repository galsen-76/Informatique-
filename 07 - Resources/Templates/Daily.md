<%*
const valid = /^\d{4}-\d{2}-\d{2}$/.test(tp.file.title);
const day = valid ? tp.file.title : tp.date.now("YYYY-MM-DD");
if (!valid) { await tp.file.move("03 - Calendar/Daily/" + day); }
const label = window.moment(day, "YYYY-MM-DD").locale("fr").format("dddd D MMMM YYYY");
-%>
---
type: daily
date: <% day %>
tags:
  - daily
---
# <% label.charAt(0).toUpperCase() + label.slice(1) %>

## Focus
- [ ]
- [ ]

## Log
%% Une ligne par chose faite, ex. : `[[Projet]] avec [[Personne]] : ce que j'ai fait #compétence` %%
-

## Agenda & tâches
```dataviewjs
await dv.view("07 - Resources/Scripts/workspace", { view: "day" })
```

## Notes
-
