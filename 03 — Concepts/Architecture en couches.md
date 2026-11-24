---
type: concept
module: "[[Module 15 - Architecture logicielle]]"
related:
  - "[[MVC]]"
  - "[[Doublure de test (mock)]]"
tags:
  - concept
  - architecture
---
# Architecture en couches

> [!info] En une phrase
> Une application en couches range le code en étages (routes ou contrôleurs, services métier, accès aux données) ; chaque couche n'appelle que celle du dessous.

## 1 · Comprendre
### Définition
Pour une API classique :
| Couche | Rôle | Exemple |
| --- | --- | --- |
| **Routes / contrôleurs** | HTTP : lire la requête, valider, appeler le service, répondre | `routes/taches.js` |
| **Services** | règles métier, sans rien savoir de HTTP | `services/taches.js` |
| **Dépôts** (*repositories*) | lire et écrire en base | `depots/taches.js` |
| **Modèles** | la forme des données | `types.ts`, modèles de l'ORM |
Règle : les dépendances vont **vers le bas**. Un service ne connaît pas `req` et `res` ; un dépôt ne connaît pas les règles métier.
Variantes plus poussées : **architecture hexagonale** (ports et adaptateurs), **clean architecture** : le métier au centre, l'extérieur (base, HTTP, API externes) en périphérie et interchangeable.

### Pourquoi ça existe
Dans une API qui grandit, mettre SQL, règles et HTTP dans la même route rend tout illisible et non testable.

### Le problème résolu
Tester le métier sans HTTP ni base, et changer de base ou de framework en ne touchant qu'une couche.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
R[Routes] --> S[Services]
  S --> D[Dépôts]
  D --> B[(Base)]
```

### Exemple concret
```js
// depots/taches.js
export const trouver = (id) => db.query("SELECT * FROM tache WHERE id = $1", [id]).then((r) => r.rows[0]);
// services/taches.js
export async function terminer(id, utilisateur) {
  const t = await depot.trouver(id);
  if (!t) throw new ErreurApi(404, "TACHE_INTROUVABLE", "Tâche inconnue");
  if (t.auteur !== utilisateur.id) throw new ErreurApi(403, "INTERDIT", "Pas ta tâche");
  return depot.maj(id, { fini: true });
}
// routes/taches.js
router.patch("/:id/terminer", exigerAuth, async (req, res) => res.json(await service.terminer(req.params.id, req.user)));
```
Django a sa variante : modèles, vues (*views*), sérialiseurs, URLs.

### Cas d'utilisation
- Organiser une API Express ou FastAPI
- Tester les règles métier

> [!warning] À ne pas confondre
> Des couches **vides** qui ne font que transmettre (le service appelle le dépôt sans rien ajouter) : pour une petite application, c'est de la cérémonie. Adapte à la taille du projet.

## 3 · Relier
- **Au travail** : [Architecture en couches au travail](obsidian://open?vault=Travail&file=Architecture%20en%20couches%20au%20travail)
- **Prérequis** : [[Séparation des responsabilités]] · [[API REST]]
- **Complémentaires** : [[MVC]] · [[Doublure de test (mock)]]
