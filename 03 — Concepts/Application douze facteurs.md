---
type: concept
domain: architecture
module: "[[Module 15 - Architecture logicielle]]"
status: a-decouvrir
level: intermediaire
niveau: 5
schema: false
exercice_visuel: false
fil_rouge: false
prerequisites:
  - "[[Variable d'environnement]]"
  - "[[Docker]]"
parents: []
related:
  - "[[Image Docker]]"
  - "[[Pipeline GitLab CI]]"
  - "[[Journaliser avec logging]]"
next_review: 
method: []
tags:
  - concept
  - architecture
---
# Application douze facteurs

> [!info] En une phrase
> La méthode des douze facteurs (twelve-factor app) est une liste de règles pour écrire une application facile à déployer, à configurer et à faire tourner en plusieurs copies, notamment dans Docker et le cloud.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
Les facteurs les plus utiles au début :
1. **Une base de code** suivie dans Git, plusieurs déploiements (dev, test, prod)
2. **Dépendances déclarées** (`requirements.txt`, `package.json`), rien d'installé « à la main »
3. **Configuration dans l'environnement** : adresses, mots de passe, clés via des variables d'environnement, jamais dans le code
4. **Services externes comme ressources** : la base ou CVAT sont des adresses qu'on change par la configuration
5. **Construire, publier, exécuter** séparés (c'est ce que fait ta CI : image, registre, déploiement)
6. **Processus sans état** : ce qui doit durer va en base ou en stockage
9. **Démarrage rapide, arrêt propre**
10. **Dev et prod aussi proches que possible** (Docker aide)
11. **Logs sur la sortie standard**, c'est la plateforme qui les collecte

Les autres : ports exposés, mise à l'échelle par processus, tâches d'admin ponctuelles.

### Pourquoi ça existe
« Ça marche sur ma machine » : mot de passe en dur, fichier écrit sur le disque local, configuration différente partout, impossible de lancer deux copies.

### Le problème résolu
La même image Docker tourne partout, seule la configuration change ; on peut lancer, arrêter et multiplier les copies sans surprise.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
CO[Code] --> BU[Build image]
  BU --> RE[Release]
  CF[Config env] --> RE
  RE --> RU[Exécution]
```

### Exemple concret
```python
# ❌ configuration dans le code
CVAT_URL = "http://192.168.1.20:8080"
MOT_DE_PASSE = "admin123"

# ✅ configuration dans l'environnement
import os
CVAT_URL = os.environ["CVAT_URL"]
MOT_DE_PASSE = os.environ["CVAT_PASSWORD"]   # injecté par Docker ou la CI
logging.basicConfig(stream=sys.stdout)      # logs sur la sortie standard
```

### Cas d'utilisation
- Préparer une appli pour Docker
- Variables CI GitLab
- Déploiement sur plusieurs environnements

> [!warning] À ne pas confondre
> Ce n'est pas une norme à cocher à 100 % : ce sont des règles de bon sens. Le facteur le plus violé par les débutants est le 3 (secrets dans le code et dans Git).

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] 🧠 Dessine de mémoire
> Choisis quatre facteurs (configuration, dépendances, logs, processus jetables) et dessine pour chacun comment ton application le respecte ou non.

> [!example] 🔄 Change de contexte
> Redessine-les pour un autre programme que tu as écrit (un script, une fonction). Lesquels sont déjà respectés, lesquels non ?

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Application douze facteurs » et je l'intègre ici avec `![[Schéma - Application douze facteurs.excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : elle sera pratiquée dans le fil rouge de son niveau (voir [[Niveaux]]).

## 4 · Relier
- **Prérequis** : [[Variable d'environnement]] · [[Docker]]
- **Complémentaires** : [[Image Docker]] · [[Pipeline GitLab CI]] · [[Journaliser avec logging]]

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
