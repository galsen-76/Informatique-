---
type: notion
statut: a apprendre
resume: "Tu connais VS Code ?"
revu:
sources:
  - "https://www.jetbrains.com/help/idea/migrating-from-vscode.html"
---
# Passer de VS Code à IntelliJ

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Tu connais VS Code ?

## Le problème

**Pourquoi c'est utile ?**
Pour retrouver dans IntelliJ ce qu'on faisait déjà dans VS Code.

**Qu'est-ce qui se passait sans ça ?**
Les premières semaines dans un nouvel IDE étaient perdues à chercher où était chaque fonction.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Presque tout existe dans IntelliJ, souvent **sans extension**, mais à un autre endroit et avec d'autres raccourcis. Cette table te fait gagner les premières semaines.

### Les équivalences

| VS Code | IntelliJ |
|---|---|
| `Ctrl+P` (ouvrir un fichier) | `Ctrl+Shift+N`, ou `Shift` `Shift` |
| `Ctrl+Shift+P` (commandes) | `Ctrl+Shift+A` |
| `F12` (définition) | `Ctrl+B` |
| `Shift+F12` (utilisations) | `Alt+F7` |
| `F2` (renommer) | `Shift+F6` |
| `Ctrl+.` (corrections rapides) | `Alt+Entrée` |
| `Shift+Alt+F` (formater) | `Ctrl+Alt+L` |
| `Ctrl+D` (occurrence suivante) | `Alt+J` |
| `Shift+Alt+↓` (dupliquer) | `Ctrl+D` |
| `Ctrl+Shift+K` (supprimer la ligne) | `Ctrl+Y` |
| `` Ctrl+` `` (terminal) | `Alt+F12` |
| `Ctrl+B` (panneau latéral) | `Alt+1` |
| Extension GitLens | Git natif + *Annotate with Git Blame* |
| Extension ESLint / Prettier | intégrés (*Settings → Languages & Frameworks → JavaScript*) |
| Extension REST Client | client HTTP natif (fichiers `.http`) |
| Extension Docker / base de données | fenêtres *Services* et *Database* |
| `settings.json` | *Settings* (`Ctrl+Alt+S`) |
| `launch.json` | *Run Configurations* |

### Les différences d'esprit

| | VS Code | IntelliJ |
|---|---|---|
| Philosophie | éditeur léger, enrichi par des extensions | IDE complet, tout inclus |
| Démarrage | instantané | indexation au premier lancement |
| Refactoring | correct | **excellent** (sûr sur tout le projet) |
| Clic droit | peu d'options | beaucoup d'actions contextuelles |
| Prix | gratuit | Ultimate / WebStorm payants (licence entreprise ; WebStorm gratuit pour un usage non commercial) |

### Le plan de transition

1. **Semaine 1** : keymap « VSCode » si besoin (*Settings → Keymap*), et apprends `Shift` `Shift` + `Alt+Entrée`.
2. **Semaines 2-3** : repasse au keymap IntelliJ, avec **Key Promoter X** pour apprendre au fil de l'eau.
3. **Ensuite** : explore le refactoring (`Ctrl+Alt+Shift+T`) et le débogueur : c'est là qu'IntelliJ fait vraiment la différence.

Tous les raccourcis : [[Raccourcis clavier IntelliJ|Raccourcis]].

## 🧪 Exemple

> À compléter avec un exemple tiré de ton travail.

## ⚠️ Limites et pièges

- **Chercher une extension** pour une fonctionnalité déjà présente.
- **Rester sur le keymap VS Code** indéfiniment : certains raccourcis IntelliJ n'y ont pas d'équivalent.

## 🔗 Liens

- **Prérequis :** [[Interface et fondamentaux IntelliJ]]
- **Voir aussi :** 
- **Utilisé dans :** 

## 📚 Notes

- Source : https://www.jetbrains.com/help/idea/migrating-from-vscode.html
