---
type: concept
domain: fondamentaux
module: "[[Module 01 - Fondamentaux informatiques]]"
status: a-decouvrir
level: debutant
prerequisites: []
parents: []
related:
  - "[[Encodage des caractères]]"
next_review: 
method: []
tags:
  - concept
  - fondamentaux
---
# Binaire et octet

> [!info] En une phrase
> L'ordinateur ne connaît que des 0 et des 1 (bits) ; 8 bits forment un octet, l'unité de base de toutes les tailles (Ko, Mo, Go).

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
Un **bit** vaut 0 ou 1 (courant ou pas). Un **octet** (*byte*) = 8 bits, soit 256 valeurs (0 à 255). Tout est stocké ainsi : nombres, textes, images, programmes. L'**hexadécimal** (base 16 : 0-9 puis a-f) écrit un octet en 2 caractères (`ff` = 255) : on le voit dans les hash Git, les couleurs CSS (`#ff6600`), les adresses mémoire.

| Unité | Taille |
| --- | --- |
| 1 Ko | 1 000 octets (1 Kio = 1 024) |
| 1 Mo | 1 000 Ko |
| 1 Go | 1 000 Mo |

### Pourquoi ça existe
Le matériel électronique sait représenter de façon fiable deux états : allumé / éteint.

### Le problème résolu
Représenter n'importe quelle information avec un seul mécanisme simple et fiable.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  B[Bits] --> O[Octet]
  O --> N[Nombre]
  O --> T[Texte]
  O --> I[Image]
```
`1011` en binaire = 8 + 0 + 2 + 1 = **11** ; `11111111` = **255**. Le sens d'un octet dépend de **qui le lit** : le même octet peut être un nombre, une lettre ou un pixel.

### Exemple concret
```python
print(bin(11), hex(255), int("ff", 16))   # 0b1011 0xff 255
print(len("é".encode("utf-8")))           # 2 octets
```
```bash
xxd -l 16 image.png     # les 16 premiers octets d'un fichier, en hexadécimal
```

### Cas d'utilisation
- Comprendre les tailles de fichiers, de mémoire, de disque
- Lire un hash de commit, une couleur, des droits Linux (`755` en octal)

> [!warning] À ne pas confondre
> **bit** (b) et **octet** (o, ou B en anglais) : une connexion de 100 **Mb**/s transfère environ 12,5 **Mo**/s.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin avec mes mots (section 4).

> [!example] 🧠 Dessine de mémoire
> Dessine un octet comme 8 cases. Écris dedans le nombre 5, puis le nombre 200, et note sous chaque case ce qu'elle vaut (1, 2, 4…).

> [!example] ⚖️ Avant / après
> Avant / après : à gauche, la lettre « A » telle que tu la vois à l'écran ; à droite, ce qui est vraiment rangé sur le disque. Dessine le passage de l'un à l'autre.

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Binaire et octet » et je l'intègre ici avec `![[Schéma - Binaire et octet.excalidraw]]`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : je l'applique dans mon travail (CVAT, Nuclio) ou je demande une étape à Claude.

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _J'explique mon schéma avec mes mots, sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Complémentaires** : [[Encodage des caractères]] · [[Processeur, mémoire et disque]]

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
