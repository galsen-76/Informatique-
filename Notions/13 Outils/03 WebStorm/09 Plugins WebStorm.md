---
type: notion
statut: a apprendre
resume: "WebStorm fait déjà presque tout d'origine (TypeScript, Angular, Vue, Git, tests, client HTTP)."
revu:
sources:
  - "https://plugins.jetbrains.com/"
---
# Plugins WebStorm

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : WebStorm fait déjà presque tout d'origine (TypeScript, Angular, Vue, Git, tests, client HTTP).

## Le problème

**Pourquoi c'est utile ?**
Pour ajouter à l'IDE ce qui lui manque, sans le surcharger.

**Qu'est-ce qui se passait sans ça ?**
On installait trop de plugins, et l'IDE devenait lent et instable.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Les plugins servent à ajouter ce qui manque. Règle : **peu de plugins**, bien choisis, sinon l'IDE ralentit.

### Ce qui est déjà inclus (inutile de chercher un plugin)

TypeScript, JavaScript, Angular, Vue, HTML, CSS / SCSS, ESLint, Prettier, Git, terminal, client HTTP (`.http`), outil base de données (WebStorm Ultimate / WebStorm), Docker, débogueur.

Vérifie qu'ils sont activés : *Settings → Plugins → Installed*.

### Les plugins utiles

| Plugin | Pour |
|---|---|
| **Key Promoter X** | apprendre les raccourcis (affiche le raccourci de chaque clic) |
| **Prisma ORM** | coloration et autocomplétion de `schema.prisma` |
| **Tailwind CSS** | autocomplétion des classes (souvent déjà inclus) |
| **Rainbow Brackets** | parenthèses colorées par niveau |
| **GitToolBox** | auteur et date du dernier changement sur chaque ligne |
| **.env files support** | coloration des fichiers `.env` |
| **Mermaid** | aperçu des diagrammes dans les `.md` |

### Installer

*Settings → Plugins → Marketplace* → rechercher → *Install* → redémarrer si demandé.

## 🧪 Exemple

> À compléter avec un exemple tiré de ton travail.

## ⚠️ Limites et pièges

- **Chercher un plugin pour une fonctionnalité déjà native** (réflexe VS Code) : regarde d'abord dans `Ctrl+Shift+A`.
- **Trop de plugins** : démarrage lent, instabilité. Désinstalle ce que tu n'utilises plus.
- **Un plugin non maintenu** : vérifie la date de mise à jour et la compatibilité avec ta version d'WebStorm.

## 🔗 Liens

- **Prérequis :** [[01 Interface et fondamentaux WebStorm|Interface et fondamentaux WebStorm]]
- **Voir aussi :** 
- **Utilisé dans :** 

## 📚 Notes

- Source : https://plugins.jetbrains.com/
