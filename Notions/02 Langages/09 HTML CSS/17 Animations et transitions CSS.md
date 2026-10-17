---
type: notion
statut: a apprendre
resume: "Une transition anime le passage d'un état à un autre (survol d'un bouton)."
revu:
sources:
  - "https://web.dev/learn/css/animations"
---
# Animations et transitions CSS

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Une **transition** anime le passage d'un état à un autre (survol d'un bouton).

## Le problème

**Pourquoi c'est utile ?**
Pour animer un changement d'état ou un mouvement sans JavaScript, et de façon fluide.

**Qu'est-ce qui se passait sans ça ?**
On animait en JavaScript image par image, avec des animations saccadées qui faisaient ramer la page.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Une **animation** (`@keyframes`) décrit un mouvement complet (un chargement qui tourne). Règle d'or pour qu'elles restent fluides : n'animer que `transform` et `opacity`.

### La transition : le cas le plus courant

```css
.carte {
  transition: transform 0.2s ease, border-color 0.2s ease;
}
.carte:hover {
  transform: translateY(-4px);   /* la carte se soulève légèrement */
  border-color: var(--primaire);
}
```

Se lit : « quand `transform` ou `border-color` change, fais-le en douceur sur 0,2 seconde ».

| Partie | Valeurs |
|---|---|
| propriété | celle(s) qui changent |
| durée | `0.15s` à `0.3s` pour une interface (au-delà, ça paraît lent) |
| courbe | `ease` (naturel), `ease-out` (rapide puis ralentit), `linear` |

### Pourquoi seulement `transform` et `opacity` ?

| Animer… | Coût pour le navigateur |
|---|---|
| `transform` (déplacer, agrandir, tourner), `opacity` | **faible** : fluide |
| `width`, `height`, `top`, `margin` | **élevé** : recalcul de toute la mise en page à chaque image → saccades |

Pour déplacer : `transform: translateX(…)`, pas `left`. Pour agrandir : `transform: scale(1.05)`, pas `width`.

### Respecter les réglages de l'utilisateur

Certaines personnes ont le mal des transports avec les animations et l'ont désactivé dans leur système :

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Dans les frameworks

- **Vue** : `<Transition name="fade">` ajoute et retire automatiquement des classes quand un élément apparaît ou disparaît (`v-if`).
- **Angular** : `animate.enter` / `animate.leave` (versions récentes) ou le module `@angular/animations`.
- PrimeVue et PrimeNG animent déjà leurs composants.

## 🧪 Exemple

### L'animation : un mouvement complet

```css
@keyframes tourner {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.loader {
  animation: tourner 1s linear infinite;
}

@keyframes apparaitre {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

.toast { animation: apparaitre 0.25s ease-out; }
```

## ⚠️ Limites et pièges

- **`transition: all`** : anime aussi ce que tu ne voulais pas, et coûte plus cher. Liste les propriétés.
- **Trop d'animations** : une interface pro reste sobre. Survol, apparition, chargement : c'est suffisant.

## 🏋️ S'entraîner

### Exercices

#### Exercice 1 · Un survol fluide

Fais grossir légèrement une carte (5 %) au survol, avec une transition de 200 ms, en ne touchant que des propriétés performantes.

> [!success]- Solution
> ```css
> .movie-card {
>   transition: transform 200ms ease;
> }
>
> .movie-card:hover {
>   transform: scale(1.05);
> }
> ```
>
> `transform` et `opacity` sont gérés par la carte graphique : l'animation reste fluide.

#### Exercice 2 · Un squelette de chargement

Crée une animation de « pulsation » pour les cartes de chargement (l'opacité varie en boucle), désactivée pour les utilisateurs qui préfèrent moins de mouvement.

> [!success]- Solution
> ```css
> @keyframes pulse {
>   0%, 100% { opacity: 1; }
>   50% { opacity: 0.4; }
> }
>
> .skeleton {
>   animation: pulse 1.5s ease-in-out infinite;
> }
>
> @media (prefers-reduced-motion: reduce) {
>   .skeleton { animation: none; }
> }
> ```

## 🔗 Liens

- **Prérequis :** [[09 Sélecteurs cascade et spécificité CSS|Sélecteurs cascade et spécificité CSS]]
- **Voir aussi :** [[25 Performance et bonnes pratiques Angular|Performance et bonnes pratiques Angular]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://web.dev/learn/css/animations
