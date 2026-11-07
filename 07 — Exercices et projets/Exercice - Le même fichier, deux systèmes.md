---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[Fichiers entre Windows et Linux]]"
tags:
  - exercice
---
# Exercice — Le même fichier, deux systèmes

> [!info] Avant de commencer
> **Notion travaillée :** [[Fichiers entre Windows et Linux]]
> **À voir avant :** [[Système de fichiers]]
> **Objectif :** Comprendre les trois différences qui cassent des projets entre Windows et Linux : fins de ligne, casse des noms, droit d'exécution.

> [!tip] Comment faire cet exercice
> Les consignes donnent un **but**, pas la commande. Quand on te demande de **prédire**, écris ta réponse *avant* de lancer quoi que ce soit : c'est l'écart entre ta prédiction et le résultat qui fait comprendre. Tu peux chercher dans la fiche de la notion, pas dans la solution.

## Étapes
### 1. 🔮 Prédire
Un script `.sh` écrit sous Windows avec des fins de ligne CRLF est lancé dans Linux. Prédis l'erreur, puis explique ce que Linux « voit » à la fin de la première ligne.
- [ ] Fait
### 2. 🧪 Vérifier
Fabrique ce cas (un éditeur réglé en CRLF, ou une commande qui ajoute `\r`), lance-le, et trouve une commande qui **montre** les caractères invisibles.
- [ ] Fait
### 3. 🧩 Résoudre
Corrige le fichier, puis trouve comment dire à Git de toujours garder les `.sh` en LF, quel que soit le système.
- [ ] Fait
### 4. 🔮 Prédire
Ton code fait `import outils` alors que le fichier s'appelle `Outils.py`. Prédis : marche sous Windows ? dans un conteneur Linux ?
- [ ] Fait
### 5. 💬 Expliquer
Pourquoi un script exécutable sous Linux peut perdre son droit d'exécution après un passage par Windows, et comment Git peut le garder ?
- [ ] Fait

> [!question]- Indice (l'idée, pas la réponse)
> Windows termine les lignes par `\r\n`, Linux par `\n`. Windows ignore la casse des noms, Linux non. Le droit `x` n'existe pas sous Windows : Git le stocke à part.

> [!question]- Solution et raisonnement
> - `bad interpreter: /bin/bash^M` : Linux lit `bash\r`, un programme qui n'existe pas.
> - `cat -A script.sh` affiche `^M$` en fin de ligne ; corriger avec `sed -i 's/\r$//' script.sh` ou `dos2unix`, et dans `.gitattributes` : `*.sh text eol=lf`.
> - `import outils` : marche sous Windows (casse ignorée), `ModuleNotFoundError` sous Linux.
> - Windows n'a pas de droit `x` : un fichier recréé ou copié côté Windows le perd. Git garde le mode : `git update-index --chmod=+x script.sh`, puis commit.

## Validation
- [ ] Mes prédictions : justes, ou je sais maintenant pourquoi elles étaient fausses
- [ ] Je sais expliquer la notion à quelqu'un, sans la fiche
