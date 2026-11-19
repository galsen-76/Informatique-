---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Vue.js]]"
  - "[[Composant monofichier Vue (SFC)]]"
  - "[[Réactivité Vue (ref et computed)]]"
  - "[[Directives Vue]]"
  - "[[Appeler une API avec fetch]]"
tags:
  - exercice
  - mini-projet
---
# MesDépenses 03 - Vue, afficher la liste

> [!info] Où tu en es
> **Projet :** [[Projet - MesDépenses]] · **Étape précédente :** [[MesDépenses 02 - L'API dans Docker]]
> **Cours :** [[Cours - Vue.js, composants, réactivité et directives]]
> **Notions :** [[Vue.js]] · [[Composant monofichier Vue (SFC)]] · [[Réactivité Vue (ref et computed)]] · [[Directives Vue]] · [[Outil de build front (Vite)]] · [[npm]] · [[Appeler une API avec fetch]]
> **Fiches :** [[Fiche - Utiliser les outils de développement du navigateur]] · [[Bonnes pratiques - React et frameworks front]]
> **À créer :** cycle de vie d'un composant Vue (`onMounted`)

## Le but
Une page Vue qui affiche la liste des dépenses de l'API : libellé, catégorie, date, montant, et le total en bas.

## Ce que tu fais
- [ ] Crée le projet `front-vue/` avec Vite (TypeScript), lance-le, ouvre http://localhost:5173
- [ ] Vide la page d'exemple. Fais un composant `ListeDepenses.vue` qui affiche d'abord une liste **écrite en dur** dans le code
- [ ] Remplace la liste en dur par un appel à `GET /depenses` au chargement du composant
- [ ] Ouvre la console du navigateur : ça ne marche pas. **Ne corrige rien encore** : recopie l'erreur exacte dans tes notes et regarde l'onglet Réseau. La requête est-elle partie ? L'API a-t-elle répondu ? → étape 04
- [ ] (Après l'étape 04) Affiche le total avec une valeur calculée, et un message « Aucune dépense » quand la liste est vide
- [ ] Mets l'adresse de l'API dans une variable d'environnement Vite, pas en dur dans le code

> [!warning] Le piège
> Si tu remplaces la liste au lieu de modifier une variable réactive, la page ne se met pas à jour, sans aucune erreur.

> [!success] Ça marche si…
> Les 3 dépenses d'exemple s'affichent avec le bon total, et l'adresse de l'API n'apparaît nulle part dans les fichiers `.vue`.

> [!quote] Mes notes
> _L'erreur exacte de la console, ce que j'ai compris._

> [!question]- Indice
> `npm create vue@latest` pose des questions : TypeScript oui, le reste non pour l'instant. Les variables d'environnement lues par Vite commencent par `VITE_` et se lisent avec `import.meta.env`.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] Claude a relu mon composant
