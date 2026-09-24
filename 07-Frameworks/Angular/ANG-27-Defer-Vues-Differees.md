---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M05
tags:
  - frameworks/angular/defer
aliases:
  - "Vues différées @defer Angular"
parent: "[[Angular]]"
children: []
related_theory:
  - "[[ANG-15-Performance-Bonnes-Pratiques|Performance & Bonnes Pratiques Angular]]"
  - "[[ANG-26-SSR-Hydratation|SSR et Hydratation Angular]]"
related_snippets:
  - "[[04_Snippets/ang-27-defer-vues-differees]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://angular.dev/guide/templates/defer"
---

# Vues différées @defer Angular

> [!abstract] Introduction
> Les blocs `@defer` chargent paresseusement une partie d'un template (et le code de ses composants) seulement quand c'est utile : visible à l'écran, au survol, après un délai…

> [!warning]- Prérequis
> [[ANG-15-Performance-Bonnes-Pratiques|Performance & Bonnes Pratiques Angular]]

---

## Théorie

> [!question]- C'est quoi ?
> ```html
> @defer (on viewport) {
>   <app-commentaires [filmId]="id()" />
> } @placeholder {
>   <div class="squelette"></div>
> } @loading (minimum 300ms) {
>   <app-spinner />
> } @error {
>   <p>Impossible de charger les commentaires.</p>
> }
> ```

> [!example]- Analogie
> Les photos d'un long article qui ne se téléchargent qu'au moment où tu fais défiler jusqu'à elles.

> [!question]- Pourquoi l'utiliser ?
> Réduire le bundle initial sans créer de route : les composants lourds (graphiques, éditeur, carte) sortent du chargement principal.

> [!question]- Comment ça marche ?
> Déclencheurs : `on idle` (défaut), `on viewport`, `on interaction`, `on hover`, `on immediate`, `on timer(2s)`, `when condition`. `prefetch on idle` télécharge à l'avance sans afficher.
> Seuls les composants **standalone** utilisés UNIQUEMENT dans le bloc sont extraits dans un chunk séparé.

> [!question]- Quand l'utiliser ?
> Contenu sous la ligne de flottaison, onglets secondaires, widgets lourds.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Si le composant est aussi importé ailleurs de façon statique, il n'est pas différé. Attention au décalage de mise en page (CLS) : donner une taille au placeholder.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Chunk | Fichier JS séparé chargé à la demande |
| Placeholder | Contenu affiché avant le chargement |
| Prefetch | Téléchargement anticipé sans rendu |
| CLS | Cumulative Layout Shift, décalages visuels |

---

## Points clés

- @defer = lazy loading au niveau du template
- Déclencheurs combinables
- Placeholder dimensionné pour éviter le CLS
- Base de l'hydratation incrémentale en SSR

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Référencer le composant différé ailleurs (plus de gain)
> - Différer du contenu au-dessus de la ligne de flottaison (LCP dégradé)

---

## Exemple minimal

```html
@defer (on interaction(ouvrir); prefetch on hover(ouvrir)) {
  <app-editeur-critique />
} @placeholder {
  <button #ouvrir type="button">Écrire une critique</button>
}
```

> [!note] Ce que j'en retiens
> Le code de l'éditeur est préchargé au survol et affiché au clic.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Analyser les chunks générés (`ng build --stats-json` + esbuild analyzer)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Angular]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[VUE-17-Performance-Bonnes-Pratiques|Performance et Bonnes Pratiques Vue.js]]

**Pratique :**
- Extrait de code → [[04_Snippets/ang-27-defer-vues-differees]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi un composant importé ailleurs n'est-il pas différé ?

---

## Tâches

- [ ] #task Différer le bloc « films similaires » de la fiche film
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
