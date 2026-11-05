<%*
const safeName = (s) => s.replace(/[\\/:*?"<>|#^\[\]]/g, "-").replace(/\s+/g, " ").trim().slice(0, 90);
const title = safeName((await tp.system.prompt("Titre de l'exercice")) || tp.file.title);
const difficulty = (await tp.system.suggester(["Facile", "Moyen", "Difficile"], ["facile", "moyen", "difficile"], false, "Difficulté")) || "moyen";
const conceptFiles = app.vault.getMarkdownFiles()
  .filter(f => f.path.startsWith("03 — Concepts/") && f.basename !== "Concepts")
  .map(f => f.basename).sort();
const picked = [];
while (true) {
  const c = await tp.system.suggester(["✓ Terminé", ...conceptFiles.filter(x => !picked.includes(x))], ["", ...conceptFiles.filter(x => !picked.includes(x))], false, "Concepts liés (un par un)");
  if (!c) break;
  picked.push(c);
}
await tp.file.move("07 — Exercices et projets/Exercice - " + title);
-%>
---
type: exercise
status: a-faire
difficulty: <% difficulty %>
concepts:
<% picked.length ? picked.map(c => `  - "[[${c}]]"`).join("\n") : "  []" %>
tags:
  - exercice
---
# Exercice — <% title %>

> [!info] Objectif
> Ce que je dois être capable de faire à la fin.
> Notions : <% picked.map(c => `[[${c}]]`).join(" · ") %>

## Consignes
- [ ]
- [ ]
- [ ]

> [!question]- Indice
>

> [!question]- Solution
>

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
