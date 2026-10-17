---
type: notion
statut: a apprendre
resume: "Node.js est un programme qui exécute du JavaScript en dehors du navigateur : sur ton PC, sur un serveur, dans un conteneur."
revu:
sources:
---
```dataviewjs
await dv.view("Systeme/notion")
```

**En une phrase :** Node.js est un programme qui **exécute du JavaScript en dehors du navigateur** : sur ton PC, sur un serveur, dans un conteneur.

## ❓ Le problème

**Pourquoi ça existe ?**
Pour utiliser JavaScript pour autre chose que des pages web : des outils (npm, Angular CLI, Playwright) et des serveurs (API).

**Qu'est-ce qui se passait sans ça ?**
JavaScript ne tournait que dans le navigateur. Pour un serveur ou un outil en ligne de commande, il fallait un autre langage (PHP, Java…).

## 💡 Comment ça marche

Node prend le moteur JavaScript de Chrome (**V8**) et lui ajoute ce que le navigateur n'a pas : lire et écrire des fichiers sur mon PC, ouvrir un port réseau, lancer des processus.

```bash
node --version     # vérifier qu'il est installé
node mon-script.js # exécuter un fichier
```

Deux usages à distinguer :

- **Outil** : Node exécute les instructions, fait la tâche, puis s’arrête (`ng g c`, `npm install`).
- **Serveur** : Node exécute aussi les instructions, mais le programme écoute sur un port, donc il reste allumé pour répondre aux demandes (`ng serve`).

C'est pour ça qu'on part très souvent d'une **image Docker `node`** : elle contient déjà Node et npm.

## ⚠️ Limites et pièges

- **Version de Node** : certains outils exigent une version minimale. Utiliser nvm pour en changer facilement, et la même version en local et en CI.
- **Pas de `window` ni de `document`** dans Node : ce sont des objets du navigateur.
- **Un serveur Node qui écoute sur `localhost`** n'est pas joignable depuis l'extérieur d'un conteneur : il doit écouter sur `0.0.0.0`.

## 🔗 Liens

- **Prérequis :** 
- **Voir aussi :** [[npm]], [[Port]], [[Docker]]
- **Utilisé dans :** npm, Angular CLI, Playwright, les API

## 📚 Notes

- 
