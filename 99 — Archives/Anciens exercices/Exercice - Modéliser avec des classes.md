---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[Classe et objet]]"
  - "[[Héritage et composition]]"
  - "[[Interface et polymorphisme]]"
tags:
  - exercice
---
# Exercice — Modéliser avec des classes

> [!info] Objectif
> Écrire ses premières classes en Python et sentir la différence entre héritage, composition et interface.
> Notions : [[Classe et objet]] · [[Héritage et composition]] · [[Interface et polymorphisme]]

## Consignes
- [ ] Écris une classe `Tache` (nom non vide, statut protégé, méthode `avancer()`, `__repr__`) et teste-la avec pytest
- [ ] Écris une `@dataclass` `Annotation(label, x, y)` et crée une liste de 5 annotations
- [ ] Écris une interface `Exporteur` (Protocol) et deux classes `ExporteurCsv` et `ExporteurJson`
- [ ] Écris `sauvegarder(exporteur, annotations, chemin)` et appelle-la avec les deux exporteurs
- [ ] Écris `ServiceExport` qui **contient** un exporteur (composition) ; change d'exporteur sans modifier la classe
- [ ] Écris une sous-classe `ExporteurCsvAvecEntete` qui utilise `super()`
- [ ] Pour chaque relation entre tes classes, écris « est un » ou « a un »

> [!question]- Indice
> Statut protégé : un attribut `_statut` et une `@property statut` en lecture seule ; seule `avancer()` le modifie.

> [!question]- Solution
> ```python
> from dataclasses import dataclass, asdict
> from typing import Protocol
> import json
>
> class Tache:
>     STATUTS = ("a-faire", "en-cours", "fini")
>     def __init__(self, nom: str):
>         if not nom.strip(): raise ValueError("nom vide")
>         self.nom, self._statut = nom, "a-faire"
>     @property
>     def statut(self): return self._statut
>     def avancer(self):
>         i = self.STATUTS.index(self._statut)
>         self._statut = self.STATUTS[min(i + 1, len(self.STATUTS) - 1)]
>     def __repr__(self): return f"Tache({self.nom!r}, {self._statut})"
>
> @dataclass
> class Annotation:
>     label: str
>     x: float
>     y: float
>
> class Exporteur(Protocol):
>     def exporter(self, annotations: list[Annotation]) -> str: ...
>
> class ExporteurCsv:
>     def exporter(self, a): return "\n".join(f"{x.label},{x.x},{x.y}" for x in a)
> class ExporteurJson:
>     def exporter(self, a): return json.dumps([asdict(x) for x in a])
> class ExporteurCsvAvecEntete(ExporteurCsv):                 # est un ExporteurCsv
>     def exporter(self, a): return "label,x,y\n" + super().exporter(a)
>
> class ServiceExport:                                        # a un exporteur
>     def __init__(self, exporteur: Exporteur): self.exporteur = exporteur
>     def lancer(self, a, chemin):
>         with open(chemin, "w", encoding="utf-8") as f: f.write(self.exporteur.exporter(a))
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
