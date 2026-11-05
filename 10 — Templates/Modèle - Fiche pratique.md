<%*
const safeName = (s) => s.replace(/[\\/:*?"<>|#^\[\]]/g, "-").replace(/\s+/g, " ").trim().slice(0, 90);
const title = safeName((await tp.system.prompt("Que permet cette fiche ? (ex. Configurer SSH pour GitHub)")) || tp.file.title);
const conceptFiles = app.vault.getMarkdownFiles()
  .filter(f => f.path.startsWith("03 — Concepts/") && f.basename !== "Concepts")
  .map(f => f.basename).sort();
const picked = [];
while (true) {
  const c = await tp.system.suggester(["✓ Terminé", ...conceptFiles.filter(x => !picked.includes(x))], ["", ...conceptFiles.filter(x => !picked.includes(x))], false, "Concepts liés (un par un)");
  if (!c) break;
  picked.push(c);
}
await tp.file.move("05 — Fiches pratiques/Fiche - " + title);
-%>
---
type: howto
concepts:
<% picked.length ? picked.map(c => `  - "[[${c}]]"`).join("\n") : "  []" %>
tags:
  - fiche-pratique
---
# Fiche - <% title %>

> [!info] Objectif
>

## Étapes
1.
2.
3.

> [!success] Vérifier que ça marche
>

## Liens
<% picked.map(c => `[[${c}]]`).join(" · ") %>
