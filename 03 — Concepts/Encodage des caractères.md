---
type: concept
domain: fondamentaux
module: "[[Module 01 - Fondamentaux informatiques]]"
status: a-decouvrir
level: debutant
niveau: 0
schema: false
exercice_visuel: false
fil_rouge: false
prerequisites:
  - "[[Binaire et octet]]"
parents: []
related:
  - "[[Lire et écrire un fichier]]"
next_review: 
method: []
tags:
  - concept
  - fondamentaux
---
# Encodage des caractères

> [!info] En une phrase
> La table qui transforme des caractères en octets ; UTF-8 est la norme et sait écrire toutes les langues.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
Un fichier texte n'est qu'une suite d'octets ; l'**encodage** dit quel caractère correspond à quels octets. **ASCII** ne couvre que l'anglais (128 caractères). **UTF-8** couvre tout (accents, arabe, emoji) : 1 octet pour les lettres simples, 2 à 4 pour les autres. Ailleurs on croise encore **Latin-1** / **Windows-1252**.

### Pourquoi ça existe
Les machines ne stockent que des nombres : il faut une convention commune pour le texte.

### Le problème résolu
Les textes illisibles quand l'écrivain et le lecteur n'utilisent pas la même table.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  C[é] -- encoder --> O[c3 a9]
  O -- décoder --> C2[é]
```
Lire de l'UTF-8 en croyant que c'est du Latin-1 donne le fameux `Ã©` au lieu de `é`.

### Exemple concret
```python
"é".encode("utf-8")              # b'\xc3\xa9'
b"\xc3\xa9".decode("latin-1")    # 'Ã©'  ← mauvais décodage
open("f.txt", encoding="utf-8")  # toujours préciser l'encodage
```
```bash
file -i notes.txt                # charset=utf-8 ?
iconv -f latin1 -t utf-8 ancien.txt > nouveau.txt
```

### Cas d'utilisation
- Accents cassés dans un CSV ouvert dans Excel, dans un log, dans une base
- `UnicodeDecodeError` en Python

> [!warning] À ne pas confondre
> **Encodage** (UTF-8, Latin-1 : comment stocker les caractères) et **fins de ligne** (CRLF / LF : comment terminer une ligne, voir [[Fichiers entre Windows et Linux]]). Et un fichier binaire (image) n'a pas d'encodage de texte.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] 🛣️ Suis le trajet
> Dessine le trajet du mot « été » : tu le tapes dans un fichier sous Windows, il est enregistré en octets, puis lu sous Linux. Marque l'endroit où il peut devenir « Ã©tÃ© ».

> [!example] 🔍 Trouve l'erreur
> Ce schéma est faux. Corrige-le en rouge et explique l'erreur.
>
> ```mermaid
> flowchart TD
>   T[Texte été] --> U[Octets UTF-8]
>   U --> L[Lu en UTF-8]
>   L --> X[Ã©tÃ© affiché]
> ```

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Encodage des caractères » et je l'intègre ici avec `![[Schéma - Encodage des caractères.excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- [[Dépenses 08 - Lire un vrai fichier]]

## 4 · Relier
- **Prérequis** : [[Binaire et octet]]
- **Complémentaires** : [[Lire et écrire un fichier]] · [[Fichiers entre Windows et Linux]]

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
