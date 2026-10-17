---
type: notion
statut: a apprendre
resume: "Le back-end est la partie serveur : il stocke les données, applique les règles métier et protège l'accès."
revu:
sources:
  - "https://docs.nestjs.com"
---
# Choisir son framework backend

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Le **back-end** est la partie serveur : il stocke les données, applique les règles métier et protège l'accès.

## Le problème

**Pourquoi c'est utile ?**
Pour choisir la technologie serveur qui stocke les données, applique les règles et protège l'accès.

**Qu'est-ce qui se passait sans ça ?**
On choisissait au hasard ou par mode, et on se retrouvait avec un langage ou un outil inadapté à l'équipe.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Pour un développeur Angular / Vue, le choix le plus efficace est **NestJS**, en TypeScript : même langage que le front, et une organisation copiée sur Angular. Tu mets toute ton énergie sur les vrais sujets du back (HTTP, SQL, sécurité), pas sur un nouveau langage.

### Le rôle du back-end

```mermaid
flowchart LR
  A["Angular / Vue<br/>(navigateur)"] -->|"HTTP + JSON"| N["API NestJS<br/>règles métier, sécurité"]
  N --> P["Prisma"] --> DB[("PostgreSQL<br/>données")]
  N --> R[("Redis<br/>cache")]
```

Le front **affiche** et **demande**. Le back **décide** : il vérifie que l'utilisateur a le droit, que les données sont valides, puis lit ou écrit en base.

### Comparatif

| | **NestJS** (TypeScript) | Spring Boot (Java) | FastAPI (Python) | ASP.NET Core (C#) | Express (Node) |
|---|---|---|---|---|---|
| Langage | **déjà connu** | nouveau | connu en partie | nouveau | déjà connu |
| Organisation | modules, services, injection (**comme Angular**) | très structurée | légère | très structurée | libre, peu cadrée |
| Pour toi | ⭐ démarrage rapide | effort important | pour l'IA / la data | effort important | simple mais sans cadre |
| Marché en France | en forte hausse | **leader** en entreprise | data / IA | fort (Microsoft) | très répandu |
| Types partagés avec le front | **oui** | non | non | non | oui |

### Mon choix : NestJS

1. **Même langage** que tes projets front.
2. **Même architecture qu'Angular** : modules, services, injection de dépendances, décorateurs, guards, intercepteurs, pipes. Tout ce que tu as appris se transfère.
3. **Types partagés** front / back dans un monorepo (voir [[Structure de projet]]).
4. **Structure d'entreprise** : couches, DTO, tests. Les bonnes pratiques sont imposées.

**Plan B :** si le back de ton entreprise est en Java, **Spring Boot** sera facile en année 2 : les concepts sont identiques (controller, service, repository, injection, DTO).

## 🧪 Exemple

### L'ordre d'apprentissage (projet CinéTrack-API)

1. [[npm|Node et npm]] : exécuter du JavaScript côté serveur.
2. [[Express et middleware|Express]] : comprendre ce que NestJS fait pour toi.
3. [[Fondamentaux NestJS|NestJS]] : controllers, services, DTO.
4. [[Prisma schéma et migrations|Prisma]] + [[Fondamentaux SQL et SELECT|SQL]] : la base de données.
5. [[Authentification JWT NestJS|Authentification]] et [[OWASP Top 10|sécurité]].
6. [[Tests NestJS|Tests]], puis Docker et CI.

```bash
npm i -g @nestjs/cli
nest new cinetrack-api
cd cinetrack-api && npm run start:dev    # http://localhost:3000
```

## ⚠️ Limites et pièges

- **Apprendre trois back-ends en surface** au lieu d'un en profondeur.
- **Confondre « connaître NestJS » et « savoir faire du back »** : HTTP, SQL, transactions et sécurité comptent plus que le framework.
- **Demande à ton équipe** quel back consomment vos fronts : ça peut orienter ton année 2.

## 🔗 Liens

- **Prérequis :** 
- **Voir aussi :** [[MVC et architecture en couches]], [[Monolithe vs microservices]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://docs.nestjs.com
