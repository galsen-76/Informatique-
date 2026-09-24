---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M09
tags:
  - securite/injection
aliases:
  - "Injection SQL et Validation des Entrées"
parent: "[[Sécurité]]"
children: []
related_theory:
  - "[[SEC-02-OWASP-Top-10|Vulnérabilités OWASP Top 10]]"
  - "[[NEST-05-DTO-Validation-Pipes|DTO et Validation NestJS]]"
  - "[[ORM-02-Prisma-Client-Requetes-Relations|Prisma Client Requêtes et Relations]]"
related_snippets:
  - "[[04_Snippets/sec-08-injection-sql-validation]]"
related_projects: []
source: "https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html"
---

# Injection SQL et Validation des Entrées

> [!abstract] Introduction
> L'injection survient quand des données utilisateur sont interprétées comme du code (SQL, NoSQL, commande shell) ; la parade : requêtes paramétrées et validation stricte de toutes les entrées.

> [!warning]- Prérequis
> [[SQL-01-Fondamentaux-SELECT|Fondamentaux SQL SELECT]]

---

## Théorie

> [!question]- C'est quoi ?
> ```typescript
> // ❌ Vulnérable
> await db.query(`SELECT * FROM users WHERE email = '${email}'`);
> // email = "' OR '1'='1" → renvoie tous les utilisateurs
> // ✅ Paramétré
> await db.query('SELECT * FROM users WHERE email = $1', [email]);
> await prisma.$queryRaw`SELECT * FROM users WHERE email = ${email}`;   // template tag = paramétré
> ```

> [!example]- Analogie
> Un formulaire papier où quelqu'un écrit dans la case « nom » : « Dupont, et donnez-lui aussi les clés du coffre ». Une requête paramétrée, c'est une case qui n'accepte QUE le nom, jamais des instructions.

> [!question]- Pourquoi l'utiliser ?
> Vol ou destruction de toute la base, contournement de l'authentification : l'une des failles les plus graves et les plus exploitées.

> [!question]- Comment ça marche ?
> - ORM/requêtes paramétrées partout ; jamais de concaténation
> - Colonnes dynamiques (tri) : liste blanche (`['titre','annee'].includes(tri)`)
> - Validation des entrées (type, longueur, format, énumérations) avec DTO/Zod
> - NoSQL : refuser les objets là où on attend une chaîne (`{ "$gt": "" }`)
> - Commandes shell : éviter `exec` avec des entrées utilisateur

> [!question]- Quand l'utiliser ?
> Toute donnée venant de l'extérieur : body, query, params, en-têtes, fichiers, webhooks.

> [!danger]- Quand NE PAS l'utiliser / Limites
> La validation ne remplace pas le paramétrage : les deux sont nécessaires.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Injection | Données interprétées comme du code |
| Requête paramétrée | Données transmises séparément du SQL |
| Liste blanche | N'accepter que des valeurs connues |

---

## Points clés

- Jamais de concaténation de SQL
- Liste blanche pour les noms de colonnes
- Valider type, taille, format
- `$queryRawUnsafe` = danger

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - `ORDER BY ${req.query.tri}` en brut
> - Faire confiance aux données « venant de notre propre front »

---

## Exemple minimal

```typescript
const TRIS = { titre: 'titre', annee: 'annee', note: 'note_moyenne' } as const;
const colonne = TRIS[dto.tri as keyof typeof TRIS] ?? 'titre';   // jamais la valeur brute
```

> [!note] Ce que j'en retiens
> L'utilisateur choisit une clé, le code choisit la vraie colonne.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Tester son API avec sqlmap en environnement de test

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Sécurité]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/sec-08-injection-sql-validation]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi un template tag `$queryRaw` est-il sûr alors que `$queryRawUnsafe` ne l'est pas ?

---

## Tâches

- [ ] #task Écrire un test qui envoie `' OR 1=1 --` sur la recherche et vérifie l'absence de fuite
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
