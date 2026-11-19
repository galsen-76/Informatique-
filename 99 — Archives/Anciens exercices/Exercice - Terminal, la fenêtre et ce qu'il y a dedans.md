---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[Terminal]]"
tags:
  - exercice
---
# Exercice — Terminal, la fenêtre et ce qu'il y a dedans

> [!info] Avant de commencer
> **Notion travaillée :** [[Terminal]]
> **À voir avant :** rien d'autre que cette notion.
> **Objectif :** Comprendre que le terminal ne fait qu'afficher et transmettre, et que c'est autre chose qui comprend les commandes.

> [!tip] Comment faire cet exercice
> Les consignes donnent un **but**, pas la commande. Quand on te demande de **prédire**, écris ta réponse *avant* de lancer quoi que ce soit : c'est l'écart entre ta prédiction et le résultat qui fait comprendre. Tu peux chercher dans la fiche de la notion, pas dans la solution.

## Étapes
### 1. 🔮 Prédire
Dans Windows Terminal, tu ouvres un onglet PowerShell et un onglet Ubuntu. C'est la **même fenêtre**, le **même programme**. Écris : est-ce que `ls -la` va donner le même résultat dans les deux onglets ? Pourquoi ?
- [ ] Fait
### 2. 🧪 Vérifier
Essaie dans les deux onglets. Compare avec ta prédiction.
- [ ] Fait
### 3. 💬 Expliquer
En deux phrases : si le terminal était celui qui comprend les commandes, que se passerait-il dans les deux onglets ? Qu'est-ce que ça prouve ?
- [ ] Fait
### 4. 🧩 Résoudre
Sans changer de fenêtre, trouve comment savoir **qui** comprend tes commandes dans l'onglet où tu es. Indice : regarde l'invite, avant le curseur.
- [ ] Fait
### 5. 💬 Expliquer
Choisis une image de la vie courante pour le terminal (écran, téléphone, guichet…) et explique-la en une phrase.
- [ ] Fait

> [!question]- Indice (l'idée, pas la réponse)
> Le terminal est comme l'écran d'un téléphone : il affiche et transmet ce que tu tapes. Il ne décide de rien. Ce qui tourne **dedans** décide.

> [!question]- Solution et raisonnement
> 1. Non : PowerShell refuse `-la` ou réagit autrement, Bash liste tout avec les détails.
> 2. Même fenêtre, résultats différents → ce n'est pas la fenêtre qui interprète, c'est le **shell** lancé dans chaque onglet.
> 3. L'invite trahit le shell : `PS C:\…>` = PowerShell, `oumar@PC:~$` = Bash.
> Image possible : le terminal est le **combiné du téléphone**, le shell est **la personne au bout du fil** qui comprend ta langue (ou pas).

## Validation
- [ ] Mes prédictions : justes, ou je sais maintenant pourquoi elles étaient fausses
- [ ] Je sais expliquer la notion à quelqu'un, sans la fiche
