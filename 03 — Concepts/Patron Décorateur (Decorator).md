---
type: concept
domain: architecture
module: "[[Module 22 - Design patterns]]"
status: a-decouvrir
level: intermediaire
prerequisites:
  - "[[Fonction]]"
  - "[[Portée et closure]]"
parents:
  - "[[Design pattern]]"
related:
  - "[[Middleware]]"
  - "[[Patron Proxy]]"
next_review: 
method: []
tags:
  - concept
  - architecture
---
# Patron Décorateur (Decorator)

> [!info] En une phrase
> Le décorateur enveloppe un objet ou une fonction pour lui ajouter un comportement (journalisation, cache, nouvel essai, mesure du temps) sans modifier son code.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
**Famille :** structurel

**Le problème typique :** il faut ajouter le même comportement transversal à beaucoup de fonctions : journaliser, mesurer, réessayer, vérifier un droit.

**L'idée :** une enveloppe qui a **la même interface** que l'objet d'origine, fait son travail en plus, et appelle l'original.

### Pourquoi ça existe
Sans ce patron : on copie les mêmes lignes au début et à la fin de chaque fonction, ou on crée une sous-classe par combinaison d'options.

### Quand l'utiliser
**Quand l'utiliser :** un comportement transversal à ajouter à plusieurs fonctions ou objets, ou à combiner librement.

**Quand ne pas l'utiliser :** un comportement propre à une seule fonction : écris-le dedans.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
A[Appel] --> D1[Mesure du temps]
  D1 --> D2[Nouvel essai]
  D2 --> F[Fonction d'origine]
```

### Exemple concret
En Python, la syntaxe `@` est faite pour ça :
```python
import functools, time, logging

def reessayer(fois=3, attente=1.0):
    def decorateur(fonction):
        @functools.wraps(fonction)
        def enveloppe(*args, **kwargs):
            for essai in range(1, fois + 1):
                try:
                    return fonction(*args, **kwargs)
                except ConnectionError as e:
                    logging.warning("essai %s/%s échoué : %s", essai, fois, e)
                    if essai == fois:
                        raise
                    time.sleep(attente)
        return enveloppe
    return decorateur

@reessayer(fois=3)
def recuperer_annotations(tache_id): ...
```
Décorateurs que tu croiseras : `@functools.cache`, `@property`, `@app.get("/")` (FastAPI, Flask), `@pytest.fixture`, `@Component` et `@Injectable` en Angular. Les **middlewares** d'Express sont aussi des décorateurs de requêtes.

### Cas d'utilisation
- Cache, nouveaux essais, mesure de temps
- Contrôle d'accès sur des routes
- Les décorateurs Python et Angular

> [!warning] À ne pas confondre
> Empiler beaucoup de décorateurs rend le débogage difficile (la trace d'erreur traverse toutes les enveloppes) ; et sans `functools.wraps`, la fonction décorée perd son nom et sa documentation.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin avec mes mots (section 4).

> [!example] ⚖️ Avant / après
> Avant / après : une fonction `appeler_cvat`, puis la même enveloppée par un décorateur qui journalise et réessaie. Dessine les couches.

> [!example] 🛣️ Suis le trajet
> Dessine un appel qui traverse deux décorateurs empilés : dans quel ordre ils s'exécutent à l'aller et au retour.

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Patron Décorateur (Decorator) » et je l'intègre ici avec `![[Schéma - Patron Décorateur (Decorator).excalidraw]]`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : je l'applique dans mon travail (CVAT, Nuclio) ou je demande une étape à Claude.

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _J'explique mon schéma avec mes mots, sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Fonction]] · [[Portée et closure]]
- **Complémentaires** : [[Middleware]] · [[Patron Proxy]]

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
