<%*
const safeName = (s) => s.replace(/[\\/:*?"<>|#^\[\]]/g, "-").replace(/\s+/g, " ").trim().slice(0, 90);
const title = (await tp.system.prompt("Titre")) || tp.file.title;
const folder = (await tp.system.suggester(["Veille", "IA", "Outils", "Apprentissages", "Tutoriels", "Références"], ["Veille", "IA", "Outils", "Apprentissages", "Tutoriels", "Références"], false, "Rubrique")) || "Veille";
const source = (await tp.system.prompt("Source (URL, livre, collègue…)", "")) || "";
await tp.file.move("06 - Knowledge/" + folder + "/" + safeName(title));
-%>
---
type: knowledge
category: <% folder.toLowerCase() %>
source: "<% source.replace(/"/g, "'") %>"
created: <% tp.date.now("YYYY-MM-DD") %>
tags:
  - knowledge
---
# <% title %>

> [!tip] À retenir
>

## Points clés
-

## Exemple
```text

```
