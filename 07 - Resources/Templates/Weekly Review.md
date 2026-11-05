<%*
const ref = /^\d{4}-W\d{2}$/.test(tp.file.title) ? window.moment(tp.file.title, "GGGG-[W]WW") : window.moment();
const start = ref.clone().startOf("isoWeek");
const name = start.format("GGGG-[W]WW");
if (tp.file.title !== name) { await tp.file.move("03 - Calendar/Weekly/" + name); }
-%>
---
type: weekly
week: <% name %>
week_start: <% start.format("YYYY-MM-DD") %>
tags:
  - weekly
---
# Semaine <% start.format("W") %> · <% start.format("DD/MM") %> → <% start.clone().add(6, "days").format("DD/MM") %>

```dataviewjs
await dv.view("07 - Resources/Scripts/workspace", { view: "week" })
```

## Bilan
- **Ce qui a avancé :**
- **Ce qui a bloqué :**
- **Ce que j'ai appris :**

## Priorités de la semaine prochaine
- [ ]
- [ ]
