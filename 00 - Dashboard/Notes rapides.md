---
tags:
  - index
---
# Notes rapides

Captures faites avec le template **Quick Note**. À trier de temps en temps : en carte Kanban, en note technique ou à supprimer.

```dataview
LIST WITHOUT ID file.link + " · " + dateformat(file.ctime, "dd/MM HH:mm")
FROM "00 - Dashboard/Inbox"
SORT file.ctime DESC
```
