---
type: guide
tags:
  - accueil
aliases:
  - "Guide"
  - "Mode d'emploi"
---

# 📖 Guide : comment utiliser le coffre

> [!abstract] En une phrase
> Tout part de l'[[Accueil]] : des boutons créent les notes à ta place, avec la bonne date. Toi, tu écris, tu coches et tu révises.

## ⚙️ Vérification (une seule fois par appareil)
1. ⚙️ → Modules complémentaires : le *Mode restreint* doit être désactivé, et **Dataview**, **Kanban** et **Calendar** activés.
2. ⚙️ → **Dataview** → **Enable JavaScript Queries** doit être activé (déjà réglé dans le coffre).
3. Ferme et rouvre Obsidian, puis ouvre l'[[Accueil]]. Si tu vois les boutons et le calendrier, tout marche.

## 🔁 La routine
| Quand | Quoi | Temps |
|------|------|------|
| **Matin** | Accueil → **📝 Aujourd'hui**. Écris tes 3 priorités. Regarde 🧠 À réviser et 📌 Échéances en bas de la note. | 2 min |
| **En apprenant** | Tu ouvres une note de cours → passe son `status` en `🟡 In Progress`. Ce que tu comprends → une ligne dans 💡 *Ce que j'ai appris* avec le lien de la note. | 10 s |
| **Une erreur résolue** | Une ligne dans 🐞 : `npm ci EUSAGE → pas de package-lock → npm install d'abord`. | 20 s |
| **Une idée en vrac** | Le champ **📥 Inbox** de l'Accueil, puis Entrée. | 5 s |
| **Révision** | 🧠 À réviser : ouvre la note, fais son *rappel actif* **sans regarder**, puis **✅ Su** ou **🔁 Pas su**. | 10 min |
| **Soir** | Remplis ✅ *Ce que j'ai fait*. Coche tes priorités faites. | 2 min |
| **Fin de semaine** | Accueil → **📆 Revue semaine** : tout ce que tu as fait, appris et révisé s'y affiche seul. Écris ton bilan, vide l'Inbox, mets à jour tes Kanban. | 10 min |

## 📌 Les 7 règles
1. **Une tâche de projet = une carte dans le Kanban du projet.** Jamais ailleurs.
2. **Une échéance = `@{2026-10-20}` à la fin de la carte.** Elle apparaît dans le calendrier et la note du jour, en rouge si elle est en retard.
3. **Tu bouges les cartes** : À faire → En cours → Fait. Ce qui est « En cours » s'affiche chaque matin.
4. **Le statut d'une note de cours dit où tu en es** : `🔴 Not Started` → `🟡 In Progress` quand tu l'apprends → `🟢 Done` quand tu sais l'**expliquer sans regarder** (sa grille de maîtrise).
5. **Une note 🟢 entre toute seule dans les révisions.** Su : elle revient dans 1, 3, 7, 15, 30, 60 puis 120 jours. Pas su : elle revient demain.
6. **Ce qui n'est pas coché dans une note du jour te suit** pendant 14 jours (section ↩️).
7. **L'Inbox est vide à la fin de chaque semaine.**

## 🧠 Comment marchent les révisions
Les boutons **✅ Su** et **🔁 Pas su** écrivent trois champs dans la note révisée. Tu n'as pas à y toucher :

```yaml
revoir: 2026-10-23        # prochaine révision
palier: 2                 # 0 = demain, puis 3, 7, 15, 30, 60, 120 jours
derniere_revision: 2026-10-16
```

Pour forcer une révision : mets `revoir:` à la date du jour. Pour sortir une note des révisions : repasse son `status` en `🟡 In Progress` et supprime `revoir:`.

## 🗂️ Où est quoi
- [[Accueil]] : les boutons, le calendrier, ta journée, ta progression, tes projets.
- `01_Daily/` : une note par jour (ta trace). `01_Daily/Semaines/` : tes revues de semaine.
- `02_Projects/` : un dossier par projet = sa fiche + son Kanban. Nouveau projet → champ **➕ Projet** de l'Accueil.
- `00-` à `13-` : les notes de cours, par domaine.
- `04_Snippets/` : les morceaux de code à garder. Une erreur résolue deux fois → un snippet.
- [[Inbox]] : le vrac à trier.
- `_Templates/` et `_Systeme/` : **n'y touche pas**, c'est le moteur.
