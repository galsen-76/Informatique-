---
type: project
status: a-faire
difficulty: facile
concepts:
  - "[[WSL]]"
  - "[[Bash]]"
  - "[[Redirection et pipe]]"
  - "[[Permissions Linux]]"
  - "[[Script shell]]"
  - "[[Gestionnaire de paquets]]"
tags:
  - exercice
---
# Exercice — Prendre en main WSL et Bash

> [!abstract] Mise en situation
> Un premier vrai parcours dans WSL : installer, créer, chercher, écrire un script et le lancer.
> Elle mélange plusieurs notions : fais-la **après** les exercices de chacune. Elle ne compte pas dans la validation de la maîtrise.

> [!info] Objectif
> Faire tout un petit travail dans Linux, sans souris et sans PowerShell une fois entré dans WSL.
> Notions : [[WSL]] · [[Bash]] · [[Redirection et pipe]] · [[Permissions Linux]] · [[Script shell]] · [[Gestionnaire de paquets]]

## Consignes
- [ ] Depuis PowerShell, vérifie que ta distribution est en WSL 2, puis entre dedans
- [ ] Vérifie qui tu es, où tu es, et quelle distribution tourne
- [ ] Mets à jour la liste des paquets et installe `tree` et `zip`
- [ ] Crée `~/labo/donnees/` avec 3 fichiers `.png` vides, 2 `.txt` et un sous-dossier `photos/` contenant 1 `.png`
- [ ] Affiche l'arborescence de `~/labo` avec `tree`
- [ ] En **une ligne**, compte tous les `.png` (sous-dossiers compris)
- [ ] Écris « test » dans un des `.txt`, puis trouve dans quel fichier se trouve le mot avec une recherche
- [ ] Écris un script `~/labo/archiver.sh` qui zippe le dossier passé en argument et sort en erreur s'il n'existe pas
- [ ] Rends-le exécutable, lance-le sur `donnees`, puis sur un dossier inexistant, et affiche le code de sortie à chaque fois
- [ ] Ouvre `~/labo` dans l'Explorateur Windows **depuis Bash**, puis dans VS Code

> [!question]- Indice
> Les commandes utiles sont dans [[Cours - Bash, les commandes essentielles]], [[Cours - Linux, utilisateurs, permissions et paquets]] et [[Cours - Écrire un script shell]]. Pour compter : `find` puis un pipe vers une commande qui compte les lignes. Pour le code de sortie : `$?`.
> Créer des fichiers vides : [[touch]] ; écrire du texte dedans : [[echo]] avec `>` ; écrire le script : [[nano]] ou [[code]] ; compter : [[wc]].

> [!question]- Solution
> ```bash
> # PowerShell
> wsl -l -v ; wsl
> # Bash
> whoami ; pwd ; cat /etc/os-release
> sudo apt update && sudo apt install -y tree zip
> mkdir -p ~/labo/donnees/photos && cd ~/labo/donnees
> touch a.png b.png c.png notes.txt todo.txt photos/d.png
> tree ~/labo
> find ~/labo -name "*.png" | wc -l
> echo "test" > notes.txt ; grep -rl "test" ~/labo
> ```
> ```bash
> #!/usr/bin/env bash
> set -euo pipefail
> DOSSIER="${1:?Usage : ./archiver.sh <dossier>}"
> [ -d "$DOSSIER" ] || { echo "Introuvable : $DOSSIER" >&2; exit 1; }
> zip -r "$(basename "$DOSSIER").zip" "$DOSSIER"
> ```
> ```bash
> chmod +x ~/labo/archiver.sh ; cd ~/labo
> ./archiver.sh donnees ; echo $?
> ./archiver.sh nexistepas ; echo $?
> explorer.exe . ; code .
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
