---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Design pattern]]"
  - "[[Patron Fabrique (Factory)]]"
  - "[[Patron Monteur (Builder)]]"
  - "[[Patron Singleton]]"
tags:
  - exercice
---
# Exercice — Patrons créationnels

> [!info] Objectif
> Pratiquer les trois patrons créationnels sur ton propre outil d'archivage.
> Notions : [[Design pattern]] · [[Patron Fabrique (Factory)]] · [[Patron Monteur (Builder)]] · [[Patron Singleton]]

## Consignes
- [ ] Écris deux archiveurs (zip et tar.gz) qui respectent une interface `Archiveur`
- [ ] Écris la fabrique `creer_archiveur(format)` ; un format inconnu lève une erreur qui liste les formats possibles
- [ ] Écris un monteur `RequeteBuilder("tache").ou(…).trier(…).limite(…).sql()` qui produit une requête SQL et refuse une limite négative
- [ ] Écris `config()` décorée par `@functools.cache` qui lit les variables d'environnement une seule fois ; vérifie avec `is` que deux appels renvoient le même objet
- [ ] Écris un test qui montre le problème du singleton : un test modifie la configuration, le suivant en hérite. Corrige en passant la configuration en paramètre
- [ ] Pour chacun des trois patrons, écris en une phrase le problème qu'il résout dans ton code

> [!question]- Indice
> Pour nettoyer un `@cache` entre deux tests : `config.cache_clear()`. Mais la vraie correction est de ne pas dépendre d'un état global.

> [!question]- Solution
> ```python
> ARCHIVEURS = {"zip": ArchiveurZip, "tar": ArchiveurTar}
> def creer_archiveur(format: str):
>     if format not in ARCHIVEURS:
>         raise ValueError(f"format inconnu : {format} (possibles : {', '.join(ARCHIVEURS)})")
>     return ARCHIVEURS[format]()
>
> class RequeteBuilder:
>     def __init__(self, table): self._t, self._ou, self._tri, self._lim = table, [], None, None
>     def ou(self, cond): self._ou.append(cond); return self
>     def trier(self, col): self._tri = col; return self
>     def limite(self, n):
>         if n < 0: raise ValueError("limite négative")
>         self._lim = n; return self
>     def sql(self):
>         s = f"SELECT * FROM {self._t}"
>         if self._ou: s += " WHERE " + " AND ".join(self._ou)
>         if self._tri: s += f" ORDER BY {self._tri}"
>         if self._lim is not None: s += f" LIMIT {self._lim}"
>         return s
>
> assert RequeteBuilder("tache").ou("fini = false").trier("nom").limite(10).sql() == \
>     "SELECT * FROM tache WHERE fini = false ORDER BY nom LIMIT 10"
>
> @functools.cache
> def config():
>     return {"url": os.environ.get("CVAT_URL", "http://localhost:8080"), "timeout": int(os.environ.get("TIMEOUT", "30"))}
> assert config() is config()
> ```
> (Ce monteur sert à comprendre le patron : dans un vrai programme, les valeurs viennent de paramètres SQL, jamais de texte collé.)

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
