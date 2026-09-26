---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - theorie/poo
aliases:
  - "Programmation Orientée Objet"
parent: "[[Théorie Générale]]"
related_theory:
  - "[[PY-05-POO-Classes|POO Classes Python]]"
  - "[[ARCH-07-Design-Patterns-Fondamentaux|Design Patterns Fondamentaux]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://fr.wikipedia.org/wiki/Programmation_orient%C3%A9e_objet"
---

# Programmation Orientée Objet

> [!abstract] En bref
> La **POO** range le code en **objets** qui regroupent des **données** et les **actions** qui vont avec. Un `MoviesService` contient la liste des films **et** les méthodes pour les charger. Angular, NestJS et Java sont construits ainsi : comprendre les 4 idées de base de la POO, c'est comprendre pourquoi ces frameworks s'organisent en classes, services et injection de dépendances.

## Classe et objet

Une **classe** est un **moule**, un **objet** (ou *instance*) est ce qui sort du moule.

```ts
class Movie {
  constructor(
    public title: string,
    private ratings: number[] = [],
  ) {}

  addRating(value: number) {
    if (value < 1 || value > 5) throw new Error('Note entre 1 et 5');
    this.ratings.push(value);
  }

  get average(): number {
    return this.ratings.length ? this.ratings.reduce((a, b) => a + b) / this.ratings.length : 0;
  }
}

const dune = new Movie('Dune');   // un objet créé depuis la classe
dune.addRating(5);
dune.average;                     // 5
```

## Les 4 idées de la POO

Avec l'image d'une **voiture** :

| Idée | Voiture | Code |
|---|---|---|
| **Encapsulation** | le moteur est caché sous le capot | `private ratings` : on ne peut pas y toucher directement, seulement via `addRating` qui vérifie la note |
| **Abstraction** | tu utilises volant et pédales sans savoir comment ça marche | une interface `Notifier` dit **quoi** faire, pas **comment** |
| **Héritage** | une voiture électrique **est une** voiture | `class Admin extends User` |
| **Polymorphisme** | « accélérer » marche sur toutes les voitures, différemment | `notifier.send()` envoie un e-mail **ou** un SMS selon l'objet |

## L'idée qui compte le plus : dépendre d'un contrat

```ts
interface Notifier {
  send(message: string): Promise<void>;
}

class EmailNotifier implements Notifier {
  async send(message: string) { /* envoi d'e-mail */ }
}

class SmsNotifier implements Notifier {
  async send(message: string) { /* envoi de SMS */ }
}

class ReviewsService {
  constructor(private notifier: Notifier) {}   // n'importe quel Notifier convient

  async publish() {
    await this.notifier.send('Nouvelle critique publiée');
  }
}

new ReviewsService(new EmailNotifier());
new ReviewsService(new SmsNotifier());   // on change le comportement sans toucher au service
```

C'est exactement le principe de l'**injection de dépendances** d'Angular et NestJS (voir [[NEST-04-Providers-DI|Providers et DI]]) : on donne au service ce dont il a besoin, et en test on lui donne une fausse version (voir [[TEST-03-Mocks-Stubs-Spies|Mocks]]).

## Composition plutôt qu'héritage

L'héritage paraît pratique mais crée des chaînes rigides (`Animal > Mammifère > Chien > ChienDeGarde…`). On préfère **assembler** des objets :

```ts
// ❌ class ReviewsService extends LoggerService  (un service de critiques n'EST PAS un logger)
// ✅ il A un logger
class ReviewsService {
  constructor(private logger: Logger, private notifier: Notifier) {}
}
```

## POO et front moderne

Le front actuel **mélange** : des classes pour les services, et un style plus fonctionnel pour le reste (signals, `computed`, composables Vue, fonctions pures). Voir [[TG-06-Programmation-Fonctionnelle|Programmation fonctionnelle]].

## Pièges

- **La classe qui fait tout** (300 lignes, 20 méthodes) : découpe par responsabilité.
- **Hériter juste pour réutiliser du code** : préfère la composition.
- **Tout mettre en `public`** : l'encapsulation protège tes règles (une note entre 1 et 5).
