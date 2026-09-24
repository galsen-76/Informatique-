---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M11
tags:
  - infra/logs
aliases:
  - "Logs"
parent: "[[Infrastructure]]"
children:
  - "[[MON-02-Metriques-Alerting|Métriques et Alerting]]"
  - "[[MON-03-Tracing-Sentry-OpenTelemetry|Tracing et Monitoring d'Erreurs]]"
related_theory:
  - "[[NEST-07-Exceptions-Gestion-Erreurs|Exceptions et Gestion des Erreurs NestJS]]"
related_snippets:
  - "[[04_Snippets/mon-01-logs]]"
related_projects: []
source: "https://12factor.net/fr/logs"
---

# Logs

> [!abstract] Introduction
> Les logs racontent ce qui s'est passé dans l'application ; structurés (JSON), niveaux corrects et centralisés (Loki, ELK, cloud), ils sont le premier outil pour comprendre un incident en production.

---

## Théorie

> [!question]- C'est quoi ?
> Niveaux : `error` (action requise), `warn` (anormal mais géré), `info` (événements métier importants), `debug` (détails de dev).
> ```json
> {"level":"error","time":"2026-10-12T08:15:02Z","msg":"Paiement refusé","requestId":"a1b2","userId":42,"filmId":7,"err":"CARD_DECLINED"}
> ```

> [!example]- Analogie
> Le journal de bord d'un navire : sans lui, impossible de reconstituer ce qui s'est passé pendant la tempête.

> [!question]- Pourquoi l'utiliser ?
> En production, on ne peut pas mettre de breakpoint : les logs (et métriques, traces) sont les seuls yeux sur le système.

> [!question]- Comment ça marche ?
> - Logs **structurés** en JSON (pino, Logger Nest) → filtrables
> - **Identifiant de corrélation** (requestId) propagé à toutes les lignes d'une requête
> - Écrire sur stdout (conteneurs) → collecté par la plateforme (Loki/Grafana, ELK, Datadog, CloudWatch)
> - Côté front : erreurs remontées vers un outil (Sentry) plutôt que la console

> [!question]- Quand l'utiliser ?
> Toujours ; revoir les logs après chaque déploiement.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Trop de logs = bruit et coûts ; données personnelles et secrets interdits dans les logs (RGPD, sécurité).

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Log structuré | Entrée au format JSON avec des champs |
| Niveau | Gravité d'un log |
| Corrélation | Identifiant commun à une requête |
| Centralisation | Regroupement des logs de tous les services |

---

## Points clés

- JSON + niveaux + requestId
- stdout dans les conteneurs
- Jamais de mot de passe, token ou donnée sensible
- Logger les erreurs avec leur contexte

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - `console.log(user)` qui imprime un hash de mot de passe
> - Logs en `debug` en production (volume énorme)

---

## Exemple minimal

```typescript
// NestJS + nestjs-pino
LoggerModule.forRoot({ pinoHttp: { genReqId: (req) => req.headers['x-request-id'] ?? randomUUID(), redact: ['req.headers.authorization'] } });
```

> [!note] Ce que j'en retiens
> Chaque log porte l'identifiant de requête, et le token est masqué automatiquement.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Définir une politique de logs (niveaux, rétention, données interdites) pour l'équipe

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Infrastructure]]
- Sous-sujets → [[MON-02-Metriques-Alerting|Métriques et Alerting]], [[MON-03-Tracing-Sentry-OpenTelemetry|Tracing et Monitoring d'Erreurs]]
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/mon-01-logs]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi logger en JSON plutôt qu'en texte libre ?

---

## Tâches

- [ ] #task Ajouter pino + requestId à l'API CinéTrack
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
