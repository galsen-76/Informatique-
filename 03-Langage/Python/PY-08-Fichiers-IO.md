---
created: 2026-09-14
modified: 2026-09-14
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: Optionnel
aliases:
  - "Fichiers & I/O Python"
tags:
  - backend/python/fichiers
parent: "[[Python]]"
children: []
related_theory:
  - "[[PY-07-Exceptions|Gestion des erreurs Python]]"
related_snippets:
  - "[[04_Snippets/py-fichiers]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.python.org/3/tutorial/inputoutput.html"
---

# Fichiers & I/O Python

> [!abstract] Introduction
> "I/O" (Input/Output = entrée/sortie) désigne la lecture et l'écriture de données, notamment dans des fichiers stockés sur le disque — Python fournit des outils simples pour ouvrir, lire, écrire et fermer un fichier.

---

## Théorie

> [!question]- C'est quoi ?
> ```python
> fichier = open("films.txt", "r")  # "r" = lecture (read)
> contenu = fichier.read()
> fichier.close()  # important : libère la ressource
> ```
>
> > [!note] Pourquoi faut-il `.close()` ?
> > Ouvrir un fichier réserve une ressource système. Si on oublie de la fermer, elle reste "occupée" inutilement — un peu comme laisser une porte ouverte après être sorti. Sur beaucoup de fichiers ouverts sans fermeture, ça peut ralentir ou bloquer le système.

> [!question]- Pourquoi l'utiliser ?
> Un programme a souvent besoin de lire des données existantes (fichier de configuration, données sauvegardées) ou d'en écrire de nouvelles (logs, exports, sauvegardes) — sans ça, toutes les données seraient perdues à chaque redémarrage du programme.

> [!question]- Comment ça marche ?
> **La bonne pratique : `with` (gère la fermeture automatiquement) :**
> ```python
> with open("films.txt", "r") as fichier:
>     contenu = fichier.read()
> # le fichier est automatiquement fermé ici, même en cas d'erreur
> ```
> > [!note] C'est quoi `with` ?
> > `with` est un "gestionnaire de contexte" : il garantit que le fichier sera fermé automatiquement à la fin du bloc, MÊME si une erreur survient pendant la lecture. C'est la façon recommandée d'ouvrir un fichier en Python — on n'utilise presque jamais `open()`/`.close()` séparément.
>
> **Modes d'ouverture courants :**
> ```python
> open("fichier.txt", "r")   # lecture seule
> open("fichier.txt", "w")   # écriture (écrase le contenu existant !)
> open("fichier.txt", "a")   # ajout à la fin du fichier existant
> ```
>
> **Lire ligne par ligne :**
> ```python
> with open("films.txt", "r") as fichier:
>     for ligne in fichier:
>         print(ligne.strip())  # .strip() retire les espaces/retours à la ligne
> ```
>
> **Écrire dans un fichier :**
> ```python
> with open("films.txt", "w") as fichier:
>     fichier.write("Inception\n")
>     fichier.write("Interstellar\n")
> ```
>
> **Fichiers JSON (très courant pour des données structurées) :**
> ```python
> import json
>
> donnees = {"titre": "Inception", "annee": 2010}
>
> with open("film.json", "w") as fichier:
>     json.dump(donnees, fichier)  # écrit l'objet Python en JSON
>
> with open("film.json", "r") as fichier:
>     donnees_lues = json.load(fichier)  # lit le JSON et le transforme en objet Python
> ```

> [!question]- Quand l'utiliser ?
> - Sauvegarder des données entre deux exécutions d'un programme
> - Lire des fichiers de configuration ou des données externes
> - `json` : dès que les données à sauvegarder ont une structure (pas juste du texte brut)

---

## Points clés

- Toujours utiliser `with open(...) as fichier:` plutôt que `open()`/`.close()` séparés
- Mode `"w"` écrase le fichier existant, `"a"` ajoute à la suite — attention à ne pas confondre
- `json.dump()` écrit un objet Python en JSON dans un fichier, `json.load()` fait l'inverse
- `.strip()` retire les espaces et retours à la ligne en trop lors de la lecture ligne par ligne

---

## Paramètres / Configuration

| Mode | Description | Notes |
|-----------|-------------|-------|
| `"r"` | Lecture seule | Erreur si le fichier n'existe pas |
| `"w"` | Écriture, écrase le contenu existant | Crée le fichier s'il n'existe pas |
| `"a"` | Ajoute à la fin du fichier | Crée le fichier s'il n'existe pas |
| `json.dump(obj, fichier)` | Écrit un objet Python en JSON | — |
| `json.load(fichier)` | Lit du JSON et le convertit en objet Python | — |

---

## Exemple minimal

```python
import json

films = [{"titre": "Inception", "annee": 2010}]

# Sauvegarder
with open("films.json", "w") as fichier:
    json.dump(films, fichier)

# Recharger
with open("films.json", "r") as fichier:
    films_charges = json.load(fichier)

print(films_charges)  # [{'titre': 'Inception', 'annee': 2010}]
```

> [!note] Ce que j'en retiens
> `with` garantit que le fichier est bien fermé après chaque opération, même si une erreur survenait entre-temps — pas besoin d'appeler `.close()` manuellement ni de se souvenir de le faire.

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Python]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[PY-07-Exceptions|Gestion des erreurs Python]]

**Pratique :**
- Extrait de code → [[04_Snippets/py-fichiers]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi ouvrir un fichier avec `with` ?

---

## Tâches

- [ ] #task Sauvegarder une liste de films dans un fichier JSON, puis la recharger
- [ ] #task Tester la différence entre les modes `"w"` et `"a"` avec le même fichier
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Comment lire/écrire un très gros fichier sans tout charger en mémoire d'un coup ?
