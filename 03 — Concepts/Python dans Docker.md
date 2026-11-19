---
type: concept
domain: devops
module: "[[Module 13 - Docker]]"
status: en-cours
level: debutant
niveau: 1
schema: false
exercice_visuel: false
fil_rouge: false
prerequisites:
  - "[[Dockerfile]]"
  - "[[Volume Docker]]"
  - "[[Gestionnaire de paquets]]"
parents: []
related:
  - "[[Arguments de ligne de commande]]"
next_review: 
tags:
  - concept
  - devops
---
# Python dans Docker

> [!info] En une phrase
> Emballer un script Python et ses dépendances dans une image, puis le lancer dans un conteneur sur des fichiers montés.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
On part d'une image officielle `python:<version>-slim`, on y installe les dépendances de `requirements.txt`, on copie le script, et on déclare comment le lancer (`ENTRYPOINT` ou `CMD`). Les fichiers à traiter arrivent par un [[Volume Docker]], les paramètres par des arguments ou des [[Variable d'environnement|variables d'environnement]].

### Pourquoi ça existe
Le script tourne avec la même version de Python et les mêmes paquets partout : ton poste, la CI, le serveur, sans venv ni installation.

### Le problème résolu
« Il me manque requests », « j'ai Python 3.8 » : l'image embarque tout.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  P[python slim] --> R[requirements]
  R --> S[script]
  S --> I[Image]
  I --> C[Conteneur]
```

### Exemple concret
```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY zipper.py .
ENTRYPOINT ["python", "zipper.py"]
```
```bash
docker build -t mon-zipper .
docker run --rm -v "$PWD/donnees:/data" mon-zipper /data --sortie /data/export.zip
```
Avec `ENTRYPOINT`, tout ce qui suit le nom de l'image devient **arguments du script**.

| Instruction | Rôle ici |
| --- | --- |
| `ENTRYPOINT` | la commande fixe : `python zipper.py` |
| `CMD` | des arguments par défaut, remplacés par ceux de `docker run` |
| `ENV PYTHONUNBUFFERED=1` | affiche les `print` tout de suite dans les logs |

Ajoute un `.dockerignore` (`.venv`, `__pycache__`, `.git`, données de test) pour ne pas tout copier dans l'image.

### Cas d'utilisation
- Ton script de zip, lancé sur un dossier
- Un job de CI qui utilise `image: python:3.12-slim`

> [!warning] À ne pas confondre
> `ENTRYPOINT` (ce qu'on lance toujours) et `CMD` (valeurs par défaut, remplaçables). Et les chemins : dans le conteneur, c'est `/data`, pas `C:\...`. Derrière un proxy, `FROM` et `pip install` passent souvent par un registre ou un miroir interne.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] 🛣️ Suis le trajet
> Dessine le conteneur de l'API : le code copié dans `/app`, les paquets installés, uvicorn lancé, le port publié vers ton PC.

> [!example] 🔄 Change de contexte
> Tu as dessiné une API lancée par uvicorn. Redessine-le pour un script qui tourne une fois puis s'arrête : qu'est-ce qui change dans le conteneur ?

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Python dans Docker » et je l'intègre ici avec `![[Schéma - Python dans Docker.excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- [[MesDépenses 02 - L'API dans Docker]]
- [[Fil rouge 02 - Écrire le Dockerfile]]

## 4 · Relier
- **Au travail** : [[Python dans Docker au travail]]
- **Prérequis** : [[Dockerfile]] · [[Volume Docker]] · [[Gestionnaire de paquets]]
- **Complémentaires** : [[Arguments de ligne de commande]]
- **Utilisé par** : [[Tester l'image, pas le dépôt]]
- **Commandes** : [[docker build]] · [[docker run]]

## 5 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation (compris, puis maîtrisé)
Trois cases à cocher dans les propriétés de la fiche :
- `schema` : mon dessin du concept est dans « Mon schéma » ;
- `exercice_visuel` : j'ai fait et corrigé les exercices visuels de la section 3 ;
- `fil_rouge` : je l'ai appliqué dans le fil rouge (coché tout seul quand une étape qui l'utilise est réussie).

Les trois cochées : la notion compte comme **comprise**. **Maîtrisé** : c'est moi qui le mets dans `status`, quand je le sens.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
