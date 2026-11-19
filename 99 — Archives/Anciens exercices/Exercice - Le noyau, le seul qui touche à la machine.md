---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[Système d'exploitation et noyau]]"
tags:
  - exercice
---
# Exercice — Le noyau, le seul qui touche à la machine

> [!info] Avant de commencer
> **Notion travaillée :** [[Système d'exploitation et noyau]]
> **À voir avant :** rien d'autre que cette notion.
> **Objectif :** Comprendre que les programmes ne touchent jamais directement au matériel : ils demandent au système, qui décide.

> [!tip] Comment faire cet exercice
> Les consignes donnent un **but**, pas la commande. Quand on te demande de **prédire**, écris ta réponse *avant* de lancer quoi que ce soit : c'est l'écart entre ta prédiction et le résultat qui fait comprendre. Tu peux chercher dans la fiche de la notion, pas dans la solution.

## Étapes
### 1. 🔮 Prédire
Tu crées un fichier dans un dossier qui appartient à `root`, puis dans ton dossier personnel. Prédis ce qui se passe dans chaque cas, et **qui** prend la décision : ton shell, le programme, ou le système ?
- [ ] Fait
### 2. 🧪 Vérifier
Essaie dans WSL (un dossier système comme `/etc`, puis `~`). Lis le message d'erreur : qui te répond ?
- [ ] Fait
### 3. 💬 Expliquer
Tu lances deux programmes qui veulent écrire en même temps sur le disque. Sans système d'exploitation, que pourrait-il arriver ? Donne deux problèmes.
- [ ] Fait
### 4. 🧩 Résoudre
Trouve comment afficher séparément **le noyau** et **la distribution** de ta WSL. Les deux réponses n'ont pas la même forme : explique pourquoi.
- [ ] Fait
### 5. 💬 Expliquer
Pourquoi un programme fait pour Linux ne tourne pas directement sous Windows, même sur le même processeur ?
- [ ] Fait

> [!question]- Indice (l'idée, pas la réponse)
> Pense au noyau comme au gardien d'un immeuble : les habitants (les programmes) ne touchent pas aux compteurs, ils lui demandent, et il vérifie qu'ils en ont le droit.

> [!question]- Solution et raisonnement
> 1. Dans `/etc` : `Permission denied`. Le message vient du **noyau**, que le programme a interrogé ; le shell ne fait que l'afficher. Dans `~` : ça marche, tu en es le propriétaire.
> 2. Sans arbitre : fichiers écrasés ou mélangés, un programme qui lit les données d'un autre, un programme bogué qui bloque tout.
> 3. `uname -r` donne la version du noyau ; `cat /etc/os-release` donne la distribution (Ubuntu). Deux choses différentes : le moteur et la voiture.
> 4. Chaque noyau a son propre « langage » (appels système) et son format de programme (`.exe` contre ELF). Il faut un noyau Linux, d'où WSL.

## Validation
- [ ] Mes prédictions : justes, ou je sais maintenant pourquoi elles étaient fausses
- [ ] Je sais expliquer la notion à quelqu'un, sans la fiche
