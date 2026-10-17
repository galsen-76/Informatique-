---
type: notion
statut: a apprendre
resume: "On passe la configuration au conteneur au lancement (-e ou fichier .env) au lieu de l'écrire dans l'image."
revu:
sources:
---
```dataviewjs
await dv.view("Systeme/notion")
```

**En une phrase :** On passe la configuration au conteneur **au lancement** (`-e` ou fichier `.env`) au lieu de l'écrire dans l'image.

## ❓ Le problème

**Pourquoi ça existe ?**
Pour utiliser **la même image** partout (dev, recette, prod) en changeant seulement la configuration : URL de la base, mot de passe, mode debug.

**Qu'est-ce qui se passait sans ça ?**
Il fallait construire une image différente par environnement, ou mettre les mots de passe en dur dans le code ou le Dockerfile.

## 💡 Comment ça marche

*Explique avec tes mots, comme à un collègue.*

**Au lancement, avec `-e`** :
```bash
docker run -e DB_HOST=db -e DB_PASSWORD=secret mon-api
```

**Avec un fichier** :
```bash
# .env
DB_HOST=db
DB_PASSWORD=secret
```
```bash
docker run --env-file .env mon-api
```

**Dans Docker Compose** :
```yaml
services:
  api:
    image: mon-api
    env_file: .env
    environment:
      NODE_ENV: development
```

Dans le code Node, on les lit avec `process.env.DB_HOST`.

`ENV` dans un Dockerfile donne une **valeur par défaut**, que `-e` peut remplacer au lancement.

## ⚠️ Limites et pièges

- **Pas de secret avec `ENV` dans le Dockerfile** : il reste lisible dans l'image (`docker inspect`).
- **Ne jamais commiter le `.env`** : l'ajouter au `.gitignore` et au `.dockerignore`.
- **Une variable changée ne s'applique pas à chaud** : il faut recréer le conteneur.
- **En CI**, les secrets se mettent dans les variables protégées de GitLab (Settings → CI/CD → Variables), pas dans le dépôt.

## 🔗 Liens

- **Prérequis :** [[Docker]]
- **Voir aussi :** [[Dockerfile]], [[Docker Compose]]
- **Utilisé dans :** la configuration de l'API selon l'environnement, les identifiants de la base

## 📚 Notes

- 
