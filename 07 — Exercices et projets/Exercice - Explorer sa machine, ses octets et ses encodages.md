---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[Binaire et octet]]"
  - "[[Processeur, mémoire et disque]]"
  - "[[Encodage des caractères]]"
tags:
  - exercice
---
# Exercice — Explorer sa machine, ses octets et ses encodages

> [!info] Objectif
> Relier ce qu'on voit à l'écran à ce qui se passe dans la machine.
> Notions : [[Binaire et octet]] · [[Processeur, mémoire et disque]] · [[Encodage des caractères]]

## Consignes
- [ ] Relève cœurs, RAM et disque de ton PC et de WSL ; explique pourquoi WSL en voit moins
- [ ] Convertis 13, 200 et 255 en binaire et en hexadécimal, à la main puis en Python
- [ ] Affiche les 16 premiers octets d'un PNG et d'un fichier texte avec `xxd` : que remarques-tu au début du PNG ?
- [ ] Écris « Café » dans un fichier en UTF-8, compte ses octets, relis-le en Latin-1 et explique le résultat
- [ ] Calcule combien de temps prend le téléchargement d'un fichier de 1 Go avec une connexion à 100 Mb/s

> [!question]- Indice
> `bin()`, `hex()`, `xxd -l 16 fichier`, `Path(...).write_text(..., encoding="utf-8")`, `len(b)`. 100 Mb/s ≈ 12,5 Mo/s.

> [!question]- Solution
> ```bash
> nproc ; free -h ; df -h /
> xxd -l 16 image.png      # 89 50 4e 47 = « .PNG » : la signature du format
> ```
> ```python
> print(bin(13), bin(200), bin(255), hex(200))   # 0b1101 0b11001000 0b11111111 0xc8
> from pathlib import Path
> Path("cafe.txt").write_text("Café", encoding="utf-8")
> b = Path("cafe.txt").read_bytes(); print(len(b))  # 5 : é prend 2 octets
> print(b.decode("latin-1"))                         # CafÃ©
> ```
> 1 Go = 1000 Mo ÷ 12,5 Mo/s ≈ 80 secondes.

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
