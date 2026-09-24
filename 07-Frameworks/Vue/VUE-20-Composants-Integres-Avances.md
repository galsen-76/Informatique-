---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M06
tags:
  - frameworks/vue/avance
aliases:
  - "Composants Intégrés et Directives Custom Vue.js"
parent: "[[Vue]]"
children: []
related_theory:
  - "[[VUE-04-Directives-Templates|Directives & Templates Vue.js]]"
  - "[[CSS-06-Positionnement-Z-Index|Positionnement et Z-Index CSS]]"
related_snippets:
  - "[[04_Snippets/vue-20-composants-integres-avances]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://vuejs.org/guide/built-ins/teleport.html"
---

# Composants Intégrés et Directives Custom Vue.js

> [!abstract] Introduction
> Vue fournit des composants intégrés (`<Teleport>`, `<Transition>`, `<KeepAlive>`, `<Suspense>`, `<component :is>`) et permet de créer ses propres directives (`v-focus`) pour les manipulations DOM réutilisables.

> [!warning]- Prérequis
> [[VUE-04-Directives-Templates|Directives & Templates Vue.js]]

---

## Théorie

> [!question]- C'est quoi ?
> ```vue
> <Teleport to="body"><Modale v-if="ouverte" @fermer="ouverte = false" /></Teleport>
> <Transition name="fondu"><p v-if="visible">Enregistré !</p></Transition>
> <KeepAlive><component :is="ongletActif" /></KeepAlive>
> ```
> Directive custom :
> ```typescript
> export const vFocus: Directive<HTMLElement> = { mounted: (el) => el.focus() };
> // <input v-focus>
> ```

> [!example]- Analogie
> `Teleport` est un tube pneumatique : le composant est écrit à un endroit mais son contenu est livré ailleurs dans la page (souvent à la racine).

> [!question]- Pourquoi l'utiliser ?
> - Teleport : modales/toasts hors des contextes d'empilement et `overflow: hidden`
> - Transition : animations d'entrée/sortie
> - KeepAlive : conserver l'état d'onglets
> - `component :is` : rendu dynamique
> - Directives : comportement DOM réutilisable (focus, clic extérieur, tooltip)

> [!question]- Comment ça marche ?
> Hooks d'une directive : `created`, `mounted`, `updated`, `unmounted` (reçoivent `el`, `binding.value`, `binding.arg`, `binding.modifiers`).
> Transition : classes `.fondu-enter-from`, `.fondu-enter-active`, `.fondu-leave-to`…

> [!question]- Quand l'utiliser ?
> Directive : manipulation DOM bas niveau réutilisable. Pour de la logique, préférer un composable.

> [!danger]- Quand NE PAS l'utiliser / Limites
> `<Suspense>` reste marqué expérimental ; KeepAlive consomme de la mémoire si mal borné (`max`).

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Teleport | Rendu d'un contenu ailleurs dans le DOM |
| KeepAlive | Cache d'instances de composants |
| Directive custom | Comportement DOM réutilisable `v-xxx` |
| Composant dynamique | `<component :is>` choisi à l'exécution |

---

## Points clés

- Modales et toasts via Teleport
- Directives pour le DOM, composables pour la logique
- KeepAlive avec `include`/`max`

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Oublier de nettoyer un listener ajouté par une directive (`unmounted`)

---

## Exemple minimal

```typescript
export const vClicExterieur: Directive<HTMLElement & { _h?: (e: Event) => void }, () => void> = {
  mounted(el, binding) {
    el._h = (e) => { if (!el.contains(e.target as Node)) binding.value(); };
    document.addEventListener('click', el._h);
  },
  unmounted(el) { document.removeEventListener('click', el._h!); },
};
// <div v-clic-exterieur="fermerMenu">…</div>
```

> [!note] Ce que j'en retiens
> Une directive encapsule écouteur + nettoyage, réutilisable sur n'importe quel élément.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Savoir quand une directive vaut mieux qu'un composant ou un composable

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Vue]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[ANG-04-Directives|Directives Angular]]

**Pratique :**
- Extrait de code → [[04_Snippets/vue-20-composants-integres-avances]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi une modale doit-elle souvent être téléportée dans le body ?

---

## Tâches

- [ ] #task Créer `v-clic-exterieur` et l'utiliser sur un menu déroulant
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
