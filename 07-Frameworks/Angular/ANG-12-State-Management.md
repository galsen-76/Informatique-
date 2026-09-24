---
created: 2026-09-16
modified: 2026-09-16
type: knowledge
status: "🔴 Not Started"
level: Avancé
month: M05
aliases:
  - "State Management Angular"
tags:
  - frameworks/angular/state-management
parent: "[[Angular]]"
children:
  - "[[ANG-25-NgRx-Signal-Store|NgRx]]"
related_theory: []
related_snippets:
  - "[[04_Snippets/angular-state-service]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://angular.dev"
---

# State Management Angular

> [!abstract] Introduction
> Organisation des données partagées entre plusieurs composants d'une application.

> [!warning]- Prérequis
> [[ANG-10-Signals|Signals Angular]], [[ANG-05-Services-DI|Services et DI Angular]].

---

## Théorie

> [!question]- C'est quoi ?
> Un service avec un signal, `providedIn: 'root'`, partagé par tous les composants qui l'injectent.

> [!example]- Analogie
> Un tableau d'affichage commun dans un bureau : n'importe qui peut le lire ou l'annoter, tout le monde voit la même version à jour, sans dupliquer l'information sur son propre bureau.

> [!question]- Pourquoi l'utiliser ?
> Garantir que plusieurs composants sans lien direct partagent une vue cohérente et synchronisée des mêmes données.

> [!question]- Comment ça marche ?
> ```typescript
> @Injectable({ providedIn: 'root' })
> export class FavorisService {
>   private favoris = signal<number[]>([]);
>   favorisActuels = this.favoris.asReadonly();
>   ajouter(id: number) { this.favoris.update(l => [...l, id]); }
> }
> ```

> [!question]- Quand l'utiliser ?
> Service + signal suffit pour la majorité des applications. NgRx pour de très gros projets avec état complexe interconnecté.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Ajouter NgRx "par défaut" sur un petit projet ajoute une complexité disproportionnée (actions, reducers, effects) sans bénéfice réel.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| `asReadonly()` | Version lecture seule d'un signal, protège contre la modification externe |
| NgRx | Librairie de state management strict basée sur un store central |

---

## Points clés

- Un service `providedIn: 'root'` est déjà une forme simple de state management
- `signal()` + service couvre la majorité des besoins
- NgRx ajoute rigueur au prix de complexité — pour de gros projets d'équipe

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Exposer directement le signal modifiable au lieu de sa version `.asReadonly()`
> - Introduire NgRx sur un projet trop simple pour le justifier

---

## Paramètres / Configuration
> Bloc supprimé — dépend fortement de la solution choisie (service simple vs NgRx).

---

## Exemple minimal

```typescript
@Injectable({ providedIn: 'root' })
export class FavorisService {
  private favoris = signal<number[]>([]);
  favorisActuels = this.favoris.asReadonly();
  ajouter(id: number) { this.favoris.update(l => [...l, id]); }
}
```

> [!note] Ce que j'en retiens
> Tout composant injectant ce service voit exactement les mêmes favoris, toujours synchronisés.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Voir [[ANG-25-NgRx-Signal-Store|NgRx et Signal Store]] pour les solutions structurées
> - Distinguer état serveur (cache de requêtes), état UI global, état local et état d'URL

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Angular]]
- Sous-sujets → [[ANG-25-NgRx-Signal-Store|NgRx]]
- À comparer avec → [[VUE-09-Pinia-State-Management|Pinia (State Management Vue.js)]]

**Pratique :**
- Extrait de code → [[04_Snippets/angular-state-service]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> Saurais-je expliquer pourquoi exposer `.asReadonly()` protège les données ?

> [!faq]- Questions d'entretien
> - Comment gérez-vous l'état partagé dans une application Angular ?

---

## Tâches

- [ ] #task Créer un `FavorisService` centralisé avec signals
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? À partir de quelle taille de projet NgRx devient-il réellement justifié ?
