---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Authentification]]"
  - "[[JWT]]"
tags:
  - exercice
---
# Exercice — Protéger une route avec un JWT

> [!info] Objectif
> Ajouter une connexion à une API Express et protéger une route.
> Notions : [[Authentification]] · [[JWT]]

## Consignes
- [ ] Dans l'API de l'exercice Express, ajoute une route `POST /login` qui renvoie un JWT si l'identifiant est bon
- [ ] Écris un middleware qui vérifie l'en-tête `Authorization: Bearer <jeton>`
- [ ] Protège une route avec ce middleware
- [ ] Teste avec `curl` : sans jeton (401), avec un faux jeton, avec le bon jeton
- [ ] Décode ton jeton sur jwt.io et explique pourquoi on n'y met pas de mot de passe

> [!question]- Indice
> Paquet `jsonwebtoken` : `jwt.sign(payload, secret, { expiresIn: "1h" })` et `jwt.verify(jeton, secret)`. Le secret vient d'une variable d'environnement.

> [!question]- Solution
> ```js
> const jwt = require("jsonwebtoken");
> app.post("/login", (req, res) => {
>   if (req.body.user !== "oumar" || req.body.password !== "dev") return res.sendStatus(401);
>   res.json({ token: jwt.sign({ sub: "oumar" }, process.env.JWT_SECRET, { expiresIn: "1h" }) });
> });
> function auth(req, res, next) {
>   const t = (req.headers.authorization || "").replace("Bearer ", "");
>   try { req.user = jwt.verify(t, process.env.JWT_SECRET); next(); } catch { res.sendStatus(401); }
> }
> app.get("/notes", auth, (req, res) => res.json([]));
> ```
> Un JWT est signé, pas chiffré : n'importe qui peut lire son contenu.

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
