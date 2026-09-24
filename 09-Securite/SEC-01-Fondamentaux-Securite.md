---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M09
tags:
  - securite/fondamentaux
aliases:
  - "Fondamentaux de la Sécurité"
parent: "[[Sécurité]]"
children:
  - "[[SEC-02-OWASP-Top-10|Vulnérabilités OWASP Top 10]]"
  - "[[SEC-03-Authentification-Sessions-JWT|Authentification Sessions vs JWT]]"
related_theory: []
related_snippets:
  - "[[04_Snippets/sec-01-fondamentaux-securite]]"
related_projects: []
source: "https://cheatsheetseries.owasp.org/"
---

# Fondamentaux de la Sécurité

> [!abstract] Introduction
> La sécurité applicative vise à protéger la confidentialité, l'intégrité et la disponibilité des données (triade CIA) ; elle se pense dès la conception (« security by design »), en couches, et côté serveur avant tout.

---

## Théorie

> [!question]- C'est quoi ?
> **Triade CIA** : Confidentialité (seuls les autorisés lisent), Intégrité (données non altérées), Disponibilité (service accessible).
> Principes :
> - **Défense en profondeur** : plusieurs couches (WAF, HTTPS, auth, validation, droits BDD)
> - **Moindre privilège** : chaque composant a le minimum de droits
> - **Ne jamais faire confiance au client** : tout ce qui vient du navigateur est modifiable
> - **Sécurité par défaut** : fermé par défaut, ouvert explicitement
> - **Authentification** (qui es-tu ?) ≠ **Autorisation** (as-tu le droit ?)

> [!example]- Analogie
> Un château fort : douves (pare-feu), murailles (HTTPS), gardes à la porte (authentification), clés différentes par salle (autorisation), coffre dans la tour (chiffrement) — si une défense tombe, les autres tiennent.

> [!question]- Pourquoi l'utiliser ?
> Une faille = fuite de données personnelles (sanctions RGPD, réputation), fraude, indisponibilité. Les attaques automatisées scannent en permanence toutes les applications exposées.

> [!question]- Comment ça marche ?
> ```mermaid
> flowchart LR
>   U[Navigateur] -->|HTTPS| W[WAF / reverse proxy]
>   W --> API[API : auth, autorisation, validation, rate limiting]
>   API -->|"compte à droits limités"| DB[(BDD chiffrée + sauvegardes)]
>   API --> LOG[Logs et alertes]
> ```
> Côté front : éviter XSS, ne stocker aucun secret, CSP, dépendances à jour. Côté back : valider, autoriser chaque requête, requêtes paramétrées, secrets hors du code, journaliser.

> [!question]- Quand l'utiliser ?
> Dès la conception et à chaque fonctionnalité (« que peut faire un utilisateur malveillant ici ? »).

> [!danger]- Quand NE PAS l'utiliser / Limites
> La sécurité parfaite n'existe pas : on réduit le risque (probabilité × impact) de façon proportionnée.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Menace | Ce qui peut causer un dommage |
| Vulnérabilité | Faiblesse exploitable |
| Surface d'attaque | Ensemble des points d'entrée |
| Moindre privilège | Droits minimaux nécessaires |
| Threat modeling | Analyse des menaces d'un système |

---

## Points clés

- Le front n'est jamais une barrière de sécurité
- Authentifier ET autoriser chaque requête
- Défense en profondeur
- Mettre à jour les dépendances

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Cacher un bouton admin côté front et croire l'API protégée
> - Messages d'erreur trop détaillés (stack trace, requête SQL)

---

## Exemple minimal

```typescript
// L'API vérifie que la critique appartient bien à l'utilisateur (autorisation au niveau objet)
async supprimerCritique(userId: number, critiqueId: number) {
  const c = await this.prisma.critique.findUniqueOrThrow({ where: { id: critiqueId } });
  if (c.auteurId !== userId) throw new ForbiddenException();
  await this.prisma.critique.delete({ where: { id: critiqueId } });
}
```

> [!note] Ce que j'en retiens
> Être connecté ne suffit pas : il faut avoir le droit sur CETTE ressource.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Faire du threat modeling (STRIDE) sur une nouvelle fonctionnalité

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Sécurité]]
- Sous-sujets → [[SEC-02-OWASP-Top-10|Vulnérabilités OWASP Top 10]], [[SEC-03-Authentification-Sessions-JWT|Authentification Sessions vs JWT]]
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/sec-01-fondamentaux-securite]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Différence entre authentification et autorisation ?

> [!faq]- Questions d'entretien
> - Comment sécurisez-vous une application web de bout en bout ?

---

## Tâches

- [ ] #task Lire la page OWASP « Secure Coding Practices Checklist »
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
