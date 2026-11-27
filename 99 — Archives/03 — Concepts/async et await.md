---
type: concept
module: "[[Module 05 - JavaScript]]"
related:
  - "[[Exception]]"
tags:
  - concept
  - javascript
---
# async et await

> [!info] En une phrase
> async et await permettent d'écrire du code asynchrone qui se lit de haut en bas, comme du code normal, avec try/catch pour les erreurs.

## 1 · Comprendre
### Définition
- Une fonction **`async`** renvoie toujours une Promesse.
- **`await`** (seulement dans une fonction `async`, ou au niveau supérieur d'un module) met la fonction en pause jusqu'à ce que la Promesse soit résolue, et donne sa valeur.
- Les erreurs (Promesse rejetée) se traitent avec **`try / catch`**.
```js
async function chargerTaches() {
  try {
    const rep = await fetch("/api/taches");
    const taches = await rep.json();
    return taches;
  } catch (err) {
    console.error("Échec du chargement", err);
    return [];
  }
}
```

### Pourquoi ça existe
Les chaînes de `.then()` deviennent vite illisibles ; `await` rend l'ordre des étapes évident.

### Le problème résolu
Écrire des étapes asynchrones successives (appel, puis traitement, puis autre appel) clairement, avec une gestion d'erreurs normale.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
F[async f] --> A1[await appel]
  A1 --> A2[await json]
  A2 --> R[return]
  A1 -.erreur.-> C[catch]
```

### Exemple concret
```js
const attendre = (ms) => new Promise((ok) => setTimeout(ok, ms));

async function exporter(ids) {
  for (const id of ids) {
    await fetch(`/api/taches/${id}/export`, { method: "POST" }); // l'un après l'autre
  }
  // en parallèle :
  await Promise.all(ids.map((id) => fetch(`/api/taches/${id}`)));
}
```

> [!abstract]- Comment ça s'écrit (référence à chercher, pas à apprendre par cœur)
> L'idée est la même partout ; seule l'écriture change. Les exemples plus haut sont en Python ou en JavaScript.
>
> **C# (.NET)**
> ```csharp
> public async Task<string> LireAsync(string url)
> {
>     var reponse = await http.GetAsync(url);
>     reponse.EnsureSuccessStatusCode();
>     return await reponse.Content.ReadAsStringAsync();
> }
> ```
> `Task<T>` joue le rôle de la promesse. Par convention le nom finit par `Async`. Ne jamais bloquer avec `.Result` ou `.Wait()` : `await` jusqu'en haut.

### Cas d'utilisation
- Appels d'API dans les composants et services
- Scripts Node qui lisent des fichiers
- Tests asynchrones

> [!warning] À ne pas confondre
> `await` ne bloque pas tout le programme, seulement la fonction `async` en cours. Et oublier `await` : on récupère une Promesse au lieu de la valeur (`[object Promise]` à l'écran).

## 3 · Relier
- **Prérequis** : [[Asynchrone et Promesse]]
- **Complémentaires** : [[Exception]]
- **Utilisé par** : [[Appeler une API HTTP]]
