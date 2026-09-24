---
created: 2026-09-14
modified: 2026-09-14
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M03
aliases:
  - "Generics"
tags:
  - frontend/typescript/generics
parent: "[[TypeScript]]"
children:
  - "[[TS-13-Types-Avances|Types avancés Mapped Conditional]]"
related_theory:
  - "[[TS-04-Fonctions|Fonctions Typées]]"
  - "[[TS-03-Interfaces-Types|Interfaces et Types]]"
related_snippets:
  - "[[04_Snippets/ts-generics]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://www.typescriptlang.org/docs/handbook/2/generics.html"
---

# Generics

> [!abstract] Introduction
> Les generics permettent d'écrire une fonction, une classe ou un type qui fonctionne avec N'IMPORTE QUEL type de donnée, tout en gardant le contrôle et la sécurité du typage.

---

## Théorie

> [!question]- C'est quoi ?
> > [!note] Le problème que ça résout
> > Imagine une fonction qui retourne le premier élément d'un tableau. Si elle est typée pour ne fonctionner qu'avec des `number[]`, elle est inutilisable pour un tableau de `Film[]`. Il faudrait dupliquer la fonction pour chaque type. Les generics évitent cette duplication.
>
> Un generic utilise une **lettre placeholder** (souvent `T`, comme "Type") qui représente "un type qui sera précisé plus tard, au moment de l'utilisation".
>
> ```typescript
> function premierElement<T>(tableau: T[]): T {
>   return tableau[0];
> }
>
> premierElement<number>([1, 2, 3]);        // T devient "number"
> premierElement<string>(["a", "b"]);       // T devient "string"
> premierElement([1, 2, 3]);                // TypeScript devine T tout seul (inférence)
> ```

> [!question]- Pourquoi l'utiliser ?
> Sans generics, on aurait deux choix imparfaits :
> - Dupliquer la fonction pour chaque type (`premierElementNumber`, `premierElementString`...)
> - Utiliser `any`, ce qui perd tout le contrôle de type (la fonction pourrait retourner n'importe quoi sans avertissement)
>
> Les generics gardent la **flexibilité** de `any` tout en gardant la **sécurité** du typage précis.

> [!question]- Comment ça marche ?
> **Generic sur une interface :**
> ```typescript
> interface Reponse<T> {
>   donnees: T;
>   succes: boolean;
> }
>
> const reponseFilms: Reponse<Film[]> = {
>   donnees: [{ titre: "Inception", annee: 2010 }],
>   succes: true
> };
> ```
> > [!note] Ce que ça permet
> > `Reponse<T>` peut représenter la réponse d'une API pour n'importe quel type de donnée (films, utilisateurs, commentaires...) sans dupliquer l'interface pour chaque cas.
>
> **Contraintes sur un generic (`extends`) :**
> ```typescript
> interface AvecId {
>   id: number;
> }
>
> function trouverParId<T extends AvecId>(liste: T[], id: number): T | undefined {
>   return liste.find(element => element.id === id);
> }
> ```
> > [!note] Ce que fait `T extends AvecId`
> > Ça limite `T` à des types qui possèdent AU MOINS une propriété `id: number` — sans cette contrainte, TypeScript ne saurait pas que `element.id` existe forcément.

> [!question]- Quand l'utiliser ?
> - Fonctions utilitaires réutilisables avec plusieurs types de données (tri, filtre, recherche...)
> - Structures de réponse d'API génériques (`Reponse<T>`)
> - Composants ou services réutilisables qui manipulent différents types d'objets

---

## Points clés

- `<T>` est un paramètre de type, comme un paramètre normal mais pour un TYPE plutôt qu'une valeur
- Le nom `T` est une convention (pas obligatoire), d'autres lettres comme `K`, `V` sont utilisées pour des cas précis (clé/valeur)
- `extends` sur un generic ajoute une contrainte : "ce type doit au moins avoir telle forme"
- TypeScript peut souvent deviner le type generic automatiquement (inférence), sans l'écrire explicitement

---

## Paramètres / Configuration

| Syntaxe | Description | Notes |
|-----------|-------------|-------|
| `<T>` | Paramètre de type générique | `T` = convention, pas obligatoire |
| `<T extends X>` | Contrainte : `T` doit respecter la forme `X` | — |
| `<T, U>` | Plusieurs paramètres de type | Utile pour des fonctions à deux types différents |

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Générique inutile (`<T>` utilisé une seule fois) → un type concret suffit
> - Oublier la contrainte `extends` puis accéder à une propriété que `T` n'a pas forcément
> - Forcer le type (`get<any>()`) au lieu de typer `http.get<Film[]>()`

---

## Exemple minimal

```typescript
interface Entite {
  id: number;
}

class Depot<T extends Entite> {
  private elements: T[] = [];

  ajouter(element: T): void {
    this.elements.push(element);
  }

  trouverParId(id: number): T | undefined {
    return this.elements.find(e => e.id === id);
  }
}

interface Film extends Entite {
  titre: string;
}

const depotFilms = new Depot<Film>();
depotFilms.ajouter({ id: 1, titre: "Inception" });
console.log(depotFilms.trouverParId(1)); // { id: 1, titre: "Inception" }
```

> [!note] Ce que j'en retiens
> `Depot<T>` peut gérer n'importe quel type d'entité (films, utilisateurs, commentaires) tant qu'il a un `id` — une seule classe generic remplace ce qui aurait nécessité une classe dupliquée par type de donnée.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Valeurs par défaut de génériques (`<T = unknown>`) et contraintes avec `keyof` (`<T, K extends keyof T>`)
> - Écrire des services/stores génériques réutilisables (CRUD générique typé)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[TypeScript]]
- Sous-sujets → [[TS-13-Types-Avances|Types avancés Mapped Conditional]]
- À comparer avec → [[TS-03-Interfaces-Types|Interfaces et Types]]

**Pratique :**
- Extrait de code → [[04_Snippets/ts-generics]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Que fait `T extends AvecId` ?
> - Pourquoi un générique vaut-il mieux que `any` ?

> [!faq]- Questions d'entretien
> - Donnez un exemple réel d'utilisation des génériques en Angular.

---

## Tâches

- [ ] #task Créer une interface `Reponse<T>` générique pour toutes les réponses d'API de CinéTrack
- [ ] #task Créer une classe `Depot<T>` réutilisable pour gérer films et favoris avec la même logique
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Comment les generics d'Angular (ex : `Observable<T>`, `HttpClient.get<T>()`) s'articulent-ils avec ce que j'apprends ici ?
