---
type: engineering
kind: api
project: "[[Application SaaS]]"
version: v1
created: 2026-11-03
tags:
  - tech
  - demo
---
# API Auth v1

| Méthode | Route | Description |
| --- | --- | --- |
| `POST` | `/auth/login` | Identifiants → tokens |
| `POST` | `/auth/refresh` | Renouvelle l'access token |
| `POST` | `/auth/logout` | Révoque le refresh token |

```json
{ "accessToken": "eyJ…", "expiresIn": 900 }
```
