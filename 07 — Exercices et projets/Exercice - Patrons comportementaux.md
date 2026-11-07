---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Patron Stratégie (Strategy)]]"
  - "[[Patron Observateur (Observer)]]"
  - "[[Patron Commande (Command)]]"
  - "[[Patron État (State)]]"
  - "[[Patron Chaîne de responsabilité]]"
  - "[[Patron Méthode modèle (Template Method)]]"
tags:
  - exercice
---
# Exercice — Patrons comportementaux

> [!info] Objectif
> Résoudre six petits problèmes, chacun avec le patron comportemental adapté.
> Notions : [[Patron Stratégie (Strategy)]] · [[Patron Observateur (Observer)]] · [[Patron Commande (Command)]] · [[Patron État (State)]] · [[Patron Chaîne de responsabilité]] · [[Patron Méthode modèle (Template Method)]]

## Consignes
- [ ] **Stratégie** : remplace un `if/elif` à trois branches qui calcule le nom d'une archive (par date, par tâche, par projet) par un dictionnaire de fonctions
- [ ] **Observateur** : écris un bus d'événements ; trois abonnés réagissent à `export_termine` (log, compteur, message) ; ajoute un désabonnement
- [ ] **Commande** : sur une liste de tâches en mémoire, écris `Ajouter`, `Supprimer`, `Renommer` avec `executer()` et `annuler()`, et un historique qui permet d'annuler trois fois
- [ ] **État** : modélise les états d'un job CVAT (annotation, validation, acceptance, terminé) avec une table de transitions ; teste deux transitions interdites
- [ ] **Chaîne de responsabilité** : écris une chaîne de filtres de fichiers (ignorer les cachés, garder les images, ignorer ceux de plus de 10 Mo) réordonnable
- [ ] **Méthode modèle** : écris une classe `Rapport` avec `generer()` qui appelle `entete()`, `corps()`, `pied()` ; deux sous-classes Markdown et texte
- [ ] Pour chaque problème, écris ce que tu aurais écrit sans le patron, et ce que le patron change

> [!question]- Indice
> Pour la commande `Supprimer`, garde l'élément supprimé **et sa position** pour pouvoir le remettre au même endroit.

> [!question]- Solution
> ```python
> NOMMAGE = {
>     "date":   lambda t: f"export-{date.today():%Y-%m-%d}.zip",
>     "tache":  lambda t: f"tache-{t['id']}.zip",
>     "projet": lambda t: f"{t['projet']}-{t['id']}.zip",
> }
>
> class Bus:
>     def __init__(self): self.abonnes = defaultdict(list)
>     def abonner(self, nom, f): self.abonnes[nom].append(f); return lambda: self.abonnes[nom].remove(f)
>     def emettre(self, nom, **d):
>         for f in list(self.abonnes[nom]): f(**d)
>
> @dataclass
> class Supprimer:
>     liste: list
>     index: int
>     retire: object = None
>     def executer(self): self.retire = self.liste.pop(self.index)
>     def annuler(self): self.liste.insert(self.index, self.retire)
>
> TRANSITIONS = {("annotation", "soumettre"): "validation", ("validation", "valider"): "acceptance",
>                ("validation", "rejeter"): "annotation", ("acceptance", "accepter"): "termine"}
>
> def chaine(*filtres):
>     def appliquer(fichiers):
>         for f in filtres: fichiers = [x for x in fichiers if f(x)]
>         return fichiers
>     return appliquer
> filtrer = chaine(lambda p: not p.name.startswith("."), lambda p: p.suffix in {".png", ".jpg"},
>                  lambda p: p.stat().st_size <= 10_000_000)
>
> class Rapport:
>     def generer(self, d): return "\n".join([self.entete(d), self.corps(d), self.pied(d)])
>     def pied(self, d): return ""
> class RapportMarkdown(Rapport):
>     def entete(self, d): return f"# {d['titre']}"
>     def corps(self, d): return "\n".join(f"- {x}" for x in d["lignes"])
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
