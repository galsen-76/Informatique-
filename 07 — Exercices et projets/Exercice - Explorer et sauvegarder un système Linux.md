---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[Arborescence Linux]]"
  - "[[Lien symbolique]]"
  - "[[Archive tar et compression]]"
tags:
  - exercice
---
# Exercice — Explorer et sauvegarder un système Linux

> [!info] Objectif
> Se repérer dans un vrai système Linux et manipuler liens et archives.
> Notions : [[Arborescence Linux]] · [[Lien symbolique]] · [[Archive tar et compression]]

## Consignes
- [ ] Dans WSL, liste `/`, `/etc`, `/var/log` et écris le rôle de 6 dossiers
- [ ] Trouve où sont `python3` et `git`, et si ce sont des liens
- [ ] Trouve les 5 plus gros dossiers de `/usr` et la place libre du disque
- [ ] Crée `~/labo/app-v1` et `~/labo/app-v2` (un fichier `version.txt` chacun) et un lien `current` ; bascule de l'un à l'autre
- [ ] Archive `~/labo` en `.tar.gz`, liste son contenu, extrais-le dans `/tmp/restau` et vérifie que le lien est conservé

> [!question]- Indice
> `which`, `ls -l`, `du -sh /usr/* | sort -h | tail -5`, `df -h`, `ln -sfn`, `tar -czf / -tzf / -xzf -C`.

> [!question]- Solution
> ```bash
> ls / /etc /var/log
> which python3 git ; ls -l $(which python3)
> sudo du -sh /usr/* 2>/dev/null | sort -h | tail -5 ; df -h /
> mkdir -p ~/labo/app-v1 ~/labo/app-v2
> echo 1 > ~/labo/app-v1/version.txt ; echo 2 > ~/labo/app-v2/version.txt
> ln -sfn ~/labo/app-v1 ~/labo/current ; cat ~/labo/current/version.txt   # 1
> ln -sfn ~/labo/app-v2 ~/labo/current ; cat ~/labo/current/version.txt   # 2
> tar -czf labo.tar.gz -C ~ labo ; tar -tzf labo.tar.gz
> mkdir -p /tmp/restau && tar -xzf labo.tar.gz -C /tmp/restau && ls -l /tmp/restau/labo
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
