---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[Format CVAT for images 1.1]]"
tags:
  - exercice
  - mini-projet
---
# Graphe 06 - Un fichier de référence exporté de CVAT

> [!info] Où tu en es
> **Projet :** [[Projet - Convertir le graphe en XML CVAT]]
> **Étape précédente :** [[Graphe 05 - Une fonction prête pour Nuclio]]
> **Fiche à avoir lue :** [[Format CVAT for images 1.1]] (partie « Les 9 formes, une par une »)
> **Notions validées par cette étape :** [[Format CVAT for images 1.1]]

## Le but
Avant de coder les 9 formes, avoir **la vérité** : un `reference_formes.xml` exporté par **ton** CVAT (v2.81), avec un exemple de chaque forme. C'est ton `attendu.xml` pour les étapes 07 et 08.

## Ce que tu fais
- [ ] Dans ton CVAT local, crée un projet ou une tâche avec 9 labels, un par type : `rectangle`, `polygon`, `polyline`, `points`, `ellipse`, `cuboid`, `mask`, `skeleton` (avec 2 points : `entree` et `sortie`), `tag`. Mets un attribut texte sur l'un d'eux
- [ ] Ajoute une image (n'importe laquelle) et dessine **une** forme de chaque type. Tourne le rectangle d'un petit angle
- [ ] Exporte en « CVAT for images 1.1 » et récupère `annotations.xml`. Renomme-le `reference_formes.xml`
- [ ] Lis-le avec la fiche à côté : coche chaque forme du tableau. Qu'est-ce qui diffère de la fiche (attributs en plus, ordre, `group_id`…) ? Note-le ci-dessous
- [ ] Dans le `rle` du masque, additionne les nombres : retrouves-tu `width × height` ?
- [ ] Regarde le bloc `<meta>` du squelette : qu'est-ce que `<parent>` et `<svg>` ?

> [!warning] Le piège de cette étape
> La fiche décrit le format en général ; ton export, c'est ce que **ta** version de CVAT écrit et relit vraiment. En cas de différence, c'est l'export qui a raison.

> [!success] Ça marche si…
> `reference_formes.xml` contient 8 formes et 1 tag, et tu as noté ce qui diffère de la fiche.

> [!quote] Mes notes
> _Différences trouvées entre la fiche et mon export._

> [!question]- Indice
> Le type d'un label se choisit à sa création (« Any » par défaut : choisis le bon type pour que le meta soit précis). Le squelette se dessine dans l'éditeur de label (bouton « Setup skeleton »).
