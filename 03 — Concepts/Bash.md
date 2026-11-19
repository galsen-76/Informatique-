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
  - "[[Shell]]"
parents:
  - "[[Shell]]"
related:
  - "[[PowerShell]]"
  - "[[Redirection et pipe]]"
next_review: 
method: []
tags:
  - concept
  - terminal
---
# Bash

> [!info] En une phrase
> Le shell standard de Linux : celui de WSL, des conteneurs, des serveurs et de la CI. Tout y est texte, et les petites commandes s'enchaînent.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
**Bash** est le shell de presque toutes les distributions Linux. Ses commandes sont de **petits programmes** spécialisés (`ls`, `cp`, `grep`…) qui lisent et écrivent du **texte**, et qu'on combine avec des [[Redirection et pipe|pipes]].

Tu le rencontres dans : **WSL**, **Git Bash** (une version réduite pour Windows), les **conteneurs** (souvent `sh`, un shell plus simple, compatible), les **jobs de CI** et les serveurs.

### Pourquoi ça existe
Piloter Linux, et automatiser avec des [[Script shell|scripts shell]].

### Le problème résolu
Faire en une ligne ce qui demanderait un programme : « les 5 fichiers les plus gros contenant ERROR ».

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  C[commande] --> O[options]
  O --> A[arguments]
```
Forme : `commande -options arguments`. Options courtes (`-l`, combinables : `-la`) ou longues (`--all`).

| Symbole | Sens |
| --- | --- |
| `~` | ton dossier personnel (`/home/oumar`) |
| `/` | la racine du système |
| `.` / `..` | dossier courant / parent |
| `*` | n'importe quels caractères (`*.png`) |
| `$NOM` | valeur d'une variable |
| `#` | commentaire |

Raccourcis : `Tab` complète, `↑` rappelle la commande précédente, `Ctrl+R` cherche dans l'historique, `Ctrl+C` interrompt, `Ctrl+L` efface l'écran.

### Exemple concret
```bash
pwd                         # où suis-je ?
ls -la                      # tout le contenu, même caché, en détail
cd ~/projets/essai-zip
cat requirements.txt        # afficher un fichier
grep -rn "zipfile" .        # chercher un texte dans le dossier
man ls                      # le manuel (q pour quitter) ; ou ls --help
```

### Cas d'utilisation
- Travailler dans WSL
- Lire et écrire les `script:` de GitLab CI et les `RUN` des Dockerfile
- Entrer dans un conteneur : `docker exec -it nom bash`

> [!warning] À ne pas confondre
> **Bash** (shell complet) et **sh** (shell minimal des petites images comme Alpine) : certaines syntaxes Bash n'existent pas dans `sh`. Et Linux est **sensible à la casse** : `Projets` ≠ `projets`.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] 🛣️ Suis le trajet
> Dessine ce qui se passe quand tu tapes `ls -la ~/projets` et Entrée : Bash lit la ligne, cherche le programme, le lance, affiche le résultat.

> [!example] 🔄 Change de contexte
> Redessine le même trajet dans un job de la CI GitLab, où personne ne tape au clavier. Qui écrit la commande ? Où va le texte affiché ?

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Bash » et je l'intègre ici avec `![[Schéma - Bash.excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- [[Dépenses 00 - Découvrir son poste]]

## 4 · Relier
- **Notion parente** : [[Shell]]
- **Complémentaires** : [[PowerShell]] · [[Redirection et pipe]] · [[Processus]]
- **Utilisé par** : [[Script shell]] · [[Pipeline GitLab CI]] · [[Dockerfile]]
- **Commandes** : [[pwd]] · [[ls]] · [[cd]] · [[cp]] · [[mv]] · [[rm]] · [[cat]] · [[grep]]

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
