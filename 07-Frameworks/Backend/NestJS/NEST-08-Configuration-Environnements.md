---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M08
tags:
  - backend/nestjs/config
aliases:
  - "Configuration et Environnements NestJS"
parent: "[[NestJS]]"
children: []
related_theory:
  - "[[SEC-10-Gestion-des-Secrets|Gestion des Secrets]]"
  - "[[ANG-17-Deploiement-Build|Déploiement & Build Angular]]"
related_snippets:
  - "[[04_Snippets/nest-08-configuration-environnements]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.nestjs.com/techniques/configuration"
---

# Configuration et Environnements NestJS

> [!abstract] Introduction
> La configuration (URL de BDD, secrets JWT, ports) vient de variables d'environnement validées au démarrage via `@nestjs/config`, jamais du code source — principe « 12-factor app ».

> [!warning]- Prérequis
> [[NEST-04-Providers-DI|Providers et Injection de Dépendances NestJS]]

---

## Théorie

> [!question]- C'est quoi ?
> ```bash
> # .env (NON commité) — un .env.example documente les clés
> DATABASE_URL=postgresql://cine:secret@localhost:5432/cinetrack
> JWT_SECRET=change-moi
> PORT=3000
> ```
> ```typescript
> ConfigModule.forRoot({
>   isGlobal: true,
>   validate: (env) => z.object({
>     DATABASE_URL: z.string().url(),
>     JWT_SECRET: z.string().min(32),
>     PORT: z.coerce.number().default(3000),
>   }).parse(env),
> });
> ```

> [!example]- Analogie
> Le code est une recette ; la configuration est la liste des ingrédients qui change selon la cuisine (dev, test, prod) sans réécrire la recette.

> [!question]- Pourquoi l'utiliser ?
> Même image Docker déployée partout, secrets hors du dépôt Git, échec immédiat si une variable manque.

> [!question]- Comment ça marche ?
> - `ConfigService.get<string>('JWT_SECRET')` / `getOrThrow`
> - Config typée par namespace (`registerAs('db', () => ({...}))`)
> - `.env` en local, variables injectées par la plateforme (CI/CD, Kubernetes secrets, vault) en production

> [!question]- Quand l'utiliser ?
> Toute valeur qui change selon l'environnement ou qui est secrète.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Les variables d'environnement sont des chaînes : valider et convertir. Un `.env` commité par erreur = secret à révoquer immédiatement.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| 12-factor | Principes d'applications cloud, dont la config par environnement |
| `.env.example` | Modèle des variables, sans valeurs secrètes |
| Secret | Donnée sensible (mot de passe, clé API) |

---

## Points clés

- `.env` dans `.gitignore`, `.env.example` commité
- Valider la config au démarrage
- Aucune valeur par défaut pour les secrets

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Secrets en dur dans le code ou dans l'image Docker
> - Oublier une variable en production → crash au premier appel au lieu du démarrage

---

## Exemple minimal

```typescript
@Injectable()
export class TmdbService {
  private readonly cle: string;
  constructor(config: ConfigService) { this.cle = config.getOrThrow('TMDB_API_KEY'); }
}
```

> [!note] Ce que j'en retiens
> `getOrThrow` fait échouer tôt et clairement.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Rotation des secrets, gestionnaires (Vault, AWS Secrets Manager, GitLab CI variables masquées)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[NestJS]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/nest-08-configuration-environnements]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi valider la configuration au démarrage ?

---

## Tâches

- [ ] #task Mettre en place ConfigModule validé + `.env.example`
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
