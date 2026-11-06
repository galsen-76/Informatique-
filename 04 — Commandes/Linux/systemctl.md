---
type: command
tool: Linux
level: debutant
concepts:
  - "[[Service (systemd)]]"
tags:
  - commande
  - linux
---
# systemctl

> [!info] Linux
> Pilote les services systemd : démarrer, arrêter, activer, voir l'état.

## Pourquoi l'utiliser
Gérer Docker, une base, un serveur web sur un serveur Linux.

## Dans quel contexte
Installation, dépannage, après un changement de configuration.

## Syntaxe
```bash
systemctl <action> service
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `status` | état et dernières lignes de log |
| `start` / `stop` / `restart` | maintenant |
| `enable` / `disable` | au démarrage |
| `enable --now` | les deux |
| `daemon-reload` | relire les fichiers `.service` modifiés |
| `list-units --type=service` | services connus |

## Exemple concret
```bash
systemctl status docker
sudo systemctl restart nginx
```

## Résultat attendu
`Active: active (running)` ou `failed` avec le code de sortie.

## Variantes utiles
- `systemctl is-active docker` (pratique en script)

> [!warning] Erreurs fréquentes
> - `start` sans `enable`
> - Oublier `daemon-reload` après avoir modifié un `.service`

## Relier
- **Commandes complémentaires** : [[journalctl]]
- **Concepts associés** : [[Service (systemd)]]
