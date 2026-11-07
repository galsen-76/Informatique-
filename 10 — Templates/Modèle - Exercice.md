<%*
const safeName = (s) => s.replace(/[\\/:*?"<>|#^\[\]]/g, "-").replace(/\s+/g, " ").trim().slice(0, 90);
const title = safeName((await tp.system.prompt("Titre de l'exercice")) || tp.file.title);
const difficulty = (await tp.system.suggester(["Facile", "Moyen", "Difficile"], ["facile", "moyen", "difficile"], false, "Difficulté")) || "moyen";
const conceptFiles = app.vault.getMarkdownFiles()
  .filter(f => f.path.startsWith("03 — Concepts/") && f.basename !== "Concepts")
  .map(f => f.basename).sort();
// Une seule notion par exercice
const concept = await tp.system.suggester(conceptFiles, conceptFiles, false, "Notion travaillée (une seule)");
const picked = concept ? [concept] : [];
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

> [!info] Avant de commencer
> **Notion travaillée :** <% picked.map(c => `[[${c}]]`).join("") %>
> **À voir avant :** rien d'autre que cette notion (ou seulement les prérequis indispensables).
> **Objectif :** ce que je dois comprendre à la fin.

> [!tip] Comment faire cet exercice
> Les consignes donnent un **but**, pas la commande. Quand on te demande de **prédire**, écris ta réponse *avant* de lancer quoi que ce soit. Tu peux chercher dans la fiche de la notion, pas dans la solution.

## Étapes
### 1. 🔮 Prédire
Ce qui va se passer, et pourquoi.
- [ ] Fait
### 2. 🧪 Vérifier
Essayer, comparer à la prédiction.
- [ ] Fait
### 3. 💬 Expliquer
Pourquoi c'est comme ça.
- [ ] Fait
### 4. 🔧 Réparer
Un cas cassé à diagnostiquer.
- [ ] Fait
### 5. 🧩 Résoudre
Un but à atteindre sans que la commande soit donnée.
- [ ] Fait

> [!question]- Indice (l'idée, pas la réponse)
>

> [!question]- Solution et raisonnement
>

## Validation
- [ ] Mes prédictions : justes, ou je sais maintenant pourquoi elles étaient fausses
- [ ] Je sais expliquer la notion à quelqu'un, sans la fiche
