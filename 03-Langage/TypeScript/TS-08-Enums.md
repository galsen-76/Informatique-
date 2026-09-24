---
created: 2026-09-14
modified: 2026-09-14
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M03
aliases:
  - "Enums"
tags:
  - frontend/typescript/enums
parent: "[[TypeScript]]"
children: []
related_theory:
  - "[[TS-02-Types-Primitifs-Litteraux|Types Primitifs et Littéraux]]"
related_snippets:
  - "[[04_Snippets/ts-enums]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://www.typescriptlang.org/docs/handbook/enums.html"
---

# Enums

> [!abstract] Introduction
> Un `enum` (énumération) donne des noms lisibles à un ensemble fixe de valeurs possibles, pour éviter d'utiliser des textes ou nombres "en dur" un peu partout dans le code.

---

## Théorie

> [!question]- C'est quoi ?
> > [!note] C'est quoi une "énumération" ?
> > Une énumération, c'est une liste FIXE et nommée de valeurs possibles — comme les jours de la semaine, ou les statuts d'une commande. Le mot "enum" vient de "enumeration" (énumérer = lister).
>
> ```typescript
> enum StatutFilm {
>   AVoir,
>   Vu,
>   Abandonne
> }
>
> let statut: StatutFilm = StatutFilm.Vu;
> ```

> [!question]- Pourquoi l'utiliser ?
> Sans enum, on utiliserait probablement des textes bruts (`"vu"`, `"a-voir"`) répétés partout dans le code, avec un risque de fautes de frappe non détectées. Un enum centralise ces valeurs en un seul endroit, avec autocomplétion dans l'éditeur.

> [!question]- Comment ça marche ?
> **Enum numérique (par défaut) :**
> ```typescript
> enum StatutFilm {
>   AVoir,     // vaut 0
>   Vu,        // vaut 1
>   Abandonne  // vaut 2
> }
> ```
> > [!note] Valeurs numériques automatiques
> > Par défaut, TypeScript attribue automatiquement 0, 1, 2... à chaque membre, dans l'ordre où ils sont écrits.
>
> **Enum textuel (souvent préférable) :**
> ```typescript
> enum StatutFilm {
>   AVoir = "A_VOIR",
>   Vu = "VU",
>   Abandonne = "ABANDONNE"
> }
> ```
> > [!note] Pourquoi préférer le textuel ?
> > Un enum numérique peut être confus lors du débogage (on voit juste `1` sans savoir à quoi ça correspond). Un enum textuel affiche directement une valeur lisible (`"VU"`), plus facile à comprendre dans les logs ou en base de données.
>
> **Utilisation :**
> ```typescript
> function changerStatut(nouveauStatut: StatutFilm) {
>   console.log("Nouveau statut:", nouveauStatut);
> }
>
> changerStatut(StatutFilm.Vu); // affiche "VU"
> ```

> [!question]- Quand l'utiliser ?
> - Enum : quand on a une liste fixe de valeurs ET qu'on veut regrouper des constantes nommées avec une vraie structure
> - Type littéral (`"a" | "b"`, voir [[TS-02-Types-Primitifs-Litteraux|Types Primitifs et Littéraux]]) : souvent préféré aujourd'hui pour la même chose, plus léger et sans code JavaScript généré en plus

---

## Points clés

- Un enum numérique attribue automatiquement 0, 1, 2... sauf si on précise une valeur de départ différente
- Un enum textuel (`= "TEXTE"`) est généralement plus lisible et plus sûr à déboguer
- Contrairement aux types littéraux, un enum génère du VRAI code JavaScript à l'exécution (pas juste une vérification au moment de la compilation)
- Beaucoup d'équipes préfèrent aujourd'hui les types littéraux aux enums, pour leur simplicité — mais les enums restent très présents dans du code existant

---

## Paramètres / Configuration

| Type d'enum | Description | Notes |
|-----------|-------------|-------|
| `enum X { A, B, C }` | Enum numérique | Valeurs 0, 1, 2 par défaut |
| `enum X { A = "a" }` | Enum textuel | Plus lisible en débogage |
| `const enum X {...}` | Enum "constant" | Optimisé, ne génère aucun code JS supplémentaire |

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Enum numérique : `StatutFilm[1]` renvoie le nom (mapping inverse) → comportements surprenants
> - `const enum` incompatible avec certains outils de build (isolatedModules, esbuild)
> - Comparer une chaîne venant de l'API à un enum sans validation

---

## Exemple minimal

```typescript
enum StatutFilm {
  AVoir = "A_VOIR",
  Vu = "VU",
  Abandonne = "ABANDONNE"
}

interface Film {
  titre: string;
  statut: StatutFilm;
}

const film: Film = { titre: "Inception", statut: StatutFilm.Vu };

if (film.statut === StatutFilm.Vu) {
  console.log(`${film.titre} a déjà été vu`);
}
```

> [!note] Ce que j'en retiens
> `StatutFilm.Vu` est plus lisible et plus sûr que d'écrire `"VU"` directement partout dans le code — si le texte change un jour, il suffit de le modifier à UN seul endroit (la définition de l'enum).

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Alternative moderne : objet `as const` + type dérivé (`type Statut = typeof STATUTS[keyof typeof STATUTS]`)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[TypeScript]]
- Sous-sujets → (aucun sous-thème identifié pour l'instant)
- À comparer avec → [[TS-02-Types-Primitifs-Litteraux|Types Primitifs et Littéraux]]

**Pratique :**
- Extrait de code → [[04_Snippets/ts-enums]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi beaucoup d'équipes préfèrent-elles les types littéraux aux enums ?

> [!faq]- Questions d'entretien
> - Enum ou union de littéraux : que choisissez-vous ?

---

## Tâches

- [ ] #task Remplacer les statuts textuels "en dur" de CinéTrack par un enum `StatutFilm`
- [ ] #task Comparer concrètement enum vs type littéral sur ce même cas d'usage
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Pourquoi certaines guidelines d'équipe déconseillent complètement les enums au profit des types littéraux — quel est le vrai inconvénient concret ?
