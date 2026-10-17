---
type: notion
statut: a apprendre
resume: "En HTTP classique, c'est toujours le navigateur qui demande."
revu:
sources:
  - "https://docs.nestjs.com/websockets/gateways"
---
# WebSockets et temps réel NestJS

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : En HTTP classique, c'est toujours le navigateur qui **demande**.

## Le problème

**Pourquoi c'est utile ?**
Pour que le serveur envoie des messages au navigateur quand il veut (notifications, chat).

**Qu'est-ce qui se passait sans ça ?**
Le navigateur devait redemander toutes les secondes s'il y avait du nouveau.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Avec un **WebSocket**, la connexion reste **ouverte** et le serveur peut **envoyer** des messages quand il veut : notifications, chat, réponse d'une IA mot par mot. NestJS gère ça avec des **gateways**. Utile pour le Capstone (assistant IA en temps réel).

### HTTP ou WebSocket ?

| | HTTP | WebSocket |
|---|---|---|
| Qui parle en premier | toujours le client | les deux, à tout moment |
| Connexion | ouverte et fermée à chaque requête | reste ouverte |
| Pour | lire et écrire des données (99 % des cas) | notifications, chat, collaboration en direct |

Image : HTTP, c'est **envoyer une lettre** et attendre la réponse. WebSocket, c'est un **appel téléphonique** : la ligne reste ouverte et chacun parle quand il veut.

Alternative plus simple si seul le serveur envoie : **SSE** (*Server-Sent Events*). Voir [[11 WebSockets|WebSockets et SSE]].

### Côté front

```ts
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000', { auth: { token } });
socket.emit('follow-movie', 27205);
socket.on('new-review', (review) => {
  // Angular : this.reviews.update(list => [review, ...list]);
});
```

### Ce qu'il faut penser à gérer

| Sujet | Comment |
|---|---|
| **Authentification** | envoyer le jeton à la connexion (`auth: { token }`) et le vérifier dans la gateway |
| **Reconnexion** | Socket.IO se reconnecte tout seul ; prévois de recharger ce qui a été manqué |
| **Plusieurs serveurs** | un client connecté au serveur A ne reçoit pas un message émis par B : il faut un adaptateur Redis |
| **Fermeture** | se déconnecter quand le composant est détruit |

## 🧪 Exemple

### Une gateway NestJS (Socket.IO)

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

## ⚠️ Limites et pièges

- **WebSocket pour tout** : pour lire une liste, une requête HTTP est plus simple et se met en cache.
- **Oublier l'authentification** de la connexion : n'importe qui peut écouter.
- **Faire confiance aux messages reçus** : valide-les comme un corps de requête HTTP.

## 🔗 Liens

- **Prérequis :** [[01 Fondamentaux NestJS|Fondamentaux NestJS]]
- **Voir aussi :** [[11 WebSockets|WebSockets]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://docs.nestjs.com/websockets/gateways
