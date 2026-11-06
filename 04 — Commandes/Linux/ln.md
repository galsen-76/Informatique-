---
type: command
tool: Linux
level: debutant
concepts:
  - "[[Lien symbolique]]"
tags:
  - commande
  - linux
---
# ln

> [!info] Linux
> Crée des liens, surtout des liens symboliques (raccourcis).

## Pourquoi l'utiliser
Pointer vers un fichier ou un dossier depuis un autre endroit.

## Dans quel contexte
Bascule de version, raccourcis de configuration.

## Syntaxe
```bash
ln -s cible nom_du_lien
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `-s` | lien symbolique |
| `-f` | remplace un lien existant |
| `-n` | traite un lien vers dossier comme un fichier (avec `-f`) |

## Exemple concret
```bash
ln -s /opt/app-v2 /opt/current
ln -sfn /opt/app-v1 /opt/current
```

## Résultat attendu
`ls -l` affiche `current -> /opt/app-v2`.

## Variantes utiles
- `readlink -f lien` : la cible réelle

> [!warning] Erreurs fréquentes
> - Inverser cible et nom du lien

## Relier
- **Commandes complémentaires** : [[ls]]
- **Concepts associés** : [[Lien symbolique]]
