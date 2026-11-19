---
type: project
status: a-faire
difficulty: facile
concepts:
  - "[[Processus]]"
  - "[[Code de sortie]]"
tags:
  - exercice
---
# Exercice — Processus et codes de sortie

> [!abstract] Mise en situation
> Faire tourner un serveur, l'arrêter, et lire les codes de sortie comme le ferait une CI.
> Elle mélange plusieurs notions : fais-la **après** les exercices de chacune. Elle ne compte pas dans la validation de la maîtrise.

> [!info] Objectif
> Lancer, retrouver et arrêter des programmes, et lire leur verdict.
> Notions : [[Processus]] · [[Code de sortie]]

## Consignes
- [ ] Lance `python3 -m http.server 8000` dans WSL, ouvre `http://localhost:8000`, puis arrête-le avec Ctrl+C
- [ ] Relance-le en arrière-plan, retrouve son PID et arrête-le avec `kill`
- [ ] Affiche le code de sortie d'une commande qui réussit et d'une qui échoue
- [ ] Teste `commande_qui_echoue && echo OK` puis `commande_qui_echoue || echo KO`
- [ ] Explique pourquoi un job GitLab échoue même si son log semble normal

> [!question]- Indice
> `&` à la fin lance en arrière-plan ; `ps aux | grep http.server` donne le PID ; `$?` donne le code de la dernière commande.

> [!question]- Solution
> ```bash
> python3 -m http.server 8000 &
> ps aux | grep http.server     # PID dans la 2e colonne
> kill <PID>
> ls / ; echo $?                # 0
> ls /nexistepas ; echo $?      # 2
> ls /nexistepas && echo OK     # rien
> ls /nexistepas || echo KO     # KO
> ```
> La CI ne lit pas le texte : une ligne qui renvoie un code non nul fait échouer le job.

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
