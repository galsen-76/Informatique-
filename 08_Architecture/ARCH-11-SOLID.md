---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M10
tags:
  - architecture/solid
aliases:
  - "SOLID"
parent: "[[Architecture Logicielle]]"
related_theory:
  - "[[TG-05-Paradigmes-POO|Programmation Orientée Objet]]"
  - "[[NEST-04-Providers-DI|Providers et Injection de Dépendances NestJS]]"
  - "[[ARCH-07-Design-Patterns-Fondamentaux|Design Patterns Fondamentaux]]"
related_projects: []
source: "https://fr.wikipedia.org/wiki/SOLID_(informatique)"
---

# SOLID

> [!abstract] En bref
> **SOLID** regroupe 5 principes pour écrire des classes et des modules faciles à faire évoluer. Tu en appliques déjà une partie grâce à Angular et NestJS. Ce sont des **repères** pour juger un code, pas des lois à appliquer mécaniquement. Question classique en entretien.

## Les 5 principes

| Lettre | Principe | En une phrase | Signe qu'il est violé |
|---|---|---|---|
| **S** | Responsabilité unique | une classe a **une seule raison de changer** | un service de 800 lignes qui gère API, cache, e-mails et calculs |
| **O** | Ouvert / fermé | on **ajoute** un comportement sans **modifier** l'existant | un `switch` qu'on rallonge à chaque nouveau cas |
| **L** | Substitution de Liskov | une classe enfant peut **remplacer** son parent sans surprise | une sous-classe qui lance « non supporté » sur une méthode du parent |
| **I** | Ségrégation des interfaces | plusieurs **petites** interfaces plutôt qu'une énorme | implémenter 10 méthodes pour en utiliser 2 |
| **D** | Inversion des dépendances | dépendre d'une **abstraction**, pas d'un détail | un service qui fait `new SmtpClient()` lui-même |

## S : une seule responsabilité

```ts
// ❌ MoviesService fait tout
class MoviesService {
  fetchFromTmdb() {}
  mapDto() {}
  cacheInRedis() {}
  sendNewReleaseEmail() {}
}

// ✅ chacun son métier
class TmdbClient { popular() {} }            // parler à TMDB
const toMovie = (dto) => ({ … });            // convertir
class MoviesService { /* règles métier */ }  // orchestrer
class MailService { /* e-mails */ }
```

C'est exactement la séparation `api` / `mapper` / `store` de la [[ARCH-15-Structure-de-Projet|structure de projet]].

## O : ouvert à l'extension, fermé à la modification

Le tri des films avec des stratégies : ajouter un tri = ajouter une entrée, sans toucher au code existant (voir le pattern Strategy dans [[ARCH-07-Design-Patterns-Fondamentaux|Design patterns]]).

## L : un remplaçant qui tient ses promesses

Si `FakeMailService` remplace `MailService` dans les tests, il doit accepter les mêmes appels et se comporter de façon cohérente. C'est ce qui rend les doublures de test fiables.

## I : des interfaces à la bonne taille

```ts
// ❌
interface Repository<T> { find(); create(); update(); delete(); bulkImport(); exportCsv(); }

// ✅ chacun n'implémente que ce dont il a besoin
interface Reader<T> { find(id: number): Promise<T | null> }
interface Writer<T> { create(data: Partial<T>): Promise<T> }
```

## D : dépendre d'une abstraction

```ts
export abstract class MailSender {
  abstract send(to: string, subject: string, body: string): Promise<void>;
}

@Injectable()
export class AuthService {
  constructor(private mail: MailSender) {}   // ne sait pas si c'est SMTP, Brevo ou un faux
}

// module : { provide: MailSender, useClass: BrevoMailSender }
```

Changer de prestataire = changer une ligne. L'injection de dépendances de NestJS et d'Angular rend ce principe naturel (voir [[NEST-04-Providers-DI|Injection NestJS]]).

## Pièges

- **Appliquer SOLID de façon dogmatique** : une interface par classe, dix fichiers pour une fonctionnalité simple.
- **Le confondre avec « plus de classes »** : souvent, une simple fonction respecte déjà ces principes.
