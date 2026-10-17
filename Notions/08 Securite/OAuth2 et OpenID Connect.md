---
type: notion
statut: a apprendre
resume: "Le bouton « Se connecter avec Google » (ou avec le compte de l'entreprise), c'est OpenID Connect, construit sur OAuth2."
revu:
sources:
  - "https://oauth.net/2/"
---
# OAuth2 et OpenID Connect

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Le bouton « **Se connecter avec Google** » (ou avec le compte de l'entreprise), c'est **OpenID Connect**, construit sur **OAuth2**.

## Le problème

**Pourquoi c'est utile ?**
Pour se connecter avec un compte existant (Google, entreprise) sans que l'application voie le mot de passe.

**Qu'est-ce qui se passait sans ça ?**
Chaque site demandait un nouveau mot de passe, ou on donnait son mot de passe Google à des applications tierces.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Ton application ne voit jamais le mot de passe : l'utilisateur se connecte chez le fournisseur (Google, Microsoft, Keycloak), qui te renvoie la preuve de son identité. En entreprise, c'est souvent ainsi que fonctionne la connexion unique (SSO).

### La différence

| | OAuth2 | OpenID Connect (OIDC) |
|---|---|---|
| Répond à | « cette application a-t-elle le **droit d'accéder** à mes données ? » (autorisation) | « **qui** est cet utilisateur ? » (authentification) |
| Donne | un *access token* | un *access token* + un **ID token** (JWT avec l'identité) |
| Exemple | une app qui lit ton agenda Google | « Se connecter avec Google » |

### L'image

À l'hôtel, tu ne donnes pas ta carte d'identité au bar : la **réception** (le fournisseur) vérifie ton identité et te donne un **badge** (le jeton) que le bar (ton application) accepte.

### Le déroulé (Authorization Code + PKCE)

C'est le flux recommandé pour les applications web et mobiles :

```mermaid
sequenceDiagram
  participant U as Utilisateur
  participant F as Ton front
  participant G as Fournisseur (Google, Keycloak)
  participant A as Ton API
  U->>F: clique « Se connecter avec Google »
  F->>G: redirection vers la page de connexion Google
  U->>G: se connecte chez Google (ton app ne voit rien)
  G-->>F: redirection avec un code temporaire
  F->>G: échange le code (+ preuve PKCE) contre des jetons
  G-->>F: ID token + access token
  F->>A: appels API avec le jeton
  A->>A: vérifie la signature du jeton (clés publiques du fournisseur)
```

**PKCE** (« pixy ») est une protection qui empêche qu'un code intercepté soit utilisé par quelqu'un d'autre.

### Les mots à connaître

| Mot | Sens |
|---|---|
| **Fournisseur d'identité** (IdP) | celui qui vérifie l'identité : Google, Microsoft Entra ID, Keycloak, Auth0 |
| **Client** | ton application, enregistrée chez le fournisseur (avec un *client id*) |
| **Redirect URI** | l'adresse où le fournisseur renvoie l'utilisateur après connexion |
| **Scope** | ce que tu demandes : `openid email profile` |
| **ID token** | un JWT qui décrit l'utilisateur |
| **SSO** | se connecter une fois pour toutes les applications de l'entreprise |

## 🧪 Exemple

### Dans tes projets

- Pour CinéTrack : ta propre authentification JWT suffit (et t'apprend le fonctionnement).
- Pour ajouter « Se connecter avec Google » : une librairie (`passport-google-oauth20` côté NestJS, ou un service comme Auth0 / Keycloak).
- En entreprise : l'authentification passe souvent par un fournisseur central (Keycloak, Entra ID) ; les fronts utilisent une librairie OIDC (`angular-oauth2-oidc`, `oidc-client-ts`).

## ⚠️ Limites et pièges

- **Coder le flux toi-même** : utilise une librairie reconnue, les détails sont piégeux.
- **Une `redirect URI` trop large** (`https://*`) : un attaquant peut récupérer le code.
- **Faire confiance à un jeton sans vérifier sa signature, son émetteur (`iss`) et son destinataire (`aud`)**.

## 🔗 Liens

- **Prérequis :** [[Fondamentaux de la sécurité]]
- **Voir aussi :** [[Sessions cookies et JWT]], [[Authentification vs autorisation]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://oauth.net/2/
