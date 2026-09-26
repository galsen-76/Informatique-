---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Avancé
month: M09
tags:
  - backend/nestjs/websockets
aliases:
  - "WebSockets et Temps Réel NestJS"
parent: "[[NestJS]]"
related_theory:
  - "[[NET-10-WebSockets-SSE|WebSockets et Server-Sent Events]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.nestjs.com/websockets/gateways"
---

# WebSockets et Temps Réel NestJS

> [!abstract] En bref
> En HTTP classique, c'est toujours le navigateur qui **demande**. Avec un **WebSocket**, la connexion reste **ouverte** et le serveur peut **envoyer** des messages quand il veut : notifications, chat, réponse d'une IA mot par mot. NestJS gère ça avec des **gateways**. Utile pour le Capstone (assistant IA en temps réel).

## HTTP ou WebSocket ?

| | HTTP | WebSocket |
|---|---|---|
| Qui parle en premier | toujours le client | les deux, à tout moment |
| Connexion | ouverte et fermée à chaque requête | reste ouverte |
| Pour | lire et écrire des données (99 % des cas) | notifications, chat, collaboration en direct |

Image : HTTP, c'est **envoyer une lettre** et attendre la réponse. WebSocket, c'est un **appel téléphonique** : la ligne reste ouverte et chacun parle quand il veut.

Alternative plus simple si seul le serveur envoie : **SSE** (*Server-Sent Events*). Voir [[NET-10-WebSockets-SSE|WebSockets et SSE]].

## Une gateway NestJS (Socket.IO)

```bash
npm i @nestjs/websockets @nestjs/platform-socket.io socket.io
```

```ts
@WebSocketGateway({ cors: { origin: ['http://localhost:4200'] } })
export class NotificationsGateway {
  @WebSocketServer() server!: Server;

  // un client rejoint la « salle » d'un film pour suivre ses nouvelles critiques
  @SubscribeMessage('follow-movie')
  follow(@MessageBody() movieId: number, @ConnectedSocket() client: Socket) {
    client.join(`movie:${movieId}`);
  }

  // appelé par ReviewsService après la création d'une critique
  notifyNewReview(movieId: number, review: ReviewDto) {
    this.server.to(`movie:${movieId}`).emit('new-review', review);
  }
}
```

## Côté front

```ts
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000', { auth: { token } });
socket.emit('follow-movie', 27205);
socket.on('new-review', (review) => {
  // Angular : this.reviews.update(list => [review, ...list]);
});
```

## Ce qu'il faut penser à gérer

| Sujet | Comment |
|---|---|
| **Authentification** | envoyer le jeton à la connexion (`auth: { token }`) et le vérifier dans la gateway |
| **Reconnexion** | Socket.IO se reconnecte tout seul ; prévois de recharger ce qui a été manqué |
| **Plusieurs serveurs** | un client connecté au serveur A ne reçoit pas un message émis par B : il faut un adaptateur Redis |
| **Fermeture** | se déconnecter quand le composant est détruit |

## Pièges

- **WebSocket pour tout** : pour lire une liste, une requête HTTP est plus simple et se met en cache.
- **Oublier l'authentification** de la connexion : n'importe qui peut écouter.
- **Faire confiance aux messages reçus** : valide-les comme un corps de requête HTTP.
