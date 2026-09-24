---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Avancé
month: M09
tags:
  - securite/oauth-oidc
aliases:
  - "OAuth2 et OpenID Connect"
parent: "[[Sécurité]]"
children: []
related_theory:
  - "[[SEC-03-Authentification-Sessions-JWT|Authentification Sessions vs JWT]]"
  - "[[SEC-11-Autorisation-RBAC|Autorisation RBAC]]"
related_snippets:
  - "[[04_Snippets/sec-04-oauth2-openid-connect]]"
related_projects: []
source: "https://oauth.net/2/"
---

# OAuth2 et OpenID Connect

> [!abstract] Introduction
> OAuth 2 est un protocole de délégation d'autorisation (« cette app peut accéder à mes données ») ; OpenID Connect (OIDC) ajoute l'identité par-dessus — c'est la base du SSO d'entreprise (Keycloak, Microsoft Entra ID, Okta) et du « Se connecter avec Google ».

> [!warning]- Prérequis
> [[SEC-03-Authentification-Sessions-JWT|Authentification Sessions vs JWT]]

---

## Théorie

> [!question]- C'est quoi ?
> Acteurs : **Resource Owner** (l'utilisateur), **Client** (ton app Angular/Vue), **Authorization Server** (Keycloak, Entra ID), **Resource Server** (ton API NestJS).
> Flux recommandé pour une SPA : **Authorization Code + PKCE**.
> Jetons : **access token** (accéder à l'API), **ID token** (identité, OIDC), **refresh token**.

> [!example]- Analogie
> La clé voiturier : tu donnes au voiturier une clé qui démarre la voiture mais n'ouvre pas le coffre (scope limité), sans lui confier ton trousseau (mot de passe).

> [!question]- Pourquoi l'utiliser ?
> En entreprise, les utilisateurs se connectent via le SSO de l'entreprise : l'application ne gère jamais les mots de passe, l'API valide les tokens émis par le fournisseur d'identité.

> [!question]- Comment ça marche ?
> ```mermaid
> sequenceDiagram
>   participant U as Utilisateur
>   participant SPA as SPA (Angular/Vue)
>   participant IdP as Keycloak / Entra ID
>   participant API as API NestJS
>   SPA->>IdP: redirection /authorize (code_challenge PKCE)
>   U->>IdP: login + MFA
>   IdP-->>SPA: redirection avec code
>   SPA->>IdP: POST /token (code + code_verifier)
>   IdP-->>SPA: access token (+ id token)
>   SPA->>API: Authorization: Bearer access token
>   API->>API: vérifie signature (JWKS), issuer, audience, expiration
>   API-->>SPA: données
> ```
> Librairies : `angular-oauth2-oidc`, `oidc-client-ts` (Vue), `passport-jwt` + JWKS côté Nest.

> [!question]- Quand l'utiliser ?
> SSO d'entreprise, connexion via un fournisseur externe, APIs ouvertes à des applications tierces.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Protocole complexe : ne jamais l'implémenter soi-même, utiliser des librairies certifiées et un IdP éprouvé. Le flux « implicit » est déprécié.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| PKCE | Protection du flux code pour les clients publics |
| Scope | Périmètre d'accès demandé |
| Issuer | Émetteur du token |
| Audience | Destinataire prévu du token |
| JWKS | Clés publiques pour vérifier les signatures |

---

## Points clés

- Authorization Code + PKCE pour les SPA
- L'API vérifie issuer, audience, expiration, signature
- Ne jamais implémenter OAuth soi-même
- OIDC = identité, OAuth = autorisation déléguée

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Accepter un token émis pour une autre application (audience non vérifiée)
> - Utiliser le flux implicit

---

## Exemple minimal

```bash
# Keycloak local pour s'entraîner
docker run -p 8080:8080 -e KC_BOOTSTRAP_ADMIN_USERNAME=admin -e KC_BOOTSTRAP_ADMIN_PASSWORD=admin \
  quay.io/keycloak/keycloak:latest start-dev
```

> [!note] Ce que j'en retiens
> Un vrai fournisseur d'identité en local pour tester le flux complet.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Concevoir les rôles/scopes et leur mapping dans l'API ; BFF pour éviter les tokens dans le navigateur

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Sécurité]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/sec-04-oauth2-openid-connect]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi PKCE est-il nécessaire pour une SPA ?

> [!faq]- Questions d'entretien
> - Expliquez le flux Authorization Code avec PKCE.

---

## Tâches

- [ ] #task Demander quel IdP est utilisé au travail (Keycloak ? Entra ID ?) et brancher CinéTrack sur un Keycloak local
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
