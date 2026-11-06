---
type: command
tool: Linux
level: debutant
concepts:
  - "[[Arborescence Linux]]"
tags:
  - commande
  - linux
---
# df

> [!info] Linux
> Affiche la place utilisée et libre sur chaque disque.

## Pourquoi l'utiliser
Vérifier qu'un disque n'est pas plein.

## Dans quel contexte
Erreurs « No space left on device », serveurs, Docker.

## Syntaxe
```bash
df -h
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `-h` | tailles lisibles (Go, Mo) |
| `chemin` | seulement le disque qui contient ce chemin |

## Exemple concret
```bash
df -h /
```

## Résultat attendu
`Size Used Avail Use% Mounted on`.

## Variantes utiles
- `docker system df` : place prise par Docker

> [!warning] Erreurs fréquentes
> - Un disque à 100 % bloque bases de données et builds

## Relier
- **Commandes complémentaires** : [[du]]
- **Concepts associés** : [[Arborescence Linux]]
