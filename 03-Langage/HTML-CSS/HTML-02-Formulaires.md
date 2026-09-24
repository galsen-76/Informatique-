---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - frontend/html/formulaires
aliases:
  - "Formulaires HTML"
parent: "[[HTML-CSS]]"
children:
  - "[[ANG-07-Formulaires|Formulaires Angular]]"
  - "[[VUE-14-Formulaires-Validation|Formulaires et Validation Vue.js]]"
related_theory:
  - "[[HTML-01-Structure-Semantique|Structure HTML et Sémantique]]"
related_snippets:
  - "[[04_Snippets/html-02-formulaires]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://developer.mozilla.org/fr/docs/Learn/Forms"
---

# Formulaires HTML

> [!abstract] Introduction
> Les formulaires HTML natifs (`form`, `label`, `input`…) collectent les saisies utilisateur avec validation et accessibilité intégrées — la base sur laquelle reposent les formulaires Angular et Vue.

> [!warning]- Prérequis
> [[HTML-01-Structure-Semantique|Structure HTML et Sémantique]]

---

## Théorie

> [!question]- C'est quoi ?
> ```html
> <form action="/inscription" method="post">
>   <label for="email">E-mail</label>
>   <input id="email" name="email" type="email" required autocomplete="email">
>   <label for="mdp">Mot de passe</label>
>   <input id="mdp" name="mdp" type="password" minlength="12" required>
>   <button type="submit">Créer mon compte</button>
> </form>
> ```

> [!example]- Analogie
> Un formulaire papier bien conçu : chaque case a son intitulé (label), un format attendu (date, e-mail) et des champs obligatoires signalés.

> [!question]- Pourquoi l'utiliser ?
> Le bon `type` affiche le bon clavier mobile, `label` agrandit la zone cliquable et est lu par les lecteurs d'écran, `autocomplete` permet le remplissage automatique.

> [!question]- Comment ça marche ?
> Types utiles : `text`, `email`, `password`, `number`, `tel`, `url`, `date`, `checkbox`, `radio`, `file`, `search`. Autres : `select/option`, `textarea`, `fieldset/legend` (groupes).
> Validation native : `required`, `min/max`, `minlength/maxlength`, `pattern`. Pseudo-classes CSS `:invalid`, `:user-invalid`.
> L'événement `submit` du formulaire (et non `click` du bouton) capte aussi la touche Entrée.

> [!question]- Quand l'utiliser ?
> Toujours comme base. Angular (`novalidate` ajouté automatiquement) et Vue prennent ensuite la main sur la validation pour des messages personnalisés.

> [!danger]- Quand NE PAS l'utiliser / Limites
> La validation côté client est un confort UX, JAMAIS une sécurité : le serveur doit TOUJOURS revalider (voir [[NEST-05-DTO-Validation-Pipes|DTO et Validation NestJS]]).

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| `label[for]` | Associe un libellé à un champ via son `id` |
| `name` | Clé du champ envoyée au serveur |
| `autocomplete` | Indique au navigateur quoi préremplir |
| `fieldset` | Groupe de champs liés |

---

## Points clés

- Chaque champ a un `label` associé
- `type` adapté = bon clavier + validation gratuite
- Écouter `submit`, pas `click`
- Revalider côté serveur, toujours

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Placeholder utilisé à la place du label (disparaît à la saisie, mauvais contraste)
> - Bouton sans `type` dans un formulaire → soumission involontaire
> - Désactiver le copier-coller du mot de passe (nuit aux gestionnaires de mots de passe)

---

## Exemple minimal

```html
<fieldset>
  <legend>Statut du film</legend>
  <label><input type="radio" name="statut" value="a-voir" checked> À voir</label>
  <label><input type="radio" name="statut" value="vu"> Vu</label>
</fieldset>
```

> [!note] Ce que j'en retiens
> `fieldset` + `legend` donnent un titre au groupe de boutons radio, lu par les lecteurs d'écran.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Gérer l'accessibilité des erreurs (`aria-invalid`, `aria-describedby`, focus sur le premier champ en erreur)
> - Connaître l'API Constraint Validation (`setCustomValidity`)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[HTML-CSS]]
- Sous-sujets → [[ANG-07-Formulaires|Formulaires Angular]], [[VUE-14-Formulaires-Validation|Formulaires et Validation Vue.js]]
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/html-02-formulaires]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi la validation HTML ne protège-t-elle pas le serveur ?

---

## Tâches

- [ ] #task Créer le formulaire « Ajouter un film » en HTML pur, puis en reactive forms Angular
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
