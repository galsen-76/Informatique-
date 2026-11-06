---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Injection SQL]]"
  - "[[XSS]]"
  - "[[CSRF]]"
  - "[[Secret et fichier .env]]"
tags:
  - exercice
---
# Exercice — Trouver et corriger des failles

> [!info] Objectif
> Exploiter puis corriger les failles classiques sur une application de test locale, pour savoir les reconnaître dans du vrai code.
> Notions : [[Injection SQL]] · [[XSS]] · [[CSRF]] · [[Secret et fichier .env]]

## Consignes
- [ ] Sur une base PostgreSQL de test (Docker), écris une route `GET /recherche?nom=` qui concatène `nom` dans le SQL
- [ ] Exploite-la avec curl pour lister toutes les lignes, puis corrige-la avec une requête paramétrée et vérifie que l'attaque ne marche plus
- [ ] Dans une page, affiche des noms de tâches avec `innerHTML` ; ajoute un nom piégé avec `<img src=x onerror=alert(1)>` ; corrige avec `textContent`
- [ ] Explique, pour une API à cookie de session sans `SameSite`, comment une page piège pourrait supprimer une tâche ; corrige la configuration du cookie
- [ ] Dans un dépôt de test, commite un faux secret, supprime-le dans un second commit, puis retrouve-le avec `git log -p` : conclus
- [ ] Passe `gitleaks detect` (ou `git log -p | grep`) sur ce dépôt

> [!question]- Indice
> Attaque : `curl "http://localhost:3000/recherche?nom=x'%20OR%20'1'='1"` (les espaces encodés en `%20`).

> [!question]- Solution
> ```js
> // vulnérable
> const r = await db.query(`SELECT * FROM tache WHERE nom = '${req.query.nom}'`);
> // corrigé
> const r = await db.query("SELECT * FROM tache WHERE nom = $1", [req.query.nom]);
> ```
> ```js
> li.textContent = tache.nom;      // au lieu de li.innerHTML
> ```
> ```js
> cookie: { httpOnly: true, secure: true, sameSite: "lax" }
> ```
> Le faux secret reste visible dans l'historique : un secret commité est **compromis**, on le révoque et on le remplace (réécrire l'historique ne suffit pas, d'autres ont pu le cloner).

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
