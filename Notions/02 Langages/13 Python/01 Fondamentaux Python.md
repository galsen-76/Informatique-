---
type: notion
statut: a apprendre
resume: "Python est un langage très lisible, utilisé pour les scripts, la data, l'IA et les back-ends (FastAPI, Django)."
revu:
sources:
  - "https://docs.python.org/3/"
---
# Fondamentaux Python

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Python est un langage très lisible, utilisé pour les scripts, la data, l'IA et les back-ends (FastAPI, Django).

## Le problème

**Pourquoi c'est utile ?**
Pour écrire des scripts, de la data, de l'IA ou des back-ends dans un langage très lisible.

**Qu'est-ce qui se passait sans ça ?**
Pour automatiser une tâche ou traiter des données, il fallait un langage plus verbeux ou des scripts shell difficiles à maintenir.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Tu connais déjà JavaScript : la logique est la même, seule la **syntaxe** change. Les deux grosses différences : **pas d'accolades** (c'est l'**indentation** qui délimite les blocs) et **pas de `let` / `const`**.

### JavaScript → Python

| JavaScript / TypeScript | Python |
|---|---|
| `let title = 'Dune';` | `title = "Dune"` |
| `const MAX = 10;` | `MAX = 10` (convention : majuscules = ne pas modifier) |
| `// commentaire` | `# commentaire` |
| `` `Film ${title}` `` | `f"Film {title}"` |
| `true` / `false` | `True` / `False` |
| `null` / `undefined` | `None` |
| `&&`, `\|\|`, `!` | `and`, `or`, `not` |
| `===` | `==` |
| `console.log(x)` | `print(x)` |
| `camelCase` | `snake_case` |

### Les types de base

| Type | Exemple | Équivalent JS |
|---|---|---|
| `str` | `"Inception"` | `string` |
| `int` | `2010` | `number` (entier) |
| `float` | `8.8` | `number` (à virgule) |
| `bool` | `True` | `boolean` |
| `None` | `None` | `null` |

Contrairement à JavaScript, Python refuse de mélanger les types : `"5" + 1` provoque une **erreur** (voir [[02 Typage statique et dynamique|Typage]]).

### Lancer du Python

```bash
python3 --version          # vérifier l'installation
python3 script.py          # exécuter un fichier
python3                    # console interactive (quit() pour sortir)
```

## 🧪 Exemple

### L'indentation remplace les accolades

```python
year = 2010

if year > 2000:
    print("Film récent")      # 4 espaces = dans le if
else:
    print("Film ancien")

print("Fin")                  # plus d'espaces = sorti du if
```

Le `:` ouvre un bloc, les **4 espaces** disent ce qui est dedans. Une mauvaise indentation = une **erreur**, pas juste un problème de style.

## ⚠️ Limites et pièges

- **Mélanger espaces et tabulations** : configure l'éditeur sur 4 espaces.
- **Oublier les `:`** après `if`, `for`, `def`, `class`.
- **Écrire `true`** en minuscules : c'est `True`.

## 🏋️ S'entraîner

### Exercices

#### Exercice 1 · Traduire du JavaScript

Traduis ce code en Python :

```js
const title = 'Dune';
let year = 2021;
if (year >= 2020 && title !== '') {
  console.log(`${title} est récent`);
} else {
  console.log('Ancien');
}
```

> [!success]- Solution
> ```python
> title = "Dune"
> year = 2021
> if year >= 2020 and title != "":
>     print(f"{title} est récent")
> else:
>     print("Ancien")
> ```

#### Exercice 2 · Trouver les erreurs

Ce code contient 3 erreurs. Lesquelles ?

```python
rating = 4
if rating > 3
print("Bon film")
is_favorite = true
```

> [!success]- Solution
> 1. Il manque `:` après `if rating > 3`.
> 2. `print` doit être **indenté** (4 espaces) pour appartenir au `if`.
> 3. `true` s'écrit `True` en Python.

## 🔗 Liens

- **Prérequis :** 
- **Voir aussi :** [[01 Fondamentaux TypeScript|Fondamentaux TypeScript]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://docs.python.org/3/
