---
created: 2026-09-14
modified: 2026-09-14
type: knowledge
status: "🔴 Not Started"
level: Avancé
month: M03
aliases:
  - "Decorators"
tags:
  - frontend/typescript/decorators
parent: "[[TypeScript]]"
children: []
related_theory:
  - "[[TS-05-Classes|Classes TypeScript]]"
  - "[[ANG-02-Composants|Composants Angular]]"
related_snippets:
  - "[[04_Snippets/ts-decorators]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://www.typescriptlang.org/docs/handbook/decorators.html"
---

# Decorators

> [!abstract] Introduction
> Un décorateur est une étiquette spéciale (précédée d'un `@`) qu'on colle sur une classe, une méthode ou une propriété pour lui ajouter automatiquement un comportement ou des métadonnées supplémentaires, sans modifier le code de la classe elle-même.

---

## Théorie

> [!question]- C'est quoi ?
> > [!note] Rappel — un décorateur, ça ressemble à quoi ?
> > Tu as déjà croisé des décorateurs partout en Angular : `@Component`, `@Injectable`, `@Input`, `@Output`. Ce sont tous des décorateurs !
>
> Un décorateur est en réalité une **fonction spéciale**, appelée automatiquement par TypeScript quand elle est "collée" avec un `@` au-dessus d'un élément de code.

> [!question]- Pourquoi l'utiliser ?
> Sans décorateurs, pour dire à Angular "cette classe est un composant avec tel template", il faudrait écrire manuellement beaucoup de code de configuration à chaque fois. Le décorateur `@Component({...})` fait ce travail en une seule ligne, de façon lisible et déclarative.

> [!question]- Comment ça marche ?
> **Décorateur de classe (le plus courant) :**
> ```typescript
> function Log(constructeur: Function) {
>   console.log(`Classe créée : ${constructeur.name}`);
> }
>
> @Log
> class Film {
>   constructor(public titre: string) {}
> }
>
> const f = new Film("Inception"); // affiche "Classe créée : Film"
> ```
> > [!note] Ce qui se passe concrètement
> > Quand TypeScript rencontre `@Log` au-dessus de `class Film`, il appelle automatiquement la fonction `Log` en lui passant la classe elle-même en paramètre — c'est pour ça que `Log` peut afficher son nom.
>
> **Décorateur avec paramètres (comme `@Component({...})`) :**
> ```typescript
> function MonDecorateur(config: { nom: string }) {
>   return function (constructeur: Function) {
>     console.log(`${constructeur.name} configuré avec le nom : ${config.nom}`);
>   };
> }
>
> @MonDecorateur({ nom: "film-service" })
> class FilmService {}
> ```
> > [!note] Pourquoi une fonction qui retourne une fonction ?
> > `@Component({ selector: 'app-film' })` a besoin de recevoir une configuration (l'objet entre parenthèses) AVANT de savoir sur quelle classe il s'applique. La fonction extérieure (`MonDecorateur`) reçoit la config, et retourne une DEUXIÈME fonction qui, elle, reçoit la classe. C'est ce qu'on appelle une "factory de décorateur" (fabrique de décorateur).
>
> **Décorateur de propriété (comme `@Input()`) :**
> ```typescript
> function Trace(cible: any, nomPropriete: string) {
>   console.log(`Propriété observée : ${nomPropriete}`);
> }
>
> class Composant {
>   @Trace
>   titre: string = "";
> }
> ```

> [!question]- Quand l'utiliser ?
> En pratique, en tant que développeur Angular, on **utilise** énormément les décorateurs fournis par Angular (`@Component`, `@Injectable`, `@Input`...), mais on en **crée** rarement soi-même — c'est plutôt réservé à la création de librairies ou d'outils réutilisables avancés.

---

## Points clés

- Un décorateur est une fonction appelée automatiquement par TypeScript au moment de la définition d'une classe/propriété/méthode
- `@Decorateur` (sans parenthèses) = décorateur simple
- `@Decorateur({...})` (avec parenthèses) = "factory" de décorateur, qui reçoit une configuration
- Angular repose ENTIÈREMENT sur les décorateurs pour transformer de simples classes TypeScript en composants, services, etc.
- Créer ses propres décorateurs reste rare pour un développeur Angular "utilisateur" du framework

---

## Paramètres / Configuration
> Bloc supprimé — sujet purement mécanique, pas de configuration standard (chaque décorateur définit ses propres options).

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Deux systèmes coexistent : les décorateurs « legacy » (`experimentalDecorators: true`, utilisés par Angular et NestJS) et les décorateurs standard ECMAScript (TS 5+, signatures différentes). Les exemples de cette note (décorateur de propriété `(cible, nom)`) suivent la version legacy
> - Écrire ses propres décorateurs pour de la logique métier : souvent moins lisible qu'une fonction
> - Oublier les parenthèses d'une factory (`@Input` au lieu de `@Input()`)

---

## Exemple minimal

```typescript
function Composant(config: { selecteur: string }) {
  return function (constructeur: Function) {
    (constructeur as any).selecteurHTML = config.selecteur;
  };
}

@Composant({ selecteur: "app-mon-composant" })
class MonComposant {}

console.log((MonComposant as any).selecteurHTML); // "app-mon-composant"
```

> [!note] Ce que j'en retiens
> C'est exactement ce genre de mécanisme qu'Angular utilise en interne avec `@Component({ selector: '...' })` — le décorateur attache des informations à la classe, qu'Angular utilise ensuite pour savoir comment l'afficher dans le HTML.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Comprendre `reflect-metadata` et les métadonnées de paramètres (`emitDecoratorMetadata`) qui permettent l'injection de dépendances de NestJS
> - Angular moderne remplace plusieurs décorateurs par des fonctions (`input()`, `output()`, `inject()`, `viewChild()`)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[TypeScript]]
- Sous-sujets → (aucun sous-thème identifié pour l'instant)
- À comparer avec → [[ANG-02-Composants|Composants Angular]], [[TS-05-Classes|Classes TypeScript]]

**Pratique :**
- Extrait de code → [[04_Snippets/ts-decorators]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Qu'est-ce qu'une factory de décorateur ?
> - Pourquoi NestJS a-t-il besoin de `emitDecoratorMetadata` ?

---

## Tâches

- [ ] #task Créer un décorateur de classe très simple (ex : qui log un message à la création) pour comprendre le mécanisme
- [ ] #task Relire le code source (ou la doc) d'`@Component` pour identifier concrètement ce mécanisme en action
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Les décorateurs TypeScript "stage 3" (nouvelle norme officielle JavaScript) changent-ils la façon dont Angular les utilise en interne ?
