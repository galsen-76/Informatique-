---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[Exception]]"
  - "[[Variable d'environnement]]"
  - "[[Module et import Python]]"
  - "[[Code de sortie]]"
tags:
  - exercice
  - mini-projet
---
# Exercice - Provoquer et lire des erreurs

> [!info] Où tu en es
> **Fiches à avoir lues :** [[Fiche - Lire un message d'erreur]] et [[Fiche - Aide-mémoire des erreurs fréquentes]]
> **But :** construire un petit programme, le **casser exprès** de plusieurs façons, lire chaque erreur **avant** de corriger, puis le réparer. Tu dois pouvoir lire n'importe quelle erreur en appliquant la méthode, pas de mémoire.

## Le projet : `mini-rapport`
Un script qui lit une liste de tâches dans un fichier JSON et affiche un résumé. Il prend son **nom d'équipe** dans une variable d'environnement, comme ta fonction Nuclio prend son token.

```text
mini-rapport/
├── config.py        # lit EQUIPE dans l'environnement
├── rapport.py       # lit taches.json, affiche le résumé
├── taches.json
├── requirements.txt
└── Dockerfile
```

## Étape 1 : le faire marcher
- [ ] `taches.json` : une liste de 3 objets `{"titre": ..., "statut": "fait" | "a-faire", "heures": 2}`
- [ ] `config.py` : `EQUIPE = os.environ["EQUIPE"]`
- [ ] `rapport.py` : importe `EQUIPE` depuis `config`, lit le JSON avec `pathlib` et `json`, affiche `Équipe X : 2 tâches faites sur 3, 7 heures au total`
- [ ] Lancer : `EQUIPE=CVAT python rapport.py`

## Étape 2 : le casser, une erreur à la fois
Pour **chaque** cas : provoque l'erreur, **remplis la ligne du carnet** (plus bas) **avant** de corriger, puis corrige et relance.

- [ ] **A.** Lance `python rapport.py` sans `EQUIPE=...`
- [ ] **B.** Dans `rapport.py`, écris `print(totl)` au lieu de `print(total)`
- [ ] **C.** Ajoute `import requests` dans `rapport.py` et lance-le dans un venv **neuf** où rien n'est installé
- [ ] **D.** Renomme `taches.json` en `tache.json` sans changer le code
- [ ] **E.** Dans le JSON, mets `"heures": "2"` (texte) pour une tâche
- [ ] **F.** Dans le JSON, enlève la clé `"statut"` d'une tâche
- [ ] **G.** Supprime la virgule entre deux objets du JSON (l'erreur vient de la bibliothèque `json` : où est **ta** ligne ?)
- [ ] **H.** Dans le terminal : `read -s mon-equipe`
- [ ] **I.** Lance `./rapport.py` (sans `python`) : deux erreurs possibles selon les droits du fichier, provoque les deux

## Étape 3 : la même chose dans Docker
- [ ] `Dockerfile` à partir de l'image Python du Nexus, qui copie le dossier et installe `requirements.txt` (vide pour l'instant)
- [ ] Garde `import requests` : construis, lance, et retrouve l'erreur **dans la sortie du conteneur**
- [ ] Corrige `requirements.txt`, reconstruis : nouvelle erreur, `EQUIPE` manque. Passe-la avec `docker run -e EQUIPE=CVAT ...`
- [ ] Lance le conteneur en arrière-plan avec `-d` et une erreur, puis retrouve l'erreur avec `docker logs` filtré par `grep`

## Carnet d'erreurs
Une ligne par cas. **À remplir avant de corriger.**

| Cas | Type d'erreur | Fichier et ligne de MON code | Qui corriger (code, données, environnement, commande) | Ma correction |
|---|---|---|---|---|
| A | | | | |
| B | | | | |
| C | | | | |
| D | | | | |
| E | | | | |
| F | | | | |
| G | | | | |
| H | | | | |
| I | | | | |
| Docker 1 | | | | |
| Docker 2 | | | | |

> [!question]- Indice (seulement si tu bloques sur une lecture)
> - Remonte le traceback depuis le bas et arrête-toi au premier fichier qui est à toi.
> - Pour G, la trace passe par `json/decoder.py` : ce n'est pas ton fichier. Le message donne aussi `line … column …` : c'est une position **dans le JSON**, pas dans le Python.
> - Pour I, regarde `ls -l rapport.py` et la première ligne du fichier (le *shebang*, `#!/usr/bin/env python3`).

## Pour aller plus loin
- [ ] Dans `config.py`, remplace `os.environ["EQUIPE"]` par `os.environ.get("EQUIPE")` et relance le cas A : où l'erreur apparaît-elle maintenant, et est-elle plus claire ou moins claire ?
- [ ] Ajoute une vraie erreur que tu as rencontrée au travail dans [[Erreurs et solutions]], avec le modèle **Erreur**

## Validation
- [ ] Les 11 lignes du carnet sont remplies **avant** chaque correction
- [ ] Pour chaque cas, je sais dire en une phrase : type, ma ligne, qui corriger
- [ ] Le programme marche à nouveau, en local et dans Docker
