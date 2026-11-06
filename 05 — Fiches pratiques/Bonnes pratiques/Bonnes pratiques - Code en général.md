---
type: bonnes-pratiques
sujet: "Code en général"
concepts:
  - "[[Fonction]]"
  - "[[Séparation des responsabilités]]"
  - "[[Principes DRY, KISS et YAGNI]]"
  - "[[Refactorisation]]"
  - "[[Exception]]"
tags:
  - bonnes-pratiques
---
# Bonnes pratiques - Code en général

> [!info] À quoi sert cette fiche
> Les règles qui valent dans tous les langages : écrire du code qu'on comprend encore dans six mois, et que les autres peuvent modifier sans peur.
> Chaque règle dit **pourquoi** : c'est la raison qui compte, pour savoir l'adapter quand la situation change.

## À faire

### 1. Nommer pour dire l'intention
Un bon nom évite un commentaire. `fichiers_a_zipper` dit ce que contient la variable, `l` ou `data` non. Une fonction se nomme par un verbe (`calculer_total`), un booléen par une question (`est_valide`, `a_des_erreurs`).

```python
# non
d = [f for f in l if f[1] > 0]
# oui
fichiers_non_vides = [f for f in fichiers if f.taille > 0]
```

### 2. Une fonction, une seule tâche
Une fonction courte (moins de 20 à 30 lignes) qui fait une chose se comprend, se teste et se réutilise. Si tu dois mettre « et » dans son nom, découpe-la. Voir [[Séparation des responsabilités]].

### 3. Faire simple d'abord
La solution la plus simple qui marche est presque toujours la meilleure (KISS). On optimise seulement quand on a **mesuré** un problème. Voir [[Principes DRY, KISS et YAGNI]].

### 4. Retourner tôt
Traiter les cas d'erreur ou les cas simples en premier, puis sortir. Le cas principal reste à gauche, sans cinq niveaux d'indentation.

```python
def exporter(tache):
    if tache is None:
        return None
    if not tache.annotations:
        return []
    # cas principal, sans imbrication
    ...
```

### 5. Commenter le pourquoi, pas le quoi
Le code dit ce qu'il fait ; le commentaire explique **pourquoi** on l'a fait ainsi (une contrainte, un bug contourné, un choix).

```python
# non : incrémente i
i += 1
# oui : CVAT compte les images à partir de 1, pas de 0
numero = index + 1
```

### 6. Échouer tôt et clairement
Vérifier les entrées au début et lever une erreur précise (« dossier introuvable : /data ») plutôt que de laisser le programme planter plus loin avec un message incompréhensible.

### 7. Une seule source de vérité
Une valeur (URL, chemin, limite) est définie à un seul endroit, dans la configuration ou une constante, jamais recopiée.

### 8. Laisser le code un peu plus propre qu'on ne l'a trouvé
À chaque passage, une petite amélioration (un nom, une fonction extraite). Mais dans un commit séparé de la fonctionnalité. Voir [[Refactorisation]].

## À éviter

### 1. Les nombres et chaînes magiques
**Pourquoi c'est un problème :** `if statut == 3` : personne ne sait ce que vaut 3, et il faut le changer partout.
**À la place :** une constante nommée (`STATUT_TERMINE = 3`) ou une énumération.

### 2. Le copier-coller
**Pourquoi c'est un problème :** une correction faite à un endroit est oubliée dans les copies ; les bugs se multiplient.
**À la place :** une fonction, dès la deuxième ou troisième répétition.

### 3. Le code mort et commenté
**Pourquoi c'est un problème :** du code désactivé « au cas où » encombre et trompe le lecteur.
**À la place :** le supprimer : Git le garde dans l'historique si on en a besoin.

### 4. Ignorer les erreurs
**Pourquoi c'est un problème :** un `except: pass` ou un `catch {}` vide cache les problèmes jusqu'à ce qu'ils deviennent graves.
**À la place :** traiter l'erreur, ou la journaliser et la relancer.

### 5. Les variables globales modifiées partout
**Pourquoi c'est un problème :** n'importe quelle fonction peut changer la valeur ; impossible de savoir qui a fait quoi.
**À la place :** passer les valeurs en paramètres et renvoyer les résultats.

### 6. Optimiser trop tôt
**Pourquoi c'est un problème :** code compliqué pour un gain que personne ne verra.
**À la place :** écrire simple, mesurer, optimiser seulement le point qui pose problème.

## Avant de valider mon travail
- [ ] Les noms disent ce que contiennent les variables et ce que font les fonctions
- [ ] Aucune fonction ne fait plusieurs choses sans rapport
- [ ] Pas de valeur magique, pas de copier-coller
- [ ] Les erreurs sont traitées ou remontées, jamais avalées
- [ ] Le code a été relu une fois, à froid, avant le commit

## Notions liées
[[Fonction]] · [[Séparation des responsabilités]] · [[Principes DRY, KISS et YAGNI]] · [[Refactorisation]] · [[Exception]]
