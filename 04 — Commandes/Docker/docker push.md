---
type: command
tool: Docker
level: intermediaire
concepts:
  - "[[Registre Docker]]"
  - "[[Nexus]]"
tags:
  - commande
  - docker
---
# docker push

> [!info] Docker
> Envoyer une image dans un registre.

## Pourquoi l'utiliser
Rendre l'image disponible pour la CI, les serveurs et les collègues.

## Dans quel contexte
Après `docker build` (ou `docker tag`) et `docker login`.

## Syntaxe
```bash
docker push <registre>/<chemin>/<nom>:<tag>
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `<registre>/<chemin>/<nom>:<tag>` | le nom complet de l'image, qui dit où l'envoyer |

## Exemple concret
```bash
docker push nexus.mon-entreprise.com:8083/equipe/api-notes:1.0
```

## Résultat attendu
Les couches sont envoyées une à une ; celles déjà présentes dans le registre sont sautées.

## Variantes utiles
- `docker push --all-tags <nom>` : envoie tous les tags d'une image

> [!warning] Erreurs fréquentes
> - `denied` ou `unauthorized` : pas connecté (`docker login`) ou pas les droits.
> - Pousser vers un dépôt **proxy** Nexus : refusé, il faut un dépôt **hosted**.

## Relier
- **Commandes complémentaires** : [[docker login]] · [[docker tag]] · [[docker build]]
- **Concepts associés** : [[Registre Docker]] · [[Nexus]]
