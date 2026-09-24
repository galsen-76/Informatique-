---
created: 2026-09-16
modified: 2026-09-16
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M10
aliases:
  - "Design Patterns Fondamentaux"
tags:
  - cs/architecture/design-patterns
parent: "[[Architecture Logicielle]]"
children: []
related_theory:
  - "[[ARCH-03-Architecture-en-Couches|Architecture en Couches]]"
  - "[[PY-05-POO-Classes|POO Classes Python]]"
related_snippets:
  - "[[04_Snippets/design-patterns-exemples]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://refactoring.guru/design-patterns"
---

# Design Patterns Fondamentaux

> [!abstract] Introduction
> Un design pattern est une solution éprouvée et nommée à un problème de conception récurrent — pas un bout de code à copier-coller, mais une STRUCTURE réutilisable que des générations de développeurs ont identifiée comme efficace pour un type de problème précis.

---

## Théorie

> [!question]- C'est quoi ?
> > [!note] Pourquoi ces patterns ont-ils un NOM ?
> > Donner un nom à une solution récurrente ("Singleton", "Repository") permet à deux développeurs de se comprendre instantanément ("j'ai utilisé un Repository ici") sans avoir à réexpliquer toute la structure — un vocabulaire commun au métier.

> [!question]- Pourquoi l'utiliser ?
> Beaucoup de problèmes de conception reviennent constamment d'un projet à l'autre (comment garantir qu'un objet n'existe qu'une seule fois ? comment créer des objets sans connaître leur type exact à l'avance ?). Les design patterns évitent de réinventer une solution moins bonne à chaque fois.

> [!question]- Comment ça marche ?
> **Repository — déjà vu dans [[ARCH-03-Architecture-en-Couches|Architecture en Couches]] :**
> > [!note] Rappel
> > Le pattern Repository isole l'accès aux données (base de données, API) derrière une interface simple, pour que le reste du code n'ait jamais besoin de savoir COMMENT les données sont stockées concrètement.
>
> **Singleton — une seule instance garantie :**
> ```python
> class Configuration:
>     _instance = None
>
>     def __new__(cls):
>         if cls._instance is None:
>             cls._instance = super().__new__(cls)
>         return cls._instance
> ```
> > [!note] Ce que garantit ce pattern
> > Peu importe combien de fois on écrit `Configuration()`, on récupère TOUJOURS la MÊME instance — utile pour une configuration globale qui ne doit exister qu'une seule fois dans toute l'application. C'est exactement ce que fait un service Angular avec `providedIn: 'root'` (voir [[ANG-05-Services-DI|Services et DI]]) !
>
> **Factory — créer des objets sans connaître leur type exact à l'avance :**
> ```python
> def creer_notification(type_notification):
>     if type_notification == "email":
>         return NotificationEmail()
>     elif type_notification == "sms":
>         return NotificationSMS()
> ```
> > [!note] Pourquoi utiliser ce pattern
> > Le code appelant n'a jamais besoin de savoir COMMENT créer une `NotificationEmail` ou une `NotificationSMS` — il demande juste "donne-moi une notification de type email", et la factory gère les détails de création.
>
> **Observer — être notifié automatiquement d'un changement :**
> > [!note] Déjà connu, sous un autre nom
> > Le pattern Observer est exactement le principe derrière les `Observable` RxJS (voir [[ANG-08-RxJS|Programmation Reactive RxJS]]) et les `signal()` Angular : un "observateur" est notifié automatiquement quand une valeur qu'il surveille change, sans avoir à la revérifier manuellement en permanence.
>
> **Strategy — interchanger un comportement facilement :**
> ```python
> class CalculateurRemise:
>     def __init__(self, strategie):
>         self.strategie = strategie
>
>     def calculer(self, prix):
>         return self.strategie(prix)
>
> remise_noel = lambda prix: prix * 0.8
> remise_normale = lambda prix: prix
>
> calculateur = CalculateurRemise(remise_noel)
> ```
> > [!note] Ce que ça permet
> > Changer le COMPORTEMENT (`strategie`) sans toucher au reste du code (`CalculateurRemise`) — utile pour des règles métier qui changent selon le contexte (période de l'année, type de client...).

> [!question]- Quand l'utiliser ?
> - Repository : dès qu'on veut isoler l'accès aux données du reste de l'application
> - Singleton : configuration globale, connexion partagée à une ressource
> - Factory : création d'objets dont le type exact dépend d'une condition
> - Observer : notification de changement, déjà omniprésent via RxJS/signals en Angular
> - Strategy : comportement interchangeable selon le contexte

---

## Points clés

- Un design pattern est une solution NOMMÉE et éprouvée à un problème récurrent, pas du code à copier tel quel
- Repository, Singleton, Factory, Observer, Strategy sont parmi les plus utilisés au quotidien
- Angular utilise déjà plusieurs de ces patterns nativement : Singleton (services `providedIn: 'root'`), Observer (RxJS, signals)
- Reconnaître un pattern déjà utilisé (souvent sans le savoir) aide à en généraliser l'usage à d'autres contextes
- Ne pas forcer l'usage d'un pattern là où il n'apporte rien — un pattern mal appliqué ajoute de la complexité inutile

---

## Paramètres / Configuration

| Pattern | Problème résolu | Déjà rencontré dans |
|-----------|-------------|---------|
| Repository | Isoler l'accès aux données | [[ARCH-03-Architecture-en-Couches\|Architecture en Couches]] |
| Singleton | Garantir une seule instance | Services Angular `providedIn: 'root'` |
| Factory | Créer des objets sans connaître leur type précis | — |
| Observer | Notification automatique de changement | RxJS, `signal()` Angular |
| Strategy | Comportement interchangeable | — |

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Appliquer un pattern pour « faire pro » sans problème à résoudre
> - Singleton global mutable qui rend les tests dépendants entre eux

---

## Exemple minimal

```typescript
// Le pattern Singleton, déjà utilisé sans le savoir dans Angular
@Injectable({ providedIn: 'root' })
export class ConfigService {
  // Peu importe combien de composants injectent ce service,
  // Angular garantit UNE SEULE instance partagée -- exactement un Singleton
}
```

> [!note] Ce que j'en retiens
> Tu appliques déjà le pattern Singleton chaque fois que tu écris `providedIn: 'root'` sur un service Angular — comprendre le NOM et le PRINCIPE général derrière permet de reconnaître ce même besoin dans d'autres langages ou contextes (Python, backend).

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Reconnaître les patterns dans les frameworks : Observer (RxJS), Facade (services d'état), Adapter (mappers API), Strategy (validateurs), Decorator (intercepteurs)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Architecture Logicielle]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[ARCH-03-Architecture-en-Couches|Architecture en Couches]], [[ANG-05-Services-DI|Services et DI]], [[ANG-08-RxJS|Programmation Reactive RxJS]]

**Pratique :**
- Extrait de code → [[04_Snippets/design-patterns-exemples]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Citez 3 patterns utilisés par Angular ou NestJS.

> [!faq]- Questions d'entretien
> - Quel design pattern avez-vous utilisé récemment et pourquoi ?

---

## Tâches

- [ ] #task Identifier 2-3 patterns déjà utilisés sans le savoir dans du code Angular existant
- [ ] #task Implémenter un pattern Factory simple en Python pour un cas concret
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Existe-t-il un risque réel de "sur-appliquer" des design patterns dans un petit projet, au point de le complexifier inutilement ?
