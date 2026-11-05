<%*
/*
  Envoie une action de réunion dans la colonne « Todo » du Kanban du projet.
  Usage : sélectionne la ligne « - [ ] Texte [owner:: Nom] [due:: 2026-11-12] »
          puis Templater « Insérer un modèle » (Alt+E) → Action vers Kanban.
*/
const raw = tp.file.selection() || "";
if (!raw.trim()) {
  tR += "%% Sélectionne d'abord une ligne d'action %%";
} else {
  const field = (k) => ((raw.match(new RegExp("\\[" + k + "::\\s*([^\\]]+)\\]")) || [])[1] || "").trim();
  const owner = field("owner");
  const due = /^\d{4}-\d{2}-\d{2}$/.test(field("due")) ? field("due") : "";
  const title = raw.replace(/^\s*[-*]\s*\[.\]\s*/, "").replace(/\[[a-z_]+::[^\]]*\]/g, "").trim();
  const project = String(tp.frontmatter?.project || "").replace(/^\[\[|\]\]$/g, "").split("|")[0].split("/").pop();
  const boards = app.vault.getMarkdownFiles()
    .filter(f => f.path.startsWith("02 - Tasks/") && f.basename.startsWith("Kanban - "));
  let file = boards.find(f => f.basename === "Kanban - " + project);
  if (!file) file = await tp.system.suggester(boards.map(f => f.basename), boards, false, "Dans quel Kanban ?");
  if (!file) {
    tR += raw;
  } else {
    const card = `- [ ] ${title}` + (owner && owner !== "Moi" ? ` (${owner})` : "") + (due ? ` @{${due}}` : "") + ` · [[${tp.file.title}|réunion]]`;
    await app.vault.process(file, (data) => {
      const lines = data.split("\n");
      let i = lines.findIndex(l => /^##\s+(todo|à faire)\s*$/i.test(l));
      if (i === -1) i = lines.findIndex(l => /^##\s+/.test(l));
      let j = i + 1;
      while (j < lines.length && lines[j].trim() === "") j++;
      if (j < lines.length && /^- \[/.test(lines[j]) === false) j = i + 2;
      lines.splice(j, 0, card);
      return lines.join("\n");
    });
    tR += `- [x] ${title} → [[${file.basename}]]`;
  }
}
-%>
