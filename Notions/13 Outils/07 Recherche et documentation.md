---
type: notion
statut: a apprendre
resume: "Savoir trouver une information fiable fait progresser plus vite que tout le reste."
revu:
sources:
  - "https://developer.mozilla.org/fr/"
---
# Recherche et documentation

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Savoir **trouver une information fiable** fait progresser plus vite que tout le reste.

## Le problème

**Pourquoi c'est utile ?**
Pour trouver vite une information fiable : doc officielle, code source, tickets, puis forums.

**Qu'est-ce qui se passait sans ça ?**
On copiait la première réponse trouvée sur un forum, souvent obsolète ou fausse.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

L'ordre : la documentation officielle, puis le code source et les tickets de la librairie, puis les forums. L'IA aide énormément, mais elle se trompe parfois avec assurance : vérifie toujours dans la source officielle.

### Où chercher, dans l'ordre

| Source | Pour | Adresse |
|---|---|---|
| **Documentation officielle** | la référence, à jour | angular.dev, vuejs.org, docs.nestjs.com, prisma.io/docs |
| **MDN** | HTML, CSS, JavaScript, HTTP | developer.mozilla.org/fr |
| **Tickets GitHub** de la librairie | bugs connus, contournements | onglet *Issues* du dépôt |
| **Code source** | quand la doc ne dit pas tout | le dépôt, ou `node_modules/` |
| **Stack Overflow** | problèmes courants | vérifie la **date** et la version |
| **L'IA** | expliquer, proposer une piste | à vérifier dans la doc (voir IA au quotidien) |

### Chercher efficacement

- **Copie le message d'erreur exact** entre guillemets, en retirant ce qui est propre à ton projet (chemins, noms).
- Ajoute la **techno et la version** : `"NG0201" angular 20`.
- Cherche en **anglais** : dix fois plus de résultats.
- Lis la réponse **et les commentaires** : ils signalent souvent qu'elle est dépassée.

### Lire une documentation

1. **Getting started / Tutorial** : pour démarrer.
2. **Guides** : comment faire une tâche (formulaires, routes, authentification).
3. **API reference** : la liste précise des options, à consulter quand tu sais déjà ce que tu cherches.

Pas besoin de tout lire : lis la partie dont ta tâche a besoin, c'est la méthode du vault (Méthode d'apprentissage).

### Demander de l'aide

Quand tu bloques plus de 30 à 60 minutes, demande, avec :
- **ce que tu veux faire** ;
- **ce qui se passe** (message d'erreur complet) ;
- **ce que tu as déjà essayé** ;
- un **exemple minimal** qui reproduit le problème.

Souvent, rédiger la question suffit à trouver la réponse.

## 🧪 Exemple

> À compléter avec un exemple tiré de ton travail.

## ⚠️ Limites et pièges

- **Copier une réponse sans la comprendre** : le bug revient sous une autre forme.
- **Un tutoriel vidéo de 2019** pour un framework qui a beaucoup changé.

## 🏋️ S'entraîner

### Vérifier la version

Beaucoup de réponses en ligne concernent une **ancienne version** :
- Angular : `*ngIf`, `@Input()`, NgModules, `angular.io` → ancien. `@if`, `input()`, standalone, `angular.dev` → actuel.
- Vue : `data()`, `methods` (Options API) → ancien style. `<script setup>` → actuel.

Vérifie ta version : `ng version`, `npm ls vue`, ou le `package.json`.

## 🔗 Liens

- **Prérequis :** 
- **Voir aussi :** [[06 Résolution de problèmes et débogage|Résolution de problèmes et débogage]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://developer.mozilla.org/fr/
