---
created: <% tp.date.now("YYYY-MM-DD") %>
modified: <% tp.date.now("YYYY-MM-DD") %>
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: ""
tags:
  - 
aliases:
  - "<% tp.file.title %>"
parent: "[[]]"
related_theory: []
related_projects: []
source: ""
---

# <% tp.file.title %>

> [!abstract] En bref
> _Une ou deux phrases simples : ce que c'est et à quoi ça sert dans mes projets._

<%*
// Choisir le format adapté au sujet, puis supprimer les autres
const format = await tp.system.suggester(
  ["🧠 Concept (comprendre une idée)", "🛠️ Outil / pratique (savoir faire)", "🧩 Fonctionnalité (framework, API)", "⚖️ Choix / comparaison", "📋 Aide-mémoire"],
  ["concept", "outil", "feature", "choix", "memo"]
);
if (format === "concept") { -%>
## L'idée

_Explication simple, avec une image de la vie courante si ça aide._

## Comment ça marche

```ts
// Petit exemple commenté
```

## Pièges

- 
<%* } else if (format === "outil") { -%>
## Les commandes utiles

| Commande | Ce qu'elle fait |
|---|---|
|  |  |

## Le déroulé type

1. 

## Si ça casse

- 
<%* } else if (format === "feature") { -%>
## Exemple

```ts
// Le cas le plus courant
```

## Ce qu'il faut savoir

- 

## Pièges

- 
<%* } else if (format === "choix") { -%>
## Comparaison

| Critère | Option A | Option B |
|---|---|---|
|  |  |  |

## Mon choix

_Quand prendre quoi._
<%* } else { -%>
## Aide-mémoire

| Élément | Usage |
|---|---|
|  |  |
<%* } -%>
