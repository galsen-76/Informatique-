---
type: command
tool: pip
level: debutant
concepts:
  - "[[pip]]"
  - "[[Environnement virtuel Python]]"
tags:
  - commande
  - python
---
# pip install

> [!info] pip
> Installe un ou plusieurs paquets Python.

## Pourquoi l'utiliser
Ajouter une bibliothèque externe à ton projet ou installer toutes les dépendances listées.

## Dans quel contexte
Dans un venv activé sur ton poste, ou dans un `RUN` de Dockerfile.

## Syntaxe
```bash
pip install <paquet>[==version]
pip install -r requirements.txt
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `paquet==1.2.3` | une version précise |
| `-r fichier` | installe tout ce que liste le fichier |
| `--upgrade` | met à jour |
| `--no-cache-dir` | ne garde pas de cache (images Docker plus légères) |
| `--index-url URL` | installe depuis un autre dépôt (Nexus) |

## Exemple concret
```bash
python -m pip install -r requirements.txt
```

## Résultat attendu
Les paquets et leurs dépendances sont téléchargés puis installés ; `pip list` les affiche.

## Variantes utiles
- `pip freeze > requirements.txt` : figer les versions
- `pip uninstall paquet`
- `pip show paquet` : version et emplacement

> [!warning] Erreurs fréquentes
> - Installer hors du venv : vérifier que `(.venv)` est affiché
> - Derrière un proxy d'entreprise : `ProxyError` ou délai dépassé, voir [[Proxy]]

## Relier
- **Commandes complémentaires** : [[python script.py]]
- **Concepts associés** : [[pip]] · [[Environnement virtuel Python]]
