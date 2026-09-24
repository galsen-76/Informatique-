---
created: 2026-09-14
modified: 2026-09-14
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: Optionnel
aliases:
  - "Programmation Orientée Objet (Classes) en Python"
tags:
  - backend/python/poo
parent: "[[Python]]"
children:
  - "[[PY-05-POO-Classes|Heritage Python]]"
related_theory:
  - "[[PY-04-Fonctions|Fonctions Python]]"
related_snippets:
  - "[[04_Snippets/py-classes]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.python.org/3/tutorial/classes.html"
---

# Programmation Orientée Objet (Classes) en Python

> [!abstract] Introduction
> Une classe est un modèle qui décrit un type d'objet (ses données et ses actions), et permet de créer plusieurs "instances" (exemplaires concrets) de ce modèle.

---

## Théorie

> [!question]- C'est quoi ?
> ```python
> class Film:
>     def __init__(self, titre, annee):
>         self.titre = titre
>         self.annee = annee
>
>     def resume(self):
>         return f"{self.titre} ({self.annee})"
> ```
>
> > [!note] C'est quoi `__init__` ?
> > `__init__` est une méthode spéciale, appelée automatiquement à la création d'un nouvel objet (une "instance"). C'est ici qu'on définit les données de départ de l'objet — équivalent du "constructeur" en TypeScript.
>
> > [!note] C'est quoi `self` ?
> > `self` représente "cet objet précis, celui qu'on est en train de manipuler". C'est TOUJOURS le premier paramètre d'une méthode de classe en Python — Python ne l'ajoute pas automatiquement comme le ferait `this` en JavaScript, il faut l'écrire explicitement.

> [!question]- Pourquoi l'utiliser ?
> La programmation orientée objet permet de regrouper des données et les actions qui leur sont liées en un seul "paquet" cohérent, réutilisable pour créer plusieurs objets similaires sans dupliquer le code.

> [!question]- Comment ça marche ?
> **Créer une instance (un objet concret) à partir de la classe :**
> ```python
> film1 = Film("Inception", 2010)
> print(film1.resume())  # "Inception (2010)"
> ```
>
> **Héritage — une classe qui hérite d'une autre :**
> ```python
> class FilmAnime(Film):
>     def __init__(self, titre, annee, studio):
>         super().__init__(titre, annee)  # appelle le constructeur du parent
>         self.studio = studio
>
>     def resume(self):
>         return f"{super().resume()} - Studio: {self.studio}"
> ```
> > [!note] C'est quoi `super()` ?
> > `super()` permet d'accéder à la classe "parente" (dont on hérite), pour réutiliser son code plutôt que de tout réécrire.
>
> **Attributs "privés" (convention) :**
> ```python
> class CompteBancaire:
>     def __init__(self, solde):
>         self._solde = solde  # underscore = "privé par convention", pas vraiment bloqué
> ```
> > [!note] Attention
> > Contrairement à TypeScript (`private`), Python n'a pas de vraie protection stricte des attributs privés. Le underscore `_` est juste une convention qui dit "ne touche pas à ça depuis l'extérieur", mais rien n'empêche techniquement de le faire.

> [!question]- Quand l'utiliser ?
> Dès qu'on manipule plusieurs objets partageant la même structure et le même comportement (plusieurs films, plusieurs utilisateurs...). Pour des scripts simples et courts, les classes ne sont pas toujours nécessaires — des fonctions et dictionnaires suffisent souvent.

---

## Points clés

- `__init__` = constructeur, appelé automatiquement à la création d'un objet
- `self` doit être écrit explicitement comme premier paramètre de chaque méthode
- `super()` donne accès à la classe parente en cas d'héritage
- Un underscore `_nom` = convention pour signaler un attribut "privé", sans vraie protection technique
- Une classe = un modèle, une instance = un objet concret créé à partir de ce modèle

---

## Paramètres / Configuration

| Concept | Description | Notes |
|-----------|-------------|-------|
| `class Nom:` | Déclare une classe | — |
| `__init__(self, ...)` | Constructeur | Appelé à la création d'un objet |
| `self` | Référence à l'objet courant | Toujours en premier paramètre |
| `super()` | Accède à la classe parente | Utile avec l'héritage |
| `_attribut` | Convention "privé" | Pas de vraie protection |

---

## Exemple minimal

```python
class Film:
    def __init__(self, titre, annee):
        self.titre = titre
        self.annee = annee

    def resume(self):
        return f"{self.titre} ({self.annee})"

film1 = Film("Inception", 2010)
film2 = Film("Dunkirk", 2017)

print(film1.resume())  # "Inception (2010)"
print(film2.resume())  # "Dunkirk (2017)"
```

> [!note] Ce que j'en retiens
> `film1` et `film2` sont deux instances DIFFÉRENTES créées à partir du MÊME modèle `Film` — chacune a ses propres valeurs (`titre`, `annee`), mais partage la même méthode `resume()`.

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Python]]
- Sous-sujets → [[PY-05-POO-Classes|Heritage Python]]
- À comparer avec → [[TS-05-Classes|TypeScript - Classes]]

**Pratique :**
- Extrait de code → [[04_Snippets/py-classes]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Que représente `self` ?

---

## Tâches

- [ ] #task Créer une classe `Film` avec plusieurs méthodes (résumé, marquer favori...)
- [ ] #task Créer une classe fille avec héritage et `super()`
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Existe-t-il un vrai équivalent de `private` (strict) en Python, ou est-ce vraiment juste une convention partout ?
