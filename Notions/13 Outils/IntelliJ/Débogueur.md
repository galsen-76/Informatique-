---
type: notion
statut: a apprendre
resume: "Le débogueur met ton programme en pause sur une ligne choisie (un point d'arrêt) et te montre la valeur de toutes les variables à cet instant."
revu:
sources:
  - "https://www.jetbrains.com/help/idea/debugging-code.html"
---
# Débogueur

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Le **débogueur** met ton programme **en pause** sur une ligne choisie (un point d'arrêt) et te montre la valeur de **toutes les variables** à cet instant.

## Le problème

**Pourquoi c'est utile ?**
Pour mettre le programme en pause sur une ligne et voir la valeur de toutes les variables.

**Qu'est-ce qui se passait sans ça ?**
On ajoutait des console.log partout, on relançait, on les oubliait dans le code.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Tu avances ensuite ligne par ligne. C'est bien plus rapide que d'ajouter des `console.log` partout et de relancer.

### Le déroulé

1. **Poser un point d'arrêt** : clic dans la marge à gauche de la ligne (point rouge), ou `Ctrl+F8`.
2. **Lancer en mode debug** : `Shift+F9` (ou l'icône 🐞 à côté de ▶).
3. Le programme s'arrête sur la ligne. La fenêtre **Debug** montre les variables.
4. **Avancer** :

| Touche | Action |
|---|---|
| `F8` | ligne suivante (sans entrer dans les fonctions) |
| `F7` | entrer dans la fonction appelée |
| `Shift+F8` | sortir de la fonction |
| `F9` | continuer jusqu'au prochain point d'arrêt |
| `Alt+F8` | **évaluer une expression** avec les valeurs du moment |

### Déboguer une API NestJS

1. Crée une configuration **npm** qui lance le script `start:debug` (*Run → Edit Configurations → + → npm*).
2. Lance-la en mode debug.
3. Pose un point d'arrêt dans un service, envoie la requête (fichier `.http`, voir [[Client HTTP Postman et Bruno|Clients API]]).
4. L'exécution s'arrête : tu vois le DTO reçu, le résultat de Prisma, l'utilisateur connecté.

### Déboguer le front (Angular / Vue)

1. Lance `ng serve` ou `npm run dev` normalement.
2. Crée une configuration **JavaScript Debug** avec l'URL `http://localhost:4200` (ou `5173`).
3. Lance-la en debug : un navigateur s'ouvre, et tes points d'arrêt dans les `.ts` et `.vue` fonctionnent, grâce aux *source maps*.

Tu peux aussi déboguer directement dans le navigateur : F12 → Sources (voir [[Gestion des erreurs et DevTools|DevTools]]).

### Les points d'arrêt malins

Clic droit sur le point rouge :

| Option | Usage |
|---|---|
| **Condition** | s'arrêter seulement si `movie.id === 27205` (dans une boucle de 500 films) |
| **Log sans s'arrêter** | afficher un message dans la console sans modifier le code |
| **Désactiver** | garder le point sans qu'il s'arrête |

Et « s'arrêter sur exception » : *Run → View Breakpoints → JavaScript Exception Breakpoints*.

## 🧪 Exemple

> À compléter avec un exemple tiré de ton travail.

## ⚠️ Limites et pièges

- **Des `console.log` partout** au lieu du débogueur, puis oubliés dans le commit.
- **Point d'arrêt ignoré** (rond gris) : le code n'a pas été exécuté, ou les source maps ne sont pas trouvées (lancer en mode debug, pas en mode normal).
- **Rester en pause trop longtemps** sur une API : la requête du client expire.

## 🔗 Liens

- **Prérequis :** [[Interface et fondamentaux IntelliJ]]
- **Voir aussi :** 
- **Utilisé dans :** 

## 📚 Notes

- Source : https://www.jetbrains.com/help/idea/debugging-code.html
