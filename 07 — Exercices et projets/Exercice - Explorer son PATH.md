---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[Variable PATH]]"
tags:
  - exercice
---
# Exercice — Explorer son PATH

> [!info] Objectif
> Comprendre comment le shell trouve les programmes, et le modifier.
> Notions : [[Variable PATH]]

## Consignes
- [ ] Affiche ton PATH dans Ubuntu, puis dans PowerShell. Quel séparateur chacun utilise-t-il ?
- [ ] Trouve où se trouvent `git`, `python3` et `ls` dans Ubuntu, puis `git` dans PowerShell
- [ ] Avec `type`, dis si `cd`, `ls` et `git` sont des commandes du shell, des alias ou des programmes
- [ ] Crée `~/outils/bonjour` qui affiche « Bonjour », rends-le exécutable, puis lance-le de trois façons : par son chemin absolu, par `./bonjour` depuis `~/outils`, et par son nom seul après avoir ajouté `~/outils` au PATH
- [ ] Ouvre un nouveau terminal : `bonjour` marche-t-il encore ? Rends l'ajout permanent
- [ ] Explique en une phrase pourquoi `archiver.sh` seul donne `command not found`

> [!question]- Indice
> Pour un script : une première ligne `#!/usr/bin/env bash`, puis `chmod +x`.
> Le fichier qui se lit à chaque ouverture de Bash est dans ton dossier personnel et commence par un point.

> [!question]- Solution
> ```bash
> echo $PATH                 # séparé par :
> which git python3 ls       # /usr/bin/git, /usr/bin/python3, /usr/bin/ls
> type cd ls git             # cd : intégrée au shell ; ls : souvent un alias de ls --color ; git : programme
> mkdir -p ~/outils
> printf '#!/usr/bin/env bash\necho "Bonjour"\n' > ~/outils/bonjour
> chmod +x ~/outils/bonjour
> ~/outils/bonjour                       # chemin absolu
> cd ~/outils && ./bonjour               # chemin relatif
> export PATH="$HOME/outils:$PATH"
> cd ~ && bonjour                        # par son nom
> echo 'export PATH="$HOME/outils:$PATH"' >> ~/.bashrc   # permanent
> ```
> ```powershell
> $env:Path              # séparé par ;
> Get-Command git
> ```
> Dans un nouveau terminal, sans la ligne dans `~/.bashrc`, `bonjour` est introuvable : `export` ne vaut que pour le terminal courant.
> `archiver.sh` seul est cherché dans les dossiers du PATH, et le dossier courant n'en fait pas partie.

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
