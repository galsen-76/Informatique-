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
# Réannoter 06 - Une fonction prête pour Nuclio

> [!info] Où tu en es
> **Projet :** [[Projet - Réannoter un job CVAT depuis le graphe]]
> **Étape précédente :** [[Réannoter 05 - Remplacer au lieu d'ajouter]]
> **Notions validées par cette étape :** [[Exception]], [[Journaliser avec logging]]

## Le but
Ranger le script pour le handler Nuclio : des fonctions sans `print`, qui remontent des erreurs claires, et un handler qui reçoit `job_id`, réannote et répond.

## Ce que tu fais
- [ ] Sépare : `lire_labels`, `construire_formes(graph, labels)` (aucun appel réseau dedans), `remplacer(job_id, frame, formes)`
- [ ] Copie `graph.json` en `casse.json`, supprime `"pipe_edges"` : lis la trace. Crée `GraphConversionError` avec un message en anglais qui nomme la clé manquante
- [ ] Mets un `label_geometry` vide : quelle erreur sort de `min()` ? Fais-la passer par la même exception
- [ ] Écris `handler(context, event)` : en cas d'erreur, `context.logger` et une réponse 400 ; sinon 200 avec le nombre de formes remplacées
- [ ] Réfléchis : si le `delete` passe et que le `create` échoue, que reste-t-il sur le folio ? Construis toutes les formes **avant** le `delete`

> [!success] Ça marche si…
> Le bon JSON réannote le folio, et les JSON cassés donnent un message clair en anglais sans rien effacer.

> [!quote] Mes notes
> _Ce que j'ai compris, les erreurs rencontrées._

> [!question]- Indice
> `except (KeyError, TypeError, ValueError) as exc: raise GraphConversionError(...) from exc`. En local, un faux context : `types.SimpleNamespace(logger=logging.getLogger("test"))`.
