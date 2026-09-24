---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M10
tags:
  - tests/doublures
aliases:
  - "Mocks Stubs et Spies"
parent: "[[Tests et Qualité]]"
children: []
related_theory:
  - "[[TEST-02-Tests-Unitaires-Vitest-Jest|Tests Unitaires avec Vitest et Jest]]"
  - "[[NEST-04-Providers-DI|Providers et Injection de Dépendances NestJS]]"
related_snippets:
  - "[[04_Snippets/test-03-mocks-stubs-spies]]"
related_projects: []
source: "https://martinfowler.com/articles/mocksArentStubs.html"
---

# Mocks Stubs et Spies

> [!abstract] Introduction
> Les doublures de test remplacent une dépendance réelle (API, BDD, horloge) pour isoler le code testé : stub (renvoie une valeur), spy (observe les appels), mock (vérifie des interactions), fake (implémentation simplifiée).

> [!warning]- Prérequis
> [[TEST-02-Tests-Unitaires-Vitest-Jest|Tests Unitaires avec Vitest et Jest]]

---

## Théorie

> [!question]- C'est quoi ?
> | Doublure | Rôle | Exemple |
> |---|---|---|
> | Dummy | Remplir un paramètre | `null as any` |
> | Stub | Renvoyer une réponse prédéfinie | `vi.fn().mockResolvedValue([])` |
> | Spy | Enregistrer les appels d'une vraie fonction | `vi.spyOn(console, 'error')` |
> | Mock | Stub + vérification des appels | `expect(api.creer).toHaveBeenCalledWith(...)` |
> | Fake | Implémentation légère réelle | Repository en mémoire |

> [!example]- Analogie
> Un cascadeur remplace l'acteur pour les scènes dangereuses : le film (le test) continue sans risquer l'acteur (la vraie BDD, la vraie API de paiement).

> [!question]- Pourquoi l'utiliser ?
> Tests rapides, déterministes, sans réseau, capables de simuler des erreurs (500, timeout) difficiles à provoquer autrement.

> [!question]- Comment ça marche ?
> ```typescript
> // Angular : service HTTP remplacé
> TestBed.configureTestingModule({
>   providers: [{ provide: FilmApi, useValue: { liste: vi.fn().mockReturnValue(of([dune])) } }],
> });
> // Angular HttpClient : outils dédiés
> provideHttpClient(), provideHttpClientTesting();
> const http = TestBed.inject(HttpTestingController);
> http.expectOne('/api/films').flush([dune]);
> // Réseau global : MSW intercepte fetch/XHR (Vue, Angular, Node)
> ```

> [!question]- Quand l'utiliser ?
> Dépendances lentes, non déterministes ou externes : HTTP, BDD (en unitaire), temps, aléatoire, stockage.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Trop de mocks = tests qui vérifient l'implémentation et passent alors que l'intégration réelle est cassée. Mocker ce qu'on ne possède pas via une abstraction à soi.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Doublure | Objet qui remplace une dépendance en test |
| Stub | Réponse prédéfinie |
| Spy | Observateur d'appels |
| Fake | Implémentation simplifiée fonctionnelle |
| MSW | Interception réseau pour les tests |

---

## Points clés

- Doubler les frontières (réseau, BDD, temps)
- Préférer les fakes simples aux mocks complexes
- Tester aussi les cas d'erreur grâce aux stubs

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Mocker le module qu'on teste lui-même
> - Vérifier chaque appel interne (tests fragiles)

---

## Exemple minimal

```typescript
it('affiche un message si l\'API échoue', async () => {
  api.liste.mockReturnValue(throwError(() => new HttpErrorResponse({ status: 500 })));
  const f = TestBed.createComponent(ListeFilmsComponent);
  f.detectChanges(); await f.whenStable();
  expect(f.nativeElement.textContent).toContain('Chargement impossible');
});
```

> [!note] Ce que j'en retiens
> Un stub en erreur teste le chemin d'échec en une ligne.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Concevoir le code pour la testabilité (DI, fonctions pures) plutôt que multiplier les mocks

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Tests et Qualité]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/test-03-mocks-stubs-spies]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Différence entre stub et mock ?

---

## Tâches

- [ ] #task Tester le cas d'erreur réseau de la liste de films (Angular et Vue)
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
