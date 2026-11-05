---
tags:
  - index
---
# Guide

> [!tip] En bref
> Le matin : [[Dashboard]]. Dans la journée : tu déplaces tes cartes dans le **Kanban** du projet et tu notes ce que tu fais dans le **Log** de ta note du jour. Tout le reste se met à jour tout seul.

## Installation

1. **Ouvrir le vault** — Obsidian → *Ouvrir un dossier comme coffre* → `Dev Workspace`.
   Pour l'ajouter à un vault existant : copie les dossiers `00` → `08`, et seulement `.obsidian/snippets/developer-workspace.css` dans ton propre `.obsidian/snippets/` (sous Windows, affiche les éléments masqués pour voir `.obsidian`).
2. **Plugins** — *Paramètres → Plugins communautaires* → désactiver le mode restreint → installer :

| Plugin | Rôle | |
| --- | --- | --- |
| [Dataview](https://obsidian.md/plugins?id=dataview) | Toutes les vues (dashboard, journal, calendrier…) | indispensable |
| [Kanban](https://obsidian.md/plugins?id=obsidian-kanban) | Les boards où tu gères tes tâches | indispensable |
| [Templater](https://obsidian.md/plugins?id=templater-obsidian) | Les templates (questions + rangement automatique) | recommandé |
| [Calendar](https://obsidian.md/plugins?id=calendar) | Mini-calendrier latéral pour les notes du jour | optionnel |

   Pas besoin de Tasks, Periodic Notes ni Excalidraw (les schémas Mermaid sont natifs).

3. **Réglages**
   - **Dataview** : *Enable JavaScript Queries* activé · *Date format* `dd/MM/yyyy`.
   - **Templater** : *Template folder location* `07 - Resources/Templates` · *Trigger Templater on new file creation* activé.
   - **Kanban** : *Date format* `YYYY-MM-DD` (valeur par défaut).
   - **Notes quotidiennes** (plugin natif) : dossier `03 - Calendar/Daily`, format `YYYY-MM-DD`, modèle `07 - Resources/Templates/Daily` (déjà réglé si tu ouvres le vault tel quel).
4. **Thème** — *Paramètres → Apparence* : thème **Sombre**, puis *Extraits CSS* → ↻ → activer **developer-workspace**.

## Au quotidien

### Les tâches = le Kanban
Chaque projet a son board : `02 - Tasks/Kanban - <Projet>` (créé automatiquement par le template **Project**). Tu crées et déplaces les cartes **uniquement là**.

| Dans une carte | Effet |
| --- | --- |
| `#urgent` / `#haute` | priorité (remonte dans *Priorités*) |
| `@` puis une date | échéance (calendrier, *En retard*, *Échéances*) |
| `#bug`, `#doc`… | étiquette affichée sur la carte |
| `[[Note]]` | lien vers une note technique, une réunion… |

La fiche projet, [[Tâches]], le [[Dashboard]] et le [[Calendrier]] lisent les boards : rien à recopier.

Dans le board, les tags et les dates ont les mêmes couleurs que dans les vues : `#urgent` rouge, `#haute` orange, date dépassée en rouge, date du jour ou proche en orange (réglé dans les paramètres de chaque board : *Tag colors* / *Date colors*).

### Le calendrier
Un point par type : 🔵 réunion · 🟣 événement · 🟠 échéance · 🔴 en retard · 🟢 activité notée dans le Log. Touche un jour pour ouvrir sa note du jour ; si elle n'existe pas, elle est créée avec le template *Daily*.

### Le Log = ce que tu as fait
Dans la note du jour, section **Log**, une ligne par chose faite :

```text
- [[Application SaaS]] avec [[Alice]] : pair programming sur l'auth #nestjs
```

- le **projet** et les **personnes** sont reconnus par leurs liens ;
- les **#tags** deviennent tes compétences dans le [[Bilan]] ;
- les **réunions passées** s'ajoutent automatiquement au journal.

Où le retrouver : [[Log]] (jour par jour), la fiche de chaque **projet** (section Journal), la fiche de chaque **personne** (tout ce que vous avez fait ensemble), et le [[Bilan]] (récap par projet, compétence, personne et mois sur une période — idéal pour un rapport d'alternance).

> [!info] Personnes
> Crée une fiche avec le template **Person** (rangée dans `04 - Meetings/Personnes`). Un lien vers une personne sans fiche reste du texte simple : le journal ne la compte pas.

### Réunions
Template **Meeting** : participants en liens. Pour une action à faire, sélectionne la ligne → `Alt+E` → **Action vers Kanban** : la carte arrive dans *Todo* du board du projet, avec un lien vers la réunion.

### Créer quelque chose
`Alt+N` → choisir le template. Chaque template pose ses questions et range la note au bon endroit.

### Rituels
- **Matin** : Dashboard → note du jour → choisir ses cartes.
- **Soir** : 2-3 lignes de Log.
- **Vendredi** : template **Weekly Review** (il reprend le Log de la semaine) + tri des [[Notes rapides]].

## Données d'exemple
Tout l'exemple porte le tag `#demo` (4 projets et leurs boards, 3 personnes, 7 réunions, 6 notes du jour…). Pour repartir de zéro : `Ctrl+Shift+F` → `tag:#demo` → supprimer ces notes et les fichiers `Kanban - …` d'exemple.

## Limites
- **Agenda externe** : pas de synchronisation Google Calendar / Outlook. Possible plus tard en lecture seule avec un plugin qui lit un flux ICS.
- **Vues en lecture** : le dashboard, les boards affichés dans les fiches et le journal sont des vues ; on modifie les cartes dans le board Kanban lui-même.
- **Rafraîchissement** : les vues se recalculent à l'ouverture de la note (au besoin : `Ctrl+P` → *Dataview: Rebuild current view*).
- **Prénom** : le dashboard dit bonjour à Oumar — modifiable en haut de `07 - Resources/Scripts/workspace.js`.

## Arborescence
```text
Dev Workspace/
├── .obsidian/   (snippet CSS + réglages de base)
├── 00 - Dashboard/
│   ├── Bilan.md
│   ├── Dashboard.md
│   ├── Inbox/
│   │   └── 2026-11-05 1745.md
│   ├── Log.md
│   └── Notes rapides.md
├── 01 - Projects/
│   ├── Application Mobile.md
│   ├── Application SaaS.md
│   ├── Projets.md
│   ├── Refonte API.md
│   └── Site vitrine.md
├── 02 - Tasks/
│   ├── Kanban - Application Mobile.md
│   ├── Kanban - Application SaaS.md
│   ├── Kanban - Refonte API.md
│   ├── Kanban - Site vitrine.md
│   ├── Sprints/
│   │   └── Sprint 04.md
│   └── Tâches.md
├── 03 - Calendar/
│   ├── Calendrier.md
│   ├── Daily/
│   │   ├── 2026-10-23.md
│   │   ├── 2026-10-30.md
│   │   ├── 2026-11-02.md
│   │   ├── 2026-11-03.md
│   │   ├── 2026-11-04.md
│   │   └── 2026-11-05.md
│   ├── Events/
│   │   ├── 2026-11-16 Fin du Sprint 04.md
│   │   └── 2026-11-20 Mise en production staging.md
│   ├── Semaine.md
│   └── Weekly/
│       └── 2026-W45.md
├── 04 - Meetings/
│   ├── 2026-11-02 Kickoff Refonte API.md
│   ├── 2026-11-03 Architecture des services.md
│   ├── 2026-11-04 Suivi sprint SaaS.md
│   ├── 2026-11-05 Daily Stand-up.md
│   ├── 2026-11-05 Réunion projet SaaS.md
│   ├── 2026-11-06 Point démo intermédiaire.md
│   ├── 2026-11-10 Revue d'architecture API.md
│   ├── Personnes/
│   │   ├── Alice.md
│   │   ├── Bob.md
│   │   └── Karim.md
│   ├── Personnes.md
│   └── Réunions.md
├── 05 - Engineering/
│   ├── ADR/
│   │   ├── ADR-001 Stockage des fichiers sur S3.md
│   │   └── ADR-002 Authentification JWT avec Keycloak.md
│   ├── API/
│   │   └── API Auth v1.md
│   ├── Architecture/
│   │   └── Architecture - Application SaaS.md
│   ├── Backend/
│   │   └── Authentification JWT.md
│   ├── Database/
│   │   └── Index PostgreSQL.md
│   ├── Debugging/
│   │   └── Bug - Timeout export PDF.md
│   ├── DevOps/
│   │   └── Docker Compose - environnement de dev.md
│   ├── Engineering.md
│   ├── Frontend/
│   │   └── Gestion de l'état côté client.md
│   └── Snippets/
│       └── Retry avec backoff (TypeScript).md
├── 06 - Knowledge/
│   ├── Apprentissages/
│   │   └── Git rebase interactif.md
│   ├── IA/
│   ├── Knowledge.md
│   ├── Outils/
│   ├── Références/
│   │   └── Raccourcis du workspace.md
│   ├── Tutoriels/
│   └── Veille/
│       └── Outils IA pour développeurs.md
├── 07 - Resources/
│   ├── Assets/
│   ├── Liens utiles.md
│   ├── Ressources.md
│   ├── Scripts/
│   │   └── workspace.js
│   └── Templates/
│       ├── ADR.md
│       ├── API Documentation.md
│       ├── Action vers Kanban.md
│       ├── Architecture.md
│       ├── Bug Investigation.md
│       ├── Code Snippet.md
│       ├── Daily.md
│       ├── Event.md
│       ├── Kanban.md
│       ├── Knowledge Note.md
│       ├── Meeting.md
│       ├── Person.md
│       ├── Project.md
│       ├── Quick Note.md
│       ├── Retrospective.md
│       ├── Sprint.md
│       ├── Technical Note.md
│       └── Weekly Review.md
└── 08 - Archives/
    └── Archives.md
```
