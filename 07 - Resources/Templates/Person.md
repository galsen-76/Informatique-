<%*
const safeName = (s) => s.replace(/[\\/:*?"<>|#^\[\]]/g, "-").replace(/\s+/g, " ").trim().slice(0, 90);
const name = safeName((await tp.system.prompt("Nom de la personne")) || tp.file.title);
const role = (await tp.system.prompt("Rôle (ex. tuteur, dev back, client)", "")) || "";
await tp.file.move("04 - Meetings/Personnes/" + name);
-%>
---
type: person
role: "<% role.replace(/"/g, "'") %>"
company: ""
email: ""
tags:
  - person
---
# <% name %>

## Ce qu'on a fait ensemble
```dataviewjs
await dv.view("07 - Resources/Scripts/workspace", { view: "person" })
```

## Notes
-
