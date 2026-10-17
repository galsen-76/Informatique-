---
type: notion
statut: a apprendre
resume: "Un proxy est un intermédiaire : au lieu d'aller directement sur Internet, ta machine demande au proxy d'y aller à sa place."
revu:
sources:
---
```dataviewjs
await dv.view("Systeme/notion")
```

**En une phrase :** Un proxy est un **intermédiaire** : au lieu d'aller directement sur Internet, ta machine demande au proxy d'y aller à sa place.

## ❓ Le problème

**Pourquoi ça existe ?**
En entreprise : pour contrôler et filtrer ce qui sort vers Internet, et le journaliser.

**Qu'est-ce qui se passait sans ça ?**
Chaque poste sortait directement sur Internet : impossible de bloquer les sites dangereux ou de savoir ce qui sortait.

## 💡 Comment ça marche

*Explique avec tes mots, comme à un collègue.*

Les outils en ligne de commande lisent souvent ces [[Variables d'environnement]] :

```bash
export HTTP_PROXY=http://proxy.mon-entreprise.com:8080
export HTTPS_PROXY=http://proxy.mon-entreprise.com:8080
export NO_PROXY=localhost,127.0.0.1,.mon-entreprise.com   # ce qui ne passe PAS par le proxy
```

npm a aussi ses propres réglages (`npm config set proxy ...`), Docker aussi.

Deux sortes à ne pas confondre :
- **proxy « sortant »** (forward) : il sort sur Internet pour toi. C'est celui de l'entreprise.
- **reverse proxy** : il est devant les serveurs et reçoit les visiteurs pour les répartir (Nginx, Fabio). C'est le chemin inverse.

## ⚠️ Limites et pièges

- **Oublier `NO_PROXY`** : les appels vers les serveurs internes (ou `localhost`) partent vers le proxy et échouent.
- **Le proxy peut inspecter le HTTPS** : il faut alors le certificat de l'entreprise (voir [[Certificat et HTTPS]]).
- **Mot de passe dans l'URL du proxy** (`http://user:mdp@proxy`) : à éviter, il apparaît dans les logs et l'historique.
- **Un conteneur n'hérite pas forcément du proxy de la machine** : il faut lui passer les variables.

## 🔗 Liens

- **Prérequis :** [[HTTP]]
- **Voir aussi :** [[Pare-feu]], [[Notions/13 Outils/npm/Registre npm]]
- **Utilisé dans :** npm, Docker, Playwright sur le réseau de l'entreprise

## 📚 Notes

- 
