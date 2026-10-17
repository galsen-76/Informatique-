---
type: notion
statut: a apprendre
resume: "provide / inject permet à un composant de mettre une valeur à disposition de tous ses descendants, sans la faire passer en prop à chaque niveau."
revu:
sources:
  - "https://vuejs.org/guide/components/provide-inject.html"
---
# Provide et inject Vue

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : `provide` / `inject` permet à un composant de **mettre une valeur à disposition de tous ses descendants**, sans la faire passer en prop à chaque niveau.

## Le problème

**Pourquoi c'est utile ?**
Pour partager une valeur avec tous les descendants sans la faire passer en prop à chaque niveau.

**Qu'est-ce qui se passait sans ça ?**
La même prop traversait des composants qui n'en avaient pas besoin (« prop drilling »).

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Utile pour un contexte partagé par un groupe de composants (un formulaire, des onglets). Pour des données partagées par toute l'application, préfère Pinia.

### Le problème : le « prop drilling »

```mermaid
flowchart TB
  A["Page (a la donnée)"] -->|prop| B["Section"]
  B -->|prop| C["Liste"]
  C -->|prop| D["Carte (en a besoin)"]
```

`Section` et `Liste` ne font que transmettre une donnée dont elles n'ont pas besoin. Avec `provide` / `inject`, la page la **dépose**, et la carte la **prend** directement.

### Quand l'utiliser ?

| Situation | Outil |
|---|---|
| parent → enfant direct | props |
| un groupe de composants qui travaillent ensemble (`Tabs` + `Tab`, `Form` + `Field`) | provide / inject |
| donnée partagée par toute l'application | Pinia |
| un plugin ou une configuration globale | `app.provide(…)` dans `main.ts` |

Dans une application, tu t'en serviras peu. Les librairies (PrimeVue, VeeValidate, Vue Router) l'utilisent beaucoup en interne : c'est comme ça que `useRouter()` retrouve le routeur.

## 🧪 Exemple

### Utilisation

```ts
// keys.ts : une clé typée, pour éviter les fautes de frappe
import type { InjectionKey, Ref } from 'vue';
export const THEME_KEY: InjectionKey<Ref<'light' | 'dark'>> = Symbol('theme');
```

```vue
<!-- composant parent -->
<script setup lang="ts">
const theme = ref<'light' | 'dark'>('dark');
provide(THEME_KEY, theme);
</script>
```

```vue
<!-- n'importe quel descendant, à n'importe quelle profondeur -->
<script setup lang="ts">
const theme = inject(THEME_KEY);                       // peut être undefined
const theme = inject(THEME_KEY, ref('dark'));          // avec une valeur par défaut
</script>
```

## ⚠️ Limites et pièges

- **Fournir une valeur simple** (`provide(KEY, 'dark')`) : les descendants ne verront jamais les changements. Fournis une `ref`.
- **Les descendants qui modifient la valeur** : difficile de savoir qui a changé quoi. Fournis plutôt une valeur en lecture seule (`readonly(theme)`) et une fonction pour la modifier.

## 🔗 Liens

- **Prérequis :** [[01 Fondamentaux Vue|Fondamentaux Vue]]
- **Voir aussi :** [[08 Composition API et composables Vue|Composition API et composables Vue]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://vuejs.org/guide/components/provide-inject.html
