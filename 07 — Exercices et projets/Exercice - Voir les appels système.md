---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[Noyau (kernel)]]"
tags:
  - exercice
---
# Exercice — Voir les appels système

> [!info] Avant de commencer
> **Notion travaillée :** [[Noyau (kernel)]]
> **À voir avant :** [[Système d'exploitation et noyau]]
> **Objectif :** Constater de tes yeux que même une commande simple passe son temps à demander des choses au noyau.

> [!tip] Comment faire cet exercice
> Les consignes donnent un **but**, pas la commande. Quand on te demande de **prédire**, écris ta réponse *avant* de lancer quoi que ce soit : c'est l'écart entre ta prédiction et le résultat qui fait comprendre. Tu peux chercher dans la fiche de la notion, pas dans la solution.

## Étapes
### 1. 🔮 Prédire
Combien de demandes au noyau (appels système) crois-tu que `cat /etc/hostname` fait pour afficher une seule ligne ? 1 ? 10 ? 100 ? Écris ton chiffre.
- [ ] Fait
### 2. 🧪 Vérifier
Installe l'outil `strace` dans WSL, puis lance-le devant `cat /etc/hostname` pour voir chaque appel système, et compte-les (cherche l'option qui fait un résumé).
- [ ] Fait
### 3. 💬 Expliquer
Dans la liste, retrouve les appels qui **ouvrent** le fichier, le **lisent** et **écrivent** à l'écran. Pourquoi « écrire à l'écran » passe aussi par le noyau ?
- [ ] Fait
### 4. 🔧 Réparer
Lance la même chose sur un fichier qui n'existe pas. Retrouve dans la sortie de `strace` l'appel qui échoue et l'erreur renvoyée. Quel lien avec le message que tu vois d'habitude ?
- [ ] Fait
### 5. 💬 Expliquer
Reformule en une phrase ce qu'est un appel système.
- [ ] Fait

> [!question]- Indice (l'idée, pas la réponse)
> `strace` affiche chaque demande d'un programme au noyau, avec la réponse. Les noms à repérer : ouvrir, lire, écrire.

> [!question]- Solution et raisonnement
> - Il y en a généralement plusieurs dizaines (chargement du programme, des bibliothèques, puis le vrai travail). La plupart des gens prédisent beaucoup moins.
> - `sudo apt install strace` puis `strace cat /etc/hostname` ; `strace -c` donne le résumé.
> - `openat(...)` ouvre, `read(...)` lit, `write(1, ...)` écrit sur la sortie standard : l'écran est un périphérique, donc seul le noyau peut y écrire.
> - Fichier absent : `openat(...) = -1 ENOENT (No such file or directory)`. C'est exactement le message que `cat` te montre : il ne fait que traduire la réponse du noyau.
> - Un appel système est une **demande d'un programme au noyau** pour faire quelque chose qu'il n'a pas le droit de faire seul (fichier, mémoire, réseau, écran).

## Validation
- [ ] Mes prédictions : justes, ou je sais maintenant pourquoi elles étaient fausses
- [ ] Je sais expliquer la notion à quelqu'un, sans la fiche
