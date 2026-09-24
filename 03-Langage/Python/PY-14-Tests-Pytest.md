---
created: 2026-09-14
modified: 2026-09-14
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: Optionnel
aliases:
  - "Tests Python (pytest)"
tags:
  - backend/python/tests
parent: "[[Python]]"
children: []
related_theory:
  - "[[PY-04-Fonctions|Fonctions Python]]"
  - "[[PY-07-Exceptions|Gestion des erreurs Python]]"
related_snippets:
  - "[[04_Snippets/py-tests]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.pytest.org/"
---

# Tests Python (pytest)

> [!abstract] Introduction
> `pytest` est l'outil le plus utilisé pour écrire des tests automatisés en Python, qui vérifient qu'une fonction ou un programme se comporte comme prévu, sans avoir à vérifier manuellement à chaque modification.

---

## Théorie

> [!question]- C'est quoi ?
> > [!note] Rappel : c'est quoi un test ?
> > Un test est du code qui vérifie automatiquement qu'un autre bout de code fonctionne correctement (ex : "est-ce que cette fonction retourne bien le bon résultat ?").
>
> Python inclut un module de test intégré (`unittest`), mais **`pytest`** est devenu le standard de fait dans l'industrie car il est plus simple à écrire et à lire.
>
> ```python
> # calculs.py
> def additionner(a, b):
>     return a + b
> ```
> ```python
> # test_calculs.py
> from calculs import additionner
>
> def test_additionner():
>     assert additionner(2, 3) == 5
> ```
>
> > [!note] C'est quoi `assert` ?
> > `assert` vérifie qu'une condition est vraie. Si elle est fausse, le test échoue automatiquement et pytest signale précisément quelle ligne a posé problème.

> [!question]- Pourquoi l'utiliser ?
> Sans tests automatisés, chaque modification du code doit être vérifiée manuellement — long, source d'oublis, et rien ne garantit qu'une modification n'a pas cassé une autre partie du programme sans qu'on s'en aperçoive.

> [!question]- Comment ça marche ?
> 1. On installe pytest : `pip install pytest`
> 2. On crée des fichiers de test nommés `test_*.py` (convention obligatoire pour que pytest les détecte)
> 3. Chaque fonction de test commence par `test_` (convention également obligatoire)
> 4. On lance tous les tests avec :
> ```bash
> pytest
> ```
>
> **Tester une erreur attendue :**
> ```python
> import pytest
>
> def diviser(a, b):
>     if b == 0:
>         raise ValueError("Division par zéro impossible")
>     return a / b
>
> def test_diviser_par_zero():
>     with pytest.raises(ValueError):
>         diviser(10, 0)
> ```
> > [!note] C'est quoi `pytest.raises` ?
> > Ça vérifie que le code À L'INTÉRIEUR du bloc `with` déclenche bien l'erreur attendue. Si aucune erreur ne survient, le test échoue — on vérifie ainsi que les cas d'erreur sont bien gérés, pas seulement les cas normaux.
>
> **Fixtures — préparer des données réutilisables pour plusieurs tests :**
> ```python
> import pytest
>
> @pytest.fixture
> def film_exemple():
>     return {"titre": "Inception", "annee": 2010}
>
> def test_titre(film_exemple):
>     assert film_exemple["titre"] == "Inception"
> ```
> > [!note] C'est quoi une "fixture" ?
> > Une fixture est une fonction qui prépare des données ou un état de départ commun à plusieurs tests, pour éviter de répéter la même préparation dans chaque test.

> [!question]- Quand l'utiliser ?
> - Tester chaque fonction avec une logique importante (calculs, transformations de données)
> - Tester les cas d'erreur, pas seulement les cas "normaux"
> - Fixtures : dès qu'un même jeu de données de test est réutilisé dans plusieurs fonctions de test

---

## Points clés

- Fichiers de test : `test_*.py`, fonctions de test : `test_*()` — conventions obligatoires pour pytest
- `assert condition` fait échouer le test si la condition est fausse
- `pytest.raises(TypeErreur)` vérifie qu'une erreur précise est bien levée
- Une fixture (`@pytest.fixture`) prépare des données réutilisables entre plusieurs tests
- Toujours tester les cas limites (valeurs vides, zéro, erreurs) — pas seulement le cas "parfait"

---

## Paramètres / Configuration

| Élément | Description | Notes |
|-----------|-------------|-------|
| `test_*.py` | Nom de fichier détecté automatiquement par pytest | Convention obligatoire |
| `def test_*():` | Fonction reconnue comme test | Convention obligatoire |
| `assert condition` | Vérifie qu'une condition est vraie | Échoue si `False` |
| `pytest.raises(Erreur)` | Vérifie qu'une erreur précise est levée | Utilisé avec `with` |
| `@pytest.fixture` | Prépare des données réutilisables | Passée en paramètre du test |

---

## Exemple minimal

```python
# film_service.py
def filtrer_films_recents(films, annee_min):
    return [f for f in films if f["annee"] >= annee_min]
```

```python
# test_film_service.py
from film_service import filtrer_films_recents

def test_filtrer_films_recents():
    films = [{"titre": "Inception", "annee": 2010}, {"titre": "Tenet", "annee": 2020}]
    resultat = filtrer_films_recents(films, 2015)
    assert len(resultat) == 1
    assert resultat[0]["titre"] == "Tenet"
```

> [!note] Ce que j'en retiens
> Ce test vérifie deux choses en une fois : que le filtrage retourne le bon NOMBRE de résultats, et que c'est bien le BON film qui a été gardé — un test minimal mais qui couvre déjà l'essentiel du comportement attendu.

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Python]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[ANG-14-Tests|Tests Angular]]

**Pratique :**
- Extrait de code → [[04_Snippets/py-tests]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - À quoi sert une fixture pytest ?

---

## Tâches

- [ ] #task Écrire les premiers tests pytest pour une fonction de tri ou de filtrage
- [ ] #task Tester un cas d'erreur avec `pytest.raises`
- [ ] #task Créer une fixture réutilisée dans au moins 2 tests différents
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Quelle est la différence pratique entre `unittest` (intégré) et `pytest` (externe) — pourquoi ce dernier a-t-il gagné en popularité ?
