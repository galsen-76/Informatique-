---
tags:
  - index
---
# Guide

> [!tip] En bref
> Chaque jour : [[Dashboard]] → la prochaine notion de mon niveau → fiche, dessin Excalidraw et exercices visuels → tout de suite l'étape du fil rouge → je coche les cases. Les idées hors sujet vont dans le *Parking* de [[Focus]].

## Où trouver quoi
| Je cherche… | J'ouvre |
| --- | --- |
| ce que je fais maintenant | [[Dashboard]] et [[Focus]] (niveau actuel, notion en cours) |
| ma progression, niveau par niveau | [[Niveaux]] |
| une notion (ce que c'est, pourquoi, comment) | **03 — Concepts**, une fiche par notion, quel que soit le langage ; la syntaxe est dans l'encadré replié « Comment ça s'écrit » |
| une commande précise (docker, git, pip…) | **04 — Commandes**, un sous-dossier par outil |
| une procédure ou les bonnes pratiques d'un outil | **05 — Fiches pratiques** |
| une erreur déjà rencontrée | **06 — Erreurs et solutions** (et [[Fiche - Aide-mémoire des erreurs fréquentes]]) |
| le fil rouge de mon niveau | **07 — Exercices et projets** |
| mon travail (CVAT, Nuclio, réseau de l'entreprise, mémoire) | **11 — Hors parcours**, et [[Référence travail]] pour tout ce qui est hors de mon niveau |
| une vieille fiche ou un ancien exercice | **99 — Archives** |

> [!tip] Le plus rapide : la recherche
> `Ctrl+O` ouvre une note par son nom, `Ctrl+Shift+F` cherche dans tout le coffre. Les noms de fichiers disent ce qu'ils contiennent : `Fiche - …`, `Bonnes pratiques - …`, `Erreur - …`, `Cours - …`, `… au travail` pour le spécifique au travail.

## Comment c'est organisé
| Dossier | Contient | Modèle |
| --- | --- | --- |
| 00 — Dashboard | [[Dashboard]], [[Focus]], [[Révisions]], [[Suivi des acquis]], ce guide | — |
| 01 — Parcours | [[Niveaux]], [[Référence travail]], [[Parcours]] (les 23 modules, pour retrouver par thème), [[Méthode d'apprentissage]] | Module |
| 02 — Cours | Un dossier par module, un cours par chapitre | Cours |
| 03 — Concepts | Une fiche par notion : comprendre, explorer, pratiquer (exercices visuels, mon schéma, fil rouge), relier, réviser | Concept |
| 04 — Commandes | Un sous-dossier par outil | Commande |
| 05 — Fiches pratiques | Procédures pas à pas, et [[Bonnes pratiques]] par outil | Fiche pratique · Bonnes pratiques |
| 06 — Erreurs et solutions | Erreurs rencontrées et résolues (neutres) | Erreur |
| 07 — Exercices et projets | Les fils rouges (niveau 0 : [[Projet - Suivre ses dépenses en Python]], puis [[Projet - MesDépenses]]) | Exercice · Projet |
| 08 — Ressources | Liens et exemples utiles, images | — |
| 10 — Templates | Modèles et le script des vues (`Scripts/learning.js`) | — |
| 11 — Hors parcours | Travail : CVAT et Nuclio (projets, notes, erreurs, « … au travail »), Environnement entreprise, Mémoire tests Playwright | — |
| 99 — Archives | Anciens exercices, fiches fusionnées, contenus terminés | — |

## Installation
1. **Ouvrir le coffre** : Obsidian → *Ouvrir un dossier comme coffre*.
2. **Plugins communautaires** (*Paramètres → Plugins communautaires* → désactiver le mode restreint) :

| Plugin | Rôle | |
| --- | --- | --- |
| [Dataview](https://obsidian.md/plugins?id=dataview) | Dashboard, niveaux, progression, révisions | indispensable |
| [Excalidraw](https://obsidian.md/plugins?id=obsidian-excalidraw-plugin) | Mes schémas et les exercices visuels | indispensable |
| [Templater](https://obsidian.md/plugins?id=templater-obsidian) | Modèles qui posent les questions et rangent la fiche | recommandé |

3. **Réglages**
   - Dataview : *Enable JavaScript Queries* activé.
   - Templater : *Template folder location* → `10 — Templates` ; *Trigger Templater on new file creation* activé.
4. **Thème** : *Apparence* → thème **Sombre** → *Extraits CSS* → activer **dev-learning**.

## Les gestes du quotidien
- **Créer une fiche** : `Alt+N` (Templater) → choisir le modèle → répondre aux questions.
- **Dessiner** : dans la fiche, section « Mon schéma », je crée le dessin « Schéma - <notion> » et je l'intègre (`![[Schéma - <notion>.excalidraw]]`).
- **Cocher les cases** d'une notion, dans ses propriétés : `schema`, `exercice_visuel`, `fil_rouge`. Les trois cochées : la notion est **comprise**.
- **Maîtrisé** : c'est moi qui mets `status: maitrise`, quand je le sens.
- **Passer au niveau suivant** : quand [[Niveaux]] dit « validé », je change `niveau_actuel` dans [[Focus]].
- **Me faire interroger** : je demande à Claude dans le chat.

## Ce qui demande un plugin
| Fonction | Nécessite |
| --- | --- |
| Dashboard, niveaux, progression, révisions, bloc « où j'en suis » des fiches | Dataview (+ JavaScript Queries) |
| Schémas | Excalidraw |
| Modèles avec questions et rangement automatique | Templater |
| Callouts, encadrés repliables, Mermaid | Natif |
