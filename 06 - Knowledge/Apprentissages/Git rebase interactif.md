---
type: knowledge
category: apprentissages
created: 2026-11-04
tags:
  - knowledge
  - demo
---
# Git rebase interactif

`git rebase -i` nettoie l'historique d'une branche avant la PR.

```bash
git rebase -i HEAD~4   # squash / fixup / reword
```

> [!warning] Attention
> Ne jamais réécrire l'historique d'une branche partagée.
