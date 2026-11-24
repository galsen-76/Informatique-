---
type: exercise
status: a-faire
niveau: 0
difficulty: facile
concepts:
  - "[[Terminal]]"
  - "[[Shell]]"
  - "[[PowerShell]]"
  - "[[WSL]]"
  - "[[Bash]]"
  - "[[Système d'exploitation et noyau]]"
  - "[[Noyau (kernel)]]"
  - "[[Processeur, mémoire et disque]]"
  - "[[Binaire et octet]]"
  - "[[Distribution Linux]]"
  - "[[Arborescence Linux]]"
  - "[[Processus]]"
tags:
  - exercice
  - mini-projet
---
# Dépenses 00 - Découvrir son poste

> [!info] Où tu en es
> **Projet :** [[Projet - Suivre ses dépenses en Python]] · **Niveau :** 0
> **Étape précédente :** aucune, c'est le début
> **Notions appliquées ici :** [[Terminal]] · [[Shell]] · [[PowerShell]] · [[WSL]] · [[Bash]] · [[Système d'exploitation et noyau]] · [[Noyau (kernel)]] · [[Processeur, mémoire et disque]] · [[Binaire et octet]] · [[Distribution Linux]] · [[Arborescence Linux]] · [[Processus]]
> **Ordre :** pour chaque notion, je lis la fiche, je fais son dessin et ses exercices visuels, puis je fais le morceau de cette étape qui l'utilise.

## Le but
Avant d'écrire le script, tu fais le tour de la machine où il va tourner : quels shells tu as, quel Linux tourne dans WSL, où ranger ton projet, combien de place et de mémoire tu as.

## Ce que tu fais
- [ ] Ouvre PowerShell puis WSL. Note pour chacun : le nom du shell, le dossier où tu arrives, une commande qui marche dans l'un et pas dans l'autre
- [ ] Dans WSL, trouve le nom et la version de la distribution, et la version du noyau. Le noyau est-il celui de Windows ?
- [ ] Trouve combien de mémoire vive et d'espace disque libre tu as dans WSL, et la taille en octets d'un petit fichier texte que tu crées
- [ ] Fais le tour de l'arborescence : où sont les programmes, la configuration, ton dossier personnel, le disque C: vu de Linux. Crée `~/projets/depenses`
- [ ] Lance `sleep 300` en arrière-plan, retrouve son numéro de processus, puis arrête-le
- [ ] Piège : crée le dossier du projet dans `/mnt/c/...` puis dans `~/projets`. Lequel garder, et pourquoi ?

> [!success] Ça marche si…
> Tu as un dossier `~/projets/depenses` côté Linux, et une page de notes avec : ta distribution, ton noyau, ta mémoire, ton disque libre, et la différence PowerShell / Bash.

## Est-ce que j'ai compris ?
Demande à Claude de t'interroger, ou réponds en dessous.
1. Pourquoi WSL a-t-il son propre noyau ?
2. Quelle est la différence entre le terminal et le shell ?
3. Qu'est-ce qu'un processus, et que se passe-t-il quand tu fermes le terminal qui l'a lancé ?

> [!question]- Indice
> Les fiches [[Distribution Linux]], [[Arborescence Linux]] et [[Processus]] listent les commandes utiles. Cherche des commandes qui « affichent » (`cat`, `free`, `df`, `ps`) : rien ici ne modifie le système.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] Les notions de l'étape ont leurs trois cases (schéma, exercices visuels, fil rouge)
- [ ] J'ai répondu aux questions et Claude les a vérifiées
