---
type: command
tool: Docker
level: debutant
concepts:
  - "[[Conteneur]]"
tags:
  - commande
  - docker
---
# docker ps

> [!info] Docker
> Liste les conteneurs en cours d'exécution.

## Pourquoi l'utiliser
Vérifier ce qui tourne, retrouver un nom ou un port.

## Dans quel contexte
Après un `docker run`, ou quand un port est déjà occupé.

## Syntaxe
```bash
docker ps [-a]
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `-a` | Inclut aussi les conteneurs arrêtés |

## Exemple concret
```bash
docker ps
```

## Résultat attendu
Un tableau : ID, image, commande, statut, ports, nom.



## Relier
- **Commandes complémentaires** : [[docker run]] · [[docker build]]
- **Concepts associés** : [[Conteneur]]
