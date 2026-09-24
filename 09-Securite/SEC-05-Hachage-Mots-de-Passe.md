---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M09
tags:
  - securite/hachage
aliases:
  - "Hachage des Mots de Passe"
parent: "[[Sécurité]]"
children: []
related_theory:
  - "[[NEST-10-Authentification-JWT|Authentification JWT NestJS]]"
  - "[[SEC-09-HTTPS-TLS|HTTPS et TLS]]"
related_snippets:
  - "[[04_Snippets/sec-05-hachage-mots-de-passe]]"
related_projects: []
source: "https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html"
---

# Hachage des Mots de Passe

> [!abstract] Introduction
> On ne stocke jamais un mot de passe, ni en clair ni chiffré : on stocke un hachage lent et salé (argon2id, bcrypt) qui permet de vérifier un mot de passe sans pouvoir le retrouver.

> [!warning]- Prérequis
> [[SEC-01-Fondamentaux-Securite|Fondamentaux de la Sécurité]]

---

## Théorie

> [!question]- C'est quoi ?
> - **Hachage** : fonction à sens unique (impossible de revenir au texte)
> - **Chiffrement** : réversible avec une clé (pour des données à relire, pas pour des mots de passe)
> - **Sel (salt)** : valeur aléatoire unique par utilisateur, empêche les tables précalculées
> - **Algorithmes lents adaptés** : argon2id (recommandé), bcrypt, scrypt — PAS MD5/SHA-1/SHA-256 seuls (trop rapides)

> [!example]- Analogie
> Hacher, c'est passer un fruit au mixeur : on peut vérifier qu'un autre fruit donne le même jus, mais on ne peut pas reconstituer le fruit à partir du jus.

> [!question]- Pourquoi l'utiliser ?
> Si la base fuit, les mots de passe restent inexploitables (et les utilisateurs réutilisent souvent le même mot de passe ailleurs).

> [!question]- Comment ça marche ?
> ```typescript
> import * as argon2 from 'argon2';
> const hash = await argon2.hash(motDePasse);            // inclut sel et paramètres
> const ok = await argon2.verify(hash, tentative);       // comparaison sûre
> ```
> Politique : longueur minimale (≥ 12), vérification contre les mots de passe compromis (Have I Been Pwned), pas de règles de complexité absurdes, MFA.

> [!question]- Quand l'utiliser ?
> Tout stockage de mot de passe ou de secret à vérifier (tokens de refresh : hachés aussi).

> [!danger]- Quand NE PAS l'utiliser / Limites
> Un hachage lent coûte du CPU → limiter les tentatives (rate limiting) pour éviter aussi le déni de service.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Hash | Empreinte à sens unique |
| Salt | Aléa unique ajouté avant hachage |
| Pepper | Secret global supplémentaire (hors BDD) |
| Brute force | Essai de toutes les combinaisons |

---

## Points clés

- argon2id ou bcrypt
- Jamais MD5/SHA seuls
- Hacher aussi les refresh tokens et tokens de reset
- Rate limiting sur le login

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Chiffrer les mots de passe « pour pouvoir les renvoyer par email »
> - Comparer des hash avec `===` maison au lieu de la fonction `verify`

---

## Exemple minimal

```text
$argon2id$v=19$m=65536,t=3,p=4$<sel en base64>$<hash en base64>
```

> [!note] Ce que j'en retiens
> Le hash contient l'algorithme, les paramètres et le sel : rien d'autre à stocker.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Migration progressive d'algorithme (re-hachage à la connexion)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Sécurité]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/sec-05-hachage-mots-de-passe]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi SHA-256 seul est-il inadapté aux mots de passe ?

> [!faq]- Questions d'entretien
> - Comment stockez-vous des mots de passe ?

---

## Tâches

- [ ] #task Implémenter l'inscription avec argon2 dans l'API CinéTrack
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
