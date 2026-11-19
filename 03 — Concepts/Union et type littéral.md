---
type: concept
domain: typescript
module: "[[Module 06 - TypeScript]]"
status: a-decouvrir
level: intermediaire
prerequisites:
  - "[[Type et interface TypeScript]]"
parents:
  - "[[Type et interface TypeScript]]"
related:
  - "[[Condition (if)]]"
next_review: 
method: []
tags:
  - concept
  - typescript
---
# Union et type littéral

> [!info] En une phrase
> Une union dit qu'une valeur peut être d'un type OU d'un autre (string | number) ; un type littéral limite à des valeurs précises ("ok" | "erreur"), et TypeScript affine le type après un test.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
```ts
type Statut = "a-faire" | "en-cours" | "fini";   // seulement ces trois chaînes
let s: Statut = "fini";
s = "termine";   // ❌

function afficher(id: number | string) {
  if (typeof id === "number") {
    return id.toFixed(0);      // ici id est number
  }
  return id.toUpperCase();     // ici id est string
}
```
Cet affinage s'appelle le **rétrécissement** (*narrowing*) : `typeof`, `===`, `in`, `Array.isArray`, ou le test de `null`.
**Union discriminée** : chaque cas a un champ commun qui le distingue.
```ts
type Resultat =
  | { ok: true; donnees: string[] }
  | { ok: false; erreur: string };
```

### Pourquoi ça existe
Une valeur réelle a souvent plusieurs formes possibles (chargement, succès, erreur ; nombre ou texte).

### Le problème résolu
Obliger le code à traiter chaque cas, et empêcher les fautes de frappe sur des valeurs fixes.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
U[number ou string] --> T{typeof ?}
  T -->|number| N[number]
  T -->|string| S[string]
```

### Exemple concret
```ts
function message(r: Resultat): string {
  if (r.ok) return `${r.donnees.length} éléments`;   // r.donnees existe ici
  return `Erreur : ${r.erreur}`;                       // r.erreur existe ici
}
const nom: string | null = document.querySelector("input")?.value ?? null;
if (nom !== null) console.log(nom.length);
```

### Cas d'utilisation
- Statuts et états d'une interface (chargement, ok, erreur)
- Valeurs possiblement nulles
- Paramètres qui acceptent plusieurs formes

> [!warning] À ne pas confondre
> Le `?.` (chaînage optionnel) et le `??` (valeur par défaut si null/undefined) ne sont pas `||` : `0 || 5` donne 5, `0 ?? 5` donne 0.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin avec mes mots (section 4).

> [!example] 🧠 Dessine de mémoire
> Dessine le type `categorie: "courses" | "logement" | "loisirs"` comme une porte qui n'accepte que trois clés. Essaie une quatrième.

> [!example] 🔄 Change de contexte
> Redessine la même idée côté API avec le `Literal` des catégories dans `schemas.py`. Qui refuse une valeur inconnue dans chaque cas ?

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Union et type littéral » et je l'intègre ici avec `![[Schéma - Union et type littéral.excalidraw]]`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : je l'applique dans mon travail (CVAT, Nuclio) ou je demande une étape à Claude.

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _J'explique mon schéma avec mes mots, sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Type et interface TypeScript]]
- **Complémentaires** : [[Condition (if)]]

## 6 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
La notion est maîtrisée quand je sais :
1. **l'expliquer** de façon fluide, à partir de mon schéma (section 4) ;
2. **l'adapter** à un autre contexte (consigne « Change de contexte », ou Claude m'interroge sur un autre cas) ;
3. **l'appliquer** pour de vrai dans le fil rouge (section 3).

Réussir un exercice ne suffit pas. C'est moi qui passe le statut en `maitrise`.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
