---
created: 2026-09-16
modified: 2026-09-16
type: knowledge
status: "🔴 Not Started"
level: Avancé
month: M05
aliases:
  - "Détection de Changement (Change Detection) Angular"
tags:
  - frameworks/angular/change-detection
parent: "[[Angular]]"
children:
  - "[[ANG-11-Detection-de-changement|Zone.js]]"
  - "[[ANG-11-Detection-de-changement|OnPush]]"
related_theory: []
related_snippets:
  - "[[04_Snippets/angular-onpush]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://angular.dev/guide/change-detection"
---

# Détection de Changement (Change Detection) Angular

> [!abstract] Introduction
> Mécanisme par lequel Angular décide QUAND revérifier l'écran pour voir si quelque chose a changé.

> [!warning]- Prérequis
> [[ANG-02-Composants|Composants Angular]], [[ANG-10-Signals|Signals Angular]] (pour comprendre l'alternative moderne).

---

## Théorie

> [!question]- C'est quoi ?
> Historiquement, Zone.js espionne toute action asynchrone (clic, timer, réponse réseau) pour dire à Angular "revérifie tout l'écran".

> [!example]- Analogie
> La stratégie par défaut est un gardien qui refait le tour complet du bâtiment à chaque bruit, même minime. `OnPush` est un gardien qui ne vérifie QUE la pièce concernée par le bruit précis. Les signals sont un système d'alarme qui sait EXACTEMENT quelle pièce a été touchée, sans faire de tour du tout.

> [!question]- Pourquoi l'utiliser ?
> Éviter de tout revérifier à chaque petit événement, ce qui ralentit une grosse application.

> [!question]- Comment ça marche ?
> ```typescript
> @Component({ changeDetection: ChangeDetectionStrategy.OnPush })
> ```
> Avec `OnPush`, le composant ne se revérifie que si un `@Input` change PAR RÉFÉRENCE, un événement de SON propre template survient, ou un signal lu change.

> [!question]- Quand l'utiliser ?
> `OnPush` sur les composants d'affichage recevant des données simples ; signals + zoneless pour les nouveaux projets.

> [!danger]- Quand NE PAS l'utiliser / Limites
> `OnPush` piège classique : modifier une propriété d'un objet sans changer sa référence (`film.titre = 'X'`) n'est PAS détecté — il faut remplacer l'objet entier.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Zone.js | Outil espionnant les actions asynchrones pour déclencher une vérification |
| Référence | Identité de l'objet en mémoire, pas juste sa valeur interne |

---

## Points clés

- Par défaut, Angular revérifie plus que nécessaire à cause de Zone.js
- `OnPush` limite les vérifications, nécessite de comprendre la notion de référence
- Les signals rendent la détection granulaire par nature
- Le mode zoneless (`provideZonelessChangeDetection()`) est stable dans les versions récentes et devient le défaut des nouveaux projets : la détection est déclenchée par les signals, les événements du template et `markForCheck`

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Modifier une propriété d'un objet `@Input` sans changer sa référence en `OnPush` — Angular ne détecte rien
> - Activer `OnPush` sans comprendre ses conditions de déclenchement, causant un affichage figé

---

## Paramètres / Configuration

| Stratégie | Description |
|-----------|-------------|
| `Default` | Revérifie à chaque événement global |
| `OnPush` | Revérifie seulement si `@Input` change par référence ou signal modifié |

---

## Exemple minimal

```typescript
@Component({ changeDetection: ChangeDetectionStrategy.OnPush })
export class FilmCardComponent {
  @Input() film!: { titre: string };
}
```

> [!note] Ce que j'en retiens
> `film.titre = 'Nouveau'` ne serait PAS détecté ici — il faudrait `film = { ...film, titre: 'Nouveau' }` pour changer la référence.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Réponse à la note brute : en zoneless, Angular planifie un rendu quand un signal lu par un template change, lors d'un événement du template, ou via `ChangeDetectorRef.markForCheck()`
> - Diagnostiquer avec Angular DevTools (profiler de détection de changement)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Angular]]
- Sous-sujets → [[ANG-11-Detection-de-changement|Zone.js]], [[ANG-11-Detection-de-changement|OnPush]]
- À comparer avec → [[ANG-10-Signals|Signals Angular]]

**Pratique :**
- Extrait de code → [[04_Snippets/angular-onpush]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> Pourrais-je expliquer pourquoi `film.titre = 'X'` ne déclenche rien en `OnPush` ?

> [!faq]- Questions d'entretien
> - Qu'est-ce que la stratégie OnPush et quels pièges comporte-t-elle ?

---

## Tâches

- [ ] #task Activer `OnPush` sur des composants d'affichage et observer le comportement
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Comment un projet Angular "zoneless" déclenche-t-il la vérification sans Zone.js ?
