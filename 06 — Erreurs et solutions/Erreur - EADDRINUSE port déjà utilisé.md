---
type: error
tool: Node.js
date: 2026-11-04
concepts:
  - "[[Node.js]]"
  - "[[Express]]"
tags:
  - erreur
---
# Erreur — EADDRINUSE : port déjà utilisé

> [!bug] Message
> ```text
> Error: listen EADDRINUSE: address already in use :::3000
> ```

## Contexte
En relançant `node server.js` pour l'[[Exercice - Créer une API REST avec Express]], alors qu'un terminal précédent tournait encore.

## Cause
Un seul programme peut écouter sur un port donné. Une autre instance du serveur (ou une autre application) occupe déjà le port 3000.

## Solution
1. Retrouver le terminal où le serveur tourne encore et l'arrêter avec `Ctrl+C`.
2. Sinon, trouver le processus qui occupe le port :
   ```powershell
   # Windows (PowerShell)
   Get-NetTCPConnection -LocalPort 3000 | Select-Object OwningProcess
   Stop-Process -Id <PID>
   ```
   ```bash
   # Linux / macOS
   lsof -i :3000
   kill <PID>
   ```
3. Ou utiliser un autre port : `const PORT = process.env.PORT || 3001;`

> [!tip] Prévenir
> Utiliser `node --watch` (un seul processus qui redémarre) plutôt que de relancer `node` dans plusieurs terminaux.

## Ce que j'ai appris
Un port = une porte d'entrée unique sur la machine. Voir [[Client-serveur]].
