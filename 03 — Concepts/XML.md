---
type: concept
domain: python
module: "[[Module 16 - Python]]"
status: a-decouvrir
level: debutant
prerequisites:
  - "[[JSON]]"
parents: []
related:
  - "[[XML en Python (ElementTree)]]"
  - "[[Format CVAT for images 1.1]]"
  - "[[Élément et attribut HTML]]"
next_review: 
method: []
tags:
  - concept
  - python
---
# XML

> [!info] En une phrase
> Un format texte qui range des données dans des balises imbriquées, comme du HTML, mais avec des balises que chaque outil invente pour ses besoins.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
**XML** (eXtensible Markup Language) décrit un **arbre** d'**éléments**. Chaque élément a un nom (`<box>`), des **attributs** (`label="tuyau"`) et un contenu : du texte et/ou d'autres éléments. Il y a **une seule racine** qui contient tout.

### Pourquoi ça existe
- Échanger des données structurées entre programmes, avec un format lisible par un humain.
- Plus ancien que [[JSON]] : beaucoup d'outils (CVAT, Office, Maven, SVG, flux RSS) l'utilisent encore.

### Le problème résolu
- Donner une structure stricte à un fichier texte, qu'on peut valider et lire avec n'importe quel langage.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  A[Racine] --> B[Élément]
  B --> C[Attributs]
  B --> D[Texte]
  B --> E[Enfants]
```

### Exemple concret
```xml
<?xml version="1.0" encoding="utf-8"?>
<image id="0" name="iso_080.jpg" width="800" height="600">
  <polyline label="tuyau" points="100.00,400.00;300.00,284.53">
    <attribute name="debut">true</attribute>
  </polyline>
  <polyline label="ligne de cote" points="115.00,425.98;315.00,310.51"/>
</image>
```
- La première ligne (la **déclaration**) dit la version et l'encodage. `'` ou `"` autour des valeurs : les deux sont valides.
- `<polyline .../>` est un élément **vide** : identique à `<polyline ...></polyline>`.
- Une **liste** = le même élément répété.

### Cas d'utilisation
- Les annotations CVAT ([[Format CVAT for images 1.1]]).
- Les fichiers de config Java (`pom.xml`), les images SVG, les documents Office (zip de XML).

> [!warning] À ne pas confondre
> - **JSON** a des types (nombre, booléen, `null`) ; en **XML tout est texte**, c'est le programme lecteur qui décide que `"800"` est un nombre.
> - **Attribut** (`width="800"`, dans la balise) et **élément enfant** (`<width>800</width>`) : deux façons de ranger une valeur. C'est le format choisi par l'outil qui impose laquelle.
> - XML **n'est pas** HTML : en XML, les balises sont libres, mais toute balise ouverte doit être fermée, sinon le fichier est invalide.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin avec mes mots (section 4).

> [!example] 🧠 Dessine de mémoire
> Dessine un petit XML de dépenses comme un arbre : la racine, les balises, les attributs, le texte.

> [!example] ⚖️ Avant / après
> Avant / après : la même dépense en XML puis en JSON. Dessine ce qui prend de la place dans chaque forme.

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - XML » et je l'intègre ici avec `![[Schéma - XML.excalidraw]]`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : je l'applique dans mon travail (CVAT, Nuclio) ou je demande une étape à Claude.

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _J'explique mon schéma avec mes mots, sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[JSON]]
- **Notion parente** :
- **Complémentaires** : [[Élément et attribut HTML]]
- **Utilisé par** : [[XML en Python (ElementTree)]], [[Format CVAT for images 1.1]]
- **Commandes** :

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
