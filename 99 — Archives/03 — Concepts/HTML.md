---
type: concept
module: "[[Module 04 - HTML et CSS]]"
related:
  - "[[CSS]]"
  - "[[Élément et attribut HTML]]"
tags:
  - concept
  - web
---
# HTML

> [!info] En une phrase
> Le langage qui décrit la structure et le sens du contenu d'une page web : titres, paragraphes, liens, images, formulaires.

## 1 · Comprendre
### Définition
**HTML** (*HyperText Markup Language*) n'est pas un langage de programmation : il **balise** le contenu pour dire ce que chaque morceau **est** (un titre, une liste, un bouton). Le navigateur lit ce fichier et construit la page. Le style vient du [[CSS]], le comportement du [[JavaScript]].

### Pourquoi ça existe
Un format commun que tous les navigateurs comprennent, et qui donne du **sens** au contenu (pour les humains, les lecteurs d'écran, les moteurs de recherche).

### Le problème résolu
Partager des documents reliés entre eux (liens) lisibles sur n'importe quelle machine.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  H[HTML : structure] --> P[Page]
  C[CSS : style] --> P
  J[JS : comportement] --> P
```

### Exemple concret
```html
<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Mon outil</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header><h1>Archives</h1></header>
  <main>
    <p>Liste des <strong>exports</strong> :</p>
    <ul>
      <li><a href="/exports/1">Export du 6 novembre</a></li>
    </ul>
    <img src="logo.png" alt="Logo de l'équipe">
  </main>
  <script src="app.js"></script>
</body>
</html>
```
- `<head>` : informations sur la page (titre, encodage, styles) ; `<body>` : ce qui s'affiche.
- Balises **sémantiques** : `header`, `nav`, `main`, `section`, `article`, `footer`, plutôt que des `div` partout.

### Cas d'utilisation
- Toute page web ; les composants React, Vue et Angular produisent du HTML

> [!warning] À ne pas confondre
> **HTML** (structure, le *quoi*) et **CSS** (apparence, le *comment ça s'affiche*). Utiliser `<h1>` pour grossir un texte est une erreur : c'est le CSS qui gère la taille.

## 3 · Relier
- **Au travail** : [HTML au travail](obsidian://open?vault=Travail&file=HTML%20au%20travail)
- **Prérequis** : [[Client-serveur]] · [[HTTP]]
- **Complémentaires** : [[CSS]] · [[JavaScript]] · [[Élément et attribut HTML]]
- **Utilisé par** : [[DOM]] · [[React]]
