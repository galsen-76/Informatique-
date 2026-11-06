---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Authentification]]"
  - "[[Hachage de mot de passe]]"
  - "[[Session et cookie]]"
  - "[[Secret et fichier .env]]"
tags:
  - exercice
---
# Exercice — Inscription, connexion et session

> [!info] Objectif
> Construire une vraie connexion par session, avec des mots de passe correctement stockés.
> Notions : [[Authentification]] · [[Hachage de mot de passe]] · [[Session et cookie]] · [[Secret et fichier .env]]

## Consignes
- [ ] Dans une API Express, crée `POST /inscription` qui valide l'e-mail et un mot de passe d'au moins 12 caractères, et stocke l'empreinte bcrypt (une `Map` suffit, ou PostgreSQL)
- [ ] Crée `POST /connexion` : même réponse 401 que l'e-mail existe ou non
- [ ] Utilise `express-session` avec un cookie `httpOnly`, `sameSite: "lax"` et une durée d'une heure ; le secret vient de `.env`
- [ ] Crée `GET /moi` (401 si pas de session) et `POST /deconnexion`
- [ ] Teste avec curl et un fichier de cookies (`-c cookies.txt` puis `-b cookies.txt`)
- [ ] Regarde le cookie dans les outils du navigateur et vérifie ses attributs
- [ ] Vérifie que `.env` est ignoré par Git et qu'un `.env.example` existe

> [!question]- Indice
> `curl -c cookies.txt -X POST …/connexion …` enregistre le cookie ; `curl -b cookies.txt …/moi` le renvoie.

> [!question]- Solution
> ```js
> import "dotenv/config";
> import express from "express";
> import session from "express-session";
> import bcrypt from "bcrypt";
> const app = express();
> app.use(express.json());
> app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false,
>   cookie: { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 3600_000 } }));
> const users = new Map();
> app.post("/inscription", async (req, res) => {
>   const { email, motDePasse } = req.body ?? {};
>   if (!/^\S+@\S+$/.test(email ?? "") || (motDePasse ?? "").length < 12) return res.status(400).json({ erreur: "Données invalides" });
>   if (users.has(email)) return res.status(409).json({ erreur: "Déjà inscrit" });
>   users.set(email, { email, empreinte: await bcrypt.hash(motDePasse, 12) });
>   res.sendStatus(201);
> });
> app.post("/connexion", async (req, res) => {
>   const u = users.get(req.body?.email);
>   const ok = u && await bcrypt.compare(req.body.motDePasse ?? "", u.empreinte);
>   if (!ok) return res.status(401).json({ erreur: "Identifiants invalides" });
>   req.session.email = u.email;
>   res.sendStatus(204);
> });
> app.get("/moi", (req, res) => req.session.email ? res.json({ email: req.session.email }) : res.sendStatus(401));
> app.post("/deconnexion", (req, res) => req.session.destroy(() => res.sendStatus(204)));
> app.listen(3000);
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
