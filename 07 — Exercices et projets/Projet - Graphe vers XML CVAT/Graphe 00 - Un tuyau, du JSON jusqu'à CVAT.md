---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[XML en Python (ElementTree)]]"
  - "[[Format CVAT for images 1.1]]"
tags:
  - exercice
  - mini-projet
---
# Graphe 00 - Un tuyau, du JSON jusqu'à CVAT

> [!info] Où tu en es
> **Projet :** [[Projet - Convertir le graphe en XML CVAT]]
> **Cours à avoir lu :** [[Cours - Du JSON au XML, convertir le graphe en annotations CVAT]] (parties 1, 3 et 4)
> **Notions validées par cette étape :** [[XML en Python (ElementTree)]], [[Format CVAT for images 1.1]]

## Le but
Faire le chemin complet avec **un seul tuyau** : le script lit le JSON, écrit `sortie.xml` avec une polyline, puis l'importe dans ton job CVAT. Quand ça marche, les étapes suivantes ne font qu'ajouter des formes.

## Ce que tu fais
**1. Le XML**
- [ ] Charge `graph.json` et `modele.xml`, trouve `<image>` et enlève toutes ses formes
- [ ] Mets à jour `id`, `name`, `width`, `height` de `<image>` avec `graph["image"]`
- [ ] Prends **seulement** `graph["pipe_edges"][0]` et ajoute une `<polyline label="tuyau">` avec ses `points` et son `<attribute name="debut">`
- [ ] Écris `sortie.xml` et ouvre-le : une seule polyline dans `<image>`, avec `points="100.00,400.00;300.00,284.53"`

**2. L'import dans CVAT**
- [ ] Choisis le job d'où vient ce JSON (l'image `iso_080.jpg` doit en faire partie, avec le même numéro de frame que `id`)
- [ ] Dans le script, connecte-toi avec le SDK (identifiants lus dans ton `.env`), récupère le job et importe `sortie.xml` au format `"CVAT 1.1"`
- [ ] Ouvre le job dans CVAT : le tuyau est-il là, au bon endroit, avec `debut` coché ? Que sont devenues les autres annotations du job ?
- [ ] Mets un faux `id` d'image dans `sortie.xml` et réimporte : lis l'erreur

> [!warning] Les pièges de cette étape
> - Supprimer les formes en parcourant `image` directement en saute une sur deux : parcours `list(image)`.
> - Tout ce qui va dans `.set()` ou un dictionnaire d'attributs doit être une chaîne.
> - L'import **remplace** par défaut toutes les annotations du job. Fais tes essais sur un job de test.

> [!success] Ça marche si…
> Après `python3 convertir.py`, le job affiche un seul tuyau, de (100, 400) à (300, 284.53), avec `debut` coché.

> [!quote] Mes notes
> _Ce que j'ai compris, les erreurs rencontrées._

> [!question]- Indice
> ```python
> from cvat_sdk import make_client
> with make_client(host, credentials=(user, password)) as client:
>     job = client.jobs.retrieve(job_id)
>     # job.import_annotations(nom_du_format, chemin_du_fichier)
> ```
> `import_annotations` accepte aussi `import_mode="append"` pour **ajouter** au lieu de remplacer (présent dans le SDK récent, à tester sur ton serveur 2.81). Voir [[SDK]].
