---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - outils/terminal
aliases:
  - "Terminal et Bash"
parent: "[[Outils]]"
children: []
related_theory:
  - "[[LNX-01-Linux-Essentiels|Linux Essentiels]]"
related_snippets:
  - "[[04_Snippets/out-01-terminal-bash]]"
related_projects: []
source: "https://www.gnu.org/software/bash/manual/"
---

# Terminal et Bash

> [!abstract] Introduction
> Le terminal est l'outil de base du développeur : naviguer, lancer des commandes (npm, git, docker), enchaîner des outils et automatiser des tâches avec des scripts shell.

---

## Théorie

> [!question]- C'est quoi ?
> ```bash
> pwd; ls -la; cd projets/cinetrack
> mkdir -p src/app && touch README.md
> cp a.txt b.txt; mv b.txt docs/; rm -r dossier
> cat fichier; less gros.log; head -n 20; tail -f app.log
> grep -rn "TODO" src/            # chercher dans les fichiers
> find . -name "*.spec.ts"
> cmd1 | cmd2                      # pipe : sortie de cmd1 → entrée de cmd2
> cmd > fichier ; cmd >> fichier   # redirection (écraser / ajouter)
> ```

> [!example]- Analogie
> L'interface graphique est un restaurant avec menu illustré ; le terminal, c'est parler directement au chef : plus rapide et plus précis dès qu'on connaît la langue.

> [!question]- Pourquoi l'utiliser ?
> Les outils de dev (CLI Angular, npm, git, docker, kubectl, ssh sur un serveur) s'utilisent en ligne de commande ; sur un serveur de production il n'y a souvent QUE le terminal.

> [!question]- Comment ça marche ?
> - Variables d'environnement : `export API_URL=…`, `echo $PATH`
> - Codes de retour : `0` = succès, `&&` enchaîne si succès, `||` si échec
> - Historique : flèche haut, `Ctrl+R` (recherche)
> - Windows : utiliser WSL2 (Linux dans Windows) ou Git Bash
> - Script : fichier `.sh` commençant par `#!/usr/bin/env bash`, `set -euo pipefail`

> [!question]- Quand l'utiliser ?
> Au quotidien ; scripts pour automatiser ce qu'on fait plus de 3 fois.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Les commandes destructrices (`rm -rf`) n'ont pas de corbeille.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Shell | Interpréteur de commandes (bash, zsh, PowerShell) |
| Pipe | Enchaînement de commandes `|` |
| PATH | Liste des dossiers où chercher les exécutables |
| Code de retour | Résultat numérique d'une commande |

---

## Points clés

- `Tab` pour l'autocomplétion
- `man cmd` / `cmd --help`
- `&&` pour enchaîner seulement si succès
- WSL2 sous Windows

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - `rm -rf` avec une variable vide (`rm -rf $DOSSIER/`) → `set -u`
> - Oublier les guillemets autour des chemins avec espaces

---

## Exemple minimal

```bash
#!/usr/bin/env bash
set -euo pipefail
echo "Installation…" && npm ci
npm run lint && npm test -- --watch=false && npm run build
echo "✅ Prêt à pousser"
```

> [!note] Ce que j'en retiens
> `set -euo pipefail` arrête le script à la première erreur : indispensable.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Maîtriser `jq` (JSON), `curl`, `ssh`, `tmux`, alias et fonctions shell

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Outils]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/out-01-terminal-bash]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Que fait `cmd1 && cmd2 || cmd3` ?

---

## Tâches

- [ ] #task Faire le tutoriel « The Missing Semester » (MIT), leçons 1 et 2
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
