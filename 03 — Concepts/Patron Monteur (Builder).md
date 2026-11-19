---
type: concept
domain: architecture
module: "[[Module 22 - Design patterns]]"
status: a-decouvrir
level: intermediaire
niveau: 5
schema: false
exercice_visuel: false
fil_rouge: false
prerequisites:
  - "[[Interface et polymorphisme]]"
parents:
  - "[[Design pattern]]"
related:
  - "[[Patron Fabrique (Factory)]]"
  - "[[ORM]]"
next_review: 
tags:
  - concept
  - architecture
---
# Patron Monteur (Builder)

> [!info] En une phrase
> Le monteur construit un objet compliqué étape par étape, avec des méthodes lisibles enchaînées, au lieu d'un constructeur à quinze paramètres.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
**Famille :** créationnel

**Le problème typique :** un objet a beaucoup d'options, la plupart facultatives (une requête, une configuration, un rapport).

**L'idée :** un objet « monteur » qui reçoit les options une à une, puis une méthode finale (`build`, `construire`) qui crée l'objet terminé et vérifie qu'il est valide.

### Pourquoi ça existe
Sans ce patron : des constructeurs illisibles : `Requete("GET", url, None, None, 30, True, False, {...})`, où l'on ne sait plus quel paramètre est lequel.

### Quand l'utiliser
**Quand l'utiliser :** un objet a de nombreuses options et une construction en plusieurs étapes.

**Quand ne pas l'utiliser :** un objet a deux ou trois paramètres : en Python, les **paramètres nommés avec valeurs par défaut** font déjà le travail (`Requete(url, timeout=30)`).

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
M[Monteur] --> E1[avec_titre]
  E1 --> E2[avec_tableau]
  E2 --> E3[avec_image]
  E3 --> B[construire]
```

### Exemple concret
```python
class RapportBuilder:
    def __init__(self, titre: str):
        self._titre, self._sections, self._images = titre, [], []
    def section(self, texte: str) -> "RapportBuilder":
        self._sections.append(texte); return self        # renvoie self pour enchaîner
    def image(self, chemin: str) -> "RapportBuilder":
        self._images.append(chemin); return self
    def construire(self) -> "Rapport":
        if not self._sections:
            raise ValueError("un rapport a au moins une section")
        return Rapport(self._titre, tuple(self._sections), tuple(self._images))

rapport = (RapportBuilder("Export tâche 12")
           .section("12 images annotées")
           .image("plan.png")
           .construire())
```
Tu l'utilises déjà sans le savoir : le constructeur de requêtes de SQLAlchemy (`select(Tache).where(...).order_by(...)`), Prisma, le `QueryBuilder` de TypeORM, `new URL()` + `searchParams.append()`.

### Cas d'utilisation
- Constructeurs de requêtes SQL (ORM)
- Configuration d'un client HTTP
- Construire un document, un e-mail, une image

> [!warning] À ne pas confondre
> En Python et en TypeScript, les paramètres nommés et les objets d'options (`{ timeout: 30 }`) remplacent souvent le monteur : ne l'écris que si la construction a vraiment des étapes ou des vérifications.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] 🛣️ Suis le trajet
> Dessine la construction d'une requête compliquée étape par étape (`.avec_job(3).avec_label("tuyau").construire()`), avec l'objet à chaque étape.

> [!example] 🔄 Change de contexte
> Trouve un monteur dans un outil que tu utilises (requêtes SQLAlchemy, `HttpParams` Angular) et dessine ses étapes.

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Patron Monteur (Builder) » et je l'intègre ici avec `![[Schéma - Patron Monteur (Builder).excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : elle sera pratiquée dans le fil rouge de son niveau (voir [[Niveaux]]).

## 4 · Relier
- **Prérequis** : [[Interface et polymorphisme]]
- **Complémentaires** : [[Patron Fabrique (Factory)]] · [[ORM]]

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
