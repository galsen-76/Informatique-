---
type: bonnes-pratiques
sujet: "HTML et CSS"
concepts:
  - "[[HTML]]"
  - "[[CSS]]"
  - "[[Accessibilité web]]"
  - "[[Sélecteur CSS]]"
  - "[[Flexbox]]"
  - "[[Grid CSS]]"
  - "[[Responsive design]]"
tags:
  - bonnes-pratiques
---
# Bonnes pratiques - HTML et CSS

> [!info] À quoi sert cette fiche
> Des pages qui ont du sens, accessibles à tous, et un CSS qui ne devient pas un enchevêtrement.
> Chaque règle dit **pourquoi** : c'est la raison qui compte, pour savoir l'adapter quand la situation change.

## À faire

### 1. Choisir la balise selon le sens
`button` pour agir, `a` pour aller ailleurs, `h1` à `h6` dans l'ordre, `header`, `nav`, `main`, `footer`. Voir [[HTML]].

### 2. Un label pour chaque champ, un alt pour chaque image
Accessibilité et confort. Voir [[Accessibilité web]].

```html
<label for="nom">Nom</label>
<input id="nom" name="nom" required>
```

### 3. Styliser avec des classes
Des classes au nom clair (`.carte`, `.bouton-primaire`), plutôt que des `id` ou des balises. Voir [[Sélecteur CSS]].

### 4. Des variables CSS pour les couleurs et espacements
Un seul endroit à changer, un thème cohérent.

```html
:root { --couleur-texte: #c8ced9; --espace: 1rem; }
.carte { padding: var(--espace); color: var(--couleur-texte); }
```

### 5. Flexbox et Grid pour la mise en page
Plus de flottants ni de positions absolues bricolées. Voir [[Flexbox]] et [[Grid CSS]].

### 6. Penser mobile d'abord
Le style de base pour petit écran, puis `@media (min-width: …)`. Voir [[Responsive design]].

### 7. `box-sizing: border-box` partout
Les tailles se comportent comme on s'y attend. Voir [[Modèle de boîte]].

## À éviter

### 1. Des `div` cliquables
**Pourquoi c'est un problème :** inaccessibles au clavier et aux lecteurs d'écran.
**À la place :** un vrai `button`.

### 2. Choisir un titre pour sa taille
**Pourquoi c'est un problème :** la structure de la page devient fausse.
**À la place :** la bonne balise, et la taille en CSS.

### 3. `!important` pour gagner une bataille de priorité
**Pourquoi c'est un problème :** la suivante demandera un autre `!important`.
**À la place :** un sélecteur plus simple, ou revoir l'organisation.

### 4. Des styles en ligne (`style="…"`) partout
**Pourquoi c'est un problème :** impossible à maintenir.
**À la place :** des classes dans une feuille de style.

### 5. Des tailles fixes en pixels pour tout
**Pourquoi c'est un problème :** la page casse sur d'autres écrans et quand on agrandit le texte.
**À la place :** `rem`, `%`, `fr`, `min()`, `max()`.

### 6. Un contraste trop faible
**Pourquoi c'est un problème :** texte illisible pour beaucoup de gens.
**À la place :** vérifier le contraste (outils du navigateur, Lighthouse).

## Avant de valider mon travail
- [ ] Le HTML est valide (validator.w3.org)
- [ ] La page se navigue au clavier
- [ ] Lighthouse Accessibilité ne signale rien d'important
- [ ] La page est lisible sur téléphone
- [ ] Aucun `!important` injustifié

## Notions liées
[[HTML]] · [[CSS]] · [[Accessibilité web]] · [[Sélecteur CSS]] · [[Flexbox]] · [[Grid CSS]] · [[Responsive design]]
