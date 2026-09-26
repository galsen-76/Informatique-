---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - frontend/html/formulaires
aliases:
  - "Formulaires HTML"
parent: "[[HTML-CSS]]"
related_theory:
  - "[[HTML-01-Structure-Semantique|Structure HTML et Sémantique]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://developer.mozilla.org/fr/docs/Learn/Forms"
---

# Formulaires HTML

> [!abstract] En bref
> Un formulaire collecte ce que tape l'utilisateur. Bien écrit en HTML, il est déjà **accessible** (chaque champ a son étiquette) et **pratique** (bon clavier sur mobile, remplissage automatique). Les formulaires Angular et Vue reposent sur ces mêmes balises.

## Un formulaire propre

```html
<form>
  <label for="email">E-mail</label>
  <input id="email" name="email" type="email" autocomplete="email" required>

  <label for="sujet">Sujet</label>
  <select id="sujet" name="sujet" required>
    <option value="">Choisir…</option>
    <option value="job">Opportunité</option>
  </select>

  <label for="message">Message</label>
  <textarea id="message" name="message" minlength="20" required></textarea>

  <label>
    <input type="checkbox" name="rgpd" required>
    J'accepte que mes données servent à me répondre
  </label>

  <button type="submit">Envoyer</button>
</form>
```

## Les règles d'or

1. **Chaque champ a un `<label>`** relié par `for` = `id`. Cliquer sur l'étiquette active le champ, et le lecteur d'écran lit l'étiquette. Un `placeholder` **ne remplace pas** un label (il disparaît quand on tape).
2. **Le bon `type`** : il affiche le bon clavier sur mobile et active une validation de base.
3. **`autocomplete`** : le navigateur peut remplir le champ tout seul.
4. **Les boutons ont un `type`** : `submit` envoie le formulaire, `button` ne fait rien par défaut. Sans `type`, un bouton dans un formulaire **envoie** le formulaire.

## Les types de champs

| `type` | Pour | Bonus |
|---|---|---|
| `text` | texte court | |
| `email` | e-mail | clavier avec @, vérifie le format |
| `password` | mot de passe | caché |
| `number` | nombre | flèches +/- |
| `tel` | téléphone | clavier numérique |
| `url` | adresse web | |
| `search` | recherche | croix pour effacer |
| `date` | date | calendrier natif |
| `checkbox` | oui / non, choix multiples | |
| `radio` | un choix parmi plusieurs (même `name`) | |
| `file` | envoi de fichier | `accept="image/*"` |

## Validation intégrée

| Attribut | Règle |
|---|---|
| `required` | obligatoire |
| `minlength` / `maxlength` | longueur du texte |
| `min` / `max` | valeur d'un nombre ou d'une date |
| `pattern="[0-9]{5}"` | forme imposée (expression régulière) |

C'est un premier filet. Dans tes projets, la vraie validation se fait en TypeScript (Angular Reactive Forms, ou VeeValidate + Zod en Vue) **et** côté serveur, car la validation du navigateur se contourne facilement.

## Pièges

- **Un bouton sans `type`** qui envoie le formulaire par surprise.
- **Pas de `label`**, seulement un `placeholder`.
- **Oublier `event.preventDefault()`** quand tu gères l'envoi en JavaScript : la page se recharge. (Angular et Vue le gèrent avec `(ngSubmit)` et `@submit.prevent`.)
- **Faire confiance à la validation HTML** pour la sécurité : le serveur doit toujours revérifier.
