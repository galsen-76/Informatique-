---
created: 2026-09-16
modified: 2026-09-16
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M04
aliases:
  - "Services & Injection de Dépendances (DI) Angular"
tags:
  - frameworks/angular/services-di
parent: "[[Angular]]"
children:
  - "[[ANG-05-Services-DI|Hiérarchie des injecteurs Angular]]"
related_theory: []
related_snippets:
  - "[[04_Snippets/angular-service-basique]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://angular.dev/guide/di"
---

# Services & Injection de Dépendances (DI) Angular

> [!abstract] Introduction
> Un service centralise une logique partagée entre composants ; l'injection de dépendances la fournit automatiquement à qui en a besoin.

> [!warning]- Prérequis
> [[ANG-02-Composants|Composants Angular]], [[ARCH-07-Design-Patterns-Fondamentaux|pattern Singleton]] (le fonctionnement par défaut d'un service).

---

## Théorie

> [!question]- C'est quoi ?
> ```typescript
> @Injectable({ providedIn: 'root' })
> export class FilmService {
>   obtenirFilms() { return this.films; }
> }
> ```

> [!example]- Analogie
> Un service est une boîte à outils commune de l'immeuble, accessible depuis chaque appartement (composant) sans que chacun ait à en posséder une copie personnelle.

> [!question]- Pourquoi l'utiliser ?
> Éviter la duplication de logique, partager des données entre composants, séparer affichage et logique métier.

> [!question]- Comment ça marche ?
> ```typescript
> private filmService = inject(FilmService);  // syntaxe moderne
> // ou constructor(private filmService: FilmService) {}
> ```
> `providedIn: 'root'` = une seule instance partagée dans toute l'app.

> [!question]- Quand l'utiliser ?
> Dès qu'une logique doit être partagée entre composants, ou pour communiquer avec un serveur.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Mettre TOUTE la logique métier dans un unique service géant recrée le problème qu'on cherchait à éviter — répartir par domaine fonctionnel plutôt qu'avoir un "service fourre-tout".

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| `@Injectable` | Décorateur marquant une classe comme service injectable |
| `providedIn: 'root'` | Une instance unique partagée dans toute l'application |
| `inject()` | Fonction moderne pour récupérer une dépendance |

---

## Points clés

- Service = classe `@Injectable`, sans HTML
- `providedIn: 'root'` = instance unique partagée
- Injection via constructeur (classique) ou `inject()` (moderne)
- Angular gère la création/destruction, jamais de `new` manuel

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Oublier `@Injectable` sur une classe censée être un service
> - Instancier soi-même un service avec `new`, perdant le partage garanti par Angular

---

## Paramètres / Configuration

| Option | Description | Notes |
|-----------|-------------|-------|
| `providedIn: 'root'` | Instance unique globale | Cas le plus courant |
| `providedIn: 'any'` | Une instance par injecteur lazy | Déprécié, à éviter |
| `providers: []` (composant) | Instance par composant | Isole un état local |

---

## Exemple minimal

```typescript
@Injectable({ providedIn: 'root' })
export class FilmService {
  private films = ['Inception'];
  obtenirFilms() { return this.films; }
}
```

> [!note] Ce que j'en retiens
> N'importe quel composant injectant `FilmService` reçoit la MÊME instance, donc les mêmes données.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Hiérarchie des injecteurs : environnement (root, routes) et éléments (composants) ; `providers` sur une route pour une instance par feature
> - `InjectionToken` pour injecter des valeurs (configuration) et `inject()` utilisable dans des fonctions (guards, intercepteurs)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Angular]]
- Sous-sujets → [[ANG-05-Services-DI|Hiérarchie des injecteurs Angular]]
- À comparer avec → [[VUE-13-Provide-Inject|Provide Inject Vue.js]], [[ARCH-07-Design-Patterns-Fondamentaux|Design Patterns Fondamentaux]]

**Pratique :**
- Extrait de code → [[04_Snippets/angular-service-basique]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> Pourrais-je expliquer pourquoi `providedIn: 'root'` est un pattern Singleton, sans utiliser ce mot ?

> [!faq]- Questions d'entretien
> - Qu'est-ce que l'injection de dépendances dans Angular ?
> - Quelle différence entre `providedIn: 'root'` et `providers` d'un composant ?

---

## Tâches

- [ ] #task Créer un `FilmService` centralisant la liste des films
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Dans quels cas voudrait-on PLUSIEURS instances d'un même service ?
