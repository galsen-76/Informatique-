---
type: exercise
status: a-faire
difficulty: difficile
concepts:
  - "[[Patron Adaptateur (Adapter)]]"
  - "[[Patron Décorateur (Decorator)]]"
  - "[[Patron Façade (Facade)]]"
  - "[[Patron Proxy]]"
  - "[[Patron Dépôt (Repository)]]"
tags:
  - exercice
---
# Exercice — Patrons structurels pour la fonction d'export

> [!info] Objectif
> Concevoir le cœur de ta future fonction Nuclio avec des patrons structurels, entièrement testable sans CVAT.
> Notions : [[Patron Adaptateur (Adapter)]] · [[Patron Décorateur (Decorator)]] · [[Patron Façade (Facade)]] · [[Patron Proxy]] · [[Patron Dépôt (Repository)]]

## Consignes
- [ ] Définis l'interface `SourceAnnotations` (`annotations(tache_id) -> list[Annotation]`)
- [ ] Écris `AdaptateurFichierJson` (lit un fichier exporté de CVAT) et `AdaptateurCvat` (enveloppe le SDK ; il peut rester un squelette si tu n'as pas encore d'accès)
- [ ] Écris un proxy `SourceAvecCache` qui garde les annotations 60 secondes
- [ ] Écris un décorateur `@reessayer(fois=3)` et applique-le à la méthode de l'adaptateur CVAT
- [ ] Écris une interface `DepotFichiers` avec une implémentation disque et une en mémoire
- [ ] Écris la façade `ServiceExportPng.exporter(tache_id)` qui enchaîne source, dessin (une fonction qui, pour l'instant, renvoie un texte) et dépôt
- [ ] Écris les tests de la façade avec l'adaptateur fichier et le dépôt en mémoire : aucun réseau, aucun disque
- [ ] Dessine (Mermaid, vertical) le schéma de tes objets

> [!question]- Indice
> Le test de la façade ne doit créer aucune vraie connexion : si un test a besoin d'Internet, une dépendance n'a pas été injectée.

> [!question]- Solution
> ```python
> class SourceAnnotations(Protocol):
>     def annotations(self, tache_id: int) -> list[Annotation]: ...
>
> class AdaptateurFichierJson:
>     def __init__(self, chemin): self.chemin = Path(chemin)
>     def annotations(self, tache_id):
>         brut = json.loads(self.chemin.read_text(encoding="utf-8"))
>         return [Annotation(s["label"], *s["points"][:2]) for s in brut["shapes"]]
>
> class SourceAvecCache:
>     def __init__(self, source, duree=60): self.source, self.duree, self.cache = source, duree, {}
>     def annotations(self, tache_id):
>         v, t = self.cache.get(tache_id, (None, 0.0))
>         if time.monotonic() - t > self.duree:
>             v = self.source.annotations(tache_id); self.cache[tache_id] = (v, time.monotonic())
>         return v
>
> class DepotMemoire:
>     def __init__(self): self.fichiers = {}
>     def enregistrer(self, nom, contenu): self.fichiers[nom] = contenu; return nom
>
> class ServiceExportPng:
>     def __init__(self, source, dessiner, depot): self.source, self.dessiner, self.depot = source, dessiner, depot
>     def exporter(self, tache_id):
>         return self.depot.enregistrer(f"tache-{tache_id}.png", self.dessiner(self.source.annotations(tache_id)))
>
> def test_export(tmp_path):
>     f = tmp_path / "a.json"
>     f.write_text('{"shapes": [{"label": "voiture", "points": [1, 2, 3, 4]}]}')
>     depot = DepotMemoire()
>     service = ServiceExportPng(SourceAvecCache(AdaptateurFichierJson(f)), lambda a: f"{len(a)} formes", depot)
>     assert service.exporter(12) == "tache-12.png"
>     assert depot.fichiers["tache-12.png"] == "1 formes"
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
