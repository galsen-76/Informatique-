---
type: notion
statut: a apprendre
resume: "Le client demande, le serveur répond : c'est le modèle de presque toutes les communications sur un réseau."
revu:
sources:
---
```dataviewjs
await dv.view("Systeme/notion")
```

**En une phrase :** Le **client** demande, le **serveur** répond : c'est le modèle de presque toutes les communications sur un réseau.

## ❓ Le problème

**Pourquoi ça existe ?**
Pour organiser les échanges : un programme attend les demandes (le serveur), d'autres les envoient (les clients).

**Qu'est-ce qui se passait sans ça ?**
Sans rôle clair, chaque programme devait savoir parler directement à tous les autres : impossible à faire grandir.

## 💡 Comment ça marche

*Explique avec tes mots, comme à un collègue.*

- Un **serveur**, c'est un programme qui **écoute sur un [[Port]]** et attend qu'on lui parle. Ce n'est pas forcément une grosse machine : ton `ng serve` sur le port 4200 est un serveur.
- Un **client**, c'est un programme qui **ouvre la connexion** et envoie une demande : ton navigateur, `curl`, Playwright, npm.

Un même programme peut être les deux : ton API est **serveur** pour le navigateur et **client** de la base de données.

C'est toujours le client qui commence. C'est important pour le réseau : un [[Pare-feu]] laisse souvent **sortir** les connexions, mais bloque celles qui **entrent**. C'est pour ça que les runners et les agents Squash vont eux-mêmes chercher le travail.

## ⚠️ Limites et pièges

- **« Le serveur » peut désigner la machine ou le programme** : préciser lequel quand on parle d'un problème.
- **Si personne n'écoute sur le port**, le client reçoit *connection refused* immédiatement.

## 🔗 Liens

- **Prérequis :** 
- **Voir aussi :** [[Adresse IP]], [[Port]], [[HTTP]]
- **Utilisé dans :** navigateur ↔ appli, Playwright ↔ appli, npm ↔ registre, agent ↔ Orchestrator

## 📚 Notes

- 
