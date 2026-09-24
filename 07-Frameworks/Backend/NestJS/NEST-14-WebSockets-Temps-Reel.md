---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Avancé
month: M09
tags:
  - backend/nestjs/websockets
aliases:
  - "WebSockets et Temps Réel NestJS"
parent: "[[NestJS]]"
children: []
related_theory:
  - "[[NET-10-WebSockets-SSE|WebSockets et Server-Sent Events]]"
related_snippets:
  - "[[04_Snippets/nest-14-websockets-temps-reel]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.nestjs.com/websockets/gateways"
---

# WebSockets et Temps Réel NestJS

> [!abstract] Introduction
> Les gateways Nest (Socket.IO ou ws) permettent une communication bidirectionnelle en temps réel entre serveur et navigateurs : notifications, chat, suivi collaboratif.

> [!warning]- Prérequis
> [[NET-10-WebSockets-SSE|WebSockets et Server-Sent Events]]

---

## Théorie

> [!question]- C'est quoi ?
> ```typescript
> @WebSocketGateway({ cors: { origin: ['http://localhost:4200'] } })
> export class NotificationsGateway {
>   @WebSocketServer() server: Server;
>   @SubscribeMessage('rejoindre')
>   rejoindre(@ConnectedSocket() client: Socket, @MessageBody() filmId: number) {
>     client.join(`film:${filmId}`);
>   }
>   notifierNouvelleCritique(filmId: number, critique: Critique) {
>     this.server.to(`film:${filmId}`).emit('critique', critique);
>   }
> }
> ```

> [!example]- Analogie
> HTTP est un échange de lettres (on écrit, on attend la réponse) ; WebSocket est un appel téléphonique : la ligne reste ouverte et chacun peut parler quand il veut.

> [!question]- Pourquoi l'utiliser ?
> Mises à jour instantanées sans polling : nouvelles critiques, statut d'une commande, présence d'utilisateurs.

> [!question]- Comment ça marche ?
> - Connexion : handshake HTTP puis upgrade en WebSocket
> - Rooms pour cibler un groupe
> - Authentifier à la connexion (token dans `auth` du handshake), guards WS
> - Côté Angular : service qui expose les événements en Observable (`fromEvent`) ; côté Vue : composable
> - Plusieurs instances de l'API → adaptateur Redis pour diffuser entre instances

> [!question]- Quand l'utiliser ?
> Interactions bidirectionnelles fréquentes. Pour du serveur → client uniquement (flux de notifications), les SSE sont plus simples.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Connexions persistantes = état côté serveur, montée en charge plus complexe (sticky sessions, adaptateur Redis), proxies à configurer.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Gateway | Classe Nest gérant les WebSockets |
| Room | Groupe de connexions |
| Handshake | Négociation initiale de connexion |
| Socket.IO | Librairie au-dessus de WebSocket (reconnexion, rooms) |

---

## Points clés

- Authentifier au handshake
- Rooms pour cibler
- Adaptateur Redis en multi-instances
- SSE si unidirectionnel

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Oublier la reconnexion côté client
> - Diffuser à tous des données privées

---

## Exemple minimal

```typescript
// Angular
@Injectable({ providedIn: 'root' })
export class CritiquesTempsReel {
  private socket = io(environment.wsUrl, { auth: { token: inject(AuthService).token() } });
  critiques$(filmId: number) {
    this.socket.emit('rejoindre', filmId);
    return fromEvent<Critique>(this.socket, 'critique');
  }
}
```

> [!note] Ce que j'en retiens
> Côté front, un flux WebSocket devient un simple Observable.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Dimensionner le temps réel (connexions simultanées, backpressure, heartbeats)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[NestJS]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[ANG-24-RxJS-Avance|RxJS Avancé]]

**Pratique :**
- Extrait de code → [[04_Snippets/nest-14-websockets-temps-reel]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Quand préférer SSE à WebSocket ?

---

## Tâches

- [ ] #task Afficher en direct les nouvelles critiques d'un film
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
