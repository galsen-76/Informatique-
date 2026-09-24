---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - outils/git/remote
aliases:
  - "Dépôts Distants"
parent: "[[Git]]"
children: []
related_theory:
  - "[[01-GitLab|Fondamentaux GitLab]]"
  - "[[02-Merge-Requests|Merge Requests]]"
related_snippets:
  - "[[04_Snippets/git-03-depots-distants]]"
related_projects: []
source: "https://git-scm.com/book/fr/v2/Les-bases-de-Git-Travailler-avec-des-d%C3%A9p%C3%B4ts-distants"
---

# Dépôts Distants

> [!abstract] Introduction
> Un remote est une copie du dépôt hébergée ailleurs (GitLab, GitHub) ; `fetch`, `pull` et `push` synchronisent ton dépôt local avec lui.

> [!warning]- Prérequis
> [[GIT-01-Fondamentaux|Git Fondamentaux]]

---

## Théorie

> [!question]- C'est quoi ?
> ```bash
> git clone git@gitlab.com:equipe/cinetrack.git
> git remote -v
> git fetch origin                 # télécharge sans modifier ta branche
> git pull                         # fetch + merge (ou rebase)
> git push -u origin feature/x     # publie la branche et la suit
> ```

> [!example]- Analogie
> `fetch` : relever le courrier sans l'ouvrir. `pull` : relever et classer dans ses dossiers. `push` : poster son courrier.

> [!question]- Pourquoi l'utiliser ?
> Collaborer, sauvegarder son travail hors de sa machine, déclencher la CI et ouvrir une Merge Request.

> [!question]- Comment ça marche ?
> - `origin/main` : copie locale de l'état distant de `main` (mise à jour par `fetch`)
> - Branche de suivi (upstream) : lien local ↔ distant, défini par `-u`
> - Authentification : clé SSH (recommandée) ou HTTPS + token personnel

> [!question]- Quand l'utiliser ?
> Pousser au moins une fois par jour ; `fetch` avant de commencer à travailler.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Un push refusé (« non-fast-forward ») signifie que le distant a avancé : il faut d'abord intégrer ses changements.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Remote | Dépôt distant nommé (`origin`) |
| Upstream | Branche distante suivie |
| Fetch | Récupère sans fusionner |
| Pull | Fetch + intégration |

---

## Points clés

- `fetch` est sans risque
- Clé SSH plutôt que mot de passe
- Pousser souvent sa branche de feature

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Commiter directement sur `main` protégée → push refusé
> - `git pull` avec des modifs non commitées → conflits (commit ou stash d'abord)

---

## Exemple minimal

```bash
ssh-keygen -t ed25519 -C "moi@entreprise.fr"
cat ~/.ssh/id_ed25519.pub     # à coller dans GitLab > Preferences > SSH Keys
ssh -T git@gitlab.com
```

> [!note] Ce que j'en retiens
> Une clé SSH par machine, plus jamais de mot de passe à taper.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Gérer plusieurs remotes (fork + upstream)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Git]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/git-03-depots-distants]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Quelle différence entre `git fetch` et `git pull` ?

---

## Tâches

- [ ] #task Configurer une clé SSH sur le GitLab de l'entreprise
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
