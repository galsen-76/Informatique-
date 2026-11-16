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
# Graphe 04 - Remplacer les annotations du job

> [!info] Où tu en es
> **Projet :** [[Projet - Convertir le graphe en XML CVAT]]
> **Étape précédente :** [[Graphe 03 - Les cotes et leurs étiquettes]]
> **Notions validées par cette étape :** [[Format CVAT for images 1.1]]

## Le but
Faire l'aller-retour complet et le vérifier : **export du job** (XML) → `replication` (JSON) → ton script (XML) → **import dans le même job**, au format CVAT 1.1, en remplaçant ses annotations.

## Ce que tu fais
- [ ] `python3 comparer.py attendu.xml sortie.xml` doit afficher `Identiques`. Sinon, corrige la première différence
- [ ] Le test de l'aller-retour : compare le XML **exporté** du job (avant `replication`) avec ton `sortie.xml`. Hors `<meta>`, que trouves-tu ? Si une forme diffère, est-ce ton script ou `replication` qui l'a changée ?
- [ ] Le nom de la tâche (`iso_080_test`) ne vient pas du JSON : fais-en un paramètre du script et change-le dans `<meta>`
- [ ] Le job contient-il d'autres labels que tuyau et cote ? Ajoute une forme d'un autre label dans CVAT, relance tout : a-t-elle survécu à l'import ? Si non, adapte le vidage de `<image>` pour n'enlever que les formes `tuyau`, `ligne de cote` et `etiquette de cote`
- [ ] Change une lettre d'un label dans `sortie.xml` et réimporte : lis le message de CVAT

> [!warning] Le piège de cette étape
> L'import **remplace tout le job** : ce qui n'est pas dans ton XML disparaît. Et CVAT relie chaque `<image>` à une frame du job par son `id` et son `name` : garde ceux de l'export, ne les invente pas.

> [!success] Ça marche si…
> Après `python3 convertir.py`, le job affiche les 4 tuyaux, 3 lignes de cote et 3 étiquettes, et les annotations d'autres labels sont toujours là.

> [!quote] Mes notes
> _Ce que j'ai compris, les erreurs rencontrées._

> [!question]- Indice
> Le nom de la tâche est dans `meta/task/name` : `racine.find("meta/task/name").text = ...`. Pour ne garder que certaines formes : `if enfant.get("label") in LABELS_GRAPHE: image.remove(enfant)`.
