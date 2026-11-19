---
type: reference
tags:
  - travail
---
# Reverse proxy au travail

> [!info] D'où vient cette note
> Les passages propres à mon travail (CVAT, Nuclio, réseau de l'entreprise) sortis de la fiche neutre [[Reverse proxy]] le 19/11/2026.

## Cas d'utilisation au travail
- Déployer CVAT sur un serveur accessible par un nom, en HTTPS

## Exemple concret : Traefik dans CVAT
Traefik fait la même chose, mais lit ses règles dans des **labels** posés sur les conteneurs du `docker-compose.yml` :
```yaml
cvat_server:
  labels:
    - traefik.http.routers.cvat.rule=Host(`${CVAT_HOST:-localhost}`) && PathPrefix(`/api/`)
```
- `CVAT_HOST` vaut `localhost` par défaut : CVAT ne répond que si on l'appelle **avec ce nom**.
- Sur un serveur : `export CVAT_HOST=cvat.mon-entreprise.local` avant `docker compose up -d`, sinon la page renvoie **404**.
- `${CVAT_HOST:-localhost}` = « la variable `CVAT_HOST`, ou `localhost` si elle est vide ».

