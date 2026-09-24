---
created: 2026-09-16
modified: 2026-09-16
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
aliases:
  - "Transition VSCode → IntelliJ"
tags:
  - outils/intellij/transition-vscode
parent: "[[IntelliJ IDEA]]"
children: []
related_theory: []
related_snippets: []
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://www.jetbrains.com/help/idea/migrating-from-vscode.html"
---

# Transition VSCode → IntelliJ

> [!abstract] Introduction
> Passer de VSCode à IntelliJ demande surtout un changement d'habitudes — IntelliJ fait souvent la même chose que les extensions VSCode déjà utilisées, mais nativement.

> [!warning]- Prérequis
> [[IJ-02-Raccourcis-Clavier|Raccourcis Clavier IntelliJ]], [[IJ-06-Git-Controle-Version|Git et Controle de Version IntelliJ]], [[IJ-09-Gestion-Projets-Modules|Gestion de Projets et Modules IntelliJ]].

---

## Théorie

> [!question]- C'est quoi ?
> Un tableau de correspondance entre habitudes VSCode (souvent via extensions) et leurs équivalents natifs IntelliJ.

> [!example]- Analogie
> C'est comme déménager d'une maison où chaque pièce a été aménagée par soi-même (VSCode + extensions) vers un appartement déjà entièrement meublé, mais où les meubles ne sont pas exactement à la même place (IntelliJ natif).

> [!question]- Pourquoi l'utiliser ?
> Réduire la friction et la frustration des premières semaines en sachant où retrouver chaque habitude.

> [!question]- Comment ça marche ?
> `F12` → `Cmd/Ctrl+B` ; `F2` → `Shift+F6` ; ESLint/Prettier → inspections et reformatage natifs. Un keymap "VSCode" peut faciliter la transition initiale.

> [!question]- Quand l'utiliser ?
> Pendant les 2-3 premières semaines, garder ce tableau sous la main plutôt que de chercher à tâtons.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Rester en permanence sur le keymap "VSCode" empêche de vraiment s'approprier les raccourcis natifs, souvent plus puissants une fois maîtrisés.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Find Action | Équivalent IntelliJ de la palette de commandes VSCode |

---

## Points clés

- La majorité des extensions VSCode ont un équivalent natif IntelliJ
- Le keymap "VSCode" facilite la transition initiale
- L'indexation initiale plus longue est un coût ponctuel largement compensé ensuite
- Beaucoup d'actions passent par le clic droit contextuel

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Chercher une extension équivalente sur le Marketplace IntelliJ pour une fonctionnalité déjà native
> - Rester bloqué sur les réflexes VSCode sans explorer les équivalents natifs

---

## Paramètres / Configuration

| Sur VSCode | Équivalent IntelliJ |
|-----------|-------------|
| `F12` | `Cmd/Ctrl+B` |
| `F2` | `Shift+F6` |
| `Cmd/Ctrl+Shift+P` | `Cmd/Ctrl+Shift+A` |
| Extension GitLens | Marqueurs de marge + onglet Git natif |

---

## Exemple minimal
> Note comparative d'outils — bloc non applicable.

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[IntelliJ IDEA]]
- Sous-sujets → (aucun)
- À comparer avec → [[IJ-02-Raccourcis-Clavier|Raccourcis Clavier IntelliJ]], [[IJ-06-Git-Controle-Version|Git et Controle de Version IntelliJ]]

**Pratique :**
- Extrait de code → (aucun, sujet non-code)
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> Pourrais-je retrouver l'équivalent IntelliJ de 3 raccourcis VSCode que j'utilisais souvent ?

---

## Tâches

- [ ] #task Tester le keymap "VSCode" les premiers jours, puis basculer vers le natif
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Existe-t-il un outil pour importer les paramètres/extensions VSCode dans IntelliJ automatiquement ?
