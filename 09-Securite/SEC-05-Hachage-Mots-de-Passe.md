---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M09
tags:
  - securite/hachage
aliases:
  - "Hachage des Mots de Passe"
parent: "[[Sécurité]]"
related_theory:
  - "[[NEST-10-Authentification-JWT|Authentification JWT NestJS]]"
  - "[[SEC-09-HTTPS-TLS|HTTPS et TLS]]"
related_projects: []
source: "https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html"
---

# Hachage des Mots de Passe

> [!abstract] En bref
> On ne stocke **jamais** un mot de passe tel quel. On stocke son **empreinte** (*hash*), obtenue par une fonction à sens unique : impossible de retrouver le mot de passe à partir de l'empreinte. À la connexion, on calcule l'empreinte de ce que tape l'utilisateur et on compare. L'outil à utiliser : **argon2** (ou bcrypt).

## L'image

Hacher, c'est comme **passer un fruit au mixeur** : à partir du même fruit, tu obtiens toujours le même jus, mais à partir du jus, impossible de reconstituer le fruit.

## Pourquoi pas un simple SHA-256 ?

| Méthode | Problème |
|---|---|
| mot de passe en clair | une fuite de la base = tous les comptes compromis (et souvent d'autres sites, car les gens réutilisent leurs mots de passe) |
| chiffrement réversible | celui qui a la clé peut tout déchiffrer |
| SHA-256 / MD5 | **trop rapide** : un ordinateur teste des milliards de mots de passe par seconde |
| **argon2 / bcrypt** | **volontairement lent** et avec un **sel** : une attaque devient extrêmement coûteuse |

Le **sel** est une valeur aléatoire ajoutée à chaque mot de passe avant le hachage : deux utilisateurs avec le même mot de passe ont des empreintes **différentes**. argon2 et bcrypt le gèrent automatiquement.

## En pratique (NestJS)

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

## Les règles autour du mot de passe

| Règle | Pourquoi |
|---|---|
| **12 caractères minimum** plutôt que des règles compliquées | la longueur compte plus que les symboles |
| refuser les mots de passe connus (« 123456 », « azerty ») | ce sont les premiers testés |
| **limiter les tentatives** de connexion | ralentir les attaques en ligne |
| même message pour « e-mail inconnu » et « mauvais mot de passe » | ne pas révéler quels comptes existent |
| réinitialisation par lien à usage unique et durée limitée | jamais envoyer le mot de passe par e-mail |
| ne **jamais** logger un mot de passe | les logs sont moins protégés que la base |

## Pièges

- **Stocker le mot de passe en clair « temporairement »**.
- **Renvoyer `passwordHash`** dans une réponse d'API : utilise `select` ou `omit` (voir [[ORM-02-Prisma-Client-Requetes-Relations|Prisma]]).
- **Inventer son propre algorithme** : utilise argon2 ou bcrypt, point.
