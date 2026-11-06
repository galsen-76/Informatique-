---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Séparation des responsabilités]]"
  - "[[Principes DRY, KISS et YAGNI]]"
  - "[[Refactorisation]]"
  - "[[Principes SOLID]]"
  - "[[Design pattern]]"
tags:
  - exercice
---
# Exercice — Refactoriser un script en couches

> [!info] Objectif
> Transformer ton script de zip (ou un script fourni) en code propre, testable et extensible, sans changer son comportement.
> Notions : [[Séparation des responsabilités]] · [[Principes DRY, KISS et YAGNI]] · [[Refactorisation]] · [[Principes SOLID]] · [[Design pattern]]

## Consignes
- [ ] Écris d'abord un test qui lance le script sur un dossier de test et vérifie le contenu de l'archive produite (test de comportement)
- [ ] Fais au moins cinq petites refactorisations (renommer, extraire une fonction, retirer une répétition, sortir la configuration), un commit chacune, tests verts entre chaque
- [ ] Sépare en trois modules : `cli.py` (arguments, affichage), `regles.py` (choix des fichiers, nom de l'archive, fonctions pures) et `stockage.py` (disque, zip)
- [ ] Écris des tests unitaires pour `regles.py`
- [ ] Ajoute une sortie au format `tar.gz` avec le patron stratégie : une interface `Archiveur` et deux implémentations ; ajouter un format ne doit pas modifier le code existant
- [ ] Relis le tout : supprime ce qui est « au cas où » (YAGNI)

> [!question]- Indice
> Le test de comportement peut utiliser `tmp_path` (pytest) et `zipfile.ZipFile(...).namelist()` pour vérifier le contenu.

> [!question]- Solution
> ```python
> # regles.py
> def choisir(noms: list[str], extensions: set[str]) -> list[str]:
>     return sorted(n for n in noms if Path(n).suffix.lower() in extensions and not n.startswith("."))
> def nom_archive(base: str, jour: date, ext: str) -> str:
>     return f"{base}-{jour:%Y-%m-%d}.{ext}"
>
> # stockage.py
> class Archiveur(Protocol):
>     extension: str
>     def ecrire(self, dossier: Path, noms: list[str], sortie: Path) -> None: ...
> class ArchiveurZip:
>     extension = "zip"
>     def ecrire(self, dossier, noms, sortie):
>         with zipfile.ZipFile(sortie, "w", zipfile.ZIP_DEFLATED) as z:
>             for n in noms: z.write(dossier / n, n)
> class ArchiveurTar:
>     extension = "tar.gz"
>     def ecrire(self, dossier, noms, sortie):
>         with tarfile.open(sortie, "w:gz") as t:
>             for n in noms: t.add(dossier / n, n)
> ARCHIVEURS = {"zip": ArchiveurZip(), "tar": ArchiveurTar()}
>
> # cli.py
> def main(argv=None):
>     a = parser.parse_args(argv)
>     arch = ARCHIVEURS[a.format]
>     noms = choisir([p.name for p in a.dossier.iterdir()], {".png", ".jpg"})
>     sortie = Path(nom_archive(a.dossier.name, date.today(), arch.extension))
>     arch.ecrire(a.dossier, noms, sortie)
>     print(f"{len(noms)} fichiers dans {sortie}")
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
