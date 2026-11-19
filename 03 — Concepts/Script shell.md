---
type: concept
domain: terminal
module: "[[Module 02 - Terminal et environnement]]"
status: en-cours
level: debutant
niveau: 0
schema: false
exercice_visuel: false
fil_rouge: false
prerequisites:
  - "[[Bash]]"
  - "[[Permissions Linux]]"
  - "[[Code de sortie]]"
parents: []
related:
  - "[[Fichiers entre Windows et Linux]]"
next_review: 
method: []
tags:
  - concept
  - terminal
---
# Script shell

> [!info] En une phrase
> Un fichier texte qui contient une suite de commandes Bash, qu'on lance d'un coup comme un programme.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
Un **script shell** (`.sh`) regroupe des commandes. Sa première ligne, le **shebang** (`#!/usr/bin/env bash`), dit quel shell doit l'exécuter. On le lance avec `bash script.sh`, ou `./script.sh` s'il est exécutable.

### Pourquoi ça existe
Rejouer une suite de commandes sans les retaper, et la partager.

### Le problème résolu
Les procédures notées dans un document et retapées à la main, avec des oublis.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  S[Shebang] --> O[set -euo]
  O --> C[Commandes]
  C --> E[Code de sortie]
```

### Exemple concret
```bash
#!/usr/bin/env bash
set -euo pipefail          # s'arrêter à la première erreur, variable inconnue = erreur

DOSSIER="${1:?Usage : ./archiver.sh <dossier>}"   # 1er argument, obligatoire
SORTIE="${2:-archive.zip}"                        # 2e argument, valeur par défaut

if [ ! -d "$DOSSIER" ]; then
  echo "Dossier introuvable : $DOSSIER" >&2
  exit 1
fi

for f in "$DOSSIER"/*.png; do
  echo "Image : $f"
done

zip -r "$SORTIE" "$DOSSIER"
echo "Archive créée : $SORTIE"
```
| Élément | Sens |
| --- | --- |
| `$1`, `$2` | arguments ; `$@` tous ; `$#` leur nombre |
| `"$VAR"` | **toujours entre guillemets** (noms avec espaces) |
| `$(commande)` | le résultat d'une commande : `DATE=$(date +%F)` |
| `[ -f f ]`, `[ -d d ]` | fichier / dossier existe |
| `>&2` | écrire sur stderr |

### Cas d'utilisation
- Les `entrypoint.sh` des images Docker (beaucoup d'images officielles en ont)
- Les blocs `script:` de GitLab CI sont, en pratique, du shell
- Petits automatismes ; dès que ça devient complexe, passer à [[Python]]

> [!warning] À ne pas confondre
> Sans `set -e`, un script **continue** après une erreur et peut finir avec le code 0. Et un script écrit sous Windows peut casser à cause des fins de ligne CRLF (voir [[Fichiers entre Windows et Linux]]).

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] 🛣️ Suis le trajet
> Dessine la vie d'un script `deploy.sh` : écrit, rendu exécutable, lancé avec un argument `$1`, chaque ligne exécutée, code de sortie final.

> [!example] 🔄 Change de contexte
> Le même script lancé par la CI GitLab au lieu de ton terminal : redessine-le. Qu'est-ce qui doit déjà être là (droits, shell, variables) ?

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Script shell » et je l'intègre ici avec `![[Schéma - Script shell.excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- [[Dépenses 09 - Un vrai outil en ligne de commande]]

## 4 · Relier
- **Prérequis** : [[Bash]] · [[Permissions Linux]] · [[Code de sortie]]
- **Complémentaires** : [[Arguments de ligne de commande]] · [[Fichiers entre Windows et Linux]]
- **Utilisé par** : [[Dockerfile]] · [[Pipeline GitLab CI]]

## 5 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
Trois cases à cocher dans les propriétés de la fiche :
- `schema` : mon dessin du concept est dans « Mon schéma » ;
- `exercice_visuel` : j'ai fait et corrigé les exercices visuels de la section 3 ;
- `fil_rouge` : je l'ai appliqué dans le fil rouge (coché tout seul quand une étape qui l'utilise est réussie).

Les trois cochées : la notion compte comme **comprise**. **Maîtrisé** : c'est moi qui le mets dans `status`, quand je le sens.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
