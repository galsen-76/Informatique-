---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Avancé
month: M11
tags:
  - infra/iac
aliases:
  - "Infrastructure as Code"
parent: "[[Infrastructure]]"
children: []
related_theory:
  - "[[CLOUD-01-Fondamentaux-Cloud|Fondamentaux du Cloud]]"
  - "[[CICD-01-Fondamentaux|Fondamentaux CI/CD]]"
related_snippets:
  - "[[04_Snippets/cloud-05-infrastructure-as-code]]"
related_projects: []
source: "https://developer.hashicorp.com/terraform/intro"
---

# Infrastructure as Code

> [!abstract] Introduction
> L'Infrastructure as Code décrit serveurs, réseaux, bases et DNS dans des fichiers versionnés (Terraform/OpenTofu, Pulumi, Ansible) au lieu de cliquer dans une console — reproductible, relu en revue, automatisé.

> [!warning]- Prérequis
> [[CLOUD-01-Fondamentaux-Cloud|Fondamentaux du Cloud]]

---

## Théorie

> [!question]- C'est quoi ?
> ```hcl
> resource "scaleway_rdb_instance" "db" {
>   name           = "cinetrack-db"
>   node_type      = "DB-DEV-S"
>   engine         = "PostgreSQL-16"
>   is_ha_cluster  = false
> }
> ```
> ```bash
> terraform init && terraform plan && terraform apply
> ```
> - **Terraform/OpenTofu, Pulumi** : provisionner l'infrastructure (déclaratif)
> - **Ansible** : configurer des machines (installer, paramétrer)

> [!example]- Analogie
> Une recette écrite plutôt qu'un plat improvisé : n'importe qui peut refaire exactement la même infrastructure, et on voit l'historique des changements.

> [!question]- Pourquoi l'utiliser ?
> Environnements identiques (recette = production), reconstruction après incident, revue des changements d'infra comme du code.

> [!question]- Comment ça marche ?
> `plan` montre les changements avant de les appliquer ; l'état (state) est stocké à distance et verrouillé ; modules réutilisables.

> [!question]- Quand l'utiliser ?
> Dès qu'une infrastructure cloud dépasse quelques ressources ou doit être dupliquée.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Le state est sensible (secrets possibles) ; les modifications manuelles hors IaC créent de la dérive.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| IaC | Infrastructure décrite en code |
| Provider | Plugin vers un fournisseur (AWS, Scaleway) |
| State | État connu de l'infrastructure |
| Plan | Aperçu des changements |
| Dérive | Écart entre code et réalité |

---

## Points clés

- Tout changement d'infra passe par le code et une MR
- Toujours lire le `plan`
- State distant et verrouillé

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Commiter le state ou des secrets

---

## Exemple minimal

```text
MR « ajoute Redis managé » → pipeline exécute terraform plan → relecture → merge → terraform apply
```

> [!note] Ce que j'en retiens
> L'infrastructure suit le même workflow que le code applicatif.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - GitOps complet (Terraform + Argo CD), politiques (OPA) sur l'infrastructure

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Infrastructure]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/cloud-05-infrastructure-as-code]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi ne jamais modifier à la main une ressource gérée par Terraform ?

---

## Tâches

- [ ] #task Suivre le tutoriel officiel Terraform « Get started » avec Docker comme provider
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
