---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Appeler une API HTTP (requests)]]"
  - "[[Lire et écrire du CSV]]"
  - "[[Dates et heures (datetime)]]"
tags:
  - exercice
---
# Exercice — Appeler une API et produire un CSV

> [!info] Objectif
> Récupérer des données d'une API publique et en faire un rapport daté ouvrable dans Excel.
> Notions : [[Appeler une API HTTP (requests)]] · [[Lire et écrire du CSV]] · [[Dates et heures (datetime)]]

## Consignes
- [ ] Avec requests, récupère la liste des dépôts publics d'un compte GitHub (`https://api.github.com/users/<compte>/repos`)
- [ ] Gère proprement un compte inexistant (404) et une absence de réseau (timeout)
- [ ] Pour chaque dépôt, garde : nom, langage, nombre d'étoiles, date de dernière mise à jour
- [ ] Écris le résultat dans `depots_<date du jour>.csv`, trié par étoiles
- [ ] Ouvre le fichier dans un tableur, puis relis-le en Python pour afficher les dépôts mis à jour depuis moins de 30 jours

> [!question]- Indice
> Les dates de l'API sont en ISO 8601 avec un `Z` final : `datetime.fromisoformat(d.replace("Z", "+00:00"))`. Compare avec `datetime.now(timezone.utc)`.

> [!question]- Solution
> ```python
> import csv, sys, requests
> from datetime import datetime, timedelta, timezone
>
> compte = sys.argv[1]
> try:
>     r = requests.get(f"https://api.github.com/users/{compte}/repos", timeout=10)
>     r.raise_for_status()
> except requests.RequestException as e:
>     sys.exit(f"Erreur : {e}")
>
> lignes = [{"nom": d["name"], "langage": d["language"], "etoiles": d["stargazers_count"],
>            "maj": d["updated_at"]} for d in r.json()]
> lignes.sort(key=lambda x: x["etoiles"], reverse=True)
>
> nom = f"depots_{datetime.now():%Y-%m-%d}.csv"
> with open(nom, "w", newline="", encoding="utf-8") as f:
>     w = csv.DictWriter(f, fieldnames=lignes[0].keys()); w.writeheader(); w.writerows(lignes)
>
> limite = datetime.now(timezone.utc) - timedelta(days=30)
> with open(nom, newline="", encoding="utf-8") as f:
>     for l in csv.DictReader(f):
>         if datetime.fromisoformat(l["maj"].replace("Z", "+00:00")) > limite:
>             print(l["nom"])
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
