---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Vue Router]]"
  - "[[Pinia]]"
tags:
  - exercice
---
# Exercice — Construire une application Vue avec routeur et store

> [!info] Objectif
> Organiser une vraie petite application Vue en pages, avec un état partagé et une API.
> Notions : [[Vue Router]] · [[Pinia]]

## Consignes
- [ ] Crée un projet avec Router et Pinia
- [ ] Store `useTodosStore` : `todos`, getter `restantes`, actions `charger()` (jsonplaceholder) et `basculer(id)`
- [ ] Pages : `/` (accueil avec le nombre de restantes), `/todos` (liste), `/todos/:id` (détail), 404
- [ ] Le détail lit le paramètre avec `useRoute` et cherche la tâche dans le store (ou la charge si on arrive directement)
- [ ] Un store `useAuthStore` avec `connecte` et une page `/connexion` ; une garde `beforeEach` redirige si non connecté
- [ ] Ouvre les Vue DevTools et observe le store quand tu bascules une tâche

> [!question]- Indice
> `storeToRefs(store)` pour déstructurer l'état et les getters ; les actions se prennent directement sur `store`.

> [!question]- Solution
> ```ts
> export const useTodosStore = defineStore("todos", () => {
>   const todos = ref<Todo[]>([]);
>   const restantes = computed(() => todos.value.filter((t) => !t.completed).length);
>   async function charger() {
>     if (todos.value.length) return;
>     const r = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=20");
>     if (!r.ok) throw new Error(String(r.status));
>     todos.value = await r.json();
>   }
>   function basculer(id: number) { const t = todos.value.find((x) => x.id === id); if (t) t.completed = !t.completed; }
>   return { todos, restantes, charger, basculer };
> });
> export const useAuthStore = defineStore("auth", () => { const connecte = ref(false); return { connecte }; });
>
> router.beforeEach((to) => {
>   if (to.path !== "/connexion" && !useAuthStore().connecte) return "/connexion";
> });
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
