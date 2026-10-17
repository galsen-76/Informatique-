---
type: notion
statut: a apprendre
resume: "Le .dockerignore liste les fichiers que Docker ne doit pas copier dans l'image, comme un .gitignore pour Docker."
revu:
sources:
---
```dataviewjs
await dv.view("Systeme/notion")
```

**En une phrase :** Le `.dockerignore` liste les fichiers que Docker **ne doit pas copier** dans l'image, comme un `.gitignore` pour Docker.

## ❓ Le problème

**Pourquoi ça existe ?**
Pour que `COPY . .` n'embarque pas tout le dossier : dépendances locales, historique Git, secrets.

**Qu'est-ce qui se passait sans ça ?**
Les images étaient énormes et lentes à construire, embarquaient `node_modules/` compilé pour Windows au lieu de Linux, et parfois le fichier `.env` avec les mots de passe.

## 💡 Comment ça marche

*Explique avec tes mots, comme à un collègue.*

Un fichier `.dockerignore` à la racine du projet, à côté du Dockerfile :
```
node_modules
dist
.git
.env
*.log
coverage
playwright-report
test-results
```

Quand Docker construit l'image, il envoie d'abord le dossier du projet (le **contexte de build**). Tout ce qui est listé ici est exclu avant même l'envoi : le build est plus rapide et l'image plus légère.

## ⚠️ Limites et pièges

- **Oublier `node_modules`** : la cause n°1 d'images énormes et de bugs du type « module compilé pour une autre plateforme ».
- **Oublier `.env`** : les secrets finissent dans l'image.
- **Il ne remplace pas le `.gitignore`** : les deux fichiers servent à des choses différentes, il faut souvent les deux.

## 🔗 Liens

- **Prérequis :** [[Dockerfile]]
- **Voir aussi :** [[Variables d'environnement Docker]]
- **Utilisé dans :** tous les projets avec un Dockerfile

## 📚 Notes

- 
