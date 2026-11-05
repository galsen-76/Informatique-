---

kanban-plugin: basic

---

## Backlog

- [ ] Optimiser les requêtes SQL #dette · [[Index PostgreSQL]]
- [ ] Ajouter les tests E2E #haute
- [ ] Améliorer le monitoring


## Todo

- [ ] Corriger le timeout de l'export PDF #urgent #bug @{2026-11-04} · [[Bug - Timeout export PDF]]
- [ ] Préparer la démo du sprint #haute @{2026-11-06} · [[2026-11-04 Suivi sprint SaaS|réunion]]
- [ ] Gestion des rôles #haute @{2026-11-10}


## In Progress

- [ ] Implémenter l'authentification JWT #urgent @{2026-11-07} · [[Authentification JWT]]
- [ ] Intégration paiement @{2026-11-14}


## Review



## Done

**Complete**
- [x] Setup Docker · [[Docker Compose - environnement de dev]]
- [x] CI/CD GitHub Actions
- [x] Mettre à jour la doc d'installation #doc · [[2026-11-04 Suivi sprint SaaS|réunion]]


%% kanban:settings
```
{"kanban-plugin": "basic", "lane-width": 260, "date-format": "YYYY-MM-DD", "show-checkboxes": false, "move-tags": true, "move-dates": true, "tag-colors": [{"tagKey": "#urgent", "color": "rgba(245, 100, 110, 1)", "backgroundColor": "rgba(245, 100, 110, 0.15)"}, {"tagKey": "#haute", "color": "rgba(245, 165, 80, 1)", "backgroundColor": "rgba(245, 165, 80, 0.15)"}, {"tagKey": "#bug", "color": "rgba(245, 100, 110, 1)", "backgroundColor": "rgba(245, 100, 110, 0.15)"}, {"tagKey": "#doc", "color": "rgba(84, 150, 255, 1)", "backgroundColor": "rgba(84, 150, 255, 0.15)"}, {"tagKey": "#dette", "color": "rgba(140, 148, 165, 1)", "backgroundColor": "rgba(140, 148, 165, 0.15)"}], "date-colors": [{"isBefore": true, "color": "rgba(245, 100, 110, 1)", "backgroundColor": "rgba(245, 100, 110, 0.15)"}, {"isToday": true, "color": "rgba(245, 165, 80, 1)", "backgroundColor": "rgba(245, 165, 80, 0.15)"}, {"distance": 2, "unit": "days", "direction": "after", "color": "rgba(245, 165, 80, 1)", "backgroundColor": "rgba(245, 165, 80, 0.1)"}]}
```
%%
