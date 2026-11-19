---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[YAML]]"
  - "[[JSON]]"
tags:
  - exercice
---
# Exercice — Lire et écrire du YAML

> [!info] Objectif
> Passer sans erreur d'un format à l'autre et repérer les pièges d'indentation.
> Notions : [[YAML]] · [[JSON]]

## Consignes
- [ ] Écris en JSON un objet décrivant ton script : nom, version, liste de 3 fichiers, et un objet `image` (nom, tag)
- [ ] Réécris-le en YAML avec un commentaire
- [ ] Vérifie le YAML avec Python : `python3 -c "import yaml,sys; print(yaml.safe_load(open(sys.argv[1])))" fichier.yml` (après `pip install pyyaml`)
- [ ] Décale volontairement une ligne d'indentation et observe ce qui change
- [ ] Écris `tag: 3.10` sans guillemets et regarde la valeur lue

> [!question]- Indice
> En YAML, les listes commencent par `- ` et l'imbrication se fait avec 2 espaces. `3.10` est lu comme un nombre.

> [!question]- Solution
> ```yaml
> # description du script
> nom: zipper
> version: 1
> fichiers:
>   - a.png
>   - b.png
>   - c.png
> image:
>   nom: python
>   tag: "3.12-slim"
> ```
> `tag: 3.10` sans guillemets est lu `3.1` (un nombre) : toujours mettre les versions entre guillemets.

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
