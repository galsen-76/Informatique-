---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Journaliser avec logging]]"
  - "[[Lancer une commande (subprocess)]]"
  - "[[Expressions régulières (re)]]"
tags:
  - exercice
---
# Exercice — Un script qui journalise, lance des commandes et lit des logs

> [!info] Objectif
> Un petit outil d'exploitation : il vérifie l'environnement, journalise ce qu'il fait et analyse un log.
> Notions : [[Journaliser avec logging]] · [[Lancer une commande (subprocess)]] · [[Expressions régulières (re)]]

## Consignes
- [ ] Configure `logging` (format avec la date, niveau réglable par la variable `NIVEAU_LOG`)
- [ ] Avec subprocess, journalise la version de Git et le commit courant ; journalise un WARNING si Docker n'est pas disponible
- [ ] Crée un fichier `app.log` de test avec des lignes INFO, WARNING et ERROR contenant une date et un `code=NNN`
- [ ] Avec une regex, extrais de chaque ligne ERROR sa date et son code, et compte les erreurs par code
- [ ] Lance le script avec `NIVEAU_LOG=DEBUG` puis `NIVEAU_LOG=ERROR` et compare

> [!question]- Indice
> `subprocess.run([...], capture_output=True, text=True)` ; `FileNotFoundError` si le programme n'existe pas. Motif possible : `r"^(\S+ \S+) ERROR .*code=(\d+)"`.

> [!question]- Solution
> ```python
> import logging, os, re, subprocess
> from collections import Counter
>
> logging.basicConfig(level=os.environ.get("NIVEAU_LOG", "INFO"), format="%(asctime)s %(levelname)s %(message)s")
> log = logging.getLogger("outil")
>
> def lancer(*cmd):
>     try:
>         return subprocess.run(cmd, capture_output=True, text=True, check=True).stdout.strip()
>     except (FileNotFoundError, subprocess.CalledProcessError) as e:
>         log.warning("Commande impossible %s : %s", cmd, e)
>         return None
>
> log.info("Git : %s", lancer("git", "--version"))
> log.debug("Commit : %s", lancer("git", "rev-parse", "--short", "HEAD"))
> lancer("docker", "version")
>
> motif = re.compile(r"^(\S+ \S+) ERROR .*code=(\d+)")
> codes = Counter()
> for ligne in open("app.log", encoding="utf-8"):
>     if m := motif.search(ligne):
>         log.debug("Erreur le %s : %s", m.group(1), m.group(2))
>         codes[m.group(2)] += 1
> log.info("Erreurs par code : %s", dict(codes))
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
