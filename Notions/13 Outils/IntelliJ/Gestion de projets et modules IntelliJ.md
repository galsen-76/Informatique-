---
type: notion
statut: a apprendre
resume: "Deux réglages évitent 90 % des soucis dans IntelliJ : la version de Node / TypeScript utilisée par le projet (sinon de fausses erreurs apparaissent), et les configurations de lancement (Run Configurations) pour démarrer ton front, ton API ou tes tests en un clic."
revu:
sources:
  - "https://www.jetbrains.com/help/idea/creating-and-managing-projects.html"
---
# Gestion de projets et modules IntelliJ

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Deux réglages évitent 90 % des soucis dans IntelliJ : la **version de Node / TypeScript** utilisée par le projet (sinon de fausses erreurs apparaissent), et les **configurations de lancement** (*Run Configurations*) pour démarrer ton front, ton API ou tes tests en un clic.

## Le problème

**Pourquoi c'est utile ?**
Pour régler la bonne version de Node et TypeScript et lancer le projet en un clic.

**Qu'est-ce qui se passait sans ça ?**
De fausses erreurs partout parce que l'IDE utilisait une autre version, et des commandes de lancement retapées à chaque fois.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

### Le bon Node et le bon TypeScript

*Settings (`Ctrl+Alt+S`) → Languages & Frameworks* :

| Réglage | Valeur |
|---|---|
| **Node.js → Node interpreter** | la version du projet (celle de WSL si tu travailles dans WSL) |
| **Node.js → Package manager** | npm |
| **TypeScript → TypeScript** | celui du projet : `node_modules/typescript` |

**Symptôme d'un mauvais réglage :** du code rouge partout alors que `npm run build` fonctionne. Vérifie ces réglages avant de chercher plus loin.

### Les configurations de lancement

Au lieu de retaper les commandes : *Run → Edit Configurations → +*.

| Configuration | Type | Contenu |
|---|---|---|
| Front Vue | npm | script `dev` |
| Front Angular | npm | script `start` (ou Angular CLI Server) |
| API NestJS | npm | script `start:debug` |
| Tests | Vitest | fichier ou dossier de tests |
| Débogage navigateur | JavaScript Debug | `http://localhost:5173` |

Ensuite : le menu déroulant en haut à droite, ▶ pour lancer, 🐞 pour déboguer (voir [[Débogueur|Débogage]]).

**Compound** : une configuration qui lance **plusieurs** autres d'un coup (front + API).

Coche *Store as project file* pour partager une configuration avec l'équipe (dans `.run/`).

### Plusieurs projets ensemble

Pour travailler sur le front et l'API en même temps :
- un **monorepo** (un seul dépôt `apps/web` + `apps/api`) s'ouvre comme un projet unique ;
- sinon, *File → Open* le second projet et choisis *Attach* pour l'ajouter à la même fenêtre.

### La base de données dans l'IDE

Fenêtre **Database** → *+ → Data Source → PostgreSQL* → hôte `localhost`, port `5432`, base, utilisateur, mot de passe. Tu peux ensuite parcourir les tables et écrire du SQL avec autocomplétion (voir [[PostgreSQL en pratique]]).

## 🧪 Exemple

> À compléter avec un exemple tiré de ton travail.

## ⚠️ Limites et pièges

- **Ignorer des erreurs rouges** qui viennent d'un mauvais interpréteur, ou au contraire **perdre une heure** sur de fausses erreurs.
- **Un « module » IntelliJ** n'a rien à voir avec un module TypeScript ou NestJS : c'est une sous-partie d'un projet dans l'IDE.

## 🔗 Liens

- **Prérequis :** [[Interface et fondamentaux IntelliJ]]
- **Voir aussi :** 
- **Utilisé dans :** 

## 📚 Notes

- Source : https://www.jetbrains.com/help/idea/creating-and-managing-projects.html
