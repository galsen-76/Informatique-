---
type: concept
domain: frontend
module: "[[Module 11 - React]]"
status: a-decouvrir
level: debutant
prerequisites:
  - "[[Composant React]]"
  - "[[Type et interface TypeScript]]"
parents:
  - "[[Composant React]]"
related:
  - "[[État React (useState)]]"
next_review: 
method: []
tags:
  - concept
  - frontend
---
# Props React

> [!info] En une phrase
> Les props sont les paramètres d'un composant : le parent les passe comme des attributs, l'enfant les lit sans jamais les modifier.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
```tsx
interface BoutonProps {
  texte: string;
  variante?: "primaire" | "secondaire";
  onClick: () => void;
  children?: React.ReactNode;     // le contenu entre les balises
}
function Bouton({ texte, variante = "primaire", onClick }: BoutonProps) {
  return <button className={variante} onClick={onClick}>{texte}</button>;
}
<Bouton texte="Exporter" onClick={() => exporter(12)} />
```
- Les données **descendent** (parent → enfant).
- Pour remonter une information, le parent passe une **fonction** en prop (`onClick`, `onChange`), que l'enfant appelle.
- Les props sont **en lecture seule** : un composant ne modifie jamais ses props.

### Pourquoi ça existe
Un composant réutilisable doit pouvoir afficher des données différentes à chaque usage.

### Le problème résolu
Rendre les composants configurables et garder un sens unique et prévisible pour les données.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
P[Parent] -->|props| E[Enfant]
  E -->|appelle onX| P
```

### Exemple concret
```tsx
function Filtre({ valeur, onChange }: { valeur: string; onChange: (v: string) => void }) {
  return <input value={valeur} onChange={(e) => onChange(e.target.value)} />;
}
function Page() {
  const [q, setQ] = useState("");
  return <Filtre valeur={q} onChange={setQ} />;    // l'état vit dans le parent
}
```

### Cas d'utilisation
- Configurer un composant réutilisable
- Remonter un clic au parent
- Composer des composants avec `children`

> [!warning] À ne pas confondre
> **Props** (données reçues, lecture seule) et **état** (données propres au composant, qui changent). Et passer des props sur cinq niveaux (*prop drilling*) signale qu'il faut un contexte ou un store.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin avec mes mots (section 4).

> [!example] 🧠 Dessine de mémoire
> Dessine un parent qui passe une dépense à un enfant par une prop, et l'enfant qui prévient le parent par une fonction.

> [!example] 🔍 Trouve l'erreur
> Ce schéma est faux. Corrige-le en rouge et explique l'erreur.
>
> ```mermaid
> flowchart TD
>   P[Parent] --> E[Enfant]
>   E --> M[Modifie la prop]
>   M --> P
> ```

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Props React » et je l'intègre ici avec `![[Schéma - Props React.excalidraw]]`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : je l'applique dans mon travail (CVAT, Nuclio) ou je demande une étape à Claude.

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _J'explique mon schéma avec mes mots, sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Composant React]] · [[Type et interface TypeScript]]
- **Complémentaires** : [[État React (useState)]]

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
