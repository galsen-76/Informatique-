---
type: concept
domain: terminal
module: "[[Module 02 - Terminal et environnement]]"
status: a-decouvrir
level: debutant
prerequisites:
  - "[[JSON]]"
parents: []
related:
  - "[[Pipeline GitLab CI]]"
  - "[[Docker Compose]]"
next_review: 
method: []
tags:
  - concept
  - terminal
---
# YAML

> [!info] En une phrase
> Un format de fichier texte pour écrire de la configuration lisible, où l'indentation donne la structure.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
**YAML** décrit des données avec trois briques : des **clés: valeurs**, des **listes** (lignes qui commencent par `- `) et l'**imbrication** par l'indentation (des espaces, jamais de tabulations). Fichiers `.yml` ou `.yaml`.

### Pourquoi ça existe
Écrire de la configuration que les humains lisent facilement, plus légère que [[JSON]].

### Le problème résolu
Les fichiers de configuration en JSON ou XML sont verbeux et sans commentaires ; YAML accepte les commentaires `#` et a peu de ponctuation.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  C[Clé] --> V[Valeur]
  C --> L[Liste]
  C --> D[Sous-clés]
```

### Exemple concret
```yaml
# un commentaire
nom: script-zip            # clé: valeur (texte)
version: 2                 # nombre
actif: true                # booléen
fichiers:                  # une liste
  - rapport.pdf
  - image.png
image:                     # un objet imbriqué (2 espaces)
  nom: python
  tag: "3.12-slim"         # guillemets : reste du texte
```
Le même contenu en JSON :
```json
{"nom": "script-zip", "version": 2, "actif": true,
 "fichiers": ["rapport.pdf", "image.png"],
 "image": {"nom": "python", "tag": "3.12-slim"}}
```

### Cas d'utilisation
- `.gitlab-ci.yml` : [[Pipeline GitLab CI]]
- `docker-compose.yml` : [[Docker Compose]]
- Fichiers de configuration de beaucoup d'outils (Traefik, Nuclio)

> [!warning] À ne pas confondre
> Un décalage d'indentation change le sens : une clé mal alignée devient enfant d'une autre ou provoque une erreur. Et `3.10` sans guillemets est lu comme le nombre 3.1 : mettre les versions entre guillemets.

## 3 · Pratiquer
- Réécris en YAML un petit objet JSON (un nom, une liste de trois fichiers, un objet imbriqué).
- Ouvre le `.gitlab-ci.yml` de CVAT et repère une liste, une clé imbriquée et un commentaire.

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _À écrire sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[JSON]]
- **Utilisé par** : [[Pipeline GitLab CI]] · [[Docker Compose]] · [[Règles d'un job GitLab (rules)]]

## 6 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
- [ ] Je l'explique sans notes, en 3 phrases, à quelqu'un qui ne connaît pas
- [ ] J'ai réussi un exercice qui l'utilise
- [ ] Je l'ai utilisé dans un projet
- [ ] Je sais dire quand ne pas l'utiliser (ou ce qu'il ne faut pas confondre)
