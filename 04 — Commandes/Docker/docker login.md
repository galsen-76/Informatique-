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
# docker login

> [!info] Docker
> Se connecter à un registre pour pouvoir y pousser ou en récupérer des images privées.

## Pourquoi l'utiliser
Un registre privé (Nexus, registre GitLab) refuse les `push` et `pull` anonymes.

## Dans quel contexte
Avant un `docker push`, ou un `docker pull` d'image privée ; dans la CI, dans `before_script:`.

## Syntaxe
```bash
docker login <registre>
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `-u` | nom d'utilisateur |
| `--password-stdin` | lit le mot de passe sur l'entrée standard |
| `<registre>` | adresse du registre (sans elle : Docker Hub) |

## Exemple concret
```bash
echo "$NEXUS_PASSWORD" | docker login -u "$NEXUS_USER" --password-stdin nexus.mon-entreprise.com:8082
```

## Résultat attendu
`Login Succeeded`.

## Variantes utiles
- `docker logout <registre>` : se déconnecter

> [!warning] Erreurs fréquentes
> - Oublier l'adresse du registre : la connexion se fait à Docker Hub.
> - Passer le mot de passe avec `-p` : il apparaît dans l'historique et les logs.

## Relier
- **Commandes complémentaires** : [[docker push]] · [[docker tag]]
- **Concepts associés** : [[Registre Docker]] · [[Nexus]]
