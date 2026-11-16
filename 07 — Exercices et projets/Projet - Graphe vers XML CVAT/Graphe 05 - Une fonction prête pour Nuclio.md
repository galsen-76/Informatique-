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
# Graphe 05 - Une fonction prête pour Nuclio

> [!info] Où tu en es
> **Projet :** [[Projet - Convertir le graphe en XML CVAT]]
> **Étape précédente :** [[Graphe 04 - Remplacer les annotations du job]]
> **Notions validées par cette étape :** [[Exception]], [[Journaliser avec logging]]

## Le but
Ranger ton script pour la fonction Nuclio : une fonction `graph_to_cvat_xml(graph: dict) -> bytes` qui ne fait **aucun** `print`, n'écrit **aucun** fichier, et remonte une erreur claire quand le JSON est mauvais. Le handler, lui, réimporte le XML dans le job, journalise et répond.

## Ce que tu fais
- [ ] Découpe : une fonction par bloc (image, tuyaux, cotes) et une fonction principale qui renvoie les **octets** du XML (`ET.tostring`), pas un fichier
- [ ] `import_annotations` du SDK veut un **chemin** de fichier : écris les octets dans un fichier temporaire (`tempfile`) juste le temps de l'import
- [ ] Garde un petit `if __name__ == "__main__":` qui lit `graph.json`, appelle ta fonction et écrit `sortie.xml`. `comparer.py` doit toujours dire `Identiques`
- [ ] Copie `graph.json` en `casse.json` et supprime la clé `"pipe_edges"`. Lance : lis la trace. Est-ce un message qu'un collègue comprendrait dans les logs Nuclio ?
- [ ] Crée ta propre exception (`GraphConversionError`) avec un message en anglais qui dit **quelle** clé manque, et lève-la depuis l'erreur d'origine (sans la perdre)
- [ ] Mets dans `casse.json` un `label_geometry` vide (`[]`) : quelle erreur sort de `min()` ? Fais-la passer par ta même exception
- [ ] Écris un mini handler factice `handler(context, event)` qui appelle ta fonction, journalise avec `context.logger` en cas d'erreur et renvoie un statut 400 avec le message ; s'il n'y a pas d'erreur, il importe le XML dans le job (`job_id` reçu dans la requête) et renvoie 200

> [!warning] Le piège de cette étape
> Attraper toutes les erreurs avec `except Exception: pass` cache les vrais problèmes. On attrape **les erreurs attendues** (clé absente, mauvais type, liste vide), on les transforme en une erreur claire, et on laisse le handler décider quoi répondre.

> [!success] Ça marche si…
> Le bon JSON donne toujours `Identiques`, et les deux JSON cassés donnent chacun un message en anglais qui nomme le problème, sans trace Python brute côté client.

> [!quote] Mes notes
> _Ce que j'ai compris, les erreurs rencontrées._

> [!question]- Indice
> `except (KeyError, TypeError, ValueError) as exc: raise GraphConversionError(f"Invalid graph JSON: {exc!r}") from exc`. Le `from exc` garde l'erreur d'origine dans la trace. En local, il n'y a pas de vrai `context` : fabrique-en un faux avec `types.SimpleNamespace(logger=logging.getLogger("test"))`. Voir [[Fiche - Lire un message d'erreur]].
