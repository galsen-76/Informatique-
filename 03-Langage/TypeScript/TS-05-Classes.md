---
created: 2026-09-14
modified: 2026-09-14
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M03
aliases:
  - "Classes TypeScript"
tags:
  - frontend/typescript/classes
parent: "[[TypeScript]]"
children:
  - "[[TS-14-Decorators|Decorators]]"
related_theory:
  - "[[TS-03-Interfaces-Types|Interfaces et Types]]"
related_snippets:
  - "[[04_Snippets/ts-classes]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://www.typescriptlang.org/docs/handbook/2/classes.html"
---

# Classes TypeScript

> [!abstract] Introduction
> Une classe est un modèle qui décrit à la fois les données (propriétés) et les actions (méthodes) d'un objet, avec en plus, en TypeScript, un contrôle strict des types et de la visibilité de chaque élément.

---

## Théorie

> [!question]- C'est quoi ?
> > [!note] Rappel : c'est quoi une classe ?
> > Une classe est un plan de construction pour créer des objets qui partagent la même structure et le même comportement. Un objet créé à partir d'une classe s'appelle une **instance**.
>
> TypeScript enrichit les classes JavaScript avec :
> - Le typage des propriétés et méthodes
> - Des modificateurs de visibilité (`public`, `private`, `protected`)
> - Des propriétés en lecture seule (`readonly`)

> [!question]- Pourquoi l'utiliser ?
> En JavaScript classique, toutes les propriétés d'une classe sont accessibles de partout, sans restriction — ce qui peut mener à des modifications accidentelles depuis n'importe où dans le code. TypeScript permet de **protéger** certaines données pour qu'elles ne soient modifiables QUE depuis l'intérieur de la classe.

> [!question]- Comment ça marche ?
> ```typescript
> class Film {
>   public titre: string;
>   private noteInterne: number;
>   readonly id: number;
>
>   constructor(id: number, titre: string, noteInterne: number) {
>     this.id = id;
>     this.titre = titre;
>     this.noteInterne = noteInterne;
>   }
>
>   afficherNote(): string {
>     return `Note : ${this.noteInterne}/10`;
>   }
> }
>
> const film = new Film(1, "Inception", 9);
> console.log(film.titre);         // ✅ accessible (public)
> console.log(film.noteInterne);   // ❌ Erreur : private, inaccessible de l'extérieur
> console.log(film.afficherNote()); // ✅ accessible, méthode publique
> ```
>
> > [!note] Les 3 niveaux de visibilité
> > - `public` (par défaut si rien n'est précisé) : accessible partout, y compris depuis l'extérieur de la classe
> > - `private` : accessible UNIQUEMENT depuis l'intérieur de cette classe précise
> > - `protected` : accessible depuis cette classe ET ses classes "enfants" (héritage), mais pas depuis l'extérieur
>
> **Raccourci pour le constructeur :**
> ```typescript
> class Film {
>   constructor(
>     public titre: string,
>     private noteInterne: number
>   ) {}
> }
> ```
> > [!note] Ce raccourci
> > Écrire `public` ou `private` directement devant un paramètre du constructeur crée automatiquement la propriété ET l'assigne — évite de répéter `this.titre = titre` manuellement.
>
> **Héritage :**
> ```typescript
> class FilmAnime extends Film {
>   studio: string;
>
>   constructor(titre: string, noteInterne: number, studio: string) {
>     super(titre, noteInterne); // appelle le constructeur du parent
>     this.studio = studio;
>   }
> }
> ```

> [!question]- Quand l'utiliser ?
> - Classes : quand on a besoin de regrouper données et comportements liés, avec un contrôle de visibilité (souvent en dehors d'Angular pur, où les composants et services SONT déjà des classes)
> - `private` : dès qu'une donnée ne doit jamais être modifiée de l'extérieur (protection des données internes)

---

## Points clés

- `public` (défaut), `private`, `protected` contrôlent qui peut accéder à une propriété ou méthode
- Le raccourci `constructor(public x: type)` crée et assigne la propriété automatiquement
- `extends` permet l'héritage entre classes, `super()` appelle le constructeur parent
- `readonly` empêche la modification d'une propriété après sa création dans le constructeur

---

## Paramètres / Configuration

| Modificateur | Description | Notes |
|-----------|-------------|-------|
| `public` | Accessible de partout | Par défaut si rien n'est précisé |
| `private` | Accessible uniquement dans la classe | — |
| `protected` | Accessible dans la classe et ses classes enfants | — |
| `readonly` | Non modifiable après l'assignation initiale | — |
| `extends` | Hérite d'une autre classe | — |

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Confondre `private` TypeScript (vérifié seulement à la compilation) et `#champ` JavaScript (privé réel à l'exécution)
> - Hiérarchies d'héritage profondes → préférer la composition
> - Oublier `super()` avant d'utiliser `this` dans un constructeur enfant

---

## Exemple minimal

```typescript
class Film {
  constructor(
    public readonly id: number,
    public titre: string,
    private noteInterne: number
  ) {}

  obtenirNote(): number {
    return this.noteInterne;
  }
}

class FilmFavori extends Film {
  dateAjout: Date;

  constructor(id: number, titre: string, noteInterne: number) {
    super(id, titre, noteInterne);
    this.dateAjout = new Date();
  }
}

const favori = new FilmFavori(1, "Inception", 9);
console.log(favori.titre);          // ✅ accessible
console.log(favori.obtenirNote());  // ✅ accès contrôlé via une méthode publique
```

> [!note] Ce que j'en retiens
> `noteInterne` reste protégée (`private`), mais on peut quand même la consulter de l'extérieur via la méthode publique `obtenirNote()` — c'est le principe d'encapsulation : cacher les détails internes, exposer seulement ce qui est nécessaire.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Classes abstraites comme contrats injectables (NestJS, Angular DI)
> - `implements` pour garantir qu'une classe respecte une interface

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[TypeScript]]
- Sous-sujets → [[TS-14-Decorators|Decorators]]
- À comparer avec → [[TS-03-Interfaces-Types|Interfaces et Types]], [[ANG-02-Composants|Composants Angular]]

**Pratique :**
- Extrait de code → [[04_Snippets/ts-classes]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Différence entre `private` et `protected` ?
> - Que fait le raccourci `constructor(private x: T)` ?

> [!faq]- Questions d'entretien
> - Composition ou héritage : que préférez-vous et pourquoi ?

---

## Tâches

- [ ] #task Identifier où les classes Angular (composants, services) utilisent déjà ces concepts sans que ce soit visible au premier abord
- [ ] #task Créer une petite hiérarchie de classes avec héritage sur un exemple personnel
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Angular utilise-t-il `private`/`protected` en interne de façon différente de ce qu'on ferait dans du TypeScript "pur" ?
