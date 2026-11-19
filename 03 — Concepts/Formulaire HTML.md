---
type: concept
domain: web
module: "[[Module 04 - HTML et CSS]]"
status: a-decouvrir
level: debutant
prerequisites:
  - "[[Élément et attribut HTML]]"
parents: []
related:
  - "[[Accessibilité web]]"
next_review: 
method: []
tags:
  - concept
  - web
---
# Formulaire HTML

> [!info] En une phrase
> L'élément form et ses champs (input, select, textarea, button) permettent à l'utilisateur de saisir des données et de les envoyer.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
Un `<form>` regroupe des champs. À l'envoi, le navigateur envoie les valeurs (identifiées par l'attribut `name`) à l'adresse `action`, avec la méthode `method` (GET ou POST). Aujourd'hui, on intercepte souvent l'envoi en JavaScript pour appeler une API avec `fetch`.

### Pourquoi ça existe
Toute interaction de saisie : connexion, recherche, création, téléversement de fichier.

### Le problème résolu
Récupérer des données de l'utilisateur de façon standard, avec validation et accessibilité intégrées.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  U[Saisie] --> V[Validation]
  V --> E[Envoi]
  E --> S[Serveur / API]
```

### Exemple concret
```html
<form action="/api/exports" method="post">
  <label for="nom">Nom de l'export</label>
  <input id="nom" name="nom" type="text" required minlength="3">

  <label for="format">Format</label>
  <select id="format" name="format">
    <option value="png">PNG</option>
    <option value="zip">ZIP</option>
  </select>

  <label><input type="checkbox" name="annotations" checked> Avec annotations</label>

  <button type="submit">Lancer</button>
</form>
```
Types utiles : `text`, `email`, `password`, `number`, `date`, `file`, `checkbox`, `radio`. Validation native : `required`, `min`, `max`, `pattern`.

### Cas d'utilisation
- Formulaires de connexion et de création
- Un champ de fichier pour envoyer une image

> [!warning] À ne pas confondre
> La validation **dans le navigateur** (confort) et la validation **sur le serveur** (obligatoire) : n'importe qui peut contourner la première. Et chaque champ doit avoir un `<label>` relié par `for`/`id`.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin avec mes mots (section 4).

> [!example] 🛣️ Suis le trajet
> Dessine le trajet d'une dépense saisie dans le formulaire : les champs, le bouton, l'événement submit, la requête POST vers l'API.

> [!example] ⚖️ Avant / après
> Avant / après : un formulaire HTML qui recharge la page, puis le même géré par Vue. Dessine où part la donnée dans chaque cas.

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Formulaire HTML » et je l'intègre ici avec `![[Schéma - Formulaire HTML.excalidraw]]`._

### Appliquer dans le fil rouge
- [[MesDépenses 05 - Vue, ajouter et supprimer]]
- [[MesDépenses 11 - Angular, ajouter et supprimer]]

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _J'explique mon schéma avec mes mots, sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Élément et attribut HTML]]
- **Complémentaires** : [[Accessibilité web]] · [[Événement JavaScript]] · [[Validation des données]]

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
