---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M02
tags:
  - frontend/javascript/debug
aliases:
  - "Gestion des Erreurs et DevTools"
parent: "[[JavaScript]]"
children: []
related_theory:
  - "[[METH-05-Resolution-Problemes-Debug|Résolution de Problèmes et Débogage]]"
related_snippets:
  - "[[04_Snippets/js-12-erreurs-debug-devtools]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://developer.chrome.com/docs/devtools"
---

# Gestion des Erreurs et DevTools

> [!abstract] Introduction
> Savoir lever, attraper et tracer les erreurs, et maîtriser les DevTools du navigateur (Console, Sources, Network, Performance) est ce qui fait gagner le plus de temps à un développeur.

> [!warning]- Prérequis
> [[JS-01-Fondamentaux|Fondamentaux JavaScript]]

---

## Théorie

> [!question]- C'est quoi ?
> ```javascript
> try {
>   const data = JSON.parse(texte);
> } catch (erreur) {
>   console.error("JSON invalide", erreur);
> } finally {
>   chargement = false;
> }
> throw new Error("Film introuvable");
> ```
> Types natifs : `Error`, `TypeError`, `ReferenceError`, `SyntaxError`, `RangeError`.

> [!example]- Analogie
> Les DevTools sont le tableau de bord et la boîte noire de l'avion : Console = voyants, Network = radio avec la tour de contrôle, Sources = pilote automatique qu'on peut mettre en pause, Performance = enregistreur de vol.

> [!question]- Pourquoi l'utiliser ?
> Un dev expérimenté ne devine pas : il observe (points d'arrêt, réseau, stack trace) et formule des hypothèses vérifiables.

> [!question]- Comment ça marche ?
> Onglets essentiels :
> - **Console** : logs, erreurs, exécution de code, `$0` (élément sélectionné)
> - **Elements** : DOM et CSS en direct
> - **Sources** : points d'arrêt, pas à pas, watch, `debugger;`
> - **Network** : requêtes, statuts, payloads, timing, throttling (3G)
> - **Application** : localStorage, cookies, service workers
> - **Performance / Lighthouse** : lenteurs, Core Web Vitals
> - Extensions : **Angular DevTools**, **Vue DevTools**

> [!question]- Quand l'utiliser ?
> À chaque bug. Réflexe : 1) lire le message et la stack trace, 2) reproduire, 3) Network si données, 4) breakpoint si logique.

> [!danger]- Quand NE PAS l'utiliser / Limites
> `console.log` partout ralentit et pollue ; un point d'arrêt conditionnel est souvent plus efficace. Les erreurs async non attrapées n'apparaissent pas toujours au bon endroit.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Stack trace | Liste des appels menant à l'erreur |
| Breakpoint | Pause de l'exécution à une ligne |
| Source map | Lien entre le JS compilé et le TS source |
| `debugger` | Instruction qui déclenche un point d'arrêt |

---

## Points clés

- Toujours lire la stack trace jusqu'à ton propre code
- Les source maps permettent de déboguer le TS dans le navigateur
- Créer des erreurs métier explicites (`class NotFoundError extends Error`)
- `console.table`, `console.group`, `console.time` sont sous-utilisés

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - `catch (e) {}` vide qui avale les erreurs
> - Lancer des chaînes (`throw "erreur"`) au lieu d'objets Error (pas de stack)
> - Laisser des `console.log` en production

---

## Exemple minimal

```javascript
class ErreurApi extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ErreurApi";
    this.status = status;
  }
}
try {
  throw new ErreurApi("Non autorisé", 401);
} catch (e) {
  if (e instanceof ErreurApi && e.status === 401) redirigerVersLogin();
  else throw e;                     // ne pas avaler ce qu'on ne sait pas traiter
}
```

> [!note] Ce que j'en retiens
> On n'attrape que ce qu'on sait traiter ; le reste est relancé.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Centraliser les erreurs (ErrorHandler Angular, `app.config.errorHandler` Vue) et les envoyer à Sentry
> - Déboguer Node avec `--inspect` et Chrome
> - Utiliser les logpoints et breakpoints conditionnels

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[JavaScript]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[IJ-05-Debogage|Débogage IntelliJ]], [[PY-07-Exceptions|Exceptions Python]]

**Pratique :**
- Extrait de code → [[04_Snippets/js-12-erreurs-debug-devtools]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Quelle est la différence entre une erreur réseau et une erreur HTTP dans l'onglet Network ?

> [!faq]- Questions d'entretien
> - Comment déboguez-vous un bug que vous n'arrivez pas à reproduire ?

---

## Tâches

- [ ] #task Faire le tutoriel officiel Chrome DevTools « Debug JavaScript »
- [ ] #task Installer Angular DevTools et Vue DevTools
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
