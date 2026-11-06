---
type: command
tool: Réseau
level: debutant
concepts:
  - "[[TCP et UDP]]"
  - "[[Port]]"
tags:
  - commande
  - reseau
---
# ss

> [!info] Réseau
> Liste les connexions réseau et les ports en écoute sous Linux.

## Pourquoi l'utiliser
Savoir quel programme écoute sur quel port.

## Dans quel contexte
Port déjà utilisé, service qui ne répond pas.

## Syntaxe
```bash
ss [options]
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `-t` / `-u` | TCP / UDP |
| `-l` | seulement en écoute |
| `-n` | numéros au lieu de noms |
| `-p` | programme et PID (avec sudo pour tout voir) |

## Exemple concret
```bash
sudo ss -tlnp
```

## Résultat attendu
`LISTEN 0 128 0.0.0.0:8080 users:(("python3",pid=1234))`.

## Variantes utiles
- Windows : `netstat -ano`
- `ss -tlnp | grep :5432`

> [!warning] Erreurs fréquentes
> - Ne pas voir le programme sans `sudo`

## Relier
- **Commandes complémentaires** : [[ip]] · [[kill]]
- **Concepts associés** : [[TCP et UDP]] · [[Port]]
