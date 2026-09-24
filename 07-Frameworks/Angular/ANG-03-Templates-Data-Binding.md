---
created: 2026-09-16
modified: 2026-09-16
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M04
aliases:
  - "Templates & Data Binding Angular"
tags:
  - frameworks/angular/templates
parent: "[[Angular]]"
children:
  - "[[ANG-04-Directives|Directives Angular]]"
related_theory: []
related_snippets:
  - "[[04_Snippets/angular-data-binding]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://angular.dev/guide/templates"
---

# Templates & Data Binding Angular

> [!abstract] Introduction
> Le data binding relie automatiquement les données de la classe TypeScript au HTML affiché, dans un sens ou dans les deux.

> [!warning]- Prérequis
> [[ANG-02-Composants|Composants Angular]].

---

## Théorie

> [!question]- C'est quoi ?
> 4 types : interpolation `{{ }}`, property binding `[prop]`, event binding `(event)`, two-way binding `[(ngModel)]`.

> [!example]- Analogie
> L'interpolation est une vitrine (on regarde, sans toucher). Le property binding est un panneau d'affichage électronique qui se met à jour tout seul. L'event binding est une sonnette (une action déclenche une réaction). Le two-way binding est un tableau blanc partagé : écrire dessus ou depuis le code met à jour les deux côtés.

> [!question]- Pourquoi l'utiliser ?
> Automatise la synchronisation entre logique et affichage, sans manipuler manuellement le DOM comme en JavaScript classique.

> [!question]- Comment ça marche ?
> ```html
> <p>Bonjour {{ prenom }}</p>
> <img [src]="urlAffiche">
> <button (click)="ajouterAuxFavoris()">Ajouter</button>
> <input [(ngModel)]="recherche">
> ```

> [!question]- Quand l'utiliser ?
> Interpolation : texte simple. Property binding : attribut dynamique. Event binding : réactions utilisateur. Two-way : champs de formulaire.

> [!danger]- Quand NE PAS l'utiliser / Limites
> `[(ngModel)]` nécessite `FormsModule` et convient surtout aux formulaires simples — pour des formulaires complexes avec validation, les reactive forms (voir [[ANG-07-Formulaires|Formulaires Angular]]) sont préférables.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Interpolation | `{{ }}`, affiche une variable dans le texte |
| Property binding | `[prop]`, donne une valeur dynamique à un attribut |
| Event binding | `(event)`, réagit à une action utilisateur |

---

## Points clés

- `{{ }}` et `[ ]` = affichage uniquement
- `( )` = réaction à un événement, jamais d'affichage
- `[( )]` = les deux sens, formulaires simples uniquement
- Une variable utilisée dans le template doit être publique dans la classe

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Utiliser `{{ }}` dans un attribut HTML au lieu de `[ ]` (ne fonctionne pas)
> - Oublier d'importer `FormsModule` pour `ngModel`
> - Mettre une variable `private` utilisée dans le template (erreur silencieuse ou de compilation)

---

## Paramètres / Configuration
> Bloc supprimé — sujet purement syntaxique.

---

## Exemple minimal

```typescript
@Component({
  selector: 'app-recherche',
  standalone: true,
  imports: [FormsModule],
  template: `
    <input [(ngModel)]="recherche">
    <p>Tu cherches : {{ recherche }}</p>
  `
})
export class RechercheComponent {
  recherche = '';
}
```

> [!note] Ce que j'en retiens
> `[(ngModel)]` synchronise l'input avec la variable — la frappe apparaît immédiatement sans code supplémentaire.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Bindings d'attribut (`[attr.aria-label]`), de classe (`[class.actif]`) et de style (`[style.width.px]`)
> - Variables locales `@let` dans le template (Angular 18.1+)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Angular]]
- Sous-sujets → [[ANG-04-Directives|Directives Angular]]
- À comparer avec → [[VUE-04-Directives-Templates|Directives & Templates Vue.js]]

**Pratique :**
- Extrait de code → [[04_Snippets/angular-data-binding]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> Pourrais-je expliquer la différence entre `[ ]` et `( )` sans utiliser le mot "binding" ?

> [!faq]- Questions d'entretien
> - Expliquez les 4 types de data binding.

---

## Tâches

- [ ] #task Créer une barre de recherche avec two-way binding
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Pourquoi `ngModel` nécessite `FormsModule` alors que les autres bindings n'ont besoin de rien ?
