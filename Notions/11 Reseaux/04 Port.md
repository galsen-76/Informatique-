---
type: notion
statut: a apprendre
resume: "Un port est un numéro (0 à 65535) qui désigne un programme sur une machine : l'IP trouve la machine, le port trouve le bon programme."
revu:
sources:
---
```dataviewjs
await dv.view("Systeme/notion")
```

**En une phrase :** Un port est un **numéro (0 à 65535) qui désigne un programme** sur une machine : l'IP trouve la machine, le port trouve le bon programme.

## ❓ Le problème

**Pourquoi ça existe ?**
Parce qu'une machine fait tourner plusieurs serveurs en même temps (web, base de données, SSH) : il faut savoir à qui donner chaque message.

**Qu'est-ce qui se passait sans ça ?**
Avec seulement l'adresse IP, la machine recevrait les messages sans savoir s'ils sont pour la base de données ou pour le site web.

## 💡 Comment ça marche

*Explique avec tes mots, comme à un collègue.*

Un port est **purement logiciel** : ce n'est pas une prise physique. C'est un numéro que le noyau associe à un programme quand celui-ci dit « j'écoute sur le port 3000 ».

Une adresse complète = **IP + port** : `192.168.1.24:5432`.

| Port | Service habituel |
|---|---|
| 22 | SSH |
| 80 / 443 | HTTP / HTTPS |
| 5432 | PostgreSQL |
| 3000, 4200, 5173 | serveurs de dev (Node, Angular, Vite) |

Comment connaître le port d'une appli ? Il est dans sa config ou affiché au démarrage (`ng serve` → 4200 par défaut, réglable dans `angular.json` ou avec `--port`).

## ⚠️ Limites et pièges

- **Un seul programme par port** : `EADDRINUSE` / *address already in use* → un autre programme l'utilise déjà.
- **En dessous de 1024**, il faut des droits administrateur pour écouter.
- **Un port ouvert sur la machine ne veut pas dire accessible** : le [[12 Pare-feu|Pare-feu]] peut bloquer.
- **Ne pas confondre** le port du conteneur et le port publié (`-p 5433:5432`).

## 🔗 Liens

- **Prérequis :** [[03 Adresse IP|Adresse IP]]
- **Voir aussi :** [[01 Client et serveur|Client et serveur]], [[09 Ports et réseau Docker|Ports et réseau Docker]]
- **Utilisé dans :** `baseURL`, `webServer.url` de Playwright, `-p` de Docker

## 📚 Notes

- 
