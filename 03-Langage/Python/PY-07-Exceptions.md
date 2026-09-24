---
created: 2026-09-14
modified: 2026-09-16
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: Optionnel
aliases:
  - "Gestion des Erreurs (Exceptions) Python"
tags:
  - backend/python/exceptions
parent: "[[Python]]"
children: []
related_theory:
  - "[[PY-04-Fonctions|Fonctions Python]]"
related_snippets:
  - "[[04_Snippets/py-exceptions]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: https://docs.python.org/3/tutorial/errors.html
---

# Gestion des Erreurs (Exceptions) Python

> [!abstract] Introduction
> Une exception est une erreur qui survient pendant l'exécution du programme ; Python permet de "l'intercepter" avec `try`/`except` pour éviter que tout le programme plante brutalement.

---

## Théorie

> [!question]- C'est quoi ?
> > [!note] C'est quoi une "exception" ?
> > Une exception est un signal envoyé par Python quand quelque chose se passe mal pendant l'exécution (diviser par zéro, accéder à une clé de dictionnaire qui n'existe pas, ouvrir un fichier introuvable...). Sans gestion, ce signal arrête complètement le programme.
>
> ```python
> resultat = 10 / 0  # ZeroDivisionError : le programme plante ici
> ```

> [!question]- Pourquoi l'utiliser ?
> Sans gestion des erreurs, la moindre situation imprévue (fichier manquant, donnée invalide, connexion réseau coupée) arrête TOUT le programme immédiatement. `try`/`except` permet de réagir proprement à ces situations : afficher un message clair, réessayer, ou continuer malgré l'erreur.

> [!question]- Comment ça marche ?
> ```python
> try:
>     resultat = 10 / 0
> except ZeroDivisionError:
>     print("Impossible de diviser par zéro")
> ```
> > [!note] Vocabulaire
> > - `try` : "essaie ce bloc de code"
> > - `except TypeErreur` : "si CE type d'erreur précis survient, fais ceci à la place de planter"
>
> **Intercepter plusieurs types d'erreurs :**
> ```python
> try:
>     age = int(input("Ton âge : "))
>     resultat = 100 / age
> except ValueError:
>     print("Ce n'est pas un nombre valide")
> except ZeroDivisionError:
>     print("L'âge ne peut pas être 0")
> ```
>
> **`finally` — s'exécute toujours, erreur ou pas :**
> ```python
> try:
>     fichier = open("films.txt")
>     # traitement du fichier
> except FileNotFoundError:
>     print("Fichier introuvable")
> finally:
>     print("Cette ligne s'exécute toujours, erreur ou pas")
> ```
> > [!note] Pourquoi `finally` est utile
> > Idéal pour du "nettoyage" (fermer un fichier, une connexion) qui doit se faire QUOI QU'IL ARRIVE, même si une erreur est survenue.
>
> **Créer et déclencher sa propre erreur avec `raise` :**
> ```python
> def diviser(a, b):
>     if b == 0:
>         raise ValueError("Le diviseur ne peut pas être zéro")
>     return a / b
> ```
> > [!note] C'est quoi `raise` ?
> > `raise` déclenche volontairement une exception — utile pour signaler explicitement qu'une situation est invalide, plutôt que de laisser un comportement silencieux et incorrect se produire.

> [!question]- Quand l'utiliser ?
> - Dès qu'on manipule des entrées utilisateur, des fichiers, des appels réseau — toutes les sources d'erreurs "prévisibles mais pas garanties"
> - `raise` : pour signaler une situation invalide dans ta propre logique métier

---

## Points clés

- `try` = code à risque, `except` = que faire si une erreur précise survient
- Toujours cibler le type d'erreur précis (`except ValueError`) plutôt qu'un `except` générique qui masque tous les problèmes
- `finally` s'exécute toujours, erreur ou pas — utile pour du nettoyage
- `raise` permet de déclencher volontairement une erreur personnalisée

---

## Paramètres / Configuration

| Mot-clé | Description | Notes |
|-----------|-------------|-------|
| `try` | Bloc de code potentiellement à risque | — |
| `except TypeErreur` | Gère un type d'erreur précis | Éviter `except:` seul (trop large) |
| `finally` | S'exécute toujours, erreur ou pas | Utile pour fermer fichiers/connexions |
| `raise` | Déclenche volontairement une exception | Ex : `raise ValueError("message")` |

---

## Exemple minimal

```python
def obtenir_note(film):
    try:
        return film["note"]
    except KeyError:
        print(f"Pas de note trouvée pour {film['titre']}")
        return None

film = {"titre": "Inception"}
note = obtenir_note(film)  # affiche le message, retourne None
```

> [!note] Ce que j'en retiens
> Plutôt que de faire planter tout le programme parce qu'une clé `"note"` n'existe pas dans le dictionnaire, on intercepte précisément ce cas (`KeyError`) et on continue proprement l'exécution.

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Python]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[JS-12-Erreurs-Debug-DevTools|TypeScript - try/catch]]

**Pratique :**
- Extrait de code → [[04_Snippets/py-exceptions]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi éviter un `except:` nu ?

---

## Tâches

- [ ] #task Ajouter une gestion d'erreurs propre à une fonction de lecture de fichier
- [ ] #task Créer une fonction avec `raise` qui signale une donnée invalide
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Quelle est la liste des exceptions les plus courantes à connaître par cœur (ValueError, TypeError, KeyError, IndexError...) ?
