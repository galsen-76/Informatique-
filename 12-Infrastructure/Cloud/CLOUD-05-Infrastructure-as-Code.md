---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Avancé
month: M11
tags:
  - infra/iac
aliases:
  - "Infrastructure as Code"
parent: "[[Infrastructure]]"
related_theory:
  - "[[CLOUD-01-Fondamentaux-Cloud|Fondamentaux du Cloud]]"
  - "[[CICD-01-Fondamentaux|Fondamentaux CI/CD]]"
related_projects: []
source: "https://developer.hashicorp.com/terraform/intro"
---

# Infrastructure as Code

> [!abstract] En bref
> L'**Infrastructure as Code** (IaC), c'est décrire ses serveurs, bases et réseaux dans des **fichiers texte versionnés**, au lieu de cliquer dans une console web. On peut alors recréer tout un environnement à l'identique en une commande, relire les changements en Merge Request, et savoir exactement ce qui existe.

## Cliquer ou écrire ?

| Configuration à la main (console web) | Infrastructure as Code |
|---|---|
| « qui a changé ce réglage, et quand ? » → personne ne sait | historique Git |
| recréer l'environnement de test : des heures, avec des oublis | une commande |
| relire avant d'appliquer | impossible | Merge Request |
| production et test identiques | rarement | garanti |

Image : la différence entre **décrire la recette** (on peut refaire le plat) et **se souvenir de ce qu'on a mis** dans la casserole.

## Les outils

| Outil | Sert à | Exemple |
|---|---|---|
| **Terraform** / OpenTofu | **créer** l'infrastructure (serveurs, bases, DNS) chez n'importe quel fournisseur | « une base PostgreSQL, un bucket, un enregistrement DNS » |
| **Ansible** | **configurer** des serveurs existants (installer, régler) | « installer Docker et Nginx sur ces 3 serveurs » |
| **Docker Compose / Kubernetes YAML** | décrire les **applications** qui tournent | ce que tu connais déjà |
| Pulumi | comme Terraform, en TypeScript | |

Tu fais déjà de l'IaC sans le savoir : ton `docker-compose.yml` et ton `.gitlab-ci.yml` sont de l'infrastructure décrite en code.

## Un aperçu de Terraform

```hcl
resource "scaleway_rdb_instance" "db" {
  name           = "cinetrack-db"
  engine         = "PostgreSQL-16"
  node_type      = "DB-DEV-S"
  is_ha_cluster  = false
}

resource "cloudflare_record" "api" {
  zone_id = var.zone_id
  name    = "api"
  type    = "A"
  content = scaleway_instance_ip.api.address
}
```

```bash
terraform plan     # « voici ce que je vais créer / modifier / supprimer »
terraform apply    # appliquer
```

Le `plan` est la clé : on **voit** l'effet avant de l'appliquer, et on peut le relire en équipe.

## Pour toi

- Tes projets : `docker-compose.yml` et `.gitlab-ci.yml` bien écrits suffisent.
- En entreprise : l'infrastructure est souvent gérée par une équipe « plateforme » avec Terraform ; savoir **lire** un `plan` et proposer une modification en MR est un vrai plus.

## Pièges

- **Modifier à la main** une ressource gérée par Terraform : le code et la réalité divergent.
- **Des secrets dans les fichiers** Terraform : utilise des variables et un coffre-fort.
- **Perdre l'état Terraform** (le fichier qui mémorise ce qui existe) : il se stocke dans un espace partagé et sauvegardé, jamais seulement sur un PC.
