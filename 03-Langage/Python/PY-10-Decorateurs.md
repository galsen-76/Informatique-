---
created: 2026-09-14
modified: 2026-09-14
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: Optionnel
aliases:
  - "Décorateurs Python"
tags:
  - backend/python/decorateurs
parent: "[[Python]]"
children: []
related_theory:
  - "[[PY-04-Fonctions|Fonctions Python]]"
related_snippets:
  - "[[04_Snippets/py-decorateurs]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.python.org/3/glossary.html#term-decorator"
---

# Décorateurs Python

> [!abstract] Introduction
> Un décorateur est une fonction qui "enveloppe" une autre fonction pour lui ajouter un comportement supplémentaire (mesurer le temps, vérifier des droits, logger un appel...), sans modifier le code de la fonction d'origine.

---

## Théorie

> [!question]- C'est quoi ?
> ```python
> def mon_decorateur(fonction):
>     def wrapper():
>         print("Avant l'appel")
>         fonction()
>         print("Après l'appel")
>     return wrapper
>
> @mon_decorateur
> def dire_bonjour():
>     print("Bonjour !")
>
> dire_bonjour()
> # Avant l'appel
> # Bonjour !
> # Après l'appel
> ```
>
> > [!note] Ce que fait `@mon_decorateur`
> > Le `@` juste au-dessus d'une fonction dit à Python "remplace cette fonction par la version décorée". C'est équivalent à écrire `dire_bonjour = mon_decorateur(dire_bonjour)` — mais en plus lisible.

> [!question]- Pourquoi l'utiliser ?
> Sans décorateur, si on veut ajouter le même comportement (ex : mesurer le temps d'exécution) à 10 fonctions différentes, il faudrait copier-coller ce code dans chacune. Un décorateur centralise ce comportement additionnel en un seul endroit, réutilisable sur n'importe quelle fonction.

> [!question]- Comment ça marche ?
> **Décorateur avec mesure de temps (cas d'usage réel) :**
> ```python
> import time
>
> def chronometrer(fonction):
>     def wrapper(*args, **kwargs):
>         debut = time.time()
>         resultat = fonction(*args, **kwargs)
>         duree = time.time() - debut
>         print(f"{fonction.__name__} a pris {duree:.4f} secondes")
>         return resultat
>     return wrapper
>
> @chronometrer
> def calcul_lourd(n):
>     return sum(range(n))
>
> calcul_lourd(1000000)
> # calcul_lourd a pris 0.0123 secondes
> ```
> > [!note] Pourquoi `*args, **kwargs` dans le `wrapper` ?
> > Ça permet au décorateur de fonctionner sur N'IMPORTE QUELLE fonction, peu importe le nombre d'arguments qu'elle prend — le `wrapper` transmet fidèlement tout ce qu'il reçoit à la fonction d'origine.
>
> **Décorateurs intégrés à Python (très courants) :**
> ```python
> class Film:
>     def __init__(self, titre, annee):
>         self._annee = annee
>
>     @property
>     def age(self):
>         return 2026 - self._annee
> ```
> > [!note] C'est quoi `@property` ?
> > `@property` permet d'appeler une méthode comme si c'était un simple attribut, sans parenthèses : `film.age` au lieu de `film.age()`. Utile pour calculer une valeur dynamiquement tout en gardant une syntaxe simple.

> [!question]- Quand l'utiliser ?
> - Logger des appels de fonction, mesurer des performances
> - Vérifier des permissions avant d'exécuter une action (très courant dans les frameworks web comme Flask/FastAPI)
> - `@property` : exposer une valeur calculée comme un simple attribut

---

## Points clés

- `@decorateur` au-dessus d'une fonction = raccourci pour `fonction = decorateur(fonction)`
- Un décorateur est une fonction qui prend une fonction en argument et en retourne une nouvelle
- `*args, **kwargs` dans le `wrapper` permet au décorateur de fonctionner sur n'importe quelle signature de fonction
- `@property` est un décorateur intégré très courant pour créer des attributs calculés

---

## Paramètres / Configuration

| Élément | Description | Notes |
|-----------|-------------|-------|
| `@nom_decorateur` | Applique le décorateur à la fonction juste en dessous | — |
| `wrapper(*args, **kwargs)` | Fonction interne qui reçoit tous les arguments | Standard dans les décorateurs |
| `@property` | Transforme une méthode en attribut calculé | Intégré à Python |
| `functools.wraps` | Préserve le nom/documentation de la fonction d'origine | Bonne pratique, souvent oublié |

---

## Exemple minimal

```python
def journaliser(fonction):
    def wrapper(*args, **kwargs):
        print(f"Appel de {fonction.__name__} avec {args}")
        return fonction(*args, **kwargs)
    return wrapper

@journaliser
def ajouter_film(titre):
    print(f"Film ajouté : {titre}")

ajouter_film("Inception")
# Appel de ajouter_film avec ('Inception',)
# Film ajouté : Inception
```

> [!note] Ce que j'en retiens
> `ajouter_film` n'a jamais eu besoin d'écrire elle-même le `print` de journalisation — le décorateur `@journaliser` ajoute ce comportement automatiquement, de façon totalement séparée de la logique métier de la fonction.

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Python]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[TS-14-Decorators|TypeScript - Decorators]]

**Pratique :**
- Extrait de code → [[04_Snippets/py-decorateurs]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Que fait `functools.wraps` dans un décorateur ?

---

## Tâches

- [ ] #task Écrire un décorateur de chronométrage et l'appliquer à une fonction lente
- [ ] #task Utiliser `@property` sur une classe `Film` pour un attribut calculé
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Comment fonctionne un décorateur qui prend lui-même des arguments (ex : `@retry(3)`) ?
