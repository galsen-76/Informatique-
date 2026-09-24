---
created: 2026-09-16
modified: 2026-09-16
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
aliases:
  - "Git & Contrôle de Version dans IntelliJ"
tags:
  - outils/intellij/git
parent: "[[IntelliJ IDEA]]"
children: []
related_theory: []
related_snippets: []
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://www.jetbrains.com/help/idea/version-control-integration.html"
---

# Git & Contrôle de Version dans IntelliJ

> [!abstract] Introduction
> IntelliJ intègre Git visuellement (commits, branches, conflits) souvent plus riche que l'onglet Source Control natif de VSCode.

> [!warning]- Prérequis
> [[01-GitLab|Fondamentaux GitLab]] ou notions Git de base.

---

## Théorie

> [!question]- C'est quoi ?
> Marqueurs de changement dans la marge (vert = ajouté, bleu = modifié, rouge = supprimé), fenêtre de commit avec diff, gestion de branches sans ligne de commande.

> [!example]- Analogie
> La vue à 3 colonnes pour résoudre un conflit est comme comparer deux versions d'un même document côte à côte avec un correcteur, plutôt que déchiffrer des symboles `<<<<<<<` en ligne de commande.

> [!question]- Pourquoi l'utiliser ?
> Voir immédiatement ce qui a changé ligne par ligne accélère la relecture de son propre travail avant de committer.

> [!question]- Comment ça marche ?
> `Cmd/Ctrl+K` ouvre la fenêtre de commit avec diff. Le nom de branche cliquable en bas à droite gère créer/changer/fusionner.

> [!question]- Quand l'utiliser ?
> Marqueurs en continu pendant le codage ; fenêtre de commit à chaque validation ; résolution visuelle dès qu'un conflit survient.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Pour des opérations Git avancées et rares (rebase interactif complexe, bisect), le terminal reste souvent plus direct que l'interface graphique.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Diff | Différences entre deux versions d'un fichier |
| Conflit de merge | Modifications incompatibles sur la même partie d'un fichier |

---

## Points clés

- Marqueurs colorés dans la marge = changements en temps réel
- `Cmd/Ctrl+K` = fenêtre de commit avec diff
- Résolution de conflit en vue 3 colonnes
- Le terminal reste disponible pour ce que l'interface ne couvre pas

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Committer sans relire le diff proposé dans la fenêtre de commit
> - Ignorer les marqueurs de marge, ratant une modification oubliée avant de committer

---

## Paramètres / Configuration

| Action | Raccourci (Mac) |
|-----------|-------------|
| Ouvrir la fenêtre de commit | `Cmd+K` |
| Push | `Cmd+Shift+K` |
| Mettre à jour (pull) | `Cmd+T` |

---

## Exemple minimal
> Sujet lié à l'interface Git, pas au code — bloc non applicable.

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[IntelliJ IDEA]]
- Sous-sujets → (aucun)
- À comparer avec → [[OUT-04-VSCode-Productivite|VSCode - Source Control]]

**Pratique :**
- Extrait de code → (aucun, sujet non-code)
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> Saurais-je résoudre un conflit de merge simple via l'interface visuelle d'IntelliJ ?

---

## Tâches

- [ ] #task Faire un premier commit depuis IntelliJ et observer le diff
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? IntelliJ peut-il remplacer complètement le terminal Git au quotidien ?
