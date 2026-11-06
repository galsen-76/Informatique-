---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[DOM]]"
  - "[[Événement JavaScript]]"
tags:
  - exercice
---
# Exercice — Rendre une page interactive avec le DOM

> [!info] Objectif
> Construire une petite liste de tâches sans framework, pour comprendre ce que React fera ensuite à ta place.
> Notions : [[DOM]] · [[Événement JavaScript]]

## Consignes
- [ ] Une page avec un formulaire (champ + bouton « Ajouter »), une liste vide et un compteur « 0 tâche »
- [ ] À l'envoi du formulaire (`submit`, sans rechargement), ajoute un `<li>` avec le texte saisi, vide le champ
- [ ] Chaque `<li>` a un bouton « Supprimer » ; un clic sur le texte barre la tâche (classe CSS `fini`)
- [ ] Utilise **un seul** écouteur sur la liste (délégation) pour les clics des éléments
- [ ] Mets à jour le compteur des tâches restantes à chaque changement
- [ ] Refuse une tâche vide et affiche un message d'erreur sous le champ

> [!question]- Indice
> Délégation : `liste.addEventListener("click", (e) => { if (e.target.matches("button")) … })`. `e.target.closest("li")` donne la ligne cliquée.

> [!question]- Solution
> ```html
> <form id="f"><input id="t" placeholder="Nouvelle tâche"><button>Ajouter</button></form>
> <p id="err"></p><ul id="liste"></ul><p id="cpt">0 tâche</p>
> <style>.fini { text-decoration: line-through; }</style>
> <script>
>   const liste = document.querySelector("#liste");
>   const majCompteur = () => {
>     const n = liste.querySelectorAll("li:not(.fini)").length;
>     document.querySelector("#cpt").textContent = `${n} tâche${n > 1 ? "s" : ""}`;
>   };
>   document.querySelector("#f").addEventListener("submit", (e) => {
>     e.preventDefault();
>     const champ = document.querySelector("#t");
>     const texte = champ.value.trim();
>     document.querySelector("#err").textContent = texte ? "" : "La tâche est vide";
>     if (!texte) return;
>     const li = document.createElement("li");
>     const span = document.createElement("span");
>     span.textContent = texte;
>     const btn = document.createElement("button");
>     btn.textContent = "Supprimer";
>     li.append(span, " ", btn);
>     liste.append(li);
>     champ.value = "";
>     majCompteur();
>   });
>   liste.addEventListener("click", (e) => {
>     const li = e.target.closest("li");
>     if (!li) return;
>     if (e.target.matches("button")) li.remove();
>     else li.classList.toggle("fini");
>     majCompteur();
>   });
> </script>
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
