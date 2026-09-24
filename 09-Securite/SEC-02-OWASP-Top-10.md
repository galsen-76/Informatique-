---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M09
tags:
  - securite/owasp
aliases:
  - "Vulnérabilités OWASP Top 10"
parent: "[[Sécurité]]"
children: []
related_theory:
  - "[[SEC-01-Fondamentaux-Securite|Fondamentaux de la Sécurité]]"
  - "[[SEC-06-XSS-CSRF|XSS et CSRF]]"
  - "[[SEC-08-Injection-SQL-Validation|Injection SQL et Validation des Entrées]]"
related_snippets:
  - "[[04_Snippets/sec-02-owasp-top-10]]"
related_projects: []
source: "https://owasp.org/Top10/fr/"
---

# Vulnérabilités OWASP Top 10

> [!abstract] Introduction
> L'OWASP Top 10 liste les risques de sécurité les plus critiques des applications web ; c'est la référence minimale que tout développeur full stack doit connaître et savoir prévenir.

> [!warning]- Prérequis
> [[SEC-01-Fondamentaux-Securite|Fondamentaux de la Sécurité]]

---

## Théorie

> [!question]- C'est quoi ?
> Top 10 (édition 2021, la référence la plus citée ; une nouvelle édition 2025 réorganise légèrement la liste — vérifier la version courante) :
> | # | Risque | Prévention principale |
> |---|---|---|
> | A01 | Contrôle d'accès défaillant | Vérifier les droits côté serveur sur chaque ressource |
> | A02 | Défaillances cryptographiques | HTTPS, hachage fort des mots de passe, chiffrement des données sensibles |
> | A03 | Injection (SQL, NoSQL, commande, XSS) | Requêtes paramétrées, échappement, validation |
> | A04 | Conception non sécurisée | Threat modeling, patterns sûrs |
> | A05 | Mauvaise configuration | Durcissement, pas de debug en prod, en-têtes de sécurité |
> | A06 | Composants vulnérables | `npm audit`, Renovate, SCA en CI |
> | A07 | Identification/authentification défaillantes | MFA, rate limiting, sessions sûres |
> | A08 | Intégrité logiciel/données | Signatures, CI sécurisée, pas de désérialisation non sûre |
> | A09 | Journalisation/surveillance insuffisantes | Logs d'audit, alertes |
> | A10 | SSRF | Liste blanche des URL appelées par le serveur |

> [!example]- Analogie
> La liste des 10 techniques de cambriolage les plus courantes : la connaître permet de mettre une serrure là où les voleurs passent vraiment.

> [!question]- Pourquoi l'utiliser ?
> Ces failles représentent l'immense majorité des incidents ; elles sont vérifiées par les audits et tests d'intrusion de ton entreprise et de ses clients.

> [!question]- Comment ça marche ?
> Réflexes concrets dans la stack :
> - Angular/Vue : pas de `innerHTML`/`v-html`/`bypassSecurityTrust*` sur des données utilisateur
> - NestJS : ValidationPipe whitelist, guards d'autorisation, Prisma paramétré, Helmet, rate limiting
> - CI : SAST, scan de dépendances et de secrets (GitLab)

> [!question]- Quand l'utiliser ?
> À chaque fonctionnalité et en revue de code.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Le Top 10 n'est pas exhaustif : l'OWASP ASVS fournit une liste de vérification complète.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| OWASP | Fondation dédiée à la sécurité applicative |
| IDOR | Accès à la ressource d'un autre en changeant un identifiant |
| SSRF | Le serveur est amené à appeler une URL malveillante |
| SCA | Analyse des dépendances tierces |

---

## Points clés

- A01 (contrôle d'accès) est le risque n°1
- Tout ce qui vient du client est hostile
- Dépendances à jour et scannées
- Logs d'audit sur les actions sensibles

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - `GET /api/factures/123` renvoie la facture de n'importe qui (IDOR)
> - Laisser Swagger, les stack traces ou le mode debug en production

---

## Exemple minimal

```typescript
app.use(helmet());   // en-têtes de sécurité (NestJS/Express)
```
```text
Test manuel IDOR : se connecter en utilisateur A, rejouer une requête de B en changeant l'id → doit renvoyer 403/404
```

> [!note] Ce que j'en retiens
> Tester soi-même ses routes en changeant les identifiants.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Utiliser l'ASVS comme checklist et participer aux revues de sécurité

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Sécurité]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/sec-02-owasp-top-10]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Qu'est-ce qu'une IDOR et comment la prévenir ?

> [!faq]- Questions d'entretien
> - Citez 3 vulnérabilités OWASP et comment vous les évitez.

---

## Tâches

- [ ] #task Faire les exercices OWASP Juice Shop (niveau 1 et 2)
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
