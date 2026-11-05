---
type: concept
domain: securite
module: "[[Module 10 - Authentification et sécurité]]"
status: a-decouvrir
level: intermediaire
prerequisites:
  - "[[Authentification]]"
  - "[[JSON]]"
parents:
  - "[[Authentification]]"
related:
  - "[[Middleware]]"
next_review: 
method: []
tags:
  - concept
  - securite
---
# JWT

> [!info] En une phrase
> Un jeton signé qui contient l'identité de l'utilisateur, envoyé à chaque requête pour prouver qui il est.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
Un **JWT** (JSON Web Token) a trois parties encodées en base64 : `en-tête.contenu.signature`. Le serveur signe le jeton à la connexion, puis vérifie la signature à chaque requête (header `Authorization: Bearer <jeton>`).

## 2 · Explorer

> [!warning] À ne pas confondre
> Le contenu d'un JWT est **encodé, pas chiffré** : n'importe qui peut le lire. Ne jamais y mettre de mot de passe. La signature garantit seulement qu'il n'a pas été modifié.

## 3 · Pratiquer
- _Pas encore d’exercice : en créer un avec le template **Exercice**._

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _À écrire sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Authentification]], [[JSON]]
- **Vérifié par** : un [[Middleware]]

## 6 · Réviser
> [!question]- Peut-on lire le contenu d'un JWT sans la clé ?
> Oui, il est seulement encodé en base64. La clé sert à vérifier la signature.

### Validation de la maîtrise
- [ ] Je l'explique sans notes, en 3 phrases, à quelqu'un qui ne connaît pas
- [ ] J'ai réussi un exercice qui l'utilise
- [ ] Je l'ai utilisé dans un projet
- [ ] Je sais dire quand ne pas l'utiliser (ou ce qu'il ne faut pas confondre)
