---
created: 2026-09-14
modified: 2026-09-14
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M03
aliases:
  - "Interfaces & Types (Type Aliases)"
tags:
  - frontend/typescript/interfaces-types
parent: "[[TypeScript]]"
children:
  - "[[TS-10-Utility-Types|Utility Types]]"
related_theory:
  - "[[TS-02-Types-Primitifs-Litteraux|Types Primitifs et Littéraux]]"
related_snippets:
  - "[[04_Snippets/ts-interfaces]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://www.typescriptlang.org/docs/handbook/2/objects.html"
---

# Interfaces & Types (Type Aliases)

> [!abstract] Introduction
> Une interface (ou un type alias) décrit la "forme" attendue d'un objet — quelles propriétés il doit avoir, et de quel type chacune doit être.

---

## Théorie

> [!question]- C'est quoi ?
> > [!note] C'est quoi la "forme" d'un objet ?
> > La forme d'un objet, c'est la liste de ses propriétés et leurs types — comme un moule qui définit ce qu'un objet DOIT contenir pour être valide.
>
> Deux façons de décrire cette forme :
>
> **Interface :**
> ```typescript
> interface Film {
>   titre: string;
>   annee: number;
>   estFavori: boolean;
> }
> ```
>
> **Type alias :**
> ```typescript
> type Film = {
>   titre: string;
>   annee: number;
>   estFavori: boolean;
> };
> ```
>
> Dans la majorité des cas, les deux font la même chose et sont interchangeables.

> [!question]- Pourquoi l'utiliser ?
> Sans interface, un objet pourrait avoir n'importe quelle forme, avec des fautes de frappe dans les noms de propriétés qui ne seraient détectées qu'à l'exécution (`film.titre` vs `film.tittre`). Avec une interface, TypeScript vérifie IMMÉDIATEMENT que chaque objet respecte bien la forme attendue.

> [!question]- Comment ça marche ?
> ```typescript
> interface Film {
>   titre: string;
>   annee: number;
>   realisateur?: string; // le ? rend cette propriété optionnelle
> }
>
> const monFilm: Film = {
>   titre: "Inception",
>   annee: 2010
>   // realisateur omis, c'est autorisé car optionnel
> };
>
> const filmInvalide: Film = {
>   titre: "Interstellar"
>   // ❌ Erreur : "annee" est obligatoire et manquant
> };
> ```
>
> > [!note] Pourquoi le `?` après `realisateur` ?
> > Le point d'interrogation rend une propriété **optionnelle** : l'objet est valide avec OU sans cette propriété. Sans le `?`, la propriété est obligatoire.
>
> **Différence principale interface vs type :**
> - Une `interface` peut être "étendue" (héritage) avec `extends`, et peut être redéclarée plusieurs fois pour s'enrichir (fusion de déclarations)
> - Un `type` peut représenter des choses qu'une interface ne peut pas (unions, types primitifs renommés...) mais ne peut pas être redéclaré
>
> ```typescript
> interface FilmDetaille extends Film {
>   synopsis: string;
> }
> ```

> [!question]- Quand l'utiliser ?
> - `interface` : convention courante pour décrire la forme d'un objet, surtout si on prévoit de l'étendre plus tard
> - `type` : nécessaire pour des unions (`"a" | "b"`), des types plus complexes, ou renommer un type existant

---

## Points clés

- Interface et type alias décrivent tous les deux la "forme" d'un objet
- Le `?` rend une propriété optionnelle
- `readonly` empêche de modifier une propriété après sa création
- `extends` permet à une interface d'hériter des propriétés d'une autre
- Un objet qui ne respecte pas EXACTEMENT (ou partiellement, si optionnel) la forme attendue génère une erreur TypeScript

---

## Paramètres / Configuration

| Syntaxe | Description | Notes |
|-----------|-------------|-------|
| `propriete: type` | Propriété obligatoire | — |
| `propriete?: type` | Propriété optionnelle | — |
| `readonly propriete: type` | Propriété non modifiable après création | — |
| `interface A extends B` | Héritage entre interfaces | `A` a toutes les propriétés de `B` + les siennes |

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Déclarer deux fois la même `interface` par erreur → fusion de déclarations silencieuse
> - Utiliser `readonly` en pensant rendre l'objet profondément immuable (seulement le premier niveau)
> - Préfixer les interfaces par `I` (`IFilm`) : convention C#/Java, déconseillée dans l'écosystème TS/Angular

---

## Exemple minimal

```typescript
interface Film {
  readonly id: number;
  titre: string;
  annee: number;
  realisateur?: string;
}

function afficherFilm(film: Film) {
  console.log(`${film.titre} (${film.annee})`);
}

const film: Film = { id: 1, titre: "Inception", annee: 2010 };
afficherFilm(film); // ✅ valide, realisateur est optionnel

film.id = 2; // ❌ Erreur : id est en readonly, non modifiable
```

> [!note] Ce que j'en retiens
> `readonly` protège `id` d'une modification accidentelle après la création de l'objet — utile pour des identifiants qui ne doivent jamais changer une fois définis.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Convention pragmatique : `interface` pour les formes d'objets publiques/extensibles, `type` pour unions, utilitaires et alias
> - Vérification d'excès de propriétés : comprendre pourquoi un objet littéral avec une propriété en trop est refusé

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[TypeScript]]
- Sous-sujets → [[TS-10-Utility-Types|Utility Types]]
- À comparer avec → [[TS-05-Classes|Classes TypeScript]]

**Pratique :**
- Extrait de code → [[04_Snippets/ts-interfaces]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Quand un `type` est-il obligatoire plutôt qu'une `interface` ?

> [!faq]- Questions d'entretien
> - Différence entre `interface` et `type` ?

---

## Tâches

- [ ] #task Créer une interface `Film` complète pour CinéTrack avec propriétés optionnelles et readonly
- [ ] #task Tester l'héritage d'interface avec `extends` sur un cas concret
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Dans un vrai projet d'équipe, existe-t-il une convention tranchée entre `interface` et `type`, ou est-ce vraiment interchangeable ?
