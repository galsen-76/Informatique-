---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Avancé
month: M11
tags:
  - infra/tracing
aliases:
  - "Tracing et Monitoring d'Erreurs"
parent: "[[Infrastructure]]"
children: []
related_theory:
  - "[[MON-01-Logs|Logs]]"
  - "[[MON-02-Metriques-Alerting|Métriques et Alerting]]"
  - "[[JS-12-Erreurs-Debug-DevTools|Gestion des Erreurs et DevTools]]"
related_snippets:
  - "[[04_Snippets/mon-03-tracing-sentry-opentelemetry]]"
related_projects: []
source: "https://opentelemetry.io/docs/"
---

# Tracing et Monitoring d'Erreurs

> [!abstract] Introduction
> Le tracing distribué suit une requête à travers tous les services (front → API → BDD → service externe) ; le monitoring d'erreurs (Sentry) capture les exceptions front et back avec leur contexte. Avec logs et métriques, c'est l'observabilité.

> [!warning]- Prérequis
> [[MON-01-Logs|Logs]]

---

## Théorie

> [!question]- C'est quoi ?
> Les 3 piliers de l'observabilité : **logs** (événements), **métriques** (mesures), **traces** (parcours d'une requête).
> **OpenTelemetry** : standard ouvert pour instrumenter et exporter les trois (vers Jaeger, Tempo, Datadog…).
> **Sentry** : erreurs front (Angular `ErrorHandler`, Vue `app.config.errorHandler`) et back, avec stack trace (source maps), navigateur, utilisateur, fil d'actions.

> [!example]- Analogie
> Le suivi d'un colis : à chaque étape (tri, camion, dépôt), un scan horodaté ; si le colis est en retard, on voit exactement où il a traîné.

> [!question]- Pourquoi l'utiliser ?
> Répondre à « pourquoi cette page est-elle lente pour certains ? » et « combien d'utilisateurs voient cette erreur ? » sans reproduire en local.

> [!question]- Comment ça marche ?
> ```mermaid
> gantt
>   title Trace GET /api/favoris (320 ms)
>   dateFormat x
>   axisFormat %L ms
>   section API
>   Handler NestJS      :0, 320
>   section BDD
>   SELECT favoris      :20, 60
>   section Externe
>   API TMDB (lente)    :90, 300
> ```
> ```typescript
> // Angular : Sentry
> Sentry.init({ dsn: environment.sentryDsn, tracesSampleRate: 0.1 });
> providers: [{ provide: ErrorHandler, useValue: Sentry.createErrorHandler() }]
> ```

> [!question]- Quand l'utiliser ?
> Applications en production, surtout multi-services.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Coût et volume : échantillonner les traces ; ne pas envoyer de données personnelles.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Trace | Parcours complet d'une requête |
| Span | Étape d'une trace |
| Observabilité | Capacité à comprendre l'état interne depuis l'extérieur |
| Échantillonnage | Ne garder qu'une partie des traces |

---

## Points clés

- Logs + métriques + traces
- OpenTelemetry comme standard
- Source maps pour lire les erreurs front
- Échantillonner

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Uploader publiquement les source maps en production

---

## Exemple minimal

```text
Sentry : « TypeError: Cannot read properties of undefined (reading 'titre') — 1 243 utilisateurs, depuis la release 1.5.0, Safari 17 »
```

> [!note] Ce que j'en retiens
> On sait combien, qui, depuis quand et quelle version : la correction devient prioritaire et ciblée.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Relier traces, logs et métriques (corrélation par traceId) pour diagnostiquer en minutes

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Infrastructure]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/mon-03-tracing-sentry-opentelemetry]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Quels sont les 3 piliers de l'observabilité ?

---

## Tâches

- [ ] #task Brancher Sentry (plan gratuit) sur CinéTrack front et API
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
