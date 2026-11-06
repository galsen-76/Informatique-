---
type: command
tool: Python
level: debutant
concepts:
  - "[[Python]]"
  - "[[Environnement virtuel Python]]"
tags:
  - commande
  - python
---
# python script.py

> [!info] Python
> Lance l'interpréteur Python : un script, un module ou le mode interactif.

## Pourquoi l'utiliser
Exécuter un script `.py`, tester une ligne de code, lancer un outil installé comme module (`-m`).

## Dans quel contexte
Tous tes scripts, dans le terminal, dans un Dockerfile (`CMD`) ou un job de CI.

## Syntaxe
```bash
python [options] script.py [arguments]
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `script.py` | le fichier à exécuter |
| `-m module` | lance un module comme programme (`-m venv`, `-m pip`, `-m pytest`) |
| `-c "code"` | exécute une ligne de code |
| `--version` | affiche la version |
| sans argument | mode interactif `>>>` |

## Exemple concret
```bash
python zipper.py photos --sortie export.zip
echo $?    # code de sortie
```

## Résultat attendu
Le script s'exécute ; son code de sortie vaut 0 s'il a réussi.

## Variantes utiles
- `py` (Windows) ou `python3` (Linux) selon l'installation
- `python -m venv .venv`, `python -m pip install …`
- `python -c "import PIL; print(PIL.__version__)"` pour vérifier qu'un paquet est installé

> [!warning] Erreurs fréquentes
> - `python` introuvable sous Windows : essayer `py`, ou réinstaller en cochant *Add to PATH*
> - Lancer le script depuis le mauvais dossier : les chemins relatifs ne pointent plus au bon endroit

## Relier
- **Commandes complémentaires** : [[pip install]]
- **Concepts associés** : [[Python]] · [[Environnement virtuel Python]]
