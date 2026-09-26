---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M04
tags:
  - frameworks/ui-librairies
aliases:
  - "Librairies UI pour Interfaces Rapides"
parent: "[[Frameworks]]"
related_theory:
  - "[[ANG-29-Angular-Material-CDK|Angular Material et CDK]]"
  - "[[VUE-21-Ecosysteme-UI-Vue|Écosystème UI Vue.js]]"
  - "[[CSS-09-Architecture-BEM-Tailwind|Architecture CSS BEM et Tailwind]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://primeng.org"
---

# Librairies UI pour Interfaces Rapides

> [!abstract] En bref
> Ton objectif, c'est TypeScript, Vue et Angular, pas le CSS. Une **librairie de composants** te donne des boutons, tableaux, formulaires, menus et fenêtres tout faits, propres et accessibles. Tu assembles, tu ajustes la mise en page (avec l'aide de l'IA), et tu passes ton temps sur la logique.

## Mon choix : PrimeVue + PrimeNG

**Le même éditeur, les mêmes composants, le même système de thème** en Vue (PrimeVue) et en Angular (PrimeNG). Tu apprends une fois dans le Portfolio, tu réutilises tout dans CinéTrack.

| Besoin | Vue | Angular | Commun |
|---|---|---|---|
| Composants | **PrimeVue** | **PrimeNG** | thème **Aura** |
| Mise en page | Tailwind | Tailwind | |
| Icônes | `lucide-vue-next` | `lucide-angular` | **Lucide** (ou PrimeIcons) |
| Graphiques | PrimeVue Chart, `vue-echarts` | PrimeNG Chart, `ngx-echarts` | Chart.js / ECharts |
| Gros tableaux | DataTable PrimeVue | Table PrimeNG | AG Grid (très gros volumes) |
| Modèle de dashboard | **Sakai** (PrimeVue) | **Sakai** (PrimeNG) | |
| Utilitaires | VueUse | Angular CDK | |

Autres kits connus : Vuetify, Quasar (Vue) ; Angular Material (Angular) ; shadcn-vue / Spartan (composants à copier dans ton code, avec Tailwind).

## Installer PrimeVue (Portfolio)

```bash
npm i primevue @primeuix/themes primeicons lucide-vue-next
```

```ts
// main.ts
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import 'primeicons/primeicons.css';

createApp(App)
  .use(PrimeVue, { theme: { preset: Aura, options: { darkModeSelector: '[data-theme="dark"]' } } })
  .use(router)
  .mount('#app');
```

La couleur verte du Portfolio : voir la configuration « Avec PrimeVue » dans [[Portfolio-Maquette|Maquette du Portfolio]].

```vue
<script setup lang="ts">
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { Heart } from 'lucide-vue-next';
</script>

<template>
  <Button label="Voir mes projets" icon="pi pi-arrow-right" iconPos="right" />

  <DataTable :value="movies" paginator :rows="10" :loading="loading">
    <Column field="title" header="Titre" sortable />
    <Column field="year" header="Année" />
    <Column>
      <template #body="{ data }">
        <Button text aria-label="Ajouter aux favoris" @click="toggle(data.id)">
          <Heart :size="18" aria-hidden="true" />
        </Button>
      </template>
    </Column>
  </DataTable>
</template>
```

## Installer PrimeNG (CinéTrack)

```bash
npm i primeng @primeuix/themes primeicons
```

```ts
// app.config.ts
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

export const appConfig: ApplicationConfig = {
  providers: [providePrimeNG({ theme: { preset: Aura } })],
};
```

```ts
@Component({
  imports: [TableModule, ButtonModule],
  template: `
    <p-table [value]="store.movies()" [paginator]="true" [rows]="10">
      <ng-template #header><tr><th>Titre</th><th>Année</th></tr></ng-template>
      <ng-template #body let-movie><tr><td>{{ movie.title }}</td><td>{{ movie.year }}</td></tr></ng-template>
    </p-table>`,
})
export class MoviesListPage { protected store = inject(MoviesStore); }
```

La syntaxe évolue entre versions : suis toujours la documentation de la version installée.

## La méthode « interface rapide »

1. Pars d'un **modèle** (Sakai) ou d'une mise en page simple : en-tête + contenu.
2. **Assemble** les composants de la librairie : `Card`, `DataTable`, `Dialog`, champs de formulaire.
3. Demande à l'IA la **mise en page** : « avec PrimeVue et Tailwind, fais une grille de 3 cartes responsive ».
4. Mets ton effort sur le **TypeScript** : types, composables / services, appels API, états chargement / vide / erreur.

## Pièges

- **Installer le kit sans son thème** : les composants s'affichent « nus ».
- **Oublier d'importer le composant** : balise inconnue (Angular), rien ne s'affiche (Vue).
- **Surcharger les classes internes** (`.p-datatable-…`) : change plutôt les couleurs du thème.
- **Deux kits dans la même app** : un seul.
- **Un bouton avec seulement une icône** sans `aria-label` : inutilisable au lecteur d'écran.
- **Au travail** : utilise le kit déjà en place dans le projet.
