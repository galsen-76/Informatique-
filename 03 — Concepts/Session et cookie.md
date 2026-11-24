---
type: concept
domain: securite
module: "[[Module 10 - Authentification et sécurité]]"
status: a-decouvrir
level: debutant
niveau: 5
schema: false
exercice_visuel: false
fil_rouge: false
prerequisites:
  - "[[Authentification]]"
  - "[[En-tête HTTP]]"
parents:
  - "[[Authentification]]"
related:
  - "[[JWT]]"
  - "[[CSRF]]"
next_review: 
tags:
  - concept
  - securite
---
# Session et cookie

> [!info] En une phrase
> Un cookie est une petite donnée que le navigateur renvoie automatiquement au site ; une session stocke côté serveur qui est connecté, et le cookie ne contient que son identifiant.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
1. Après la connexion, le serveur crée une **session** (en mémoire, en base ou dans Redis) et répond :
```
Set-Cookie: sid=8f3a…; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=3600
```
2. Le navigateur renvoie ensuite `Cookie: sid=8f3a…` à chaque requête vers ce site.
3. Le serveur retrouve la session et donc l'utilisateur.
Attributs de sécurité :
| Attribut | Effet |
| --- | --- |
| `HttpOnly` | invisible pour JavaScript (protège contre le vol par [[XSS]]) |
| `Secure` | envoyé seulement en HTTPS |
| `SameSite=Lax/Strict` | pas envoyé par les autres sites (protège contre le [[CSRF]]) |
| `Max-Age` / `Expires` | durée de vie |

### Pourquoi ça existe
HTTP ne se souvient de rien entre deux requêtes ; il faut un moyen de rester connecté.

### Le problème résolu
Reconnaître l'utilisateur à chaque requête sans lui redemander son mot de passe, et pouvoir le déconnecter côté serveur à tout moment.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
N[Navigateur] -->|login| S[Serveur]
  S -->|Set-Cookie sid| N
  N -->|Cookie sid| S
  S --> B[Session en base]
```

### Exemple concret
```js
import session from "express-session";
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false,
  cookie: { httpOnly: true, secure: true, sameSite: "lax", maxAge: 3600_000 } }));
app.post("/login", async (req, res) => {
  const u = await verifier(req.body.email, req.body.motDePasse);
  if (!u) return res.status(401).json({ erreur: "Identifiants invalides" });
  req.session.userId = u.id;
  res.sendStatus(204);
});
app.post("/logout", (req, res) => req.session.destroy(() => res.sendStatus(204)));
```
Dans les outils du navigateur : onglet *Application* (ou *Stockage*), rubrique *Cookies*.

### Cas d'utilisation
- Garder un panier
- Déconnecter un utilisateur à distance

> [!warning] À ne pas confondre
> **Session** (état côté serveur, révocable) et **[[JWT]]** (état dans le jeton, difficile à révoquer avant expiration). Et `localStorage` n'est pas un cookie : il n'est pas envoyé automatiquement et JavaScript peut le lire.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] 🛣️ Suis le trajet
> Dessine trois requêtes après connexion : le cookie envoyé à chaque fois, la session côté serveur qui le reconnaît.

> [!example] ⚖️ Avant / après
> Avant / après : HTTP sans cookie (le serveur oublie tout), puis avec. Dessine ce que le serveur sait à la deuxième requête.

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Session et cookie » et je l'intègre ici avec `![[Schéma - Session et cookie.excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : elle sera pratiquée dans le fil rouge de son niveau (voir [[Niveaux]]).

## 4 · Relier
- **Au travail** : [Session et cookie au travail](obsidian://open?vault=Travail&file=Session%20et%20cookie%20au%20travail)
- **Prérequis** : [[Authentification]] · [[En-tête HTTP]]
- **Complémentaires** : [[JWT]] · [[CSRF]]

## 5 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation (compris, puis maîtrisé)
Trois cases à cocher dans les propriétés de la fiche :
- `schema` : mon dessin du concept est dans « Mon schéma » ;
- `exercice_visuel` : j'ai fait et corrigé les exercices visuels de la section 3 ;
- `fil_rouge` : je l'ai appliqué dans le fil rouge (coché tout seul quand une étape qui l'utilise est réussie).

Les trois cochées : la notion compte comme **comprise**. **Maîtrisé** : c'est moi qui le mets dans `status`, quand je le sens.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
