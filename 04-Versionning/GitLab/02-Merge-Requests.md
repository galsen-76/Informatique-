---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - outils/gitlab/merge-requests
aliases:
  - "Merge Requests"
parent: "[[GitLab]]"
children: []
related_theory:
  - "[[TEST-07-Code-Review|Code Review]]"
  - "[[GIT-02-Branches-Merge-Rebase|Branches Merge et Rebase]]"
related_snippets:
  - "[[04_Snippets/02-merge-requests]]"
related_projects: []
source: "https://docs.gitlab.com/user/project/merge_requests/"
---

# Merge Requests

> [!abstract] Introduction
> Une Merge Request sert à demander l'intégration d'une branche de travail dans la branche principale, après revue du code et passage du pipeline.

> [!warning]- Prérequis
> [[01-GitLab|Fondamentaux GitLab]]

---

## Théorie

> [!question]- C'est quoi ?
> Une **MR** compare deux branches et propose de fusionner l'une dans l'autre. Elle regroupe le diff, les discussions de revue, les approbations et le statut du pipeline.

> [!example]- Analogie
> Un dossier de demande de travaux : on montre les plans (diff), les voisins donnent leur avis (revue), l'inspecteur vérifie les normes (pipeline), puis le permis est accordé (merge).

> [!question]- Pourquoi l'utiliser ?
> - Faire relire le code avant intégration (qualité, partage de connaissance)
> - Lier automatiquement le changement à une issue
> - Garantir que le pipeline passe avant de merger

> [!question]- Comment ça marche ?
> ```mermaid
> flowchart LR
>   A["Push branche"] --> B["Création MR (Draft)"]
>   B --> C["Prête : description + reviewers"]
>   C --> D["Revue + commentaires + pipeline"]
>   D -->|"corrections"| C
>   D --> E["Approbation"] --> F["Merge (squash ?)"]
> ```
> Une bonne MR :
> - **Petite** (< 400 lignes idéalement), un seul sujet
> - Titre clair (convention de commit), description : contexte, ce qui change, comment tester, captures d'écran pour le front
> - Auto-relue avant de demander une revue

> [!question]- Quand l'utiliser ?
> Systématiquement dès que la branche principale est protégée — c'est-à-dire quasiment toujours en entreprise.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Une MR de 3000 lignes ne sera pas vraiment relue ; découper.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Draft | MR en cours, pas prête à merger |
| Approbation | Validation par un relecteur |
| Squash | Fusion des commits de la MR en un seul |
| Thread | Discussion à résoudre sur une ligne |

---

## Points clés

- Statuts : Open, Draft, Merged, Closed
- `Closes #12` ferme automatiquement l'issue au merge
- Répondre à chaque commentaire, résoudre les threads
- Pipeline vert obligatoire avant merge

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - MR géante multi-sujets
> - Prendre les commentaires de revue comme des attaques personnelles
> - Merger sans relire le pipeline

---

## Exemple minimal

```markdown
## Contexte
Les utilisateurs ne pouvaient pas trier leurs favoris (#87).
## Changements
- Ajout du tri par date/titre dans `FavorisStore`
- Nouveau composant `TriFavoris`
## Comment tester
1. Se connecter, ajouter 3 favoris
2. Changer le tri → l'ordre change
## Captures
(avant / après)
Closes #87
```

> [!note] Ce que j'en retiens
> Une description qui permet au relecteur de tester sans te demander quoi que ce soit.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Relire le code des autres de façon constructive (voir [[TEST-07-Code-Review|Code Review]])

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[GitLab]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[02-Merge-Requests|Pull Requests GitHub]]

**Pratique :**
- Extrait de code → [[04_Snippets/02-merge-requests]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Qu'est-ce qui rend une MR facile à relire ?

---

## Tâches

- [ ] #task Ouvrir une MR de test et observer le pipeline associé
- [ ] #task Comprendre les règles d'approbation exigées chez Assystem
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Combien de reviewers/approbations sont requis sur les MR chez Assystem ?
