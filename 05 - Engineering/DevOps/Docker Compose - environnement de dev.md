---
type: engineering
kind: technical-note
project: "[[Application SaaS]]"
domain: devops
created: 2026-11-03
tags:
  - tech
  - demo
---
# Docker Compose — environnement de dev

```yaml
services:
  api:
    build: ./api
    ports:
      - "3000:3000"
    env_file: .env
    depends_on:
      - db
  db:
    image: postgres:16
    volumes:
      - pgdata:/var/lib/postgresql/data
volumes:
  pgdata:
```

> [!success] Résultat
> `docker compose up` lance tout l'environnement en local.
