<%*
const name = (await tp.system.prompt("Nom du projet (le board s'appellera « Kanban - … »)")) || "Nouveau projet";
await tp.file.move("02 - Tasks/Kanban - " + name.replace(/[\\/:*?"<>|#^\[\]]/g, "-").trim());
-%>
---

kanban-plugin: basic

---

## Backlog



## Todo



## In Progress



## Review



## Done

**Complete**


%% kanban:settings
```
{"kanban-plugin": "basic", "lane-width": 260, "date-format": "YYYY-MM-DD", "show-checkboxes": false, "move-tags": true, "move-dates": true, "tag-colors": [{"tagKey": "#urgent", "color": "rgba(245, 100, 110, 1)", "backgroundColor": "rgba(245, 100, 110, 0.15)"}, {"tagKey": "#haute", "color": "rgba(245, 165, 80, 1)", "backgroundColor": "rgba(245, 165, 80, 0.15)"}, {"tagKey": "#bug", "color": "rgba(245, 100, 110, 1)", "backgroundColor": "rgba(245, 100, 110, 0.15)"}, {"tagKey": "#doc", "color": "rgba(84, 150, 255, 1)", "backgroundColor": "rgba(84, 150, 255, 0.15)"}, {"tagKey": "#dette", "color": "rgba(140, 148, 165, 1)", "backgroundColor": "rgba(140, 148, 165, 0.15)"}], "date-colors": [{"isBefore": true, "color": "rgba(245, 100, 110, 1)", "backgroundColor": "rgba(245, 100, 110, 0.15)"}, {"isToday": true, "color": "rgba(245, 165, 80, 1)", "backgroundColor": "rgba(245, 165, 80, 0.15)"}, {"distance": 2, "unit": "days", "direction": "after", "color": "rgba(245, 165, 80, 1)", "backgroundColor": "rgba(245, 165, 80, 0.1)"}]}
```
%%
