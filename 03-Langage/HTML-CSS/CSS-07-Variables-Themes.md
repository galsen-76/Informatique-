---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - frontend/css/variables
aliases:
  - "Variables CSS et Thèmes"
parent: "[[HTML-CSS]]"
related_theory:
  - "[[CSS-08-SCSS-Sass|SCSS Sass]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://developer.mozilla.org/fr/docs/Web/CSS/Using_CSS_custom_properties"
---

# Variables CSS et Thèmes

> [!abstract] En bref
> Les **variables CSS** (`--primaire: #10b981`) stockent une valeur réutilisée partout. On change la valeur à un seul endroit, tout le site suit. C'est la base d'une **charte graphique** et du **mode sombre**. Le Portfolio est entièrement construit comme ça.

## Déclarer et utiliser

```css
:root {                       /* :root = toute la page */
  --fond: #f8fafc;
  --texte: #0f172a;
  --primaire: #10b981;
  --rayon: 14px;
}

.btn-primaire {
  background: var(--primaire);
  border-radius: var(--rayon);
}

.badge {
  color: var(--accent, #6366f1);   /* valeur de secours si --accent n'existe pas */
}
```

## Le mode sombre en 3 étapes

**1. Redéfinir les variables pour le thème sombre**

```css
[data-theme="dark"] {
  --fond: #05080f;
  --surface: #0c111c;
  --texte: #e5e7eb;
}
body {
  background: var(--fond);
  color: var(--texte);
}
```

**2. Basculer l'attribut en JavaScript**

```ts
document.documentElement.dataset.theme = 'dark';   // <html data-theme="dark">
```

**3. Retenir le choix** : dans le Portfolio, `useDark()` de VueUse fait le basculement et le sauvegarde dans le `localStorage`.

Tous les composants qui utilisent `var(--fond)` changent **en même temps**, sans toucher à leur CSS.

## Suivre le réglage du système

```css
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --fond: #05080f;
    --texte: #e5e7eb;
  }
}
```

## Nommer par rôle, pas par couleur

| ❌ | ✅ |
|---|---|
| `--vert` | `--primaire` |
| `--gris-fonce` | `--texte-doux` |
| `--blanc` | `--surface` |

Si demain le vert devient bleu, `--vert: blue` n'a plus de sens. `--primaire: blue` si.

Toute la charte du Portfolio : [[Portfolio-Maquette|Maquette du Portfolio]].

## Variables CSS ou SCSS ?

| | Variables CSS `--x` | Variables SCSS `$x` |
|---|---|---|
| Existent dans le navigateur | oui | non (remplacées au build) |
| Modifiables en direct (mode sombre, JavaScript) | **oui** | non |

Pour tout ce qui peut changer (thème, couleurs), utilise les variables CSS.

## Pièges

- **Oublier `var()`** : `color: --primaire` ne marche pas.
- **Faute de frappe dans le nom** : pas d'erreur, la propriété est simplement ignorée. Vérifie dans F12 → Styles.
