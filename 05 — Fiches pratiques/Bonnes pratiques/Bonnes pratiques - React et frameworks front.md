---
type: bonnes-pratiques
sujet: "React et frameworks front"
concepts:
  - "[[React]]"
  - "[[Composant React]]"
  - "[[État React (useState)]]"
  - "[[Effet React (useEffect)]]"
  - "[[Liste et clé en React]]"
  - "[[Vue.js]]"
  - "[[Angular]]"
tags:
  - bonnes-pratiques
---
# Bonnes pratiques - React et frameworks front

> [!info] À quoi sert cette fiche
> Des interfaces faciles à faire évoluer, avec React en exemple ; la plupart des règles valent aussi pour Vue et Angular.
> Chaque règle dit **pourquoi** : c'est la raison qui compte, pour savoir l'adapter quand la situation change.

## À faire

### 1. Des petits composants qui font une chose
Un composant de plus de 150 lignes cache souvent trois composants. Voir [[Composant React]].

### 2. Garder l'état au plus près de ceux qui l'utilisent
Le remonter dans le parent seulement s'il est partagé ; un store (Pinia, Redux, service Angular) seulement pour l'état vraiment global.

### 3. Calculer ce qui peut l'être au lieu de le stocker
Une liste filtrée, un total : calculés au rendu (ou `computed` en Vue), pas dans un état à synchroniser.

```tsx
const visibles = taches.filter((t) => t.nom.includes(recherche));
```

### 4. Ne jamais modifier l'état en place
Toujours une nouvelle valeur. Voir [[État React (useState)]].

### 5. Des clés stables dans les listes
`key={t.id}`, pas l'indice. Voir [[Liste et clé en React]].

### 6. Regrouper les appels d'API dans un module ou un service
Les composants affichent, `api.ts` (ou un service) parle au serveur ; plus facile à tester et à changer.

### 7. Gérer les trois états d'un chargement
Chargement, erreur, données : l'utilisateur sait toujours ce qui se passe.

### 8. Penser à l'accessibilité
Bonnes balises (`button`, `label`), texte alternatif, navigation au clavier. Voir [[Accessibilité web]].

## À éviter

### 1. Un `useEffect` pour tout
**Pourquoi c'est un problème :** boucles infinies, valeurs périmées, code difficile à suivre.
**À la place :** calculer au rendu, réagir dans les gestionnaires d'événements ; l'effet seulement pour se synchroniser avec l'extérieur.

### 2. Copier des props dans un état
**Pourquoi c'est un problème :** les deux divergent quand le parent change la prop.
**À la place :** utiliser la prop directement.

### 3. `dangerouslySetInnerHTML`, `v-html`, `[innerHTML]` avec du contenu d'utilisateur
**Pourquoi c'est un problème :** faille XSS.
**À la place :** laisser le framework afficher le texte ; sinon nettoyer avec DOMPurify.

### 4. Des secrets dans les variables du front (`VITE_…`)
**Pourquoi c'est un problème :** elles sont lisibles par tous dans le JavaScript livré.
**À la place :** garder les secrets côté serveur.

### 5. Faire confiance à une garde de route pour la sécurité
**Pourquoi c'est un problème :** l'API reste accessible directement.
**À la place :** vérifier les droits dans l'API.

### 6. Des props transmises sur cinq niveaux
**Pourquoi c'est un problème :** code rigide et difficile à suivre.
**À la place :** un contexte, un store, ou revoir le découpage.

## Avant de valider mon travail
- [ ] Chaque composant a un rôle clair et un nom qui le dit
- [ ] Aucun état dérivé stocké inutilement
- [ ] Les listes ont des clés stables
- [ ] Chargement et erreurs sont affichés
- [ ] La page se navigue au clavier
- [ ] Les tests passent

## Notions liées
[[React]] · [[Composant React]] · [[État React (useState)]] · [[Effet React (useEffect)]] · [[Liste et clé en React]] · [[Vue.js]] · [[Angular]]
