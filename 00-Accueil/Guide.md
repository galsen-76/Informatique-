---
type: guide
tags:
  - accueil
aliases:
  - "Guide"
  - "Mode d'emploi"
---

# 📖 Guide : comment utiliser ce coffre

> [!abstract] Deux coffres, deux rôles
> - **Informatique** (celui-ci) : la **connaissance**. Des notes de cours, des révisions, des snippets, un carnet d'erreurs.
> - **Planning** : les **projets et les journées**. Kanban, échéances, réunions, notes du jour.
>
> Dans Planning, tu écris *« j'ai appris X »*. Ici, tu écris *ce qu'est X*.

## ⚙️ Vérification (une seule fois par appareil)
1. ⚙️ → Modules complémentaires : le *Mode restreint* doit être désactivé, et **Dataview** et **Templater** activés.
2. ⚙️ → **Dataview** → **Enable JavaScript Queries** doit être activé (déjà réglé dans le coffre).
3. Ferme et rouvre Obsidian, puis ouvre l'[[Accueil]]. Si tu vois les boutons et « À réviser », tout marche.

## 🔁 La routine
| Quand | Quoi | Temps |
|------|------|------|
| **Chaque jour** | Accueil → 🧠 **À réviser** : ouvre la note, fais son *rappel actif* **sans regarder**, puis **✅ Su** ou **🔁 Pas su**. | 10 min |
| **Tu commences une notion** | Ouvre sa note et passe son `status` en `🟡 In Progress`. Elle apparaît dans « J'apprends en ce moment ». | 5 s |
| **Tu sais l'expliquer sans regarder** | Passe son `status` en `🟢 Done` (sa grille de maîtrise t'aide à juger). Elle entre toute seule dans les révisions. | 5 s |
| **Une question te vient** | Champ **❓ Ajouter** de l'Accueil, puis Entrée. | 5 s |
| **Tu résous une erreur** | Champ **🐞 Ajouter** : `message → cause → solution`. | 20 s |
| **Une notion n'a pas de note** | Choisis le dossier, écris le titre, **➕ Note**. Le modèle te demande le format (concept, outil…). | 1 min |
| **Une fois par semaine** | Vide [[A-creuser\|À creuser]] : chaque question devient une réponse dans une note ou une nouvelle note. | 10 min |

## 📌 Les 6 règles
1. **Une notion = une note.** Si elle existe, complète-la au lieu d'en créer une autre.
2. **Le statut dit la vérité** : `🔴 Not Started` → `🟡 In Progress` quand tu l'apprends → `🟢 Done` quand tu sais l'**expliquer sans regarder**.
3. **Pas plus de 5 notes 🟡 à la fois.** Finir avant de commencer.
4. **Les révisions passent avant les nouvelles notions.** 7 par jour suffisent.
5. **Une erreur résolue = une ligne dans le carnet.** Si elle revient, ajoute-la aussi dans les *Pièges* de sa note de cours.
6. **Pas de tâches, de dates ni de projets ici** : ça va dans Planning.

## 🧠 Comment marchent les révisions
Une note `🟢 Done` arrive dans « À réviser ».
- **✅ Su** : elle revient dans 1, 3, 7, 15, 30, 60, puis 120 jours.
- **🔁 Pas su** : elle revient demain et repart du début.

Les boutons écrivent trois champs dans la note. Tu n'as pas à y toucher :

```yaml
revoir: 2026-10-23        # prochaine révision
palier: 2                 # 0 = demain, puis 3, 7, 15, 30, 60, 120 jours
derniere_revision: 2026-10-16
```

Pour forcer une révision : mets `revoir:` à la date du jour. Pour sortir une note des révisions : repasse son `status` en `🟡 In Progress` et supprime `revoir:`.

## 🗂️ Où est quoi
- [[Accueil]] : les boutons, les révisions, ce que tu apprends, ta progression, les domaines.
- `00-` à `13-` : les notes de cours, par domaine.
- `04_Snippets/` : ton code commenté et le [[Erreurs-resolues|carnet d'erreurs]].
- [[A-creuser|À creuser]] : les questions en attente.
- `_Templates/` et `_Systeme/` : **n'y touche pas**, c'est le moteur.
