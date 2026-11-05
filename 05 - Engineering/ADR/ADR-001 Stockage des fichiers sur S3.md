---
type: engineering
kind: adr
project: "[[Application SaaS]]"
status: accepted
date: 2026-11-04
created: 2026-11-03
tags:
  - tech
  - demo
---
# ADR-001 — Stockage des fichiers sur S3

> [!warning] Exemple à adapter
> Décision illustrative.

## Contexte
L'application doit stocker et servir des fichiers utilisateurs ; le disque des conteneurs n'est pas persistant.

## Décision
> [!decision] Décision retenue
> Utiliser un stockage objet compatible S3, avec des URL signées.

## Alternatives considérées
- Stockage local : simple, mais perdu au redéploiement
- Azure Blob : équivalent, moins aligné avec l'infra actuelle

## Conséquences
- Conteneurs sans état
- Gérer les fichiers orphelins
