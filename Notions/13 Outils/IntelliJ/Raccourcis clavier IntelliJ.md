---
type: notion
statut: a apprendre
resume: "Les raccourcis font la vraie différence de vitesse dans IntelliJ."
revu:
sources:
  - "https://www.jetbrains.com/help/idea/mastering-keyboard-shortcuts.html"
---
# Raccourcis clavier IntelliJ

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Les raccourcis font la vraie différence de vitesse dans IntelliJ.

## Le problème

**Pourquoi c'est utile ?**
Pour aller beaucoup plus vite sans la souris.

**Qu'est-ce qui se passait sans ça ?**
On passait son temps dans les menus pour des actions faites cent fois par jour.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Pas besoin de tout apprendre : commence par les 5 premiers, ajoute-en 3 ou 4 par semaine. Raccourcis **Windows / Linux** (sur Mac : `Ctrl` → `Cmd`, `Alt` → `Option`).

### Les 5 à connaître dès le premier jour

| Raccourci | Action |
|---|---|
| **`Shift` `Shift`** | chercher partout (fichier, classe, action) |
| **`Alt+Entrée`** | corrections et actions rapides à l'endroit du curseur |
| **`Ctrl+B`** ou `Ctrl+clic` | aller à la définition |
| **`Shift+F6`** | renommer partout, sans rien casser |
| **`Ctrl+Shift+A`** | chercher une action ou un réglage par son nom |

### Naviguer

| Raccourci | Action |
|---|---|
| `Ctrl+Shift+N` | ouvrir un fichier par son nom |
| `Ctrl+N` | ouvrir une classe |
| `Ctrl+E` | fichiers récents |
| `Ctrl+Shift+E` | derniers endroits modifiés |
| `Alt+F7` | trouver toutes les utilisations |
| `Ctrl+F12` | structure du fichier (méthodes) |
| `Ctrl+Alt+←` / `→` | revenir / avancer dans les déplacements |
| `Ctrl+Shift+F` | chercher dans tout le projet |
| `Ctrl+Shift+R` | remplacer dans tout le projet |

### Éditer

| Raccourci | Action |
|---|---|
| `Ctrl+D` | dupliquer la ligne |
| `Ctrl+Y` | supprimer la ligne |
| `Alt+Shift+↑` / `↓` | déplacer la ligne |
| `Ctrl+/` | commenter |
| `Ctrl+W` | agrandir la sélection (mot → expression → bloc) |
| `Alt+J` | sélectionner l'occurrence suivante (multi-curseur) |
| `Ctrl+Alt+L` | reformater |
| `Ctrl+Alt+O` | nettoyer les imports |
| `Ctrl+Espace` | autocomplétion |
| `Ctrl+P` | voir les paramètres d'une fonction |
| `Ctrl+Q` | documentation rapide |

### Refactoriser

| Raccourci | Action |
|---|---|
| `Ctrl+Alt+Shift+T` | menu de tous les refactorings |
| `Ctrl+Alt+V` | extraire une variable |
| `Ctrl+Alt+M` | extraire une fonction |
| `Ctrl+Alt+C` | extraire une constante |
| `Ctrl+Alt+N` | l'inverse : remplacer par sa valeur (inline) |

Détails : [[Refactoring IntelliJ|Refactoring]].

### Lancer, déboguer, Git

| Raccourci | Action |
|---|---|
| `Shift+F10` / `Shift+F9` | lancer / déboguer |
| `Ctrl+F8` | poser un point d'arrêt |
| `F8` / `F7` / `F9` | ligne suivante / entrer dans la fonction / continuer |
| `Alt+F8` | évaluer une expression pendant le débogage |
| `Alt+F12` | terminal |
| `Ctrl+K` / `Ctrl+Shift+K` | commit / push |
| `Ctrl+T` | mettre à jour le projet (pull) |

### Apprendre sans effort

- Le plugin **Key Promoter X** affiche le raccourci chaque fois que tu cliques sur une action avec la souris.
- Si tu viens de VS Code, le keymap « VSCode » existe (*Settings → Keymap*), mais passe aux raccourcis IntelliJ après quelques semaines. Voir [[Passer de VS Code à IntelliJ|Transition depuis VS Code]].

## 🧪 Exemple

> À compléter avec un exemple tiré de ton travail.

## ⚠️ Limites et pièges

- 

## 🔗 Liens

- **Prérequis :** [[Interface et fondamentaux IntelliJ]]
- **Voir aussi :** 
- **Utilisé dans :** 

## 📚 Notes

- Source : https://www.jetbrains.com/help/idea/mastering-keyboard-shortcuts.html
