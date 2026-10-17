---
type: notion
statut: a apprendre
resume: "npm est le gestionnaire de paquets de Node.js : il télécharge les bibliothèques dont ton projet a besoin et lance tes scripts."
revu:
sources:
---
```dataviewjs
await dv.view("Systeme/notion")
```

**En une phrase :** npm est le **gestionnaire de paquets** de Node.js : il télécharge les bibliothèques dont ton projet a besoin et lance tes scripts.

## ❓ Le problème

**Pourquoi ça existe ?**
Pour récupérer en une commande toutes les dépendances d'un projet (Playwright, Angular…), dans les bonnes versions, au lieu de les télécharger à la main.

**Qu'est-ce qui se passait sans ça ?**
On copiait des fichiers `.js` trouvés sur Internet dans son projet, sans savoir quelle version on avait ni comment les mettre à jour.

## 💡 Comment ça marche

*Explique avec tes mots, comme à un collègue.*

npm, c'est trois choses :

1. **Un programme** (le `npm` de ton terminal). Il est écrit en JavaScript, donc c'est **Node** qui le fait tourner. C'est pour ça qu'il s'installe avec Node.
2. **Un registre** : un énorme serveur de paquets (`registry.npmjs.org`, ou le miroir de l'entreprise). Voir [[05 Registre npm|Registre npm]].
3. **Un fichier** : [[02 package-json et package-lock|package.json]], la liste de ce dont ton projet a besoin.

Quand tu tapes `npm install`, le shell lance Node, qui exécute npm. npm lit `package.json`, demande les paquets au registre via le réseau, et les écrit dans `node_modules/` sur le disque.

| Commande | Rôle |
|---|---|
| `npm install` | installe tout (et met à jour le lock) |
| `npm install <paquet>` | ajoute une dépendance |
| `npm install -D <paquet>` | ajoute une dépendance de dev (tests, outils) |
| `npm ci` | installe exactement le lock (CI) |
| `npm run <script>` | lance un script de `package.json` |

## ⚠️ Limites et pièges

- **`node_modules/` ne se versionne jamais** (il est dans `.gitignore`) : on le recrée avec `npm ci`.
- **`npm install` peut changer le lock** : en CI, on utilise `npm ci`. Voir [[03 npm install vs npm ci|npm install vs npm ci]].
- **En entreprise, le registre public est souvent bloqué** : il faut le miroir interne (`.npmrc`).
- **`sudo npm install -g`** : à éviter, ça pose des problèmes de droits. Préférer nvm.

## 🔗 Liens

- **Prérequis :** [[12 NodeJS|NodeJS]]
- **Voir aussi :** [[02 package-json et package-lock|package-json et package-lock]], [[03 npm install vs npm ci|npm install vs npm ci]], [[05 Registre npm|Registre npm]], [[04 npx|npx]]
- **Utilisé dans :** tous les projets JavaScript / TypeScript, la CI

## 📚 Notes

- 
