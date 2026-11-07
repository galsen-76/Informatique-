---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[Processus]]"
tags:
  - exercice
---
# Exercice — Les programmes qui tournent

> [!info] Avant de commencer
> **Notion travaillée :** [[Processus]]
> **À voir avant :** [[Bash]]
> **Objectif :** Comprendre qu'un programme lancé devient un processus, avec un numéro, un parent, et des signaux pour l'arrêter.

> [!tip] Comment faire cet exercice
> Les consignes donnent un **but**, pas la commande. Quand on te demande de **prédire**, écris ta réponse *avant* de lancer quoi que ce soit : c'est l'écart entre ta prédiction et le résultat qui fait comprendre. Tu peux chercher dans la fiche de la notion, pas dans la solution.

## Étapes
### 1. 🔮 Prédire
Tu lances un serveur web au premier plan, puis tu fermes **la fenêtre du terminal**. Prédis : le serveur continue-t-il ? Et si tu l'avais lancé en arrière-plan ?
- [ ] Fait
### 2. 🧪 Vérifier
Essaie les deux cas, et vérifie depuis un autre terminal si le processus existe encore.
- [ ] Fait
### 3. 🧩 Résoudre
Lance un serveur en arrière-plan, retrouve son numéro, puis arrête-le **sans** fermer le terminal. Ensuite, trouve qui est son **parent**.
- [ ] Fait
### 4. 💬 Expliquer
Quelle est la différence entre `Ctrl+C` et `Ctrl+Z` ? Et entre arrêter un processus « gentiment » et « de force » ? Pourquoi essayer d'abord gentiment ?
- [ ] Fait
### 5. 🔧 Réparer
Tu relances ton serveur et tu obtiens `Address already in use`. Explique ce qui se passe et trouve comment régler le problème proprement.
- [ ] Fait

> [!question]- Indice (l'idée, pas la réponse)
> Chaque programme lancé = un processus avec un **PID** et un **parent** (souvent ton shell). `Ctrl+C` et `kill` envoient des **signaux**. Fermer le terminal envoie aussi un signal à ses enfants.

> [!question]- Solution et raisonnement
> - En général le serveur s'arrête quand le terminal se ferme : le shell parent disparaît et ses enfants reçoivent un signal de fin. En arrière-plan simple (`&`), il est souvent arrêté aussi ; pour qu'il survive, il faut `nohup` ou un service.
> - `python3 -m http.server 8000 &`, puis `ps aux | grep http.server` (ou `jobs -l`), `kill <PID>` ; le parent : `ps -o ppid= -p <PID>` → c'est le PID de ton shell.
> - `Ctrl+C` demande l'arrêt ; `Ctrl+Z` met en pause (reprise avec `fg`). `kill` demande gentiment (le programme peut ranger, fermer ses fichiers) ; `kill -9` coupe net, sans nettoyage.
> - Un ancien serveur occupe encore le port : le retrouver (`ss -ltnp | grep 8000` ou `ps`) et l'arrêter.

## Validation
- [ ] Mes prédictions : justes, ou je sais maintenant pourquoi elles étaient fausses
- [ ] Je sais expliquer la notion à quelqu'un, sans la fiche
