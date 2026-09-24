---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M08
tags:
  - backend/nestjs/di
aliases:
  - "Providers et Injection de Dépendances NestJS"
parent: "[[NestJS]]"
children: []
related_theory:
  - "[[TG-05-Paradigmes-POO|Programmation Orientée Objet]]"
  - "[[ARCH-11-SOLID|SOLID]]"
related_snippets:
  - "[[04_Snippets/nest-04-providers-di]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.nestjs.com/providers"
---

# Providers et Injection de Dépendances NestJS

> [!abstract] Introduction
> Les providers (services, repositories, factories) sont des classes que Nest instancie et injecte automatiquement là où elles sont demandées ; l'injection de dépendances rend le code découplé et testable.

> [!warning]- Prérequis
> [[NEST-02-Modules|Modules NestJS]], [[TG-05-Paradigmes-POO|Programmation Orientée Objet]]

---

## Théorie

> [!question]- C'est quoi ?
> ```typescript
> @Injectable()
> export class FilmsService {
>   constructor(private readonly prisma: PrismaService, private readonly logger: Logger) {}
> }
> ```
> Formes avancées de providers :
> ```typescript
> providers: [
>   FilmsService,                                                  // classe
>   { provide: 'CONFIG_TMDB', useValue: { baseUrl: '…' } },        // valeur
>   { provide: PaiementGateway, useClass: StripeGateway },          // implémentation interchangeable
>   { provide: 'REDIS', useFactory: (c: ConfigService) => new Redis(c.get('REDIS_URL')), inject: [ConfigService] },
> ]
> ```

> [!example]- Analogie
> Au lieu que chaque employé achète ses propres outils (new), l'entreprise (le conteneur) les distribue à qui en a besoin — et peut remplacer un outil par un autre (mock en test) sans que l'employé ne change quoi que ce soit.

> [!question]- Pourquoi l'utiliser ?
> Découplage (dépendre d'abstractions), testabilité (remplacer par des mocks), cycle de vie géré (singletons, init/destroy).

> [!question]- Comment ça marche ?
> - Injection par le constructeur (type = jeton) ou `@Inject('TOKEN')` pour les jetons chaîne/symbol
> - Scopes : `DEFAULT` (singleton), `REQUEST` (une instance par requête), `TRANSIENT`
> - Hooks : `onModuleInit`, `onApplicationShutdown`
> - Classes abstraites comme jetons pour l'inversion de dépendance

> [!question]- Quand l'utiliser ?
> Toute logique métier, accès données, clients externes (API, cache, mail).

> [!danger]- Quand NE PAS l'utiliser / Limites
> Le scope REQUEST se propage à toute la chaîne de dépendances et coûte en performance.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Provider | Élément injectable enregistré dans un module |
| Jeton (token) | Identifiant d'un provider |
| `useClass` / `useValue` / `useFactory` | Façons de fournir une valeur |
| Scope | Durée de vie d'une instance |

---

## Points clés

- Singletons par défaut
- Dépendre d'abstractions pour pouvoir changer d'implémentation
- `useFactory` pour les clients configurés
- Tests : `Test.createTestingModule` + `overrideProvider`

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - `new FilmsService()` à la main → dépendances non injectées
> - Dépendances circulaires entre services

---

## Exemple minimal

```typescript
export abstract class StockageFichiers { abstract enregistrer(nom: string, data: Buffer): Promise<string>; }
@Injectable() export class StockageLocal implements StockageFichiers { /* disque */ }
@Injectable() export class StockageS3 implements StockageFichiers { /* S3 */ }
// module
{ provide: StockageFichiers, useClass: process.env.NODE_ENV === 'production' ? StockageS3 : StockageLocal }
// service
constructor(private stockage: StockageFichiers) {}
```

> [!note] Ce que j'en retiens
> Le service ne sait pas où sont stockés les fichiers : on change d'implémentation sans le modifier (principe DIP).

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Relier DI, DIP (SOLID) et architecture hexagonale (ports & adapters)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[NestJS]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[ANG-05-Services-DI|Services & Injection de Dépendances (DI) Angular]]

**Pratique :**
- Extrait de code → [[04_Snippets/nest-04-providers-di]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Comment remplacer un service par un mock dans un test Nest ?

> [!faq]- Questions d'entretien
> - Qu'est-ce que l'injection de dépendances et quels problèmes résout-elle ?

---

## Tâches

- [ ] #task Créer une abstraction `TmdbClient` avec une implémentation réelle et une fausse
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
