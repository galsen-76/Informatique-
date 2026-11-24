---
type: concept
module: "[[Module 08 - Backend et API REST]]"
related:
  - "[[Journaliser avec logging]]"
tags:
  - concept
  - backend
---
# Gestion des erreurs d'une API

> [!info] En une phrase
> Une API bien faite renvoie, pour chaque problème, le bon code de statut et un corps d'erreur clair et toujours de la même forme, sans révéler de détails internes.

## 1 · Comprendre
### Définition
Principes :
- **Le bon code** : 400/422 si les données sont fausses, 401/403 pour l'accès, 404 si absent, 409 en cas de conflit, 500 pour un bug.
- **Une forme unique** pour toutes les erreurs :
```json
{ "erreur": { "code": "TACHE_INTROUVABLE", "message": "La tâche 12 n'existe pas" } }
```
- **Pas de détail interne** dans la réponse (trace, requête SQL, chemin) : on les met dans les **logs**.
- **Un gestionnaire central** plutôt qu'un `try/catch` différent dans chaque route.

### Pourquoi ça existe
Sans règle, chaque route invente sa façon d'échouer et le client ne sait pas quoi afficher ; et une trace d'erreur exposée aide un attaquant.

### Le problème résolu
Des clients qui réagissent correctement, et des erreurs faciles à retrouver dans les logs.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
R[Route] -->|throw| G[Gestionnaire]
  G --> L[Log complet]
  G --> C[Réponse propre]
```

### Exemple concret
```js
class ErreurApi extends Error {
  constructor(status, code, message) { super(message); this.status = status; this.code = code; }
}
app.get("/taches/:id", async (req, res, next) => {
  try {
    const t = await trouverTache(req.params.id);
    if (!t) throw new ErreurApi(404, "TACHE_INTROUVABLE", `La tâche ${req.params.id} n'existe pas`);
    res.json(t);
  } catch (e) { next(e); }
});
// middleware d'erreur : 4 paramètres, déclaré en dernier
app.use((err, req, res, next) => {
  const status = err.status ?? 500;
  if (status === 500) console.error(err);       // le détail reste dans les logs
  res.status(status).json({ erreur: { code: err.code ?? "ERREUR_INTERNE",
    message: status === 500 ? "Erreur interne" : err.message } });
});
```

### Cas d'utilisation
- Le frontend qui affiche des messages d'erreur
- Le débogage en production

> [!warning] À ne pas confondre
> Renvoyer **200 avec `{"ok": false}`** : le client, les proxys et la supervision croient que tout va bien. Utilise les codes de statut.

## 3 · Relier
- **Au travail** : [Gestion des erreurs d'une API au travail](obsidian://open?vault=Travail&file=Gestion%20des%20erreurs%20d%27une%20API%20au%20travail)
- **Prérequis** : [[Code de statut HTTP]] · [[Middleware]] · [[Exception]]
- **Complémentaires** : [[Journaliser avec logging]]
