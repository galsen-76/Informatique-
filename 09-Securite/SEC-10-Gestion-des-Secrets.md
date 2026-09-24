---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M11
tags:
  - securite/secrets
aliases:
  - "Gestion des Secrets"
parent: "[[Sécurité]]"
children: []
related_theory:
  - "[[NEST-08-Configuration-Environnements|Configuration et Environnements NestJS]]"
  - "[[03-CI-CD|CI/CD GitLab]]"
related_snippets:
  - "[[04_Snippets/sec-10-gestion-des-secrets]]"
related_projects: []
source: "https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html"
---

# Gestion des Secrets

> [!abstract] Introduction
> Mots de passe de BDD, clés d'API, secrets JWT : ils ne doivent jamais être dans le code ni dans Git, mais injectés à l'exécution depuis un coffre-fort ou les variables protégées de la plateforme.

> [!warning]- Prérequis
> [[NEST-08-Configuration-Environnements|Configuration et Environnements NestJS]]

---

## Théorie

> [!question]- C'est quoi ?
> Où stocker :
> - Local : fichier `.env` ignoré par Git
> - CI : variables GitLab masquées et protégées
> - Production : gestionnaire de secrets (HashiCorp Vault, AWS/GCP/Azure Secrets Manager, secrets Kubernetes chiffrés)
> Où ne JAMAIS les mettre : code source, dépôt Git, image Docker, logs, variables d'environnement du FRONT (publiques).

> [!example]- Analogie
> On ne cache pas la clé de la maison sous le paillasson (le code) : on la confie à un coffre (vault) qui ne la remet qu'aux personnes autorisées, et on change la serrure régulièrement (rotation).

> [!question]- Pourquoi l'utiliser ?
> Les dépôts fuient (clones, forks, ex-employés, dépôts publics par erreur) ; des robots scannent GitHub/GitLab en permanence à la recherche de clés.

> [!question]- Comment ça marche ?
> - Détection : GitLab Secret Detection, gitleaks en pre-commit
> - Secret commité = **révoquer et régénérer immédiatement** (le supprimer de l'historique ne suffit pas)
> - Rotation régulière, secrets différents par environnement, moindre privilège par secret

> [!question]- Quand l'utiliser ?
> Dès le premier secret du projet.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Les variables d'environnement peuvent apparaître dans des dumps ou logs : ne jamais les logger.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Secret | Information donnant un accès |
| Vault | Coffre-fort de secrets |
| Rotation | Remplacement régulier d'un secret |
| Révocation | Invalidation d'un secret compromis |

---

## Points clés

- `.env` dans `.gitignore`, `.env.example` sans valeurs
- Secret fuité = révocation immédiate
- Rien de secret dans le front
- Scanner les commits

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Clé d'API TMDB « privée » dans `environment.ts` Angular → visible par tous dans le bundle ; passer par l'API

---

## Exemple minimal

```bash
npx gitleaks detect --source .   # cherche des secrets dans l'historique
```

> [!note] Ce que j'en retiens
> À lancer sur tes dépôts perso : tu pourrais être surpris.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Mettre en place Vault/External Secrets et la rotation automatique

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Sécurité]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/sec-10-gestion-des-secrets]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Que faire si un secret a été poussé sur GitLab ?

---

## Tâches

- [ ] #task Ajouter gitleaks en pre-commit sur CinéTrack
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
