---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[JavaScript]]"
  - "[[Variables et types en JavaScript]]"
  - "[[Tableau et objet JavaScript]]"
  - "[[Fonction fléchée et callback]]"
  - "[[Méthodes de tableau (map, filter, reduce)]]"
tags:
  - exercice
---
# Exercice — Manipuler des données en JavaScript

> [!info] Objectif
> Transformer une liste d'annotations avec les outils de base du langage, dans Node.
> Notions : [[JavaScript]] · [[Variables et types en JavaScript]] · [[Tableau et objet JavaScript]] · [[Fonction fléchée et callback]] · [[Méthodes de tableau (map, filter, reduce)]]

## Consignes
- [ ] Crée `donnees.js` avec un tableau `annotations` de 6 objets `{ id, label, taille, valide }` (labels : voiture, piéton, vélo)
- [ ] Affiche chaque annotation avec `for…of` et un gabarit de chaîne
- [ ] Avec `filter`, garde les annotations valides ; avec `map`, obtiens leurs labels
- [ ] Avec `reduce`, calcule la taille totale, puis un objet qui compte les annotations par label : `{ voiture: 3, piéton: 2, vélo: 1 }`
- [ ] Écris une fonction fléchée `parLabel(label)` qui renvoie un callback utilisable par `filter`
- [ ] Trouve l'annotation d'id 4 avec `find` ; crée sa copie avec `valide: false` sans modifier l'originale
- [ ] Lance le tout avec `node donnees.js`

> [!question]- Indice
> Pour compter par label : `reduce((acc, a) => { acc[a.label] = (acc[a.label] ?? 0) + 1; return acc; }, {})`. Pour la copie : `{ ...a, valide: false }`.

> [!question]- Solution
> ```js
> const annotations = [
>   { id: 1, label: "voiture", taille: 120, valide: true },
>   { id: 2, label: "piéton", taille: 40, valide: true },
>   { id: 3, label: "voiture", taille: 90, valide: false },
>   { id: 4, label: "vélo", taille: 60, valide: true },
>   { id: 5, label: "voiture", taille: 150, valide: true },
>   { id: 6, label: "piéton", taille: 35, valide: false },
> ];
> for (const a of annotations) console.log(`#${a.id} ${a.label} (${a.taille})`);
> const labelsValides = annotations.filter((a) => a.valide).map((a) => a.label);
> const total = annotations.reduce((s, a) => s + a.taille, 0);
> const compte = annotations.reduce((acc, a) => { acc[a.label] = (acc[a.label] ?? 0) + 1; return acc; }, {});
> const parLabel = (label) => (a) => a.label === label;
> const voitures = annotations.filter(parLabel("voiture"));
> const a4 = annotations.find((a) => a.id === 4);
> const copie = { ...a4, valide: false };
> console.log(labelsValides, total, compte, voitures.length, a4.valide, copie.valide);
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
