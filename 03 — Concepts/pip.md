---
type: concept
domain: python
module: "[[Module 16 - Python]]"
status: a-decouvrir
level: debutant
prerequisites:
  - "[[Environnement virtuel Python]]"
parents: []
related:
  - "[[npm]]"
  - "[[Nexus]]"
next_review: 
method: []
tags:
  - concept
  - python
---
# pip

> [!info] En une phrase
> Le gestionnaire de paquets de Python : il installe les bibliothèques externes depuis PyPI (ou le Nexus de l'entreprise).

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
**pip** télécharge et installe des paquets depuis **PyPI**, le dépôt public de Python. Le fichier `requirements.txt` liste les paquets d'un projet, un par ligne, avec leur version. C'est l'équivalent de [[npm]] et `package.json` pour Node.

### Pourquoi ça existe
Réutiliser des bibliothèques écrites par d'autres (requests, pytest) au lieu de tout coder.

### Le problème résolu
Télécharger et installer les bibliothèques à la main, sans savoir quelles versions utilisent les collègues.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  R[requirements.txt] --> P[pip]
  P --> I[PyPI / Nexus]
  P --> E[Environnement]
```

### Exemple concret
```text
# requirements.txt
requests==2.32.3
requests>=2.32,<3
```
```bash
python -m pip install requests        # installer un paquet
pip install -r requirements.txt      # tout installer
pip list                             # ce qui est installé
pip freeze > requirements.txt        # figer les versions actuelles
```
En entreprise, pip passe souvent par le [[Nexus]] :
```bash
pip install -r requirements.txt --index-url https://nexus.mon-entreprise.com/repository/pypi-proxy/simple
```
(ou la variable d'environnement `PIP_INDEX_URL`).

### Cas d'utilisation
- Installer requests pour appeler des API, pytest pour tester
- Ligne `RUN pip install -r requirements.txt` d'un [[Dockerfile]]

> [!warning] À ne pas confondre
> `pip` peut viser un autre Python que celui que tu crois. `python -m pip` garantit que c'est celui de la commande `python`. Et un paquet sans version fixée peut changer du jour au lendemain : fixe les versions dans `requirements.txt`.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin avec mes mots (section 4).

> [!example] 🛣️ Suis le trajet
> Dessine `pip install requests` au travail : pip, le proxy ou le Nexus, PyPI, le dossier du `.venv` où le paquet arrive.

> [!example] 🔄 Change de contexte
> Redessine-le dans un Dockerfile construit par la CI. Que faut-il donner à pip pour que ça passe ?

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - pip » et je l'intègre ici avec `![[Schéma - pip.excalidraw]]`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : je l'applique dans mon travail (CVAT, Nuclio) ou je demande une étape à Claude.

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _J'explique mon schéma avec mes mots, sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Environnement virtuel Python]]
- **Complémentaires** : [[npm]] · [[Nexus]] · [[Proxy]]
- **Utilisé par** : [[Appeler une API HTTP (requests)]] · [[pytest]] · [[Python dans Docker]]
- **Commandes** : [[pip install]]

## 6 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
La notion est maîtrisée quand je sais :
1. **l'expliquer** de façon fluide, à partir de mon schéma (section 4) ;
2. **l'adapter** à un autre contexte (consigne « Change de contexte », ou Claude m'interroge sur un autre cas) ;
3. **l'appliquer** pour de vrai dans le fil rouge (section 3).

Réussir un exercice ne suffit pas. C'est moi qui passe le statut en `maitrise`.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
