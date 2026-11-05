---
cssclasses:
  - dw-wide
tags:
  - index
---
# Parcours

> [!info] Comment lire ce parcours
> Chaque module dépend de ceux qui le précèdent sur le schéma. La progression d'un module est calculée à partir du statut de ses notions : *à découvrir* 0 · *en cours* 1/3 · *compris* 2/3 · *maîtrisé* 3/3. Clique sur un module pour l'ouvrir.

```mermaid
flowchart TD
  M1["Module 01 - Fondamentaux informatiques"]
  M2["Module 02 - Terminal et environnement"]
  M3["Module 03 - Git et GitHub"]
  M4["Module 04 - HTML et CSS"]
  M5["Module 05 - JavaScript"]
  M6["Module 06 - TypeScript"]
  M7["Module 07 - Node.js"]
  M8["Module 08 - Backend et API REST"]
  M9["Module 09 - Bases de données et SQL"]
  M10["Module 10 - Authentification et sécurité"]
  M11["Module 11 - React"]
  M12["Module 12 - Tests"]
  M13["Module 13 - Docker"]
  M14["Module 14 - DevOps et déploiement"]
  M15["Module 15 - Architecture logicielle"]
  M1 --> M2
  M2 --> M3
  M1 --> M4
  M4 --> M5
  M5 --> M6
  M2 --> M7
  M5 --> M7
  M1 --> M8
  M7 --> M8
  M8 --> M9
  M8 --> M10
  M9 --> M10
  M5 --> M11
  M6 --> M11
  M7 --> M12
  M8 --> M12
  M2 --> M13
  M7 --> M13
  M3 --> M14
  M12 --> M14
  M13 --> M14
  M8 --> M15
  M9 --> M15
  M12 --> M15
  class M1 internal-link;
  class M2 internal-link;
  class M3 internal-link;
  class M4 internal-link;
  class M5 internal-link;
  class M6 internal-link;
  class M7 internal-link;
  class M8 internal-link;
  class M9 internal-link;
  class M10 internal-link;
  class M11 internal-link;
  class M12 internal-link;
  class M13 internal-link;
  class M14 internal-link;
  class M15 internal-link;
```

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "parcours" })
```

Voir aussi : [[Méthode d'apprentissage]] · [[Chemins de compréhension]] · [[Suivi des acquis]]
