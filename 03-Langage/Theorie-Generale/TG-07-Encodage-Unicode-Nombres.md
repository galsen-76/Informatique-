---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M02
tags:
  - theorie/encodage
aliases:
  - "Encodage Unicode et Nombres"
parent: "[[Théorie Générale]]"
related_theory:
  - "[[JS-02-Types-Coercition-Egalite|Types et Coercition JavaScript]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://developer.mozilla.org/fr/docs/Glossary/UTF-8"
---

# Encodage Unicode et Nombres

> [!abstract] En bref
> Pour l'ordinateur, tout est une suite de 0 et de 1. L'**encodage** (UTF-8) dit comment transformer du texte en 0 et 1 : quand il est mal réglé, les accents deviennent « Ã© ». La façon dont les **nombres à virgule** sont stockés explique pourquoi `0.1 + 0.2` ne fait pas `0.3`. Deux sources de bugs très concrètes, faciles à éviter une fois comprises.

## Le texte : Unicode et UTF-8

- **Unicode** donne un **numéro** à chaque caractère du monde : `A` = 65, `é` = 233, `😀` = 128512.
- **UTF-8** est la façon d'**écrire** ces numéros en octets (1 à 4 octets par caractère). C'est le standard du web.

Unicode est l'annuaire, UTF-8 la façon d'écrire l'adresse sur l'enveloppe.

**Règle** : UTF-8 **partout**.
```html
<meta charset="utf-8" />
```
Fichiers, base de données, API : tout en UTF-8. Un « Ã© » à l'écran = un maillon de la chaîne n'est pas en UTF-8.

## Les pièges du texte en JavaScript

```ts
'😀'.length;          // 2 ! JavaScript compte en demi-caractères pour les emojis
[...'😀'].length;     // 1 ✅

'Émilie' < 'Zoé';     // false ! comparaison par numéro : É (201) est après Z (90)
['Zoé', 'Émilie', 'alice'].sort((a, b) => a.localeCompare(b, 'fr'));   // ✅ ordre français
```

Couper un texte à 100 caractères peut **casser un emoji** en deux : préfère `[...text].slice(0, 100).join('')`.

## Les nombres à virgule

```ts
0.1 + 0.2;            // 0.30000000000000004
0.1 + 0.2 === 0.3;    // false
```

L'ordinateur stocke les nombres en binaire, et 0,1 ne s'écrit pas exactement en binaire, comme 1/3 ne s'écrit pas exactement en décimal (0,333…).

**Pour l'argent**, jamais de nombre à virgule :
- compter en **centimes** entiers : `1999` au lieu de `19.99` ;
- en base de données : le type `DECIMAL` / `NUMERIC` (voir [[SQL-07-DDL-Contraintes-Types|Types SQL]]).

## Les très grands entiers

Un `number` JavaScript est exact jusqu'à **9 007 199 254 740 991** (`Number.MAX_SAFE_INTEGER`). Au-delà, il arrondit.

Une colonne `BIGINT` en base peut dépasser cette limite : fais voyager ces identifiants en **texte** dans le JSON, ou utilise `BigInt`.

## Afficher proprement : `Intl`

Ne formate **jamais** nombres, prix et dates à la main :

```ts
new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(1234.5);
// "1 234,50 €"

new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long' }).format(new Date('2026-09-26'));
// "26 septembre 2026"
```

Angular (`| currency`, `| date`) et Vue (via `Intl`) s'appuient dessus.

## Pièges

- **Un fichier ou une base qui n'est pas en UTF-8** : accents cassés.
- **Des prix en nombres à virgule** : des centimes perdus ou en trop.
- **Trier des mots accentués** sans `localeCompare`.
- **Couper un texte** au milieu d'un emoji.
