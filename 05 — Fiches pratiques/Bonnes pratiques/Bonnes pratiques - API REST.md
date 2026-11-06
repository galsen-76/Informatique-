---
type: bonnes-pratiques
sujet: "API REST"
concepts:
  - "[[API REST]]"
  - "[[Endpoint]]"
  - "[[Méthode HTTP]]"
  - "[[Code de statut HTTP]]"
  - "[[Validation des données]]"
  - "[[Gestion des erreurs d'une API]]"
  - "[[CORS]]"
tags:
  - bonnes-pratiques
---
# Bonnes pratiques - API REST

> [!info] À quoi sert cette fiche
> Concevoir des API prévisibles, que les autres développeurs (et toi dans six mois) utilisent sans lire le code.
> Chaque règle dit **pourquoi** : c'est la raison qui compte, pour savoir l'adapter quand la situation change.

## À faire

### 1. Des noms de ressources au pluriel, des méthodes HTTP pour l'action
`GET /taches`, `POST /taches`, `PATCH /taches/12`, `DELETE /taches/12`. Pas de verbe dans l'URL. Voir [[Méthode HTTP]].

### 2. Les bons codes de statut
201 à la création, 204 sans contenu, 400 ou 422 pour des données invalides, 401, 403, 404, 409, 500. Voir [[Code de statut HTTP]].

### 3. Valider toutes les entrées
Corps, paramètres, en-têtes : avec un schéma, et réponse 400 détaillée. Voir [[Validation des données]].

### 4. Un format d'erreur unique
Le client sait toujours où trouver le message. Voir [[Gestion des erreurs d'une API]].

```json
{ "erreur": { "code": "TACHE_INTROUVABLE", "message": "La tâche 12 n'existe pas" } }
```

### 5. Paginer les listes
`GET /taches?page=2&limite=50` avec le total : une liste peut grossir sans limite.

### 6. Versionner l'API
`/api/v1/...` : on peut changer sans casser les clients existants.

### 7. Documenter avec OpenAPI
La documentation est générée et toujours à jour. Voir [[OpenAPI]].

### 8. Authentifier et vérifier les droits sur chaque route
Pas seulement « connecté », mais « a le droit sur **cette** ressource ». Voir [[Autorisation et rôles]].

## À éviter

### 1. Répondre 200 avec `{"ok": false}`
**Pourquoi c'est un problème :** les clients, proxys et outils de supervision croient que tout va bien.
**À la place :** le bon code de statut.

### 2. Un GET qui modifie des données
**Pourquoi c'est un problème :** les navigateurs, caches et robots le rejouent.
**À la place :** POST, PATCH ou DELETE.

### 3. Renvoyer les détails internes dans les erreurs (trace, SQL)
**Pourquoi c'est un problème :** aide un attaquant, inquiète l'utilisateur.
**À la place :** un message clair ; le détail dans les logs.

### 4. Renvoyer des champs sensibles
**Pourquoi c'est un problème :** empreinte de mot de passe, jetons, données d'autres utilisateurs.
**À la place :** choisir explicitement les champs renvoyés.

### 5. Changer le format d'une réponse sans prévenir
**Pourquoi c'est un problème :** les clients cassent en production.
**À la place :** ajouter des champs plutôt que d'en retirer, ou une nouvelle version.

### 6. `Access-Control-Allow-Origin: *` pour régler une erreur CORS
**Pourquoi c'est un problème :** ouvre l'API à tous les sites.
**À la place :** n'autoriser que les origines connues. Voir [[CORS]].

## Avant de valider mon travail
- [ ] Chaque route a la bonne méthode et renvoie le bon code
- [ ] Toutes les entrées sont validées
- [ ] Les erreurs ont toutes la même forme
- [ ] Les droits sont vérifiés sur chaque ressource
- [ ] La documentation OpenAPI est à jour
- [ ] Des tests d'intégration couvrent les routes

## Notions liées
[[API REST]] · [[Endpoint]] · [[Méthode HTTP]] · [[Code de statut HTTP]] · [[Validation des données]] · [[Gestion des erreurs d'une API]] · [[CORS]]
