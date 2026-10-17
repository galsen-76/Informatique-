---
type: notion
statut: a apprendre
resume: "Une variable d'environnement est une valeur donnée à un programme de l'extérieur, au moment où on le lance, au lieu de l'écrire dans le code."
revu:
sources:
---
```dataviewjs
await dv.view("Systeme/notion")
```

**En une phrase :** Une variable d'environnement est une **valeur donnée à un programme de l'extérieur**, au moment où on le lance, au lieu de l'écrire dans le code.

## ❓ Le problème

**Pourquoi ça existe ?**
Pour changer un réglage (URL testée, mot de passe, mode CI) sans toucher au code, et pour garder les secrets hors de Git.

**Qu'est-ce qui se passait sans ça ?**
On écrivait l'URL et les mots de passe directement dans le code. Pour tester un autre environnement, il fallait modifier le code, et les secrets finissaient dans Git, visibles par tous.

## 💡 Comment ça marche

*Explique avec tes mots, comme à un collègue.*

Chaque programme reçoit une liste de variables de la part de celui qui le lance (le shell, la CI, Docker).

```bash
BASE_URL=https://recette.exemple.fr npx playwright test   # pour une commande
export BASE_URL=https://recette.exemple.fr                # pour toute la session
echo $BASE_URL                                            # lire la valeur
```

Dans Node, on la lit avec `process.env` :

```ts
const url = process.env.BASE_URL ?? 'http://localhost:4200';
```

Où on les définit :
- **en CI** : *Settings → CI/CD → Variables* (cocher **Masked** pour les secrets) ;
- **avec Docker** : `docker run -e BASE_URL=...` ;
- **en local** : un fichier `.env` lu par l'outil, **ajouté au `.gitignore`**.

## ⚠️ Limites et pièges

- **Un `.env` commité = secret publié** : il reste dans l'historique Git même après suppression.
- **`CI=true`** est défini automatiquement par GitLab : c'est ce que teste `process.env.CI` dans la config Playwright.
- **Une variable n'existe que pour le programme lancé et ses enfants** : l'exporter dans un terminal ne la rend pas visible dans un autre.
- **Sous Windows PowerShell**, la syntaxe change : `$env:BASE_URL = "..."`.

## 🔗 Liens

- **Prérequis :** 
- **Voir aussi :** [[Configuration Playwright]], [[Pipeline GitLab CI]]
- **Utilisé dans :** `baseURL`, les jetons (npm, Squash), les mots de passe de test

## 📚 Notes

- 
