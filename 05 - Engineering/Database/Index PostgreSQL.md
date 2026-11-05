---
type: engineering
kind: technical-note
project: "[[Application SaaS]]"
domain: database
created: 2026-11-03
tags:
  - tech
  - demo
---
# Index PostgreSQL

> [!info] Contexte
> Les listes de tâches par projet dépassent 800 ms en staging.

```sql
CREATE INDEX CONCURRENTLY idx_tasks_project_status_due
  ON tasks (project_id, status, due_date);
```
