---
type: concept
domain: frontend
module: "[[Module 11 - React]]"
status: a-decouvrir
level: intermediaire
prerequisites:
  - "[[État React (useState)]]"
  - "[[Effet React (useEffect)]]"
  - "[[Portée et closure]]"
parents:
  - "[[React]]"
related:
  - "[[Générique TypeScript]]"
next_review: 
method: []
tags:
  - concept
  - frontend
---
# Hook React

> [!info] En une phrase
> Les hooks sont les fonctions use… (useState, useEffect, useContext, useMemo, useRef) qui donnent des capacités aux composants ; on peut écrire ses propres hooks pour réutiliser une logique.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
Hooks fournis :
| Hook | Rôle |
| --- | --- |
| `useState` | état local |
| `useEffect` | synchroniser avec l'extérieur |
| `useContext` | lire une valeur partagée (utilisateur connecté, thème) sans passer de props |
| `useRef` | garder une valeur sans réafficher, ou accéder à un élément du DOM |
| `useMemo` / `useCallback` | mémoriser un calcul / une fonction coûteux |
| `useReducer` | état complexe avec des actions |
**Règles des hooks** :
1. Les appeler **au premier niveau** du composant, jamais dans un `if`, une boucle ou une fonction imbriquée.
2. Les appeler seulement dans un composant ou un autre hook.
**Hook personnalisé** : une fonction qui commence par `use` et appelle d'autres hooks.

### Pourquoi ça existe
Plusieurs composants ont besoin de la même logique (charger des données, lire le stockage local) : il faut la factoriser.

### Le problème résolu
Réutiliser de la logique avec état sans copier-coller ni composants artificiels.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
C1[Composant A] --> H[useDonnees]
  C2[Composant B] --> H
  H --> S[useState]
  H --> E[useEffect]
```

### Exemple concret
```tsx
function useDonnees<T>(url: string) {
  const [donnees, setDonnees] = useState<T | null>(null);
  const [erreur, setErreur] = useState<string | null>(null);
  useEffect(() => {
    let actif = true;
    fetch(url).then((r) => r.ok ? r.json() : Promise.reject(new Error(String(r.status))))
      .then((d) => actif && setDonnees(d)).catch((e) => actif && setErreur(e.message));
    return () => { actif = false; };
  }, [url]);
  return { donnees, erreur, chargement: !donnees && !erreur };
}
const { donnees: taches, chargement } = useDonnees<Tache[]>("/api/taches");
```

### Cas d'utilisation
- Factoriser les appels d'API
- Contexte d'authentification (`useAuth`)
- Le code de CVAT utilise beaucoup de hooks

> [!warning] À ne pas confondre
> Appeler un hook dans un `if` : React les repère par leur **ordre d'appel**, qui doit être identique à chaque rendu. Et un hook personnalisé partage la **logique**, pas l'**état** : chaque composant qui l'appelle a sa propre copie.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin avec mes mots (section 4).

> [!example] 🧠 Dessine de mémoire
> Dessine un composant et les hooks qui lui donnent des capacités (useState, useEffect, useRef). Écris la capacité de chacun.

> [!example] 🔄 Change de contexte
> Redessine-le pour un composant Vue : quelles fonctions de Vue jouent le même rôle ?

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Hook React » et je l'intègre ici avec `![[Schéma - Hook React.excalidraw]]`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : je l'applique dans mon travail (CVAT, Nuclio) ou je demande une étape à Claude.

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _J'explique mon schéma avec mes mots, sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[État React (useState)]] · [[Effet React (useEffect)]] · [[Portée et closure]]
- **Complémentaires** : [[Générique TypeScript]]

## 6 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
La notion est maîtrisée quand je sais :
1. **l'expliquer** de façon fluide, à partir de mon schéma (section 4) ;
2. **l'adapter** à un autre contexte (consigne « Change de contexte », ou Claude m'interroge sur un autre cas) ;
3. **l'appliquer** pour de vrai dans le fil rouge (section 3).

Réussir un exercice ne suffit pas. C'est moi qui passe le statut en `maitrise`.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
