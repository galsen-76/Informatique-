---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Annotations dans l'API CVAT]]"
tags:
  - exercice
  - mini-projet
---
# Réannoter 06 - Remplacer au lieu d'ajouter

> [!info] Où tu en es
> **Projet :** [[Projet - Réannoter un job CVAT depuis le graphe]]
> **Étape précédente :** [[Réannoter 05 - Les lignes de cote et les étiquettes]]
> **Cours :** [[Cours - Du graphe JSON aux annotations CVAT par l'API]] (parties 2 et 7)

## Le but
Lancer le script deux fois ne doit pas doubler les formes : avant d'ajouter, il supprime les anciennes **tuyau**, **ligne de cote** et **etiquette** de **ce folio**, et rien d'autre.

## Ce que tu fais
- [ ] `GET /api/jobs/{job_id}/annotations` : combien de `shapes` ?
- [ ] Garde seulement celles dont `frame` est ton folio **et** dont `label_id` est un des 3 labels
- [ ] Envoie-les avec `action=delete` (telles que le `GET` les a données), puis fais ton `create`
- [ ] Ajoute à la main un point de soudure sur le folio. Lance deux fois : le nombre de tuyaux reste-t-il le même ? La soudure est-elle toujours là ?

> [!warning] Le piège
> Filtrer seulement par `frame` efface aussi la soudure et le cartouche, qui ne reviendront jamais (ils ne sont pas dans le JSON).

> [!success] Ça marche si…
> Après deux lancements, même nombre de formes, et les autres labels sont intacts.

> [!quote] Mes notes
> _Ce que j'ai compris._

> [!question]- Indice
> Un ensemble d'ids : `ids = {id_tuyau, id_ligne, id_etiquette}`, puis `s["label_id"] in ids`.
