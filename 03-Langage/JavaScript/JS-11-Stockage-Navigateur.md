---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M02
tags:
  - frontend/javascript/stockage
aliases:
  - "Stockage Navigateur"
parent: "[[JavaScript]]"
related_theory:
  - "[[SEC-03-Authentification-Sessions-JWT|Authentification Sessions vs JWT]]"
  - "[[NET-06-Cookies-Cache-HTTP|Cookies et Cache HTTP]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://developer.mozilla.org/fr/docs/Web/API/Web_Storage_API"
---

# Stockage Navigateur

> [!abstract] En bref
> Le navigateur peut garder des données entre deux visites : le thème choisi, un brouillon, une session de connexion. Il existe plusieurs « tiroirs », chacun avec ses règles. Le bon choix évite des bugs et des failles de sécurité.

## Les tiroirs disponibles

| Tiroir | Taille | Durée de vie | Envoyé au serveur ? | Pour quoi |
|---|---|---|---|---|
| `localStorage` | ~5 Mo | pour toujours (jusqu'à suppression) | non | préférences : thème, langue, brouillon |
| `sessionStorage` | ~5 Mo | tant que l'onglet est ouvert | non | état temporaire d'un onglet |
| **Cookie** | ~4 Ko | au choix | **oui, à chaque requête** | session de connexion |
| IndexedDB | grande | pour toujours | non | beaucoup de données hors ligne (rare) |

Image : le **cookie** est un badge que tu montres à chaque entrée du bâtiment. Le **localStorage** est ton casier dans le hall : personne ne le voit passer, mais n'importe quel script de la page peut l'ouvrir.

## localStorage en pratique

Il ne stocke **que du texte**. Pour un objet, on passe par JSON :

```ts
localStorage.setItem('theme', 'sombre');
const theme = localStorage.getItem('theme') ?? 'clair';   // null si absent

localStorage.setItem('favoris', JSON.stringify([12, 42]));
const favoris: number[] = JSON.parse(localStorage.getItem('favoris') ?? '[]');

localStorage.removeItem('theme');
```

Une fonction sûre, à réutiliser :

```ts
export function lire<T>(cle: string, defaut: T): T {
  try {
    const brut = localStorage.getItem(cle);
    return brut ? (JSON.parse(brut) as T) : defaut;
  } catch {
    return defaut;   // contenu abîmé ou stockage indisponible
  }
}
```

Dans le Portfolio, VueUse fait tout ça pour toi : `const theme = useLocalStorage('theme', 'sombre')`.

## Et pour la connexion ?

Le plus sûr est un **cookie posé par le serveur** avec ces options :

```http
Set-Cookie: session=abc123; HttpOnly; Secure; SameSite=Lax
```

| Option | Protège de |
|---|---|
| `HttpOnly` | JavaScript ne peut pas le lire → un script malveillant ne peut pas le voler |
| `Secure` | envoyé seulement en HTTPS |
| `SameSite=Lax` | pas envoyé depuis un autre site (protège d'une attaque CSRF) |

Voir [[SEC-03-Authentification-Sessions-JWT|Authentification, sessions et JWT]].

## Pièges

- **Mettre un jeton de connexion dans `localStorage`** : si ton site a une faille XSS, un script peut le lire et le voler.
- **`JSON.parse` sur un contenu abîmé** plante : garde le `try/catch`.
- **`localStorage` n'existe pas côté serveur** (Angular SSR, Nuxt) : ne l'utilise que dans le navigateur.
- **L'utilisateur peut tout effacer** : prévois toujours une valeur par défaut.
