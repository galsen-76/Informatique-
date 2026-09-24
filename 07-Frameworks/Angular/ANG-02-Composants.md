---
created: 2026-09-16
modified: 2026-09-16
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M04
aliases:
  - "Composants Angular"
tags:
  - frameworks/angular/composants
parent: "[[Angular]]"
children:
  - "[[ANG-18-Cycle-de-Vie|Cycle de vie des composants Angular]]"
  - "[[ANG-19-Communication-Composants|Communication parent-enfant Angular]]"
related_theory: []
related_snippets:
  - "[[04_Snippets/angular-composant-basique]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://angular.dev/guide/components"
---

# Composants Angular

> [!abstract] Introduction
> Un composant regroupe le HTML, la logique et le style d'une partie de l'écran, en un bloc autonome et réutilisable.

> [!warning]- Prérequis
> [[ANG-01-Fondamentaux|Fondamentaux Angular]], [[PY-05-POO-Classes|principe général des classes]] (un composant est une classe TypeScript).

---

## Théorie

> [!question]- C'est quoi ?
> ```typescript
> @Component({
>   selector: 'app-film-card',
>   standalone: true,
>   templateUrl: './film-card.component.html'
> })
> export class FilmCardComponent {
>   titre = 'Inception';
> }
> ```

> [!example]- Analogie
> Une page web est une maison en Lego. Chaque composant (header, bouton, carte de film) est une brique : sa forme (HTML), sa couleur (CSS), son comportement (que se passe-t-il au clic).

> [!question]- Pourquoi l'utiliser ?
> Réutiliser un même bloc à plusieurs endroits, travailler à plusieurs sans se marcher dessus, tester chaque bloc séparément.

> [!question]- Comment ça marche ?
> Le `selector` est une balise HTML custom (`<app-film-card>`) insérée dans un autre template. `@Component` est un décorateur : une étiquette disant à Angular "cette classe est un composant".

> [!question]- Quand l'utiliser ?
> Chaque fois qu'un morceau d'interface a une responsabilité claire et pourrait être réutilisé.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Découper à l'extrême (un composant par bouton isolé sans logique propre) ajoute de la complexité de navigation sans bénéfice réel.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Selector | Nom de la balise HTML custom du composant |
| Standalone | Composant autonome, sans besoin d'un NgModule |
| Décorateur | Étiquette (`@Component`) donnant des métadonnées à une classe |

---

## Points clés

- Composant = classe TypeScript + template HTML + (souvent) CSS
- `selector` = nom de balise custom, préfixe `app-` par convention
- Composants imbriqués = arbre de composants
- Standalone recommandé depuis Angular 17+

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Oublier d'ajouter dans `imports` les composants, directives et pipes utilisés dans le template (standalone est le défaut depuis Angular 19 ; avant, il fallait écrire `standalone: true`)
> - Mettre de la logique métier dans le composant au lieu de la déléguer à un service (voir [[ARCH-03-Architecture-en-Couches|Architecture en Couches]])

---

## Paramètres / Configuration

| Propriété | Description | Notes |
|-----------|-------------|-------|
| `selector` | Balise HTML custom | Préfixe `app-` |
| `templateUrl` | Fichier HTML | Ou `template` inline |
| `styleUrl` | Fichier CSS | — |
| `standalone` | Sans module | `true` par défaut depuis Angular 19 (explicite en 17-18) |

---

## Exemple minimal

```typescript
@Component({
  selector: 'app-film-card',
  standalone: true,
  template: `<h2>{{ titre }}</h2>`
})
export class FilmCardComponent {
  titre = 'Inception';
}
```

> [!note] Ce que j'en retiens
> `{{ titre }}` relie la variable de la classe à l'affichage — le lien entre logique et rendu.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Préférer `ChangeDetectionStrategy.OnPush` sur tous les composants de présentation
> - Utiliser `host: { ... }` plutôt que `@HostBinding`/`@HostListener` sur du code récent

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Angular]]
- Sous-sujets → [[ANG-18-Cycle-de-Vie|Cycle de vie des composants Angular]], [[ANG-19-Communication-Composants|Communication parent-enfant Angular]]
- À comparer avec → [[VUE-03-Composants-SFC|Composants & SFC Vue.js]]

**Pratique :**
- Extrait de code → [[04_Snippets/angular-composant-basique]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> Pourrais-je expliquer pourquoi Angular sépare HTML/CSS/TS en 3 fichiers, plutôt que tout regrouper comme en JSX ?

> [!faq]- Questions d'entretien
> - Comment découpez-vous une page en composants ?

---

## Tâches

- [ ] #task Créer un composant "carte de film" pour CinéTrack
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Peut-on avoir deux composants avec le même selector dans un projet ?
