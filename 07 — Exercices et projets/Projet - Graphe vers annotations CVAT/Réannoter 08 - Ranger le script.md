---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Exception]]"
  - "[[Journaliser avec logging]]"
tags:
  - exercice
  - mini-projet
---
# Réannoter 08 - Ranger le script

> [!info] Où tu en es
> **Projet :** [[Projet - Réannoter un job CVAT depuis le graphe]]
> **Étape précédente :** [[Réannoter 07 - Les étiquettes tournées]]

## Le but
Un script propre, prêt à passer dans Nuclio : des fonctions courtes, pas de `print`, des erreurs claires.

## Ce que tu fais
- [ ] Une fonction par rôle : lire les labels, construire les formes (aucune requête dedans), remplacer dans CVAT
- [ ] Construis **toutes** les formes **avant** le `delete` : si le JSON est cassé, rien ne doit être effacé
- [ ] Supprime `"pipe_edges"` d'une copie du JSON et lance : lis l'erreur. Crée `GraphConversionError` avec un message en anglais qui dit ce qui manque
- [ ] Remplace les `print` par `logging` (puis `context.logger` dans Nuclio)

> [!success] Ça marche si…
> Le bon JSON réannote le folio ; le JSON cassé donne un message clair et ne supprime rien.

> [!quote] Mes notes
> _Ce que j'ai compris._

> [!question]- Indice
> `except (KeyError, TypeError) as exc: raise GraphConversionError(f"Invalid graph JSON: {exc!r}") from exc`.
