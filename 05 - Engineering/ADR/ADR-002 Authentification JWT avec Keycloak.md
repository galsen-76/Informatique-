---
type: engineering
kind: adr
project: "[[Refonte API]]"
status: proposed
date: 2026-11-04
created: 2026-11-03
tags:
  - tech
  - demo
---
# ADR-002 — Authentification JWT avec Keycloak

## Contexte
L'API v2 et l'application mobile ont besoin d'une authentification centralisée.

## Décision
> [!decision] Décision proposée
> Keycloak comme fournisseur d'identité ; l'API valide des JWT signés.

## Alternatives considérées
- Auth maison : contrôle total, mais maintenance et sécurité à notre charge
- Auth0 : managé, mais payant

## Suivi
- Issue de [[2026-11-03 Architecture des services]], à statuer le [[2026-11-10 Revue d'architecture API|10/11]]
