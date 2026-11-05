<%*
await tp.file.move("00 - Dashboard/Inbox/" + tp.date.now("YYYY-MM-DD HHmm"));
-%>
---
type: quick
created: <% tp.date.now("YYYY-MM-DDTHH:mm") %>
---
# Note rapide — <% tp.date.now("DD/MM HH:mm") %>

<% tp.file.cursor() %>
