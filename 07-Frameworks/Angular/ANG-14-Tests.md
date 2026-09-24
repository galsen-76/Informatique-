---
created: 2026-09-16
modified: 2026-09-16
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M05
aliases:
  - "Tests Angular"
tags:
  - frameworks/angular/tests
parent: "[[Angular]]"
children:
  - "[[ANG-14-Tests|TestBed]]"
related_theory: []
related_snippets:
  - "[[04_Snippets/angular-test-composant]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://angular.dev/guide/testing"
---

# Tests Angular

> [!abstract] Introduction
> Vérifier automatiquement qu'un composant ou service se comporte comme prévu, avec `TestBed` et un runner : historiquement Jasmine + Karma (Karma est déprécié), aujourd'hui Vitest (défaut des nouveaux projets récents) ou Jest.

> [!warning]- Prérequis
> [[ANG-02-Composants|Composants Angular]], [[ANG-05-Services-DI|Services et DI Angular]].

---

## Théorie

> [!question]- C'est quoi ?
> ```typescript
> describe('FilmService', () => {
>   it('devrait retourner une liste vide', () => {
>     expect(service.obtenirFilms()).toEqual([]);
>   });
> });
> ```

> [!example]- Analogie
> `TestBed` est un plateau de tournage miniature : il recrée un mini-environnement Angular contrôlé pour tester un composant sans avoir besoin de toute l'application réelle autour.

> [!question]- Pourquoi l'utiliser ?
> Détecter des régressions sans devoir vérifier manuellement toute l'application à chaque modification.

> [!question]- Comment ça marche ?
> ```typescript
> const fixture = TestBed.createComponent(FilmCardComponent);
> fixture.componentInstance.titre = 'Inception';
> fixture.detectChanges();
> ```
> Une `fixture` donne accès au composant ET à son HTML réellement affiché.

> [!question]- Quand l'utiliser ?
> Tester chaque service, les composants critiques (formulaires, calculs), et les cas e2e via Cypress/Playwright.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Oublier `fixture.detectChanges()` fait échouer un test qui vérifie le HTML — Angular ne met pas à jour l'affichage automatiquement pendant un test.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| `TestBed` | Environnement Angular recréé pour tester isolément |
| `fixture` | Conteneur de test donnant accès au composant et à son HTML |
| Mock | Fausse version simplifiée d'un service pour isoler le test |

---

## Points clés

- Historique : Jasmine (syntaxe) + Karma (exécuteur, déprécié) ; aujourd'hui : Vitest ou Jest avec la même API `describe/it/expect`
- `TestBed.createComponent` crée une instance de test
- `fixture.detectChanges()` force la mise à jour de l'affichage
- Mocker un service évite de dépendre d'un vrai serveur

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Oublier `fixture.detectChanges()` après avoir modifié une propriété du composant
> - Tester sans mocker un service dépendant d'un vrai appel réseau, rendant le test fragile
> - Ne tester que le "happy path", jamais les cas d'erreur

---

## Paramètres / Configuration

| Élément | Description |
|-----------|-------------|
| `describe(nom, fn)` | Regroupe des tests |
| `it(nom, fn)` | Un test individuel |
| `TestBed.createComponent(X)` | Instance de test d'un composant |
| `fixture.detectChanges()` | Force la mise à jour d'affichage |

---

## Exemple minimal

```typescript
const fixture = TestBed.createComponent(FilmCardComponent);
fixture.componentInstance.titre = 'Inception';
fixture.detectChanges();
expect(fixture.nativeElement.querySelector('h2').textContent).toContain('Inception');
```

> [!note] Ce que j'en retiens
> `detectChanges()` est indispensable pour que le HTML reflète la modification faite juste avant.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Tester les composants par le DOM et les rôles (Angular Testing Library) plutôt que par l'instance
> - Voir [[TEST-01-Pyramide-des-Tests|Pyramide des Tests]], [[TEST-03-Mocks-Stubs-Spies|Mocks Stubs et Spies]], [[TEST-05-Tests-E2E-Playwright|Tests End-to-End Playwright et Cypress]]

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Angular]]
- Sous-sujets → [[ANG-14-Tests|TestBed]]
- À comparer avec → [[PY-14-Tests-Pytest|Tests Pytest]]

**Pratique :**
- Extrait de code → [[04_Snippets/angular-test-composant]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> Pourrais-je expliquer pourquoi `detectChanges()` est nécessaire dans un test, sans dire "détection de changement" ?

> [!faq]- Questions d'entretien
> - Comment testez-vous un composant qui dépend d'un service HTTP ?

---

## Tâches

- [ ] #task Écrire les premiers tests pour un service Angular
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Bonne proportion entre tests unitaires et e2e en entreprise ?
