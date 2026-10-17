---
type: notion
statut: a apprendre
resume: "HTTP est le langage des échanges web : le client envoie une requête (méthode + adresse), le serveur renvoie une réponse (code + contenu)."
revu:
sources:
---
```dataviewjs
await dv.view("Systeme/notion")
```

**En une phrase :** HTTP est le **langage des échanges web** : le client envoie une requête (méthode + adresse), le serveur renvoie une réponse (code + contenu).

## ❓ Le problème

**Pourquoi ça existe ?**
Pour que n'importe quel client (navigateur, Playwright, script) puisse parler à n'importe quel serveur web avec les mêmes règles.

**Qu'est-ce qui se passait sans ça ?**
Chaque service aurait inventé son propre format d'échange : il aurait fallu un programme différent pour chaque site.

## 💡 Comment ça marche

*Explique avec tes mots, comme à un collègue.*

**La requête** :
```
GET /api/films?page=1 HTTP/1.1
Host: api.exemple.fr
Authorization: Bearer xxx
```
- **Méthode** : `GET` (lire), `POST` (créer), `PUT`/`PATCH` (modifier), `DELETE` (supprimer).
- **En-têtes** : des informations en plus (authentification, format…).
- **Corps** (pour `POST`/`PUT`) : les données, souvent en JSON.

**La réponse** commence par un **code** :

| Code | Sens | Exemple |
|---|---|---|
| 2xx | ✅ ça a marché | 200 OK, 201 Created |
| 3xx | ↪️ va voir ailleurs | 301, 302 redirection |
| 4xx | ❌ **le client** s'est trompé | 400, 401 non connecté, 403 interdit, 404 introuvable, 407 proxy |
| 5xx | 💥 **le serveur** a planté | 500, 502, 503 |

```bash
curl -I https://playwright.dev   # n'affiche que le code et les en-têtes
```

## ⚠️ Limites et pièges

- **HTTP n'a pas de mémoire** : chaque requête est indépendante. La connexion est retenue grâce à un cookie ou un jeton envoyé à chaque fois.
- **HTTP n'est pas chiffré** : tout passe en clair. On utilise HTTPS (voir [[Certificat et HTTPS]]).
- **Un 4xx ou 5xx n'est pas une erreur réseau** : la connexion a marché, c'est la réponse qui dit non.

## 🔗 Liens

- **Prérequis :** [[Client et serveur]], [[DNS]]
- **Voir aussi :** [[Certificat et HTTPS]], [[Proxy]]
- **Utilisé dans :** Playwright (`page.route`, `request`), les API, `curl`

## 📚 Notes

- 
