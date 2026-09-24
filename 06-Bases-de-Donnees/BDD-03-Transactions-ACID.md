---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M08
tags:
  - backend/bdd/transactions
aliases:
  - "Transactions et ACID"
parent: "[[Bases de Données]]"
children: []
related_theory:
  - "[[SQL-06-INSERT-UPDATE-DELETE|INSERT UPDATE DELETE]]"
  - "[[NEST-09-Prisma-Base-de-Donnees|Prisma avec NestJS]]"
related_snippets:
  - "[[04_Snippets/bdd-03-transactions-acid]]"
related_projects:
  - "[[02_Projects/CinéTrack-API]]"
source: "https://www.postgresql.org/docs/current/tutorial-transactions.html"
---

# Transactions et ACID

> [!abstract] Introduction
> Une transaction regroupe plusieurs opérations qui réussissent ou échouent ensemble ; les propriétés ACID garantissent la fiabilité même en cas de panne ou d'accès concurrents.

> [!warning]- Prérequis
> [[SQL-06-INSERT-UPDATE-DELETE|INSERT UPDATE DELETE]]

---

## Théorie

> [!question]- C'est quoi ?
> ```sql
> BEGIN;
> UPDATE comptes SET solde = solde - 100 WHERE id = 1;
> UPDATE comptes SET solde = solde + 100 WHERE id = 2;
> COMMIT;   -- ou ROLLBACK : aucune des deux modifications
> ```
> ACID :
> - **Atomicité** : tout ou rien
> - **Cohérence** : les contraintes sont respectées avant et après
> - **Isolation** : les transactions concurrentes ne se voient pas à moitié
> - **Durabilité** : une fois commitée, la donnée survit à une panne

> [!example]- Analogie
> Un virement bancaire : impossible que l'argent quitte ton compte sans arriver chez le destinataire.

> [!question]- Pourquoi l'utiliser ?
> Toute opération métier en plusieurs écritures (commande + stock + paiement) doit être atomique.

> [!question]- Comment ça marche ?
> Niveaux d'isolation : `READ COMMITTED` (défaut PostgreSQL), `REPEATABLE READ`, `SERIALIZABLE`.
> Anomalies de concurrence : lecture sale, lecture non répétable, lecture fantôme, **lost update**.
> Solutions : `SELECT … FOR UPDATE` (verrou pessimiste), colonne `version` (verrou optimiste), mises à jour atomiques (`SET stock = stock - 1 WHERE stock > 0`).

> [!question]- Quand l'utiliser ?
> Dès que plusieurs écritures doivent rester cohérentes entre elles.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Transactions longues = verrous prolongés = contention. Ne jamais appeler une API externe au milieu d'une transaction.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| COMMIT / ROLLBACK | Valider / annuler la transaction |
| Isolation | Degré de séparation entre transactions concurrentes |
| Lost update | Une mise à jour écrase une autre |
| Verrou optimiste | Détecte les conflits via une version |
| Deadlock | Deux transactions s'attendent mutuellement |

---

## Points clés

- ACID = fiabilité
- Transactions courtes
- Mises à jour atomiques plutôt que lire-puis-écrire
- Verrou optimiste pour les éditions concurrentes

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Lire une valeur, la modifier en JS, la réécrire → lost update
> - Appel HTTP externe dans une transaction

---

## Exemple minimal

```sql
UPDATE seances SET places_restantes = places_restantes - 1
WHERE id = 42 AND places_restantes > 0
RETURNING places_restantes;   -- 0 ligne = complet, sans survente possible
```

> [!note] Ce que j'en retiens
> Une seule instruction atomique évite la survente, sans verrou explicite.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Pattern Saga / outbox pour la cohérence entre plusieurs services (pas de transaction distribuée)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Bases de Données]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/bdd-03-transactions-acid]]
- Projet → [[02_Projects/CinéTrack-API]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Qu'est-ce qu'un lost update et comment l'éviter ?

> [!faq]- Questions d'entretien
> - Expliquez ACID.

---

## Tâches

- [ ] #task Reproduire un lost update avec deux terminaux psql
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
