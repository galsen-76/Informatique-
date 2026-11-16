---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Format CVAT for images 1.1]]"
tags:
  - exercice
  - mini-projet
---
# Graphe 05 - Le bloc meta et la comparaison

> [!info] Où tu en es
> **Projet :** [[Projet - Convertir le graphe en XML CVAT]]
> **Étape précédente :** [[Graphe 04 - Les cotes et leurs étiquettes]]
> **Cours à avoir lu :** [[Cours - Du JSON au XML, convertir le graphe en annotations CVAT]] (partie 3) · [[Format CVAT for images 1.1]]
> **Notions validées par cette étape :** [[Format CVAT for images 1.1]]

## Le but
Ajouter le bloc `<meta>` (la déclaration des 3 labels) et obtenir **Identiques** avec `comparer.py`. Puis vérifier pour de vrai en important le fichier dans CVAT.

## Ce que tu fais
- [ ] Écris le bloc `<meta>` : tâche `iso_080_test`, taille 1, mode annotation, les 3 labels et leurs attributs. Ce bloc ne vient pas du JSON : d'où viennent ces valeurs ?
- [ ] Ajoute-le **après** `<image>` dans ton code et compare : l'ordre des balises compte-t-il ? Remets-le à sa place
- [ ] Les labels `tuyau` et `etiquette de cote` ont chacun un attribut déclaré : évite de recopier deux fois les mêmes 5 lignes
- [ ] Obtiens `Identiques`
- [ ] Bonus, la vraie preuve : dans ton CVAT local, crée une tâche avec les 3 labels et une image 800x600, puis Actions → Upload annotations → « CVAT 1.1 » avec `sortie.xml`. Les tuyaux, cotes et étiquettes apparaissent-ils au bon endroit ? Change une lettre d'un label dans le XML et réimporte : lis le message de CVAT

> [!warning] Le piège de cette étape
> Dans `<meta>` le type est `rectangle`, mais la forme s'appelle `<box>`. Et CVAT relie les formes aux labels **par leur nom exact** : une faute de frappe fait échouer l'import.

> [!success] Ça marche si…
> `python3 comparer.py attendu.xml sortie.xml` affiche `Identiques`.

> [!quote] Mes notes
> _Ce que j'ai compris, les erreurs rencontrées._

> [!question]- Indice
> Une petite fonction `ajouter_attribut_label(parent, nom, input_type, defaut, valeurs)` qui crée les 5 enfants. Une balise vide (`<values></values>`) : un `SubElement` dont `.text` vaut `""` ou rien.
