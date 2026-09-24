---
type: guide
tags:
  - snippets
aliases:
  - "Index des snippets"
---

# 🧩 Snippets

Chaque note de connaissance contient un lien « Extrait de code → `[[04_Snippets/…]]` ». **Cliquer dessus crée le fichier** ici, avec le modèle `TPL_Snippet` appliqué automatiquement par Templater.

Un snippet = TA version commentée et testée de l'exemple, réutilisable dans les projets.

```dataview
TABLE WITHOUT ID file.link AS "Snippet", language AS "Langage", domain AS "Domaine"
FROM "04_Snippets"
WHERE type = "snippet"
SORT file.mtime DESC
```
