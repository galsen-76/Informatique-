---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M08
tags:
  - backend/nestjs/fondamentaux
aliases:
  - "Fondamentaux NestJS"
parent: "[[NestJS]]"
children:
  - "[[NEST-02-Modules|Modules NestJS]]"
  - "[[NEST-03-Controllers|Controllers NestJS]]"
  - "[[NEST-04-Providers-DI|Providers et Injection de Dépendances NestJS]]"
related_theory:
  - "[[NODE-02-Express-Middleware|Express et Middleware]]"
  - "[[ARCH-03-Architecture-en-Couches|Architecture en Couches]]"
related_snippets:
  - "[[04_Snippets/nest-01-fondamentaux]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.nestjs.com/first-steps"
---

# Fondamentaux NestJS

> [!abstract] Introduction
> NestJS est un framework backend Node.js en TypeScript, inspiré d'Angular (modules, DI, décorateurs), qui impose une architecture claire en couches pour construire des API maintenables.

> [!warning]- Prérequis
> [[NODE-02-Express-Middleware|Express et Middleware]], [[ANG-05-Services-DI|Services & Injection de Dépendances (DI) Angular]], [[TS-14-Decorators|Decorators]]

---

## Théorie

> [!question]- C'est quoi ?
> ```bash
> npm i -g @nestjs/cli
> nest new cinetrack-api
> nest g resource films      # génère module + controller + service + DTO + entité
> ```
> ```text
> src/
> ├── main.ts               # démarrage
> ├── app.module.ts         # module racine
> └── films/
>     ├── films.module.ts
>     ├── films.controller.ts   # routes HTTP
>     ├── films.service.ts      # logique métier
>     ├── dto/create-film.dto.ts
>     └── entities/film.entity.ts
> ```

> [!example]- Analogie
> Si Express est un atelier vide où l'on range ses outils comme on veut, NestJS est un atelier aménagé avec des établis étiquetés : réception des commandes (controllers), fabrication (services), stockage (repositories).

> [!question]- Pourquoi l'utiliser ?
> Structure standard reconnaissable par toute l'équipe, DI qui facilite les tests, écosystème intégré (validation, config, auth, Swagger, WebSockets, microservices, queues).

> [!question]- Comment ça marche ?
> Cycle d'une requête dans Nest :
> ```mermaid
> flowchart LR
>   Req[Requête] --> MW[Middleware] --> G[Guards] --> I1[Interceptors avant] --> P[Pipes<br/>validation] --> C[Controller] --> S[Service] --> DB[(BDD)]
>   C --> I2[Interceptors après] --> Res[Réponse]
>   C -. exception .-> F[Exception filters] --> Res
> ```
> Correspondances Angular : `@Module` ≈ NgModule, `@Injectable` ≈ service, Guards, Pipes, Interceptors ont des rôles proches.

> [!question]- Quand l'utiliser ?
> API REST/GraphQL d'entreprise, backends de SPA Angular/Vue, microservices Node.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Plus de fichiers et de concepts qu'Express pour une micro-API ; décorateurs et DI peuvent sembler « magiques » au début.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Module | Regroupe controllers et providers d'un domaine |
| Controller | Reçoit les requêtes HTTP et renvoie les réponses |
| Provider | Classe injectable (service, repository…) |
| DTO | Objet décrivant les données entrantes/sortantes |
| Décorateur | Métadonnée `@Get()`, `@Body()`… |

---

## Points clés

- Controller = HTTP, Service = métier, Repository/ORM = données
- `nest g resource` génère un CRUD complet
- Architecture et vocabulaire très proches d'Angular
- Tourne sur Express (défaut) ou Fastify

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Mettre la logique métier dans le controller
> - Oublier d'enregistrer un provider dans son module
> - Dépendances circulaires entre modules

---

## Exemple minimal

```typescript
// main.ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({ origin: ['http://localhost:4200', 'http://localhost:5173'] });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```

> [!note] Ce que j'en retiens
> Préfixe `/api`, CORS pour les fronts Angular (4200) et Vue (5173), validation globale : la base de toute API Nest.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Comprendre le conteneur d'injection et les scopes (singleton, request, transient)
> - Choisir Fastify comme adaptateur pour la performance

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[NestJS]]
- Sous-sujets → [[NEST-02-Modules|Modules NestJS]], [[NEST-03-Controllers|Controllers NestJS]], [[NEST-04-Providers-DI|Providers et Injection de Dépendances NestJS]]
- À comparer avec → [[ANG-01-Fondamentaux|Fondamentaux Angular]]

**Pratique :**
- Extrait de code → [[04_Snippets/nest-01-fondamentaux]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Dans quel ordre passent middleware, guard, pipe, interceptor ?

> [!faq]- Questions d'entretien
> - Qu'apporte NestJS par rapport à Express ?

---

## Tâches

- [ ] #task Générer le projet `cinetrack-api` et la ressource `films`
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
