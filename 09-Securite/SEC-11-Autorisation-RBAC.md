---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M09
tags:
  - securite/autorisation
aliases:
  - "Autorisation RBAC"
parent: "[[Sécurité]]"
children: []
related_theory:
  - "[[NEST-06-Middleware-Guards-Interceptors|Middleware Guards et Interceptors NestJS]]"
  - "[[ANG-21-Guards-Resolvers-Intercepteurs|Guards Resolvers et Intercepteurs Angular]]"
related_snippets:
  - "[[04_Snippets/sec-11-autorisation-rbac]]"
related_projects: []
source: "https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html"
---

# Autorisation RBAC

> [!abstract] Introduction
> L'autorisation décide ce qu'un utilisateur authentifié a le droit de faire : par rôle (RBAC), par attributs/propriété (ABAC), toujours vérifiée côté serveur, le front ne faisant qu'adapter l'affichage.

> [!warning]- Prérequis
> [[SEC-03-Authentification-Sessions-JWT|Authentification Sessions vs JWT]]

---

## Théorie

> [!question]- C'est quoi ?
> - **RBAC** (Role-Based) : droits attachés à des rôles (`ADMIN`, `MODERATEUR`, `USER`)
> - **Permissions** fines : `critique:supprimer`, `film:creer`
> - **ABAC / propriété** : « l'auteur peut modifier SA critique », « le manager voit son équipe »
> - Refus par défaut (deny by default)

> [!example]- Analogie
> Le badge d'entreprise : ton rôle ouvre certains étages (RBAC), mais seul ton bureau s'ouvre avec ta clé personnelle (propriété).

> [!question]- Pourquoi l'utiliser ?
> A01 de l'OWASP : le contrôle d'accès défaillant est la faille n°1.

> [!question]- Comment ça marche ?
> ```typescript
> // API : rôle + propriété
> @Roles('USER', 'MODERATEUR') @Delete('critiques/:id')
> async supprimer(@Param('id', ParseIntPipe) id: number, @Req() req) {
>   const c = await this.critiques.obtenir(id);
>   const estModo = req.user.role === 'MODERATEUR';
>   if (!estModo && c.auteurId !== req.user.sub) throw new ForbiddenException();
>   return this.critiques.supprimer(id);
> }
> ```
> Front (Angular) : guard de route + directive/`@if` pour masquer les boutons → confort uniquement.
> Librairie : CASL (partage des règles front/back, Angular, Vue et Nest).

> [!question]- Quand l'utiliser ?
> Chaque endpoint, chaque objet manipulé.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Rôles qui explosent (« ADMIN_SAUF_FACTURATION ») → passer à des permissions/politiques.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| RBAC | Contrôle d'accès par rôle |
| ABAC | Contrôle par attributs |
| Permission | Droit élémentaire sur une action |
| Deny by default | Tout est interdit sauf autorisation explicite |

---

## Points clés

- Vérifier côté serveur, toujours
- Rôle ET propriété de la ressource
- Refus par défaut
- Tester les cas interdits (403)

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Filtrer uniquement dans la liste mais laisser `GET /ressource/:id` ouvert

---

## Exemple minimal

```html
<!-- Angular : confort d'affichage uniquement -->
@if (auth.peut('critique:supprimer', critique)) { <button (click)="supprimer(critique.id)">Supprimer</button> }
```

> [!note] Ce que j'en retiens
> Masquer le bouton améliore l'UX ; seule l'API protège réellement.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Centraliser les politiques (CASL, OPA) et les tester unitairement

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Sécurité]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/sec-11-autorisation-rbac]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi masquer un bouton côté front ne suffit-il pas ?

---

## Tâches

- [ ] #task Écrire les tests e2e « un utilisateur ne peut pas supprimer la critique d'un autre »
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
