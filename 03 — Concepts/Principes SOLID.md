---
type: concept
domain: architecture
module: "[[Module 15 - Architecture logicielle]]"
status: a-decouvrir
level: avance
niveau: 5
schema: false
exercice_visuel: false
fil_rouge: false
prerequisites:
  - "[[Séparation des responsabilités]]"
  - "[[Type et interface TypeScript]]"
parents:
  - "[[Séparation des responsabilités]]"
related:
  - "[[Design pattern]]"
  - "[[Service et injection de dépendances]]"
next_review: 
method: []
tags:
  - concept
  - architecture
---
# Principes SOLID

> [!info] En une phrase
> SOLID regroupe cinq principes de conception orientée objet qui rendent le code plus facile à faire évoluer : responsabilité unique, ouvert/fermé, substitution de Liskov, ségrégation des interfaces, inversion des dépendances.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
| Lettre | Principe | En une phrase |
| --- | --- | --- |
| **S** | Responsabilité unique | une classe ou un module n'a qu'une raison de changer |
| **O** | Ouvert/fermé | on ajoute un comportement en ajoutant du code, pas en modifiant ce qui marche |
| **L** | Substitution de Liskov | une sous-classe doit pouvoir remplacer sa classe mère sans surprise |
| **I** | Ségrégation des interfaces | plusieurs petites interfaces plutôt qu'une énorme |
| **D** | Inversion des dépendances | le métier dépend d'abstractions (une interface), pas des détails (une base précise) |
Le **D** est le plus utile au quotidien : c'est ce qui permet l'[[Service et injection de dépendances|injection de dépendances]] et les [[Doublure de test (mock)|doublures]] dans les tests.

### Pourquoi ça existe
Dans les gros projets, une modification en entraîne dix autres ; ces principes limitent les effets en chaîne.

### Le problème résolu
Ajouter un format d'export, une source de données ou un fournisseur sans réécrire ce qui existe.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
M[Métier] --> I[Interface Stockage]
  L[Disque local] -.implémente.-> I
  S3[S3] -.implémente.-> I
```

### Exemple concret
```ts
// D et O : le service dépend d'une interface
interface Exporteur { exporter(annotations: Annotation[]): Promise<Buffer>; }
class ExporteurPng implements Exporteur { async exporter(a) { /* dessine */ } }
class ExporteurCsv implements Exporteur { async exporter(a) { /* texte */ } }

class ServiceExport {
  constructor(private exporteurs: Record<string, Exporteur>) {}
  lancer(format: string, a: Annotation[]) { return this.exporteurs[format].exporter(a); }
}
// ajouter un format = ajouter une classe, sans toucher à ServiceExport
```

### Cas d'utilisation
- Concevoir des formats ou des fournisseurs interchangeables
- Rendre le code testable
- Comprendre le code d'Angular ou de NestJS

> [!warning] À ne pas confondre
> Appliquer SOLID mécaniquement à un script de 50 lignes : interfaces et classes partout pour rien. C'est un outil pour du code qui évolue, pas une obligation.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] 🧠 Dessine de mémoire
> Dessine les cinq lettres et, pour chacune, un petit schéma de classes qui la respecte.

> [!example] 🔍 Trouve l'erreur
> Ce schéma est faux. Corrige-le en rouge et explique l'erreur.
>
> ```mermaid
> flowchart TD
>   C[Classe Depenses] --> B[Base]
>   C --> P[Export PDF]
>   C --> M[Envoi mail]
> ```

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Principes SOLID » et je l'intègre ici avec `![[Schéma - Principes SOLID.excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : elle sera pratiquée dans le fil rouge de son niveau (voir [[Niveaux]]).

## 4 · Relier
- **Prérequis** : [[Séparation des responsabilités]] · [[Type et interface TypeScript]]
- **Complémentaires** : [[Design pattern]] · [[Service et injection de dépendances]]

## 5 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
Trois cases à cocher dans les propriétés de la fiche :
- `schema` : mon dessin du concept est dans « Mon schéma » ;
- `exercice_visuel` : j'ai fait et corrigé les exercices visuels de la section 3 ;
- `fil_rouge` : je l'ai appliqué dans le fil rouge (coché tout seul quand une étape qui l'utilise est réussie).

Les trois cochées : la notion compte comme **comprise**. **Maîtrisé** : c'est moi qui le mets dans `status`, quand je le sens.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
