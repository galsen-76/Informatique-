---
type: project
status: a-faire
difficulty: facile
concepts:
  - "[[Noyau (kernel)]]"
  - "[[Système d'exploitation et noyau]]"
  - "[[Processus]]"
tags:
  - exercice
---
# Exercice — Observer le noyau au travail

> [!abstract] Mise en situation
> Observer les processus et le noyau sur ta propre machine.
> Elle mélange plusieurs notions : fais-la **après** les exercices de chacune. Elle ne compte pas dans la validation de la maîtrise.

> [!info] Objectif
> Voir de ses propres yeux que les programmes passent par le noyau, et faire la différence entre noyau, distribution et shell.
> Notions : [[Noyau (kernel)]] · [[Système d'exploitation et noyau]] · [[Processus]]

## Consignes
- [ ] Ouvre un terminal WSL. Lance `uname -r` et `cat /etc/os-release`. Note ce que dit chacun et explique la différence
- [ ] Lance `echo $0` : quel est ton shell ? Explique pourquoi ce n'est pas le noyau
- [ ] Lance `ps -p 1 -o pid,comm` : quel est le premier programme lancé par le noyau ?
- [ ] Installe strace : `sudo apt install -y strace`
- [ ] Lance `strace -c ls` : regarde le tableau des appels système faits par `ls`. Cite trois appels et devine leur rôle d'après leur nom
- [ ] Crée un fichier interdit : `sudo touch /root-secret && sudo chmod 600 /root-secret`, puis `strace -e trace=openat cat /root-secret`. Repère la ligne où le noyau refuse
- [ ] Lance `head -3 /proc/meminfo` : qui a « écrit » ce fichier ?
- [ ] Si Docker est installé : compare `uname -r` dans WSL et `docker run --rm alpine uname -r`. Explique le résultat
- [ ] Nettoie : `sudo rm /root-secret`

> [!question]- Indice
> `strace` affiche chaque demande faite au noyau sous la forme `nom(arguments) = résultat`. Un résultat négatif avec un code comme `EACCES` veut dire « refusé ».

> [!question]- Solution
> - `uname -r` donne la version du **noyau** (souvent avec `microsoft-standard-WSL2` dans le nom) ; `/etc/os-release` donne la **distribution** (Ubuntu 24.04…).
> - `echo $0` affiche `-bash` ou `bash` : le shell est un programme ordinaire lancé dans ta session, qui demande lui aussi au noyau.
> - PID 1 : `systemd` ou `init` (dans WSL parfois `init`) : le tout premier programme démarré par le noyau ; tous les autres en descendent.
> - `strace -c ls` : par exemple `openat` (ouvrir un fichier ou dossier), `getdents64` (lire le contenu d'un dossier), `write` (écrire à l'écran), `mmap` (réserver de la mémoire), `close`.
> - Fichier interdit : `openat(AT_FDCWD, "/root-secret", O_RDONLY) = -1 EACCES (Permission denied)` : c'est le **noyau** qui refuse, `cat` ne fait qu'afficher son refus.
> - `/proc/meminfo` n'existe pas sur le disque : le **noyau** le fabrique à la lecture pour décrire la mémoire.
> - Docker : les deux `uname -r` affichent **le même noyau**. Le conteneur Alpine n'a pas de noyau à lui, il utilise celui de WSL. Seuls les fichiers (la distribution) changent.

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
