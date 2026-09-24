---
created: 2026-09-16
modified: 2026-09-16
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M05
aliases:
  - "Modules (NgModules) Angular"
tags:
  - frameworks/angular/ngmodules
parent: "[[Angular]]"
children:
  - "[[ANG-13-Modules-NgModules|Composants Standalone Angular]]"
related_theory: []
related_snippets:
  - "[[04_Snippets/angular-ngmodule-legacy]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://angular.dev/guide/ngmodules"
---

# Modules (NgModules) Angular

> [!abstract] Introduction
> Ancien mécanisme regroupant composants, services et modules ensemble — largement remplacé par les composants standalone depuis Angular 17.

> [!warning]- Prérequis
> [[ANG-02-Composants|Composants Angular]].

---

## Théorie

> [!question]- C'est quoi ?
> ```typescript
> @NgModule({
>   declarations: [ListeFilmsComponent],
>   imports: [CommonModule],
>   exports: [ListeFilmsComponent]
> })
> export class FilmsModule {}
> ```

> [!example]- Analogie
> Un NgModule est un classeur qui range et déclare tous les documents (composants) d'un rayon précis, et décide lesquels sont visibles depuis l'extérieur du classeur (`exports`).

> [!question]- Pourquoi l'utiliser ?
> Avant Angular 17, organiser une grosse application en blocs cohérents, avec chargement à la demande de certains blocs.

> [!question]- Comment ça marche ?
> `declarations` = composants du module ; `imports` = dépendances ; `exports` = ce qui devient utilisable ailleurs.

> [!question]- Quand l'utiliser ?
> Sur un projet existant qui en utilise déjà. Sur un nouveau projet Angular 17+, privilégier les composants standalone.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Créer de nouveaux NgModules sur un projet démarré en standalone réintroduit une complexité qu'Angular a justement cherché à supprimer.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| `declarations` | Composants appartenant au module |
| `exports` | Ce que le module rend utilisable ailleurs |
| `CommonModule` | Regroupe les directives de base (`*ngIf`, `*ngFor`) |

---

## Points clés

- Un composant doit être déclaré dans EXACTEMENT un module
- `exports` nécessaire pour qu'un autre module utilise un composant
- Un composant standalone n'a besoin d'aucune de ces étapes
- Migration progressive possible via `ng generate @angular/core:standalone`

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Oublier `exports` sur un composant censé être utilisé ailleurs
> - Déclarer un même composant dans deux modules différents (erreur)

---

## Paramètres / Configuration

| Propriété | Description |
|-----------|-------------|
| `declarations` | Composants/directives/pipes du module |
| `imports` | Modules dont celui-ci dépend |
| `exports` | Rend utilisable par d'autres modules |

---

## Exemple minimal

```typescript
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListeFilmsComponent],  // import direct, pas de module intermédiaire
  template: `<app-liste-films></app-liste-films>`
})
export class AppComponent {}
```

> [!note] Ce que j'en retiens
> L'approche standalone importe directement ce dont on a besoin, sans module intermédiaire.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Migrer un projet NgModule vers standalone avec `ng generate @angular/core:standalone` (3 étapes)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Angular]]
- Sous-sujets → [[ANG-13-Modules-NgModules|Composants Standalone Angular]]
- À comparer avec → [[ANG-13-Modules-NgModules|Composants Standalone Angular]]

**Pratique :**
- Extrait de code → [[04_Snippets/angular-ngmodule-legacy]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> Pourrais-je reconnaître un vieux projet Angular basé sur NgModule au premier coup d'œil ?

> [!faq]- Questions d'entretien
> - Pourquoi Angular est-il passé aux composants standalone ?

---

## Tâches

- [ ] #task Regarder un vieux projet Angular avec NgModule
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Difficulté réelle de mélanger standalone et NgModule dans le même projet ?
