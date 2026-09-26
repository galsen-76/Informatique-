---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M11
tags:
  - securite/secrets
aliases:
  - "Gestion des Secrets"
parent: "[[Sécurité]]"
related_theory:
  - "[[NEST-08-Configuration-Environnements|Configuration et Environnements NestJS]]"
  - "[[03-CI-CD|CI/CD GitLab]]"
related_projects: []
source: "https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html"
---

# Gestion des Secrets

> [!abstract] En bref
> Un **secret**, c'est tout ce qui donne un accès : mot de passe de la base, secret des JWT, clé d'API TMDB, identifiants d'un service d'e-mail. Règle absolue : **jamais dans le code ni dans Git**. Ils vivent dans des variables d'environnement, fournies par un endroit protégé selon l'environnement.

## Où vivent les secrets

| Environnement | Où |
|---|---|
| ta machine | fichier `.env` **ignoré par Git** |
| CI GitLab | *Settings → CI/CD → Variables*, cochées **Masked** et **Protected** |
| production | les variables de l'hébergeur, ou un **coffre-fort** (Vault, AWS Secrets Manager, Doppler) |
| Kubernetes | les objets `Secret` (idéalement alimentés par un coffre-fort) |

Le code, lui, lit seulement `process.env.JWT_SECRET` (via `ConfigService`, voir [[NEST-08-Configuration-Environnements|Configuration]]).

## Le fichier `.env.example`

Commité, **sans les vraies valeurs** : il documente quelles variables existent.

```bash
DATABASE_URL=postgresql://user:password@localhost:5432/cinetrack
JWT_SECRET=
TMDB_TOKEN=
```

## Et côté front ?

**Tout ce qui est dans le front est public.** Une variable `VITE_…` ou une valeur dans `environment.ts` finit dans le JavaScript téléchargé par chaque visiteur.

| Donnée | Dans le front ? |
|---|---|
| URL de l'API | oui |
| clé publique (Stripe publishable key, clé TMDB en lecture pour un projet perso) | acceptable |
| secret JWT, mot de passe de base, clé privée | **jamais** → passer par ton API |

## Si un secret a fuité

1. **Change-le immédiatement** (révoquer la clé, nouveau mot de passe, nouveau secret JWT).
2. Le retirer de Git **ne suffit pas** : il est dans l'historique, et peut-être déjà copié.
3. Vérifie les accès suspects dans les logs du service concerné.

## Prévenir les fuites

- `.env` dans le `.gitignore` **dès la création du projet**.
- **Détection automatique** : Secret Detection de GitLab, gitleaks en hook de pré-commit.
- **Des secrets différents** par environnement (développement, test, production).
- **Des secrets longs et aléatoires** :
  ```bash
  openssl rand -base64 48
  ```
- **Renouveler** régulièrement les secrets importants.

## Pièges

- **Un secret dans un message de commit, un ticket, une capture d'écran ou Slack**.
- **Afficher les variables d'environnement dans les logs** au démarrage « pour déboguer ».
- **Le même mot de passe** pour la base de développement et de production.
