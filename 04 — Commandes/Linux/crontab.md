---
type: command
tool: Linux
level: debutant
concepts:
  - "[[Tâche planifiée (cron)]]"
tags:
  - commande
  - linux
---
# crontab

> [!info] Linux
> Affiche et modifie les tâches planifiées de l'utilisateur.

## Pourquoi l'utiliser
Lancer une commande automatiquement à heures fixes.

## Dans quel contexte
Sauvegardes, nettoyages, scripts nocturnes.

## Syntaxe
```bash
crontab -e | -l | -r
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `-e` | modifier (ouvre un éditeur) |
| `-l` | lister |
| `-r` | **tout** supprimer |

## Exemple concret
```bash
crontab -l
# dans crontab -e :
0 2 * * * /usr/bin/python3 /opt/zipper/zipper.py /data >> /var/log/zipper.log 2>&1
```

## Résultat attendu
Les tâches s'exécutent aux heures prévues ; la sortie va dans le fichier indiqué.

## Variantes utiles
- `sudo crontab -e` : tâches de root
- crontab.guru pour vérifier une expression

> [!warning] Erreurs fréquentes
> - `crontab -r` au lieu de `-e` : tout est effacé
> - Chemins relatifs : cron ne part pas de ton dossier

## Relier
- **Commandes complémentaires** : [[systemctl]]
- **Concepts associés** : [[Tâche planifiée (cron)]]
