---
type: notion
statut: a apprendre
resume: "Docker Compose lance plusieurs conteneurs ensemble à partir d'un seul fichier compose.yaml."
revu:
sources:
---
```dataviewjs
await dv.view("Systeme/notion")
```

**En une phrase :** Docker Compose lance **plusieurs conteneurs ensemble** à partir d'un seul fichier `compose.yaml`.

## ❓ Le problème

**Pourquoi ça existe ?**
Une vraie application, c'est plusieurs conteneurs (front, API, base) avec leurs ports, volumes, variables et réseau. Compose décrit tout ça une fois, et on lance tout avec une seule commande.

**Qu'est-ce qui se passait sans ça ?**
Il fallait taper une longue commande `docker run` par conteneur, créer le réseau à la main, et tout refaire dans le bon ordre à chaque fois. Chaque développeur avait sa propre version des commandes.

## 💡 Comment ça marche

*Explique avec tes mots, comme à un collègue.*

```yaml
# compose.yaml
services:
  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: secret
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  api:
    build: .               # construit l'image avec le Dockerfile du dossier
    environment:
      DB_HOST: db          # le nom du service sert d'adresse
    ports:
      - "3000:3000"
    depends_on:
      - db

volumes:
  pgdata:
```

Compose crée **automatiquement un réseau** pour le projet : chaque service est joignable par son nom (`db`, `api`).

| Commande | Rôle |
|---|---|
| `docker compose up -d` | tout lancer en arrière-plan |
| `docker compose ps` | voir l'état des services |
| `docker compose logs -f api` | suivre les logs d'un service |
| `docker compose down` | tout arrêter et supprimer (volumes gardés) |
| `docker compose up -d --build` | reconstruire les images puis relancer |

## ⚠️ Limites et pièges

- **`depends_on` attend que le conteneur démarre, pas qu'il soit prêt** : la base peut mettre quelques secondes à accepter les connexions. Il faut un `healthcheck` ou que l'API réessaie.
- **`down -v` supprime les volumes**, donc les données.
- **Après un changement de code**, `up` ne reconstruit pas l'image : il faut `--build`.
- **Anciennes commandes** : `docker-compose` (avec tiret) est l'ancienne version, aujourd'hui on écrit `docker compose`.

## 🔗 Liens

- **Prérequis :** [[01 Docker|Docker]], [[09 Ports et réseau Docker|Ports et réseau Docker]], [[08 Volumes Docker|Volumes Docker]]
- **Voir aussi :** [[07 Variables d'environnement Docker|Variables d'environnement Docker]]
- **Utilisé dans :** l'environnement de dev local (front + API + base)

## 📚 Notes

- 
