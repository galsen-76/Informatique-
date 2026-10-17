---
type: notion
statut: a apprendre
resume: "npm install installe et peut mettre à jour le lock ; npm ci installe exactement le lock, sans rien toucher : c'est celui de la CI."
revu:
sources:
---
```dataviewjs
await dv.view("Systeme/notion")
```

**En une phrase :** `npm install` installe **et peut mettre à jour** le lock ; `npm ci` installe **exactement** le lock, sans rien toucher : c'est celui de la CI.

## ❓ Le problème

**Pourquoi ça existe ?**
Pour avoir des installations identiques et reproductibles sur les machines de CI.

**Qu'est-ce qui se passait sans ça ?**
En CI, `npm install` pouvait installer une version plus récente qu'en local et modifier le lock : un build cassait sans que personne n'ait touché au code.

## 💡 Comment ça marche

*Explique avec tes mots, comme à un collègue.*

| | `npm install` | `npm ci` |
|---|---|---|
| Lit | `package.json` (+ lock) | **uniquement le lock** |
| Modifie le lock | oui, si besoin | **jamais** |
| `node_modules` existant | complété | **supprimé puis recréé** |
| Si `package.json` et lock ne collent pas | met à jour le lock | **s'arrête avec une erreur** |
| Pour | ton poste, ajouter des paquets | **la CI**, une install propre |

En résumé : en local tu fais `npm install` quand tu ajoutes ou changes une dépendance, puis tu commites le lock. Partout ailleurs (CI, Docker, agent Squash) : `npm ci`.

## ⚠️ Limites et pièges

- **`npm ci` sans lock** → erreur `EUSAGE`.
- **`npm ci` qui bloque** en entreprise = souvent le réseau : il n'arrive pas à joindre le registre (proxy, pare-feu, `.npmrc` manquant).
- **Lock pas à jour** après avoir modifié `package.json` à la main → `npm ci` refuse : relance `npm install` et commite le lock.

## 🔗 Liens

- **Prérequis :** [[npm]], [[Notions/13 Outils/npm/package-json et package-lock]]
- **Voir aussi :** [[Pipeline GitLab CI]], [[Dockerfile]]
- **Utilisé dans :** le `script:` des jobs CI, les Dockerfile (`RUN npm ci`)

## 📚 Notes

- 
