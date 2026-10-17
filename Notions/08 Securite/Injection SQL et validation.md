---
type: notion
statut: a apprendre
resume: "Une injection se produit quand une donnée envoyée par l'utilisateur est interprétée comme du code."
revu:
sources:
  - "https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html"
---
# Injection SQL et validation

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Une **injection** se produit quand une donnée envoyée par l'utilisateur est **interprétée comme du code**.

## Le problème

**Pourquoi c'est utile ?**
Pour empêcher qu'une donnée envoyée par l'utilisateur soit exécutée comme du code.

**Qu'est-ce qui se passait sans ça ?**
Un simple ' OR 1=1 -- dans un champ permettait de lire ou de supprimer toute la base.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

L'exemple le plus célèbre : l'injection SQL, qui permet de lire ou détruire toute la base. La parade est simple : **ne jamais construire une requête en collant du texte**, et **valider toutes les entrées**.

### L'attaque

```ts
// ❌ la requête est construite en collant le texte de l'utilisateur
const sql = `SELECT * FROM users WHERE email = '${email}'`;
```

Si l'utilisateur tape comme e-mail :

```text
' OR '1'='1
```

La requête devient :

```sql
SELECT * FROM users WHERE email = '' OR '1'='1'   -- toujours vrai : tous les utilisateurs !
```

Ou pire : `'; DROP TABLE users; --`.

### Les autres injections

| Injection | Exemple | Parade |
|---|---|---|
| **HTML / JavaScript** (XSS) | un `<script>` dans une critique | affichage échappé par le framework (voir XSS) |
| **Commande système** | `exec('convert ' + fichier)` | ne pas lancer de commande avec une donnée utilisateur, ou passer les arguments séparément |
| **Chemin de fichier** | `readFile('uploads/' + nom)` avec `../../.env` | vérifier le nom, n'autoriser qu'un dossier |
| **Recherche NoSQL** | `{ "$gt": "" }` à la place d'un mot de passe (MongoDB) | valider le type (une chaîne, pas un objet) |

### Valider toutes les entrées

La validation est la **deuxième ligne de défense** :

| Où | Outil |
|---|---|
| corps des requêtes NestJS | DTO + `ValidationPipe` avec `whitelist` (voir DTO) |
| paramètres d'URL | `ParseIntPipe`, `ParseUUIDPipe` |
| données reçues d'une API externe | Zod (voir Zod) |
| formulaires du front | pour le confort de l'utilisateur ; **le serveur revalide** |

**Valide ce qui est attendu** (liste d'autorisation) plutôt que d'essayer de bloquer ce qui est dangereux : « une note entière entre 1 et 10 » est plus sûr que « pas de caractères bizarres ».

## 🧪 Exemple

### La parade : les requêtes paramétrées

La valeur est envoyée **séparément** de la requête : la base la traite toujours comme une **donnée**, jamais comme du code.

```ts
// ✅ Prisma : paramétré automatiquement
prisma.user.findUnique({ where: { email } });

// ✅ SQL brut avec Prisma : le ${} est protégé
prisma.$queryRaw`SELECT * FROM "User" WHERE email = ${email}`;

// ❌ DANGER : désactive la protection
prisma.$queryRawUnsafe(`SELECT * FROM "User" WHERE email = '${email}'`);
```

```ts
// ✅ pg (SQL direct)
pool.query('SELECT * FROM users WHERE email = $1', [email]);
```

## ⚠️ Limites et pièges

- **`$queryRawUnsafe` ou une concaténation** « juste pour cette requête compliquée ».
- **Faire confiance à un champ caché** ou à une liste déroulante du front : n'importe quelle valeur peut être envoyée.
- **Trier par une colonne choisie par l'utilisateur** (`ORDER BY ${colonne}`) : les noms de colonnes ne se paramètrent pas. Vérifie la valeur dans une liste autorisée.

## 🔗 Liens

- **Prérequis :** [[Fondamentaux de la sécurité]]
- **Voir aussi :** [[OWASP Top 10]], [[DTO validation et pipes NestJS]], [[Prisma Client requêtes et relations]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html
