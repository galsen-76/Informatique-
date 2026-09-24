---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M02
tags:
  - outils/git/workflows
aliases:
  - "Workflows Git en Équipe"
parent: "[[Git]]"
children: []
related_theory:
  - "[[02-Merge-Requests|Merge Requests]]"
  - "[[CICD-02-Pipeline-Full-Stack|Pipeline CI/CD Full Stack]]"
related_snippets:
  - "[[04_Snippets/git-06-workflows-equipe]]"
related_projects: []
source: "https://www.atlassian.com/git/tutorials/comparing-workflows"
---

# Workflows Git en Équipe

> [!abstract] Introduction
> Un workflow Git définit comment une équipe utilise les branches : GitFlow (branches develop/release/hotfix), GitHub/GitLab Flow (feature branches + MR), Trunk-Based Development (intégration continue sur main).

> [!warning]- Prérequis
> [[GIT-02-Branches-Merge-Rebase|Branches Merge et Rebase]]

---

## Théorie

> [!question]- C'est quoi ?
> | Workflow | Branches | Pour qui |
> |---|---|---|
> | **GitFlow** | main, develop, feature/*, release/*, hotfix/* | Releases planifiées, versions multiples maintenues |
> | **GitLab Flow / Feature branch** | main + feature/* (+ branches d'environnement) | La majorité des équipes |
> | **Trunk-Based** | main + branches très courtes (< 1-2 jours), feature flags | Déploiement continu, équipes matures |

> [!example]- Analogie
> GitFlow est une chaîne de production avec plusieurs sas de contrôle ; trunk-based est une cuisine de restaurant où chaque plat part dès qu'il est prêt, avec un chef qui goûte en continu (tests automatisés).

> [!question]- Pourquoi l'utiliser ?
> Sans convention commune, les branches se multiplient, les merges deviennent douloureux et on ne sait plus ce qui est en production.

> [!question]- Comment ça marche ?
> ```mermaid
> gitGraph
>   commit id: "v1.0" tag: "v1.0"
>   branch develop
>   commit
>   branch feature/favoris
>   commit
>   commit
>   checkout develop
>   merge feature/favoris
>   branch release/1.1
>   commit id: "fix recette"
>   checkout main
>   merge release/1.1 tag: "v1.1"
>   checkout develop
>   merge release/1.1
> ```
> Nommage courant : `feature/JIRA-123-favoris`, `fix/…`, `hotfix/…`, `chore/…`.

> [!question]- Quand l'utiliser ?
> Suivre le workflow de l'équipe (demander au travail : GitFlow est fréquent en ESN / grands comptes).

> [!danger]- Quand NE PAS l'utiliser / Limites
> GitFlow alourdit le déploiement continu ; trunk-based exige une excellente couverture de tests et des feature flags.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Feature branch | Branche dédiée à une fonctionnalité |
| Release branch | Branche de stabilisation d'une version |
| Hotfix | Correctif urgent en production |
| Feature flag | Interrupteur pour activer une fonctionnalité sans déployer |

---

## Points clés

- Branches courtes = moins de conflits
- Main toujours déployable
- Nommage normé lié au ticket

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Branches « feature » ouvertes pendant des semaines
> - Mélanger plusieurs sujets dans une même branche/MR

---

## Exemple minimal

```bash
git switch develop && git pull
git switch -c feature/CT-42-favoris
# ... commits ...
git push -u origin feature/CT-42-favoris   # → MR vers develop
```

> [!note] Ce que j'en retiens
> Le nom de branche relie automatiquement le code au ticket.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Argumenter le passage de GitFlow à trunk-based (prérequis : CI rapide, tests, feature flags)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Git]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/git-06-workflows-equipe]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi le trunk-based nécessite-t-il des feature flags ?

> [!faq]- Questions d'entretien
> - Quel workflow Git utilisez-vous et pourquoi ?

---

## Tâches

- [ ] #task Demander et noter le workflow exact de l'équipe (branches, MR, qui merge)
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
