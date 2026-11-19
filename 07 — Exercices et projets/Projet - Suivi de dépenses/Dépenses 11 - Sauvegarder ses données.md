---
type: exercise
status: a-faire
niveau: 0
difficulty: facile
concepts:
  - "[[Archive tar et compression]]"
  - "[[Lien symbolique]]"
  - "[[Utilisateur et groupe]]"
tags:
  - exercice
  - mini-projet
---
# Dépenses 11 - Sauvegarder ses données

> [!info] Où tu en es
> **Projet :** [[Projet - Suivre ses dépenses en Python]] · **Niveau :** 0
> **Étape précédente :** [[Dépenses 10 - Un environnement propre]]
> **Notions appliquées ici :** [[Archive tar et compression]] · [[Lien symbolique]] · [[Utilisateur et groupe]]
> **Ordre :** pour chaque notion, je lis la fiche, je fais son dessin et ses exercices visuels, puis je fais le morceau de cette étape qui l'utilise.

## Le but
Tu gardes une sauvegarde de tes fichiers de dépenses et un raccourci vers le fichier du mois en cours, et tu vérifies qui a le droit de lire ces fichiers.

## Ce que tu fais
- [ ] Crée une archive compressée datée de `data/` (par exemple `sauvegarde-2026-11-19.tar.gz`), liste son contenu sans l'extraire, puis extrais-la dans un dossier de test
- [ ] Crée un lien symbolique `data/courant.csv` vers le fichier du mois, et lance l'outil sur le lien
- [ ] Regarde à quel utilisateur et à quel groupe appartiennent tes fichiers, et fais en sorte que seul toi puisses lire `data/`
- [ ] Piège : déplace le fichier du mois. Que devient le lien ? Répare-le
- [ ] Commit (sans l'archive)

> [!success] Ça marche si…
> `depenses data/courant.csv` marche, l'archive s'extrait à l'identique, et `ls -l data` montre que les autres utilisateurs n'ont aucun droit.

## Est-ce que j'ai compris ?
Demande à Claude de t'interroger, ou réponds en dessous.
1. Que fait `tar`, que fait `gzip` ?
2. Quelle différence entre un lien symbolique et une copie ?
3. Qui sont le propriétaire et le groupe d'un fichier, et à quoi servent-ils ?

> [!question]- Indice
> Les fiches [[Archive tar et compression]], [[Lien symbolique]] et [[Utilisateur et groupe]]. `ls -l` montre les liens, les propriétaires et les droits.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] Les notions de l'étape ont leurs trois cases (schéma, exercices visuels, fil rouge)
- [ ] J'ai répondu aux questions et Claude les a vérifiées
