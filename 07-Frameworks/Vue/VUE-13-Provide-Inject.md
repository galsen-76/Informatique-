---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M06
tags:
  - frameworks/vue/provide-inject
aliases:
  - "Provide Inject Vue.js"
parent: "[[Vue]]"
children: []
related_theory:
  - "[[VUE-07-Composition-API|Composition API & Composables Vue.js]]"
related_snippets:
  - "[[04_Snippets/vue-13-provide-inject]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://vuejs.org/guide/components/provide-inject.html"
---

# Provide Inject Vue.js

> [!abstract] Introduction
> `provide`/`inject` transmet une valeur d'un ancêtre à n'importe quel descendant sans passer par chaque niveau (évite le prop drilling) — la forme d'injection de dépendances de Vue.

> [!warning]- Prérequis
> [[VUE-05-Props-Emits|Props & Emits Vue.js (Communication Parent-Enfant)]]

---

## Théorie

> [!question]- C'est quoi ?
> ```typescript
> // keys.ts
> export const ThemeKey: InjectionKey<Ref<'clair' | 'sombre'>> = Symbol('theme');
> // Ancêtre
> const theme = ref<'clair' | 'sombre'>('clair');
> provide(ThemeKey, theme);
> // Descendant (n'importe quelle profondeur)
> const theme = inject(ThemeKey)!;
> ```

> [!example]- Analogie
> Le wifi de la maison : le routeur (ancêtre) diffuse, n'importe quelle pièce (descendant) capte, sans tirer de câble à travers chaque pièce.

> [!question]- Pourquoi l'utiliser ?
> Partager un contexte dans un sous-arbre (thème, formulaire parent/champs, onglets/onglet) ; `app.provide()` pour une valeur globale (config, client API).

> [!question]- Comment ça marche ?
> - Fournir une `ref` pour que la valeur reste réactive
> - `readonly(ref)` pour empêcher les descendants de la modifier, et fournir une fonction de mise à jour
> - Valeur par défaut : `inject(Key, valeurParDefaut)`
> - Plugins : `app.provide('api', client)`

> [!question]- Quand l'utiliser ?
> Composants composés (Tabs/Tab, Form/Field), contexte de sous-arbre. Pour un état global de l'application, Pinia est plus lisible et outillé (DevTools).

> [!danger]- Quand NE PAS l'utiliser / Limites
> Les dépendances deviennent implicites : difficile de savoir d'où vient une valeur. Ne fonctionne que du haut vers le bas de l'arbre.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Provide | Rendre une valeur disponible aux descendants |
| Inject | Récupérer une valeur fournie par un ancêtre |
| InjectionKey | Clé typée (Symbol) pour provide/inject |
| Prop drilling | Passer une prop à travers des niveaux qui n'en ont pas besoin |

---

## Points clés

- Fournir des refs pour la réactivité
- Clés `Symbol` typées avec `InjectionKey`
- Pinia pour l'état global, provide/inject pour un contexte local

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Fournir une valeur brute (non réactive) et s'étonner qu'elle ne se mette pas à jour
> - Appeler `inject` en dehors de `setup`

---

## Exemple minimal

```typescript
// Onglets.vue
const actif = ref(0);
provide(OngletsKey, { actif: readonly(actif), activer: (i: number) => (actif.value = i) });
// Onglet.vue
const { actif, activer } = inject(OngletsKey)!;
```

> [!note] Ce que j'en retiens
> Lecture seule + fonction dédiée : les enfants ne peuvent pas casser l'état du parent.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Comparer au système hiérarchique d'injecteurs Angular

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Vue]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[ANG-05-Services-DI|Services & Injection de Dépendances (DI) Angular]]

**Pratique :**
- Extrait de code → [[04_Snippets/vue-13-provide-inject]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi fournir une ref plutôt qu'une valeur simple ?

---

## Tâches

- [ ] #task Créer un couple `Onglets`/`Onglet` avec provide/inject
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
