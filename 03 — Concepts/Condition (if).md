---
type: concept
module: "[[Module 16 - Python]]"
related:
  - "[[Boucle (for, while)]]"
tags:
  - concept
  - python
---
# Condition (if)

> [!info] En une phrase
> Faire une chose seulement si une condition est vraie, et autre chose sinon.

## 1 · Comprendre
### Définition
`if` teste une expression qui vaut `True` ou `False`. Le bloc indenté dessous ne s'exécute que si elle est vraie. `elif` ajoute un autre cas, `else` le cas par défaut.

### Pourquoi ça existe
Un programme doit réagir à la situation : le fichier existe-t-il ? Est-ce un `.png` ? L'archive est-elle trop grosse ?

### Le problème résolu
Sans condition, un programme ferait toujours exactement la même chose, quel que soit son entrée.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  T{Condition ?} -- vrai --> A[Bloc if]
  T -- faux --> B[Bloc else]
```
| Opérateur | Sens |
| --- | --- |
| `==`, `!=` | égal, différent |
| `<`, `>`, `<=`, `>=` | comparaisons |
| `and`, `or`, `not` | combiner |
| `in` | « est dans » : `".png" in nom` |

### Exemple concret
```python
extension = ".png"
taille_mo = 120

if extension == ".png" and taille_mo < 100:
    print("Image à zipper")
elif extension == ".png":
    print("Image trop lourde, ignorée")
else:
    print("Pas une image")
```

> [!abstract]- Comment ça s'écrit (référence à chercher, pas à apprendre par cœur)
> L'idée est la même partout ; seule l'écriture change.
>
> **Python**
> ```python
> if montant > 100:
>     print("grosse")
> elif montant > 20:
>     print("moyenne")
> else:
>     print("petite")
> ```
> Le bloc est défini par l'**indentation**.
>
> **JavaScript / TypeScript**
> ```js
> if (montant > 100) {
>   console.log("grosse");
> } else if (montant > 20) {
>   console.log("moyenne");
> } else {
>   console.log("petite");
> }
> const taille = montant > 100 ? "grosse" : "petite";  // ternaire
> ```
> Accolades et parenthèses obligatoires ; compare avec `===`.
>
> **Bash**
> ```bash
> if [ "$montant" -gt 100 ]; then
>   echo "grosse"
> elif [ "$montant" -gt 20 ]; then
>   echo "moyenne"
> else
>   echo "petite"
> fi
> ```
> Espaces obligatoires dans `[ … ]` ; `-gt`, `-lt`, `-eq` pour les nombres, `=` pour le texte. `if` teste en fait le **code de sortie** d'une commande.
>
> **C# (.NET)**
> ```csharp
> if (montant > 100) { /* … */ }
> else if (montant > 0) { /* … */ }
> else { /* … */ }
>
> var libelle = categorie switch
> {
>     "loisirs" => "Fun",
>     "courses" => "Maison",
>     _ => "Autre",          // _ : tous les autres cas
> };
> ```
> Parenthèses autour de la condition et accolades pour le bloc, comme en JavaScript.

### Cas d'utilisation
- Ne traiter que certains types de fichiers
- Vérifier qu'un dossier existe avant de travailler dedans

> [!warning] À ne pas confondre
> L'indentation fait partie du code : une ligne mal indentée sort du bloc `if` ou provoque `IndentationError`. Et `if x = 3` (erreur) au lieu de `if x == 3`.

## 3 · Relier
- **Prérequis** : [[Variables et types]]
- **Complémentaires** : [[Boucle (for, while)]]
- **Utilisé par** : [[Fonction]] · [[Exception]]
