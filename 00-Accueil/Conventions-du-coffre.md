---
created: 2026-09-24
modified: 2026-09-24
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
children: []
related_theory: []
related_snippets: ["[[04_Snippets/ts-06-generics]]"]
related_projects: ["[[02_Projects/CinéTrack]]"]
source: "https://…"          # documentation officielle
```
> [!warning] Clés en anglais
> Les clés restent en anglais car les plugins en dépendent (`modified` pour frontmatter-modified-date, `status`/`type` pour Dataview, `#task` pour le plugin Tasks). Le contenu, lui, est en français.

## Structure d'une note de connaissance
1. `# Titre` + `[!abstract] Introduction` (une phrase) + `[!warning]- Prérequis`
2. **Théorie** : callouts repliables — C'est quoi ? · Analogie · Pourquoi ? · Comment ? · Quand ? · Limites (+ Schéma Mermaid si utile)
3. **Vocabulaire** (tableau) · **Points clés** · **Pièges courants** (`[!bug]-`)
4. **Paramètres / Configuration** (si pertinent) · **Exemple minimal** + « Ce que j'en retiens »
5. **Pour aller plus loin (niveau senior)** (`[!tip]-`)
6. **Connexions** (parent, sous-sujets, comparaisons, snippet, projet)
7. **Auto-vérification** (`[!check]-`) + **Questions d'entretien** (`[!faq]-`)
8. **Tâches** (`- [ ] #task …`) · **Notes brutes** (`- ? question ouverte`)

Modèle : `_Templates/TPL_Base-Knowledge.md`.

## Tags
- Hiérarchiques par domaine : `frontend/…`, `frameworks/angular/…`, `backend/…`, `outils/…`, `securite/…`, `reseaux/…`, `infra/…`, `ia/…`, `theorie/…`, `conception/…`, `methodologie/…`, `algo/…`, `tests/…`, `architecture/…`
- `#task` : **obligatoire** pour que le plugin Tasks voie une tâche (le filtre global est `#task` ; l'ancien `#tache` n'était pas détecté)

## Images et schémas
- Schémas en **Mermaid** (rendus nativement par Obsidian et GitLab, versionnables, modifiables) : `flowchart`, `sequenceDiagram`, `classDiagram`, `erDiagram`, `gitGraph`, `gantt`, `mindmap`
- Captures/dessins (Excalidraw, PNG) : dans le dossier du domaine, intégrés avec `![[image.png]]` (ex. [[ARCH-03-Architecture-en-Couches|Architecture en couches]] intègre `Architecture_backend.png`)
