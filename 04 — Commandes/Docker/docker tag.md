---
type: command
tool: Docker
level: intermediaire
concepts:
  - "[[Registre Docker]]"
  - "[[Image Docker]]"
tags:
  - commande
  - docker
---
# docker tag

> [!info] Docker
> Donner un nouveau nom à une image existante, souvent pour indiquer dans quel registre l'envoyer.

## Pourquoi l'utiliser
Le nom d'une image décide où `docker push` l'envoie.

## Dans quel contexte
Après `docker build`, avant `docker push`.

## Syntaxe
```bash
docker tag <image-source> <registre>/<chemin>/<nom>:<tag>
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `<image-source>` | image existante, par nom ou identifiant |
| `<registre>/<chemin>/<nom>:<tag>` | le nouveau nom complet |

## Exemple concret
```bash
docker tag api-notes:1.0 nexus.mon-entreprise.com:8083/equipe/api-notes:1.0
```

## Résultat attendu
`docker images` montre deux noms pour le même identifiant d'image : rien n'est copié.

## Variantes utiles
- Construire directement avec le bon nom : `docker build -t <registre>/<chemin>/<nom>:<tag> .`

> [!warning] Erreurs fréquentes
> - Croire que `docker tag` envoie l'image : il ne fait que la renommer.

## Relier
- **Commandes complémentaires** : [[docker build]] · [[docker push]]
- **Concepts associés** : [[Registre Docker]] · [[Image Docker]]
