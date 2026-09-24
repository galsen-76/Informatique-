---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M02
tags:
  - frontend/javascript/stockage
aliases:
  - "Stockage Navigateur"
parent: "[[JavaScript]]"
children: []
related_theory:
  - "[[SEC-03-Authentification-Sessions-JWT|Authentification Sessions vs JWT]]"
  - "[[NET-06-Cookies-Cache-HTTP|Cookies et Cache HTTP]]"
related_snippets:
  - "[[04_Snippets/js-11-stockage-navigateur]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://developer.mozilla.org/fr/docs/Web/API/Web_Storage_API"
---

# Stockage Navigateur

> [!abstract] Introduction
> Le navigateur offre plusieurs espaces de stockage (cookies, localStorage, sessionStorage, IndexedDB), chacun avec une durée de vie, une taille et des risques de sécurité différents.

> [!warning]- Prérequis
> [[JS-01-Fondamentaux|Fondamentaux JavaScript]]

---

## Théorie

> [!question]- C'est quoi ?
> | Stockage | Taille | Durée | Envoyé au serveur ? | Accessible en JS ? |
> |---|---|---|---|---|
> | Cookie | ~4 Ko | Configurable | Oui, à chaque requête | Oui sauf `HttpOnly` |
> | `localStorage` | ~5 Mo | Permanent | Non | Oui |
> | `sessionStorage` | ~5 Mo | Onglet | Non | Oui |
> | IndexedDB | Grande | Permanent | Non | Oui (async) |

> [!example]- Analogie
> Le cookie est un badge que tu montres à chaque entrée du bâtiment ; le localStorage est ton casier personnel dans le hall (personne ne le voit passer mais n'importe quel script de la page peut l'ouvrir).

> [!question]- Pourquoi l'utiliser ?
> Garder des préférences (thème, langue), un panier invité, un brouillon, ou une session — en choisissant le bon support pour éviter failles et bugs.

> [!question]- Comment ça marche ?
> ```javascript
> localStorage.setItem("theme", "sombre");
> const theme = localStorage.getItem("theme") ?? "clair";
> localStorage.setItem("panier", JSON.stringify(panier));   // uniquement des chaînes !
> const p = JSON.parse(localStorage.getItem("panier") ?? "[]");
> ```
> Cookie de session sécurisé (posé par le SERVEUR) : `Set-Cookie: session=abc; HttpOnly; Secure; SameSite=Lax`.

> [!question]- Quand l'utiliser ?
> - Préférences UI, brouillons : `localStorage`
> - État propre à un onglet : `sessionStorage`
> - Session / token d'auth : cookie `HttpOnly` + `Secure` + `SameSite`
> - Grosses données hors-ligne : IndexedDB

> [!danger]- Quand NE PAS l'utiliser / Limites
> Tout ce qui est dans `localStorage` est lisible par n'importe quel script de la page → un token JWT stocké là est volable par une faille XSS. Le stockage peut aussi être vidé par l'utilisateur ou le navigateur.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| HttpOnly | Cookie illisible par JavaScript |
| Secure | Cookie envoyé uniquement en HTTPS |
| SameSite | Limite l'envoi du cookie depuis d'autres sites (anti-CSRF) |
| Same-origin | Même protocole + domaine + port |

---

## Points clés

- localStorage ne stocke que des chaînes → JSON.stringify/parse
- Le stockage est isolé par origine
- Tokens sensibles : cookie HttpOnly plutôt que localStorage
- sessionStorage disparaît à la fermeture de l'onglet

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Stocker un JWT dans localStorage sans mesurer le risque XSS
> - `JSON.parse(null)` ou d'un contenu corrompu → prévoir un try/catch
> - Utiliser localStorage en SSR (Angular SSR, Nuxt) → n'existe pas côté serveur
> - Stocker des données personnelles sensibles en clair

---

## Exemple minimal

```typescript
export function lireStockage<T>(cle: string, defaut: T): T {
  try {
    const brut = localStorage.getItem(cle);
    return brut ? (JSON.parse(brut) as T) : defaut;
  } catch {
    return defaut;          // données corrompues ou stockage indisponible
  }
}
```

> [!note] Ce que j'en retiens
> Toujours prévoir une valeur par défaut et un try/catch : le stockage n'est jamais garanti.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Débattre localStorage vs cookie HttpOnly pour l'auth (XSS vs CSRF)
> - Synchroniser plusieurs onglets avec l'événement `storage` ou `BroadcastChannel`
> - Connaître les contraintes RGPD sur les cookies non essentiels

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[JavaScript]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[BDD-07-Redis-Cle-Valeur|Redis Cache Clé-Valeur]]

**Pratique :**
- Extrait de code → [[04_Snippets/js-11-stockage-navigateur]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi un cookie HttpOnly protège-t-il contre le vol de token par XSS ?

> [!faq]- Questions d'entretien
> - Où stocker un token d'authentification côté front ? Justifiez.

---

## Tâches

- [ ] #task Persister le thème et les favoris de CinéTrack dans localStorage
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
