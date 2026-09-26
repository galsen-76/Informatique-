---
created: 2026-09-24
modified: 2026-09-26
type: guide
tags:
  - accueil/conventions
aliases:
  - "Conventions du coffre"
---

# 📐 Conventions du coffre

## Structure des dossiers
| Dossier | Contenu |
|---|---|
| `00-Accueil` | Accueil, roadmap, tableau de bord, méthode, conventions |
| `00-Conception` → `13-Intelligence-Artificielle` | Notes de connaissance, numérotées dans l'ordre logique d'apprentissage |
| `01_Daily`, `02_Projects`, `04_Snippets` | Espaces de travail (daily notes, projets, extraits de code) |
| `_Templates` | Modèles Templater |

Chaque domaine a une **note index** (MOC) portant son nom (ex. [[TypeScript]], [[Angular]]) : ordre de lecture + tableau de progression Dataview.

## Nommage
- Fichier : `PREFIXE-NN-Sujet.md` (ex. `ANG-10-Signals.md`) → tri naturel dans l'explorateur
- Titre `# ...` : nom lisible, repris dans `aliases` → en tapant `[[Signals Angular` Obsidian propose le bon fichier grâce à l'alias
- Les liens internes sont écrits sous la forme `[[ANG-10-Signals|Signals Angular]]` (fichier + texte affiché) pour ne jamais casser

## Frontmatter (propriétés)
```yaml
created: 2026-09-24          # date de création
modified: 2026-09-24         # mis à jour par le plugin frontmatter-modified-date
type: knowledge              # knowledge | moc | project | snippet | daily | guide
status: "🔴 Not Started"     # 🔴 Not Started | 🟡 In Progress | 🟢 Done
level: Fondamental           # Fondamental | Intermédiaire | Avancé
month: M03                   # mois de la roadmap (M01…M12, Optionnel)
tags: [frontend/typescript/generics]
aliases: ["Generics"]
parent: "[[TypeScript]]"
related_theory: []
related_snippets: ["[[04_Snippets/ts-06-generics]]"]
related_projects: ["[[02_Projects/CinéTrack]]"]
source: "https://…"          # documentation officielle
```
> [!warning] Clés en anglais
> Les clés restent en anglais car les plugins en dépendent (`modified` pour frontmatter-modified-date, `status`/`type` pour Dataview, `#task` pour le plugin Tasks). Le contenu, lui, est en français.

## Structure d'une note de connaissance

Il n'y a **pas de plan unique** : la forme suit le sujet. Chaque note commence par un titre et un encadré **En bref** (une ou deux phrases simples), puis prend le format le plus utile :

| Format | Pour | Sections typiques |
|---|---|---|
| 🧠 Concept | comprendre une idée (closures, HTTP, index SQL) | L'idée (avec une image) · Comment ça marche (exemple) · Pièges |
| 🛠️ Outil / pratique | savoir faire (Git, terminal, Docker) | Commandes utiles (tableau) · Déroulé type · Si ça casse |
| 🧩 Fonctionnalité | utiliser une API de framework (signals, props, guards) | Exemple d'abord · Ce qu'il faut savoir · Pièges |
| ⚖️ Choix / comparaison | décider (Angular vs Vue, SQL vs NoSQL) | Tableau comparatif · Mon choix |
| 📋 Aide-mémoire | retrouver vite (balises HTML, sélecteurs) | Tableaux |

**Règles d'écriture :**
- **Vulgariser** : phrases courtes, chaque mot technique expliqué la première fois qu'il apparaît.
- **Seulement l'utile** : ce qui sert dans les projets ou ce qui aide à comprendre le reste. Pas de section vide ou « pour remplir ».
- **Exemples réels** en TypeScript, tirés des projets (Portfolio, CinéTrack…) quand c'est possible.
- Les liens vers les autres notes sont **dans le texte**, là où ils servent, et dans le frontmatter (`parent`, `related_theory`, `related_projects`).

Modèle : `_Templates/TPL_Base-Knowledge.md` (Templater propose de choisir le format à la création).

## Tags
- Hiérarchiques par domaine : `frontend/…`, `frameworks/angular/…`, `backend/…`, `outils/…`, `securite/…`, `reseaux/…`, `infra/…`, `ia/…`, `theorie/…`, `conception/…`, `methodologie/…`, `algo/…`, `tests/…`, `architecture/…`
- `#task` : **obligatoire** pour que le plugin Tasks voie une tâche (le filtre global est `#task` ; l'ancien `#tache` n'était pas détecté)

## Images et schémas
- Schémas en **Mermaid** (rendus nativement par Obsidian et GitLab, versionnables, modifiables) : `flowchart`, `sequenceDiagram`, `classDiagram`, `erDiagram`, `gitGraph`, `gantt`, `mindmap`
- Captures/dessins (Excalidraw, PNG) : dans le dossier du domaine, intégrés avec `![[image.png]]` (ex. [[ARCH-03-Architecture-en-Couches|Architecture en couches]] intègre `Architecture_backend.png`)
