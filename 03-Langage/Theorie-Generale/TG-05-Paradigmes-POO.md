---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - theorie/poo
aliases:
  - "Programmation Orientée Objet"
parent: "[[Théorie Générale]]"
children:
  - "[[TS-05-Classes|Classes TypeScript]]"
  - "[[ARCH-11-SOLID|SOLID]]"
related_theory:
  - "[[PY-05-POO-Classes|POO Classes Python]]"
  - "[[ARCH-07-Design-Patterns-Fondamentaux|Design Patterns Fondamentaux]]"
related_snippets:
  - "[[04_Snippets/tg-05-paradigmes-poo]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://fr.wikipedia.org/wiki/Programmation_orient%C3%A9e_objet"
---

# Programmation Orientée Objet

> [!abstract] Introduction
> La POO organise le code en objets qui regroupent données et comportements ; ses 4 piliers (encapsulation, abstraction, héritage, polymorphisme) structurent Angular, NestJS, Java et la plupart des backends.

---

## Théorie

> [!question]- C'est quoi ?
> - **Encapsulation** : cacher l'état interne, exposer des méthodes (`private`)
> - **Abstraction** : exposer le « quoi » et cacher le « comment » (interfaces)
> - **Héritage** : une classe réutilise une autre (`extends`)
> - **Polymorphisme** : un même appel, des comportements différents selon l'objet

> [!example]- Analogie
> Une voiture : tu utilises volant et pédales (abstraction) sans voir le moteur (encapsulation) ; une voiture électrique est une voiture (héritage) ; « accélérer » fonctionne sur toutes, mais différemment (polymorphisme).

> [!question]- Pourquoi l'utiliser ?
> Modéliser le métier, isoler les responsabilités, permettre l'injection de dépendances et les tests (on remplace une implémentation par une autre via une interface).

> [!question]- Comment ça marche ?
> ```typescript
> interface Notifieur { envoyer(msg: string): Promise<void> }
> class EmailNotifieur implements Notifieur { async envoyer(m: string) { /* SMTP */ } }
> class SmsNotifieur implements Notifieur { async envoyer(m: string) { /* API SMS */ } }
>
> class CommandeService {
>   constructor(private notifieur: Notifieur) {}          // dépend d'une abstraction
>   async valider() { await this.notifieur.envoyer("Commande validée"); }
> }
> ```

> [!question]- Quand l'utiliser ?
> Services, entités métier, backends (NestJS, Spring). En front moderne, on combine POO (services, classes) et style fonctionnel (signals, fonctions pures, composables).

> [!danger]- Quand NE PAS l'utiliser / Limites
> Les hiérarchies d'héritage profondes deviennent rigides : **préférer la composition à l'héritage**.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Classe | Plan de construction d'objets |
| Instance | Objet créé depuis une classe |
| Interface | Contrat de méthodes |
| Composition | Construire un objet à partir d'autres objets |

---

## Points clés

- 4 piliers : encapsulation, abstraction, héritage, polymorphisme
- Composition > héritage
- Dépendre d'interfaces facilite tests et évolutions (DIP)

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Classes « Dieu » qui font tout
> - Héritage juste pour réutiliser du code

---

## Exemple minimal

```typescript
const service = new CommandeService(new SmsNotifieur());   // on change le comportement sans toucher au service
```

> [!note] Ce que j'en retiens
> Le service ne connaît que le contrat `Notifieur` : c'est la base de l'injection de dépendances.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Relier POO, SOLID et DI (Angular, NestJS)
> - Savoir quand une fonction pure suffit plutôt qu'une classe

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Théorie Générale]]
- Sous-sujets → [[TS-05-Classes|Classes TypeScript]], [[ARCH-11-SOLID|SOLID]]
- À comparer avec → [[TG-06-Programmation-Fonctionnelle|Programmation Fonctionnelle]]

**Pratique :**
- Extrait de code → [[04_Snippets/tg-05-paradigmes-poo]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi préfère-t-on la composition à l'héritage ?

> [!faq]- Questions d'entretien
> - Expliquez les 4 piliers de la POO avec un exemple.

---

## Tâches

- [ ] #task Modéliser le domaine CinéTrack (Film, Utilisateur, Liste) en classes
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
