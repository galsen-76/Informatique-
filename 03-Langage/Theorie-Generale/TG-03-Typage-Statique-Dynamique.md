---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - theorie/typage
aliases:
  - "Typage Statique et Dynamique"
parent: "[[Théorie Générale]]"
children: []
related_theory:
  - "[[TS-01-Fondamentaux|Fondamentaux TypeScript]]"
  - "[[PY-16-Typage-Type-Hints|Typage et Type Hints Python]]"
related_snippets:
  - "[[04_Snippets/tg-03-typage-statique-dynamique]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://fr.wikipedia.org/wiki/Typage_(informatique)"
---

# Typage Statique et Dynamique

> [!abstract] Introduction
> Un langage est typé statiquement (types vérifiés avant exécution) ou dynamiquement (à l'exécution), et fortement ou faiblement (conversions implicites ou non) — deux axes indépendants.

---

## Théorie

> [!question]- C'est quoi ?
> | | Fort | Faible |
> |---|---|---|
> | **Statique** | Java, C#, Rust, TypeScript (≈) | C |
> | **Dynamique** | Python, Ruby | JavaScript, PHP |
> TypeScript ajoute un typage statique **structurel** (compatibilité par forme) à JavaScript.

> [!example]- Analogie
> Statique : on vérifie les bagages à l'enregistrement. Dynamique : on découvre le problème en ouvrant la valise à destination.

> [!question]- Pourquoi l'utiliser ?
> Comprendre ce que TS apporte, pourquoi Java et TS ne se comportent pas pareil (nominal vs structurel), et choisir un backend.

> [!question]- Comment ça marche ?
> - **Nominal** (Java, C#) : deux classes identiques mais de noms différents sont incompatibles
> - **Structurel** (TypeScript, Go) : si la forme correspond, c'est compatible (« duck typing » vérifié)
> - **Inférence** : le compilateur devine le type

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Statique | Types vérifiés avant exécution |
| Dynamique | Types vérifiés à l'exécution |
| Structurel | Compatibilité selon la forme |
| Nominal | Compatibilité selon le nom déclaré |
| Inférence | Déduction automatique du type |

---

## Points clés

- Statique/dynamique et fort/faible sont deux axes différents
- TypeScript est structurel : un objet littéral peut satisfaire une interface sans `implements`
- Les types statiques sont une documentation vérifiée

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Croire qu'un objet « est » une instance de l'interface (les interfaces n'existent pas au runtime, `instanceof Interface` impossible)

---

## Exemple minimal

```typescript
interface AvecTitre { titre: string }
class Livre { constructor(public titre: string, public auteur: string) {} }
const x: AvecTitre = new Livre("Dune", "Herbert");  // ✅ structurel : la forme suffit
```

> [!note] Ce que j'en retiens
> En TS, c'est la forme qui compte, pas le nom de la classe.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Savoir argumenter les compromis statique/dynamique pour un choix de stack

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Théorie Générale]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/tg-03-typage-statique-dynamique]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi `instanceof MonInterface` est-il impossible en TS ?

> [!faq]- Questions d'entretien
> - TypeScript est-il nominal ou structurel ?

---

## Tâches

- [ ] #task Comparer le même code en Python annoté, TypeScript et Java
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
