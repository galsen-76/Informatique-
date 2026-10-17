---
type: notion
statut: a apprendre
resume: "Les logs sont le journal de bord de ton application : ce qui s'est passé, quand, et les erreurs."
revu:
sources:
  - "https://12factor.net/fr/logs"
---
# Logs

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Les **logs** sont le **journal de bord** de ton application : ce qui s'est passé, quand, et les erreurs.

## Le problème

**Pourquoi c'est utile ?**
Pour savoir ce qui s'est passé dans l'application, surtout en production.

**Qu'est-ce qui se passait sans ça ?**
Un bug en production était impossible à comprendre : aucune trace de ce qui s'était passé.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

En production, c'est souvent la **seule** façon de comprendre un bug. Bien faits, ils sont **structurés** (en JSON), à **niveaux** (info, erreur…) et ne contiennent **jamais** de données sensibles.

### Les niveaux

| Niveau | Pour | Exemple |
|---|---|---|
| `error` | quelque chose a échoué et doit être corrigé | « impossible de joindre TMDB » |
| `warn` | anormal, mais géré | « tentative de connexion avec un mauvais mot de passe » |
| `info` | événements importants du fonctionnement normal | « serveur démarré sur le port 3000 », « utilisateur inscrit » |
| `debug` | détails pour déboguer (désactivé en production) | « réponse TMDB reçue en 230 ms » |

En production, on garde `info` et plus ; en développement, `debug`.

### Dans NestJS

Le `Logger` intégré suffit pour commencer :

```ts
private readonly logger = new Logger(ReviewsService.name);

this.logger.log(`Critique créée ${review.id}`);
this.logger.warn(`Critique en double refusée pour user ${userId}`);
this.logger.error('Échec de création', err.stack);
```

Pour des logs JSON en production : **pino** (`nestjs-pino`), rapide et structuré, qui ajoute automatiquement un identifiant à chaque requête.

### L'identifiant de requête

Chaque requête reçoit un **identifiant unique**, présent dans tous ses logs. Quand un utilisateur signale un problème, on retrouve **toute l'histoire** de sa requête.

### Où vont les logs

| Situation | Où les lire |
|---|---|
| développement | la console |
| Docker | `docker logs -f api` |
| PaaS | l'onglet Logs de l'hébergeur |
| entreprise | un outil central : ELK (Elasticsearch + Kibana), Loki + Grafana, Datadog |

### Ce qu'il ne faut JAMAIS logger

- mots de passe, même faux ;
- jetons (JWT, clés d'API) ;
- données personnelles sensibles (numéros de carte, santé) ;
- le corps complet des requêtes « pour voir ».

Les logs sont souvent **moins protégés** que la base, et gardés longtemps.

## 🧪 Exemple

### Des logs structurés

```text
❌ Erreur pour user 42 sur film 27205
```

```json
✅ {"level":"error","time":"2026-09-26T10:12:03Z","msg":"review creation failed","userId":42,"movieId":27205,"requestId":"a1b2","err":"Unique constraint failed"}
```

Le JSON permet de **filtrer et chercher** : « toutes les erreurs de l'utilisateur 42 hier », « toutes les requêtes `a1b2` ».

## ⚠️ Limites et pièges

- **Des `console.log` partout** en production : pas de niveau, pas de structure, impossible à filtrer.
- **Trop de logs** : le bruit cache les vraies erreurs, et ça coûte cher à stocker.
- **Une erreur attrapée sans être loggée** : le bug devient invisible.

## 🔗 Liens

- **Prérequis :** 
- **Voir aussi :** [[06 Exceptions et gestion des erreurs NestJS|Exceptions et gestion des erreurs NestJS]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://12factor.net/fr/logs
