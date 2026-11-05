<%*
const safeName = (s) => s.replace(/[\\/:*?"<>|#^\[\]]/g, "-").replace(/\s+/g, " ").trim().slice(0, 90);
const title = safeName((await tp.system.prompt("Commande (ex. git rebase)")) || tp.file.title);
const tool = (await tp.system.suggester(["Git", "Terminal", "PowerShell", "npm", "Node", "Docker", "SQL", "Linux", "Autre"], ["Git", "Terminal", "PowerShell", "npm", "Node", "Docker", "SQL", "Linux", "Autre"], false, "Outil")) || "Autre";
const conceptFiles = app.vault.getMarkdownFiles()
  .filter(f => f.path.startsWith("03 — Concepts/") && f.basename !== "Concepts")
  .map(f => f.basename).sort();
const picked = [];
while (true) {
  const c = await tp.system.suggester(["✓ Terminé", ...conceptFiles.filter(x => !picked.includes(x))], ["", ...conceptFiles.filter(x => !picked.includes(x))], false, "Concepts liés (un par un)");
  if (!c) break;
  picked.push(c);
}
await tp.file.move("04 — Commandes/" + tool + "/" + title);
-%>
---
type: command
tool: <% tool %>
level: debutant
concepts:
<% picked.length ? picked.map(c => `  - "[[${c}]]"`).join("\n") : "  []" %>
tags:
  - commande
---
# <% title %>

> [!info] <% tool %>
> À quoi sert-elle, en une phrase.

## Pourquoi l'utiliser
-

## Dans quel contexte
-

## Syntaxe
```bash
<% title %>
```

## Paramètres
| Élément | Rôle |
| --- | --- |
|  |  |

## Exemple concret
```bash

```

## Résultat attendu
-

## Variantes utiles
-

> [!warning] Erreurs fréquentes
> -

## Relier
- **Commandes complémentaires** :
- **Concepts associés** : <% picked.map(c => `[[${c}]]`).join(" · ") %>
