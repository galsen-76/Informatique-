---
type: notion
statut: a apprendre
resume: "Les artifacts sont les fichiers qu'un job garde après sa fin (rapports, captures, builds), pour les télécharger ou les passer aux jobs suivants."
revu:
sources:
---
```dataviewjs
await dv.view("Systeme/notion")
```

**En une phrase :** Les artifacts sont les **fichiers qu'un job garde après sa fin** (rapports, captures, builds), pour les télécharger ou les passer aux jobs suivants.

## ❓ Le problème

**Pourquoi ça existe ?**
Parce que le conteneur d'un job est jeté à la fin : sans artifacts, le rapport Playwright disparaîtrait avec lui.

**Qu'est-ce qui se passait sans ça ?**
On ne pouvait voir que les logs texte du job. Pour comprendre un échec, il fallait relancer le test en local.

## 💡 Comment ça marche

*Explique avec tes mots, comme à un collègue.*

```yaml
artifacts:
  when: always               # garder les fichiers même si le job échoue (sinon : seulement si succès)
  expire_in: 1 week
  paths:
    - appTest/playwright-report/
    - appTest/test-results/  # traces et captures des tests en échec
  reports:
    junit: appTest/results.xml   # GitLab affiche les résultats test par test dans la MR
```

Un artifact, ce n'est pas le résultat d'une commande : c'est **un fichier ou un dossier qui existe à la fin du job**, à l'endroit indiqué. GitLab va le chercher à ce chemin, quel que soit son format (HTML, JSON, XML, zip).

On les retrouve sur la page du job : **Browse** ou **Download**.

## ⚠️ Limites et pièges

- **`WARNING: ... no matching files`** : le chemin est faux. Il part de la **racine du dépôt**, pas du dossier où tu as fait `cd`.
- **Sans `when: always`**, rien n'est gardé quand les tests échouent… c'est-à-dire quand on en a le plus besoin.
- **Le dossier doit exister** : le reporter (`html`, `junit`) doit être activé dans [[06 Configuration Playwright|Configuration Playwright]].
- **Artifacts ≠ cache** : le cache sert à accélérer (ex. `node_modules`), les artifacts à garder des résultats.

## 🔗 Liens

- **Prérequis :** [[02 Pipeline GitLab CI|Pipeline GitLab CI]]
- **Voir aussi :** [[06 Configuration Playwright|Configuration Playwright]]
- **Utilisé dans :** le rapport Playwright de chaque pipeline

## 📚 Notes

- 
