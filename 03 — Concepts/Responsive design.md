---
type: concept
module: "[[Module 04 - HTML et CSS]]"
related:
  - "[[Accessibilité web]]"
tags:
  - concept
  - web
---
# Responsive design

> [!info] En une phrase
> Une page qui s'adapte à toutes les tailles d'écran, du téléphone au grand écran, grâce aux mises en page fluides et aux media queries.

## 1 · Comprendre
### Définition
Trois ingrédients :
1. la balise `<meta name="viewport" content="width=device-width, initial-scale=1">` ;
2. des tailles **fluides** (`%`, `fr`, `rem`, `max-width`) plutôt que fixes ;
3. des **media queries** : des règles qui ne s'appliquent qu'à partir d'une certaine largeur.

On écrit souvent **mobile d'abord** : le style de base pour petit écran, puis des ajustements pour les écrans plus larges.

### Pourquoi ça existe
Plus de la moitié des visites se font sur téléphone.

### Le problème résolu
Faire une version séparée du site pour chaque appareil.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  B[Base mobile] --> T[min-width 768px]
  T --> D[min-width 1200px]
```

### Exemple concret
```css
.page { display: grid; grid-template-columns: 1fr; gap: 1rem; padding: 1rem; }
img { max-width: 100%; height: auto; }

@media (min-width: 768px) {          /* tablette et plus */
  .page { grid-template-columns: 220px 1fr; }
}
@media (min-width: 1200px) {         /* grand écran */
  .page { max-width: 1100px; margin: 0 auto; }
}
```
Dans F12, le mode « appareil » (Ctrl+Maj+M) simule différentes tailles.

### Cas d'utilisation
- Toute page publique ; les tableaux de bord consultés sur tablette
- Les frameworks CSS (Bootstrap, Tailwind) proposent des points de rupture prêts

> [!warning] À ne pas confondre
> Réduire la fenêtre du navigateur (approximation) et tester sur un vrai téléphone : les tailles de police, le tactile et le zoom diffèrent. Et une largeur fixe en `px` sur un grand bloc provoque un défilement horizontal sur mobile.

## 3 · Relier
- **Prérequis** : [[Flexbox]] · [[Grid CSS]]
- **Complémentaires** : [[Accessibilité web]]
