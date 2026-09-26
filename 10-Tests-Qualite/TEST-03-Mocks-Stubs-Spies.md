---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M10
tags:
  - tests/doublures
aliases:
  - "Mocks Stubs et Spies"
parent: "[[Tests et Qualité]]"
related_theory:
  - "[[TEST-02-Tests-Unitaires-Vitest-Jest|Tests Unitaires avec Vitest et Jest]]"
  - "[[NEST-04-Providers-DI|Providers et Injection de Dépendances NestJS]]"
related_projects: []
source: "https://martinfowler.com/articles/mocksArentStubs.html"
---

# Mocks Stubs et Spies

> [!abstract] En bref
> Pour tester un service **seul**, on remplace ses dépendances (la base de données, l'API TMDB, l'envoi d'e-mail) par des **doublures** : de faux objets qu'on contrôle. Comme au cinéma, la doublure remplace l'acteur pour les scènes dangereuses. Les tests restent rapides, fiables et sans effet réel.

## Les types de doublures

| Type | Rôle | Exemple |
|---|---|---|
| **Stub** | renvoie une réponse **toute prête** | la « base » renvoie toujours ce film |
| **Spy** (espion) | **enregistre** les appels pour les vérifier | « `sendEmail` a-t-il été appelé avec cette adresse ? » |
| **Mock** | stub + espion : réponse préparée **et** appels vérifiés | le plus courant avec `vi.fn()` |
| **Fake** | une **vraie petite implémentation** simplifiée | une « base » en mémoire avec un tableau |

## Avec Vitest

```ts
import { vi } from 'vitest';

// une fausse fonction
const findUnique = vi.fn().mockResolvedValue({ id: 1, userId: 99 });

// un espion sur une vraie méthode
const spy = vi.spyOn(mailer, 'send').mockResolvedValue(undefined);

// vérifications
expect(findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
expect(spy).toHaveBeenCalledTimes(1);
expect(spy).not.toHaveBeenCalled();
```

| Outil | Effet |
|---|---|
| `vi.fn()` | crée une fausse fonction |
| `.mockReturnValue(x)` | renvoie `x` |
| `.mockResolvedValue(x)` / `.mockRejectedValue(e)` | Promise réussie / échouée |
| `vi.spyOn(obj, 'méthode')` | espionne (et peut remplacer) une vraie méthode |
| `vi.mock('./module')` | remplace un module entier |
| `vi.useFakeTimers()` | contrôler le temps (`setTimeout`, dates) |

## Exemple : tester un service NestJS

```ts
it('envoie un e-mail de bienvenue à l\'inscription', async () => {
  const prisma = { user: { findUnique: vi.fn().mockResolvedValue(null), create: vi.fn().mockResolvedValue({ id: 1, email: 'a@b.fr' }) } };
  const mailer = { sendWelcome: vi.fn() };
  const service = new AuthService(prisma as any, mailer as any, jwtStub);

  await service.register({ email: 'a@b.fr', password: 'Motdepasse123!' });

  expect(mailer.sendWelcome).toHaveBeenCalledWith('a@b.fr');
});
```

Grâce à l'injection de dépendances, remplacer une dépendance est facile (voir [[NEST-04-Providers-DI|Injection NestJS]] et [[ANG-05-Services-DI|Injection Angular]]).

## Quoi remplacer, quoi garder

| Remplacer ✅ | Garder réel ✅ |
|---|---|
| la base de données (en test unitaire) | tes propres fonctions de calcul |
| les API externes (TMDB, paiement, e-mail) | les mappers, les validations |
| le temps, l'aléatoire | |

## Pièges

- **Tout mocker** : tu finis par tester tes mocks, pas ton code. Si un test est rempli de mocks, c'est peut-être un test d'**intégration** qu'il faut (voir [[TEST-04-Tests-Integration-API|Intégration]]).
- **Oublier de réinitialiser** les mocks entre les tests (`vi.clearAllMocks()` dans `beforeEach`) : un test hérite des appels du précédent.
- **Un mock qui ne ressemble pas à la vraie réponse** : le test passe, la production casse.
