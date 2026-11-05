---
type: meeting
date: 2026-11-03T14:00
meeting_type: tech-review
project: "[[Refonte API]]"
participants:
  - Moi
  - "[[Alice]]"
  - "[[Karim]]"
tags:
  - meeting
  - demo
---
# Architecture des services

**Objectif :** valider le découpage et l'authentification.

## Notes
- Trois modules : identité, projets, facturation
- Auth centralisée envisagée avec Keycloak

## Décisions
> [!decision] Décision
> Proposer un ADR : [[ADR-002 Authentification JWT avec Keycloak]]

## Actions
- [x] Comparer Keycloak et Auth0 → [[Kanban - Refonte API]]
