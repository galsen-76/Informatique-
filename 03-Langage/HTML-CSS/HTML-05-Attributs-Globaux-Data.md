---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - frontend/html/attributs
aliases:
  - "Attributs HTML et data"
parent: "[[HTML-CSS]]"
children: []
related_theory:
  - "[[HTML-04-Aide-Memoire-Balises|Aide-mémoire des Balises HTML]]"
  - "[[JS-14-Selectionner-Elements-DOM|Sélectionner des Éléments du DOM]]"
related_snippets:
  - "[[04_Snippets/html-05-attributs-globaux-data]]"
related_projects: []
source: "https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes"
---

# Attributs HTML et data

> [!abstract] Introduction
> Les attributs donnent des informations en plus à une balise ; `id`, `class`, `data-*`, `hidden`, `tabindex`, `role` et `aria-*` servent à la fois au style, au JavaScript, aux tests et à l'accessibilité.

> [!warning]- Prérequis
> [[HTML-04-Aide-Memoire-Balises|Aide-mémoire des Balises HTML]]

---

## Théorie

> [!question]- C'est quoi ?
> | Attribut | Rôle | Exemple |
> |---|---|---|
> | `id` | Identifiant UNIQUE dans la page | `id="recherche"` (lié à `label for`) |
> | `class` | Groupe(s) pour le style/JS | `class="carte carte--favori"` |
> | `data-*` | Données personnalisées | `data-film-id="42"` → `el.dataset.filmId` |
> | `hidden` | Masque l'élément | `hidden` |
> | `disabled` | Désactive un contrôle | `<button disabled>` |
> | `tabindex` | Ordre / possibilité de focus | `0` (focusable), `-1` (focus par JS seulement) |
> | `title` | Info-bulle (peu accessible) | à éviter pour une info importante |
> | `lang` | Langue du contenu | `lang="en"` |
> | `role`, `aria-*` | Sémantique pour lecteurs d'écran | `aria-label`, `aria-expanded` |
> | `contenteditable` | Contenu modifiable | éditeurs riches |

> [!example]- Analogie
> La balise dit CE QUE c'est (une porte) ; les attributs donnent les détails (numéro de la porte, fermée à clé, étiquette pour les malvoyants).

> [!question]- Pourquoi l'utiliser ?
> Sélectionner des éléments en CSS/JS/tests, passer des données au JS sans variables globales, rendre l'interface accessible.

> [!question]- Comment ça marche ?
> **Attribut ≠ propriété** : l'attribut est dans le HTML (valeur initiale), la propriété est sur l'objet JS (valeur actuelle).
> ```javascript
> input.getAttribute('value');  // valeur initiale écrite dans le HTML
> input.value;                  // valeur actuelle tapée par l'utilisateur
> ```
> Angular distingue les deux : `[value]` (propriété) vs `[attr.data-id]` (attribut). Vue : `:value` règle la propriété quand elle existe, sinon l'attribut.

> [!question]- Quand l'utiliser ?
> `id` pour lier un label ou une ancre, `class` pour styler, `data-*` pour des données destinées au JS ou aux tests (`data-testid`).

> [!danger]- Quand NE PAS l'utiliser / Limites
> Un `id` doit être unique : un composant répété 10 fois avec un `id` fixe crée des doublons → générer un id unique ou utiliser des classes.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Attribut | Information écrite dans la balise HTML |
| Propriété | Valeur portée par l'objet JavaScript du DOM |
| `dataset` | Accès JS aux attributs `data-*` |
| Booléen | Attribut dont la présence suffit (`disabled`, `hidden`) |

---

## Points clés

- `id` unique, `class` réutilisable
- `data-*` → `element.dataset` (camelCase)
- Attribut = initial, propriété = actuel
- `disabled="false"` désactive quand même (attribut booléen)

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Écrire `disabled="false"` en pensant activer le bouton
> - `id` en dur dans un composant réutilisé plusieurs fois
> - Styler avec des `id` (spécificité trop forte)

---

## Exemple minimal

```html
<button type="button" class="btn-favori" data-film-id="42" aria-pressed="false">★ Favori</button>
<script>
document.querySelector('.btn-favori').addEventListener('click', (e) => {
  const btn = e.currentTarget;
  const id = Number(btn.dataset.filmId);        // "42" → 42
  const actif = btn.getAttribute('aria-pressed') === 'true';
  btn.setAttribute('aria-pressed', String(!actif));
});
</script>
```

> [!note] Ce que j'en retiens
> `data-*` transporte la donnée, `aria-pressed` décrit l'état pour les lecteurs d'écran.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Utiliser `data-testid` (ou mieux, les rôles) pour des tests E2E robustes

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[HTML-CSS]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/html-05-attributs-globaux-data]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Quelle différence entre `input.getAttribute('value')` et `input.value` ?

---

## Tâches

- [ ] #task Refaire l'exemple et observer attribut vs propriété dans les DevTools
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
