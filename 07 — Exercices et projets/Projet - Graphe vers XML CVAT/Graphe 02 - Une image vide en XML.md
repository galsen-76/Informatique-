---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[XML]]"
  - "[[XML en Python (ElementTree)]]"
tags:
  - exercice
  - mini-projet
---
# Graphe 02 - Une image vide en XML

> [!info] Où tu en es
> **Projet :** [[Projet - Convertir le graphe en XML CVAT]]
> **Étape précédente :** [[Graphe 01 - Lire et explorer le JSON]]
> **Cours à avoir lu :** [[Cours - Du JSON au XML, convertir le graphe en annotations CVAT]] (parties 2 et 6)
> **Notions validées par cette étape :** [[XML]], [[XML en Python (ElementTree)]]

## Le but
Produire un premier `sortie.xml` qui contient la racine `<annotations>`, la `<version>` et une balise `<image>` **vide** avec les bonnes valeurs, prises dans le JSON.

## Ce que tu fais
- [ ] Crée la racine `annotations` et l'élément `version` avec le texte `1.1`
- [ ] Crée l'élément `image` en lui donnant directement le dictionnaire `graph["image"]` comme attributs. Écris le fichier : lis l'erreur. Pourquoi ne plante-t-il qu'au moment de l'écriture ?
- [ ] Corrige pour que chaque attribut soit une chaîne. Ouvre `sortie.xml` : tout est-il sur une seule ligne ? Ajoute les retraits
- [ ] Écris le fichier sans `encoding=` puis avec : regarde la première ligne à chaque fois
- [ ] Crée un `image` avec `ET.Element` au lieu de `ET.SubElement` : où est-il passé dans le fichier ? Remets `SubElement`
- [ ] Lance `comparer.py` : la première différence doit être le bloc `<meta>` qui manque (tu le feras à l'étape 05)

> [!warning] Le piège de cette étape
> En JSON, `800` est un nombre. En XML, **tout est texte** : ElementTree refuse un `int` et ne le dit qu'au moment de sérialiser (`TypeError: cannot serialize 800 (type int)`).

> [!success] Ça marche si…
> `sortie.xml` contient `<version>1.1</version>` et `<image id="0" name="iso_080.jpg" width="800" height="600" />`, avec des retraits.

> [!quote] Mes notes
> _Ce que j'ai compris, les erreurs rencontrées._

> [!question]- Indice
> Une compréhension de dictionnaire transforme toutes les valeurs d'un coup : `{cle: str(valeur) for cle, valeur in ...items()}`. Les retraits : `ET.indent(racine, space="  ")`.
