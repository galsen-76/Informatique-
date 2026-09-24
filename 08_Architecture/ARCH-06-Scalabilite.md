---
created: 2026-09-16
modified: 2026-09-16
type: knowledge
status: "🔴 Not Started"
level: Avancé
month: M10
aliases:
  - "Scalabilité"
tags:
  - cs/architecture/scalabilite
parent: "[[Architecture Logicielle]]"
children: []
related_theory:
  - "[[ARCH-02-Monolithe-vs-Microservices|Monolithe vs Microservices]]"
  - "[[TG-04-Synchrone-vs-Asynchrone|Concurrence Parallelisme]]"
related_snippets: []
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://en.wikipedia.org/wiki/Scalability"
---

# Scalabilité

> [!abstract] Introduction
> La scalabilité (montée en charge) désigne la capacité d'une application à continuer de bien fonctionner quand le nombre d'utilisateurs ou la quantité de données augmente — soit en renforçant la machine existante (verticale), soit en ajoutant plusieurs machines (horizontale).

---

## Théorie

> [!question]- C'est quoi ?
> > [!note] Scalabilité verticale (scale up)
> > Renforcer UNE SEULE machine : plus de RAM, un processeur plus puissant. Simple à mettre en place, mais a une LIMITE physique (impossible d'ajouter de la RAM indéfiniment), et représente un point de défaillance unique (si cette machine tombe, tout tombe).
>
> > [!note] Scalabilité horizontale (scale out)
> > Ajouter PLUSIEURS machines qui se partagent la charge de travail. Plus complexe à mettre en place (il faut répartir le travail entre elles), mais quasiment illimitée en théorie, et plus résiliente (si une machine tombe, les autres continuent).

> [!question]- Pourquoi l'utiliser ?
> Une application qui fonctionne parfaitement avec 100 utilisateurs peut s'effondrer avec 100 000 si son architecture n'a pas été pensée pour grandir. Anticiper (sans sur-ingénierie prématurée) la façon dont une application pourra grandir évite des refontes douloureuses en urgence, souvent au pire moment (quand le trafic explose réellement).

> [!question]- Comment ça marche ?
> **Le défi principal de la scalabilité horizontale : l'état partagé**
> > [!note] Le problème concret
> > Si deux utilisateurs arrivent sur DEUX machines différentes (répartition de charge), comment s'assurer qu'ils voient les MÊMES données (même panier, même session) ? Ce problème n'existe PAS avec une seule machine (tout est au même endroit), mais devient central dès qu'on ajoute des machines.
>
> **Répartiteur de charge (Load Balancer) :**
> ```
>                     ┌─→ Serveur 1
> Client → Load Balancer ─→ Serveur 2
>                     └─→ Serveur 3
> ```
> > [!note] C'est quoi un "load balancer" ?
> > Un répartiteur de charge reçoit toutes les requêtes des clients et les distribue entre plusieurs serveurs identiques, selon une stratégie (tour à tour, serveur le moins chargé...) — invisible pour le client, qui ne voit qu'une seule adresse.
>
> **Rendre une application "stateless" pour faciliter la scalabilité horizontale :**
> > [!note] Pourquoi c'est important
> > Si un serveur garde en MÉMOIRE LOCALE des informations sur un utilisateur (sa session), et que sa prochaine requête arrive sur une AUTRE machine, ces informations sont perdues. Stocker l'état PARTAGÉ (sessions, cache) dans un système EXTERNE accessible par toutes les machines (comme Redis) résout ce problème.
>
> **Base de données : souvent le vrai goulot d'étranglement**
> > [!note] Pourquoi la base de données scale différemment
> > Ajouter des serveurs d'application est relativement simple. Faire de même pour une base de données relationnelle classique est BEAUCOUP plus complexe (cohérence des données entre plusieurs copies) — c'est souvent le vrai défi technique de la scalabilité, pas le code applicatif lui-même.
>
> **Mise en cache — réduire le besoin de scalabilité brute :**
> Avant même de scaler, ajouter un cache (voir une future note dédiée) permet souvent d'absorber une charge bien plus importante sans ajouter une seule machine — souvent la première optimisation à considérer.

> [!question]- Quand l'utiliser ?
> - Scalabilité verticale : solution rapide à court terme, adaptée à une croissance modérée et prévisible
> - Scalabilité horizontale : nécessaire dès que le trafic dépasse ce qu'une seule machine, même puissante, peut absorber, ou pour la résilience (tolérance de panne)

---

## Points clés

- Verticale = renforcer une machine (limite physique, simple), horizontale = ajouter des machines (quasi illimité, complexe)
- Le vrai défi de la scalabilité horizontale est la gestion de l'état PARTAGÉ entre machines
- Un load balancer répartit les requêtes entre plusieurs serveurs identiques
- Rendre une application "stateless" (sans état stocké en mémoire locale) facilite grandement la scalabilité horizontale
- La base de données est souvent le vrai goulot d'étranglement, plus difficile à scaler que le code applicatif

---

## Paramètres / Configuration

| Aspect | Verticale | Horizontale |
|-----------|-------------|---------|
| Méthode | Renforcer une machine | Ajouter des machines |
| Limite | Physique (matériel) | Quasi illimitée |
| Complexité | Faible | Élevée (état partagé, cohérence) |
| Résilience | Faible (point unique de défaillance) | Élevée |

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Scalabilité horizontale avec un état stocké en mémoire du serveur (sessions) → utiliser Redis
> - Optimiser avant d'avoir mesuré le goulot d'étranglement

---

## Exemple minimal

> [!note] Pas d'exemple de code
> La scalabilité se raisonne au niveau infrastructure, pas dans une simple ligne de code — les concepts (load balancer, état partagé) s'illustrent mieux par un schéma que par du code.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Applications sans état + load balancer + cache + BDD répliquée ; autoscaling (HPA Kubernetes)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Architecture Logicielle]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[ARCH-02-Monolithe-vs-Microservices|Monolithe vs Microservices]], [[TG-04-Synchrone-vs-Asynchrone|Concurrence Parallelisme]]

**Pratique :**
- Extrait de code → (aucun, sujet conceptuel)
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Différence entre scalabilité verticale et horizontale ?

> [!faq]- Questions d'entretien
> - Comment feriez-vous tenir une API à 10 fois plus d'utilisateurs ?

---

## Tâches

- [ ] #task Identifier un exemple concret d'état stocké "en mémoire locale" qui poserait problème en scalabilité horizontale
- [ ] #task Lire une introduction à Redis pour comprendre son rôle dans le partage d'état entre serveurs
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Comment une base de données relationnelle classique (PostgreSQL) gère-t-elle concrètement la scalabilité horizontale (réplication, sharding) ?
