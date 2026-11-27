---
type: error
tool: Bash
date: 2026-11-12
concepts:
  - "[[Bash]]"
  - "[[Variable d'environnement]]"
tags:
  - erreur
---
# Erreur — bash read, not a valid identifier

> [!bug] Message
> ```text
> -bash: read: `<le texte collé>': not a valid identifier
> ```

## Contexte
Pour ranger un token dans une variable sans qu'il s'affiche, avec `read -s`.

## Lecture
Une erreur Bash se lit de gauche à droite, séparée par des deux-points :
`-bash` (qui parle) : `read` (quelle commande) : `` `…` `` (ce qui gêne) : `not a valid identifier` (pourquoi).
- **identifier** = un nom de variable. Bash dit : « ce que tu m'as donné n'est pas un nom valable ».
- **Qui corriger** : la commande tapée.

## Cause
`read` attend **le nom** de la variable (la boîte), pas sa **valeur** (le contenu). La valeur avait été collée sur la même ligne, ou à la place du nom. Un nom ne contient que lettres, chiffres et `_` : le `.` du texte collé le rend invalide.

## Solution
1. Taper `read -s ACCESS_TOKEN` puis **Entrée tout de suite**.
2. Coller la valeur (rien ne s'affiche, c'est normal), puis **Entrée**.
3. Vérifier sans afficher : `echo ${#ACCESS_TOKEN}` donne la longueur ; `0` = vide.

> [!warning] Si un secret a été affiché ou collé en clair
> Le considérer comme perdu : le **révoquer** et en créer un nouveau. Retirer la ligne de l'historique (`history -d <numéro>` puis `history -w`).

## Ce que j'ai appris
-

Méthode : [[Fiche - Lire un message d'erreur]]
