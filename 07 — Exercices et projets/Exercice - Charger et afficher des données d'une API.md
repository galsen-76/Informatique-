---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Asynchrone et Promesse]]"
  - "[[async et await]]"
  - "[[Appeler une API avec fetch]]"
  - "[[Boucle d'événements]]"
  - "[[JSON]]"
tags:
  - exercice
---
# Exercice — Charger et afficher des données d'une API

> [!info] Objectif
> Appeler une vraie API, gérer le chargement et les erreurs, et comprendre l'ordre d'exécution.
> Notions : [[Asynchrone et Promesse]] · [[async et await]] · [[Appeler une API avec fetch]] · [[Boucle d'événements]] · [[JSON]]

## Consignes
- [ ] Avant de coder, prédis l'ordre d'affichage de : `console.log(1)`, `setTimeout(() => console.log(2), 0)`, `Promise.resolve().then(() => console.log(3))`, `console.log(4)` ; vérifie
- [ ] Écris `attendre(ms)` qui renvoie une Promesse
- [ ] Écris `async function chargerTodos()` qui appelle `https://jsonplaceholder.typicode.com/todos?_limit=10`, vérifie `rep.ok` et renvoie le JSON
- [ ] Affiche « Chargement… », puis la liste des titres (barrés si `completed`), ou un message d'erreur
- [ ] Change l'adresse pour une qui renvoie 404 et vérifie que ton message d'erreur s'affiche
- [ ] Charge les todos des utilisateurs 1, 2 et 3 en série puis avec `Promise.all`, mesure les deux durées avec `performance.now()`
- [ ] Envoie un `POST` avec un corps JSON et affiche la réponse

> [!question]- Indice
> Ordre : 1, 4, 3, 2. Pour le POST : `headers: { "Content-Type": "application/json" }` et `body: JSON.stringify(objet)`.

> [!question]- Solution
> ```js
> const attendre = (ms) => new Promise((ok) => setTimeout(ok, ms));
> const base = "https://jsonplaceholder.typicode.com";
>
> async function charger(url) {
>   const rep = await fetch(url);
>   if (!rep.ok) throw new Error(`Erreur ${rep.status}`);
>   return rep.json();
> }
>
> async function afficher() {
>   const ul = document.querySelector("#liste"), msg = document.querySelector("#msg");
>   msg.textContent = "Chargement…";
>   try {
>     const todos = await charger(`${base}/todos?_limit=10`);
>     for (const t of todos) {
>       const li = document.createElement("li");
>       li.textContent = t.title;
>       if (t.completed) li.style.textDecoration = "line-through";
>       ul.append(li);
>     }
>     msg.textContent = "";
>   } catch (e) {
>     msg.textContent = e.message;
>   }
>   let t0 = performance.now();
>   for (const id of [1, 2, 3]) await charger(`${base}/todos?userId=${id}`);
>   console.log("série", performance.now() - t0);
>   t0 = performance.now();
>   await Promise.all([1, 2, 3].map((id) => charger(`${base}/todos?userId=${id}`)));
>   console.log("parallèle", performance.now() - t0);
>   const cree = await fetch(`${base}/todos`, { method: "POST",
>     headers: { "Content-Type": "application/json" },
>     body: JSON.stringify({ title: "Exporter en PNG", completed: false }) });
>   console.log(await cree.json());
> }
> afficher();
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
