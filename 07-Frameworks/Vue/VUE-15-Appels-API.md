---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M06
tags:
  - frameworks/vue/api
aliases:
  - "Appels API Vue.js"
parent: "[[Vue]]"
children: []
related_theory:
  - "[[JS-10-Fetch-JSON-HTTP|Fetch API et JSON]]"
  - "[[VUE-07-Composition-API|Composition API & Composables Vue.js]]"
related_snippets:
  - "[[04_Snippets/vue-15-appels-api]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://vuejs.org/guide/reusability/composables.html#async-state-example"
---

# Appels API Vue.js

> [!abstract] Introduction
> Vue n'impose pas de client HTTP : on utilise `fetch` ou axios, encapsulé dans une couche de services et des composables qui exposent `data`, `loading`, `error` — ou une librairie comme TanStack Query.

> [!warning]- Prérequis
> [[VUE-07-Composition-API|Composition API & Composables Vue.js]], [[JS-10-Fetch-JSON-HTTP|Fetch API et JSON]]

---

## Théorie

> [!question]- C'est quoi ?
> ```typescript
> // services/http.ts
> export const http = axios.create({ baseURL: import.meta.env.VITE_API_URL, timeout: 10_000 });
> http.interceptors.request.use(cfg => {
>   const token = useAuthStore().token;
>   if (token) cfg.headers.Authorization = `Bearer ${token}`;
>   return cfg;
> });
> // services/films.ts
> export const filmsApi = {
>   liste: (q?: string) => http.get<Film[]>('/films', { params: { q } }).then(r => r.data),
> };
> ```

> [!example]- Analogie
> Les composants ne téléphonent jamais directement au fournisseur : ils passent par le standard (service API) qui connaît le numéro, les identifiants et gère les erreurs.

> [!question]- Pourquoi l'utiliser ?
> Centraliser URL, token, erreurs et timeouts ; garder des composants simples ; pouvoir mocker l'API en test.

> [!question]- Comment ça marche ?
> ```typescript
> export function useFilms(recherche: Ref<string>) {
>   const data = ref<Film[]>([]);
>   const loading = ref(false);
>   const error = ref<string | null>(null);
>   let controleur: AbortController | undefined;
>   watch(recherche, async (q) => {
>     controleur?.abort();                       // annule la requête précédente (≈ switchMap)
>     controleur = new AbortController();
>     loading.value = true; error.value = null;
>     try { data.value = (await http.get<Film[]>('/films', { params: { q }, signal: controleur.signal })).data; }
>     catch (e) { if (!axios.isCancel(e)) error.value = 'Chargement impossible'; }
>     finally { loading.value = false; }
>   }, { immediate: true });
>   return { data, loading, error };
> }
> ```
> TanStack Query (vue-query) ajoute cache, déduplication, retry, rafraîchissement en arrière-plan.

> [!question]- Quand l'utiliser ?
> Toujours via une couche service. Composable pour l'état async d'un écran ; TanStack Query dès qu'il y a du cache/partage de données serveur.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Réécrire à la main cache, retry et invalidation devient vite complexe → librairie.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| axios | Client HTTP populaire avec intercepteurs |
| Intercepteur | Code exécuté sur chaque requête/réponse |
| TanStack Query | Gestion du « server state » (cache, sync) |
| Server state | Données appartenant au serveur, mises en cache côté client |

---

## Points clés

- Service API centralisé + composables
- Toujours gérer loading / error / vide
- Annuler les requêtes obsolètes
- Base URL via variables d'environnement Vite (`VITE_`)

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Appeler l'API directement dans chaque composant avec des URLs en dur
> - Conditions de course : une réponse ancienne écrase une récente
> - Stocker dans Pinia des données serveur qui devraient être en cache de requêtes

---

## Exemple minimal

```vue
<script setup lang="ts">
const q = ref('');
const { data: films, loading, error } = useFilms(useDebounce(q, 300));
</script>
<template>
  <input v-model="q" placeholder="Rechercher">
  <p v-if="loading">Chargement…</p>
  <p v-else-if="error" role="alert">{{ error }}</p>
  <FilmCard v-for="f in films" :key="f.id" :film="f" />
</template>
```

> [!note] Ce que j'en retiens
> Le composant ne connaît ni axios ni l'URL : il consomme un état prêt à afficher.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Distinguer server state (TanStack Query) et client state (Pinia)
> - Générer le client API depuis la spec OpenAPI du back

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Vue]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[ANG-09-HTTP-Communication-Serveur|HTTP & Communication Serveur Angular]]

**Pratique :**
- Extrait de code → [[04_Snippets/vue-15-appels-api]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Comment éviter qu'une ancienne réponse écrase la plus récente ?

---

## Tâches

- [ ] #task Créer `services/http.ts` et `useFilms` pour CinéTrack Vue
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
