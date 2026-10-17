---
type: notion
statut: a apprendre
resume: "On ne stocke jamais un mot de passe tel quel."
revu:
sources:
  - "https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html"
---
# Hachage des mots de passe

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : On ne stocke **jamais** un mot de passe tel quel.

## Le problème

**Pourquoi c'est utile ?**
Pour stocker les mots de passe de façon à ce qu'une fuite de la base ne les révèle pas.

**Qu'est-ce qui se passait sans ça ?**
Les mots de passe étaient stockés en clair : une fuite exposait tous les comptes, et ceux des autres sites.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

On stocke son **empreinte** (*hash*), obtenue par une fonction à sens unique : impossible de retrouver le mot de passe à partir de l'empreinte. À la connexion, on calcule l'empreinte de ce que tape l'utilisateur et on compare. L'outil à utiliser : **argon2** (ou bcrypt).

### L'image

Hacher, c'est comme **passer un fruit au mixeur** : à partir du même fruit, tu obtiens toujours le même jus, mais à partir du jus, impossible de reconstituer le fruit.

### Pourquoi pas un simple SHA-256 ?

| Méthode | Problème |
|---|---|
| mot de passe en clair | une fuite de la base = tous les comptes compromis (et souvent d'autres sites, car les gens réutilisent leurs mots de passe) |
| chiffrement réversible | celui qui a la clé peut tout déchiffrer |
| SHA-256 / MD5 | **trop rapide** : un ordinateur teste des milliards de mots de passe par seconde |
| **argon2 / bcrypt** | **volontairement lent** et avec un **sel** : une attaque devient extrêmement coûteuse |

Le **sel** est une valeur aléatoire ajoutée à chaque mot de passe avant le hachage : deux utilisateurs avec le même mot de passe ont des empreintes **différentes**. argon2 et bcrypt le gèrent automatiquement.

### Les règles autour du mot de passe

| Règle | Pourquoi |
|---|---|
| **12 caractères minimum** plutôt que des règles compliquées | la longueur compte plus que les symboles |
| refuser les mots de passe connus (« 123456 », « azerty ») | ce sont les premiers testés |
| **limiter les tentatives** de connexion | ralentir les attaques en ligne |
| même message pour « e-mail inconnu » et « mauvais mot de passe » | ne pas révéler quels comptes existent |
| réinitialisation par lien à usage unique et durée limitée | jamais envoyer le mot de passe par e-mail |
| ne **jamais** logger un mot de passe | les logs sont moins protégés que la base |

## 🧪 Exemple

### En pratique (NestJS)

```ts
import * as argon2 from 'argon2';

// Inscription
const passwordHash = await argon2.hash(dto.password);
// → '$argon2id$v=19$m=65536,t=3,p=4$<sel>$<empreinte>'  (tout est dans la chaîne)

// Connexion
const ok = await argon2.verify(user.passwordHash, dto.password);
if (!ok) throw new UnauthorizedException('Identifiants invalides');
```

La chaîne stockée contient l'algorithme, les réglages et le sel : pas besoin de les ranger ailleurs.

## ⚠️ Limites et pièges

- **Stocker le mot de passe en clair « temporairement »**.
- **Renvoyer `passwordHash`** dans une réponse d'API : utilise `select` ou `omit` (voir [[Prisma Client requêtes et relations|Prisma]]).
- **Inventer son propre algorithme** : utilise argon2 ou bcrypt, point.

## 🔗 Liens

- **Prérequis :** [[Fondamentaux de la sécurité]]
- **Voir aussi :** [[Authentification JWT NestJS]], [[Certificat et HTTPS]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
