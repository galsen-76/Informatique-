---
created: 2026-09-16
modified: 2026-09-16
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M10
aliases:
  - "Monolithe vs Microservices"
tags:
  - cs/architecture/monolithe-microservices
parent: "[[Architecture Logicielle]]"
children: []
related_theory:
  - "[[ARCH-01-Fondamentaux|Fondamentaux Architecture]]"
related_snippets: []
related_projects:
  - "[[02_Projects/app-planification-sprints]]"
source: "https://microservices.io/"
---

# Monolithe vs Microservices

> [!abstract] Introduction
> Un monolithe regroupe toute l'application (frontend, backend, logique métier) en UN SEUL bloc déployé ensemble, tandis que les microservices découpent l'application en plusieurs petits services INDÉPENDANTS, chacun déployable et évolutif séparément.

---

## Théorie

> [!question]- C'est quoi ?
> > [!note] C'est quoi un "monolithe" ?
> > Un monolithe est une application où TOUT le code (gestion des utilisateurs, des commandes, des paiements...) vit dans UNE SEULE base de code, déployée comme UN SEUL bloc. Ce n'est pas péjoratif — c'est simplement l'approche la plus simple et souvent la plus adaptée au démarrage d'un projet.
>
> > [!note] C'est quoi un "microservice" ?
> > Un microservice est un petit service indépendant, responsable d'UNE SEULE partie du métier (ex : un service "utilisateurs", un service "paiements"), avec sa PROPRE base de données si besoin, déployé et mis à jour SÉPARÉMENT des autres.

> [!question]- Pourquoi l'utiliser ?
> Le monolithe est plus simple à développer, tester et déployer au début — tout est au même endroit. Les microservices apportent de la flexibilité à grande échelle (chaque équipe peut travailler et déployer son service indépendamment, chaque service peut être mis à l'échelle séparément selon son besoin réel), mais au prix d'une complexité opérationnelle bien plus importante (communication réseau entre services, cohérence des données, déploiements coordonnés).

> [!question]- Comment ça marche ?
> **Structure d'un monolithe :**
> ```
> mon-app/
>   ├── controllers/
>   ├── services/
>   ├── models/
>   └── main.py         # un seul point d'entrée, un seul déploiement
> ```
>
> **Structure en microservices :**
> ```
> service-utilisateurs/   (déployé indépendamment, sa propre BDD)
> service-paiements/      (déployé indépendamment, sa propre BDD)
> service-notifications/  (déployé indépendamment, sa propre BDD)
> ```
> > [!note] Comment ces services communiquent-ils alors ?
> > Via le réseau — le plus souvent des appels API REST entre services, ou des messages asynchrones (voir [[ARCH-08-Architecture-Evenementielle|Architecture Evenementielle]]). Chaque appel entre microservices est une requête RÉSEAU, avec sa latence et ses risques de panne, contrairement à un simple appel de fonction dans un monolithe.
>
> **Les vrais coûts cachés des microservices :**
> - Il faut gérer la communication réseau entre services (latence, pannes possibles)
> - La cohérence des données devient plus complexe (pas de transaction unique entre plusieurs bases de données séparées)
> - Le déploiement, le monitoring, et le débogage deviennent plus complexes (un bug peut venir de N'IMPORTE quel service)
> - Nécessite souvent une infrastructure plus sophistiquée (orchestration, découverte de services)
>
> > [!note] Le piège classique du débutant en architecture
> > Se lancer directement dans les microservices pour un premier projet, "parce que c'est ce que font les grandes entreprises", est une erreur très fréquente. La majorité des grandes entreprises technologiques ont DÉMARRÉ en monolithe, et ont migré vers les microservices SEULEMENT quand la taille de l'équipe et du trafic le justifiait vraiment.

> [!question]- Quand l'utiliser ?
> - **Monolithe** : quasiment tous les nouveaux projets, petites/moyennes équipes, quand la simplicité de développement et de déploiement prime
> - **Microservices** : grandes équipes travaillant sur des parties distinctes, besoin de faire évoluer certaines parties du système bien plus vite/fort que d'autres, ou contraintes organisationnelles fortes (plusieurs équipes autonomes)

---

## Points clés

- Un monolithe = tout le code dans une seule application déployée ensemble
- Des microservices = plusieurs applications indépendantes communiquant par réseau
- Les microservices apportent de la flexibilité à grande échelle, au prix d'une complexité opérationnelle importante
- Démarrer en monolithe puis migrer si nécessaire est une stratégie plus sûre que l'inverse pour la grande majorité des projets
- Un "monolithe modulaire" (bien organisé en modules internes clairs) peut souvent éviter le besoin de microservices bien plus longtemps qu'on ne le pense

---

## Paramètres / Configuration

| Critère | Monolithe | Microservices |
|-----------|-------------|---------|
| Simplicité de développement | Élevée | Faible (au début) |
| Complexité de déploiement | Faible | Élevée |
| Scalabilité fine (par fonctionnalité) | Difficile | Facile |
| Cohérence des données | Simple (une seule BDD) | Complexe (données réparties) |
| Adapté pour | Petites/moyennes équipes, démarrage | Grandes équipes, systèmes matures |

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Microservices sans équipe, CI/CD ni observabilité matures → « monolithe distribué »
> - Découper par couches techniques au lieu de domaines métier

---

## Exemple minimal

```
# Monolithe : un seul appel de fonction, dans le même processus
resultat = service_paiement.traiter(commande)

# Microservices : un appel réseau, avec ses risques (latence, panne)
reponse = requests.post("http://service-paiement/api/traiter", json=commande)
if reponse.status_code != 200:
    # gérer l'échec réseau, la latence, le service potentiellement down...
    ...
```

> [!note] Ce que j'en retiens
> Le simple fait de "traiter un paiement" devient BEAUCOUP plus complexe en microservices : il faut désormais gérer les cas où le réseau échoue, où le service met du temps à répondre, où il est temporairement indisponible — autant de problèmes qui n'existent tout simplement PAS dans un monolithe.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Monolithe modulaire (modules NestJS aux frontières claires) comme étape intermédiaire
> - Communication entre services : synchrone (HTTP) vs asynchrone (événements), cohérence éventuelle, sagas

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Architecture Logicielle]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[ARCH-03-Architecture-en-Couches|Architecture en Couches]], [[ARCH-06-Scalabilite|Scalabilite]]

**Pratique :**
- Extrait de code → (aucun, sujet conceptuel)
- Projet → [[02_Projects/app-planification-sprints]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Quand passer d'un monolithe à des microservices ?

> [!faq]- Questions d'entretien
> - Monolithe ou microservices pour un nouveau projet ?

---

## Tâches

- [ ] #task Identifier si l'app de planification de sprints (Angular + API GitLab) relève d'une architecture monolithique ou distribuée
- [ ] #task Lister les vrais bénéfices ET coûts qu'apporteraient des microservices sur un projet personnel existant
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Existe-t-il une taille d'équipe ou de trafic "seuil" généralement admise à partir de laquelle les microservices deviennent réellement justifiés ?
