---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - frontend/css/variables
aliases:
  - "Variables CSS et Thèmes"
parent: "[[HTML-CSS]]"
children: []
related_theory:
  - "[[CSS-08-SCSS-Sass|SCSS Sass]]"
related_snippets:
  - "[[04_Snippets/css-07-variables-themes]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://developer.mozilla.org/fr/docs/Web/CSS/Using_CSS_custom_properties"
---

# Variables CSS et Thèmes

> [!abstract] Introduction
> Les propriétés personnalisées (`--ma-couleur`) sont des variables CSS natives, dynamiques et héritées : la base des design systems et du mode sombre.

> [!warning]- Prérequis
> [[CSS-01-Selecteurs-Cascade-Specificite|Sélecteurs Cascade et Spécificité CSS]]

---

## Théorie

> [!question]- C'est quoi ?
> ```css
> :root { --couleur-primaire: #4f46e5; --espace: 1rem; --rayon: 8px; }
> .btn { background: var(--couleur-primaire); padding: var(--espace); border-radius: var(--rayon); }
> ```

> [!example]- Analogie
> Un nuancier d'entreprise : on change la couleur officielle UNE fois dans le nuancier et tous les documents se mettent à jour.

> [!question]- Pourquoi l'utiliser ?
> Cohérence visuelle (design tokens), thèmes (clair/sombre/marque blanche) modifiables à l'exécution, contrairement aux variables SCSS qui disparaissent à la compilation.

> [!question]- Comment ça marche ?
> - Déclarées sur un sélecteur, héritées par les descendants
> - `var(--x, valeurDeSecours)`
> - Modifiables en JS : `el.style.setProperty('--x', 'red')`
> - Thème sombre : redéfinir les variables sous `@media (prefers-color-scheme: dark)` ou `[data-theme="dark"]`

> [!question]- Quand l'utiliser ?
> Couleurs, espacements, rayons, ombres, typographie : tout ce qui constitue le design system.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Pas de logique (boucles, fonctions) → SCSS reste utile pour générer du CSS ; les deux se combinent très bien.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Custom property | Variable CSS native `--nom` |
| Design token | Valeur de design nommée et réutilisable |
| Thème | Jeu de valeurs de tokens |

---

## Points clés

- Variables CSS = dynamiques à l'exécution, héritées
- Variables SCSS = statiques, résolues au build
- Nommer par rôle (`--couleur-danger`) plutôt que par valeur (`--rouge`)

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Nommer `--bleu` puis la marque passe au vert
> - Oublier la valeur de secours pour une variable optionnelle

---

## Exemple minimal

```css
:root { --fond: #ffffff; --texte: #111827; }
[data-theme="dark"] { --fond: #0f172a; --texte: #e5e7eb; }
body { background: var(--fond); color: var(--texte); }
```
```typescript
document.documentElement.dataset.theme = 'dark';
```

> [!note] Ce que j'en retiens
> Changer un seul attribut sur `<html>` bascule tout le thème.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Structurer des tokens à 2 niveaux (primitifs → sémantiques)
> - Utiliser `color-mix()` et `light-dark()`

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[HTML-CSS]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/css-07-variables-themes]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi une variable SCSS ne permet-elle pas de changer de thème au clic ?

---

## Tâches

- [ ] #task Ajouter un mode sombre à CinéTrack
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
