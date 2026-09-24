---
created: 2026-09-16
modified: 2026-09-16
type: knowledge
status: "🟡 In Progress"
level: Intermédiaire
month: M04
aliases:
  - "Signals Angular"
tags:
  - frameworks/angular/signals
parent: "[[Angular]]"
children:
  - "[[ANG-23-Signals-Avances|computed()]]"
  - "[[ANG-23-Signals-Avances|effect()]]"
related_theory: []
related_snippets:
  - "[[04_Snippets/angular-signals-counter]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://angular.dev/guide/signals"
---

# Signals Angular

> [!abstract] Introduction
> Un signal est une boîte contenant une valeur qui prévient automatiquement Angular dès qu'elle change, pour ne mettre à jour que ce qui est vraiment nécessaire à l'écran.

> [!warning]- Prérequis
> [[TG-04-Synchrone-vs-Asynchrone|Synchrone vs Asynchrone]], [[ANG-11-Detection-de-changement|Détection de Changement Angular]].

---

## Théorie

> [!question]- C'est quoi ?
> ```typescript
> compteur = signal(0);
> console.log(this.compteur());  // lecture avec parenthèses
> this.compteur.set(5);
> ```

> [!example]- Analogie
> Un signal est un afficheur numérique connecté à un capteur : dès que la valeur mesurée change, l'afficheur se met à jour automatiquement, sans que quelqu'un doive venir le relever manuellement.

> [!question]- Pourquoi l'utiliser ?
> Avant, Angular utilisait Zone.js pour tout revérifier à chaque événement — coûteux. Les signals savent EXACTEMENT quoi mettre à jour.

> [!question]- Comment ça marche ?
> ```typescript
> compteur = signal(0);
> double = computed(() => this.compteur() * 2);  // recalcul automatique
> this.compteur.update(v => v + 1);
> ```

> [!question]- Quand l'utiliser ?
> Pour l'état local d'un composant. Pour de l'asynchrone réel (requêtes HTTP), RxJS reste l'outil adapté.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Un signal est synchrone et ne représente qu'une valeur À UN INSTANT — il ne remplace pas RxJS pour un vrai flux temporel (WebSocket, événements répétés dans le temps).

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Signal | Fonction encapsulant une valeur réactive |
| `computed()` | Signal calculé, recalculé automatiquement |
| `effect()` | Exécute du code à chaque changement d'un signal lu dedans |

---

## Points clés

- Un signal est une FONCTION : toujours l'appeler avec `()`
- `.set()` remplace, `.update()` calcule depuis l'ancienne valeur
- Synchrone, contrairement à RxJS
- Pas de `.subscribe()`/`.unsubscribe()` à gérer

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Oublier les parenthèses en lisant un signal (`compteur` au lieu de `compteur()`)
> - Réassigner directement (`compteur = 5`) au lieu d'utiliser `.set()`, ce qu'Angular ne détecte pas
> - Créer un `effect()` qui modifie le signal qu'il surveille, provoquant une boucle infinie

---

## Paramètres / Configuration

| Fonction | Description |
|-----------|-------------|
| `signal(valeur)` | Crée un signal |
| `.set(valeur)` | Remplace la valeur |
| `.update(fn)` | Calcule depuis l'ancienne valeur |
| `computed(fn)` | Signal calculé automatiquement |

---

## Exemple minimal

```typescript
compteur = signal(0);
double = computed(() => this.compteur() * 2);
incrementer() { this.compteur.update(v => v + 1); }
```

> [!note] Ce que j'en retiens
> `double` se recalcule tout seul dès que `compteur` change, sans mise à jour manuelle.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Signal inputs (`input()`), `model()`, `linkedSignal`, `resource` : voir [[ANG-23-Signals-Avances|Signals Avancés Angular]]
> - Réponse à la note brute : oui, un service avec `signal` privé + `asReadonly()` remplace la plupart des `BehaviorSubject` ; RxJS reste utile pour les flux temporels

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Angular]]
- Sous-sujets → [[ANG-23-Signals-Avances|computed()]], [[ANG-23-Signals-Avances|effect()]]
- À comparer avec → [[ANG-08-RxJS|Programmation Réactive RxJS Angular]], [[VUE-02-Reactivite|Réactivité Vue.js]]

**Pratique :**
- Extrait de code → [[04_Snippets/angular-signals-counter]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> Pourrais-je expliquer pourquoi `compteur = 5` ne fonctionne pas comme `compteur.set(5)` ?

> [!faq]- Questions d'entretien
> - Signals vs RxJS : quand utiliser quoi ?

---

## Tâches

- [ ] #task Refactoriser un état local de CinéTrack en signal
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? `signal` peut-il remplacer TOTALEMENT `BehaviorSubject` dans un service partagé ?
