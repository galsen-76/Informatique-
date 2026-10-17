---
type: notion
statut: a apprendre
resume: "package.json dit ce dont le projet a besoin (avec des marges de version), package-lock.json note exactement ce qui a été installé."
revu:
sources:
---
```dataviewjs
await dv.view("Systeme/notion")
```

**En une phrase :** `package.json` dit **ce dont le projet a besoin** (avec des marges de version), `package-lock.json` note **exactement ce qui a été installé**.

## ❓ Le problème

**Pourquoi ça existe ?**
Pour que tout le monde (toi, ton collègue, la CI) installe exactement les mêmes versions des dépendances.

**Qu'est-ce qui se passait sans ça ?**
Avec seulement des marges de version (`^1.2.0`), deux personnes installant à une semaine d'écart obtenaient des versions différentes : « ça marche chez moi » mais pas chez l'autre.

## 💡 Comment ça marche

*Explique avec tes mots, comme à un collègue.*

**`package.json`**, c'est la liste de courses :

```json
{
  "name": "exploration-tests",
  "scripts": { "test": "playwright test" },
  "devDependencies": { "@playwright/test": "^1.63.0" }
}
```

`^1.63.0` veut dire « 1.63.0 ou plus récent, tant que ça commence par 1 ». `~1.63.0` veut dire « seulement les 1.63.x ».

**`package-lock.json`**, c'est le ticket de caisse : la version exacte de **chaque** paquet installé (même les dépendances de tes dépendances), avec une empreinte (`integrity`) pour vérifier qu'il n'a pas été modifié.

On **versionne les deux** dans Git. On ne versionne pas `node_modules/`.

## ⚠️ Limites et pièges

- **Pas de lock dans le dossier** → `npm ci` refuse (erreur `EUSAGE`).
- **Le lock n'est pas au même niveau que le `package.json`** (ex. projet dans `appTest/`) → se placer dans le bon dossier.
- **Conflit Git dans le lock** : ne pas le corriger à la main. Prendre une version, puis relancer `npm install`.
- **Le lock garde l'adresse du registre** (`resolved`) : un lock généré sur le registre public peut poser problème derrière un miroir d'entreprise.

## 🔗 Liens

- **Prérequis :** [[01 npm|npm]]
- **Voir aussi :** [[03 npm install vs npm ci|npm install vs npm ci]]
- **Utilisé dans :** la racine de chaque projet Node

## 📚 Notes

- 
