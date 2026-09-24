---
created: 2026-09-14
modified: 2026-09-14
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: Optionnel
aliases:
  - "Générateurs & Itérateurs Python"
tags:
  - backend/python/generateurs
parent: "[[Python]]"
children: []
related_theory:
  - "[[PY-03-Structures-de-controle|Structures de controle]]"
related_snippets:
  - "[[04_Snippets/py-generateurs]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.python.org/3/tutorial/classes.html#generators"
---

# Générateurs & Itérateurs Python

> [!abstract] Introduction
> Un générateur est une fonction spéciale qui produit ses valeurs UNE PAR UNE, à la demande, au lieu de toutes les calculer et les stocker en mémoire d'un coup — utile pour traiter de grandes quantités de données sans surcharger la mémoire.

---

## Théorie

> [!question]- C'est quoi ?
> > [!note] C'est quoi un "itérateur" ?
> > Un itérateur est un objet qu'on peut parcourir un élément à la fois (avec une boucle `for` par exemple), sans connaître à l'avance le nombre total d'éléments. Les listes, dictionnaires sont "itérables" — un générateur EST une façon de créer un itérateur.
>
> ```python
> def compteur_simple(n):
>     for i in range(n):
>         yield i  # "yield" au lieu de "return"
> ```
>
> > [!note] C'est quoi `yield` ?
> > `yield` renvoie une valeur, MAIS met la fonction "en pause" au lieu de la terminer complètement (contrairement à `return`). Au prochain appel, la fonction reprend exactement là où elle s'était arrêtée.

> [!question]- Pourquoi l'utiliser ?
> Si on doit traiter un million de lignes d'un fichier, créer une LISTE de toutes ces lignes en mémoire d'un coup peut être très coûteux (voire impossible si le fichier est énorme). Un générateur produit chaque valeur "à la demande", une par une, sans jamais tout garder en mémoire en même temps.

> [!question]- Comment ça marche ?
> **Comparaison liste vs générateur :**
> ```python
> # Liste : calcule TOUT immédiatement, stocke tout en mémoire
> carres_liste = [x*x for x in range(1000000)]
>
> # Générateur : ne calcule RIEN tant qu'on ne demande pas la valeur suivante
> carres_generateur = (x*x for x in range(1000000))
> ```
> > [!note] Différence de syntaxe
> > Remplacer les crochets `[ ]` par des parenthèses `( )` transforme une compréhension de liste en "expression génératrice" — même logique, mais paresseuse (lazy).
>
> **Utiliser un générateur :**
> ```python
> def films_un_par_un(liste_films):
>     for film in liste_films:
>         yield film
>
> gen = films_un_par_un(["Inception", "Dunkirk"])
> print(next(gen))  # "Inception"
> print(next(gen))  # "Dunkirk"
> print(next(gen))  # StopIteration : plus rien à donner
> ```
> > [!note] C'est quoi `next()` ?
> > `next()` demande explicitement "donne-moi la prochaine valeur" à un générateur. Une boucle `for` fait ça automatiquement en coulisses, sans qu'on ait besoin d'écrire `next()` soi-même.

> [!question]- Quand l'utiliser ?
> - Traiter de très gros fichiers ou flux de données ligne par ligne
> - Générer une séquence potentiellement infinie (impossible avec une liste classique)
> - Chaque fois qu'on n'a pas besoin de garder TOUTES les valeurs en mémoire en même temps, juste de les parcourir une fois

---

## Points clés

- `yield` met la fonction en pause et renvoie une valeur, `return` termine complètement la fonction
- Un générateur ne calcule ses valeurs QUE quand on les demande (évaluation "paresseuse" / lazy)
- Un générateur ne peut être parcouru qu'UNE SEULE FOIS — une fois épuisé, il faut le recréer
- `(x for x in coll)` = expression génératrice, `[x for x in coll]` = liste classique

---

## Paramètres / Configuration

| Concept | Description | Notes |
|-----------|-------------|-------|
| `yield` | Renvoie une valeur et met la fonction en pause | Rend la fonction un générateur |
| `next(generateur)` | Demande la valeur suivante | Lève `StopIteration` si épuisé |
| `(x for x in coll)` | Expression génératrice | Équivalent paresseux d'une liste |

---

## Exemple minimal

```python
def lire_films_par_lot(films, taille_lot=2):
    for i in range(0, len(films), taille_lot):
        yield films[i:i + taille_lot]

films = ["Inception", "Dunkirk", "Tenet", "Interstellar", "Oppenheimer"]

for lot in lire_films_par_lot(films):
    print(lot)
# ['Inception', 'Dunkirk']
# ['Tenet', 'Interstellar']
# ['Oppenheimer']
```

> [!note] Ce que j'en retiens
> Le générateur produit chaque "lot" de films un par un, au fur et à mesure de la boucle `for` — utile si `films` contenait des millions d'éléments, car on ne charge jamais tout d'un coup en mémoire.

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Python]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[PY-09-Comprehensions|Comprehensions Python]]

**Pratique :**
- Extrait de code → [[04_Snippets/py-generateurs]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Quel est l'avantage mémoire d'un générateur ?

---

## Tâches

- [ ] #task Créer un générateur qui lit un gros fichier ligne par ligne sans tout charger en mémoire
- [ ] #task Comparer la consommation mémoire d'une liste vs d'un générateur sur un grand volume de données
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Un générateur peut-il être "réinitialisé" pour être reparcouru depuis le début, ou faut-il toujours en recréer un nouveau ?
