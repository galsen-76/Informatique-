---
type: concept
module: "[[Module 16 - Python]]"
related:
  - "[[Lire et écrire un fichier]]"
tags:
  - concept
  - python
---
# Exception

> [!info] En une phrase
> Une erreur survenue pendant l'exécution, que Python signale en s'arrêtant, sauf si le code l'attrape avec try/except.

## 1 · Comprendre
### Définition
Quand une opération est impossible (fichier absent, division par zéro, clé manquante), Python **lève une exception**. Si rien ne l'attrape, le script s'arrête et affiche un **traceback** (la pile d'appels) avec un code de sortie 1.

`try:` / `except TypeErreur:` permet d'attraper une exception prévue et de réagir. `finally:` s'exécute dans tous les cas. `raise` lève soi-même une exception.

### Pourquoi ça existe
Séparer le chemin normal du code de la gestion des problèmes, et ne jamais continuer en silence après une erreur.

### Le problème résolu
Sans exceptions, chaque fonction devrait renvoyer un code d'erreur que tout le monde oublie de vérifier.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  T[try] --> Q{Erreur ?}
  Q -- non --> S[Suite]
  Q -- oui --> E[except]
```

### Exemple concret
```python
from pathlib import Path
import sys

chemin = Path("donnees/config.json")
try:
    texte = chemin.read_text(encoding="utf-8")
except FileNotFoundError:
    print(f"Fichier manquant : {chemin}", file=sys.stderr)
    sys.exit(1)
```
**Lire un traceback** : on lit **la dernière ligne** d'abord (le type et le message), puis la ligne de **ton** fichier la plus basse dans la pile.
```text
Traceback (most recent call last):
  File "main.py", line 8, in <module>
    texte = chemin.read_text()
FileNotFoundError: [Errno 2] No such file or directory: 'donnees/config.json'
```

| Exception fréquente | Cause |
| --- | --- |
| `FileNotFoundError` | chemin faux ou fichier absent |
| `PermissionError` | pas le droit de lire ou écrire |
| `KeyError` | clé absente d'un dictionnaire |
| `TypeError` | mauvais type (`"2" + 2`) |
| `ModuleNotFoundError` | paquet non installé |

> [!abstract]- Comment ça s'écrit (référence à chercher, pas à apprendre par cœur)
> L'idée est la même partout ; seule l'écriture change.
>
> **Python**
> ```python
> try:
>     montant = float(texte)
> except ValueError:
>     print("Montant invalide", file=sys.stderr)
> raise ValueError("montant négatif")   # lever une erreur
> ```
>
> **JavaScript / TypeScript**
> ```js
> try {
>   const data = JSON.parse(texte);
> } catch (e) {
>   console.error("JSON invalide :", e.message);
> }
> throw new Error("montant négatif");
> // avec une Promesse : try { await fetch(url) } catch (e) { … }
> ```
> Attention : `fetch` ne lève **pas** d'erreur sur un 404 ; il faut tester `res.ok`.
>
> **Bash**
> ```bash
> set -e                     # le script s'arrête à la première commande qui échoue
> cp a.txt b/ || { echo "copie ratée" >&2; exit 1; }
> ```
> Bash n'a pas d'exceptions : il a des [[Code de sortie|codes de sortie]], qu'on teste avec `||`, `&&` ou `if`.
>
> **C# (.NET)**
> ```csharp
> try
> {
>     var n = int.Parse(texte);
> }
> catch (FormatException ex)
> {
>     logger.LogWarning(ex, "Invalid number: {Text}", texte);
> }
> finally { /* toujours exécuté */ }
>
> throw new ArgumentException("Amount must be positive");
> ```
> Attrape le type d'exception précis, jamais un `catch (Exception)` vide. `throw;` seul relance l'exception en gardant son origine.

### Cas d'utilisation
- Gérer un fichier absent ou un dossier non accessible
- Sortir proprement en erreur pour que la CI ou Docker voient l'échec ([[Code de sortie]])

> [!warning] À ne pas confondre
> Attraper une erreur précise (`except FileNotFoundError`) et **tout** attraper (`except Exception: pass`) : ce dernier cache les bugs, le script « réussit » sans rien faire.

## 3 · Relier
- **Prérequis** : [[Fonction]] · [[Code de sortie]]
- **Complémentaires** : [[Lire et écrire un fichier]]
- **Utilisé par** : [[Archive zip (zipfile)]] · [[Copier et déplacer des fichiers (shutil)]]
