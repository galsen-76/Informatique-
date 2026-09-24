---
created: 2026-09-16
modified: 2026-09-16
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M07
aliases:
  - "Client-Serveur & Modes de Communication"
tags:
  - cs/architecture/client-serveur
parent: "[[Architecture Logicielle]]"
children: []
related_theory:
  - "[[ARCH-04-API-REST-Design|API REST Design]]"
  - "[[TG-04-Synchrone-vs-Asynchrone|Synchrone vs Asynchrone]]"
related_snippets: []
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://en.wikipedia.org/wiki/Client%E2%80%93server_model"
---

# Client-Serveur & Modes de Communication

> [!abstract] Introduction
> Le modèle client-serveur sépare celui qui DEMANDE (le client, souvent un navigateur) de celui qui RÉPOND (le serveur), et il existe plusieurs façons pour eux de communiquer selon que l'échange est ponctuel, répété, ou en temps réel.

---

## Théorie

> [!question]- C'est quoi ?
> > [!note] C'est quoi le "client" et le "serveur" ?
> > Le **client** est celui qui INITIE une demande (ton navigateur affichant Angular, une application mobile). Le **serveur** est celui qui REÇOIT cette demande et y répond (une API backend). Un même programme peut être serveur pour certains, et client pour d'autres (un backend qui appelle l'API GitLab est CLIENT de GitLab).

> [!question]- Pourquoi l'utiliser ?
> Cette séparation permet à un seul serveur de répondre à des MILLIERS de clients différents, chacun n'ayant besoin que d'envoyer des requêtes sans connaître les détails internes du serveur — une architecture qui a permis à internet entier de fonctionner à grande échelle.

> [!question]- Comment ça marche ?
> **Requête/Réponse classique (HTTP, la base de REST) :**
> ```
> Client → Requête HTTP → Serveur
> Client ← Réponse HTTP  ← Serveur
> ```
> > [!note] Caractéristique clé : "stateless" (sans état)
> > HTTP classique est "sans état" — chaque requête est INDÉPENDANTE, le serveur ne se souvient pas des requêtes précédentes du même client, sauf si on ajoute explicitement un mécanisme (cookies, tokens) pour simuler une continuité (une "session").
>
> **Polling — le client redemande régulièrement :**
> ```javascript
> setInterval(() => {
>   fetch('/api/nouveaux-messages').then(...)
> }, 5000); // redemande toutes les 5 secondes
> ```
> > [!note] Limite du polling
> > Simple à mettre en place, mais gaspille des ressources : la plupart du temps, la réponse est "rien de nouveau" — on redemande quand même, inutilement, à intervalle régulier.
>
> **WebSocket — connexion permanente bidirectionnelle :**
> > [!note] C'est quoi un WebSocket ?
> > Contrairement à HTTP classique (une requête, une réponse, puis c'est fini), un WebSocket ouvre une connexion qui RESTE OUVERTE, permettant au serveur d'envoyer des données au client À TOUT MOMENT, sans que le client ait besoin de redemander. Utilisé pour du chat en temps réel, des notifications live, des jeux multijoueurs.
>
> **Server-Sent Events (SSE) — le serveur pousse, sens unique :**
> > [!note] Différence avec WebSocket
> > Un SSE permet au serveur d'envoyer des mises à jour au client en continu, mais SEULEMENT dans CE sens (serveur → client) — plus simple à mettre en place qu'un WebSocket quand on n'a pas besoin que le client envoie aussi des données en continu (ex : suivre l'avancement d'une tâche longue).

> [!question]- Quand l'utiliser ?
> - **Requête/réponse classique** : la grande majorité des besoins (afficher des données, soumettre un formulaire)
> - **Polling** : solution simple mais peu efficace, acceptable pour des mises à jour peu fréquentes
> - **WebSocket** : chat, notifications temps réel, collaboration en direct (plusieurs personnes éditant en même temps)
> - **SSE** : suivi de progression, flux d'événements à sens unique depuis le serveur

---

## Points clés

- Le client initie, le serveur répond — HTTP classique est "sans état" (stateless) par défaut
- Le polling redemande régulièrement, simple mais peu efficace
- Le WebSocket ouvre une connexion permanente et bidirectionnelle pour du temps réel
- Le SSE permet au serveur de pousser des données en continu, mais dans un seul sens
- Le choix dépend de la FRÉQUENCE et de la DIRECTION des échanges nécessaires

---

## Paramètres / Configuration

| Mode | Direction | Connexion | Cas d'usage typique |
|-----------|-------------|---------|---------|
| Requête/Réponse (REST) | Client → Serveur → Client | Ponctuelle | La majorité des besoins CRUD |
| Polling | Client → Serveur (répété) | Répétée à intervalle | Mises à jour peu fréquentes |
| WebSocket | Bidirectionnel | Permanente | Chat, temps réel, collaboration |
| Server-Sent Events | Serveur → Client | Permanente, sens unique | Suivi de progression, flux d'événements |

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Faire confiance aux données envoyées par le client
> - Choisir WebSocket là où du polling ou SSE suffit

---

## Exemple minimal

```typescript
// WebSocket côté client Angular (exemple simplifié)
const socket = new WebSocket('wss://mon-api.com/notifications');

socket.onmessage = (event) => {
  console.log('Nouvelle notification:', event.data);
};
```

> [!note] Ce que j'en retiens
> Contrairement à un appel `HttpClient.get()` classique qui se termine dès la réponse reçue, cette connexion WebSocket reste OUVERTE — le serveur peut envoyer un message à `onmessage` à n'importe quel moment, sans que le client ait eu besoin de redemander quoi que ce soit.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Comparer REST, GraphQL, gRPC, WebSocket/SSE selon les besoins (voir [[NET-10-WebSockets-SSE|WebSockets et Server-Sent Events]])

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Architecture Logicielle]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[ARCH-04-API-REST-Design|API REST Design]], [[TG-04-Synchrone-vs-Asynchrone|Synchrone vs Asynchrone]]

**Pratique :**
- Extrait de code → (aucun pour l'instant)
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi dit-on que HTTP est sans état ?

---

## Tâches

- [ ] #task Identifier un cas concret où un WebSocket apporterait une vraie valeur par rapport à une API REST classique
- [ ] #task Tester une connexion WebSocket basique en TypeScript
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Comment gérer proprement la reconnexion automatique d'un WebSocket si la connexion est perdue temporairement (réseau instable) ?
