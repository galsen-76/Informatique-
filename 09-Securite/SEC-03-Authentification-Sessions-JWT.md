---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M09
tags:
  - securite/authentification
aliases:
  - "Authentification Sessions vs JWT"
parent: "[[Sécurité]]"
children: []
related_theory:
  - "[[NEST-10-Authentification-JWT|Authentification JWT NestJS]]"
  - "[[JS-11-Stockage-Navigateur|Stockage Navigateur]]"
  - "[[SEC-04-OAuth2-OpenID-Connect|OAuth2 et OpenID Connect]]"
related_snippets:
  - "[[04_Snippets/sec-03-authentification-sessions-jwt]]"
related_projects: []
source: "https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html"
---

# Authentification Sessions vs JWT

> [!abstract] Introduction
> Deux grandes façons de maintenir un utilisateur connecté : la session côté serveur (identifiant dans un cookie) ou le token autoporteur (JWT) ; chacune a ses forces, ses faiblesses et ses règles de stockage.

> [!warning]- Prérequis
> [[SEC-01-Fondamentaux-Securite|Fondamentaux de la Sécurité]], [[JS-11-Stockage-Navigateur|Stockage Navigateur]]

---

## Théorie

> [!question]- C'est quoi ?
> | | Session serveur | JWT |
> |---|---|---|
> | Stockage de l'état | Serveur (mémoire/Redis/BDD) | Dans le token (signé) |
> | Transport | Cookie `HttpOnly` | En-tête `Authorization: Bearer` ou cookie |
> | Révocation | Immédiate (supprimer la session) | Difficile (attendre l'expiration) |
> | Scalabilité | Store partagé nécessaire | Sans état, vérifiable partout |
> | Cas typique | Application web classique, BFF | API, mobile, microservices |

> [!example]- Analogie
> Session : le vestiaire garde ton manteau et te donne un ticket numéroté (le serveur retrouve tout avec le numéro). JWT : une carte d'identité infalsifiable que tu portes toi-même (tout le monde peut la vérifier, mais on ne peut pas la « désactiver » avant sa date d'expiration).

> [!question]- Pourquoi l'utiliser ?
> Le choix impacte la sécurité (XSS/CSRF), l'architecture (scalabilité) et l'expérience (déconnexion, expiration).

> [!question]- Comment ça marche ?
> Recommandations actuelles pour une SPA (Angular/Vue) :
> - Idéal : **cookie `HttpOnly; Secure; SameSite`** (session ou JWT dans le cookie) — inaccessible au JS donc protégé du vol par XSS ; protéger contre CSRF (SameSite + token anti-CSRF si nécessaire)
> - Variante courante : access token court **en mémoire** (variable/signal) + refresh token en cookie HttpOnly
> - À éviter : token longue durée dans `localStorage`
> - Pattern **BFF** : le backend du front gère les tokens, le navigateur n'a qu'un cookie de session

> [!question]- Quand l'utiliser ?
> Session : app monolithique ou BFF. JWT : API consommée par plusieurs clients, services distribués.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Aucune option ne protège d'une XSS qui agit directement dans la page : la prévention XSS reste indispensable.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Session | État d'authentification conservé côté serveur |
| Token autoporteur | Jeton qui contient ses propres informations |
| HttpOnly | Cookie inaccessible au JavaScript |
| BFF | Backend For Frontend |
| Révocation | Invalidation anticipée d'un accès |

---

## Points clés

- Cookie HttpOnly > localStorage pour les secrets d'auth
- Access court + refresh rotaté
- Déconnexion = invalider côté serveur (session ou refresh)
- MFA pour les comptes sensibles

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - JWT de 30 jours dans localStorage
> - Oublier la protection CSRF avec des cookies

---

## Exemple minimal

```typescript
// NestJS : poser le refresh token en cookie sécurisé
res.cookie('refresh', refreshToken, {
  httpOnly: true, secure: true, sameSite: 'strict', path: '/api/auth/refresh', maxAge: 7 * 24 * 3600 * 1000,
});
```

> [!note] Ce que j'en retiens
> Le cookie n'est envoyé qu'à la route de refresh, jamais lisible par le JS.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Concevoir un BFF avec OIDC et sessions pour une SPA d'entreprise

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Sécurité]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/sec-03-authentification-sessions-jwt]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi un JWT est-il difficile à révoquer et comment compenser ?

> [!faq]- Questions d'entretien
> - Session ou JWT pour une SPA ? Justifiez.

---

## Tâches

- [ ] #task Implémenter login/refresh/logout dans CinéTrack en suivant ces règles
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
