---
type: concept
domain: python
module: "[[Module 16 - Python]]"
status: a-decouvrir
level: debutant
prerequisites:
  - "[[Lire et écrire un fichier]]"
  - "[[Liste et dictionnaire]]"
parents: []
related:
  - "[[JSON]]"
next_review: 
method: []
tags:
  - concept
  - python
---
# Lire et écrire du CSV

> [!info] En une phrase
> Le CSV est un tableau en texte (une ligne par enregistrement, des colonnes séparées par des virgules) ; le module csv le lit et l'écrit proprement.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
Un fichier **CSV** (*comma-separated values*) contient une ligne d'en-tête puis une ligne par élément. Excel, les bases de données et beaucoup d'outils l'importent et l'exportent. Le module standard `csv` gère les guillemets, les séparateurs et les virgules dans les valeurs.

### Pourquoi ça existe
Échanger des données tabulaires simplement, entre programmes et avec des humains (tableur).

### Le problème résolu
Découper soi-même les lignes avec `split(",")` casse dès qu'une valeur contient une virgule ou un saut de ligne.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  F[fichier.csv] --> R[DictReader]
  R --> D[Dictionnaires]
  D --> W[DictWriter]
```

### Exemple concret
```text
nom,extension,taille
a.png,png,120
"rapport, final.pdf",pdf,3400
```
```python
import csv

with open("fichiers.csv", newline="", encoding="utf-8") as f:
    for ligne in csv.DictReader(f):           # une ligne = un dictionnaire
        print(ligne["nom"], int(ligne["taille"]))

lignes = [{"nom": "b.png", "extension": "png", "taille": 80}]
with open("sortie.csv", "w", newline="", encoding="utf-8") as f:
    w = csv.DictWriter(f, fieldnames=["nom", "extension", "taille"])
    w.writeheader()
    w.writerows(lignes)
```
Pour des tableaux plus gros ou des calculs (moyennes, regroupements), on passe à la bibliothèque **pandas**.

### Cas d'utilisation
- Exporter un rapport ouvrable dans Excel
- Lire une liste de fichiers ou d'utilisateurs à traiter

> [!warning] À ne pas confondre
> Tout ce qu'on lit est du **texte** : convertis avec `int()` ou `float()`. Excel en français utilise souvent `;` comme séparateur : `csv.reader(f, delimiter=";")`. Et oublier `newline=""` ajoute des lignes vides sous Windows.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin avec mes mots (section 4).

> [!example] 🛣️ Suis le trajet
> Dessine un fichier CSV de dépenses qui devient une liste de dictionnaires avec `csv.DictReader`, puis un total.

> [!example] 🔄 Change de contexte
> Redessine le même export depuis l'API MesDépenses : la base, la liste, le fichier CSV téléchargé.

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Lire et écrire du CSV » et je l'intègre ici avec `![[Schéma - Lire et écrire du CSV.excalidraw]]`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : je l'applique dans mon travail (CVAT, Nuclio) ou je demande une étape à Claude.

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _J'explique mon schéma avec mes mots, sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Lire et écrire un fichier]] · [[Liste et dictionnaire]]
- **Complémentaires** : [[JSON]]

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
