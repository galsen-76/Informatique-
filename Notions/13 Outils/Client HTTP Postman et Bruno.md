---
type: notion
statut: maitrise
resume: "Un client API envoie des requêtes HTTP à ton back-end sans passer par le front : tu testes POST /reviews avant même d'avoir codé le formulaire."
revu:
sources:
  - "https://www.usebruno.com/"
---
# Client HTTP Postman et Bruno

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Un **client API** envoie des requêtes HTTP à ton back-end **sans passer par le front** : tu testes `POST /reviews` avant même d'avoir codé le formulaire.

## Le problème

**Pourquoi c'est utile ?**
Pour tester une API directement, sans passer par le front.

**Qu'est-ce qui se passait sans ça ?**
Il fallait coder un écran juste pour tester une route, ou écrire de longues commandes curl à la main.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Indispensable pour développer et déboguer CinéTrack-API.

### Les outils

| Outil | Particularité |
|---|---|
| **Bruno** | gratuit, les requêtes sont des **fichiers dans ton projet** (versionnés avec Git) |
| **Postman** | le plus connu, collections partagées en ligne |
| **Fichiers `.http`** | intégrés à IntelliJ (et VS Code avec l'extension REST Client) |
| **Swagger UI** | généré par NestJS sur `/docs` (voir Swagger) |
| **curl** | en ligne de commande, partout |

### curl

```bash
curl -s http://localhost:3000/movies?page=2 | jq .

curl -X POST http://localhost:3000/reviews \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"movieId": 27205, "rating": 9, "comment": "Superbe film vraiment"}'
```

`jq` affiche le JSON joliment (`sudo apt install jq`).

### Ce qu'il faut tester pour chaque route

1. Le **cas normal** (200 / 201).
2. Des **données invalides** (400).
3. **Sans jeton** (401).
4. Avec le jeton **d'un autre utilisateur** (403).
5. Une ressource **inexistante** (404).

Ce sont aussi les cas de tes tests automatisés (voir [[Tests NestJS]]).

### Les environnements

Définis des variables `baseUrl` et `token` par environnement (local, staging) pour passer de l'un à l'autre sans réécrire les URL.

## 🧪 Exemple

### Un fichier `.http` (IntelliJ / VS Code)

```http
### Connexion
POST http://localhost:3000/auth/login
Content-Type: application/json

{ "email": "test@cinetrack.fr", "password": "Motdepasse123!" }

> {% client.global.set("token", response.body.accessToken); %}

### Créer une critique (utilise le jeton récupéré)
POST http://localhost:3000/reviews
Content-Type: application/json
Authorization: Bearer {{token}}

{ "movieId": 27205, "rating": 9, "comment": "Un chef-d'œuvre à revoir." }

### Tester la validation : doit renvoyer 400
POST http://localhost:3000/reviews
Content-Type: application/json
Authorization: Bearer {{token}}

{ "movieId": 27205, "rating": 11, "comment": "court" }
```

Le fichier se range dans le projet (`api.http`) : il sert de **documentation vivante** des routes.

## ⚠️ Limites et pièges

- **Commiter des jetons ou mots de passe réels** dans les fichiers de requêtes : utilise des variables et un fichier d'environnement ignoré par Git.
- **Tester seulement le cas qui marche** : les bugs sont dans les cas d'erreur.

## 🔗 Liens

- **Prérequis :** 
- **Voir aussi :** [[API REST]], [[HTTP]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://www.usebruno.com/
