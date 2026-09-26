---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M09
tags:
  - securite/owasp
aliases:
  - "Vulnérabilités OWASP Top 10"
parent: "[[Sécurité]]"
related_theory:
  - "[[SEC-01-Fondamentaux-Securite|Fondamentaux de la Sécurité]]"
  - "[[SEC-06-XSS-CSRF|XSS et CSRF]]"
  - "[[SEC-08-Injection-SQL-Validation|Injection SQL et Validation des Entrées]]"
related_projects: []
source: "https://owasp.org/Top10/fr/"
---

# OWASP Top 10

> [!abstract] En bref
> L'**OWASP** est une organisation qui publie la liste des **10 risques de sécurité les plus fréquents** dans les applications web. C'est la check-list de référence : connue des recruteurs, des auditeurs, et utilisée dans les entretiens. Pour chaque risque, voici ce que ça veut dire et comment tu t'en protèges dans ta stack.

## Les 10 risques (édition 2021, base de référence)

| # | Risque | En clair | Ta protection (NestJS / Angular / Vue) |
|---|---|---|---|
| A01 | **Contrôle d'accès défaillant** | un utilisateur accède à ce qui n'est pas à lui | vérifier le propriétaire dans chaque service ; guards ; tout protégé par défaut (voir [[SEC-11-Autorisation-RBAC\|Autorisation]]) |
| A02 | **Défaillances cryptographiques** | données sensibles mal protégées | HTTPS partout, mots de passe hachés avec argon2, pas de données sensibles dans un JWT |
| A03 | **Injection** | des données interprétées comme du code (SQL, HTML) | Prisma (requêtes paramétrées), DTO validés, pas d'`innerHTML` / `v-html` avec des données utilisateur |
| A04 | **Conception non sécurisée** | la faille est dans la logique même | réfléchir aux abus dès la conception (« et si quelqu'un note 1 000 fois ? ») |
| A05 | **Mauvaise configuration** | réglages par défaut, trop permissifs | CORS restreint, en-têtes de sécurité (helmet), Swagger fermé en production, messages d'erreur neutres |
| A06 | **Composants vulnérables** | des librairies avec des failles connues | `npm audit`, mises à jour régulières, scan des dépendances dans la CI |
| A07 | **Authentification défaillante** | connexion trop facile à contourner | limite de tentatives, jetons courts, mots de passe solides, même message d'erreur pour e-mail et mot de passe |
| A08 | **Intégrité des données / du logiciel** | code ou données modifiés sans contrôle | `package-lock.json` commité, pipeline protégé, vérifier les mises à jour |
| A09 | **Journalisation insuffisante** | une attaque passe inaperçue | logs des connexions et erreurs, alertes (voir [[MON-01-Logs\|Logs]]) |
| A10 | **SSRF** | le serveur appelle une URL fournie par l'attaquant | ne jamais appeler une URL fournie par l'utilisateur sans liste d'autorisation |

> [!note] Version
> L'OWASP met la liste à jour tous les quelques années ; vérifie la dernière édition sur owasp.org. Les grands thèmes restent les mêmes.

## Le n°1 en détail : le contrôle d'accès

```ts
// ❌ n'importe quel utilisateur connecté peut supprimer n'importe quelle critique
@Delete(':id')
remove(@Param('id', ParseIntPipe) id: number) {
  return this.prisma.review.delete({ where: { id } });
}

// ✅ on vérifie que la critique lui appartient
async remove(id: number, userId: number) {
  const review = await this.prisma.review.findUnique({ where: { id } });
  if (!review) throw new NotFoundException();
  if (review.userId !== userId) throw new ForbiddenException();
  return this.prisma.review.delete({ where: { id } });
}
```

C'est la faille la plus courante, et elle ne se voit pas en utilisant l'application normalement : il faut **tester avec le jeton d'un autre utilisateur**.

## Ta check-list pour CinéTrack-API

- [ ] Toutes les routes protégées par défaut, `@Public()` explicite
- [ ] Chaque modification vérifie le propriétaire
- [ ] `ValidationPipe` global avec `whitelist`
- [ ] Mots de passe en argon2
- [ ] CORS limité aux domaines du front
- [ ] `helmet()` activé
- [ ] Limitation des tentatives de connexion
- [ ] Aucun secret dans le dépôt
- [ ] `npm audit` sans faille critique
- [ ] Erreurs neutres pour le client, détaillées dans les logs
