<%*
const safeName = (s) => s.replace(/[\\/:*?"<>|#^\[\]]/g, "-").replace(/\s+/g, " ").trim().slice(0, 90);
const title = safeName((await tp.system.prompt("Erreur (code ou début du message)")) || tp.file.title);
const tool = (await tp.system.prompt("Outil concerné (Git, Node.js, Docker…)", "")) || "";
const conceptFiles = app.vault.getMarkdownFiles()
  .filter(f => f.path.startsWith("03 — Concepts/") && f.basename !== "Concepts")
  .map(f => f.basename).sort();
const picked = [];
while (true) {
  const c = await tp.system.suggester(["✓ Terminé", ...conceptFiles.filter(x => !picked.includes(x))], ["", ...conceptFiles.filter(x => !picked.includes(x))], false, "Concepts liés (un par un)");
  if (!c) break;
  picked.push(c);
}
await tp.file.move("06 — Erreurs et solutions/Erreur - " + title);
-%>
---
type: error
tool: <% tool %>
date: <% tp.date.now("YYYY-MM-DD") %>
concepts:
<% picked.length ? picked.map(c => `  - "[[${c}]]"`).join("\n") : "  []" %>
tags:
  - erreur
---
# Erreur — <% title %>

> [!bug] Message
> ```text
> (coller le message exact)
> ```

## Contexte
Ce que je faisais, quelle commande, quel fichier.

## Cause
Pourquoi c'est arrivé.

## Solution
1.

> [!tip] Prévenir
>

## Ce que j'ai appris
-
