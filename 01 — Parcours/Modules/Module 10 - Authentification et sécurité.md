---
type: module
order: 10
title: "Authentification et sécurité"
prerequisites:
  - "[[Module 08 - Backend et API REST]]"
  - "[[Module 09 - Bases de données et SQL]]"
why: "Protéger une API suppose d'avoir une API (module 8) et des utilisateurs stockés quelque part (module 9)."
tags:
  - module
---
# 10 · Authentification et sécurité

> [!tip] Pourquoi à cette place dans le parcours
> Protéger une API suppose d'avoir une API (module 8) et des utilisateurs stockés quelque part (module 9).

## Objectifs
- Authentifier : mots de passe hachés, sessions, JWT
- Autoriser par rôle et par propriété
- Comprendre OAuth 2 et OpenID Connect
- Reconnaître et corriger injection SQL, XSS et CSRF
- Gérer les secrets

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "module" })
```
