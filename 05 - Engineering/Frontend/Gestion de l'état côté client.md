---
type: engineering
kind: technical-note
project: "[[Application SaaS]]"
domain: frontend
created: 2026-11-03
tags:
  - tech
  - demo
---
# Gestion de l'état côté client

- État serveur : cache de requêtes
- État UI : local aux composants, pas de store global tant que ce n'est pas nécessaire

> [!tip] Règle
> Ne mettre dans un store global que ce qui est partagé par plusieurs pages.
