---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M10
tags:
  - architecture/solid
aliases:
  - "SOLID"
parent: "[[Architecture Logicielle]]"
children: []
related_theory:
  - "[[TG-05-Paradigmes-POO|Programmation Orientée Objet]]"
  - "[[NEST-04-Providers-DI|Providers et Injection de Dépendances NestJS]]"
  - "[[ARCH-07-Design-Patterns-Fondamentaux|Design Patterns Fondamentaux]]"
related_snippets:
  - "[[04_Snippets/arch-11-solid]]"
related_projects: []
source: "https://fr.wikipedia.org/wiki/SOLID_(informatique)"
---

# SOLID

> [!abstract] Introduction
> SOLID regroupe 5 principes de conception orientée objet qui rendent le code modulaire, extensible et testable ; ils sont la base de l'injection de dépendances d'Angular et NestJS.

> [!warning]- Prérequis
> [[TG-05-Paradigmes-POO|Programmation Orientée Objet]]

---

## Théorie

> [!question]- C'est quoi ?
> | Lettre | Principe | En une phrase |
> |---|---|---|
> | **S** | Responsabilité unique (SRP) | Une classe n'a qu'une raison de changer |
> | **O** | Ouvert/fermé (OCP) | Ouvert à l'extension, fermé à la modification |
> | **L** | Substitution de Liskov (LSP) | Une sous-classe doit pouvoir remplacer sa classe mère sans surprise |
> | **I** | Ségrégation des interfaces (ISP) | Plusieurs petites interfaces plutôt qu'une grosse |
> | **D** | Inversion des dépendances (DIP) | Dépendre d'abstractions, pas d'implémentations |

> [!example]- Analogie
> Une multiprise (OCP + DIP) : on branche de nouveaux appareils sans recâbler la maison, tant qu'ils respectent la norme de la prise (abstraction).

> [!question]- Pourquoi l'utiliser ?
> Limiter l'effet domino d'une modification, faciliter les tests (mocks), permettre de remplacer une implémentation (stockage local → S3, email → SMS).

> [!question]- Comment ça marche ?
> ```typescript
> // SRP : le composant affiche, le service charge, le store garde l'état
> // OCP + DIP : ajouter un moyen de paiement sans modifier le service de commande
> interface MoyenPaiement { payer(montant: number): Promise<void> }
> class PaiementCarte implements MoyenPaiement { async payer(m: number) { /* ... */ } }
> class PaiementPaypal implements MoyenPaiement { async payer(m: number) { /* ... */ } }
> class CommandeService {
>   constructor(private paiements: Record<string, MoyenPaiement>) {}
>   valider(type: string, montant: number) { return this.paiements[type].payer(montant); }
> }
> ```

> [!question]- Quand l'utiliser ?
> Conception de services, modules et composants réutilisables ; revue de code.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Appliquer SOLID à un script de 50 lignes crée une complexité inutile (interfaces sans deuxième implémentation). Pragmatisme.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Couplage | Degré de dépendance entre modules |
| Cohésion | Degré d'unité des responsabilités d'un module |
| Abstraction | Contrat indépendant de l'implémentation |
| Injection de dépendances | Fournir les dépendances de l'extérieur |

---

## Points clés

- SRP = une raison de changer
- DIP + DI = code testable
- Forte cohésion, faible couplage
- Pragmatisme : pas d'interface sans raison

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Composant Angular de 800 lignes qui fait HTTP, état, formatage et affichage (viol du SRP)
> - Sous-classe qui lève « non supporté » sur une méthode héritée (viol du LSP)

---

## Exemple minimal

```typescript
// ISP : un composant qui n'a besoin que de lire ne dépend pas des méthodes d'écriture
interface LecteurFavoris { favoris: Signal<number[]> }
interface EditeurFavoris extends LecteurFavoris { ajouter(id: number): void; retirer(id: number): void }
```

> [!note] Ce que j'en retiens
> Chaque consommateur dépend du plus petit contrat possible.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Relier SOLID à l'architecture hexagonale (ports = abstractions, adapters = implémentations)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Architecture Logicielle]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/arch-11-solid]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Donne un exemple de violation du SRP dans un composant front.

> [!faq]- Questions d'entretien
> - Expliquez les principes SOLID avec des exemples.

---

## Tâches

- [ ] #task Refactorer un composant « fourre-tout » en composant + service + store
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
