---
created: 2026-09-16
modified: 2026-09-16
type: knowledge
status: "🔴 Not Started"
level: Avancé
month: M10
aliases:
  - "Architecture Événementielle (Message Queues)"
tags:
  - cs/architecture/evenementielle
parent: "[[Architecture Logicielle]]"
children: []
related_theory:
  - "[[ARCH-02-Monolithe-vs-Microservices|Monolithe vs Microservices]]"
  - "[[ARCH-07-Design-Patterns-Fondamentaux|Design Patterns Fondamentaux]]"
related_snippets: []
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://en.wikipedia.org/wiki/Event-driven_architecture"
---

# Architecture Événementielle (Message Queues)

> [!abstract] Introduction
> Plutôt que d'appeler directement un autre service et d'attendre sa réponse, un système événementiel publie des "événements" dans une file d'attente, que d'autres services traitent chacun à leur rythme, sans dépendance directe ni attente bloquante entre eux.

---

## Théorie

> [!question]- C'est quoi ?
> > [!note] Rappel : le problème de l'appel direct entre services
> > Dans une architecture microservices classique (voir [[ARCH-02-Monolithe-vs-Microservices|Monolithe vs Microservices]]), un service A qui appelle directement un service B doit ATTENDRE sa réponse, et si B est en panne, A échoue aussi — un couplage fort et fragile.
>
> **L'architecture événementielle** propose une alternative : un service PUBLIE un événement ("commande créée") dans une file d'attente (queue), sans se soucier de QUI va le traiter ni QUAND. D'autres services s'ABONNENT à ces événements et réagissent chacun de leur côté.

> [!question]- Pourquoi l'utiliser ?
> Cette approche DÉCOUPLE complètement les services : le service qui publie un événement n'a AUCUNE connaissance de qui le consomme, ni de combien de temps ça prendra. Si un service consommateur tombe en panne temporairement, les événements s'accumulent dans la file et seront traités dès son retour — rien n'est perdu, contrairement à un appel direct qui échouerait immédiatement.

> [!question]- Comment ça marche ?
> **Publish/Subscribe (Pub/Sub) — le modèle de base :**
> ```
> Service Commandes --[publie "commande_créée"]--> File d'attente
>                                                         │
>                             ┌───────────────────────────┼───────────────────────────┐
>                             ▼                            ▼                            ▼
>                   Service Email               Service Stock                Service Facturation
>               (envoie confirmation)      (décrémente le stock)         (génère la facture)
> ```
> > [!note] Ce que ça change concrètement
> > Le "Service Commandes" publie UN SEUL événement, et n'a JAMAIS besoin de savoir qu'il existe 3 services qui réagissent à cet événement. On peut ajouter un 4ème service consommateur PLUS TARD sans jamais toucher au "Service Commandes" — un découplage total.
>
> **Outils courants pour implémenter ceci :**
> - **RabbitMQ** : système de files d'attente classique
> - **Kafka** : plateforme de streaming d'événements, adaptée à de très gros volumes
> - **Redis Pub/Sub** : version plus légère, souvent suffisante pour des besoins simples
>
> **Traitement asynchrone d'une tâche longue (cas d'usage fréquent) :**
> ```python
> # Sans queue : le client ATTEND que tout le traitement soit fini (lent)
> def creer_rapport(donnees):
>     rapport = generer_rapport_pdf(donnees)  # peut prendre 30 secondes
>     return rapport
>
> # Avec queue : réponse IMMÉDIATE, traitement en arrière-plan
> def creer_rapport(donnees):
>     file_attente.publier("generer_rapport", donnees)
>     return {"statut": "en cours de génération"}  # réponse instantanée
> ```
> > [!note] Pertinence pour un cas comme le POC multi-agents
> > Un traitement long impliquant plusieurs appels à des LLM (génération de plan, sections, assemblage) est un candidat naturel pour ce genre d'architecture : au lieu de faire attendre l'utilisateur pendant tout le traitement, on répond immédiatement et on notifie une fois le document prêt.

> [!question]- Quand l'utiliser ?
> - Traitements longs qui ne nécessitent pas une réponse immédiate (génération de rapport, envoi d'emails en masse)
> - Découpler des services qui n'ont pas besoin de communiquer en temps réel
> - Absorber des pics de charge : la file d'attente accumule les événements même si les consommateurs sont temporairement saturés

---

## Points clés

- Un événement est PUBLIÉ sans connaître à l'avance qui va le CONSOMMER
- Ce découplage total permet d'ajouter de nouveaux consommateurs sans modifier le service qui publie
- Une file d'attente absorbe les pics de charge et survit aux pannes temporaires des consommateurs
- RabbitMQ, Kafka, Redis Pub/Sub sont des outils courants pour implémenter ce modèle
- Particulièrement adapté aux traitements longs qui n'ont pas besoin d'une réponse immédiate

---

## Paramètres / Configuration

| Outil | Cas d'usage typique |
|-----------|-------------|
| RabbitMQ | Files d'attente classiques, tâches en arrière-plan |
| Kafka | Streaming d'événements à très grande échelle |
| Redis Pub/Sub | Besoins simples, notifications légères |

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Événements non idempotents traités deux fois
> - Perdre des événements faute de persistance (pattern outbox)

---

## Exemple minimal

```python
# Publier un événement (pseudo-code simplifié)
def commande_validee(commande):
    queue.publish("commande.validee", {"id": commande.id, "montant": commande.montant})
    return {"statut": "validée"}  # réponse immédiate au client

# Un consommateur, complètement indépendant
def sur_commande_validee(evenement):
    envoyer_email_confirmation(evenement["id"])
```

> [!note] Ce que j'en retiens
> Le service qui valide la commande n'appelle JAMAIS directement `envoyer_email_confirmation` — il publie simplement un fait ("cette commande a été validée"), et c'est un AUTRE morceau de code, complètement séparé, qui décide d'y réagir en envoyant un email.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Pattern outbox, dead-letter queue, cohérence éventuelle, event sourcing (avec prudence)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Architecture Logicielle]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[ARCH-02-Monolithe-vs-Microservices|Monolithe vs Microservices]], [[ARCH-07-Design-Patterns-Fondamentaux|Design Patterns Fondamentaux]]

**Pratique :**
- Extrait de code → (aucun pour l'instant)
- Projet → [[02_Projects/poc-apisix-multiagent]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi un consommateur d'événements doit-il être idempotent ?

---

## Tâches

- [ ] #task Identifier si le traitement multi-étapes du POC multi-agents (plan, sections, assemblage) bénéficierait d'une architecture événementielle
- [ ] #task Lire une introduction pratique à Redis Pub/Sub pour un premier cas d'usage simple
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Quelle est la complexité RÉELLE d'ajouter RabbitMQ ou Kafka à un projet de taille moyenne, en termes d'infrastructure à maintenir ?
