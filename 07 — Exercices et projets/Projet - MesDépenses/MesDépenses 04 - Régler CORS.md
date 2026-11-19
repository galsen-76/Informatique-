---
type: exercise
status: a-faire
niveau: 2
difficulty: moyen
concepts:
  - "[[CORS]]"
  - "[[En-tête HTTP]]"
tags:
  - exercice
  - mini-projet
---
# MesDépenses 04 - Régler CORS

> [!info] Où tu en es
> **Projet :** [[Projet - MesDépenses]] · **Étape précédente :** [[MesDépenses 03 - Vue, afficher la liste]]
> **Cours :** [[Cours - Une API robuste, validation, erreurs et CORS]]
> **Notions :** [[CORS]] · [[En-tête HTTP]] · [[Méthode HTTP]] · [[Port]]
> **Fiches :** [[Fiche - Lire un message d'erreur]] · [[Fiche - Utiliser les outils de développement du navigateur]]

## Le but
Comprendre **qui** bloque la requête de l'étape 03, et autoriser ton front, et lui seul, à appeler l'API.

## Ce que tu fais
- [ ] Avec l'erreur de la console : quelle est l'origine du front ? Celle de l'API ? Qu'est-ce qui les rend différentes ?
- [ ] Appelle la même route avec curl : ça marche. Explique pourquoi curl n'est pas bloqué et le navigateur oui
- [ ] Dans l'onglet Réseau, regarde les en-têtes de la **réponse** de l'API. Lequel manque ?
- [ ] Ajoute la configuration CORS dans `api/app/main.py`, à l'endroit marqué. N'autorise **que** l'origine de ton front, pas `*`
- [ ] Recharge : la liste s'affiche. Change le port du front (`--port 5174`) : que se passe-t-il ? Rends la liste des origines réglable par une variable d'environnement
- [ ] Reconstruis l'image de l'API (étape 02) pour qu'elle contienne ta modification

> [!warning] Le piège
> C'est l'**API** qui doit répondre avec les bons en-têtes. Toucher au front ne règle rien.

> [!success] Ça marche si…
> La liste s'affiche depuis http://localhost:5173, une autre origine est refusée, et l'origine autorisée se règle sans modifier le code.

> [!quote] Mes notes
> _Avec mes mots : qui bloque, pourquoi, et ce que j'ai changé._

> [!question]- Indice
> FastAPI a un middleware tout prêt pour ça (cherche « CORSMiddleware » dans sa documentation). Une origine, c'est schéma + hôte + port.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] J'ai expliqué l'erreur à Claude avec mes mots
