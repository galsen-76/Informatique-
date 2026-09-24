---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M09
tags:
  - reseaux/temps-reel
aliases:
  - "WebSockets et Server-Sent Events"
parent: "[[Réseaux]]"
children: []
related_theory:
  - "[[NEST-14-WebSockets-Temps-Reel|WebSockets et Temps Réel NestJS]]"
  - "[[NET-05-HTTP-Approfondi|HTTP Approfondi]]"
related_snippets:
  - "[[04_Snippets/net-10-websockets-sse]]"
related_projects: []
source: "https://developer.mozilla.org/fr/docs/Web/API/WebSockets_API"
---

# WebSockets et Server-Sent Events

> [!abstract] Introduction
> Pour pousser des données du serveur vers le navigateur en temps réel : polling (simple mais coûteux), Server-Sent Events (flux unidirectionnel sur HTTP) ou WebSocket (canal bidirectionnel persistant).

> [!warning]- Prérequis
> [[NET-05-HTTP-Approfondi|HTTP Approfondi]]

---

## Théorie

> [!question]- C'est quoi ?
> | Technique | Sens | Complexité | Usages |
> |---|---|---|---|
> | Polling | Client demande régulièrement | Très simple | Statut qui change rarement |
> | Long polling | Le serveur retient la réponse | Moyenne | Legacy |
> | SSE | Serveur → client | Simple (HTTP, reconnexion auto) | Notifications, progression, flux IA (streaming LLM) |
> | WebSocket | Bidirectionnel | Plus complexe | Chat, collaboration, jeux |

> [!example]- Analogie
> Polling : demander toutes les 5 minutes « c'est prêt ? ». SSE : s'abonner à la radio. WebSocket : un appel téléphonique ouvert.

> [!question]- Pourquoi l'utiliser ?
> Expérience temps réel sans rafraîchir la page ; les réponses en streaming des LLM utilisent souvent SSE.

> [!question]- Comment ça marche ?
> ```typescript
> // SSE côté front
> const source = new EventSource('/api/notifications');
> source.onmessage = (e) => afficher(JSON.parse(e.data));
> // NestJS
> @Sse('notifications') flux(): Observable<MessageEvent> {
>   return this.notifs.flux$.pipe(map(n => ({ data: n }) as MessageEvent));
> }
> ```

> [!question]- Quand l'utiliser ?
> SSE en premier choix pour du serveur → client ; WebSocket pour du vrai bidirectionnel fréquent.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Connexions longues : proxies/load balancers à configurer (timeouts, upgrade), consommation de ressources par connexion.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Polling | Interrogation périodique |
| SSE | Flux d'événements serveur sur HTTP |
| WebSocket | Canal bidirectionnel persistant |
| Upgrade | Passage de HTTP à WebSocket |

---

## Points clés

- SSE = simple, unidirectionnel, reconnexion automatique
- WebSocket = bidirectionnel
- Configurer le proxy pour les connexions longues

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Polling toutes les secondes par des milliers de clients
> - Oublier `proxy_set_header Upgrade` dans Nginx pour les WebSockets

---

## Exemple minimal

```nginx
location /socket.io/ {
  proxy_pass http://api;
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection "upgrade";
}
```

> [!note] Ce que j'en retiens
> Sans ces en-têtes, la connexion WebSocket échoue derrière Nginx.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Choisir la technique selon charge, sens des échanges et infrastructure

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Réseaux]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/net-10-websockets-sse]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Quand préférer SSE à WebSocket ?

---

## Tâches

- [ ] #task Afficher en SSE la progression d'un import de films
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
