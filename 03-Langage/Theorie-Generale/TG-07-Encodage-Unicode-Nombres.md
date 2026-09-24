---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M02
tags:
  - theorie/encodage
aliases:
  - "Encodage Unicode et Nombres"
parent: "[[Théorie Générale]]"
children: []
related_theory:
  - "[[JS-02-Types-Coercition-Egalite|Types et Coercition JavaScript]]"
related_snippets:
  - "[[04_Snippets/tg-07-encodage-unicode-nombres]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://developer.mozilla.org/fr/docs/Glossary/UTF-8"
---

# Encodage Unicode et Nombres

> [!abstract] Introduction
> Tout est octets pour la machine : l'encodage (UTF-8) dit comment représenter du texte, et la représentation binaire des nombres (flottants IEEE 754) explique pourquoi `0.1 + 0.2 !== 0.3`.

---

## Théorie

> [!question]- C'est quoi ?
> - **Binaire** : bits (0/1), octet = 8 bits, hexadécimal (`#FF0000`)
> - **ASCII** : 128 caractères anglais
> - **Unicode** : un numéro (code point) pour chaque caractère du monde (`é` = U+00E9, `😀` = U+1F600)
> - **UTF-8** : encodage de ces numéros en 1 à 4 octets — le standard du web
> - **Nombres flottants** : `number` JS = double précision 64 bits, précis jusqu'à 2^53 − 1

> [!example]- Analogie
> Unicode est l'annuaire mondial des caractères ; UTF-8 est la façon de les écrire sur l'enveloppe pour les envoyer.

> [!question]- Pourquoi l'utiliser ?
> Accents cassés (« Ã© »), emojis coupés, calculs de prix faux, identifiants trop grands (ids 64 bits d'une BDD qui perdent en précision en JS).

> [!question]- Comment ça marche ?
> - Toujours `<meta charset="utf-8">`, fichiers et BDD en UTF-8 (`utf8mb4` sur MySQL)
> - `"😀".length === 2` en JS (unités UTF-16) → `[..."😀"].length === 1`
> - Argent : entiers en centimes, ou type `DECIMAL` en BDD
> - Grands entiers : `BigInt` ou transmettre en chaîne

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Bit / octet | Unité binaire / groupe de 8 bits |
| Code point | Numéro Unicode d'un caractère |
| UTF-8 | Encodage variable 1-4 octets |
| IEEE 754 | Norme des nombres à virgule flottante |

---

## Points clés

- UTF-8 partout
- Pas de flottants pour l'argent
- `Number.MAX_SAFE_INTEGER` = 9 007 199 254 740 991
- Les ids BIGINT doivent voyager en chaîne en JSON

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Tronquer une chaîne au milieu d'un emoji
> - Trier des chaînes accentuées sans `localeCompare` / `Intl.Collator`

---

## Exemple minimal

```javascript
["éclair", "zèbre", "abricot"].sort((a, b) => a.localeCompare(b, "fr"));
new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(1234.5); // "1 234,50 €"
```

> [!note] Ce que j'en retiens
> `Intl` gère tri, nombres, dates et devises selon la langue — ne jamais formater à la main.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Connaître la normalisation Unicode (NFC/NFD) pour comparer des chaînes

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Théorie Générale]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/tg-07-encodage-unicode-nombres]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi stocker les prix en centimes ?

---

## Tâches

- [ ] #task Formater prix et dates de CinéTrack avec `Intl`
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
