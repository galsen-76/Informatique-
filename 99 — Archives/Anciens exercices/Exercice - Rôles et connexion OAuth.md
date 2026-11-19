---
type: exercise
status: a-faire
difficulty: difficile
concepts:
  - "[[Autorisation et rôles]]"
  - "[[OAuth 2 et OpenID Connect]]"
  - "[[JWT]]"
tags:
  - exercice
---
# Exercice — Rôles et connexion OAuth

> [!info] Objectif
> Ajouter des droits à une API et suivre à la main un vrai flux OAuth.
> Notions : [[Autorisation et rôles]] · [[OAuth 2 et OpenID Connect]] · [[JWT]]

## Consignes
- [ ] Dans ton API de notes, ajoute un rôle (`lecteur`, `auteur`, `admin`) dans le JWT
- [ ] Écris un middleware `exigerRole(...roles)` ; seul `admin` peut supprimer n'importe quelle note
- [ ] Un `auteur` ne peut modifier que ses propres notes : vérifie la propriété, réponds 403 sinon ; teste avec deux utilisateurs
- [ ] Sur GitHub (Settings, Developer settings, OAuth Apps), crée une application avec l'adresse de retour `http://localhost:3000/callback`
- [ ] Construis l'URL d'autorisation à la main (client_id, redirect_uri, scope `read:user`, state), ouvre-la, récupère le `code` dans l'adresse de retour
- [ ] Échange le code contre un jeton avec curl, puis appelle `https://api.github.com/user` avec ce jeton
- [ ] Explique ce que tu aurais en plus avec OpenID Connect, et pourquoi on vérifie `state`

> [!question]- Indice
> Échange : `curl -X POST https://github.com/login/oauth/access_token -H "Accept: application/json" -d client_id=… -d client_secret=… -d code=…`.

> [!question]- Solution
> ```js
> const exigerRole = (...roles) => (req, res, next) =>
>   roles.includes(req.user?.role) ? next() : res.status(403).json({ erreur: "Interdit" });
> app.delete("/notes/:id", exigerAuth, exigerRole("admin"), supprimer);
> app.patch("/notes/:id", exigerAuth, exigerRole("auteur", "admin"), (req, res) => {
>   const n = notes.get(Number(req.params.id));
>   if (!n) return res.sendStatus(404);
>   if (req.user.role !== "admin" && n.auteur !== req.user.sub) return res.sendStatus(403);
>   Object.assign(n, req.body); res.json(n);
> });
> ```
> ```bash
> # 1. dans le navigateur
> https://github.com/login/oauth/authorize?client_id=ID&redirect_uri=http://localhost:3000/callback&scope=read:user&state=abc123
> # 2. échange
> curl -s -X POST https://github.com/login/oauth/access_token -H "Accept: application/json" \
>   -d client_id=ID -d client_secret=SECRET -d code=CODE
> # 3. appel
> curl -s https://api.github.com/user -H "Authorization: Bearer gho_…"
> ```
> OpenID Connect ajouterait un `id_token` (JWT signé qui dit qui est l'utilisateur). `state` garantit que la réponse correspond à **ta** demande (sinon un attaquant pourrait t'injecter son propre code).

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
