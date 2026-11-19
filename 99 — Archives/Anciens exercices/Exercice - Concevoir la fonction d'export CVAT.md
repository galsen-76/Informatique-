---
type: exercise
status: a-faire
difficulty: difficile
concepts:
  - "[[Architecture hexagonale]]"
  - "[[Architecture événementielle]]"
  - "[[Serverless et FaaS]]"
  - "[[Passerelle d'API (API gateway)]]"
tags:
  - exercice
---
# Exercice — Concevoir la fonction d'export CVAT

> [!info] Objectif
> Concevoir sur papier puis en code l'architecture de ta fonction Nuclio d'export, sans dépendre de CVAT dans le cœur.
> Notions : [[Architecture hexagonale]] · [[Architecture événementielle]] · [[Serverless et FaaS]] · [[Passerelle d'API (API gateway)]]

## Consignes
- [ ] Dessine (Mermaid ou papier) le cœur, ses ports et ses adaptateurs : entrée Nuclio, sortie CVAT, sortie stockage
- [ ] Écris `coeur/export.py` avec un `Protocol` `SourceAnnotations` et une fonction `exporter_png(source, tache_id)` sans aucun import de CVAT ni de Nuclio
- [ ] Écris un adaptateur `SourceFichier` qui lit un JSON, et un test `pytest` qui utilise ce faux
- [ ] Écris le `handler(context, event)` Nuclio qui assemble le tout, en chargeant le client dans `init_context`
- [ ] Explique en 3 phrases comment transformer l'appel direct en traitement par file de messages si l'export devient long
- [ ] Dis par où passe la requête du navigateur avant d'atteindre ta fonction (quel composant joue le rôle de passerelle)

> [!question]- Indice
> Le test doit tourner sans réseau : si tu as besoin de CVAT pour lancer `pytest`, le cœur dépend encore de la technique.
> Pour la file, pense : qui publie, quoi, qui consomme, et que renvoie la requête HTTP immédiatement ?

> [!question]- Solution
> Structure :
> ```
> export/
>   coeur/export.py        # Protocol + exporter_png, aucun import technique
>   adaptateurs/cvat.py    # SourceCvat (seul fichier qui importe cvat_sdk)
>   adaptateurs/fichier.py # SourceFichier pour les tests
>   main.py                # init_context + handler Nuclio
>   tests/test_export.py
> ```
> ```python
> # tests/test_export.py
> def test_export_png(tmp_path):
>     f = tmp_path / "a.json"; f.write_text('[{"type":"rectangle","points":[0,0,10,10]}]')
>     png = exporter_png(SourceFichier(f), tache_id=1)
>     assert png.startswith(b"\x89PNG")
> ```
> File : le bouton envoie `POST /api/export` → on publie `export.demande` et on répond `202` ; un travailleur consomme, produit le PNG, publie `export.termine` ; le front interroge l'état ou reçoit une notification.
> Passerelle : la requête passe par **Traefik**, qui la route vers le serveur CVAT ou la fonction Nuclio.

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
