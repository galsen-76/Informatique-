---
created: 2026-09-21
modified: 2026-09-21
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M06
aliases:
  - "Props & Emits Vue.js (Communication Parent-Enfant)"
tags:
  - frameworks/vue/props-emits
parent: "[[Vue]]"
children: []
related_theory: []
related_snippets:
  - "[[04_Snippets/vue-props-emits]]"
related_projects:
  - "[[02_Projects/CinéTrack-Vue]]"
source: "https://vuejs.org/guide/components/props.html"
---

# Props & Emits Vue.js (Communication Parent-Enfant)

> [!abstract] Introduction
> Les `props` font descendre des données d'un composant parent vers un enfant ; les `emits` font remonter des événements de l'enfant vers le parent — exactement le même principe que `@Input`/`@Output` en Angular.

> [!warning]- Prérequis
> [[VUE-03-Composants-SFC|Composants et SFC Vue.js]], [[ANG-19-Communication-Composants|Communication parent-enfant Angular]] (pour la comparaison directe).

---

## Théorie

> [!question]- C'est quoi ?
> ```vue
> <!-- Enfant : FilmCard.vue -->
> <script setup>
> defineProps(['titre']);
> const emit = defineEmits(['favori']);
> </script>
> <template>
>   <button @click="emit('favori')">{{ titre }}</button>
> </template>
> ```

> [!example]- Analogie
> Les props sont comme une enveloppe qu'un parent glisse dans la boîte aux lettres de l'enfant (données descendantes, à sens unique). Les emits sont comme l'enfant qui sonne à la porte du parent pour annoncer quelque chose (événement remontant) — jamais l'inverse dans les deux cas.

> [!question]- Pourquoi l'utiliser ?
> Garder une communication PRÉVISIBLE et à sens unique entre composants — le parent contrôle les données descendantes, l'enfant ne peut que signaler des événements, jamais modifier directement l'état du parent.

> [!question]- Comment ça marche ?
> ```vue
> <!-- Parent -->
> <script setup>
> function surFavori() { console.log('Film ajouté aux favoris'); }
> </script>
> <template>
>   <FilmCard titre="Inception" @favori="surFavori" />
> </template>
> ```
> `defineEmits(['favori'])` déclare explicitement quels événements ce composant peut émettre — Vue avertit si un événement non déclaré est émis.

> [!question]- Quand l'utiliser ?
> Systématiquement pour toute communication entre un composant parent et son enfant direct.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Pour communiquer entre deux composants SANS lien parent-enfant direct (frères, ou éloignés dans l'arbre), props/emits deviennent vite lourds à faire remonter/redescendre à travers plusieurs niveaux — Pinia (voir [[VUE-09-Pinia-State-Management|Pinia State Management]]) est alors plus adapté.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Props | Données descendantes, du parent vers l'enfant |
| Emit | Événement remontant, de l'enfant vers le parent |
| `defineProps`/`defineEmits` | Déclarations explicites en `<script setup>` |

---

## Points clés

- Props descendent (parent → enfant), emits remontent (enfant → parent)
- `defineProps`/`defineEmits` déclarent explicitement ce qu'un composant accepte/émet
- Communication à sens unique, jamais l'enfant qui modifie directement le parent
- Équivalent exact de `@Input`/`@Output` Angular

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Essayer de modifier directement une prop reçue depuis l'enfant (Vue avertit, car les props sont en lecture seule côté enfant)
> - Oublier de déclarer un emit avec `defineEmits`, provoquant un avertissement dans la console
> - Utiliser props/emits pour une communication entre composants éloignés, alourdissant inutilement le code

---

## Paramètres / Configuration

| Élément | Direction | Description |
|-----------|-------------|---------|
| `defineProps` | Parent → Enfant | Données reçues |
| `defineEmits` | Enfant → Parent | Événements émis |

---

## Exemple minimal

```vue
<!-- Parent.vue -->
<template>
  <FilmCard titre="Inception" @favori="() => console.log('Favori !')" />
</template>
```
```vue
<!-- FilmCard.vue -->
<script setup>
defineProps(['titre']);
const emit = defineEmits(['favori']);
</script>
<template>
  <button @click="emit('favori')">{{ titre }}</button>
</template>
```

> [!note] Ce que j'en retiens
> Le composant enfant ne sait RIEN de ce que fait le parent avec l'événement `favori` — il se contente de le signaler, exactement comme `@Output()` en Angular.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Props et emits typés (`defineProps<…>()`, `defineEmits<…>()`) et `defineModel()` pour le v-model de composant (voir [[VUE-10-TypeScript-avec-Vue|TypeScript avec Vue.js]])
> - Composants éloignés : [[VUE-13-Provide-Inject|Provide Inject Vue.js]] ou [[VUE-09-Pinia-State-Management|Pinia (State Management Vue.js)]]

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Vue]]
- Sous-sujets → (aucun)
- À comparer avec → [[ANG-19-Communication-Composants|Communication parent-enfant Angular]]

**Pratique :**
- Extrait de code → [[04_Snippets/vue-props-emits]]
- Projet → [[02_Projects/CinéTrack-Vue]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> Pourrais-je expliquer pourquoi un enfant ne devrait jamais modifier directement une prop reçue ?

> [!faq]- Questions d'entretien
> - Comment un composant enfant communique-t-il avec son parent en Vue ?

---

## Tâches

- [ ] #task Créer un couple parent/enfant avec props descendantes et emit remontant
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Comment typer précisément les props et emits en TypeScript avec Vue (au-delà de la simple liste de noms) ?
