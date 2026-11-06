---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[TypeScript]]"
  - "[[Type et interface TypeScript]]"
  - "[[Union et type littéral]]"
tags:
  - exercice
---
# Exercice — Typer un petit programme en TypeScript

> [!info] Objectif
> Ajouter des types à un programme JavaScript et laisser le compilateur trouver les erreurs.
> Notions : [[TypeScript]] · [[Type et interface TypeScript]] · [[Union et type littéral]]

## Consignes
- [ ] Dans le Playground TypeScript (ou un projet), écris l'interface `Annotation` (`id`, `label` limité à "voiture" | "piéton" | "vélo", `x`, `y`, `note?` optionnelle)
- [ ] Écris `filtrerParLabel(liste, label)` entièrement typée
- [ ] Écris le type `Etat` : chargement, ok (avec une liste d'annotations) ou erreur (avec un message), puis `afficher(etat: Etat): string`
- [ ] Introduis volontairement trois erreurs (label inconnu, propriété mal écrite, oubli d'un cas) et lis les messages
- [ ] Écris `nettoyer(note: string | undefined)` qui renvoie la note en majuscules ou « — »

> [!question]- Indice
> Pour l'état : une union avec un champ `type: "chargement" | "ok" | "erreur"` qui sert à distinguer chaque cas dans un `switch`.

> [!question]- Solution
> ```ts
> type Label = "voiture" | "piéton" | "vélo";
> interface Annotation { id: number; label: Label; x: number; y: number; note?: string; }
>
> function filtrerParLabel(liste: Annotation[], label: Label): Annotation[] {
>   return liste.filter((a) => a.label === label);
> }
>
> type Etat =
>   | { type: "chargement" }
>   | { type: "ok"; annotations: Annotation[] }
>   | { type: "erreur"; message: string };
>
> function afficher(e: Etat): string {
>   switch (e.type) {
>     case "chargement": return "Chargement…";
>     case "ok": return `${e.annotations.length} annotations`;
>     case "erreur": return `Erreur : ${e.message}`;
>   }
> }
> const nettoyer = (note: string | undefined) => note?.toUpperCase() ?? "—";
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
