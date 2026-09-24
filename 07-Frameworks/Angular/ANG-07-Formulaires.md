---
created: 2026-09-16
modified: 2026-09-16
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M04
aliases:
  - "Formulaires Angular"
tags:
  - frameworks/angular/formulaires
parent: "[[Angular]]"
children: []
related_theory: []
related_snippets:
  - "[[04_Snippets/angular-formulaire-reactif]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://angular.dev/guide/forms"
---

# Formulaires Angular

> [!abstract] Introduction
> Angular propose deux approches : template-driven (logique dans le HTML avec `ngModel`) et reactive forms (structure définie en TypeScript, plus puissante).

> [!warning]- Prérequis
> [[ANG-03-Templates-Data-Binding|Templates et Data Binding Angular]].

---

## Théorie

> [!question]- C'est quoi ?
> `FormControl` = un champ. `FormGroup` = plusieurs `FormControl` regroupés en un formulaire complet.

> [!example]- Analogie
> Un `FormGroup` est un dossier administratif, chaque `FormControl` est un champ du formulaire à l'intérieur (nom, email) — chacun a son propre état (rempli, valide) mais fait partie du même dossier global.

> [!question]- Pourquoi l'utiliser ?
> Les reactive forms permettent de tester facilement, ajouter de la validation complexe, et suivre précisément l'état de chaque champ.

> [!question]- Comment ça marche ?
> ```typescript
> formulaire = new FormGroup({
>   titre: new FormControl('', [Validators.required, Validators.minLength(3)])
> });
> ```
> ```html
> <form [formGroup]="formulaire" (ngSubmit)="soumettre()">
>   <input formControlName="titre">
> </form>
> ```

> [!question]- Quand l'utiliser ?
> Template-driven : formulaires très simples. Reactive : validation avancée, champs interdépendants, besoin de tests.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Les reactive forms ajoutent une couche de configuration TypeScript non nécessaire pour un formulaire trivial de 1-2 champs sans validation — le template-driven suffit alors largement.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| `FormControl` | Représente un seul champ de formulaire |
| `FormGroup` | Regroupe plusieurs `FormControl` |
| `Validator` | Règle vérifiant automatiquement la validité d'un champ |

---

## Points clés

- `FormControl` = un champ, `FormGroup` = un ensemble
- Reactive forms séparent totalement logique (TS) et affichage (HTML)
- États utiles : `.valid`, `.invalid`, `.dirty`, `.touched`
- `FormBuilder` raccourcit la création de `FormGroup`

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Afficher une erreur de validation avant même que l'utilisateur ait touché le champ (oublier `.touched`)
> - Oublier d'importer `ReactiveFormsModule`
> - Confondre `FormControl` et `FormGroup` dans le HTML (`formControlName` vs `formGroupName`)

---

## Paramètres / Configuration

| Validator | Description |
|-----------|-------------|
| `Validators.required` | Champ obligatoire |
| `Validators.minLength(n)` | Longueur minimale |
| `Validators.email` | Format email |
| `Validators.pattern(regex)` | Format custom |

---

## Exemple minimal

```typescript
formulaire = new FormGroup({
  titre: new FormControl('', [Validators.required, Validators.minLength(3)])
});
```

> [!note] Ce que j'en retiens
> Le bouton peut rester désactivé tant que `formulaire.invalid`, et l'erreur ne s'affiche que si le champ est `touched` ET `invalid`.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Formulaires typés (`FormGroup<{ titre: FormControl<string> }>`) et `NonNullableFormBuilder`
> - Validateurs personnalisés et asynchrones (vérifier qu'un email est libre), validateurs de groupe (confirmation de mot de passe)
> - Suivre les Signal Forms (API expérimentale récente) sans les utiliser en production tant qu'elles ne sont pas stables

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Angular]]
- Sous-sujets → (aucun)
- À comparer avec → [[VUE-14-Formulaires-Validation|Formulaires et Validation Vue.js]]

**Pratique :**
- Extrait de code → [[04_Snippets/angular-formulaire-reactif]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> Pourrais-je expliquer pourquoi vérifier `.touched` évite d'afficher une erreur trop tôt ?

> [!faq]- Questions d'entretien
> - Template-driven ou reactive forms : lequel choisir ?

---

## Tâches

- [ ] #task Créer un formulaire d'ajout de film avec reactive forms
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Comment valider deux champs dépendants l'un de l'autre (confirmation de mot de passe) ?
